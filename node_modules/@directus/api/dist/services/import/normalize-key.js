//#region src/services/import/normalize-key.ts
/**
* Normalize a primary key for comparison.
*/
function normalizeKey(value) {
	return String(value).toLowerCase();
}

//#endregion
export { normalizeKey };