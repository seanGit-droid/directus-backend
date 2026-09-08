//#region src/utils/schema/is-changed.ts
/** Keep only diff entries that actually changed. */
function isChanged(entry) {
	return Array.isArray(entry.diff);
}

//#endregion
export { isChanged };