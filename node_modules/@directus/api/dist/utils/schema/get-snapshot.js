import { SNAPSHOT_VERSION } from "../../constants.js";
import database_default, { getDatabaseClient } from "../../database/index.js";
import { RelationsService } from "../../services/relations.js";
import { getSchema } from "../get-schema.js";
import { sanitizeCollection, sanitizeField, sanitizeRelation, sanitizeSystemField } from "../sanitize-schema.js";
import { FieldsService } from "../../services/fields.js";
import { isInScope } from "./is-in-scope.js";
import { isIndexedSystemField } from "./is-indexed-system-field.js";
import { isManaged } from "./is-managed.js";
import { isNonSystem } from "./is-non-system.js";
import { resolveScopedCollections } from "./resolve-scoped-collections.js";
import { CollectionsService } from "../../services/collections.js";
import { fromPairs, isArray, isPlainObject, mapValues, omit, sortBy, toPairs } from "lodash-es";
import { version } from "directus/version";

//#region src/utils/schema/get-snapshot.ts
/**
* Build a snapshot of the current schema.
*
* @param options - Optional connection overrides and collection scoping.
* @param options.database - Knex instance to read from; defaults to the shared connection.
* @param options.schema - Pre-fetched schema overview; fetched fresh (cache bypassed) when omitted.
* @param options.scope - Restrict the snapshot to a subset of collections (partial snapshot)
* @returns The schema snapshot.
*/
async function getSnapshot(options) {
	const database = options?.database ?? database_default();
	const vendor = getDatabaseClient(database);
	const schema = options?.schema ?? await getSchema({
		database,
		bypassCache: true
	});
	const collectionsService = new CollectionsService({
		knex: database,
		schema
	});
	const fieldsService = new FieldsService({
		knex: database,
		schema
	});
	const relationsService = new RelationsService({
		knex: database,
		schema
	});
	const [collectionsRaw, fieldsRaw, relationsRaw] = await Promise.all([
		collectionsService.readByQuery(),
		fieldsService.readAll(),
		relationsService.readAll()
	]);
	const scope = resolveScopedCollections(collectionsRaw, options?.scope);
	const collectionsFiltered = collectionsRaw.filter((item) => isNonSystem(item) && isManaged(item) && isInScope(item, scope));
	const fieldsFiltered = fieldsRaw.filter((item) => isNonSystem(item) && isManaged(item) && isInScope(item, scope));
	const relationsFiltered = relationsRaw.filter((item) => isNonSystem(item) && isManaged(item) && isInScope(item, scope));
	const systemFieldsFiltered = fieldsRaw.filter((item) => isIndexedSystemField(item) && isInScope(item, scope));
	const collectionsSorted = sortBy(mapValues(collectionsFiltered, sortDeep), ["collection"]).map((collection) => sanitizeCollection(collection));
	const fieldsSorted = sortBy(mapValues(fieldsFiltered, sortDeep), ["collection", "meta.id"]).map((field) => sanitizeField(omitID(field)));
	const systemFieldsSorted = sortBy(systemFieldsFiltered, ["collection", "field"]).map((field) => sanitizeSystemField(field));
	const relationsSorted = sortBy(mapValues(relationsFiltered, sortDeep), ["collection", "meta.id"]).map((relation) => sanitizeRelation(omitID(relation)));
	return {
		version: scope !== null ? SNAPSHOT_VERSION.PARTIAL : SNAPSHOT_VERSION.FULL,
		directus: version,
		vendor,
		collections: collectionsSorted,
		fields: fieldsSorted,
		systemFields: systemFieldsSorted,
		relations: relationsSorted
	};
}
function omitID(item) {
	return omit(item, "meta.id");
}
function sortDeep(raw) {
	if (isPlainObject(raw)) return fromPairs(sortBy(toPairs(mapValues(raw, sortDeep))));
	if (isArray(raw)) return raw.map((raw$1) => sortDeep(raw$1));
	return raw;
}

//#endregion
export { getSnapshot };