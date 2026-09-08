//#region src/utils/schema/is-in-scope.ts
/** Keep entities within the requested collection scope. A `null` scope matches everything. */
function isInScope(item, scope) {
	if (scope === null) return true;
	return scope.has(item.collection);
}

//#endregion
export { isInScope };