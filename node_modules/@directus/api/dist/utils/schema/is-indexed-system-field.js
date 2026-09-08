//#region src/utils/schema/is-indexed-system-field.ts
/** Keep indexed system fields, whose indexes must be preserved even though system entities are otherwise excluded. */
function isIndexedSystemField(item) {
	return Boolean(item.meta?.system === true && item.schema?.is_indexed);
}

//#endregion
export { isIndexedSystemField };