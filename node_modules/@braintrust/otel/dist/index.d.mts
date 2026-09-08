import { Span, Context } from '@opentelemetry/api';
import { ReadableSpan, SpanProcessor, Span as Span$1 } from '@opentelemetry/sdk-trace-base';

interface ExportResult {
    code: number;
    error?: Error;
}
/**
 * Custom filter function type for span filtering.
 * @param span - The span to evaluate
 * @returns true to definitely keep, false to definitely drop, null/undefined to not influence the decision
 */
type CustomSpanFilter = (span: ReadableSpan) => boolean | null | undefined;
/**
 * Returns true if the span is a root span (no parent).
 * Checks both parentSpanId (OTel 1.x) and parentSpanContext (OTel 2.x).
 */
declare function isRootSpan(span: ReadableSpan): boolean;
interface BraintrustSpanProcessorOptions {
    /**
     * Braintrust API key. If not provided, will use BRAINTRUST_API_KEY environment variable.
     */
    apiKey?: string;
    /**
     * Braintrust API URL. If not provided, will use BRAINTRUST_API_URL environment variable. Defaults to https://api.braintrust.dev
     */
    apiUrl?: string;
    /**
     * Braintrust parent project name (e.g., "project_name:otel_examples"). If not provided, will use BRAINTRUST_PARENT environment variable.
     */
    parent?: string;
    /**
     * Whether to enable AI span filtering. Defaults to false.
     */
    filterAISpans?: boolean;
    /**
     * Custom filter function for span filtering
     */
    customFilter?: CustomSpanFilter;
    /**
     * Additional headers to send with telemetry data
     */
    headers?: Record<string, string>;
    /**
     * @internal
     * Internal option for dependency injection during testing.
     * If provided, this processor will be used instead of creating an OTLP exporter.
     */
    _spanProcessor?: SpanProcessor;
}
/**
 * A span processor that sends OpenTelemetry spans to Braintrust.
 *
 * This processor uses a BatchSpanProcessor and an OTLP exporter configured
 * to send data to Braintrust's telemetry endpoint. Span filtering is disabled
 * by default but can be enabled with the filterAISpans option.
 *
 * Environment Variables:
 * - BRAINTRUST_API_KEY: Your Braintrust API key
 * - BRAINTRUST_PARENT: Parent identifier (e.g., "project_name:test")
 * - BRAINTRUST_API_URL: Base URL for Braintrust API (defaults to https://api.braintrust.dev)
 *
 * @example
 * ```typescript
 * const processor = new BraintrustSpanProcessor({
 *   apiKey: 'your-api-key',
 *   apiUrl: 'https://api.braintrust.dev'
 * });
 * const provider = new TracerProvider();
 * provider.addSpanProcessor(processor);
 * ```
 *
 * @example With span filtering enabled:
 * ```typescript
 * const processor = new BraintrustSpanProcessor({
 *   apiKey: 'your-api-key',
 *   filterAISpans: true
 * });
 * ```
 *
 * @example Using environment variables:
 * ```typescript
 * // Set environment variables:
 * // BRAINTRUST_API_KEY=your-api-key
 * // BRAINTRUST_PARENT=project_name:test
 * // BRAINTRUST_API_URL=https://api.braintrust.dev
 * const processor = new BraintrustSpanProcessor();
 * ```
 */
declare class BraintrustSpanProcessor implements SpanProcessor {
    private readonly processor;
    private readonly aiSpanProcessor;
    constructor(options?: BraintrustSpanProcessorOptions);
    onStart(span: Span$1, parentContext: Context): void;
    private _getParentOtelBraintrustParent;
    onEnd(span: ReadableSpan): void;
    shutdown(): Promise<void>;
    forceFlush(): Promise<void>;
}
/**
 * Create an OTEL context from a Braintrust span export string.
 *
 * Used for distributed tracing scenarios where a Braintrust span in one service
 * needs to be the parent of an OTEL span in another service.
 *
 * @param exportStr - The string returned from span.export()
 * @returns OTEL context that can be used when creating child spans
 *
 * @example
 * ```typescript
 * // Service A: Create BT span and export
 * const span = logger.startSpan({ name: "service-a" });
 * const exportStr = await span.export();
 * // Send exportStr to Service B (e.g., via HTTP header)
 *
 * // Service B: Import context and create OTEL child
 * import * as api from '@opentelemetry/api';
 * const ctx = contextFromSpanExport(exportStr);
 * await api.context.with(ctx, async () => {
 *   await tracer.startActiveSpan("service-b", async (span) => {
 *     // This span is now a child of the Service A span
 *     span.end();
 *   });
 * });
 * ```
 */
declare function contextFromSpanExport(exportStr: string): unknown;
/**
 * A trace exporter that sends OpenTelemetry spans to Braintrust.
</text>

 *
 * This exporter wraps the standard OTLP trace exporter and can be used with
 * any OpenTelemetry setup, including @vercel/otel's registerOTel function,
 * NodeSDK, or custom tracer providers. It can optionally filter spans to
 * only send AI-related telemetry.
 *
 * Environment Variables:
 * - BRAINTRUST_API_KEY: Your Braintrust API key
 * - BRAINTRUST_PARENT: Parent identifier (e.g., "project_name:test")
 * - BRAINTRUST_API_URL: Base URL for Braintrust API (defaults to https://api.braintrust.dev)
 *
 * @example With @vercel/otel:
 * ```typescript
 * import { registerOTel } from '@vercel/otel';
 * import { BraintrustExporter } from '@braintrust/otel';
 *
 * export function register() {
 *   registerOTel({
 *     serviceName: 'my-app',
 *     traceExporter: new BraintrustExporter({
 *       filterAISpans: true,
 *     }),
 *   });
 * }
 * ```
 *
 * @example With NodeSDK:
 * ```typescript
 * import { NodeSDK } from '@opentelemetry/sdk-node';
 * import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
 * import { BraintrustExporter } from 'braintrust';
 *
 * const sdk = new NodeSDK({
 *   spanProcessors: [
 *     new BatchSpanProcessor(new BraintrustExporter({
 *       apiKey: 'your-api-key',
 *       parent: 'project_name:test'
 *     }))
 *   ]
 * });
 * ```
 */
declare class BraintrustExporter {
    private readonly processor;
    private readonly spans;
    private readonly callbacks;
    constructor(options?: BraintrustSpanProcessorOptions);
    /**
     * Export spans to Braintrust by simulating span processor behavior.
     */
    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void;
    /**
     * Shutdown the exporter.
     */
    shutdown(): Promise<void>;
    /**
     * Force flush the exporter.
     */
    forceFlush(): Promise<void>;
}
/**
 * Add braintrust.parent to OTEL baggage.
 *
 * This ensures that when using propagation inject() for distributed tracing,
 * the braintrust.parent will be propagated via baggage to downstream services.
 *
 * @param parent - Braintrust parent identifier (e.g., "project_name:my-project",
 *                 "project_id:abc123", "experiment_id:exp-456")
 * @param ctx - Optional OTEL context to use. If not provided, uses current context.
 * @returns Updated context with braintrust.parent in baggage
 *
 * @example
 * ```typescript
 * import { addParentToBaggage } from "@braintrust/otel";
 * import { propagation } from "@opentelemetry/api";
 *
 * // Set braintrust.parent in baggage
 * addParentToBaggage("project_name:my-project");
 *
 * // Export headers (will include braintrust.parent in baggage)
 * const headers = {};
 * propagation.inject(context.active(), headers);
 * ```
 */
declare function addParentToBaggage(parent: string, ctx?: Context): Context;
/**
 * Copy braintrust.parent from span attribute to OTEL baggage.
 *
 * BraintrustSpanProcessor automatically sets braintrust.parent as a span attribute
 * when OTEL spans are created within Braintrust contexts. This function copies that
 * attribute to OTEL baggage so it propagates when using inject() for distributed tracing.
 *
 * @param span - OTEL span that has braintrust.parent attribute set
 * @param ctx - Optional OTEL context to use. If not provided, uses current context.
 * @returns Updated context with braintrust.parent in baggage, or undefined if attribute not found
 *
 * @example
 * ```typescript
 * import { otel } from "braintrust";
 * import { propagation } from "@opentelemetry/api";
 *
 * tracer.startActiveSpan("service_b", (span) => {
 *   // Copy braintrust.parent from span attribute to baggage
 *   otel.addSpanParentToBaggage(span);
 *
 *   // Export headers (will include braintrust.parent in baggage)
 *   const headers = {};
 *   propagation.inject(context.active(), headers);
 *   span.end();
 * });
 * ```
 */
declare function addSpanParentToBaggage(span: Span | ReadableSpan, ctx?: Context): Context | undefined;
/**
 * Extract a Braintrust-compatible parent string from W3C Trace Context headers.
 *
 * This converts OTEL trace context headers (traceparent/baggage) into a format
 * that can be passed as the 'parent' parameter to Braintrust's traced() method.
 *
 * @param headers - Dictionary with 'traceparent' and optionally 'baggage' keys
 * @returns Braintrust V4 export string that can be used as parent parameter,
 *          or undefined if no valid span context is found or braintrust.parent is missing.
 *
 * @example
 * ```typescript
 * import { initLogger } from "braintrust";
 * import { parentFromHeaders } from "@braintrust/otel";
 *
 * // Service C receives headers from Service B
 * const headers = { traceparent: '00-trace_id-span_id-01', baggage: '...' };
 * const parent = parentFromHeaders(headers);
 *
 * const logger = initLogger({ projectName: "my-project" });
 * await logger.traced(async (span) => {
 *   span.log({ input: "BT span as child of OTEL parent" });
 * }, { name: "service_c", parent });
 * ```
 */
declare function parentFromHeaders(headers: Record<string, string>): string | undefined;

declare const setupOtelCompat: () => void;
declare const resetOtelCompat: () => void;

export { BraintrustExporter, BraintrustSpanProcessor, addParentToBaggage, addSpanParentToBaggage, contextFromSpanExport, isRootSpan, parentFromHeaders, resetOtelCompat, setupOtelCompat };
