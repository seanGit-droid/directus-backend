import { useLogger } from "../logger/index.js";
import { createCollectionForbiddenError } from "../permissions/modules/process-ast/utils/validate-path/create-error.js";
import { ImportCyclicalRelationError, InvalidPayloadError, UnprocessableContentError } from "@directus/errors";
import { getRelationType } from "@directus/utils";

//#region src/utils/build-import-plan.ts
/**
* Analyse the requested collections against the schema and produce an import plan: a topological
* order that respects foreign key dependencies, the set of fields that need to be deferred to a
* second pass to break nullable cycles, and the relational field metadata used for validation and
* ID remapping.
*/
function buildImportPlan(input, schema) {
	const nodes = /* @__PURE__ */ new Set();
	const logger = useLogger();
	for (const { collection } of input) {
		if (!schema.collections[collection]) {
			logger.warn(`Import requested for non-existent collection "${collection}"`);
			throw createCollectionForbiddenError("", collection);
		}
		if (nodes.has(collection)) throw new InvalidPayloadError({ reason: `Import payload contains a duplicate collection "${collection}"` });
		nodes.add(collection);
	}
	const fkFields = /* @__PURE__ */ new Map();
	const aliasFields = /* @__PURE__ */ new Map();
	for (const collection of nodes) {
		fkFields.set(collection, []);
		aliasFields.set(collection, []);
	}
	for (const relation of schema.relations) {
		if (nodes.has(relation.collection)) {
			const relationType = getRelationType({
				relation,
				collection: relation.collection,
				field: relation.field,
				useA2O: true
			});
			const nullable = schema.collections[relation.collection]?.fields[relation.field]?.nullable ?? true;
			fkFields.get(relation.collection).push({
				field: relation.field,
				target: relationType === "a2o" ? null : relation.related_collection,
				collectionField: relation.meta?.one_collection_field ?? null,
				allowedCollections: relation.meta?.one_allowed_collections ?? null,
				nullable
			});
		}
		if (relation.related_collection && nodes.has(relation.related_collection) && relation.meta?.one_field) aliasFields.get(relation.related_collection).push({
			field: relation.meta.one_field,
			target: nodes.has(relation.collection) ? relation.collection : null
		});
	}
	let edges = [];
	for (const [collection, fields] of fkFields) for (const info of fields) {
		const targets = info.target ? [info.target] : info.allowedCollections ?? [];
		for (const target of targets) if (nodes.has(target)) edges.push({
			from: collection,
			to: target,
			field: info.field,
			nullable: info.nullable
		});
	}
	const deferred = /* @__PURE__ */ new Map();
	while (true) {
		const scc = findCycleComponent([...nodes], edges);
		if (!scc) break;
		const sccSet = new Set(scc);
		const internalEdges = edges.filter((edge) => sccSet.has(edge.from) && sccSet.has(edge.to));
		const nullableEdges = internalEdges.filter((edge) => edge.nullable).sort((a, b) => a.from.localeCompare(b.from) || a.field.localeCompare(b.field) || a.to.localeCompare(b.to));
		if (nullableEdges.length === 0) throw new ImportCyclicalRelationError({
			collections: [...scc],
			relations: internalEdges.map((edge) => ({
				collection: edge.from,
				field: edge.field,
				related: edge.to
			}))
		});
		const chosen = nullableEdges[0];
		if (!deferred.has(chosen.from)) deferred.set(chosen.from, /* @__PURE__ */ new Set());
		deferred.get(chosen.from).add(chosen.field);
		edges = edges.filter((edge) => !(edge.from === chosen.from && edge.field === chosen.field));
	}
	return {
		order: topologicalSort([...nodes], edges),
		deferred,
		fkFields,
		aliasFields
	};
}
/**
* Return the members of a strongly connected component that contains a cycle (size > 1 or a
* self-loop), or `null` when the graph is acyclic. Uses Tarjan's algorithm.
*/
function findCycleComponent(nodes, edges) {
	const adjacency = /* @__PURE__ */ new Map();
	for (const node of nodes) adjacency.set(node, []);
	for (const edge of edges) adjacency.get(edge.from).push(edge.to);
	const selfLoops = new Set(edges.filter((edge) => edge.from === edge.to).map((edge) => edge.from));
	const index = /* @__PURE__ */ new Map();
	const lowlink = /* @__PURE__ */ new Map();
	const onStack = /* @__PURE__ */ new Set();
	const stack = [];
	let counter = 0;
	let result = null;
	for (const start of nodes) {
		if (index.has(start)) continue;
		const callStack = [{
			node: start,
			next: 0
		}];
		while (callStack.length > 0) {
			const frame = callStack[callStack.length - 1];
			const { node } = frame;
			if (frame.next === 0) {
				index.set(node, counter);
				lowlink.set(node, counter);
				counter++;
				stack.push(node);
				onStack.add(node);
			}
			const neighbours = adjacency.get(node);
			if (frame.next < neighbours.length) {
				const next = neighbours[frame.next];
				frame.next++;
				if (!index.has(next)) callStack.push({
					node: next,
					next: 0
				});
				else if (onStack.has(next)) lowlink.set(node, Math.min(lowlink.get(node), index.get(next)));
				continue;
			}
			if (lowlink.get(node) === index.get(node)) {
				const component = [];
				let member;
				do {
					member = stack.pop();
					onStack.delete(member);
					component.push(member);
				} while (member !== node);
				if (component.length > 1 || selfLoops.has(node)) result = component;
			}
			callStack.pop();
			if (callStack.length > 0) {
				const parent = callStack[callStack.length - 1].node;
				lowlink.set(parent, Math.min(lowlink.get(parent), lowlink.get(node)));
			}
			if (result) return result;
		}
	}
	return result;
}
/**
* Kahn's algorithm. `edges` are dependency edges (from depends on to), so targets are emitted
* before their dependents. Ties are broken alphabetically for deterministic output.
*/
function topologicalSort(nodes, edges) {
	const dependencies = /* @__PURE__ */ new Map();
	const dependents = /* @__PURE__ */ new Map();
	for (const node of nodes) {
		dependencies.set(node, /* @__PURE__ */ new Set());
		dependents.set(node, /* @__PURE__ */ new Set());
	}
	for (const edge of edges) {
		if (edge.from === edge.to) continue;
		dependencies.get(edge.from).add(edge.to);
		dependents.get(edge.to).add(edge.from);
	}
	const order = [];
	const ready = nodes.filter((node) => dependencies.get(node).size === 0).sort();
	while (ready.length > 0) {
		const node = ready.shift();
		order.push(node);
		for (const dependent of [...dependents.get(node)].sort()) {
			const deps = dependencies.get(dependent);
			deps.delete(node);
			if (deps.size === 0) {
				const insertAt = ready.findIndex((n) => n > dependent);
				if (insertAt === -1) ready.push(dependent);
				else ready.splice(insertAt, 0, dependent);
			}
		}
	}
	if (order.length !== nodes.length) throw new UnprocessableContentError({ reason: "Unable to resolve a valid import order" });
	return order;
}

//#endregion
export { buildImportPlan };