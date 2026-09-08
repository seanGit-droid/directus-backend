import { useBus } from "../../../bus/lib/use-bus.js";
import "../../../bus/index.js";
import { useLogger } from "../../../logger/index.js";
import { EXTENSIONS } from "../../../constants.js";
import { getExtensionsPath } from "../get-extensions-path.js";
import { getStorage } from "../../../storage/index.js";
import { useLock } from "../../../lock/lib/use-lock.js";
import "../../../lock/index.js";
import { SyncStatus, isSynchronizing, setSyncStatus } from "./status.js";
import { compareFileMetadata, getSyncPaths } from "./utils.js";
import { SyncFileTracker } from "./tracker.js";
import { mkdir, rm } from "node:fs/promises";
import { useEnv } from "@directus/env";
import { normalizePath } from "@directus/utils";
import { dirname, join, relative, resolve, sep } from "node:path";
import { pipeline } from "node:stream/promises";
import { createWriteStream } from "node:fs";
import PQueue from "p-queue";
import mid from "node-machine-id";

//#region src/extensions/lib/sync/sync.ts
async function syncExtensions(options) {
	if (options?.skipSync === true) return;
	const env = useEnv();
	const lock = useLock();
	const messenger = useBus();
	const logger = useLogger();
	if (options?.forceSync !== true && await isSynchronizing()) {
		logger.debug("Extensions are already being synced to this directory from another process.");
		return;
	}
	const machineKey = `extensions-sync/${await mid.machineId()}`;
	if (await lock.increment(machineKey) !== 1) {
		logger.debug("Extensions are already being synced to this machine from another process.");
		return new Promise((resolve$1) => {
			messenger.subscribe(machineKey, () => resolve$1());
		});
	}
	try {
		logger.debug("Syncing extensions from configured storage location...");
		await mkdir(getExtensionsPath(), { recursive: true });
		await setSyncStatus(SyncStatus.SYNCING);
		const { localExtensionsPath, remoteExtensionsPath } = getSyncPaths(options?.partialSync);
		const disk = (await getStorage()).location(env["EXTENSIONS_LOCATION"]);
		if (options?.partialSync) {
			let remoteExists;
			try {
				remoteExists = await disk.exists(normalizePath(join(remoteExtensionsPath, "package.json")));
			} catch (error) {
				logger.warn(error, `Couldn't check whether the extension still exists in storage, keeping local copy`);
				return;
			}
			if (remoteExists === false) {
				await rm(localExtensionsPath, {
					recursive: true,
					force: true
				});
				return;
			}
		}
		const queue = new PQueue({ concurrency: EXTENSIONS.STORAGE_MAX_CONCURRENCY });
		let syncError;
		const onTaskError = (error) => {
			syncError ??= error;
			queue.clear();
		};
		const fileTracker = new SyncFileTracker();
		const hasLocalFiles = await fileTracker.readLocalFiles(localExtensionsPath) > 0;
		try {
			for await (const filepath of disk.list(remoteExtensionsPath)) {
				if (syncError) break;
				const relativePath = relative(resolve(sep, remoteExtensionsPath), resolve(sep, filepath));
				const destinationPath = join(localExtensionsPath, relativePath);
				await fileTracker.passedFile(relativePath);
				const syncFile = async () => {
					if (options?.forceSync !== true && hasLocalFiles) {
						if (await compareFileMetadata(destinationPath, filepath, disk)) return;
					}
					await mkdir(dirname(destinationPath), { recursive: true });
					await pipeline(await disk.read(filepath), createWriteStream(destinationPath));
				};
				queue.add(() => syncFile().catch(onTaskError));
			}
		} catch (error) {
			onTaskError(error);
		}
		await queue.onIdle();
		if (syncError) throw syncError;
		await fileTracker.cleanup(localExtensionsPath);
	} finally {
		messenger.publish(machineKey, { ready: true });
		await lock.delete(machineKey);
		await setSyncStatus(SyncStatus.IDLE);
	}
}

//#endregion
export { syncExtensions };