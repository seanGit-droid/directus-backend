import { I as InstrumentationConfig } from './types-C1fVeiCp.mjs';

/**
 * Instrumentation configurations for the OpenAI SDK.
 *
 * These configs define which functions to instrument and what channel
 * to emit events on. They are used by orchestrion-js to perform AST
 * transformation at build-time or load-time.
 *
 * NOTE: Channel names should NOT include the orchestrion: prefix. The code-transformer
 * will prepend "orchestrion:" + module.name + ":" to these names, resulting in final channel names like:
 * "orchestrion:openai:chat.completions.create"
 */
declare const openaiConfigs: InstrumentationConfig[];

declare const openAICodexConfigs: InstrumentationConfig[];

/**
 * Instrumentation configurations for the Anthropic SDK.
 *
 * These configs define which functions to instrument and what channel
 * to emit events on. They are used by orchestrion-js to perform AST
 * transformation at build-time or load-time.
 *
 * NOTE: Channel names should NOT include the orchestrion: prefix. The code-transformer
 * will prepend "orchestrion:" + module.name + ":" to these names, resulting in final channel names like:
 * "orchestrion:@anthropic-ai/sdk:messages.create"
 */
declare const anthropicConfigs: InstrumentationConfig[];

declare const bedrockRuntimeConfigs: InstrumentationConfig[];

/**
 * Instrumentation configurations for the Vercel AI SDK.
 *
 * These configs define which functions to instrument and what channel
 * to emit events on. They are used by orchestrion-js to perform AST
 * transformation at build-time or load-time.
 *
 * NOTE: Channel names should NOT include the braintrust: prefix. The code-transformer
 * will prepend "orchestrion:ai-sdk:" to these names, resulting in final channel names like:
 * "orchestrion:ai-sdk:generateText"
 */
declare const aiSDKConfigs: InstrumentationConfig[];

/**
 * Instrumentation configuration for the Claude Agent SDK.
 *
 * This config defines which functions to instrument and what channel
 * to emit events on. It is used by orchestrion-js to perform AST
 * transformation at build-time or load-time.
 *
 * NOTE: Channel names should NOT include the braintrust: prefix. The code-transformer
 * will prepend "orchestrion:claude-agent-sdk:" to these names, resulting in final channel
 * names like: "orchestrion:claude-agent-sdk:query"
 */
declare const claudeAgentSDKConfigs: InstrumentationConfig[];

declare const cloudflareAgentsConfigs: InstrumentationConfig[];

declare const cloudflareThinkConfigs: InstrumentationConfig[];

declare const cursorSDKConfigs: InstrumentationConfig[];

declare const openAIAgentsCoreConfigs: InstrumentationConfig[];

/**
 * Instrumentation configurations for the Google GenAI SDK.
 *
 * These configs define which functions to instrument and what channel
 * to emit events on. They are used by orchestrion-js to perform AST
 * transformation at build-time or load-time.
 *
 * NOTE: Channel names should NOT include the braintrust: prefix. The code-transformer
 * will prepend "orchestrion:google-genai:" to these names, resulting in final channel names like:
 * "orchestrion:google-genai:models.generateContent"
 */
declare const googleGenAIConfigs: InstrumentationConfig[];

declare const huggingFaceConfigs: InstrumentationConfig[];

declare const openRouterAgentConfigs: InstrumentationConfig[];

declare const openRouterConfigs: InstrumentationConfig[];

declare const mistralConfigs: InstrumentationConfig[];

declare const ollamaConfigs: InstrumentationConfig[];

/**
 * Instrumentation configurations for the Google ADK (@google/adk).
 *
 * Runner.runAsync and BaseAgent.runAsync are async generators (`async *`).
 * They synchronously return an AsyncGenerator object, so we use kind "Sync"
 * paired with "sync-stream" channels — the same pattern used by the
 * Claude Agent SDK's `query` function.
 *
 * FunctionTool.runAsync is a regular async method (returns Promise<unknown>)
 * and uses kind "Async".
 */
declare const googleADKConfigs: InstrumentationConfig[];

declare const cloudflareAIChatConfigs: InstrumentationConfig[];

declare const cohereConfigs: InstrumentationConfig[];

declare const groqConfigs: InstrumentationConfig[];

/**
 * Instrumentation configurations for Genkit's JavaScript SDK.
 *
 * Genkit's public instance methods live on the GenkitAI base class in
 * @genkit-ai/ai. The top-level `genkit` package subclasses that class, so
 * targeting these methods instruments regular `genkit({ ... })` instances.
 */
declare const genkitConfigs: InstrumentationConfig[];

declare const gitHubCopilotConfigs: InstrumentationConfig[];

declare const langchainConfigs: InstrumentationConfig[];

declare const langSmithConfigs: InstrumentationConfig[];

declare const piCodingAgentConfigs: InstrumentationConfig[];

export { InstrumentationConfig, aiSDKConfigs, anthropicConfigs, bedrockRuntimeConfigs, claudeAgentSDKConfigs, cloudflareAIChatConfigs, cloudflareAgentsConfigs, cloudflareThinkConfigs, cohereConfigs, cursorSDKConfigs, genkitConfigs, gitHubCopilotConfigs, googleADKConfigs, googleGenAIConfigs, groqConfigs, huggingFaceConfigs, langSmithConfigs, langchainConfigs, mistralConfigs, ollamaConfigs, openAIAgentsCoreConfigs, openAICodexConfigs, openRouterAgentConfigs, openRouterConfigs, openaiConfigs, piCodingAgentConfigs };
