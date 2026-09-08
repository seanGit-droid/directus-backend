import { LanguageModelV3Middleware } from '@ai-sdk/provider';

/**
 * Factory function that creates a devtools middleware instance.
 * Each call generates a unique run ID, so all steps within a single
 * streamText/generateText call share the same run.
 *
 * Usage:
 * ```ts
 * const result = streamText({
 *   model: wrapLanguageModel({
 *     middleware: devToolsMiddleware(),
 *     model: yourModel,
 *   }),
 *   prompt: "...",
 * });
 * ```
 */
declare const devToolsMiddleware: () => LanguageModelV3Middleware;

export { devToolsMiddleware };
