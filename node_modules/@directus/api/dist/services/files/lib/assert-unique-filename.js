import { ForbiddenError } from "@directus/errors";

//#region src/services/files/lib/assert-unique-filename.ts
/**
* Assert whether a filename is unique
*
* @param knex - Database instance
* @param filename - The filename to check
* @param excludeId - Id of an existing file to exclude (e.g. the target of a replacement)
* @throws ForbiddenError if a match is found
*
*/
async function assertUniqueFilename(knex, filename, excludeId) {
	const query = knex.select("filename_disk").from("directus_files").where({ filename_disk: filename });
	if (excludeId) query.whereNot("id", excludeId);
	if (await query.first()) throw new ForbiddenError();
}

//#endregion
export { assertUniqueFilename };