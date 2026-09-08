import { z as z$1 } from "zod";

//#region src/ai/tools/search-index.ts
const indexedToolCache = /* @__PURE__ */ new WeakMap();
const BM25_K1 = 1.2;
const BM25_B = .75;
const FIELD_WEIGHTS = {
	name: 3,
	keywords: 2,
	description: 2,
	arguments: 1,
	instructions: 1
};
function createSearchIndex(tools) {
	const indexedTools = tools.map(getIndexedTool).sort((a, b) => a.tool.name.localeCompare(b.tool.name));
	const availableToolNames = indexedTools.map(({ tool }) => tool.name);
	return { search(query) {
		const queryTokens = tokenize(query);
		if (queryTokens.length === 0) return {
			results: indexedTools.map(({ match }) => match),
			availableToolNames
		};
		const ranked = rankTools(indexedTools, queryTokens);
		if (ranked.length === 0) return {
			results: [],
			availableToolNames,
			hint: `No tools matched. Available tools: ${availableToolNames.join(", ")}`
		};
		return { results: ranked.map(({ match }) => match) };
	} };
}
function getIndexedTool(tool) {
	let indexedTool = indexedToolCache.get(tool);
	if (!indexedTool) {
		indexedTool = indexTool(tool);
		indexedToolCache.set(tool, indexedTool);
	}
	return indexedTool;
}
function indexTool(tool) {
	const termFrequency = /* @__PURE__ */ new Map();
	const fieldWeights = /* @__PURE__ */ new Map();
	addFieldTerms(termFrequency, fieldWeights, tokenize(tool.name), FIELD_WEIGHTS.name);
	addFieldTerms(termFrequency, fieldWeights, tokenize(tool.keywords?.join(" ") ?? ""), FIELD_WEIGHTS.keywords);
	addFieldTerms(termFrequency, fieldWeights, tokenize(tool.description), FIELD_WEIGHTS.description);
	addFieldTerms(termFrequency, fieldWeights, getArgumentTokens(tool), FIELD_WEIGHTS.arguments);
	addFieldTerms(termFrequency, fieldWeights, tokenize(tool.instructions ?? ""), FIELD_WEIGHTS.instructions);
	return {
		tool,
		match: {
			name: tool.name,
			description: tool.description
		},
		normalizedName: tokenize(tool.name).join(" "),
		termFrequency,
		fieldWeights,
		documentLength: [...termFrequency.values()].reduce((sum, count) => sum + count, 0)
	};
}
function rankTools(indexedTools, queryTokens) {
	const queryTerms = [...new Set(queryTokens)];
	const documentFrequencies = getDocumentFrequencies(indexedTools, queryTerms);
	const averageDocumentLength = getAverageDocumentLength(indexedTools);
	const normalizedQuery = queryTokens.join(" ");
	return indexedTools.map((tool) => ({
		tool,
		fieldScore: getFieldScore(tool, queryTerms),
		score: scoreTool(tool, queryTerms, documentFrequencies, indexedTools.length, averageDocumentLength),
		exactNameMatch: tool.normalizedName === normalizedQuery
	})).filter(({ score, exactNameMatch }) => exactNameMatch || score > 0).sort((a, b) => {
		if (a.exactNameMatch !== b.exactNameMatch) return a.exactNameMatch ? -1 : 1;
		if (a.fieldScore !== b.fieldScore) return b.fieldScore - a.fieldScore;
		if (a.score !== b.score) return b.score - a.score;
		return a.tool.tool.name.localeCompare(b.tool.tool.name);
	}).map(({ tool }) => tool);
}
function scoreTool(tool, queryTerms, documentFrequencies, documentCount, averageDocumentLength) {
	if (tool.documentLength === 0) return 0;
	return queryTerms.reduce((score, term) => {
		const termFrequency = tool.termFrequency.get(term) ?? 0;
		if (termFrequency === 0) return score;
		const documentFrequency = documentFrequencies.get(term) ?? 0;
		const fieldWeight = tool.fieldWeights.get(term) ?? 0;
		const idf = Math.log(1 + (documentCount - documentFrequency + .5) / (documentFrequency + .5));
		const denominator = termFrequency + BM25_K1 * (1 - BM25_B + BM25_B * (tool.documentLength / averageDocumentLength));
		return score + fieldWeight * idf * (termFrequency * (BM25_K1 + 1) / denominator);
	}, 0);
}
function getFieldScore(tool, queryTerms) {
	return queryTerms.reduce((score, term) => score + (tool.fieldWeights.get(term) ?? 0), 0);
}
function getDocumentFrequencies(indexedTools, queryTerms) {
	const frequencies = /* @__PURE__ */ new Map();
	for (const term of queryTerms) frequencies.set(term, indexedTools.reduce((count, tool) => count + (tool.termFrequency.has(term) ? 1 : 0), 0));
	return frequencies;
}
function getAverageDocumentLength(indexedTools) {
	if (indexedTools.length === 0) return 1;
	return indexedTools.reduce((sum, tool) => sum + tool.documentLength, 0) / indexedTools.length || 1;
}
function getArgumentTokens(tool) {
	return collectSchemaTokens(z$1.toJSONSchema(tool.inputSchema, { io: "input" }));
}
function collectSchemaTokens(schema) {
	if (!schema) return [];
	const tokens = [];
	tokens.push(...tokenize(schema.description ?? ""));
	for (const [name, property] of Object.entries(schema.properties ?? {})) {
		tokens.push(...tokenize(name));
		tokens.push(...collectSchemaTokens(property));
	}
	if (schema.items) {
		const items = Array.isArray(schema.items) ? schema.items : [schema.items];
		for (const item of items) tokens.push(...collectSchemaTokens(item));
	}
	for (const item of schema.prefixItems ?? []) tokens.push(...collectSchemaTokens(item));
	for (const item of [
		...schema.anyOf ?? [],
		...schema.oneOf ?? [],
		...schema.allOf ?? []
	]) tokens.push(...collectSchemaTokens(item));
	for (const def of Object.values(schema.$defs ?? {})) tokens.push(...collectSchemaTokens(def));
	return tokens;
}
function addFieldTerms(termFrequency, fieldWeights, terms, weight) {
	for (const term of terms) {
		termFrequency.set(term, (termFrequency.get(term) ?? 0) + 1);
		fieldWeights.set(term, Math.max(fieldWeights.get(term) ?? 0, weight));
	}
}
function tokenize(value) {
	return value.replaceAll(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").replaceAll(/([a-z0-9])([A-Z])/g, "$1 $2").match(/[A-Za-z0-9]+/g)?.map((token) => token.toLowerCase()) ?? [];
}

//#endregion
export { createSearchIndex };