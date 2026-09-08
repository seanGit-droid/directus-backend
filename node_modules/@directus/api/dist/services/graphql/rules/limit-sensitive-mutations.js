import { useEnv } from "@directus/env";
import { GraphQLError, Kind } from "graphql";

//#region src/services/graphql/rules/limit-sensitive-mutations.ts
const MAX_INVOCATIONS_PER_OPERATION = 1;
/**
* Walk a mutation operation's selection set, resolving fragment spreads and
* inline fragments, and return the first invocation of a `sensitiveMutations`
* field whose running per-operation count exceeds `MAX_INVOCATIONS_PER_OPERATION`,
* or `undefined` if every sensitive mutation stays within the limit.
*
* `sensitiveMutations` is the configured set of guarded field names (see
* `GRAPHQL_SINGLE_USE_MUTATIONS`).
*/
function assertSensitiveMutationLimit(operation, getFragment, sensitiveMutations) {
	const counts = /* @__PURE__ */ new Map();
	const walk = (selectionSet, visiting) => {
		for (const selection of selectionSet.selections) if (selection.kind === Kind.FIELD) {
			const fieldName = selection.name.value;
			if (!sensitiveMutations.has(fieldName)) continue;
			const count = (counts.get(fieldName) ?? 0) + 1;
			counts.set(fieldName, count);
			if (count > MAX_INVOCATIONS_PER_OPERATION) throw new GraphQLError(`"${fieldName}" can only be used once per request`, { nodes: selection });
		} else if (selection.kind === Kind.INLINE_FRAGMENT) walk(selection.selectionSet, visiting);
		else if (selection.kind === Kind.FRAGMENT_SPREAD) {
			const name = selection.name.value;
			if (visiting.has(name)) continue;
			const fragment = getFragment(name);
			if (!fragment) continue;
			visiting.add(name);
			walk(fragment.selectionSet, visiting);
			visiting.delete(name);
		}
	};
	walk(operation.selectionSet, /* @__PURE__ */ new Set());
}
/**
* GraphQL validation rule that rejects operations invoking any mutation listed in
* `GRAPHQL_SINGLE_USE_MUTATIONS` more than `MAX_INVOCATIONS_PER_OPERATION` times
* (aliases included). These are system mutations that perform expensive or
* sensitive side effects (account lockout counters, outbound email, user
* creation) and are reachable anonymously.
*/
function limitSensitiveMutations(operationName) {
	const env = useEnv();
	const sensitiveMutations = new Set(env["GRAPHQL_SINGLE_USE_MUTATIONS"]);
	return (context) => {
		const mutationType = context.getSchema().getMutationType();
		return { OperationDefinition(operation) {
			if (!mutationType || operation.operation !== "mutation") return;
			if (operationName != null && operation.name?.value !== operationName) return;
			try {
				assertSensitiveMutationLimit(operation, (name) => context.getFragment(name), sensitiveMutations);
			} catch (error) {
				if (error instanceof GraphQLError) context.reportError(error);
				else if (error instanceof Error) context.reportError(new GraphQLError(error.message));
				else throw error;
			}
		} };
	};
}

//#endregion
export { assertSensitiveMutationLimit, limitSensitiveMutations };