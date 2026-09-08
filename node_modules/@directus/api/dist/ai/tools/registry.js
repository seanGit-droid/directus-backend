import { Url } from "../../utils/url.js";
import { coerceJsonFields } from "./utils.js";
import { schema } from "./schema/index.js";
import { getToolTypeStrings } from "./schema-to-type-string.js";
import { createSearchIndex } from "./search-index.js";
import { useEnv } from "@directus/env";
import { InvalidPayloadError, isDirectusError } from "@directus/errors";
import { isObject, toArray } from "@directus/utils";
import { fromZodError } from "zod-validation-error";
import { z as z$1 } from "zod";

//#region src/ai/tools/registry.ts
var ToolRegistry = class {
	#tools = /* @__PURE__ */ new Map();
	constructor(tools = []) {
		for (const tool of tools) this.register(tool);
	}
	register(tool) {
		this.#tools.set(tool.name, tool);
	}
	mount(context) {
		return new MountedToolRegistry([...this.#tools.values()], context);
	}
};
var MountedToolRegistry = class {
	#context;
	#catalog;
	constructor(tools, context) {
		this.#context = context;
		this.#catalog = new Map(tools.map((tool) => [tool.name, tool]));
	}
	get tools() {
		return this.#getVisibleTools();
	}
	search(query) {
		return createSearchIndex(this.#getVisibleTools().filter((tool) => tool.exposure !== "root")).search(query);
	}
	detail(names) {
		return names.flatMap((name) => {
			const tool = this.#getVisibleTool(name);
			return tool && tool.exposure !== "root" ? [this.#toDetail(tool)] : [];
		});
	}
	getRootTools() {
		const rootTools = [searchRootTool, executeRootTool];
		const mountedSchemaTool = this.#getVisibleTool(schema.name);
		if (mountedSchemaTool) rootTools.push(mountedSchemaTool);
		return rootTools.map((tool) => ({
			...tool,
			annotations: {
				...tool.annotations,
				readOnlyHint: tool.readOnly === true,
				destructiveHint: tool.readOnly !== true
			}
		}));
	}
	async executeRoot(name, input) {
		try {
			switch (name) {
				case searchRootTool.name: {
					const args = this.#parseInput(searchRootTool, input);
					return {
						ok: true,
						result: {
							type: "text",
							data: args.query !== void 0 ? this.search(args.query) : { results: this.detail(args.names ?? []) }
						}
					};
				}
				case executeRootTool.name: {
					const args = this.#parseInput(executeRootTool, input);
					return await this.execute(args.name, args.input);
				}
				default: {
					const tool = this.#getVisibleTool(name);
					if (tool && tool.exposure === "root") return await this.#executeTool(tool, input);
					return {
						ok: false,
						error: {
							code: "UNKNOWN_META_TOOL",
							message: `"${name}" doesn't exist in the root toolset`,
							recoverable: false
						}
					};
				}
			}
		} catch (error) {
			return {
				ok: false,
				error: toRegistryError(error)
			};
		}
	}
	async execute(name, input) {
		const tool = this.#getVisibleTool(name);
		if (!tool) return {
			ok: false,
			error: {
				code: "UNKNOWN_TOOL",
				message: `"${name}" doesn't exist in the toolset`,
				recoverable: true,
				next: {
					tool: "search",
					input: { query: name }
				}
			}
		};
		return this.#executeTool(tool, input);
	}
	isCallReadOnly(name, input) {
		const tool = this.#getVisibleTool(name);
		if (!tool) return true;
		try {
			const args = this.#parseInput(tool, input);
			return this.#isReadOnly(tool, args);
		} catch {
			return true;
		}
	}
	async #executeTool(tool, input) {
		try {
			const args = this.#parseInput(tool, input);
			if (this.#context.allowDeletes === false && args["action"] === "delete") throw new InvalidPayloadError({ reason: "Delete actions are disabled" });
			if (!this.#isReadOnly(tool, args) && this.#context.isToolCallApproved?.({
				tool,
				args
			}) !== true) return {
				ok: false,
				error: {
					code: "APPROVAL_REQUIRED",
					message: `"${tool.name}" requires approval before execution`,
					recoverable: true
				}
			};
			const result = await tool.handler({
				args,
				schema: this.#context.schema,
				accountability: this.#context.accountability
			});
			this.#addUrl(tool, args, result);
			return {
				ok: true,
				...result && { result },
				...tool.output && result?.type === "text" ? { structuredContent: { data: result.data } } : {}
			};
		} catch (error) {
			return {
				ok: false,
				error: toRegistryError(error, tool)
			};
		}
	}
	#getVisibleTools() {
		return [...this.#catalog.values()].filter((tool) => this.#isToolVisible(tool));
	}
	#getVisibleTool(name) {
		const tool = this.#catalog.get(name);
		return tool && this.#isToolVisible(tool) ? tool : void 0;
	}
	#isToolVisible(tool) {
		const allowedNames = this.#context.toolNames ? new Set(this.#context.toolNames) : null;
		if (allowedNames && !allowedNames.has(tool.name) && tool.exposure !== "root") return false;
		if (this.#context.accountability?.admin !== true && tool.admin === true) return false;
		if (tool.name === "system-prompt" && this.#context.systemPromptEnabled === false) return false;
		return true;
	}
	#parseInput(tool, input) {
		const rawInput = tool.name === "system-prompt" ? { promptOverride: this.#context.systemPrompt } : input;
		if (!isObject(rawInput)) throw new InvalidPayloadError({ reason: "\"arguments\" must be an object" });
		const coercedArgs = coerceJsonFields(rawInput);
		const { error, data: args } = tool.validateSchema?.safeParse(coercedArgs) ?? { data: coercedArgs };
		if (error) throw new InvalidPayloadError({ reason: fromZodError(error).message });
		if (!isObject(args)) throw new InvalidPayloadError({ reason: "\"arguments\" must be an object" });
		return args;
	}
	#isReadOnly(tool, args) {
		if (tool.readOnly === true) return true;
		if (typeof tool.readOnly === "function") return tool.readOnly(args);
		return false;
	}
	#addUrl(tool, args, result) {
		if (!("action" in args) || ![
			"create",
			"update",
			"read",
			"import"
		].includes(args["action"])) return;
		if (!result?.data) return;
		const data = toArray(result.data);
		if (data.length !== 1) return;
		result.url = buildURL(tool, args, data[0]);
	}
	#toDetail(tool) {
		const typeStrings = getToolTypeStrings(tool);
		return {
			name: tool.name,
			description: tool.description,
			...typeStrings,
			...tool.instructions && { instructions: tool.instructions }
		};
	}
};
const SearchInputSchema = z$1.object({
	query: z$1.union([z$1.string(), z$1.null()]).describe("Search query. Use query mode by omitting names. Omit or send null when loading names.").optional(),
	names: z$1.array(z$1.string()).describe("Tool names to load details for. Batch all selected names in one call. Omit when using query.").optional()
});
const SearchValidateSchema = SearchInputSchema.transform((input, ctx) => {
	const query = input.query?.trim();
	const names = input.names?.map((name) => name.trim()).filter((name) => name.length > 0) ?? [];
	const hasQuery = query !== void 0 && query.length > 0;
	const hasNames = names.length > 0;
	if ((hasQuery ? 1 : 0) + (hasNames ? 1 : 0) !== 1) {
		ctx.addIssue({
			code: "custom",
			message: "Provide exactly one of \"query\" or \"names\""
		});
		return z$1.NEVER;
	}
	if (hasQuery) return { query };
	return { names };
});
const ExecuteInputSchema = z$1.object({
	name: z$1.string(),
	input: z$1.record(z$1.string(), z$1.unknown()).default({})
});
const searchRootTool = {
	name: "search",
	description: "Searches available Directus tools. Use query for discovery. Use names to load full details for selected tools before execute. Batch all selected names in one names array. Never send both query and names.",
	inputSchema: SearchInputSchema,
	validateSchema: SearchValidateSchema,
	readOnly: true
};
const executeRootTool = {
	name: "execute",
	description: "Executes a Directus tool after its details were loaded with search({ names }). The name must be an inner tool name like \"collections\", \"fields\", or \"relations\", never a root tool name like \"search\" or \"execute\". If the result includes next, call that tool with that input and retry.",
	inputSchema: ExecuteInputSchema,
	validateSchema: ExecuteInputSchema,
	annotations: { openWorldHint: true }
};
function buildURL(tool, input, data) {
	const publicURL = useEnv()["PUBLIC_URL"];
	if (!publicURL || !tool.endpoint) return;
	const path = tool.endpoint({
		input,
		data
	});
	if (!path) return;
	return new Url(publicURL).addPath("admin", ...path).toString();
}
function toRegistryError(error, tool) {
	if (isDirectusError(error)) return {
		code: error.code,
		message: error.message || "Unknown error",
		recoverable: error instanceof InvalidPayloadError,
		...error instanceof InvalidPayloadError && tool && tool.exposure !== "root" ? { next: {
			tool: "search",
			input: { names: [tool.name] }
		} } : {}
	};
	const code = typeof error === "object" && error !== null && "code" in error && error.code ? String(error.code) : "TOOL_EXECUTION_FAILED";
	if (error instanceof Error) return {
		code,
		message: error.message,
		recoverable: false
	};
	if (typeof error === "object" && error !== null) return {
		code,
		message: "message" in error ? String(error.message) : "An unknown error occurred.",
		recoverable: false
	};
	return {
		code,
		message: typeof error === "string" ? error : "An unknown error occurred.",
		recoverable: false
	};
}

//#endregion
export { MountedToolRegistry, ToolRegistry };