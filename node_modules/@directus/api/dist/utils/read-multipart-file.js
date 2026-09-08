import { ContentTooLargeError, InvalidPayloadError, UnsupportedMediaTypeError } from "@directus/errors";
import { Readable } from "node:stream";
import Busboy from "busboy";

//#region src/utils/read-multipart-file.ts
/**
* Extract the first uploaded file from a `multipart/form-data` request as a stream plus its mimetype.
*/
function readMultipartFile(req, options = {}) {
	if (!req.is("multipart/form-data")) return Promise.reject(new UnsupportedMediaTypeError({
		mediaType: req.headers["content-type"] ?? "unknown",
		where: "Content-Type header"
	}));
	return new Promise((resolve, reject) => {
		const busboy = Busboy({
			headers: req.headers["content-type"] ? req.headers : {
				...req.headers,
				"content-type": "application/octet-stream"
			},
			limits: options.maxFileSize !== void 0 ? {
				files: 1,
				fileSize: options.maxFileSize
			} : { files: 1 }
		});
		let fileFound = false;
		busboy.on("file", (_fieldname, fileStream, { mimeType }) => {
			fileFound = true;
			if (options.maxFileSize !== void 0) {
				fileStream.on("error", () => {});
				fileStream.on("limit", () => fileStream.destroy(new ContentTooLargeError()));
			}
			resolve({
				mimetype: mimeType,
				stream: fileStream
			});
		});
		busboy.on("error", (err) => reject(err));
		busboy.on("close", () => {
			if (!fileFound) reject(new InvalidPayloadError({ reason: `No file was included in the request` }));
		});
		req.pipe(busboy);
	});
}

//#endregion
export { readMultipartFile };