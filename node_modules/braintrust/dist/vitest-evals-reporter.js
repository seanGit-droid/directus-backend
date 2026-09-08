"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }





var _chunkQRHGVBKUjs = require('./chunk-QRHGVBKU.js');
require('./chunk-MF7NU6BT.js');

// src/wrappers/vitest-evals/reporter.ts
_chunkQRHGVBKUjs.configureNode.call(void 0, );
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
    await _chunkQRHGVBKUjs.summarizeAndFlush.call(void 0, experiment, {
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
    const experimentName = _nullishCoalesce(this.options.experimentName, () => ( `vitest-evals-${(/* @__PURE__ */ new Date()).toISOString()}`));
    this.experiment = _chunkQRHGVBKUjs.initExperiment.call(void 0, {
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
  const run = _optionalChain([meta, 'access', _ => _.harness, 'optionalAccess', _2 => _2.run]);
  const input = _nullishCoalesce(_optionalChain([meta, 'access', _3 => _3.eval, 'optionalAccess', _4 => _4.input]), () => ( firstUserMessageContent(run)));
  const output = _nullishCoalesce(_optionalChain([meta, 'access', _5 => _5.eval, 'optionalAccess', _6 => _6.output]), () => ( _optionalChain([run, 'optionalAccess', _7 => _7.output])));
  const scores = buildScores(result.state, meta.eval);
  const metrics = buildMetrics(_optionalChain([diagnostic, 'optionalAccess', _8 => _8.duration]), run);
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
    for (const error of _nullishCoalesce(result.errors, () => ( []))) {
      logReporterError(rootSpan, error);
    }
  }
  if (_optionalChain([run, 'optionalAccess', _9 => _9.traces, 'optionalAccess', _10 => _10.length])) {
    logNormalizedTraces(rootSpan, run.traces);
  } else {
    logToolCallSpans(rootSpan, toolCallsFromMeta(meta.eval, run));
  }
  rootSpan.end({
    endTime: startTimeSeconds(diagnostic) !== void 0 && _optionalChain([diagnostic, 'optionalAccess', _11 => _11.duration]) !== void 0 ? startTimeSeconds(diagnostic) + diagnostic.duration / 1e3 : void 0
  });
}
function buildScores(state, evalMeta) {
  const scores = {
    pass: state === "passed" ? 1 : 0
  };
  if (typeof _optionalChain([evalMeta, 'optionalAccess', _12 => _12.avgScore]) === "number" || _optionalChain([evalMeta, 'optionalAccess', _13 => _13.avgScore]) === null) {
    scores.avg_score = evalMeta.avgScore;
  }
  for (const score of _nullishCoalesce(_optionalChain([evalMeta, 'optionalAccess', _14 => _14.scores]), () => ( []))) {
    if (!score.name) continue;
    if (typeof score.score === "number" || score.score === null) {
      scores[score.name] = score.score;
    }
  }
  return scores;
}
function buildMetrics(durationMs, run) {
  const usage = _optionalChain([run, 'optionalAccess', _15 => _15.usage]);
  const metrics = {};
  if (durationMs !== void 0) {
    metrics.duration_ms = durationMs;
  }
  if (typeof _optionalChain([usage, 'optionalAccess', _16 => _16.inputTokens]) === "number") {
    metrics.input_tokens = usage.inputTokens;
  }
  if (typeof _optionalChain([usage, 'optionalAccess', _17 => _17.outputTokens]) === "number") {
    metrics.output_tokens = usage.outputTokens;
  }
  if (typeof _optionalChain([usage, 'optionalAccess', _18 => _18.reasoningTokens]) === "number") {
    metrics.reasoning_tokens = usage.reasoningTokens;
  }
  if (typeof _optionalChain([usage, 'optionalAccess', _19 => _19.totalTokens]) === "number") {
    metrics.total_tokens = usage.totalTokens;
  }
  if (typeof _optionalChain([usage, 'optionalAccess', _20 => _20.toolCalls]) === "number") {
    metrics.tool_calls = usage.toolCalls;
  }
  if (typeof _optionalChain([usage, 'optionalAccess', _21 => _21.retries]) === "number") {
    metrics.retries = usage.retries;
  }
  return metrics;
}
function buildMetadata(test, meta, run) {
  const result = test.result();
  const metadata = {
    file: _optionalChain([test, 'access', _22 => _22.module, 'optionalAccess', _23 => _23.moduleId]),
    relativeFile: _optionalChain([test, 'access', _24 => _24.module, 'optionalAccess', _25 => _25.relativeModuleId]),
    fullName: test.fullName,
    testId: test.id,
    location: test.location,
    status: result.state,
    failureMessages: (_nullishCoalesce(result.errors, () => ( []))).map(formatErrorMessage),
    harnessName: _optionalChain([meta, 'access', _26 => _26.harness, 'optionalAccess', _27 => _27.name]),
    thresholdFailed: _optionalChain([meta, 'access', _28 => _28.eval, 'optionalAccess', _29 => _29.thresholdFailed]),
    session: _optionalChain([run, 'optionalAccess', _30 => _30.session]),
    artifacts: _optionalChain([run, 'optionalAccess', _31 => _31.artifacts]),
    timings: _optionalChain([run, 'optionalAccess', _32 => _32.timings]),
    errors: _optionalChain([run, 'optionalAccess', _33 => _33.errors]),
    scoreMetadata: Object.fromEntries(
      (_nullishCoalesce(_optionalChain([meta, 'access', _34 => _34.eval, 'optionalAccess', _35 => _35.scores]), () => ( []))).filter((score) => score.name && score.metadata).map((score) => [score.name, score.metadata])
    )
  };
  return Object.fromEntries(
    Object.entries(metadata).filter(([, value]) => value !== void 0)
  );
}
function logNormalizedTraces(rootSpan, traces) {
  for (const trace of traces) {
    const spans = _nullishCoalesce(trace.spans, () => ( []));
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
  const endTime = _nullishCoalesce(epochSeconds(normalized.finishedAt), () => ( (startTime !== void 0 && durationMs !== void 0 ? startTime + durationMs / 1e3 : void 0)));
  const span = parent.startSpan({
    name: _nullishCoalesce(_nullishCoalesce(normalized.name, () => ( normalized.kind)), () => ( "harness span")),
    spanAttributes: {
      ...filteredNormalizedSpanAttributes(normalized.attributes),
      type: spanTypeForNormalizedKind(normalized.kind),
      vitest_evals_kind: normalized.kind,
      trace_id: _nullishCoalesce(normalized.traceId, () => ( trace.id)),
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
    const endTime = _nullishCoalesce(epochSeconds(call.finishedAt), () => ( (startTime !== void 0 && durationMs !== void 0 ? startTime + durationMs / 1e3 : void 0)));
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
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, input)) return void 0;
  const evalMeta = readEvalMeta(input.eval);
  const harnessMeta = readHarnessMeta(input.harness);
  if (!evalMeta && !harnessMeta) return void 0;
  return {
    ...evalMeta ? { eval: evalMeta } : {},
    ...harnessMeta ? { harness: harnessMeta } : {}
  };
}
function readEvalMeta(input) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, input)) return void 0;
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
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, input)) return void 0;
  const score = readFiniteOrNull(input.score);
  return {
    ...typeof input.name === "string" ? { name: input.name } : {},
    ...score !== void 0 ? { score } : {},
    ..._chunkQRHGVBKUjs.isObject.call(void 0, input.metadata) ? { metadata: input.metadata } : {}
  };
}
function readHarnessMeta(input) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, input)) return void 0;
  return {
    ...typeof input.name === "string" ? { name: input.name } : {},
    ..._chunkQRHGVBKUjs.isObject.call(void 0, input.run) ? { run: input.run } : {}
  };
}
function readToolCall(input) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, input)) return void 0;
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
  return _optionalChain([run, 'optionalAccess', _36 => _36.session, 'optionalAccess', _37 => _37.messages, 'optionalAccess', _38 => _38.find, 'call', _39 => _39((message) => message.role === "user"), 'optionalAccess', _40 => _40.content]);
}
function toolCallsFromRun(run) {
  const calls = [];
  for (const message of _nullishCoalesce(_optionalChain([run, 'optionalAccess', _41 => _41.session, 'optionalAccess', _42 => _42.messages]), () => ( []))) {
    if (Array.isArray(message.toolCalls)) {
      calls.push(...message.toolCalls);
    }
  }
  return calls;
}
function toolCallsFromMeta(evalMeta, run) {
  const runCalls = toolCallsFromRun(run);
  return runCalls.length > 0 ? runCalls : _nullishCoalesce(_optionalChain([evalMeta, 'optionalAccess', _43 => _43.toolCalls]), () => ( []));
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
  return _optionalChain([diagnostic, 'optionalAccess', _44 => _44.startTime]) === void 0 ? void 0 : diagnostic.startTime / 1e3;
}
function epochSeconds(value) {
  if (value === void 0) return void 0;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms / 1e3 : void 0;
}
function logReporterError(span, error) {
  if (error instanceof Error) {
    _chunkQRHGVBKUjs.logError.call(void 0, span, error);
    return;
  }
  if (_chunkQRHGVBKUjs.isObject.call(void 0, error)) {
    const message = typeof error.message === "string" ? error.message : void 0;
    const stack = typeof error.stack === "string" ? error.stack : void 0;
    if (message !== void 0 || stack !== void 0) {
      span.log({
        error: stack ? `${_nullishCoalesce(message, () => ( "<error>"))}

${stack}` : message
      });
      return;
    }
  }
  _chunkQRHGVBKUjs.logError.call(void 0, span, error);
}
function formatErrorMessage(error) {
  if (_chunkQRHGVBKUjs.isObject.call(void 0, error)) {
    if (typeof error.message === "string") return error.message;
    if (typeof error.stack === "string") return error.stack;
  }
  if (error instanceof Error) return error.message;
  return String(error);
}


exports.default = BraintrustVitestEvalsReporter;
