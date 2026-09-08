import { BlockFieldSuggestionsRule } from "./block-field-suggestions.js";
import { limitSensitiveMutations } from "./limit-sensitive-mutations.js";
import { useEnv } from "@directus/env";
import { NoSchemaIntrospectionCustomRule, specifiedRules } from "graphql";

//#region src/services/graphql/rules/get-validation-rules.ts
/**
* Build the GraphQL validation rules.
*/
function getValidationRules({ operationName } = {}) {
	const env = useEnv();
	const rules = [...specifiedRules, limitSensitiveMutations(operationName)];
	if (env["GRAPHQL_INTROSPECTION"] === false) {
		rules.push(NoSchemaIntrospectionCustomRule);
		rules.push(BlockFieldSuggestionsRule);
	}
	return rules;
}

//#endregion
export { getValidationRules };