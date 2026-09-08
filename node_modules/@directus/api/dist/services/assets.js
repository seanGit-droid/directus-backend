import { useLogger } from "../logger/index.js";
import { getMilliseconds } from "../utils/get-milliseconds.js";
import { SUPPORTED_IMAGE_TRANSFORM_FORMATS } from "../constants.js";
import { getStorage } from "../storage/index.js";
import { isValidUuid } from "../utils/is-valid-uuid.js";
import database_default from "../database/index.js";
import { validateItemAccess } from "../permissions/modules/validate-access/lib/validate-item-access.js";
import { maybeExtractFormat, resolvePreset } from "../utils/transformations.js";
import { assertTransformsAllowed, toDimension } from "./assets/assert-transforms-allowed.js";
import { NameDeduper } from "./assets/name-deduper.js";
import { getSharpInstance } from "./files/lib/get-sharp-instance.js";
import { FilesService } from "./files.js";
import { FoldersService } from "./folders.js";
import path from "path";
import { useEnv } from "@directus/env";
import { ForbiddenError, IllegalAssetTransformationError, InvalidPayloadError, InvalidQueryError, RangeNotSatisfiableError, ServiceUnavailableError } from "@directus/errors";
import { clamp } from "lodash-es";
import { ZipArchive } from "archiver";
import { contentType, extension } from "mime-types";
import hash from "object-hash";
import sharp from "sharp";

//#region src/services/assets.ts
const env = useEnv();
const logger = useLogger();
var AssetsService = class {
	knex;
	accountability;
	schema;
	sudoFilesService;
	constructor(options) {
		this.knex = options.knex || database_default();
		this.accountability = options.accountability || null;
		this.schema = options.schema;
		this.sudoFilesService = new FilesService({
			...options,
			accountability: null
		});
	}
	sanitizeFields(file, allowedFields) {
		if (allowedFields.includes("*")) return file;
		const bypassFields = ["type", "filesize"];
		const fieldsToKeep = new Set([...allowedFields, ...bypassFields]);
		const filteredFile = {};
		for (const field of fieldsToKeep) if (field in file) filteredFile[field] = file[field];
		return filteredFile;
	}
	zip(options) {
		if (options.files.length === 0) throw new InvalidPayloadError({ reason: "No files found in the selected folders tree" });
		const archive = new ZipArchive();
		const pendingStreams = /* @__PURE__ */ new Set();
		const releaseStreams = () => {
			for (const stream of pendingStreams) stream.destroy();
			pendingStreams.clear();
		};
		const failed = new Promise((_, reject) => archive.once("error", reject));
		const closed = new Promise((resolve) => archive.once("close", () => {
			releaseStreams();
			resolve();
		}));
		failed.catch(() => {});
		const complete = async () => {
			const deduper = new NameDeduper();
			const storage = await getStorage();
			try {
				for (const { id, folder, filename_download } of options.files) {
					if (archive.destroyed) break;
					const file = await this.sudoFilesService.readOne(id, { fields: [
						"id",
						"storage",
						"filename_disk",
						"filename_download",
						"modified_on",
						"type"
					] });
					let exists;
					try {
						exists = await storage.location(file.storage).exists(file.filename_disk);
					} catch (error) {
						throw new ServiceUnavailableError({
							service: "assets",
							reason: `Couldn't reach the storage location`
						}, { cause: error });
					}
					if (!exists) throw new ForbiddenError();
					const version = file.modified_on ? (new Date(file.modified_on).getTime() / 1e3).toFixed() : void 0;
					const assetStream = await storage.location(file.storage).read(file.filename_disk, { version });
					if (archive.destroyed) {
						assetStream.destroy();
						break;
					}
					pendingStreams.add(assetStream);
					assetStream.on("close", () => pendingStreams.delete(assetStream));
					const fileExtension = path.extname(file.filename_download) || file.type && "." + extension(file.type) || "";
					const dedupedFileName = deduper.add(filename_download, {
						group: folder,
						fallback: file.id + fileExtension
					});
					const folderName = folder ? options.folders?.get(folder) : void 0;
					archive.append(assetStream, {
						name: dedupedFileName,
						...folderName !== void 0 && { prefix: folderName }
					});
				}
				if (options.folders) for (const [, folder] of options.folders) {
					if (archive.destroyed) break;
					archive.append("", { name: folder + "/" });
				}
				await Promise.race([
					archive.finalize(),
					failed,
					closed
				]);
			} finally {
				releaseStreams();
			}
		};
		return {
			archive,
			complete
		};
	}
	async zipFiles(files) {
		const filesToZip = await new FilesService({
			schema: this.schema,
			knex: this.knex,
			accountability: this.accountability
		}).readByQuery({
			filter: { id: { _in: files } },
			limit: -1
		});
		return this.zip({ files: filesToZip.map((file) => ({
			id: file["id"],
			folder: file["folder"],
			filename_download: file["filename_download"]
		})) });
	}
	async zipFolder(root) {
		const folderTree = await new FoldersService({
			schema: this.schema,
			knex: this.knex,
			accountability: this.accountability
		}).buildTree(root);
		const filesToZip = await new FilesService({
			schema: this.schema,
			knex: this.knex,
			accountability: this.accountability
		}).readByQuery({
			filter: { folder: { _in: Array.from(folderTree.keys()) } },
			limit: -1
		});
		const { archive, complete } = this.zip({
			folders: folderTree,
			files: filesToZip.map((file) => ({
				id: file["id"],
				folder: file["folder"],
				filename_download: file["filename_download"]
			}))
		});
		return {
			archive,
			complete,
			metadata: { name: folderTree.get(root) }
		};
	}
	async getAsset(id, transformation, range, deferStream = false) {
		const storage = await getStorage();
		const publicSettings = await this.knex.select("project_logo", "public_background", "public_foreground", "public_favicon").from("directus_settings").first();
		const systemPublicKeys = Object.values(publicSettings || {});
		/**
		* This is a little annoying. Postgres will error out if you're trying to search in `where`
		* with a wrong type. In case of directus_files where id is a uuid, we'll have to verify the
		* validity of the uuid ahead of time.
		*/
		if (!isValidUuid(id)) throw new ForbiddenError();
		let allowedFields = ["*"];
		if (!systemPublicKeys.includes(id) && this.accountability && this.accountability.admin !== true) {
			const { allowedRootFields, accessAllowed } = await validateItemAccess({
				accountability: this.accountability,
				action: "read",
				collection: "directus_files",
				primaryKeys: [id],
				returnAllowedRootFields: true
			}, {
				knex: this.knex,
				schema: this.schema
			});
			if (!accessAllowed) throw new ForbiddenError({ reason: `You don't have permission to perform "read" for collection "directus_files" or it does not exist.` });
			allowedFields = allowedRootFields;
		}
		const file = await this.sudoFilesService.readOne(id, { limit: 1 });
		let exists;
		try {
			exists = await storage.location(file.storage).exists(file.filename_disk);
		} catch (error) {
			throw new ServiceUnavailableError({
				service: "assets",
				reason: `Couldn't reach the storage location`
			}, { cause: error });
		}
		if (!exists) throw new ForbiddenError();
		if (range) {
			const missingRangeLimits = range.start === void 0 && range.end === void 0;
			const endBeforeStart = range.start !== void 0 && range.end !== void 0 && range.end <= range.start;
			const startOverflow = range.start !== void 0 && range.start >= file.filesize;
			const endUnderflow = range.end !== void 0 && range.end <= 0;
			if (missingRangeLimits || endBeforeStart || startOverflow || endUnderflow) throw new RangeNotSatisfiableError({ range });
			const lastByte = file.filesize - 1;
			if (range.end) {
				if (range.start === void 0) {
					range.start = file.filesize - range.end;
					range.end = lastByte;
				}
				if (range.end >= file.filesize) range.end = lastByte;
			}
			if (range.start) {
				if (range.end === void 0) range.end = lastByte;
				if (range.start < 0) range.start = 0;
			}
		}
		const type = file.type;
		const transforms = transformation ? resolvePreset(transformation, file) : [];
		const modifiedOn = file.modified_on ? new Date(file.modified_on) : void 0;
		const version = modifiedOn ? (modifiedOn.getTime() / 1e3).toFixed() : void 0;
		if (type && transforms.length > 0 && SUPPORTED_IMAGE_TRANSFORM_FORMATS.includes(type)) {
			const maybeNewFormat = maybeExtractFormat(transforms);
			const assetFilename = path.basename(file.filename_disk, path.extname(file.filename_disk)) + getAssetSuffix(transforms) + (maybeNewFormat ? `.${maybeNewFormat}` : path.extname(file.filename_disk));
			const exists$1 = await storage.location(file.storage).exists(assetFilename).catch((error) => {
				logger.warn(error, `Couldn't check whether a transform of file ${file.id} was already cached`);
				return false;
			});
			if (maybeNewFormat) file.type = contentType(assetFilename) || null;
			if (exists$1) {
				const assetStream$1 = () => storage.location(file.storage).read(assetFilename, { range });
				const stat$1 = await storage.location(file.storage).stat(assetFilename);
				return {
					stream: deferStream ? assetStream$1 : await assetStream$1(),
					file: this.sanitizeFields(file, allowedFields),
					stat: stat$1
				};
			}
			const { width, height } = file;
			const maxInputDimension = toDimension(env["ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION"]) ?? 6e3;
			if (!width || !height || width > maxInputDimension || height > maxInputDimension) {
				logger.warn(`Image is too large to be transformed, or image size couldn't be determined.`);
				throw new IllegalAssetTransformationError({ invalidTransformations: ["width", "height"] });
			}
			assertTransformsAllowed(width, height, transforms);
			const { queue, process } = sharp.counters();
			if (queue + process > env["ASSETS_TRANSFORM_MAX_CONCURRENT"]) throw new ServiceUnavailableError({
				service: "files",
				reason: "Server too busy"
			});
			const transformer = getSharpInstance();
			transformer.timeout({ seconds: clamp(Math.round(getMilliseconds(env["ASSETS_TRANSFORM_TIMEOUT"], 0) / 1e3), 1, 3600) });
			if (transforms.find((transform$1) => transform$1[0] === "rotate") === void 0) transformer.rotate();
			try {
				for (const [method, ...args] of transforms) transformer[method].apply(transformer, args);
			} catch (error) {
				if (error instanceof Error && error.message.startsWith("Expected")) throw new InvalidQueryError({ reason: error.message });
				throw error;
			}
			const readStream = await storage.location(file.storage).read(file.filename_disk, {
				range,
				version
			});
			readStream.on("error", (e) => {
				logger.error(e, `Couldn't transform file ${file.id}`);
				transformer.destroy(e);
			});
			try {
				await storage.location(file.storage).write(assetFilename, readStream.pipe(transformer), type);
			} catch (error) {
				readStream.destroy();
				transformer.destroy();
				try {
					await storage.location(file.storage).delete(assetFilename);
				} catch {}
				if (error?.message?.includes("timeout")) throw new ServiceUnavailableError({
					service: "assets",
					reason: `Transformation timed out`
				});
				throw error;
			}
			const assetStream = () => storage.location(file.storage).read(assetFilename, {
				range,
				version
			});
			const stat = await storage.location(file.storage).stat(assetFilename);
			return {
				stream: deferStream ? assetStream : await assetStream(),
				stat,
				file: this.sanitizeFields(file, allowedFields)
			};
		} else {
			const assetStream = () => storage.location(file.storage).read(file.filename_disk, {
				range,
				version
			});
			const stat = await storage.location(file.storage).stat(file.filename_disk);
			return {
				stream: deferStream ? assetStream : await assetStream(),
				file: this.sanitizeFields(file, allowedFields),
				stat
			};
		}
	}
};
const getAssetSuffix = (transforms) => {
	if (Object.keys(transforms).length === 0) return "";
	return `__${hash(transforms)}`;
};

//#endregion
export { AssetsService };