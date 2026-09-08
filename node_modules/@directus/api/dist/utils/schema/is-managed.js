//#region src/utils/schema/is-managed.ts
/** Exclude entities Directus doesn't manage (i.e. an untracked table/column). */
function isManaged(item) {
	if (item?.meta === null) return false;
	return true;
}

//#endregion
export { isManaged };