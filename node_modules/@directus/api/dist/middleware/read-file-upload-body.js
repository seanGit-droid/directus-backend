import async_handler_default from "../utils/async-handler.js";
import { readMultipartFile } from "../utils/read-multipart-file.js";
import { InvalidPayloadError, UnsupportedMediaTypeError } from "@directus/errors";
import { parseJSON } from "@directus/utils";
import { readableStreamToString } from "@directus/utils/node";
import { load } from "js-yaml";

//#region src/middleware/read-file-upload-body.ts
/**
* Populate `req.body` from an uploaded file so a handler can consume it uniformly.
*/
function readFileUploadBody(options = {}) {
	const { maxFileSize, allowYaml = false } = options;
	return async_handler_default(async (req, _res, next) => {
		if (req.is("application/json")) {
			if (!req.body || Object.keys(req.body).length === 0) throw new InvalidPayloadError({ reason: `No data was included in the body` });
			return next();
		}
		const { mimetype, stream } = await readMultipartFile(req, { maxFileSize });
		const isJson = mimetype === "application/json";
		if (!isJson && !allowYaml) {
			stream.destroy();
			throw new UnsupportedMediaTypeError({
				mediaType: mimetype,
				where: "file import"
			});
		}
		const raw = await readableStreamToString(stream);
		try {
			req.body = isJson ? parseJSON(raw) : load(raw);
		} catch {
			throw new InvalidPayloadError({ reason: `Uploaded file is not valid ${isJson ? "JSON" : "YAML"}` });
		}
		if (req.body === void 0 || req.body === null) throw new InvalidPayloadError({ reason: `No file was included in the request` });
		return next();
	});
}

//#endregion
export { readFileUploadBody as default };