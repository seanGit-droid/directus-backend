import {
  configureNode,
  initExperiment,
  isObject,
  logError,
  summarizeAndFlush
} from "./chunk-YKD22IMR.mjs";
import "./chunk-CZM5JIQL.mjs";

// src/wrappers/vitest-evals/reporter.ts
configureNode();
var RESERVED_NORMALIZED_SPAN_ATTRIBUTE_KEYS = /* @__PURE__ */ new Set([
  "name",
  "type",
  "vitest_evals_kind",
  "trace_id",
  "external_span_id",
  "external_parent_id",
  "status"
]);
var BraintrustVitestEvalsReporter = class {
  constructor(options = {}) {
    this.options = options;
  }
  options;
  experiment;
  onInit(_vitest) {
  }
  async onTestRunEnd(testModules) {
    const evalTests = [];
    for (const testModule of testModules) {
      for (const test of testModule.children.allTests()) {
        const candidate = { test, meta: readEvalTaskMeta(test.meta()) };
        if (isRunnableEvalTest(candidate)) {
          evalTests.push(candidate);
        }
      }
    }
    if (evalTests.length === 0) {
      return;
    }
    const experiment = this.getOrCreateExperiment();
    for (const { test, meta } of evalTests) {
      logEvalTest(experiment, test, meta);
    }
    await summarizeAndFlush(experiment, {
      displaySummary: this.options.displaySummary
    });
    this.experiment = void 0;
  }
  getOrCreateExperiment() {
    if (this.experiment) {
      return this.experiment;
    }
    const { projectId, projectName } = this.options;
    if (!projectId && !projectName) {
      throw new Error(
        "Braintrust vitest-evals reporter requires projectName or projectId when eval cases are reported."
      );
    }
    const experimentName = this.options.experimentName ?? `vitest-evals-${(/* @__PURE__ */ new Date()).toISOString()}`;
    this.experiment = initExperiment({
      ...projectId ? { projectId } : { project: projectName },
      experiment: experimentName,
      metadata: this.options.metadata,
      tags: this.options.tags,
      baseExperiment: this.options.baseExperiment,
      baseExperimentId: this.options.baseExperimentId
    });
    return this.experiment;
  }
};
function isRunnableEvalTest(candidate) {
  if (!candidate.meta) return false;
  const state = candidate.test.result().state;
  return state !== "skipped" && state !== "pending";
}
function logEvalTest(experiment, test, meta) {
  const result = test.result();
  const diagnostic = test.diagnostic();
  const run = meta.harness?.run;
  const input = meta.eval?.input ?? firstUserMessageContent(run);
  const output = meta.eval?.output ?? run?.output;
  const scores = buildScores(result.state, meta.eval);
  const metrics = buildMetrics(diagnostic?.duration, run);
  const metadata = buildMetadata(test, meta, run);
  const rootSpan = experiment.startSpan({
    name: test.fullName || test.name,
    spanAttributes: {
      type: "eval" /* EVAL */,
      framework: "vitest",
      reporter: "vitest-evals"
    },
    startTime: startTimeSeconds(diagnostic),
    event: {
      input: {
        test: test.fullName || test.name,
        input
      },
      ...output !== void 0 ? { output } : {},
      scores,
      metrics,
      metadata,
      ...test.tags.length > 0 ? { tags: test.tags } : {}
    }
  });
  if (result.state === "failed") {
    for (const error of result.errors ?? []) {
      logReporterError(rootSpan, error);
    }
  }
  if (run?.traces?.length) {
    logNormalizedTraces(rootSpan, run.traces);
  } else {
    logToolCallSpans(rootSpan, toolCallsFromMeta(meta.eval, run));
  }
  rootSpan.end({
    endTime: startTimeSeconds(diagnostic) !== void 0 && diagnostic?.duration !== void 0 ? startTimeSeconds(diagnostic) + diagnostic.duration / 1e3 : void 0
  });
}
function buildScores(state, evalMeta) {
  const scores = {
    pass: state === "passed" ? 1 : 0
  };
  if (typeof evalMeta?.avgScore === "number" || evalMeta?.avgScore === null) {
    scores.avg_score = evalMeta.avgScore;
  }
  for (const score of evalMeta?.scores ?? []) {
    if (!score.name) continue;
    if (typeof score.score === "number" || score.score === null) {
      scores[score.name] = score.score;
    }
  }
  return scores;
}
function buildMetrics(durationMs, run) {
  const usage = run?.usage;
  const metrics = {};
  if (durationMs !== void 0) {
    metrics.duration_ms = durationMs;
  }
  if (typeof usage?.inputTokens === "number") {
    metrics.input_tokens = usage.inputTokens;
  }
  if (typeof usage?.outputTokens === "number") {
    metrics.output_tokens = usage.outputTokens;
  }
  if (typeof usage?.reasoningTokens === "number") {
    metrics.reasoning_tokens = usage.reasoningTokens;
  }
  if (typeof usage?.totalTokens === "number") {
    metrics.total_tokens = usage.totalTokens;
  }
  if (typeof usage?.toolCalls === "number") {
    metrics.tool_calls = usage.toolCalls;
  }
  if (typeof usage?.retries === "number") {
    metrics.retries = usage.retries;
  }
  return metrics;
}
function buildMetadata(test, meta, run) {
  const result = test.result();
  const metadata = {
    file: test.module?.moduleId,
    relativeFile: test.module?.relativeModuleId,
    fullName: test.fullName,
    testId: test.id,
    location: test.location,
    status: result.state,
    failureMessages: (result.errors ?? []).map(formatErrorMessage),
    harnessName: meta.harness?.name,
    thresholdFailed: meta.eval?.thresholdFailed,
    session: run?.session,
    artifacts: run?.artifacts,
    timings: run?.timings,
    errors: run?.errors,
    scoreMetadata: Object.fromEntries(
      (meta.eval?.scores ?? []).filter((score) => score.name && score.metadata).map((score) => [score.name, score.metadata])
    )
  };
  return Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== void 0)
  );
}
function logNormalizedTraces(rootSpan, traces) {
  for (const trace of traces) {
    const spans = trace.spans ?? [];
    const spanMap = /* @__PURE__ */ new Map();
    const pending = [...spans];
    while (pending.length > 0) {
      const before = pending.length;
      for (let index = pending.length - 1; index >= 0; index--) {
        const normalized = pending[index];
        const parent = normalized.parentId === void 0 ? rootSpan : spanMap.get(normalized.parentId);
        if (!parent) continue;
        const span = logNormalizedSpan(parent, normalized, trace);
        if (normalized.id) {
          spanMap.set(normalized.id, span);
        }
        pending.splice(index, 1);
      }
      if (pending.length === before) {
        for (const normalized of pending.splice(0)) {
          const span = logNormalizedSpan(rootSpan, normalized, trace);
          if (normalized.id) {
            spanMap.set(normalized.id, span);
          }
        }
      }
    }
  }
}
function logNormalizedSpan(parent, normalized, trace) {
  const durationMs = typeof normalized.durationMs === "number" && Number.isFinite(normalized.durationMs) ? normalized.durationMs : void 0;
  const startTime = epochSeconds(normalized.startedAt);
  const endTime = epochSeconds(normalized.finishedAt) ?? (startTime !== void 0 && durationMs !== void 0 ? startTime + durationMs / 1e3 : void 0);
  const span = parent.startSpan({
    name: normalized.name ?? normalized.kind ?? "harness span",
    spanAttributes: {
      ...filteredNormalizedSpanAttributes(normalized.attributes),
      type: spanTypeForNormalizedKind(normalized.kind),
      vitest_evals_kind: normalized.kind,
      trace_id: normalized.traceId ?? trace.id,
      external_span_id: normalized.id,
      external_parent_id: normalized.parentId,
      status: normalized.status
    },
    startTime,
    ...durationMs !== void 0 ? { event: { metrics: { duration_ms: durationMs } } } : {}
  });
  const metadata = {
    traceName: trace.name,
    traceMetadata: trace.metadata,
    events: normalized.events
  };
  if (Object.values(metadata).some((value) => value !== void 0)) {
    span.log({
      metadata: Object.fromEntries(
        Object.entries(metadata).filter(([, value]) => value !== void 0)
      )
    });
  }
  if (normalized.error !== void 0) {
    logReporterError(span, normalized.error);
  }
  span.end({ endTime });
  return span;
}
function logToolCallSpans(rootSpan, calls) {
  for (const call of calls) {
    if (!call.name) continue;
    const durationMs = typeof call.durationMs === "number" && Number.isFinite(call.durationMs) ? call.durationMs : void 0;
    const startTime = epochSeconds(call.startedAt);
    const endTime = epochSeconds(call.finishedAt) ?? (startTime !== void 0 && durationMs !== void 0 ? startTime + durationMs / 1e3 : void 0);
    const span = rootSpan.startSpan({
      name: call.name,
      spanAttributes: {
        type: "tool" /* TOOL */,
        tool_call_id: call.id
      },
      startTime,
      event: {
        input: call.arguments,
        ...call.result !== void 0 ? { output: call.result } : {},
        metadata: call.metadata,
        metrics: durationMs !== void 0 ? { duration_ms: durationMs } : void 0
      }
    });
    if (call.error !== void 0) {
      logReporterError(span, call.error);
    }
    span.end({ endTime });
  }
}
function readEvalTaskMeta(input) {
  if (!isObject(input)) return void 0;
  const evalMeta = readEvalMeta(input.eval);
  const harnessMeta = readHarnessMeta(input.harness);
  if (!evalMeta && !harnessMeta) return void 0;
  return {
    ...evalMeta ? { eval: evalMeta } : {},
    ...harnessMeta ? { harness: harnessMeta } : {}
  };
}
function readEvalMeta(input) {
  if (!isObject(input)) return void 0;
  const avgScore = readFiniteOrNull(input.avgScore);
  const scores = Array.isArray(input.scores) ? input.scores.map(readEvalScore).filter(isDefined) : void 0;
  const toolCalls = Array.isArray(input.toolCalls) ? input.toolCalls.map(readToolCall).filter(isDefined) : void 0;
  return {
    ...scores ? { scores } : {},
    ...avgScore !== void 0 ? { avgScore } : {},
    ...input.input !== void 0 ? { input: input.input } : {},
    ...input.output !== void 0 ? { output: input.output } : {},
    ...typeof input.thresholdFailed === "boolean" ? { thresholdFailed: input.thresholdFailed } : {},
    ...toolCalls ? { toolCalls } : {}
  };
}
function readEvalScore(input) {
  if (!isObject(input)) return void 0;
  const score = readFiniteOrNull(input.score);
  return {
    ...typeof input.name === "string" ? { name: input.name } : {},
    ...score !== void 0 ? { score } : {},
    ...isObject(input.metadata) ? { metadata: input.metadata } : {}
  };
}
function readHarnessMeta(input) {
  if (!isObject(input)) return void 0;
  return {
    ...typeof input.name === "string" ? { name: input.name } : {},
    ...isObject(input.run) ? { run: input.run } : {}
  };
}
function readToolCall(input) {
  if (!isObject(input)) return void 0;
  return input;
}
function filteredNormalizedSpanAttributes(attributes) {
  if (!attributes) return {};
  return Object.fromEntries(
    Object.entries(attributes).filter(
      ([key]) => !RESERVED_NORMALIZED_SPAN_ATTRIBUTE_KEYS.has(key)
    )
  );
}
function readFiniteOrNull(value) {
  if (value === null) return null;
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  return void 0;
}
function isDefined(value) {
  return value !== void 0;
}
function firstUserMessageContent(run) {
  return run?.session?.messages?.find((message) => message.role === "user")?.content;
}
function toolCallsFromRun(run) {
  const calls = [];
  for (const message of run?.session?.messages ?? []) {
    if (Array.isArray(message.toolCalls)) {
      calls.push(...message.toolCalls);
    }
  }
  return calls;
}
function toolCallsFromMeta(evalMeta, run) {
  const runCalls = toolCallsFromRun(run);
  return runCalls.length > 0 ? runCalls : evalMeta?.toolCalls ?? [];
}
function spanTypeForNormalizedKind(kind) {
  switch (kind) {
    case "model":
      return "llm" /* LLM */;
    case "tool":
      return "tool" /* TOOL */;
    case "agent":
    case "run":
      return "task" /* TASK */;
    default:
      return "function" /* FUNCTION */;
  }
}
function startTimeSeconds(diagnostic) {
  return diagnostic?.startTime === void 0 ? void 0 : diagnostic.startTime / 1e3;
}
function epochSeconds(value) {
  if (value === void 0) return void 0;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms / 1e3 : void 0;
}
function logReporterError(span, error) {
  if (error instanceof Error) {
    logError(span, error);
    return;
  }
  if (isObject(error)) {
    const message = typeof error.message === "string" ? error.message : void 0;
    const stack = typeof error.stack === "string" ? error.stack : void 0;
    if (message !== void 0 || stack !== void 0) {
      span.log({
        error: stack ? `${message ?? "<error>"}

${stack}` : message
      });
      return;
    }
  }
  logError(span, error);
}
function formatErrorMessage(error) {
  if (isObject(error)) {
    if (typeof error.message === "string") return error.message;
    if (typeof error.stack === "string") return error.stack;
  }
  if (error instanceof Error) return error.message;
  return String(error);
}
export {
  BraintrustVitestEvalsReporter as default
};
