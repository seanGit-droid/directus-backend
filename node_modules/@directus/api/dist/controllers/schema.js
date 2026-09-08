import async_handler_default from "../utils/async-handler.js";
import { respond } from "../middleware/respond.js";
import { getVersionedHash } from "../utils/get-versioned-hash.js";
import { SchemaService } from "../services/schema.js";
import is_admin_default from "../middleware/is-admin.js";
import readFileUploadBody from "../middleware/read-file-upload-body.js";
import { queryFlag } from "../utils/query-flag.js";
import { useEnv } from "@directus/env";
import { InvalidPayloadError } from "@directus/errors";
import { toArray } from "@directus/utils";
import express from "express";
import { fromZodError } from "zod-validation-error";
import { z as z$1 } from "zod";
import bytes from "bytes";

//#region src/controllers/schema.ts
const env = useEnv();
const router = express.Router();
const IMPORT_MAX_FILE_SIZE = bytes.parse(env["IMPORT_MAX_FILE_SIZE"]) ?? void 0;
/** Accepts a single collection name or a list, always normalizing to a string array. */
const collectionList = z$1.union([z$1.string(), z$1.array(z$1.string())]).transform((value) => toArray(value));
const snapshotQuerySchema = z$1.object({
	includeCollections: collectionList.optional(),
	excludeCollections: collectionList.optional()
}).refine((value) => !(value.includeCollections && value.excludeCollections), { message: `"includeCollections" and "excludeCollections" parameters cannot be used together` });
router.get("/snapshot", is_admin_default, async_handler_default(async (req, res, next) => {
	const parsed = snapshotQuerySchema.safeParse(req.query);
	if (!parsed.success) throw new InvalidPayloadError({ reason: fromZodError(parsed.error).message });
	const currentSnapshot = await new SchemaService({ accountability: req.accountability }).snapshot({ scope: parsed.data });
	res.locals["payload"] = { data: currentSnapshot };
	return next();
}), respond);
const diffQuerySchema = z$1.object({
	force: z$1.string().optional().transform(queryFlag),
	mode: z$1.enum(["merge", "mirror"]).default("mirror")
});
router.post("/diff", is_admin_default, readFileUploadBody({
	allowYaml: true,
	maxFileSize: IMPORT_MAX_FILE_SIZE
}), async_handler_default(async (req, res, next) => {
	const parsed = diffQuerySchema.safeParse(req.query);
	if (!parsed.success) throw new InvalidPayloadError({ reason: fromZodError(parsed.error).message });
	const service = new SchemaService({ accountability: req.accountability });
	const snapshot = req.body;
	const currentSnapshot = await service.snapshot();
	const snapshotDiff = await service.diff(snapshot, {
		currentSnapshot,
		force: parsed.data.force,
		mode: parsed.data.mode
	});
	if (!snapshotDiff) return next();
	const currentSnapshotHash = getVersionedHash(currentSnapshot);
	res.locals["payload"] = { data: {
		hash: currentSnapshotHash,
		diff: snapshotDiff
	} };
	return next();
}), respond);
router.post("/apply", is_admin_default, readFileUploadBody({
	allowYaml: true,
	maxFileSize: IMPORT_MAX_FILE_SIZE
}), async_handler_default(async (req, _res, next) => {
	const service = new SchemaService({ accountability: req.accountability });
	const diff = req.body;
	await service.apply(diff, { force: queryFlag(req.query["force"]) });
	return next();
}), respond);
var schema_default = router;

//#endregion
export { schema_default as default };