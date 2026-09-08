import { InvalidPayloadError } from "@directus/errors";
import { isObject } from "@directus/utils";

//#region src/services/import/validate-flat-data.ts
/**
* Reject nested relational payloads: any relational field (owning FK or o2m/m2m alias) whose value
* is an object, or an array containing an object. Ignores non-relational fields like json, csv, etc.
*/
function validateFlatData(fkFieldsMap, aliasFieldsMap, dataByCollection) {
	for (const [collection, entry] of dataByCollection) {
		const fkFields = fkFieldsMap.get(collection) ?? [];
		const aliasFields = aliasFieldsMap.get(collection) ?? [];
		if (fkFields.length === 0 && aliasFields.length === 0) continue;
		for (const item of entry.items) {
			for (const info of fkFields) validateFlatValue(collection, info.field, item[info.field]);
			for (const info of aliasFields) validateFlatValue(collection, info.field, item[info.field]);
		}
	}
}
function validateFlatValue(collection, field, value) {
	if (value === void 0 || value === null) return;
	if (isObject(value) || Array.isArray(value) && value.some((entry) => isObject(entry))) throw new InvalidPayloadError({ reason: `Nested relational data is not supported for "${collection}.${field}"; provide a scalar foreign key reference instead` });
}

//#endregion
export { validateFlatData };