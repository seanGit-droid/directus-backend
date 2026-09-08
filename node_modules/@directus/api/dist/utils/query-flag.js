import { toBoolean } from "@directus/utils";

//#region src/utils/query-flag.ts
/**
* Read a boolean query flag. A bare `?flag` (empty string value) counts as true.
*/
function queryFlag(value) {
	return value === "" || toBoolean(value);
}

//#endregion
export { queryFlag };