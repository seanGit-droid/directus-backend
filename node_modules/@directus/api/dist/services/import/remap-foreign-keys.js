import { isObject } from "@directus/utils";

//#region src/services/import/remap-foreign-keys.ts
/** Clone an item, remap its scalar foreign keys through the id maps, and drop deferred fields. */
function remapForeignKeys(item, fkFields, idMaps, secondPassFields) {
	const payload = { ...item };
	for (const field of secondPassFields) delete payload[field];
	for (const info of fkFields) {
		const value = payload[info.field];
		if (value === void 0 || value === null || isObject(value)) continue;
		payload[info.field] = remapValue(value, resolveTarget(info, item), idMaps);
	}
	return payload;
}
/**
* Map a foreign key value through the target collection's id map (identity when unmapped).
*/
function remapValue(value, target, idMaps) {
	if (value === null || value === void 0 || !target) return value;
	if (Array.isArray(value)) return value.map((entry) => remapValue(entry, target, idMaps));
	const mapped = idMaps.get(target)?.get(String(value));
	return mapped !== void 0 ? mapped : value;
}
/** Determine the target collection for a foreign key field (static for m2o, per-item for a2o). */
function resolveTarget(info, item) {
	if (info.target) return info.target;
	if (!info.collectionField) return null;
	const target = item[info.collectionField];
	return typeof target === "string" ? target : null;
}

//#endregion
export { remapForeignKeys, remapValue, resolveTarget };