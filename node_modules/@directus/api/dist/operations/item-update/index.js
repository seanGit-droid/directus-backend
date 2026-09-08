import { ItemsService } from "../../services/items.js";
import { sanitizeQuery } from "../../utils/sanitize-query.js";
import { getAccountabilityForRole } from "../../utils/get-accountability-for-role.js";
import { InvalidPayloadError } from "@directus/errors";
import { optionToObject, toArray } from "@directus/utils";
import { isEmpty, isNil } from "lodash-es";
import { z as z$1 } from "zod";
import { defineOperationApi } from "@directus/extensions";

//#region src/operations/item-update/index.ts
const inputSchema = z$1.object({
	keys: z$1.array(z$1.union([z$1.string(), z$1.number()])).nullable(),
	query: z$1.record(z$1.string(), z$1.any()).nullable(),
	payload: z$1.union([z$1.record(z$1.string(), z$1.any()), z$1.array(z$1.record(z$1.string(), z$1.any()))]).nullable()
});
var item_update_default = defineOperationApi({
	id: "item-update",
	handler: async ({ collection, key, payload, query, emitEvents, permissions }, { accountability, database, getSchema }) => {
		const payloadObject = optionToObject(payload) ?? null;
		const queryObject = query ? optionToObject(query) : null;
		const keys = isNil(key) || key === "" ? null : toArray(key);
		const validation = inputSchema.safeParse({
			keys,
			query: queryObject,
			payload: payloadObject
		});
		if (!validation.success) throw new InvalidPayloadError({ reason: validation.error.issues[0]?.message ?? "Invalid input" });
		const isBatch = Array.isArray(payloadObject);
		const hasKeys = keys !== null && keys.length > 0;
		const hasQuery = queryObject !== null && Object.keys(queryObject).length > 0;
		if (hasKeys && hasQuery) throw new InvalidPayloadError({ reason: "Cannot use both \"key\" and \"query\"" });
		if (isBatch && (hasKeys || hasQuery)) throw new InvalidPayloadError({ reason: "Cannot use \"key\" or \"query\" with a batch payload" });
		if (!payloadObject || isEmpty(payloadObject) || !isBatch && !hasKeys && !hasQuery) return null;
		const schema = await getSchema({ database });
		let customAccountability;
		if (!permissions || permissions === "$trigger") customAccountability = accountability;
		else if (permissions === "$full") customAccountability = await getAccountabilityForRole("system", {
			database,
			schema,
			accountability
		});
		else if (permissions === "$public") customAccountability = await getAccountabilityForRole(null, {
			database,
			schema,
			accountability
		});
		else customAccountability = await getAccountabilityForRole(permissions, {
			database,
			schema,
			accountability
		});
		const itemsService = new ItemsService(collection, {
			schema,
			accountability: customAccountability,
			knex: database
		});
		let result = null;
		if (isBatch) result = await itemsService.updateBatch(payloadObject, { emitEvents: !!emitEvents });
		else if (hasQuery) {
			const sanitizedQueryObject = await sanitizeQuery(queryObject, schema, customAccountability);
			result = await itemsService.updateByQuery(sanitizedQueryObject, payloadObject, { emitEvents: !!emitEvents });
		} else if (hasKeys) {
			const updated = await itemsService.updateMany(keys, payloadObject, { emitEvents: !!emitEvents });
			result = keys.length === 1 ? keys[0] : updated;
		}
		return result;
	}
});

//#endregion
export { item_update_default as default };