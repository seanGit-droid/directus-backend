import { requireText } from "../../../utils/require-text.js";
import { defineTool } from "../define-tool.js";
import { fileURLToPath } from "node:url";
import { z as z$1 } from "zod";
import { dirname, resolve } from "node:path";

//#region src/ai/tools/system/index.ts
const __dirname = dirname(fileURLToPath(import.meta.url));
const SystemPromptInputSchema = z$1.object({});
const SystemPromptValidateSchema = z$1.object({ promptOverride: z$1.union([z$1.string(), z$1.null()]).optional() });
const system = defineTool({
	name: "system-prompt",
	description: "Returns the AI usage guidance configured by this project's administrator, if any.",
	keywords: [
		"instructions",
		"role",
		"assistant prompt",
		"system instructions"
	],
	annotations: { title: "Directus - System Prompt" },
	inputSchema: SystemPromptInputSchema,
	validateSchema: SystemPromptValidateSchema,
	readOnly: true,
	async handler({ args }) {
		return {
			type: "text",
			data: args.promptOverride || requireText(resolve(__dirname, "./prompt.md"))
		};
	}
});

//#endregion
export { system };