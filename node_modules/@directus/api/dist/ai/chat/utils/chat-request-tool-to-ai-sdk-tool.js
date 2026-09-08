import "../../../packages/types/dist/index.js";
import { ToolRegistry } from "../../tools/registry.js";
import { ALL_TOOLS } from "../../tools/index.js";
import { InvalidPayloadError } from "@directus/errors";
import { jsonSchema, tool, zodSchema } from "ai";

//#region src/ai/chat/utils/chat-request-tool-to-ai-sdk-tool.ts
const chatRequestToolsToAiSdkTools = ({ chatRequestTools, accountability, schema, systemPrompt, toolApprovals }) => {
	const requestedToolNames = chatRequestTools.flatMap((chatRequestTool) => {
		if (typeof chatRequestTool !== "string") return [];
		if (isToolDisabled(chatRequestTool, toolApprovals)) return [];
		return [chatRequestTool];
	});
	const mountedRegistry = new ToolRegistry(ALL_TOOLS).mount({
		accountability,
		schema,
		systemPrompt,
		toolNames: requestedToolNames,
		isToolCallApproved: () => true
	});
	const tools = mountedRegistry.getRootTools().reduce((acc, directusTool) => {
		acc[directusTool.name] = directusToolToAiSdkTool({
			directusTool,
			mountedRegistry,
			...toolApprovals && { toolApprovals }
		});
		return acc;
	}, {});
	for (const chatRequestTool of chatRequestTools) {
		if (typeof chatRequestTool === "string") continue;
		if (isToolDisabled(chatRequestTool.name, toolApprovals)) continue;
		if (tools[chatRequestTool.name]) throw new InvalidPayloadError({ reason: `Tool by name "${chatRequestTool.name}" already exists` });
		tools[chatRequestTool.name] = clientToolToAiSdkTool(chatRequestTool);
	}
	return tools;
};
function directusToolToAiSdkTool({ directusTool, mountedRegistry, toolApprovals }) {
	return tool({
		description: directusTool.description,
		inputSchema: zodSchema(directusTool.inputSchema),
		needsApproval: (rawArgs) => needsApproval(directusTool, mountedRegistry, rawArgs, toolApprovals),
		execute: async (rawArgs) => {
			const result = await mountedRegistry.executeRoot(directusTool.name, rawArgs);
			if (!result.ok) return { error: result.error };
			return toModelOutput(result.result);
		}
	});
}
function clientToolToAiSdkTool(chatRequestTool) {
	return tool({
		description: chatRequestTool.description,
		inputSchema: jsonSchema(toToolInputSchema(chatRequestTool.inputSchema))
	});
}
function toToolInputSchema(inputSchema) {
	if (inputSchema.type === "object") return inputSchema;
	if (inputSchema.type !== void 0 || isObjectShapedSchema(inputSchema) === false) throw new InvalidPayloadError({ reason: "Tool input schema must be an object schema" });
	return {
		...inputSchema,
		type: "object"
	};
}
function isObjectShapedSchema(inputSchema) {
	return [
		"properties",
		"required",
		"additionalProperties",
		"patternProperties",
		"propertyNames",
		"minProperties",
		"maxProperties"
	].some((key) => key in inputSchema);
}
function isToolDisabled(name, toolApprovals) {
	return toolApprovals?.[name] === "disabled";
}
function needsApproval(directusTool, mountedRegistry, rawArgs, toolApprovals) {
	if (directusTool.name !== "execute") return false;
	const args = rawArgs;
	const name = typeof args.name === "string" ? args.name : "";
	if (mountedRegistry.isCallReadOnly(name, args.input ?? {})) return false;
	return (toolApprovals?.[name] ?? "ask") !== "always";
}
function toModelOutput(result) {
	if (!result || typeof result.data === "undefined") return null;
	if (result.type !== "text") return result;
	return {
		data: result.data,
		...result.url && { url: result.url }
	};
}

//#endregion
export { chatRequestToolsToAiSdkTools };