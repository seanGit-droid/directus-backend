import { InvalidPayloadError } from "@directus/errors";

//#region src/utils/schema/resolve-scoped-collections.ts
/**
* Resolves a collection scope into the set of collections a partial snapshot should contain. Names not present in the
* given collections are ignored.
*
* @param collections - Every collection known to Directus, folders included.
* @param [scope] - The requested scope; `includeCollections` and `excludeCollections` are mutually exclusive.
* @param [scope.includeCollections] - Restrict the snapshot to exactly these collections.
* @param [scope.excludeCollections] - Include every collection except these.
* @returns The collections to snapshot, or `null` for a full snapshot
* @throws {InvalidPayloadError} If both `includeCollections` and `excludeCollections` are provided.
*/
function resolveScopedCollections(collections, scope) {
	const { includeCollections, excludeCollections } = scope ?? {};
	if (includeCollections && excludeCollections) throw new InvalidPayloadError({ reason: `"includeCollections" and "excludeCollections" parameters cannot be used together` });
	if (includeCollections) {
		const allCollections = new Set(collections.map(({ collection }) => collection));
		return new Set(includeCollections.filter((collection) => allCollections.has(collection)));
	}
	if (excludeCollections) {
		const allCollections = new Set(collections.map(({ collection }) => collection));
		for (const collection of excludeCollections) allCollections.delete(collection);
		return allCollections;
	}
	return null;
}

//#endregion
export { resolveScopedCollections };