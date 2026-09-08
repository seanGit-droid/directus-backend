import database_default from "../database/index.js";
import { ItemsService } from "./items.js";
import { InvalidPayloadError } from "@directus/errors";

//#region src/services/translations.ts
var TranslationsService = class extends ItemsService {
	constructor(options) {
		super("directus_translations", options);
		this.knex = options.knex || database_default();
		this.accountability = options.accountability || null;
		this.schema = options.schema;
	}
	/**
	* Assert that a key and language combination isn't already taken
	*
	* @param key - The translation key to check
	* @param language - The language to check the key against
	* @param excludeId - Id of an existing translation to exclude (e.g. the row being updated)
	* @throws InvalidPayloadError if another translation already holds this combination
	*/
	async assertUniqueTranslation(key, language, excludeId) {
		const query = this.knex.select("id").from(this.collection).where({
			key,
			language
		});
		if (excludeId) query.whereNot("id", excludeId);
		if (await query.first()) throw new InvalidPayloadError({ reason: "Duplicate key and language combination" });
	}
	async createOne(data, opts) {
		await this.assertUniqueTranslation(data["key"], data["language"]);
		return await super.createOne(data, opts);
	}
	async updateMany(keys, data, opts) {
		if (keys.length > 1 && "key" in data && "language" in data) throw new InvalidPayloadError({ reason: "Duplicate key and language combination" });
		if ("key" in data || "language" in data) {
			const items = await this.readMany(keys);
			const seenCombinations = /* @__PURE__ */ new Set();
			for (const item of items) {
				const updatedData = {
					...item,
					...data
				};
				const combination = `${updatedData["key"]}-${updatedData["language"]}`;
				if (seenCombinations.has(combination)) throw new InvalidPayloadError({ reason: "Duplicate key and language combination" });
				seenCombinations.add(combination);
				await this.assertUniqueTranslation(updatedData["key"], updatedData["language"], item["id"]);
			}
		}
		return await super.updateMany(keys, data, opts);
	}
};

//#endregion
export { TranslationsService };