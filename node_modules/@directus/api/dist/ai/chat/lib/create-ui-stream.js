import { useLogger } from "../../../logger/index.js";
import { getDevToolsMiddleware } from "../../devtools/index.js";
import { buildProviderConfigs, createAIProviderRegistry } from "../../providers/registry.js";
import { getProviderOptions } from "../../providers/options.js";
import "../../providers/index.js";
import { getAITelemetryConfig } from "../../telemetry/index.js";
import { SYSTEM_PROMPT } from "../constants/system-prompt.js";
import { formatContextForSystemPrompt } from "../utils/format-context.js";
import { applyAnthropicConversationCaching, buildCacheAwareSystemPrompt, formatUsageWithCacheTokens, sortToolsByName } from "../utils/prompt-caching.js";
import { ipValidatedDownload } from "./ip-validated-download.js";
import { transformFilePartsForProvider } from "./transform-file-parts.js";
import { ServiceUnavailableError } from "@directus/errors";
import { convertToModelMessages, stepCountIs, streamText, wrapLanguageModel } from "ai";

//#region src/ai/chat/lib/create-ui-stream.ts
const createUiStream = async (messages, { provider, model, tools, aiSettings, systemPrompt, userId, role, context, onUsage }) => {
	const configs = buildProviderConfigs(aiSettings);
	if (!configs.find((c) => c.type === provider)) throw new ServiceUnavailableError({
		service: provider,
		reason: "No API key configured for LLM provider"
	});
	const registry = createAIProviderRegistry(configs, aiSettings);
	const baseSystemPrompt = systemPrompt || SYSTEM_PROMPT;
	const contextBlock = context ? formatContextForSystemPrompt(context) : null;
	const providerOptions = getProviderOptions(provider, model, aiSettings);
	let languageModel = registry.languageModel(`${provider}:${model}`);
	const devToolsMiddleware = getDevToolsMiddleware();
	if (devToolsMiddleware) languageModel = wrapLanguageModel({
		model: languageModel,
		middleware: devToolsMiddleware
	});
	const streamSystemPrompt = buildCacheAwareSystemPrompt(provider, provider === "anthropic" || !contextBlock ? baseSystemPrompt : baseSystemPrompt + contextBlock);
	const finalTools = sortToolsByName(tools);
	const telemetryConfig = getAITelemetryConfig({
		provider,
		model,
		userId,
		role
	});
	const logger = useLogger();
	const streamMessages = applyAnthropicConversationCaching(provider, await convertToModelMessages(transformFilePartsForProvider(messages)), contextBlock);
	return streamText({
		system: streamSystemPrompt,
		model: languageModel,
		messages: streamMessages,
		stopWhen: [stepCountIs(10)],
		experimental_download: ipValidatedDownload,
		providerOptions,
		tools: finalTools,
		...telemetryConfig ? { experimental_telemetry: telemetryConfig } : {},
		onError(error) {
			logger.error({ error }, "AI chat stream failed");
		},
		onFinish(result) {
			if (onUsage) onUsage(formatUsageWithCacheTokens(result));
		}
	});
};

//#endregion
export { createUiStream };