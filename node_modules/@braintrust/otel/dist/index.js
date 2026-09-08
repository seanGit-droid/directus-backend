"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BraintrustExporter: () => BraintrustExporter,
  BraintrustSpanProcessor: () => BraintrustSpanProcessor,
  addParentToBaggage: () => addParentToBaggage,
  addSpanParentToBaggage: () => addSpanParentToBaggage,
  contextFromSpanExport: () => contextFromSpanExport,
  isRootSpan: () => isRootSpan,
  parentFromHeaders: () => parentFromHeaders,
  resetOtelCompat: () => resetOtelCompat,
  setupOtelCompat: () => setupOtelCompat
});
module.exports = __toCommonJS(index_exports);

// src/context.ts
var import_braintrust2 = require("braintrust");
var import_api2 = require("@opentelemetry/api");

// src/otel.ts
var import_util = require("braintrust/util");
var import_exporter_trace_otlp_http = require("@opentelemetry/exporter-trace-otlp-http");
var import_api = require("@opentelemetry/api");
var import_sdk_trace_base = require("@opentelemetry/sdk-trace-base");
var import_braintrust = require("braintrust");
var FILTER_PREFIXES = [
  "gen_ai.",
  "braintrust.",
  "llm.",
  "ai.",
  "traceloop."
];
function isReadableSpan(span) {
  return "attributes" in span;
}
function isRootSpan(span) {
  const hasParent = "parentSpanId" in span && span.parentSpanId || "parentSpanContext" in span && span.parentSpanContext;
  return !hasParent;
}
function isAISpan(span) {
  if (FILTER_PREFIXES.some((prefix) => span.name.startsWith(prefix))) {
    return true;
  }
  const attributes = span.attributes;
  if (attributes) {
    const attributeNames = Object.keys(attributes);
    if (attributeNames.some(
      (name) => FILTER_PREFIXES.some((prefix) => name.startsWith(prefix))
    )) {
      return true;
    }
  }
  return false;
}
var AISpanProcessor = class {
  processor;
  customFilter;
  /**
   * Initialize the filter span processor.
   *
   * @param processor - The wrapped span processor that will receive filtered spans
   * @param customFilter - Optional function that takes a span and returns:
   *                      true to keep, false to drop,
   *                      null/undefined to not influence the decision
   */
  constructor(processor, customFilter) {
    this.processor = processor;
    this.customFilter = customFilter || isAISpan;
  }
  /**
   * Forward span start events to the inner processor.
   */
  onStart(span, parentContext) {
    this.processor.onStart(span, parentContext);
  }
  /**
   * Apply filtering logic and conditionally forward span end events.
   */
  onEnd(span) {
    const shouldKeep = this.shouldKeepFilteredSpan(span);
    if (shouldKeep) {
      this.processor.onEnd(span);
    }
  }
  /**
   * Shutdown the inner processor.
   */
  shutdown() {
    return this.processor.shutdown();
  }
  /**
   * Force flush the inner processor.
   */
  forceFlush() {
    return this.processor.forceFlush();
  }
  /**
   * Determine if a span should be kept based on filtering criteria.
   *
   * Keep spans if:
   * 1. Custom filter returns true/false (if provided)
   * 2. Span name starts with 'gen_ai.', 'braintrust.', 'llm.', 'ai.', or 'traceloop.'
   * 3. Any attribute name starts with those prefixes
   */
  shouldKeepFilteredSpan(span) {
    if (!span) {
      return false;
    }
    const result = this.customFilter(span);
    if (typeof result === "boolean") {
      return result;
    }
    return isAISpan(span);
  }
};
var BraintrustSpanProcessor = class {
  processor;
  aiSpanProcessor;
  constructor(options = {}) {
    if (options._spanProcessor) {
      this.processor = options._spanProcessor;
      if (options.filterAISpans === true) {
        this.aiSpanProcessor = new AISpanProcessor(
          this.processor,
          options.customFilter
        );
      } else {
        this.aiSpanProcessor = this.processor;
      }
      return;
    }
    const apiKey = options.apiKey || process.env.BRAINTRUST_API_KEY;
    if (!apiKey) {
      throw new Error(
        "Braintrust API key is required. Set BRAINTRUST_API_KEY environment variable or pass apiKey option."
      );
    }
    let apiUrl = options.apiUrl || process.env.BRAINTRUST_API_URL || "https://api.braintrust.dev";
    if (!apiUrl.endsWith("/")) {
      apiUrl += "/";
    }
    let parent = options.parent || process.env.BRAINTRUST_PARENT;
    if (!parent) {
      parent = "project_name:default-otel-project";
      console.info(
        `No parent specified, using default: ${parent}. Configure with BRAINTRUST_PARENT environment variable or parent parameter.`
      );
    }
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "x-bt-parent": parent,
      ...options.headers
    };
    const baseExporter = new import_exporter_trace_otlp_http.OTLPTraceExporter({
      url: new URL("otel/v1/traces", apiUrl).href,
      headers
    });
    const exporter = baseExporter;
    this.processor = new import_sdk_trace_base.BatchSpanProcessor(exporter);
    if (options.filterAISpans === true) {
      this.aiSpanProcessor = new AISpanProcessor(
        this.processor,
        options.customFilter
      );
    } else {
      this.aiSpanProcessor = this.processor;
    }
  }
  onStart(span, parentContext) {
    try {
      let parentValue;
      if (import_api.context) {
        const currentContext = import_api.context.active();
        const contextValue = currentContext.getValue?.(
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
          "braintrust.parent"
        );
        if (typeof contextValue === "string") {
          parentValue = contextValue;
        }
        if (!parentValue && parentContext) {
          const parentContextValue = typeof parentContext.getValue === "function" ? (
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
            parentContext.getValue("braintrust.parent")
          ) : void 0;
          if (typeof parentContextValue === "string") {
            parentValue = parentContextValue;
          }
        }
        if (!parentValue && parentContext) {
          parentValue = this._getParentOtelBraintrustParent(parentContext);
        }
        if (parentValue) {
          span.setAttributes?.({ "braintrust.parent": parentValue });
        }
      }
    } catch {
    }
    this.aiSpanProcessor.onStart(span, parentContext);
  }
  _getParentOtelBraintrustParent(parentContext) {
    const currentSpan = import_api.trace?.getSpan(parentContext);
    if (currentSpan && typeof currentSpan === "object" && "attributes" in currentSpan && typeof currentSpan.attributes === "object") {
      const attributes = currentSpan.attributes;
      const parentAttr = attributes["braintrust.parent"];
      return typeof parentAttr === "string" ? parentAttr : void 0;
    }
    return void 0;
  }
  onEnd(span) {
    this.aiSpanProcessor.onEnd(span);
  }
  shutdown() {
    return this.aiSpanProcessor.shutdown();
  }
  forceFlush() {
    return this.aiSpanProcessor.forceFlush();
  }
};
function contextFromSpanExport(exportStr) {
  const components = import_util.SpanComponentsV4.fromStr(exportStr);
  const traceIdHex = components.data.root_span_id;
  const spanIdHex = components.data.span_id;
  if (!traceIdHex || !spanIdHex) {
    throw new Error(
      "Export string must contain root_span_id and span_id for distributed tracing"
    );
  }
  const spanContext = {
    traceId: traceIdHex,
    spanId: spanIdHex,
    isRemote: true,
    traceFlags: import_api.TraceFlags?.SAMPLED ?? 1
    // SAMPLED flag
  };
  const nonRecordingSpan = import_api.trace.wrapSpanContext(spanContext);
  let ctx = import_api.trace.setSpan(import_api.context.active(), nonRecordingSpan);
  const braintrustParent = getBraintrustParent(
    components.data.object_type,
    components.data.object_id,
    components.data.compute_object_metadata_args
  );
  if (braintrustParent) {
    try {
      if (import_api.propagation) {
        const baggage = import_api.propagation.getBaggage(ctx) || import_api.propagation.createBaggage();
        ctx = import_api.propagation.setBaggage(
          ctx,
          baggage.setEntry("braintrust.parent", {
            value: braintrustParent
          })
        );
      }
    } catch (error) {
      console.error(
        "Failed to set braintrust.parent in baggage during context import:",
        error
      );
    }
  }
  return ctx;
}
function getBraintrustParent(objectType, objectId, computeArgs) {
  if (!objectType) {
    return void 0;
  }
  if (objectType === import_util.SpanObjectTypeV3.PROJECT_LOGS) {
    if (objectId) {
      return `project_id:${objectId}`;
    } else if (computeArgs) {
      const projectId = computeArgs["project_id"];
      const projectName = computeArgs["project_name"];
      if (typeof projectId === "string") {
        return `project_id:${projectId}`;
      } else if (typeof projectName === "string") {
        return `project_name:${projectName}`;
      }
    }
  } else if (objectType === import_util.SpanObjectTypeV3.EXPERIMENT) {
    if (objectId) {
      return `experiment_id:${objectId}`;
    } else if (computeArgs) {
      const experimentId = computeArgs["experiment_id"];
      if (typeof experimentId === "string") {
        return `experiment_id:${experimentId}`;
      }
    }
  }
  return void 0;
}
function getOtelParentFromSpan(span) {
  const parent = span.getParentInfo();
  if (!parent || !parent.objectType || !parent.objectId) {
    return void 0;
  }
  try {
    if (parent.objectType === import_util.SpanObjectTypeV3.PROJECT_LOGS) {
      const syncResult = parent.objectId.getSync();
      const id = syncResult?.value;
      const args = parent.computeObjectMetadataArgs;
      if (id) {
        return `project_id:${id}`;
      }
      const projectName = args?.project_name;
      if (typeof projectName === "string") {
        return `project_name:${projectName}`;
      }
    } else if (parent.objectType === import_util.SpanObjectTypeV3.EXPERIMENT) {
      const syncResult = parent.objectId.getSync();
      const id = syncResult?.value;
      console.debug("[getOtelParentFromSpan] EXPERIMENT", { id });
      if (id) {
        console.debug(
          "[getOtelParentFromSpan] EXPERIMENT using experiment_id",
          { id }
        );
        return `experiment_id:${id}`;
      }
    }
  } catch (e) {
    console.warn("[getOtelParentFromSpan] error extracting parent", e);
  }
  return void 0;
}
var BraintrustExporter = class {
  processor;
  spans = [];
  callbacks = [];
  constructor(options = {}) {
    this.processor = new BraintrustSpanProcessor(options);
  }
  /**
   * Export spans to Braintrust by simulating span processor behavior.
   */
  export(spans, resultCallback) {
    try {
      spans.forEach((span) => {
        this.processor.onEnd(span);
      });
      this.processor.forceFlush().then(() => {
        resultCallback({ code: 0 });
      }).catch((error) => {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        resultCallback({ code: 1, error: errorObj });
      });
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      resultCallback({ code: 1, error: errorObj });
    }
  }
  /**
   * Shutdown the exporter.
   */
  shutdown() {
    return this.processor.shutdown();
  }
  /**
   * Force flush the exporter.
   */
  forceFlush() {
    return this.processor.forceFlush();
  }
};
function addParentToBaggage(parent, ctx) {
  try {
    if (!import_api.propagation) {
      console.error("OTEL propagation API not available");
      return ctx || import_api.context.active();
    }
    const currentCtx = ctx || import_api.context.active();
    const baggage = import_api.propagation.getBaggage(currentCtx) || import_api.propagation.createBaggage();
    return import_api.propagation.setBaggage(
      currentCtx,
      baggage.setEntry("braintrust.parent", { value: parent })
    );
  } catch (error) {
    console.error("Failed to add braintrust.parent to baggage:", error);
    return ctx || import_api.context.active();
  }
}
function addSpanParentToBaggage(span, ctx) {
  if (!span || !isReadableSpan(span)) {
    console.warn("addSpanParentToBaggage: span has no attributes");
    return void 0;
  }
  const parentValue = span.attributes["braintrust.parent"];
  if (!parentValue || typeof parentValue !== "string") {
    console.warn(
      "addSpanParentToBaggage: braintrust.parent attribute not found. Ensure BraintrustSpanProcessor is configured or span is created within Braintrust context."
    );
    return void 0;
  }
  return addParentToBaggage(parentValue, ctx);
}
function parentFromHeaders(headers) {
  try {
    if (!import_api.propagation) {
      console.error("OTEL propagation API not available");
      return void 0;
    }
    const ctx = import_api.propagation.extract(import_api.context.active(), headers);
    const spanContext = import_api.trace.getSpanContext(ctx);
    if (!spanContext) {
      console.error("parentFromHeaders: No valid span context in headers");
      return void 0;
    }
    const traceIdHex = spanContext.traceId;
    const spanIdHex = spanContext.spanId;
    if (!traceIdHex || typeof traceIdHex !== "string" || traceIdHex === "00000000000000000000000000000000") {
      console.error("parentFromHeaders: Invalid trace_id (all zeros)");
      return void 0;
    }
    if (!spanIdHex || typeof spanIdHex !== "string" || spanIdHex === "0000000000000000") {
      console.error("parentFromHeaders: Invalid span_id (all zeros)");
      return void 0;
    }
    const baggage = import_api.propagation.getBaggage(ctx);
    const braintrustParent = baggage?.getEntry("braintrust.parent")?.value;
    if (!braintrustParent) {
      console.warn(
        "parentFromHeaders: braintrust.parent not found in OTEL baggage. Cannot create Braintrust parent without project information. Ensure the OTEL span sets braintrust.parent in baggage before exporting headers."
      );
      return void 0;
    }
    let objectType;
    let objectId;
    let computeArgs;
    if (braintrustParent.startsWith("project_id:")) {
      objectType = import_util.SpanObjectTypeV3.PROJECT_LOGS;
      objectId = braintrustParent.substring("project_id:".length);
      if (!objectId) {
        console.error(
          `parentFromHeaders: Invalid braintrust.parent format (empty project_id): ${braintrustParent}`
        );
        return void 0;
      }
    } else if (braintrustParent.startsWith("project_name:")) {
      objectType = import_util.SpanObjectTypeV3.PROJECT_LOGS;
      const projectName = braintrustParent.substring("project_name:".length);
      if (!projectName) {
        console.error(
          `parentFromHeaders: Invalid braintrust.parent format (empty project_name): ${braintrustParent}`
        );
        return void 0;
      }
      computeArgs = { project_name: projectName };
    } else if (braintrustParent.startsWith("experiment_id:")) {
      objectType = import_util.SpanObjectTypeV3.EXPERIMENT;
      objectId = braintrustParent.substring("experiment_id:".length);
      if (!objectId) {
        console.error(
          `parentFromHeaders: Invalid braintrust.parent format (empty experiment_id): ${braintrustParent}`
        );
        return void 0;
      }
    } else {
      console.error(
        `parentFromHeaders: Invalid braintrust.parent format: ${braintrustParent}. Expected format: 'project_id:ID', 'project_name:NAME', or 'experiment_id:ID'`
      );
      return void 0;
    }
    const componentsData = {
      object_type: objectType,
      row_id: "otel",
      // Dummy row_id to enable span_id/root_span_id fields
      span_id: spanIdHex,
      root_span_id: traceIdHex
    };
    if (computeArgs) {
      componentsData.compute_object_metadata_args = computeArgs;
    } else {
      componentsData.object_id = objectId;
    }
    const components = new import_util.SpanComponentsV4(componentsData);
    return components.toStr();
  } catch (error) {
    console.error("parentFromHeaders: Error parsing headers:", error);
    return void 0;
  }
}
function generateHexId(bytes) {
  let result = "";
  for (let i = 0; i < bytes; i++) {
    result += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
  }
  return result;
}
var OTELIDGenerator = class extends import_braintrust.IDGenerator {
  getSpanId() {
    return generateHexId(8);
  }
  getTraceId() {
    return generateHexId(16);
  }
  shareRootSpanId() {
    return false;
  }
};

// src/context.ts
function isOtelSpan(span) {
  return typeof span === "object" && span !== null && "spanContext" in span && // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- Type guard ensures object has property
  typeof span.spanContext === "function";
}
function isBraintrustSpan(span) {
  return typeof span === "object" && span !== null && "spanId" in span && "rootSpanId" in span && typeof span.spanId === "string";
}
function isValidSpanContext(spanContext) {
  if (!spanContext || typeof spanContext !== "object" || !("spanId" in spanContext) || !("traceId" in spanContext)) {
    return false;
  }
  const ctx = spanContext;
  return ctx.spanId !== "0000000000000000" && ctx.traceId !== "00000000000000000000000000000000";
}
var OtelContextManager = class extends import_braintrust2.ContextManager {
  getParentSpanIds() {
    const currentSpan = import_api2.trace.getActiveSpan();
    if (!currentSpan || !isOtelSpan(currentSpan)) {
      return void 0;
    }
    const spanContext = currentSpan.spanContext();
    if (!isValidSpanContext(spanContext)) {
      return void 0;
    }
    const btSpan = import_api2.context?.active().getValue?.("braintrust_span");
    if (btSpan && currentSpan.constructor.name === "NonRecordingSpan" && typeof btSpan === "object" && btSpan !== null && "rootSpanId" in btSpan && "spanId" in btSpan) {
      const typedBtSpan = btSpan;
      return {
        rootSpanId: typedBtSpan.rootSpanId,
        spanParents: [typedBtSpan.spanId]
      };
    }
    const otelTraceId = spanContext.traceId.toString().padStart(32, "0");
    const otelSpanId = spanContext.spanId.toString().padStart(16, "0");
    return {
      rootSpanId: otelTraceId,
      spanParents: [otelSpanId]
    };
  }
  runInContext(span, callback) {
    try {
      if (typeof span === "object" && span !== null && "spanId" in span && "rootSpanId" in span) {
        const btSpan = span;
        const spanContext = {
          traceId: btSpan.rootSpanId,
          spanId: btSpan.spanId,
          traceFlags: 1
          // sampled
        };
        const wrappedContext = import_api2.trace.wrapSpanContext(spanContext);
        const currentContext = import_api2.context.active();
        let newContext = import_api2.trace.setSpan(currentContext, wrappedContext);
        newContext = newContext.setValue("braintrust_span", span);
        if (isBraintrustSpan(span)) {
          const parentValue = getOtelParentFromSpan(span);
          if (parentValue) {
            newContext = newContext.setValue(
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
              "braintrust.parent",
              parentValue
            );
          }
        }
        return import_api2.context.with(newContext, callback);
      }
    } catch (error) {
      console.warn("Failed to run in OTEL context:", error);
    }
    return callback();
  }
  getCurrentSpan() {
    const btSpan = import_api2.context.active().getValue?.("braintrust_span");
    if (btSpan && typeof btSpan === "object" && btSpan !== null && "spanId" in btSpan && "rootSpanId" in btSpan) {
      return btSpan;
    }
    return void 0;
  }
};

// src/index.ts
var import_util2 = require("braintrust/util");
var setupOtelCompat = () => {
  globalThis.BRAINTRUST_CONTEXT_MANAGER = OtelContextManager;
  globalThis.BRAINTRUST_ID_GENERATOR = OTELIDGenerator;
  globalThis.BRAINTRUST_SPAN_COMPONENT = import_util2.SpanComponentsV4;
};
var resetOtelCompat = () => {
  globalThis.BRAINTRUST_CONTEXT_MANAGER = void 0;
  globalThis.BRAINTRUST_ID_GENERATOR = void 0;
  globalThis.BRAINTRUST_SPAN_COMPONENT = void 0;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BraintrustExporter,
  BraintrustSpanProcessor,
  addParentToBaggage,
  addSpanParentToBaggage,
  contextFromSpanExport,
  isRootSpan,
  parentFromHeaders,
  resetOtelCompat,
  setupOtelCompat
});
