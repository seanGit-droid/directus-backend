import { ContainsNullValuesError, InvalidForeignKeyError } from "@directus/errors";

//#region src/database/errors/dialects/oracle.ts
var OracleErrorCodes = /* @__PURE__ */ function(OracleErrorCodes$1) {
	OracleErrorCodes$1[OracleErrorCodes$1["CONTAINS_NULL_VALUES"] = 2296] = "CONTAINS_NULL_VALUES";
	OracleErrorCodes$1[OracleErrorCodes$1["FOREIGN_KEY_VIOLATION"] = 2291] = "FOREIGN_KEY_VIOLATION";
	return OracleErrorCodes$1;
}(OracleErrorCodes || {});
function extractError(error) {
	switch (error.errorNum) {
		case OracleErrorCodes.CONTAINS_NULL_VALUES: return containsNullValues(error);
		case OracleErrorCodes.FOREIGN_KEY_VIOLATION: return foreignKeyViolation(error);
		default: return error;
	}
}
function containsNullValues(error) {
	const matches = error.message.match(/"([^"]+)"/g);
	if (!matches) return error;
	return new ContainsNullValuesError({
		collection: matches[0].slice(1, -1),
		field: matches[1].slice(1, -1)
	});
}
function foreignKeyViolation(error) {
	return new InvalidForeignKeyError({
		collection: null,
		field: null,
		value: null,
		constraint: /\(([^)]+)\)/.exec(error.message)?.[1]?.split(".").pop() ?? null
	});
}

//#endregion
export { extractError };