import { DiffKind } from "../../packages/types/dist/index.js";

//#region src/utils/schema/is-delete-allowed.ts
/** Allow a diff entry's deletion: `merge` mode suppresses deletions to stay additive, other modes allow all. */
function isDeleteAllowed(entry, mode) {
	if (mode !== "merge") return true;
	const change = entry.diff?.[0];
	if (change?.kind !== DiffKind.DELETE) return true;
	return change.path !== void 0;
}

//#endregion
export { isDeleteAllowed };