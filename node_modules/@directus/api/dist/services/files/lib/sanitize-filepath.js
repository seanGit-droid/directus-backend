import { normalizePath } from "@directus/utils";
import path from "node:path";

//#region src/services/files/lib/sanitize-filepath.ts
/**
* Sanitize a filepath to its a safe relative path
*
* @param filepath - The filepath
*/
function sanitizeFilepath(filepath) {
	return normalizePath(path.relative(path.sep, path.resolve(path.sep, filepath)));
}

//#endregion
export { sanitizeFilepath };