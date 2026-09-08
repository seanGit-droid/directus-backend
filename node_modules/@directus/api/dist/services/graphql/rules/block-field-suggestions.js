import { GraphQLError } from "graphql";

//#region src/services/graphql/rules/block-field-suggestions.ts
/**
* graphql-js appends `Did you mean "…"?` hints to validation errors for unknown fields, types,
* arguments and enum values. Those hints leak schema details even when introspection is disabled,
* allowing a client to reconstruct the schema by probing for near-miss names.
*/
const SUGGESTION_REGEX = / ?Did you mean .+$/;
function BlockFieldSuggestionsRule(context) {
	const reportError = context.reportError.bind(context);
	context.reportError = (error) => {
		if (SUGGESTION_REGEX.test(error.message)) error = new GraphQLError(error.message.replace(SUGGESTION_REGEX, ""), {
			nodes: error.nodes ?? null,
			source: error.source ?? null,
			positions: error.positions ?? null,
			path: error.path ?? null,
			originalError: error.originalError ?? null,
			extensions: error.extensions
		});
		reportError(error);
	};
	return {};
}

//#endregion
export { BlockFieldSuggestionsRule };