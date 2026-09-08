//#region src/services/import/key-exists.ts
async function keyExists(trx, collection, pkField, value) {
	const result = await trx.select(pkField).from(collection).where({ [pkField]: value }).first();
	return Boolean(result);
}

//#endregion
export { keyExists };