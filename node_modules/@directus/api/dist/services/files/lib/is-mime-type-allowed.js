import { toArray } from "@directus/utils";
import { minimatch } from "minimatch";

//#region src/services/files/lib/is-mime-type-allowed.ts
function isMimeTypeAllowed(mimeType, patterns) {
	return toArray(patterns).some((pattern) => minimatch(mimeType, pattern));
}

//#endregion
export { isMimeTypeAllowed };