//#region src/utils/schema/is-non-system.ts
/** Exclude system collections/fields */
function isNonSystem(item) {
	if (item?.meta?.system === true) return false;
	return true;
}

//#endregion
export { isNonSystem };