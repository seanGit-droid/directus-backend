"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } async function _asyncNullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return await rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } async function _asyncOptionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = await fn(value); } else if (op === 'call' || op === 'optionalCall') { value = await fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2; var _class3; var _class4; var _class5; var _class6; var _class7; var _class8; var _class9; var _class10; var _class11;














































































































































var _chunkQRHGVBKUjs = require('./chunk-QRHGVBKU.js');































var _chunkMF7NU6BTjs = require('./chunk-MF7NU6BT.js');

// src/exports.ts
var exports_exports = {};
_chunkMF7NU6BTjs.__export.call(void 0, exports_exports, {
  Attachment: () => _chunkQRHGVBKUjs.Attachment,
  AttachmentReference: () => _chunkQRHGVBKUjs.AttachmentReference,
  BAGGAGE_HEADER: () => _chunkQRHGVBKUjs.BAGGAGE_HEADER,
  BRAINTRUST_CURRENT_SPAN_STORE: () => _chunkQRHGVBKUjs.BRAINTRUST_CURRENT_SPAN_STORE,
  BRAINTRUST_LANGCHAIN_CALLBACK_HANDLER_NAME: () => _chunkQRHGVBKUjs.BRAINTRUST_LANGCHAIN_CALLBACK_HANDLER_NAME,
  BRAINTRUST_PARENT_KEY: () => _chunkQRHGVBKUjs.BRAINTRUST_PARENT_KEY,
  BaseAttachment: () => _chunkQRHGVBKUjs.BaseAttachment,
  BaseExperiment: () => BaseExperiment,
  BraintrustLangChainCallbackHandler: () => _chunkQRHGVBKUjs.BraintrustLangChainCallbackHandler,
  BraintrustMiddleware: () => BraintrustMiddleware,
  BraintrustObservabilityExporter: () => _chunkQRHGVBKUjs.BraintrustObservabilityExporter,
  BraintrustState: () => _chunkQRHGVBKUjs.BraintrustState,
  BraintrustStream: () => _chunkQRHGVBKUjs.BraintrustStream,
  CachedSpanFetcher: () => CachedSpanFetcher,
  CodeFunction: () => CodeFunction,
  CodePrompt: () => CodePrompt,
  ContextManager: () => _chunkQRHGVBKUjs.ContextManager,
  DEFAULT_FETCH_BATCH_SIZE: () => _chunkQRHGVBKUjs.DEFAULT_FETCH_BATCH_SIZE,
  DEFAULT_MAX_REQUEST_SIZE: () => _chunkQRHGVBKUjs.DEFAULT_MAX_REQUEST_SIZE,
  Dataset: () => _chunkQRHGVBKUjs.Dataset,
  DatasetPipeline: () => DatasetPipeline,
  ERR_PERMALINK: () => _chunkQRHGVBKUjs.ERR_PERMALINK,
  Eval: () => Eval,
  EvalResultWithSummary: () => EvalResultWithSummary,
  Experiment: () => _chunkQRHGVBKUjs.Experiment,
  ExternalAttachment: () => _chunkQRHGVBKUjs.ExternalAttachment,
  FailedHTTPResponse: () => _chunkQRHGVBKUjs.FailedHTTPResponse,
  IDGenerator: () => _chunkQRHGVBKUjs.IDGenerator,
  JSONAttachment: () => _chunkQRHGVBKUjs.JSONAttachment,
  LEGACY_CACHED_HEADER: () => _chunkQRHGVBKUjs.LEGACY_CACHED_HEADER,
  LOGS3_OVERFLOW_REFERENCE_TYPE: () => _chunkQRHGVBKUjs.LOGS3_OVERFLOW_REFERENCE_TYPE,
  LazyValue: () => _chunkQRHGVBKUjs.LazyValue,
  LocalTrace: () => LocalTrace,
  Logger: () => _chunkQRHGVBKUjs.Logger,
  LoginInvalidOrgError: () => _chunkQRHGVBKUjs.LoginInvalidOrgError,
  NOOP_SPAN: () => _chunkQRHGVBKUjs.NOOP_SPAN,
  NOOP_SPAN_PERMALINK: () => _chunkQRHGVBKUjs.NOOP_SPAN_PERMALINK,
  NoopSpan: () => _chunkQRHGVBKUjs.NoopSpan,
  OTELIDGenerator: () => _chunkQRHGVBKUjs.OTELIDGenerator,
  ObjectFetcher: () => _chunkQRHGVBKUjs.ObjectFetcher,
  Project: () => Project2,
  ProjectNameIdMap: () => ProjectNameIdMap,
  Prompt: () => _chunkQRHGVBKUjs.Prompt,
  PromptBuilder: () => PromptBuilder,
  ReadonlyAttachment: () => _chunkQRHGVBKUjs.ReadonlyAttachment,
  ReadonlyExperiment: () => _chunkQRHGVBKUjs.ReadonlyExperiment,
  Reporter: () => Reporter,
  ScorerBuilder: () => ScorerBuilder,
  SpanFetcher: () => SpanFetcher,
  SpanImpl: () => _chunkQRHGVBKUjs.SpanImpl,
  TRACEPARENT_HEADER: () => _chunkQRHGVBKUjs.TRACEPARENT_HEADER,
  TRACESTATE_HEADER: () => _chunkQRHGVBKUjs.TRACESTATE_HEADER,
  TestBackgroundLogger: () => _chunkQRHGVBKUjs.TestBackgroundLogger,
  ToolBuilder: () => ToolBuilder,
  UUIDGenerator: () => _chunkQRHGVBKUjs.UUIDGenerator,
  X_CACHED_HEADER: () => _chunkQRHGVBKUjs.X_CACHED_HEADER,
  _exportsForTestingOnly: () => _chunkQRHGVBKUjs._exportsForTestingOnly,
  _internalGetGlobalState: () => _chunkQRHGVBKUjs._internalGetGlobalState,
  _internalIso: () => _chunkMF7NU6BTjs.isomorph_default,
  _internalSetInitialState: () => _chunkQRHGVBKUjs._internalSetInitialState,
  addAzureBlobHeaders: () => _chunkQRHGVBKUjs.addAzureBlobHeaders,
  agentAssertionScorer: () => agentAssertionScorer,
  braintrustAISDKTelemetry: () => _chunkQRHGVBKUjs.braintrustAISDKTelemetry,
  braintrustEveHook: () => braintrustEveHook,
  braintrustEveInstrumentation: () => braintrustEveInstrumentation,
  braintrustFlueInstrumentation: () => _chunkQRHGVBKUjs.braintrustFlueInstrumentation,
  braintrustFlueObserver: () => _chunkQRHGVBKUjs.braintrustFlueObserver,
  braintrustStreamChunkSchema: () => _chunkQRHGVBKUjs.braintrustStreamChunkSchema,
  buildLocalSummary: () => buildLocalSummary,
  collectAnthropicSession: () => _chunkQRHGVBKUjs.collectAnthropicSession,
  configureInstrumentation: () => _chunkQRHGVBKUjs.configureInstrumentation,
  constructLogs3OverflowRequest: () => _chunkQRHGVBKUjs.constructLogs3OverflowRequest,
  createFinalValuePassThroughStream: () => _chunkQRHGVBKUjs.createFinalValuePassThroughStream,
  currentExperiment: () => _chunkQRHGVBKUjs.currentExperiment,
  currentLogger: () => _chunkQRHGVBKUjs.currentLogger,
  currentSpan: () => _chunkQRHGVBKUjs.currentSpan,
  deepCopyEvent: () => _chunkQRHGVBKUjs.deepCopyEvent,
  defaultErrorScoreHandler: () => defaultErrorScoreHandler,
  deserializePlainStringAsJSON: () => _chunkQRHGVBKUjs.deserializePlainStringAsJSON,
  devNullWritableStream: () => _chunkQRHGVBKUjs.devNullWritableStream,
  evaluatorDefinitionSchema: () => evaluatorDefinitionSchema,
  evaluatorDefinitionsSchema: () => evaluatorDefinitionsSchema,
  extractTraceContextFromHeaders: () => _chunkQRHGVBKUjs.extractTraceContextFromHeaders,
  flush: () => _chunkQRHGVBKUjs.flush,
  getContextManager: () => _chunkQRHGVBKUjs.getContextManager,
  getIdGenerator: () => _chunkQRHGVBKUjs.getIdGenerator,
  getPromptVersions: () => _chunkQRHGVBKUjs.getPromptVersions,
  getSpanParentObject: () => _chunkQRHGVBKUjs.getSpanParentObject,
  getTemplateRenderer: () => _chunkQRHGVBKUjs.getTemplateRenderer,
  graph: () => graph_framework_exports,
  init: () => _chunkQRHGVBKUjs.init,
  initDataset: () => _chunkQRHGVBKUjs.initDataset,
  initExperiment: () => _chunkQRHGVBKUjs.initExperiment,
  initFunction: () => initFunction,
  initLogger: () => _chunkQRHGVBKUjs.initLogger,
  initNodeTestSuite: () => initNodeTestSuite,
  injectTraceContext: () => _chunkQRHGVBKUjs.injectTraceContext,
  invoke: () => invoke,
  isTemplateFormat: () => _chunkQRHGVBKUjs.isTemplateFormat,
  loadParameters: () => _chunkQRHGVBKUjs.loadParameters,
  loadPrompt: () => _chunkQRHGVBKUjs.loadPrompt,
  log: () => _chunkQRHGVBKUjs.log,
  logError: () => _chunkQRHGVBKUjs.logError,
  login: () => _chunkQRHGVBKUjs.login,
  loginToState: () => _chunkQRHGVBKUjs.loginToState,
  logs3OverflowUploadSchema: () => _chunkQRHGVBKUjs.logs3OverflowUploadSchema,
  newId: () => _chunkQRHGVBKUjs.newId,
  parseCachedHeader: () => _chunkQRHGVBKUjs.parseCachedHeader,
  parseTemplateFormat: () => _chunkQRHGVBKUjs.parseTemplateFormat,
  permalink: () => _chunkQRHGVBKUjs.permalink,
  pickLogs3OverflowObjectIds: () => _chunkQRHGVBKUjs.pickLogs3OverflowObjectIds,
  projects: () => projects,
  promptContentsSchema: () => promptContentsSchema,
  promptDefinitionSchema: () => promptDefinitionSchema,
  promptDefinitionToPromptData: () => promptDefinitionToPromptData,
  promptDefinitionWithToolsSchema: () => promptDefinitionWithToolsSchema,
  registerOtelFlush: () => _chunkQRHGVBKUjs.registerOtelFlush,
  registerSandbox: () => registerSandbox,
  registerTemplatePlugin: () => _chunkQRHGVBKUjs.registerTemplatePlugin,
  renderMessage: () => _chunkQRHGVBKUjs.renderMessage,
  renderPromptParams: () => _chunkQRHGVBKUjs.renderPromptParams,
  renderTemplateContent: () => _chunkQRHGVBKUjs.renderTemplateContent,
  reportFailures: () => reportFailures,
  runEvaluator: () => runEvaluator,
  setFetch: () => _chunkQRHGVBKUjs.setFetch,
  setMaskingFunction: () => _chunkQRHGVBKUjs.setMaskingFunction,
  spanComponentsToObjectId: () => _chunkQRHGVBKUjs.spanComponentsToObjectId,
  startSpan: () => _chunkQRHGVBKUjs.startSpan,
  summarize: () => _chunkQRHGVBKUjs.summarize,
  templateRegistry: () => _chunkQRHGVBKUjs.templateRegistry,
  toolFunctionDefinitionSchema: () => _chunkQRHGVBKUjs.ToolFunctionDefinition,
  traceable: () => _chunkQRHGVBKUjs.traceable,
  traced: () => _chunkQRHGVBKUjs.traced,
  updateSpan: () => _chunkQRHGVBKUjs.updateSpan,
  uploadLogs3OverflowPayload: () => _chunkQRHGVBKUjs.uploadLogs3OverflowPayload,
  utf8ByteLength: () => _chunkQRHGVBKUjs.utf8ByteLength,
  withCurrent: () => _chunkQRHGVBKUjs.withCurrent,
  withDataset: () => _chunkQRHGVBKUjs.withDataset,
  withExperiment: () => _chunkQRHGVBKUjs.withExperiment,
  withLogger: () => _chunkQRHGVBKUjs.withLogger,
  withParent: () => _chunkQRHGVBKUjs.withParent,
  wrapAISDK: () => wrapAISDK,
  wrapAISDKModel: () => wrapAISDKModel,
  wrapAgentClass: () => wrapAgentClass,
  wrapAnthropic: () => wrapAnthropic,
  wrapBedrockRuntime: () => wrapBedrockRuntime,
  wrapClaudeAgentSDK: () => wrapClaudeAgentSDK,
  wrapCloudflareAIChat: () => wrapCloudflareAIChat,
  wrapCloudflareAgent: () => wrapCloudflareAgent,
  wrapCloudflareThink: () => wrapCloudflareThink,
  wrapCohere: () => wrapCohere,
  wrapCopilotClient: () => wrapCopilotClient,
  wrapCursorSDK: () => wrapCursorSDK,
  wrapGenkit: () => wrapGenkit,
  wrapGoogleADK: () => wrapGoogleADK,
  wrapGoogleGenAI: () => wrapGoogleGenAI,
  wrapGroq: () => wrapGroq,
  wrapHuggingFace: () => wrapHuggingFace,
  wrapHuggingFaceTransformers: () => wrapHuggingFaceTransformers,
  wrapLangSmithClient: () => wrapLangSmithClient,
  wrapLangSmithRunTrees: () => wrapLangSmithRunTrees,
  wrapLangSmithTraceable: () => wrapLangSmithTraceable,
  wrapMastraAgent: () => _chunkQRHGVBKUjs.wrapMastraAgent,
  wrapMistral: () => wrapMistral,
  wrapOllama: () => wrapOllama,
  wrapOpenAI: () => wrapOpenAI,
  wrapOpenAICodexSDK: () => wrapOpenAICodexSDK,
  wrapOpenAIv4: () => wrapOpenAIv4,
  wrapOpenRouter: () => wrapOpenRouter,
  wrapOpenRouterAgent: () => wrapOpenRouterAgent,
  wrapPiCodingAgentSDK: () => wrapPiCodingAgentSDK,
  wrapStrandsAgentSDK: () => wrapStrandsAgentSDK,
  wrapTraced: () => _chunkQRHGVBKUjs.wrapTraced,
  wrapVitest: () => wrapVitest
});

// src/sandbox.ts
var _v3 = require('zod/v3');
var SANDBOX_GROUP_NAME_METADATA_KEY = "_bt_sandbox_group_name";
async function registerSandbox(options) {
  const state = _nullishCoalesce(options.state, () => ( _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, )));
  await state.login({
    apiKey: options.apiKey,
    appUrl: options.appUrl,
    orgName: options.orgName
  });
  const projectResponse = await state.appConn().post_json("api/project/register", {
    project_name: options.project,
    org_id: state.orgId
  });
  const projectId = projectResponse.project.id;
  if (!state.orgName) {
    throw new Error("Organization name is required to register sandbox evals");
  }
  const runtimeContext = {
    runtime: "node",
    version: process.version.slice(1)
  };
  const listResponse = await state.proxyConn().post(
    "function/sandbox-list",
    {
      sandbox_spec: {
        provider: options.sandbox.provider,
        snapshot_ref: options.sandbox.snapshotRef
      },
      runtime_context: runtimeContext,
      entrypoints: options.entrypoints,
      project_id: projectId
    },
    {
      headers: {
        "x-bt-org-name": state.orgName
      }
    }
  );
  const evaluatorDefinitions = _v3.z.record(_v3.z.unknown()).parse(await listResponse.json());
  const functions = [];
  for (const [evalName, evaluatorDefinition] of Object.entries(
    evaluatorDefinitions
  )) {
    const functionName = evalName;
    const functionSlug = _chunkQRHGVBKUjs.slugify.call(void 0, evalName, { lower: true, strict: true });
    const functionDef = {
      project_id: projectId,
      org_name: state.orgName,
      name: functionName,
      slug: functionSlug,
      function_type: "sandbox",
      function_data: {
        type: "code",
        data: {
          type: "bundle",
          runtime_context: runtimeContext,
          location: {
            type: "sandbox",
            sandbox_spec: {
              provider: options.sandbox.provider,
              snapshot_ref: options.sandbox.snapshotRef
            },
            entrypoints: options.entrypoints,
            eval_name: evalName,
            evaluator_definition: evaluatorDefinition
          },
          bundle_id: null,
          preview: null
        }
      },
      metadata: {
        ..._nullishCoalesce(options.metadata, () => ( {})),
        [SANDBOX_GROUP_NAME_METADATA_KEY]: options.name
      },
      if_exists: _nullishCoalesce(options.ifExists, () => ( "replace"))
    };
    if (options.description !== void 0) {
      functionDef.description = options.description;
    }
    const response = await state.apiConn().post_json("v1/function", functionDef);
    functions.push({
      evalName,
      id: response.id,
      name: response.name,
      slug: response.slug
    });
  }
  return {
    projectId,
    functions
  };
}

// src/functions/invoke.ts
async function invoke(args) {
  const {
    orgName,
    apiKey,
    appUrl,
    forceLogin,
    fetch,
    input,
    messages,
    parent: parentArg,
    metadata,
    tags,
    state: stateArg,
    stream,
    mode,
    schema,
    strict,
    overrides,
    projectId,
    ...functionIdArgs
  } = args;
  const state = _nullishCoalesce(stateArg, () => ( _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, )));
  await state.login({
    orgName,
    apiKey,
    appUrl,
    forceLogin,
    fetch
  });
  const parent = parentArg ? typeof parentArg === "string" ? parentArg : await parentArg.export() : await _chunkQRHGVBKUjs.getSpanParentObject.call(void 0, ).export();
  const functionId = _chunkQRHGVBKUjs.FunctionId.safeParse({
    function_id: functionIdArgs.function_id,
    project_name: functionIdArgs.projectName,
    slug: functionIdArgs.slug,
    global_function: functionIdArgs.globalFunction,
    function_type: functionIdArgs.functionType,
    prompt_session_id: functionIdArgs.promptSessionId,
    prompt_session_function_id: functionIdArgs.promptSessionFunctionId,
    version: functionIdArgs.version
  });
  if (!functionId.success) {
    throw new Error(
      `Invalid function ID arguments: ${functionId.error.message}`
    );
  }
  const request = {
    ...functionId.data,
    input,
    messages,
    parent,
    metadata,
    tags,
    stream,
    mode,
    strict,
    overrides
  };
  const headers = {
    Accept: stream ? "text/event-stream" : "application/json"
  };
  if (projectId) {
    headers["x-bt-project-id"] = projectId;
  }
  if (orgName) {
    headers["x-bt-org-name"] = orgName;
  }
  const resp = await state.proxyConn().post(`function/invoke`, request, {
    headers
  });
  if (stream) {
    if (!resp.body) {
      throw new Error("Received empty stream body");
    }
    return new (0, _chunkQRHGVBKUjs.BraintrustStream)(resp.body);
  } else {
    const data = await resp.json();
    return schema ? schema.parse(data) : data;
  }
}
function initFunction({
  projectName,
  slug,
  version,
  state
}) {
  const s = _nullishCoalesce(state, () => ( _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, )));
  _optionalChain([s, 'optionalAccess', _2 => _2.spanCache, 'optionalAccess', _3 => _3.disable, 'call', _4 => _4()]);
  const f = async (input) => {
    return await invoke({
      projectName,
      slug,
      version,
      input
    });
  };
  Object.defineProperty(f, "name", {
    value: `initFunction-${projectName}-${slug}-${_nullishCoalesce(version, () => ( "latest"))}`
  });
  return f;
}

// src/wrappers/openai-promise-utils.ts
function splitSpanInfo(allParams) {
  const { span_info, ...params } = allParams;
  return {
    params,
    span_info
  };
}
function createChannelContext(_channel, params, span_info) {
  return {
    arguments: (
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      [params]
    ),
    span_info
  };
}
async function tracePromiseWithResponse(channel, traceContext, apiPromise) {
  let enhancedResponse;
  const tracePromise = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    channel.tracePromise
  );
  const data = await tracePromise(async () => {
    enhancedResponse = await apiPromise.withResponse();
    traceContext.response = enhancedResponse.response;
    return enhancedResponse.data;
  }, traceContext);
  if (!enhancedResponse) {
    throw new Error("Expected withResponse() to provide response");
  }
  return { data, response: enhancedResponse.response };
}
function createLazyAPIPromise(ensureExecuted) {
  let dataPromise = null;
  return new Proxy({}, {
    get(target, prop, receiver) {
      if (prop === "withResponse") {
        return () => ensureExecuted();
      }
      if (prop === "then" || prop === "catch" || prop === "finally" || prop in Promise.prototype) {
        if (!dataPromise) {
          dataPromise = ensureExecuted().then((result) => result.data);
        }
        const value = Reflect.get(dataPromise, prop, receiver);
        return typeof value === "function" ? value.bind(dataPromise) : value;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}

// src/wrappers/oai_responses.ts
function responsesProxy(openai) {
  if (!openai.responses) {
    return openai;
  }
  return new Proxy(openai.responses, {
    get(target, name, receiver) {
      if (name === "create" && typeof target.create === "function") {
        return wrapResponsesAsync(
          target.create.bind(target),
          _chunkMF7NU6BTjs.openAIChannels.responsesCreate
        );
      } else if (name === "stream" && typeof target.stream === "function") {
        return wrapResponsesSyncStream(
          target.stream.bind(target),
          _chunkMF7NU6BTjs.openAIChannels.responsesStream
        );
      } else if (name === "parse" && typeof target.parse === "function") {
        return wrapResponsesAsync(
          target.parse.bind(target),
          _chunkMF7NU6BTjs.openAIChannels.responsesParse
        );
      } else if (name === "compact" && typeof target.compact === "function") {
        return wrapResponsesAsync(
          target.compact.bind(target),
          _chunkMF7NU6BTjs.openAIChannels.responsesCompact
        );
      }
      return Reflect.get(target, name, receiver);
    }
  });
}
function wrapResponsesAsync(target, channel) {
  return (allParams, options) => {
    const { span_info, params } = splitSpanInfo(allParams);
    let executionPromise = null;
    const ensureExecuted = () => {
      if (!executionPromise) {
        executionPromise = (async () => {
          const traceContext = createChannelContext(channel, params, span_info);
          const apiPromise = target(params, options);
          return tracePromiseWithResponse(channel, traceContext, apiPromise);
        })();
      }
      return executionPromise;
    };
    return createLazyAPIPromise(ensureExecuted);
  };
}
function wrapResponsesSyncStream(target, channel) {
  return (allParams, options) => {
    const { span_info, params } = splitSpanInfo(allParams);
    return channel.traceSync(() => target(params, options), {
      arguments: [params],
      span_info
    });
  };
}

// src/wrappers/oai.ts
function wrapOpenAI(openai) {
  const oai = openai;
  if (oai && typeof oai === "object" && "chat" in oai && typeof oai.chat === "object" && oai.chat && "completions" in oai.chat && typeof oai.chat.completions === "object" && oai.chat.completions && "create" in oai.chat.completions) {
    const typedOpenAI = oai;
    return wrapOpenAIv4(typedOpenAI);
  } else {
    console.warn("Unsupported OpenAI library (potentially v3). Not wrapping.");
    return openai;
  }
}
globalThis.__inherited_braintrust_wrap_openai = wrapOpenAI;
function wrapOpenAIv4(openai) {
  const typedOpenai = openai;
  const privateMethodWorkaroundCache = /* @__PURE__ */ new WeakMap();
  const completionProxy = new Proxy(typedOpenai.chat.completions, {
    get(target, name, receiver) {
      const baseVal = Reflect.get(target, name, receiver);
      if (name === "create") {
        return wrapChatCompletion(baseVal.bind(target));
      } else if (name === "parse") {
        return wrapBetaChatCompletionParse(baseVal.bind(target));
      } else if (name === "stream") {
        return wrapBetaChatCompletionStream(baseVal.bind(target));
      }
      return baseVal;
    }
  });
  const chatProxy3 = new Proxy(typedOpenai.chat, {
    get(target, name, receiver) {
      if (name === "completions") {
        return completionProxy;
      }
      return Reflect.get(target, name, receiver);
    }
  });
  const embeddingProxy = createEndpointProxy(typedOpenai.embeddings, wrapEmbeddings);
  const moderationProxy = createEndpointProxy(typedOpenai.moderations, wrapModerations);
  let betaProxy3;
  if (_optionalChain([typedOpenai, 'access', _5 => _5.beta, 'optionalAccess', _6 => _6.chat, 'optionalAccess', _7 => _7.completions, 'optionalAccess', _8 => _8.stream])) {
    const betaChatCompletionProxy = new Proxy(
      _optionalChain([typedOpenai, 'optionalAccess', _9 => _9.beta, 'optionalAccess', _10 => _10.chat, 'access', _11 => _11.completions]),
      {
        get(target, name, receiver) {
          const baseVal = Reflect.get(target, name, receiver);
          if (name === "parse") {
            return wrapBetaChatCompletionParse(baseVal.bind(target));
          } else if (name === "stream") {
            return wrapBetaChatCompletionStream(baseVal.bind(target));
          }
          return baseVal;
        }
      }
    );
    const betaChatProxy = new Proxy(typedOpenai.beta.chat, {
      get(target, name, receiver) {
        if (name === "completions") {
          return betaChatCompletionProxy;
        }
        return Reflect.get(target, name, receiver);
      }
    });
    betaProxy3 = new Proxy(typedOpenai.beta, {
      get(target, name, receiver) {
        if (name === "chat") {
          return betaChatProxy;
        }
        return Reflect.get(target, name, receiver);
      }
    });
  }
  const topLevelProxy = new Proxy(typedOpenai, {
    get(target, name) {
      switch (name) {
        case "chat":
          return chatProxy3;
        case "embeddings":
          return embeddingProxy;
        case "moderations":
          return moderationProxy;
        case "responses":
          return responsesProxy(typedOpenai);
      }
      if (name === "beta" && betaProxy3) {
        return betaProxy3;
      }
      const value = Reflect.get(target, name, target);
      if (typeof value !== "function") {
        return value;
      }
      const cachedValue = privateMethodWorkaroundCache.get(value);
      if (cachedValue) {
        return cachedValue;
      }
      const thisBoundValue = function(...args) {
        const thisArg = this === topLevelProxy ? target : this;
        const output = Reflect.apply(value, thisArg, args);
        return output === target ? topLevelProxy : output;
      };
      privateMethodWorkaroundCache.set(value, thisBoundValue);
      return thisBoundValue;
    }
  });
  return topLevelProxy;
}
function wrapBetaChatCompletionParse(completion) {
  return async (allParams) => {
    const { span_info, params } = splitSpanInfo(
      allParams
    );
    return _chunkMF7NU6BTjs.openAIChannels.betaChatCompletionsParse.tracePromise(
      async () => await completion(params),
      { arguments: [params], span_info }
    );
  };
}
function wrapBetaChatCompletionStream(completion) {
  return (allParams) => {
    const { span_info, params } = splitSpanInfo(
      allParams
    );
    return _chunkMF7NU6BTjs.openAIChannels.betaChatCompletionsStream.traceSync(
      () => completion(params),
      { arguments: [params], span_info }
    );
  };
}
function wrapChatCompletion(completion) {
  return (allParams, options) => {
    const { span_info, params } = splitSpanInfo(
      allParams
    );
    let executionPromise = null;
    const ensureExecuted = () => {
      if (!executionPromise) {
        executionPromise = (async () => {
          const traceContext = createChannelContext(
            _chunkMF7NU6BTjs.openAIChannels.chatCompletionsCreate,
            params,
            span_info
          );
          if (params.stream) {
            const completionPromise = completion(
              params,
              options
            );
            const { data: data2, response: response2 } = await tracePromiseWithResponse(
              _chunkMF7NU6BTjs.openAIChannels.chatCompletionsCreate,
              traceContext,
              completionPromise
            );
            return { data: data2, response: response2 };
          }
          const completionResponse = completion(
            params,
            options
          );
          const { data, response } = await tracePromiseWithResponse(
            _chunkMF7NU6BTjs.openAIChannels.chatCompletionsCreate,
            traceContext,
            completionResponse
          );
          return { data, response };
        })();
      }
      return executionPromise;
    };
    return createLazyAPIPromise(ensureExecuted);
  };
}
function createEndpointProxy(target, wrapperFn) {
  return new Proxy(target, {
    get(target2, name, receiver) {
      const baseVal = Reflect.get(target2, name, receiver);
      if (name === "create") {
        return wrapperFn(baseVal.bind(target2));
      }
      return baseVal;
    }
  });
}
function wrapApiCreateWithChannel(create, channel) {
  return (allParams, options) => {
    const { span_info, params } = splitSpanInfo(allParams);
    let executionPromise = null;
    const ensureExecuted = () => {
      if (!executionPromise) {
        executionPromise = (async () => {
          const traceContext = createChannelContext(channel, params, span_info);
          return tracePromiseWithResponse(
            channel,
            traceContext,
            create(params, options)
          );
        })();
      }
      return executionPromise;
    };
    return createLazyAPIPromise(ensureExecuted);
  };
}
var wrapEmbeddings = (create) => wrapApiCreateWithChannel(create, _chunkMF7NU6BTjs.openAIChannels.embeddingsCreate);
var wrapModerations = (create) => wrapApiCreateWithChannel(create, _chunkMF7NU6BTjs.openAIChannels.moderationsCreate);

// src/wrappers/ai-sdk/ai-sdk.ts
function isModuleNamespace(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (_optionalChain([obj, 'access', _12 => _12.constructor, 'optionalAccess', _13 => _13.name]) === "Module") {
    return true;
  }
  try {
    const keys = Object.keys(obj);
    if (keys.length === 0) return false;
    const firstKey = keys[0];
    const descriptor = Object.getOwnPropertyDescriptor(obj, firstKey);
    return descriptor ? !descriptor.configurable && !descriptor.writable : false;
  } catch (e2) {
    return false;
  }
}
function wrapAISDK(aiSDK, options = {}) {
  if (!aiSDK || typeof aiSDK !== "object") {
    return aiSDK;
  }
  const typedAISDK = aiSDK;
  const target = isModuleNamespace(aiSDK) ? Object.setPrototypeOf({}, aiSDK) : aiSDK;
  return new Proxy(target, {
    get(target2, prop, receiver) {
      const original = Reflect.get(target2, prop, receiver);
      switch (prop) {
        case "generateText":
          return wrapGenerateText(typedAISDK.generateText, options, typedAISDK);
        case "streamText":
          return wrapStreamText(typedAISDK.streamText, options, typedAISDK);
        case "generateObject":
          return wrapGenerateObject(
            typedAISDK.generateObject,
            options,
            typedAISDK
          );
        case "streamObject":
          return wrapStreamObject(typedAISDK.streamObject, options, typedAISDK);
        case "embed":
          return wrapEmbed(typedAISDK.embed, options, typedAISDK);
        case "embedMany":
          return wrapEmbedMany(typedAISDK.embedMany, options, typedAISDK);
        case "rerank":
          return typedAISDK.rerank ? wrapRerank(typedAISDK.rerank, options, typedAISDK) : typedAISDK.rerank;
        case "Agent":
        case "Experimental_Agent":
        case "ToolLoopAgent":
        case "WorkflowAgent":
          return original ? wrapAgentClass(original, options) : original;
      }
      return original;
    }
  });
}
function isHarnessAgentInstance(instance) {
  try {
    const visited = /* @__PURE__ */ new Set();
    let prototype = Object.getPrototypeOf(instance);
    while (prototype !== null && !visited.has(prototype)) {
      visited.add(prototype);
      const constructor = _optionalChain([Object, 'access', _14 => _14.getOwnPropertyDescriptor, 'call', _15 => _15(
        prototype,
        "constructor"
      ), 'optionalAccess', _16 => _16.value]);
      const constructorName = typeof constructor === "function" ? _optionalChain([Object, 'access', _17 => _17.getOwnPropertyDescriptor, 'call', _18 => _18(constructor, "name"), 'optionalAccess', _19 => _19.value]) : void 0;
      if (constructorName === "HarnessAgent") {
        return true;
      }
      prototype = Object.getPrototypeOf(prototype);
    }
  } catch (e3) {
  }
  return false;
}
var wrapAgentClass = (AgentClass, options = {}) => {
  const typedAgentClass = AgentClass;
  return new Proxy(typedAgentClass, {
    construct(target, args, newTarget) {
      const instance = Reflect.construct(
        target,
        args,
        newTarget
      );
      const harnessAgent = isHarnessAgentInstance(instance) ? instance : null;
      return new Proxy(instance, {
        get(instanceTarget, prop, instanceReceiver) {
          const original = Reflect.get(instanceTarget, prop, instanceTarget);
          if (harnessAgent && typeof original === "function") {
            switch (prop) {
              case "createSession":
                return wrapHarnessAgentCreateSession(
                  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                  original,
                  harnessAgent
                );
              case "generate":
                return wrapHarnessAgentGenerate(
                  original,
                  harnessAgent,
                  _chunkMF7NU6BTjs.harnessAgentChannels.generate,
                  "HarnessAgent.generate",
                  options
                );
              case "stream":
                return wrapHarnessAgentStream(
                  original,
                  harnessAgent,
                  _chunkMF7NU6BTjs.harnessAgentChannels.stream,
                  "HarnessAgent.stream",
                  options
                );
              case "continueGenerate":
                return wrapHarnessAgentGenerate(
                  original,
                  harnessAgent,
                  _chunkMF7NU6BTjs.harnessAgentChannels.continueGenerate,
                  "HarnessAgent.continueGenerate",
                  options
                );
              case "continueStream":
                return wrapHarnessAgentStream(
                  original,
                  harnessAgent,
                  _chunkMF7NU6BTjs.harnessAgentChannels.continueStream,
                  "HarnessAgent.continueStream",
                  options
                );
            }
          }
          if (prop === "generate" && typeof original === "function" && instanceTarget.constructor.name !== "WorkflowAgent") {
            return wrapAgentGenerate(original, instanceTarget, options);
          }
          if (prop === "stream" && typeof original === "function") {
            return wrapAgentStream(original, instanceTarget, options);
          }
          if (typeof original === "function") {
            return original.bind(instanceTarget);
          }
          return original;
        }
      });
    }
  });
};
var wrapHarnessAgentCreateSession = (createSession, instance) => {
  const wrapper = function(params) {
    return _chunkMF7NU6BTjs.harnessAgentChannels.createSession.tracePromise(
      () => params === void 0 ? createSession.call(instance) : createSession.call(instance, params),
      createAISDKChannelContext(_nullishCoalesce(params, () => ( {})), { self: instance })
    );
  };
  Object.defineProperty(wrapper, "name", {
    value: "HarnessAgent.createSession",
    writable: false
  });
  return wrapper;
};
var wrapHarnessAgentGenerate = (generate, instance, channel, name, options) => makeGenerateTextWrapper(
  channel,
  name,
  generate.bind(instance),
  {
    self: instance,
    spanType: "task" /* TASK */
  },
  options
);
var wrapHarnessAgentStream = (stream, instance, channel, name, options) => makeStreamWrapper(
  channel,
  name,
  stream.bind(instance),
  {
    self: instance,
    spanType: "task" /* TASK */
  },
  options
);
var wrapAgentGenerate = (generate, instance, options = {}) => {
  const defaultName = `${instance.constructor.name}.generate`;
  return async (params) => makeGenerateTextWrapper(
    generateChannelForAgent(instance.constructor.name),
    defaultName,
    generate.bind(instance),
    {
      self: instance,
      spanType: "function" /* FUNCTION */
    },
    options
  )({ ...instance.settings, ...params });
};
function generateChannelForAgent(agentName) {
  if (agentName === "ToolLoopAgent") {
    return _chunkMF7NU6BTjs.aiSDKChannels.toolLoopAgentGenerate;
  }
  return _chunkMF7NU6BTjs.aiSDKChannels.agentGenerate;
}
var wrapAgentStream = (stream, instance, options = {}) => {
  const defaultName = `${instance.constructor.name}.stream`;
  return (params) => {
    const workflowAgent = instance.constructor.name === "WorkflowAgent";
    if (workflowAgent && _chunkQRHGVBKUjs.currentWorkflowAgentWrapperSpan.call(void 0, )) {
      const { span_info: _spanInfo, ...cleanParams } = params;
      return stream.call(instance, { ...instance.settings, ...cleanParams });
    }
    const trace = () => makeStreamWrapper(
      streamChannelForAgent(instance.constructor.name),
      defaultName,
      stream.bind(instance),
      {
        self: instance,
        spanType: "function" /* FUNCTION */
      },
      options
    )({ ...instance.settings, ...params });
    return trace();
  };
};
function streamChannelForAgent(agentName) {
  if (agentName === "ToolLoopAgent") {
    return _chunkMF7NU6BTjs.aiSDKChannels.toolLoopAgentStream;
  }
  if (agentName === "WorkflowAgent") {
    return _chunkMF7NU6BTjs.aiSDKChannels.workflowAgentStream;
  }
  return _chunkMF7NU6BTjs.aiSDKChannels.agentStream;
}
var makeGenerateTextWrapper = (channel, name, generateText, contextOptions = {}, options = {}) => {
  const wrapper = async function(allParams) {
    const { span_info, ...params } = allParams;
    const tracedParams = { ...params };
    return channel.tracePromise(
      () => generateText(tracedParams),
      createAISDKChannelContext(tracedParams, {
        aiSDK: contextOptions.aiSDK,
        denyOutputPaths: options.denyOutputPaths,
        self: contextOptions.self,
        span_info: mergeSpanInfo(span_info, {
          name,
          spanType: contextOptions.spanType
        })
      })
    );
  };
  Object.defineProperty(wrapper, "name", { value: name, writable: false });
  return wrapper;
};
var wrapGenerateText = (generateText, options = {}, aiSDK) => {
  return makeGenerateTextWrapper(
    _chunkMF7NU6BTjs.aiSDKChannels.generateText,
    "generateText",
    generateText,
    { aiSDK },
    options
  );
};
var wrapGenerateObject = (generateObject, options = {}, aiSDK) => {
  return makeGenerateTextWrapper(
    _chunkMF7NU6BTjs.aiSDKChannels.generateObject,
    "generateObject",
    generateObject,
    { aiSDK },
    options
  );
};
var makeEmbedWrapper = (channel, name, embed, contextOptions = {}, options = {}) => {
  const wrapper = async function(allParams) {
    const { span_info, ...params } = allParams;
    const tracedParams = { ...params };
    return channel.tracePromise(
      () => embed(tracedParams),
      createAISDKChannelContext(tracedParams, {
        aiSDK: contextOptions.aiSDK,
        denyOutputPaths: options.denyOutputPaths,
        self: contextOptions.self,
        span_info: mergeSpanInfo(span_info, {
          name,
          spanType: contextOptions.spanType
        })
      })
    );
  };
  Object.defineProperty(wrapper, "name", { value: name, writable: false });
  return wrapper;
};
var wrapEmbed = (embed, options = {}, aiSDK) => {
  return makeEmbedWrapper(
    _chunkMF7NU6BTjs.aiSDKChannels.embed,
    "embed",
    embed,
    { aiSDK },
    options
  );
};
var wrapEmbedMany = (embedMany, options = {}, aiSDK) => {
  return makeEmbedWrapper(
    _chunkMF7NU6BTjs.aiSDKChannels.embedMany,
    "embedMany",
    embedMany,
    { aiSDK },
    options
  );
};
var makeRerankWrapper = (rerank, contextOptions = {}, options = {}) => {
  const wrapper = async function(allParams) {
    const { span_info, ...params } = allParams;
    const tracedParams = { ...params };
    return _chunkMF7NU6BTjs.aiSDKChannels.rerank.tracePromise(
      () => rerank(tracedParams),
      createAISDKChannelContext(tracedParams, {
        aiSDK: contextOptions.aiSDK,
        denyOutputPaths: options.denyOutputPaths,
        self: contextOptions.self,
        span_info: mergeSpanInfo(span_info, {
          name: "rerank",
          spanType: contextOptions.spanType
        })
      })
    );
  };
  Object.defineProperty(wrapper, "name", { value: "rerank", writable: false });
  return wrapper;
};
var wrapRerank = (rerank, options = {}, aiSDK) => {
  return makeRerankWrapper(rerank, { aiSDK }, options);
};
var makeStreamWrapper = (channel, name, streamText, contextOptions = {}, options = {}) => {
  const wrapper = function(allParams) {
    const { span_info, ...params } = allParams;
    const tracedParams = { ...params };
    const context = createAISDKChannelContext(tracedParams, {
      aiSDK: contextOptions.aiSDK,
      denyOutputPaths: options.denyOutputPaths,
      self: contextOptions.self,
      span_info: mergeSpanInfo(span_info, {
        name,
        spanType: contextOptions.spanType
      })
    });
    return channel.tracePromise(() => streamText(tracedParams), context);
  };
  Object.defineProperty(wrapper, "name", { value: name, writable: false });
  return wrapper;
};
var wrapStreamText = (streamText, options = {}, aiSDK) => {
  return makeStreamWrapper(
    _chunkMF7NU6BTjs.aiSDKChannels.streamText,
    "streamText",
    streamText,
    { aiSDK },
    options
  );
};
var wrapStreamObject = (streamObject, options = {}, aiSDK) => {
  return makeStreamWrapper(
    _chunkMF7NU6BTjs.aiSDKChannels.streamObject,
    "streamObject",
    streamObject,
    { aiSDK },
    options
  );
};
function mergeSpanInfo(spanInfo, defaults) {
  if (defaults.name === void 0 && defaults.spanType === void 0 && spanInfo === void 0) {
    return void 0;
  }
  return {
    ...spanInfo,
    ..._optionalChain([spanInfo, 'optionalAccess', _20 => _20.name]) ? {} : defaults.name ? { name: defaults.name } : {},
    ...defaults.spanType !== void 0 || _optionalChain([spanInfo, 'optionalAccess', _21 => _21.spanAttributes]) ? {
      spanAttributes: {
        ...defaults.spanType !== void 0 ? { type: defaults.spanType } : {},
        ..._nullishCoalesce(_optionalChain([spanInfo, 'optionalAccess', _22 => _22.spanAttributes]), () => ( {}))
      }
    } : {}
  };
}
function createAISDKChannelContext(params, context = {}) {
  return {
    arguments: [params],
    ...context.aiSDK ? { aiSDK: context.aiSDK } : {},
    ...context.denyOutputPaths ? { denyOutputPaths: context.denyOutputPaths } : {},
    ...context.self !== void 0 ? { self: context.self } : {},
    ...context.span_info ? { span_info: context.span_info } : {}
  };
}

// src/wrappers/ai-sdk/deprecated/wrapAISDKModel.ts
function wrapAISDKModel(model) {
  const m = model;
  if (_optionalChain([m, 'optionalAccess', _23 => _23.specificationVersion]) === "v1" && typeof _optionalChain([m, 'optionalAccess', _24 => _24.provider]) === "string" && typeof _optionalChain([m, 'optionalAccess', _25 => _25.modelId]) === "string") {
    return new BraintrustLanguageModelWrapper(m);
  } else {
    console.warn("Unsupported AI SDK model. Not wrapping.");
    return model;
  }
}
var BraintrustLanguageModelWrapper = class {
  constructor(model) {
    this.model = model;
    if (typeof this.model.supportsUrl === "function") {
      this.supportsUrl = (url) => this.model.supportsUrl(url);
    }
  }
  
  
  get specificationVersion() {
    return this.model.specificationVersion;
  }
  get provider() {
    return this.model.provider;
  }
  get modelId() {
    return this.model.modelId;
  }
  get defaultObjectGenerationMode() {
    return this.model.defaultObjectGenerationMode;
  }
  get supportsImageUrls() {
    return this.model.supportsImageUrls;
  }
  get supportsStructuredOutputs() {
    return this.model.supportsStructuredOutputs;
  }
  // For the first cut, do not support custom span_info arguments. We can
  // propagate those via async local storage
  async doGenerate(options) {
    const span = _chunkQRHGVBKUjs.startSpan.call(void 0, 
      _chunkMF7NU6BTjs.withSpanInstrumentationName.call(void 0, 
        {
          name: "Chat Completion",
          spanAttributes: {
            type: "llm"
          }
        },
        _chunkMF7NU6BTjs.INSTRUMENTATION_NAMES.AI_SDK
      )
    );
    const { prompt, mode, ...rest } = options;
    const startTime = _chunkQRHGVBKUjs.getCurrentUnixTimestamp.call(void 0, );
    try {
      const ret = await this.model.doGenerate(options);
      span.log({
        input: postProcessPrompt(prompt),
        metadata: {
          model: this.modelId,
          ...rest,
          ..."tools" in mode && mode.tools ? { tools: convertTools(mode.tools) } : "tool" in mode && mode.tool ? { tools: convertTools([mode.tool]) } : {}
        },
        output: postProcessOutput(ret.text, ret.toolCalls, ret.finishReason),
        metrics: {
          time_to_first_token: _chunkQRHGVBKUjs.getCurrentUnixTimestamp.call(void 0, ) - startTime,
          tokens: !_chunkQRHGVBKUjs.isEmpty.call(void 0, ret.usage) ? ret.usage.promptTokens + ret.usage.completionTokens : void 0,
          prompt_tokens: _optionalChain([ret, 'access', _26 => _26.usage, 'optionalAccess', _27 => _27.promptTokens]),
          completion_tokens: _optionalChain([ret, 'access', _28 => _28.usage, 'optionalAccess', _29 => _29.completionTokens]),
          cached: _chunkQRHGVBKUjs.parseCachedHeader.call(void 0, 
            _nullishCoalesce(_optionalChain([ret, 'access', _30 => _30.rawResponse, 'optionalAccess', _31 => _31.headers, 'optionalAccess', _32 => _32[_chunkQRHGVBKUjs.X_CACHED_HEADER]]), () => ( _optionalChain([ret, 'access', _33 => _33.rawResponse, 'optionalAccess', _34 => _34.headers, 'optionalAccess', _35 => _35[_chunkQRHGVBKUjs.LEGACY_CACHED_HEADER]])))
          )
        }
      });
      return ret;
    } finally {
      span.end();
    }
  }
  async doStream(options) {
    const { prompt, mode, ...rest } = options;
    const startTime = _chunkQRHGVBKUjs.getCurrentUnixTimestamp.call(void 0, );
    const span = _chunkQRHGVBKUjs.startSpan.call(void 0, 
      _chunkMF7NU6BTjs.withSpanInstrumentationName.call(void 0, 
        {
          name: "Chat Completion",
          spanAttributes: {
            type: "llm"
          }
        },
        _chunkMF7NU6BTjs.INSTRUMENTATION_NAMES.AI_SDK
      )
    );
    span.log({
      input: postProcessPrompt(prompt),
      metadata: {
        model: this.modelId,
        ...rest,
        ..."tools" in mode && mode.tools ? { tools: convertTools(mode.tools) } : "tool" in mode && mode.tool ? { tools: convertTools([mode.tool]) } : {}
      }
    });
    let ended = false;
    const end = () => {
      if (!ended) {
        span.end();
        ended = true;
      }
    };
    try {
      const ret = await this.model.doStream(options);
      let time_to_first_token = void 0;
      let usage = void 0;
      let fullText = void 0;
      const toolCalls2 = {};
      let finishReason = void 0;
      return {
        ...ret,
        stream: ret.stream.pipeThrough(
          new TransformStream({
            transform(chunk, controller) {
              if (time_to_first_token === void 0) {
                time_to_first_token = _chunkQRHGVBKUjs.getCurrentUnixTimestamp.call(void 0, ) - startTime;
                span.log({ metrics: { time_to_first_token } });
              }
              switch (chunk.type) {
                case "text-delta":
                  if (fullText === void 0) {
                    fullText = "";
                  }
                  fullText += chunk.textDelta;
                  break;
                case "tool-call":
                  toolCalls2[chunk.toolCallId] = {
                    toolCallType: chunk.toolCallType,
                    toolCallId: chunk.toolCallId,
                    toolName: chunk.toolName,
                    args: chunk.args
                  };
                  break;
                case "tool-call-delta":
                  if (toolCalls2[chunk.toolCallId] === void 0) {
                    toolCalls2[chunk.toolCallId] = {
                      toolCallType: chunk.toolCallType,
                      toolCallId: chunk.toolCallId,
                      toolName: chunk.toolName,
                      args: ""
                    };
                  }
                  toolCalls2[chunk.toolCallId].args += chunk.argsTextDelta;
                  break;
                case "finish":
                  usage = chunk.usage;
                  finishReason = chunk.finishReason;
                  break;
              }
              controller.enqueue(chunk);
            },
            async flush(controller) {
              span.log({
                output: postProcessOutput(
                  fullText,
                  Object.keys(toolCalls2).length > 0 ? Object.values(toolCalls2) : void 0,
                  finishReason
                ),
                metrics: {
                  time_to_first_token,
                  tokens: !_chunkQRHGVBKUjs.isEmpty.call(void 0, usage) ? usage.promptTokens + usage.completionTokens : void 0,
                  prompt_tokens: _optionalChain([usage, 'optionalAccess', _36 => _36.promptTokens]),
                  completion_tokens: _optionalChain([usage, 'optionalAccess', _37 => _37.completionTokens]),
                  cached: _chunkQRHGVBKUjs.parseCachedHeader.call(void 0, 
                    _nullishCoalesce(_optionalChain([ret, 'access', _38 => _38.rawResponse, 'optionalAccess', _39 => _39.headers, 'optionalAccess', _40 => _40[_chunkQRHGVBKUjs.X_CACHED_HEADER]]), () => ( _optionalChain([ret, 'access', _41 => _41.rawResponse, 'optionalAccess', _42 => _42.headers, 'optionalAccess', _43 => _43[_chunkQRHGVBKUjs.LEGACY_CACHED_HEADER]])))
                  )
                }
              });
              end();
              controller.terminate();
            }
          })
        )
      };
    } finally {
      end();
    }
  }
};
function convertTools(tools) {
  return tools.map((tool) => {
    const { type: _, ...rest } = tool;
    return {
      type: tool.type,
      function: rest
    };
  });
}
function postProcessPrompt(prompt) {
  return prompt.flatMap((message) => {
    switch (message.role) {
      case "system":
        return [
          {
            role: "system",
            content: message.content
          }
        ];
      case "assistant":
        const textPart = message.content.find(
          (part) => part.type === "text"
        );
        const toolCallParts = message.content.filter(
          (part) => part.type === "tool-call"
        );
        return [
          {
            role: "assistant",
            content: _optionalChain([textPart, 'optionalAccess', _44 => _44.text]),
            ...toolCallParts.length > 0 ? {
              tool_calls: toolCallParts.map((part) => ({
                id: part.toolCallId,
                function: {
                  name: part.toolName,
                  arguments: JSON.stringify(part.args)
                },
                type: "function"
              }))
            } : {}
          }
        ];
      case "user":
        return [
          {
            role: "user",
            content: message.content.map((part) => {
              switch (part.type) {
                case "text":
                  return {
                    type: "text",
                    text: part.text,
                    ...part.providerMetadata ? { providerMetadata: part.providerMetadata } : {}
                  };
                case "image":
                  return {
                    type: "image_url",
                    image_url: {
                      url: part.image.toString(),
                      ...part.providerMetadata ? { providerMetadata: part.providerMetadata } : {}
                    }
                  };
                default:
                  return part;
              }
            })
          }
        ];
      case "tool":
        return message.content.map((part) => ({
          role: "tool",
          tool_call_id: part.toolCallId,
          content: JSON.stringify(part.result)
        }));
    }
  });
}
function postProcessOutput(text, toolCalls2, finishReason) {
  return [
    {
      index: 0,
      message: {
        role: "assistant",
        content: _nullishCoalesce(text, () => ( "")),
        ...toolCalls2 && toolCalls2.length > 0 ? {
          tool_calls: toolCalls2.map((toolCall) => ({
            id: toolCall.toolCallId,
            function: {
              name: toolCall.toolName,
              arguments: toolCall.args
            },
            type: "function"
          }))
        } : {}
      },
      finish_reason: finishReason
    }
  ];
}

// src/wrappers/ai-sdk/deprecated/BraintrustMiddleware.ts
function detectProviderFromResult(result) {
  if (!_optionalChain([result, 'optionalAccess', _45 => _45.providerMetadata])) {
    return void 0;
  }
  const keys = Object.keys(result.providerMetadata);
  return _optionalChain([keys, 'optionalAccess', _46 => _46.at, 'call', _47 => _47(0)]);
}
function extractModelFromResult(result) {
  if (_optionalChain([result, 'optionalAccess', _48 => _48.response, 'optionalAccess', _49 => _49.modelId])) {
    return result.response.modelId;
  }
  if (_optionalChain([result, 'optionalAccess', _50 => _50.request, 'optionalAccess', _51 => _51.body, 'optionalAccess', _52 => _52.model])) {
    return result.request.body.model;
  }
  return void 0;
}
function extractModelFromWrapGenerateCallback(model) {
  return _optionalChain([model, 'optionalAccess', _53 => _53.modelId]);
}
function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
function extractModelParameters(params, excludeKeys) {
  const modelParams = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== void 0 && !excludeKeys.has(key)) {
      const snakeKey = camelToSnake(key);
      modelParams[snakeKey] = value;
    }
  }
  return modelParams;
}
function getNumberProperty(obj, key) {
  if (!obj || typeof obj !== "object" || !(key in obj)) {
    return void 0;
  }
  const value = Reflect.get(obj, key);
  return typeof value === "number" ? value : void 0;
}
function normalizeUsageMetrics(usage, provider, providerMetadata) {
  const metrics = {};
  const inputTokens = getNumberProperty(usage, "inputTokens");
  if (inputTokens !== void 0) {
    metrics.prompt_tokens = inputTokens;
  }
  const outputTokens = getNumberProperty(usage, "outputTokens");
  if (outputTokens !== void 0) {
    metrics.completion_tokens = outputTokens;
  }
  const totalTokens = getNumberProperty(usage, "totalTokens");
  if (totalTokens !== void 0) {
    metrics.tokens = totalTokens;
  }
  const reasoningTokens = getNumberProperty(usage, "reasoningTokens");
  if (reasoningTokens !== void 0) {
    metrics.completion_reasoning_tokens = reasoningTokens;
  }
  const cachedInputTokens = getNumberProperty(usage, "cachedInputTokens");
  if (cachedInputTokens !== void 0) {
    metrics.prompt_cached_tokens = cachedInputTokens;
  }
  if (provider === "anthropic") {
    const anthropicMetadata = _optionalChain([providerMetadata, 'optionalAccess', _54 => _54.anthropic]);
    if (anthropicMetadata) {
      const cacheReadTokens = getNumberProperty(anthropicMetadata.usage, "cache_read_input_tokens") || 0;
      const cacheCreationTokens = getNumberProperty(
        anthropicMetadata.usage,
        "cache_creation_input_tokens"
      ) || 0;
      const cacheTokens = _chunkQRHGVBKUjs.extractAnthropicCacheTokens.call(void 0, 
        cacheReadTokens,
        cacheCreationTokens
      );
      Object.assign(metrics, cacheTokens);
      Object.assign(metrics, _chunkQRHGVBKUjs.finalizeAnthropicTokens.call(void 0, metrics));
    }
  }
  return metrics;
}
function normalizeFinishReason(reason) {
  if (typeof reason !== "string") return void 0;
  return reason.replace(/-/g, "_");
}
function buildAssistantOutputWithToolCalls(result, toolCalls2) {
  return [
    {
      index: 0,
      logprobs: null,
      finish_reason: _nullishCoalesce(normalizeFinishReason(_optionalChain([result, 'optionalAccess', _55 => _55.finishReason])), () => ( (toolCalls2.length ? "tool_calls" : void 0))),
      message: {
        role: "assistant",
        tool_calls: toolCalls2.length > 0 ? toolCalls2 : void 0
      }
    }
  ];
}
function extractToolCallsFromSteps(steps) {
  const toolCalls2 = [];
  if (!Array.isArray(steps)) return toolCalls2;
  let idx = 0;
  for (const step of steps) {
    const blocks = _optionalChain([step, 'optionalAccess', _56 => _56.content]);
    if (!Array.isArray(blocks)) continue;
    for (const block of blocks) {
      if (block && typeof block === "object" && block.type === "tool-call") {
        toolCalls2.push({
          id: block.toolCallId,
          type: "function",
          index: idx++,
          function: {
            name: block.toolName,
            arguments: typeof block.input === "string" ? block.input : JSON.stringify(_nullishCoalesce(block.input, () => ( {})))
          }
        });
      }
    }
  }
  return toolCalls2;
}
function extractToolCallsFromBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return extractToolCallsFromSteps([{ content: blocks }]);
}
function extractInput(params) {
  return _nullishCoalesce(_nullishCoalesce(_optionalChain([params, 'optionalAccess', _57 => _57.prompt]), () => ( _optionalChain([params, 'optionalAccess', _58 => _58.messages]))), () => ( _optionalChain([params, 'optionalAccess', _59 => _59.system])));
}
var V2_EXCLUDE_KEYS = /* @__PURE__ */ new Set([
  "prompt",
  // Already captured as input
  "system",
  // Already captured as input
  "messages",
  // Already captured as input
  "model",
  // Already captured in metadata.model
  "providerOptions"
  // Internal AI SDK configuration
]);
function BraintrustMiddleware(config = {}) {
  return {
    wrapGenerate: async ({
      doGenerate,
      params,
      model: modelFromWrapGenerate
    }) => {
      const rawInput = extractInput(params);
      const processedInput = _chunkQRHGVBKUjs.processInputAttachments.call(void 0, rawInput);
      const spanArgs = {
        name: _optionalChain([config, 'access', _60 => _60.spanInfo, 'optionalAccess', _61 => _61.name]) || "ai-sdk.doGenerate",
        spanAttributes: {
          type: "llm" /* LLM */,
          ..._optionalChain([config, 'access', _62 => _62.spanInfo, 'optionalAccess', _63 => _63.spanAttributes]) || {}
        },
        event: {
          input: processedInput,
          metadata: {
            ...extractModelParameters(params, V2_EXCLUDE_KEYS),
            ..._optionalChain([config, 'access', _64 => _64.spanInfo, 'optionalAccess', _65 => _65.metadata]) || {}
          }
        }
      };
      const span = _chunkQRHGVBKUjs.startSpan.call(void 0, 
        _chunkMF7NU6BTjs.withSpanInstrumentationName.call(void 0, spanArgs, _chunkMF7NU6BTjs.INSTRUMENTATION_NAMES.AI_SDK)
      );
      try {
        const result = await doGenerate();
        const metadata = {};
        const provider = detectProviderFromResult(result);
        if (provider !== void 0) {
          metadata.provider = provider;
        }
        if (result.finishReason !== void 0) {
          metadata.finish_reason = result.finishReason;
        }
        const model = extractModelFromResult(result);
        if (model !== void 0) {
          metadata.model = model;
        } else if (modelFromWrapGenerate) {
          const modelId = extractModelFromWrapGenerateCallback(
            modelFromWrapGenerate
          );
          if (modelId) {
            metadata.model = modelId;
          }
        }
        let toolCalls2 = extractToolCallsFromSteps(_optionalChain([result, 'optionalAccess', _66 => _66.steps]));
        if (!toolCalls2 || toolCalls2.length === 0) {
          toolCalls2 = extractToolCallsFromBlocks(_optionalChain([result, 'optionalAccess', _67 => _67.content]));
        }
        span.log({
          output: toolCalls2.length > 0 ? buildAssistantOutputWithToolCalls(result, toolCalls2) : _optionalChain([result, 'optionalAccess', _68 => _68.content]),
          metadata,
          metrics: normalizeUsageMetrics(
            result.usage,
            provider,
            result.providerMetadata
          )
        });
        return result;
      } catch (error) {
        span.log({
          error: error instanceof Error ? error.message : String(error)
        });
        throw error;
      } finally {
        span.end();
      }
    },
    wrapStream: async ({ doStream, params }) => {
      const rawInput = extractInput(params);
      const processedInput = _chunkQRHGVBKUjs.processInputAttachments.call(void 0, rawInput);
      const spanArgs = {
        name: _optionalChain([config, 'access', _69 => _69.spanInfo, 'optionalAccess', _70 => _70.name]) || "ai-sdk.doStream",
        spanAttributes: {
          type: "llm" /* LLM */,
          ..._optionalChain([config, 'access', _71 => _71.spanInfo, 'optionalAccess', _72 => _72.spanAttributes]) || {}
        },
        event: {
          input: processedInput,
          metadata: {
            ...extractModelParameters(params, V2_EXCLUDE_KEYS),
            ..._optionalChain([config, 'access', _73 => _73.spanInfo, 'optionalAccess', _74 => _74.metadata]) || {}
          }
        }
      };
      const span = _chunkQRHGVBKUjs.startSpan.call(void 0, 
        _chunkMF7NU6BTjs.withSpanInstrumentationName.call(void 0, spanArgs, _chunkMF7NU6BTjs.INSTRUMENTATION_NAMES.AI_SDK)
      );
      try {
        const { stream, ...rest } = await doStream();
        const textChunks = [];
        const toolBlocks = [];
        let finalUsage = {};
        let finalFinishReason = void 0;
        let providerMetadata = {};
        const transformStream = new TransformStream({
          transform(chunk, controller) {
            try {
              if (chunk.type === "text-delta" && chunk.delta) {
                textChunks.push(chunk.delta);
              }
              if (chunk.type === "tool-call" || chunk.type === "tool-result") {
                toolBlocks.push(chunk);
              }
              if (chunk.type === "finish") {
                finalFinishReason = chunk.finishReason;
                finalUsage = chunk.usage || {};
                providerMetadata = chunk.providerMetadata || {};
              }
              controller.enqueue(chunk);
            } catch (error) {
              span.log({
                error: error instanceof Error ? error.message : String(error)
              });
              span.end();
              controller.error(error);
            }
          },
          flush() {
            try {
              const generatedText = textChunks.join("");
              let output = generatedText ? [{ type: "text", text: generatedText }] : [];
              const resultForDetection = {
                providerMetadata,
                response: rest.response,
                ...rest,
                finishReason: finalFinishReason
              };
              const metadata = {};
              const provider = detectProviderFromResult(resultForDetection);
              if (provider !== void 0) {
                metadata.provider = provider;
              }
              if (finalFinishReason !== void 0) {
                metadata.finish_reason = finalFinishReason;
              }
              const model = extractModelFromResult(resultForDetection);
              if (model !== void 0) {
                metadata.model = model;
              }
              if (toolBlocks.length > 0) {
                const toolCalls2 = extractToolCallsFromSteps([
                  { content: toolBlocks }
                ]);
                if (toolCalls2.length > 0) {
                  output = buildAssistantOutputWithToolCalls(
                    resultForDetection,
                    toolCalls2
                  );
                }
              }
              span.log({
                output,
                metadata,
                metrics: normalizeUsageMetrics(
                  finalUsage,
                  provider,
                  providerMetadata
                )
              });
              span.end();
            } catch (error) {
              span.log({
                error: error instanceof Error ? error.message : String(error)
              });
              span.end();
              throw error;
            }
          }
        });
        return {
          stream: stream.pipeThrough(transformStream),
          ...rest
        };
      } catch (error) {
        span.log({
          error: error instanceof Error ? error.message : String(error)
        });
        span.end();
        throw error;
      }
    }
  };
}

// src/instrumentation/plugins/eve-plugin.ts
var EVE_TRACE_STATE_KEY = "braintrust.eve.tracing";
var MAX_EVE_CACHE_ENTRIES = 1e4;
var MAX_STORED_LLM_INPUTS = 100;
var MAX_STORED_REASONING_BLOCKS = 100;
var MAX_STORED_SPAN_REFERENCES = 1e4;
var MAX_STORED_STEP_STARTS = 1e4;
function braintrustEveHook(options) {
  const state = options.defineState(EVE_TRACE_STATE_KEY, emptyEveTraceState);
  const bridge = new EveBridge(state);
  return {
    events: {
      "*": async (event, ctx) => {
        await bridge.handle(event, ctx, options.metadata);
      }
    }
  };
}
function braintrustEveInstrumentation(options) {
  const state = options.defineState(EVE_TRACE_STATE_KEY, emptyEveTraceState);
  return {
    events: {
      "step.started": (input) => {
        try {
          captureEveModelInput(state, input);
        } catch (error) {
          _chunkQRHGVBKUjs.debugLogger.warn("Error in Eve LLM input capture:", error);
        }
      }
    },
    recordInputs: false,
    recordOutputs: false,
    setup: options.setup
  };
}
function isEveHandleMessageStreamEvent(event) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, event) && typeof event["type"] === "string";
}
var ResumedEveSpan = class {
  constructor(reference) {
    this.reference = reference;
    this.endTime = reference.endTime;
  }
  
  
  get rootSpanId() {
    return this.reference.rootSpanId;
  }
  get spanId() {
    return this.reference.spanId;
  }
  log(event) {
    const metrics = {
      ..._optionalChain([this, 'access', _75 => _75.reference, 'access', _76 => _76.startEvent, 'optionalAccess', _77 => _77.metrics]),
      ...this.endTime === void 0 ? {} : { end: this.endTime },
      ...event.metrics
    };
    _chunkQRHGVBKUjs.updateSpan.call(void 0, {
      exported: this.reference.exported,
      ...this.reference.startEvent,
      ...event,
      ...Object.keys(metrics).length > 0 ? { metrics } : {}
    });
  }
  end(args) {
    if (this.endTime === void 0) {
      this.endTime = _nullishCoalesce(_optionalChain([args, 'optionalAccess', _78 => _78.endTime]), () => ( _chunkQRHGVBKUjs.getCurrentUnixTimestamp.call(void 0, )));
      this.log({ metrics: { end: this.endTime } });
    }
    return this.endTime;
  }
};
var EveBridge = (_class = class {
  constructor(state) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);
    this.state = state;
  }
  
  __init() {this.eventQueuesBySession = /* @__PURE__ */ new Map()}
  __init2() {this.completedToolKeys = new (0, _chunkQRHGVBKUjs.LRUCache)({
    max: MAX_EVE_CACHE_ENTRIES
  })}
  __init3() {this.toolsByCallKey = new (0, _chunkQRHGVBKUjs.LRUCache)({
    max: MAX_EVE_CACHE_ENTRIES
  })}
  __init4() {this.turnsByKey = new (0, _chunkQRHGVBKUjs.LRUCache)({
    max: MAX_EVE_CACHE_ENTRIES
  })}
  async startEveSpan(args) {
    const rowId = _optionalChain([args, 'optionalAccess', _79 => _79.event, 'optionalAccess', _80 => _80.id]);
    const reference = typeof rowId === "string" && readEveTraceState(this.state).spanReferences.find(
      (candidate) => candidate.rowId === rowId
    );
    if (reference) {
      return new ResumedEveSpan(reference);
    }
    const startTime = _nullishCoalesce(_optionalChain([args, 'optionalAccess', _81 => _81.startTime]), () => ( _chunkQRHGVBKUjs.getCurrentUnixTimestamp.call(void 0, )));
    const parentSpanIds = _optionalChain([args, 'optionalAccess', _82 => _82.parentSpanIds]);
    const startEvent = {
      created: (/* @__PURE__ */ new Date()).toISOString(),
      metrics: { start: startTime },
      span_attributes: {
        ..._optionalChain([args, 'optionalAccess', _83 => _83.name]) ? { name: args.name } : {},
        ..._optionalChain([args, 'optionalAccess', _84 => _84.type]) ? { type: args.type } : {},
        ..._optionalChain([args, 'optionalAccess', _85 => _85.spanAttributes])
      },
      span_parents: parentSpanIds ? "spanId" in parentSpanIds ? [parentSpanIds.spanId] : parentSpanIds.parentSpanIds : []
    };
    const span = _chunkQRHGVBKUjs.withCurrent.call(void 0, 
      _chunkQRHGVBKUjs.NOOP_SPAN,
      () => _chunkQRHGVBKUjs._internalStartSpanWithInitialMerge.call(void 0, 
        _chunkMF7NU6BTjs.withSpanInstrumentationName.call(void 0, 
          { ...args, startTime },
          _chunkMF7NU6BTjs.INSTRUMENTATION_NAMES.EVE
        )
      )
    );
    if (typeof rowId !== "string") {
      return span;
    }
    try {
      const exported = await span.export();
      const reference2 = {
        exported,
        rootSpanId: span.rootSpanId,
        rowId,
        spanId: span.spanId,
        startEvent
      };
      this.state.update((current) => {
        const normalized = normalizeEveTraceState(current);
        return normalized.spanReferences.some(
          (candidate) => candidate.rowId === rowId
        ) ? normalized : {
          ...normalized,
          spanReferences: [...normalized.spanReferences, reference2].slice(
            -MAX_STORED_SPAN_REFERENCES
          )
        };
      });
    } catch (error) {
      _chunkQRHGVBKUjs.debugLogger.warn("Error exporting Eve span for resumption:", error);
    }
    return span;
  }
  async startEveChildSpan(parent, args) {
    return await this.startEveSpan({
      ...args,
      parentSpanIds: {
        rootSpanId: parent.rootSpanId,
        spanId: parent.spanId
      }
    });
  }
  stepOrdinal(event) {
    let ordinal = 0;
    this.state.update((current) => {
      const state = normalizeEveTraceState(current);
      const previous = state.stepStarts.filter(
        (entry) => entry.turnId === event.data.turnId && entry.stepIndex === event.data.stepIndex
      ).at(-1);
      if (_optionalChain([previous, 'optionalAccess', _86 => _86.open])) {
        ordinal = previous.ordinal;
        return state;
      }
      ordinal = state.stepStarts.filter(
        (entry) => entry.turnId === event.data.turnId
      ).length;
      return {
        ...state,
        stepStarts: [
          ...state.stepStarts,
          {
            open: true,
            ordinal,
            stepIndex: event.data.stepIndex,
            turnId: event.data.turnId
          }
        ].slice(-MAX_STORED_STEP_STARTS)
      };
    });
    return ordinal;
  }
  markStepEnded(turnId, stepIndex) {
    this.state.update((current) => {
      const state = normalizeEveTraceState(current);
      let index = -1;
      for (let i = state.stepStarts.length - 1; i >= 0; i--) {
        const entry = state.stepStarts[i];
        if (_optionalChain([entry, 'optionalAccess', _87 => _87.turnId]) === turnId && entry.stepIndex === stepIndex) {
          index = i;
          break;
        }
      }
      if (index < 0 || !_optionalChain([state, 'access', _88 => _88.stepStarts, 'access', _89 => _89[index], 'optionalAccess', _90 => _90.open])) {
        return state;
      }
      return {
        ...state,
        stepStarts: state.stepStarts.map(
          (entry, entryIndex) => entryIndex === index ? { ...entry, open: false } : entry
        )
      };
    });
  }
  async handle(event, ctx, hookMetadata) {
    if (!isEveHandleMessageStreamEvent(event)) {
      return;
    }
    const run = async () => {
      try {
        if (!await this.handleEvent(event, ctx, hookMetadata)) {
          return;
        }
        if (event.type === "session.failed") {
          const sessionId2 = event.data.sessionId || sessionIdFromContext(ctx);
          await this.flushInstrumentation();
          if (sessionId2) {
            this.cleanupSession(sessionId2);
          }
        } else if (event.type === "session.completed") {
          const sessionId2 = sessionIdFromContext(ctx);
          await this.flushInstrumentation();
          if (sessionId2) {
            this.cleanupSession(sessionId2);
          }
        }
      } catch (error) {
        _chunkQRHGVBKUjs.debugLogger.warn("Error in Eve hook instrumentation:", error);
      }
    };
    const sessionId = event.type === "session.failed" ? event.data.sessionId || sessionIdFromContext(ctx) : sessionIdFromContext(ctx);
    if (!sessionId) {
      await run();
      return;
    }
    const previous = this.eventQueuesBySession.get(sessionId);
    const queued = previous ? previous.then(run) : run();
    this.eventQueuesBySession.set(sessionId, queued);
    try {
      await queued;
    } finally {
      if (this.eventQueuesBySession.get(sessionId) === queued) {
        this.eventQueuesBySession.delete(sessionId);
      }
    }
  }
  async handleEvent(event, ctx, hookMetadata) {
    switch (event.type) {
      case "session.started":
        this.handleSessionStarted(event, ctx, hookMetadata);
        return true;
      case "turn.started":
        await this.handleTurnStarted(event, ctx, hookMetadata);
        return true;
      case "message.received":
        await this.handleMessageReceived(event, ctx, hookMetadata);
        return true;
      case "step.started":
        await this.handleStepStarted(event, ctx, hookMetadata);
        return true;
      case "reasoning.completed":
        this.handleReasoningCompleted(event, ctx);
        return true;
      case "message.completed":
        this.handleMessageCompleted(event, ctx);
        return true;
      case "result.completed":
        this.handleResultCompleted(event, ctx);
        return true;
      case "actions.requested":
        await this.handleActionsRequested(event, ctx, hookMetadata);
        return true;
      case "action.result":
        await this.handleActionResult(event, ctx, hookMetadata);
        return true;
      case "subagent.called":
        await this.handleSubagentCalled(event, ctx, hookMetadata);
        return true;
      case "subagent.completed":
        await this.handleSubagentCompleted(event, ctx, hookMetadata);
        return true;
      case "step.completed":
        this.handleStepCompleted(event, ctx);
        return true;
      case "step.failed":
        this.handleStepFailed(event, ctx);
        return true;
      case "turn.completed":
        this.handleTurnCompleted(event, ctx);
        return true;
      case "turn.failed":
        this.handleTurnFailed(event, ctx);
        return true;
      case "session.failed":
        this.handleSessionFailed(event, ctx);
        return true;
      case "session.completed":
        this.handleSessionCompleted(event, ctx);
        return true;
      default:
        return false;
    }
  }
  handleSessionStarted(event, ctx, hookMetadata) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const metadata = {
      ..._nullishCoalesce(hookMetadata, () => ( {})),
      ...modelMetadataFromRuntime(event.data.runtime)
    };
    this.state.update((current) => {
      const normalized = normalizeEveTraceState(current);
      return {
        ...normalized,
        metadata: { ...normalized.metadata, ...metadata }
      };
    });
    for (const [key, turn] of this.turnsByKey) {
      if (!key.startsWith(`${sessionId}:`)) {
        continue;
      }
      turn.metadata = { ...turn.metadata, ...metadata };
      turn.span.log({ metadata: turn.metadata });
      for (const step of turn.stepsByIndex.values()) {
        step.metadata = { ...step.metadata, ...metadata };
        step.span.log({ metadata: step.metadata });
      }
    }
  }
  async handleTurnStarted(event, ctx, hookMetadata) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const key = turnKey(sessionId, event.data.turnId);
    const metadata = {
      ...readEveTraceState(this.state).metadata,
      ..._nullishCoalesce(hookMetadata, () => ( {})),
      "eve.session_id": sessionId
    };
    const existing = this.turnsByKey.get(key);
    if (existing) {
      existing.metadata = { ...existing.metadata, ...metadata };
      existing.span.log({ metadata: existing.metadata });
      return;
    }
    const span = await this.startTurnSpan(sessionId, event, ctx, metadata);
    span.log({ metadata });
    this.turnsByKey.set(key, {
      key,
      metadata,
      metrics: {},
      sessionId,
      span,
      stepsByIndex: /* @__PURE__ */ new Map(),
      turnId: event.data.turnId
    });
  }
  async handleMessageReceived(event, ctx, hookMetadata) {
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    if (!turn) {
      return;
    }
    const input = [{ content: event.data.message, role: "user" }];
    turn.span.log({ input });
  }
  async handleStepStarted(event, ctx, hookMetadata) {
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    const sessionId = sessionIdFromContext(ctx);
    if (!turn || !sessionId) {
      return;
    }
    const existing = turn.stepsByIndex.get(event.data.stepIndex);
    if (existing) {
      existing.span.log({
        ...existing.input !== void 0 ? { input: existing.input } : {},
        metadata: existing.metadata,
        metrics: existing.metrics,
        output: existing.output
      });
      const endTime = eventTime(event);
      existing.span.end(endTime === void 0 ? void 0 : { endTime });
      this.markStepEnded(event.data.turnId, event.data.stepIndex);
      clearStoredEveReasoning(
        this.state,
        sessionId,
        event.data.turnId,
        event.data.stepIndex
      );
    }
    const stepOrdinal = this.stepOrdinal(event);
    const metadata = { ...turn.metadata };
    const input = consumeCapturedEveModelInput(
      this.state,
      sessionId,
      event.data.turnId,
      event.data.stepIndex
    );
    const reasoning = readStoredEveReasoning(
      this.state,
      sessionId,
      event.data.turnId,
      event.data.stepIndex
    );
    const output = mergeEveReasoning(void 0, reasoning);
    const { rowId: eventId, spanId } = await generateEveIds(
      "step",
      sessionId,
      event.data.turnId,
      String(stepOrdinal)
    );
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        ...input !== void 0 ? { input } : {},
        metadata
      },
      name: "eve.step",
      spanAttributes: { type: "llm" /* LLM */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({
      ...input !== void 0 ? { input } : {},
      metadata
    });
    turn.stepsByIndex.set(event.data.stepIndex, {
      ...input !== void 0 ? { input } : {},
      metadata,
      metrics: {},
      ...output !== void 0 ? { output } : {},
      reasoning,
      span
    });
  }
  handleReasoningCompleted(event, ctx) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const reasoning = storeEveReasoning(this.state, sessionId, event);
    const step = this.stepForEvent(event, ctx);
    if (step) {
      step.reasoning = reasoning;
      step.output = mergeEveReasoning(step.output, reasoning);
    }
  }
  handleMessageCompleted(event, ctx) {
    const step = this.stepForEvent(event, ctx);
    if (!step) {
      return;
    }
    const existingMessage = eveOutputMessage(step.output);
    const existingToolCalls = _chunkQRHGVBKUjs.isObject.call(void 0, existingMessage) ? existingMessage.tool_calls : void 0;
    step.output = mergeEveReasoning(
      [
        {
          finish_reason: normalizedFinishReason(event.data.finishReason),
          index: 0,
          message: {
            content: event.data.message,
            role: "assistant",
            ...Array.isArray(existingToolCalls) ? { tool_calls: existingToolCalls } : {}
          }
        }
      ],
      step.reasoning
    );
    const turn = this.turnForEvent(event, ctx);
    if (turn && event.data.finishReason !== "tool-calls") {
      turn.output = event.data.message;
    }
  }
  handleResultCompleted(event, ctx) {
    const step = this.stepForEvent(event, ctx);
    if (step) {
      step.output = mergeEveReasoning(
        [
          {
            finish_reason: "stop",
            index: 0,
            message: {
              content: event.data.result,
              role: "assistant"
            }
          }
        ],
        step.reasoning
      );
    }
    const turn = this.turnForEvent(event, ctx);
    if (turn) {
      turn.output = event.data.result;
    }
  }
  async handleActionsRequested(event, ctx, hookMetadata) {
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    const sessionId = sessionIdFromContext(ctx);
    if (!turn || !sessionId) {
      return;
    }
    const traceActions = event.data.actions.filter(isTraceableActionRequest);
    if (traceActions.length === 0) {
      return;
    }
    for (const action of traceActions) {
      if (isToolCallAction(action)) {
        await this.startRequestedTool(event, turn, sessionId, action);
      } else if (isLocalSubagentCallAction(action)) {
        await this.startRequestedSubagent(event, turn, sessionId, action);
      }
    }
    const step = turn.stepsByIndex.get(event.data.stepIndex);
    if (!step) {
      return;
    }
    const toolCallsById = /* @__PURE__ */ new Map();
    if (Array.isArray(step.output) && _chunkQRHGVBKUjs.isObject.call(void 0, step.output[0])) {
      const message = step.output[0]["message"];
      if (_chunkQRHGVBKUjs.isObject.call(void 0, message) && Array.isArray(message["tool_calls"])) {
        for (const toolCall of message["tool_calls"]) {
          if (_chunkQRHGVBKUjs.isObject.call(void 0, toolCall) && typeof toolCall["id"] === "string") {
            toolCallsById.set(toolCall["id"], toolCall);
          }
        }
      }
    }
    for (const action of traceActions) {
      const name = action.kind === "tool-call" ? action.toolName : _nullishCoalesce(_nullishCoalesce(action.subagentName, () => ( action.name)), () => ( "agent"));
      toolCallsById.set(action.callId, {
        function: {
          arguments: JSON.stringify(action.input),
          name
        },
        id: action.callId,
        type: "function"
      });
    }
    step.output = mergeEveReasoning(
      [
        {
          finish_reason: "tool_calls",
          index: 0,
          message: {
            content: null,
            role: "assistant",
            tool_calls: [...toolCallsById.values()]
          }
        }
      ],
      step.reasoning
    );
  }
  async handleActionResult(event, ctx, hookMetadata) {
    if (isToolResult(event.data.result)) {
      await this.handleToolResult(event, ctx, event.data.result, hookMetadata);
      return;
    }
    if (isSubagentResult(event.data.result)) {
      await this.handleSubagentResult(
        event,
        ctx,
        event.data.result,
        hookMetadata
      );
    }
  }
  async handleToolResult(event, ctx, result, hookMetadata) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const key = toolKey(sessionId, result.callId);
    if (this.completedToolKeys.has(key)) {
      return;
    }
    const tool = await _asyncNullishCoalesce(this.toolsByCallKey.get(key), async () => ( await this.startSyntheticTool(event, ctx, result, hookMetadata)));
    if (!tool) {
      return;
    }
    const failed = event.data.status === "failed" || result.isError === true || event.data.error !== void 0;
    tool.span.log({
      ...failed ? {
        error: actionResultError(event.data.error, result.output)
      } : {},
      metadata: tool.metadata,
      output: result.output
    });
    const endTime = eventTime(event);
    tool.span.end(endTime === void 0 ? void 0 : { endTime });
    this.toolsByCallKey.delete(key);
    this.completedToolKeys.set(key, true);
  }
  async handleSubagentCalled(event, ctx, hookMetadata) {
    if (_optionalChain([event, 'access', _91 => _91.data, 'access', _92 => _92.remote, 'optionalAccess', _93 => _93.url])) {
      return;
    }
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    const sessionId = sessionIdFromContext(ctx);
    if (!turn || !sessionId) {
      return;
    }
    const key = toolKey(sessionId, event.data.callId);
    const metadata = toolMetadataFromTurn(turn);
    const existing = this.toolsByCallKey.get(key);
    if (existing) {
      existing.metadata = { ...existing.metadata, ...metadata };
      existing.span.log({ metadata: existing.metadata });
      return;
    }
    if (this.completedToolKeys.has(key)) {
      return;
    }
    const { rowId: eventId, spanId } = await generateEveIds(
      "subagent",
      sessionId,
      event.data.callId
    );
    const pending = this.toolsByCallKey.get(key);
    if (pending || this.completedToolKeys.has(key)) {
      if (pending) {
        pending.metadata = { ...pending.metadata, ...metadata };
        pending.span.log({ metadata: pending.metadata });
      }
      return;
    }
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        metadata
      },
      name: _nullishCoalesce(event.data.toolName, () => ( event.data.name)),
      spanAttributes: { type: "tool" /* TOOL */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({ metadata });
    this.toolsByCallKey.set(key, {
      metadata,
      span,
      turnKey: turnKey(sessionId, event.data.turnId)
    });
  }
  async handleSubagentCompleted(event, ctx, hookMetadata) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const key = toolKey(sessionId, event.data.callId);
    if (this.completedToolKeys.has(key)) {
      return;
    }
    const subagent = await _asyncNullishCoalesce(this.toolsByCallKey.get(key), async () => ( await this.startSyntheticSubagent(event, ctx, hookMetadata)));
    if (!subagent) {
      return;
    }
    subagent.span.log({
      ...event.data.status === "failed" ? {
        error: actionResultError(event.data.error, event.data.output)
      } : {},
      metadata: subagent.metadata,
      ...event.data.output !== void 0 ? { output: event.data.output } : {}
    });
    const endTime = eventTime(event);
    const recordedEndTime = subagent.span.end(
      endTime === void 0 ? void 0 : { endTime }
    );
    this.state.update((current) => {
      const normalized = normalizeEveTraceState(current);
      return {
        ...normalized,
        spanReferences: normalized.spanReferences.map(
          (reference) => reference.spanId === subagent.span.spanId ? { ...reference, endTime: recordedEndTime } : reference
        )
      };
    });
  }
  async handleSubagentResult(event, ctx, result, hookMetadata) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const key = toolKey(sessionId, result.callId);
    if (this.completedToolKeys.has(key)) {
      return;
    }
    const subagent = await _asyncNullishCoalesce(this.toolsByCallKey.get(key), async () => ( await this.startSyntheticSubagentResult(
      event,
      ctx,
      result,
      hookMetadata
    )));
    if (!subagent) {
      return;
    }
    const isError = event.data.status === "failed" || result.isError === true || event.data.error !== void 0;
    subagent.span.log({
      ...isError ? {
        error: actionResultError(event.data.error, result.output)
      } : {},
      metadata: subagent.metadata,
      output: result.output
    });
    const endTime = eventTime(event);
    subagent.span.end(endTime === void 0 ? void 0 : { endTime });
    this.toolsByCallKey.delete(key);
    this.completedToolKeys.set(key, true);
  }
  handleStepCompleted(event, ctx) {
    const step = this.stepForEvent(event, ctx);
    if (!step) {
      return;
    }
    const usage = event.data.usage;
    const inputTokens = typeof _optionalChain([usage, 'optionalAccess', _94 => _94.inputTokens]) === "number" && Number.isFinite(usage.inputTokens) && usage.inputTokens >= 0 ? usage.inputTokens : void 0;
    const outputTokens = typeof _optionalChain([usage, 'optionalAccess', _95 => _95.outputTokens]) === "number" && Number.isFinite(usage.outputTokens) && usage.outputTokens >= 0 ? usage.outputTokens : void 0;
    const cacheReadTokens = typeof _optionalChain([usage, 'optionalAccess', _96 => _96.cacheReadTokens]) === "number" && Number.isFinite(usage.cacheReadTokens) && usage.cacheReadTokens >= 0 ? usage.cacheReadTokens : void 0;
    const cacheWriteTokens = typeof _optionalChain([usage, 'optionalAccess', _97 => _97.cacheWriteTokens]) === "number" && Number.isFinite(usage.cacheWriteTokens) && usage.cacheWriteTokens >= 0 ? usage.cacheWriteTokens : void 0;
    const costUsd = typeof _optionalChain([usage, 'optionalAccess', _98 => _98.costUsd]) === "number" && Number.isFinite(usage.costUsd) && usage.costUsd >= 0 ? usage.costUsd : void 0;
    const total = inputTokens !== void 0 && outputTokens !== void 0 ? inputTokens + outputTokens : void 0;
    const metrics = {
      ...inputTokens !== void 0 ? { prompt_tokens: inputTokens } : {},
      ...outputTokens !== void 0 ? { completion_tokens: outputTokens } : {},
      ...total !== void 0 ? { tokens: total } : {},
      ...cacheReadTokens !== void 0 ? { prompt_cached_tokens: cacheReadTokens } : {},
      ...cacheWriteTokens !== void 0 ? { prompt_cache_creation_tokens: cacheWriteTokens } : {},
      ...costUsd !== void 0 ? { estimated_cost: costUsd } : {}
    };
    step.metrics = { ...step.metrics, ...metrics };
    const sessionId = sessionIdFromContext(ctx);
    if (Array.isArray(step.output) && _chunkQRHGVBKUjs.isObject.call(void 0, step.output[0])) {
      const finishReason = step.output[0].finish_reason;
      if (typeof finishReason !== "string") {
        step.output[0].finish_reason = normalizedFinishReason(
          event.data.finishReason
        );
      }
    }
    step.span.log({
      ...step.input !== void 0 ? { input: step.input } : {},
      metadata: step.metadata,
      metrics,
      output: step.output
    });
    const endTime = eventTime(event);
    step.span.end(endTime === void 0 ? void 0 : { endTime });
    const turn = this.turnForEvent(event, ctx);
    if (turn) {
      for (const [key, value] of Object.entries(metrics)) {
        turn.metrics[key] = (_nullishCoalesce(turn.metrics[key], () => ( 0))) + value;
      }
      turn.stepsByIndex.delete(event.data.stepIndex);
    }
    this.markStepEnded(event.data.turnId, event.data.stepIndex);
    if (sessionId) {
      clearStoredEveReasoning(
        this.state,
        sessionId,
        event.data.turnId,
        event.data.stepIndex
      );
    }
  }
  handleStepFailed(event, ctx) {
    const step = this.stepForEvent(event, ctx);
    if (step) {
      step.span.log({
        error: errorFromMessage(
          event.data.message,
          event.data.code,
          event.data.details
        )
      });
      const endTime = eventTime(event);
      step.span.end(endTime === void 0 ? void 0 : { endTime });
    }
    const turn = this.turnForEvent(event, ctx);
    _optionalChain([turn, 'optionalAccess', _99 => _99.stepsByIndex, 'access', _100 => _100.delete, 'call', _101 => _101(event.data.stepIndex)]);
    this.markStepEnded(event.data.turnId, event.data.stepIndex);
    const sessionId = sessionIdFromContext(ctx);
    if (sessionId) {
      clearStoredEveReasoning(
        this.state,
        sessionId,
        event.data.turnId,
        event.data.stepIndex
      );
    }
  }
  handleTurnCompleted(event, ctx) {
    const turn = this.turnForEvent(event, ctx);
    if (!turn) {
      return;
    }
    this.finalizeTurn(turn, {
      endTime: eventTime(event)
    });
  }
  handleTurnFailed(event, ctx) {
    const turn = this.turnForEvent(event, ctx);
    if (!turn) {
      return;
    }
    this.finalizeTurn(turn, {
      endTime: eventTime(event),
      error: errorFromMessage(
        event.data.message,
        event.data.code,
        event.data.details
      )
    });
  }
  handleSessionFailed(event, ctx) {
    const sessionId = event.data.sessionId || sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    const error = errorFromMessage(
      event.data.message,
      event.data.code,
      event.data.details
    );
    for (const [key, turn] of this.turnsByKey) {
      if (!key.startsWith(`${sessionId}:`)) {
        continue;
      }
      this.finalizeTurn(turn, {
        endTime: eventTime(event),
        error
      });
    }
    for (const [key, tool] of this.toolsByCallKey) {
      if (key.startsWith(`${sessionId}:`)) {
        const endTime = eventTime(event);
        if (!tool.endedByTurn) {
          tool.span.log({ metadata: tool.metadata });
          tool.span.end(endTime === void 0 ? void 0 : { endTime });
          tool.endedByTurn = true;
        }
      }
    }
  }
  handleSessionCompleted(event, ctx) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return;
    }
    for (const [key, turn] of this.turnsByKey) {
      if (!key.startsWith(`${sessionId}:`)) {
        continue;
      }
      this.finalizeTurn(turn, {
        endTime: eventTime(event)
      });
    }
    for (const [key, tool] of this.toolsByCallKey) {
      if (key.startsWith(`${sessionId}:`) && !tool.endedByTurn) {
        const endTime = eventTime(event);
        tool.span.log({ metadata: tool.metadata });
        tool.span.end(endTime === void 0 ? void 0 : { endTime });
        tool.endedByTurn = true;
      }
    }
  }
  async ensureTurn(event, ctx, hookMetadata) {
    const sessionId = sessionIdFromContext(ctx);
    if (!sessionId) {
      return void 0;
    }
    const key = turnKey(sessionId, event.data.turnId);
    const existing = this.turnsByKey.get(key);
    if (existing) {
      return existing;
    }
    const metadata = {
      ...readEveTraceState(this.state).metadata,
      ..._nullishCoalesce(hookMetadata, () => ( {})),
      "eve.session_id": sessionId
    };
    const span = await this.startTurnSpan(sessionId, event, ctx, metadata);
    span.log({ metadata });
    const state = {
      key,
      metadata,
      metrics: {},
      sessionId,
      span,
      stepsByIndex: /* @__PURE__ */ new Map(),
      turnId: event.data.turnId
    };
    this.turnsByKey.set(key, state);
    return state;
  }
  async startRequestedTool(event, turn, sessionId, action) {
    const key = toolKey(sessionId, action.callId);
    if (this.toolsByCallKey.has(key) || this.completedToolKeys.has(key)) {
      return;
    }
    const metadata = toolMetadataFromTurn(turn);
    const { rowId: eventId, spanId } = await generateEveIds(
      "tool",
      sessionId,
      event.data.turnId,
      action.callId
    );
    if (this.toolsByCallKey.has(key) || this.completedToolKeys.has(key)) {
      return;
    }
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        input: action.input,
        metadata
      },
      name: action.toolName,
      spanAttributes: { type: "tool" /* TOOL */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({ input: action.input, metadata });
    this.toolsByCallKey.set(key, {
      metadata,
      span,
      turnKey: turnKey(sessionId, event.data.turnId)
    });
  }
  async startRequestedSubagent(event, turn, sessionId, action) {
    const key = toolKey(sessionId, action.callId);
    if (this.toolsByCallKey.has(key) || this.completedToolKeys.has(key)) {
      return;
    }
    const name = _nullishCoalesce(_nullishCoalesce(action.subagentName, () => ( action.name)), () => ( "agent"));
    const metadata = toolMetadataFromTurn(turn);
    const { rowId: eventId, spanId } = await generateEveIds(
      "subagent",
      sessionId,
      action.callId
    );
    if (this.toolsByCallKey.has(key) || this.completedToolKeys.has(key)) {
      return;
    }
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        input: action.input,
        metadata
      },
      name,
      spanAttributes: { type: "tool" /* TOOL */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({ input: action.input, metadata });
    this.toolsByCallKey.set(key, {
      metadata,
      span,
      turnKey: turnKey(sessionId, event.data.turnId)
    });
  }
  async startSyntheticTool(event, ctx, result, hookMetadata) {
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    const sessionId = sessionIdFromContext(ctx);
    if (!turn || !sessionId) {
      return void 0;
    }
    const metadata = toolMetadataFromTurn(turn);
    const { rowId: eventId, spanId } = await generateEveIds(
      "tool",
      sessionId,
      event.data.turnId,
      result.callId
    );
    const existing = this.toolsByCallKey.get(toolKey(sessionId, result.callId));
    if (existing) {
      return existing;
    }
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        metadata
      },
      name: result.toolName,
      spanAttributes: { type: "tool" /* TOOL */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({ metadata });
    const state = {
      metadata,
      span,
      turnKey: turnKey(sessionId, event.data.turnId)
    };
    this.toolsByCallKey.set(toolKey(sessionId, result.callId), state);
    return state;
  }
  async startSyntheticSubagent(event, ctx, hookMetadata) {
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    const sessionId = sessionIdFromContext(ctx);
    if (!turn || !sessionId) {
      return void 0;
    }
    const metadata = toolMetadataFromTurn(turn);
    const { rowId: eventId, spanId } = await generateEveIds(
      "subagent",
      sessionId,
      event.data.callId
    );
    const existing = this.toolsByCallKey.get(
      toolKey(sessionId, event.data.callId)
    );
    if (existing) {
      return existing;
    }
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        metadata
      },
      name: event.data.subagentName,
      spanAttributes: { type: "tool" /* TOOL */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({ metadata });
    const state = {
      metadata,
      span,
      turnKey: turnKey(sessionId, event.data.turnId)
    };
    this.toolsByCallKey.set(toolKey(sessionId, event.data.callId), state);
    return state;
  }
  async startSyntheticSubagentResult(event, ctx, result, hookMetadata) {
    const turn = await this.ensureTurn(event, ctx, hookMetadata);
    const sessionId = sessionIdFromContext(ctx);
    if (!turn || !sessionId) {
      return void 0;
    }
    const metadata = toolMetadataFromTurn(turn);
    const { rowId: eventId, spanId } = await generateEveIds(
      "subagent",
      sessionId,
      result.callId
    );
    const existing = this.toolsByCallKey.get(toolKey(sessionId, result.callId));
    if (existing) {
      return existing;
    }
    const span = await this.startEveChildSpan(turn.span, {
      event: {
        id: eventId,
        metadata
      },
      name: result.subagentName,
      spanAttributes: { type: "tool" /* TOOL */ },
      spanId,
      startTime: eventTime(event)
    });
    span.log({ metadata });
    const state = {
      metadata,
      span,
      turnKey: turnKey(sessionId, event.data.turnId)
    };
    this.toolsByCallKey.set(toolKey(sessionId, result.callId), state);
    return state;
  }
  async startTurnSpan(sessionId, event, ctx, metadata) {
    const session = _chunkQRHGVBKUjs.isObject.call(void 0, ctx) ? ctx["session"] : void 0;
    const parent = _chunkQRHGVBKUjs.isObject.call(void 0, session) ? session["parent"] : void 0;
    const parentTurn = _chunkQRHGVBKUjs.isObject.call(void 0, parent) ? parent["turn"] : void 0;
    const parentLineage = _chunkQRHGVBKUjs.isObject.call(void 0, parent) && typeof parent["callId"] === "string" && typeof parent["sessionId"] === "string" && _chunkQRHGVBKUjs.isObject.call(void 0, parentTurn) && typeof parentTurn["id"] === "string" ? {
      callId: parent["callId"],
      sessionId: parent["sessionId"],
      turnId: parentTurn["id"]
    } : void 0;
    const [{ rowId: eventId, spanId }, rootSpanId, parentSpanId] = await Promise.all([
      generateEveIds("turn", sessionId, event.data.turnId),
      deterministicEveId(
        "eve:root",
        _nullishCoalesce(_optionalChain([parentLineage, 'optionalAccess', _102 => _102.sessionId]), () => ( sessionId)),
        _nullishCoalesce(_optionalChain([parentLineage, 'optionalAccess', _103 => _103.turnId]), () => ( event.data.turnId))
      ),
      parentLineage ? deterministicEveId(
        "eve:subagent",
        parentLineage.sessionId,
        parentLineage.callId
      ) : Promise.resolve(void 0)
    ]);
    return await this.startEveSpan({
      event: {
        id: eventId,
        metadata
      },
      name: "eve.turn",
      parentSpanIds: parentSpanId ? { rootSpanId, spanId: parentSpanId } : { parentSpanIds: [], rootSpanId },
      spanAttributes: { type: "task" /* TASK */ },
      spanId,
      startTime: eventTime(event)
    });
  }
  turnForEvent(event, ctx) {
    const sessionId = sessionIdFromContext(ctx);
    return sessionId ? this.turnsByKey.get(turnKey(sessionId, event.data.turnId)) : void 0;
  }
  stepForEvent(event, ctx) {
    return _optionalChain([this, 'access', _104 => _104.turnForEvent, 'call', _105 => _105(event, ctx), 'optionalAccess', _106 => _106.stepsByIndex, 'access', _107 => _107.get, 'call', _108 => _108(
      event.data.stepIndex
    )]);
  }
  finalizeTurn(turn, args) {
    const { endTime } = args;
    for (const step of turn.stepsByIndex.values()) {
      step.span.log({
        ...step.input !== void 0 ? { input: step.input } : {},
        metadata: step.metadata,
        metrics: step.metrics,
        output: step.output
      });
      step.span.end(endTime === void 0 ? void 0 : { endTime });
    }
    turn.stepsByIndex.clear();
    for (const tool of this.toolsByCallKey.values()) {
      if (tool.turnKey !== turn.key) {
        continue;
      }
      if (tool.endedByTurn) {
        continue;
      }
      tool.span.log({ metadata: tool.metadata });
      tool.span.end(endTime === void 0 ? void 0 : { endTime });
      tool.endedByTurn = true;
    }
    if (args.error) {
      turn.span.log({ error: args.error });
    } else {
      turn.span.log({
        metadata: turn.metadata,
        metrics: turn.metrics,
        output: turn.output
      });
    }
    turn.span.end(endTime === void 0 ? void 0 : { endTime });
    this.turnsByKey.delete(turn.key);
    this.state.update((current) => {
      const normalized = normalizeEveTraceState(current);
      return {
        ...normalized,
        reasoningBlocks: normalized.reasoningBlocks.filter(
          (entry) => !entry.key.startsWith(`${turn.sessionId}\0${turn.turnId}\0`)
        ),
        stepStarts: normalized.stepStarts.filter(
          (entry) => entry.turnId !== turn.turnId
        )
      };
    });
  }
  cleanupSession(sessionId) {
    const keyPrefix = `${sessionId}:`;
    for (const key of this.turnsByKey.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.turnsByKey.delete(key);
      }
    }
    for (const key of this.toolsByCallKey.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.toolsByCallKey.delete(key);
      }
    }
    for (const key of this.completedToolKeys.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.completedToolKeys.delete(key);
      }
    }
    this.state.update(() => emptyEveTraceState());
  }
  async flushInstrumentation() {
    try {
      await _chunkQRHGVBKUjs.flush.call(void 0, );
      return true;
    } catch (error) {
      _chunkQRHGVBKUjs.debugLogger.warn("Error in Eve flush instrumentation:", error);
      return false;
    }
  }
}, _class);
function emptyEveTraceState() {
  return {
    llmInputs: [],
    metadata: {},
    reasoningBlocks: [],
    spanReferences: [],
    stepStarts: []
  };
}
function normalizeEveTraceState(state) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, state)) {
    return emptyEveTraceState();
  }
  const metadata = _chunkQRHGVBKUjs.isObject.call(void 0, state["metadata"]) ? state["metadata"] : {};
  const spanReferences = Array.isArray(state["spanReferences"]) ? state["spanReferences"].flatMap((entry) => {
    if (!_chunkQRHGVBKUjs.isObject.call(void 0, entry)) {
      return [];
    }
    const exported = entry["exported"];
    const endTime = entry["endTime"];
    const rootSpanId = entry["rootSpanId"];
    const rowId = entry["rowId"];
    const spanId = entry["spanId"];
    const startEvent = entry["startEvent"];
    const startEventCreated = _chunkQRHGVBKUjs.isObject.call(void 0, startEvent) ? startEvent["created"] : void 0;
    const startEventMetrics = _chunkQRHGVBKUjs.isObject.call(void 0, startEvent) ? startEvent["metrics"] : void 0;
    const startEventSpanAttributes = _chunkQRHGVBKUjs.isObject.call(void 0, startEvent) ? startEvent["span_attributes"] : void 0;
    const startEventSpanParents = _chunkQRHGVBKUjs.isObject.call(void 0, startEvent) ? startEvent["span_parents"] : void 0;
    const normalizedStartEvent = typeof startEventCreated === "string" && _chunkQRHGVBKUjs.isObject.call(void 0, startEventMetrics) && typeof startEventMetrics["start"] === "number" && Number.isFinite(startEventMetrics["start"]) && _chunkQRHGVBKUjs.isObject.call(void 0, startEventSpanAttributes) && Array.isArray(startEventSpanParents) && startEventSpanParents.every(
      (parent) => typeof parent === "string"
    ) ? {
      created: startEventCreated,
      metrics: { start: startEventMetrics["start"] },
      span_attributes: { ...startEventSpanAttributes },
      span_parents: [...startEventSpanParents]
    } : void 0;
    return typeof exported === "string" && typeof rootSpanId === "string" && typeof rowId === "string" && typeof spanId === "string" ? [
      {
        ...typeof endTime === "number" && Number.isFinite(endTime) ? { endTime } : {},
        exported,
        rootSpanId,
        rowId,
        spanId,
        ...normalizedStartEvent ? { startEvent: normalizedStartEvent } : {}
      }
    ] : [];
  }).slice(-MAX_STORED_SPAN_REFERENCES) : [];
  const llmInputs = Array.isArray(state["llmInputs"]) ? state["llmInputs"].flatMap((entry) => {
    if (!_chunkQRHGVBKUjs.isObject.call(void 0, entry)) {
      return [];
    }
    const key = entry["key"];
    const input = entry["input"];
    return typeof key === "string" && isCapturedModelInput(input) ? [{ input, key }] : [];
  }).slice(-MAX_STORED_LLM_INPUTS) : [];
  const reasoningBlocks = Array.isArray(state["reasoningBlocks"]) ? state["reasoningBlocks"].flatMap((entry) => {
    if (!_chunkQRHGVBKUjs.isObject.call(void 0, entry)) {
      return [];
    }
    const content = entry["content"];
    const eventAt = entry["eventAt"];
    const key = entry["key"];
    return typeof content === "string" && (eventAt === void 0 || typeof eventAt === "string") && typeof key === "string" ? [
      {
        content,
        ...typeof eventAt === "string" ? { eventAt } : {},
        key
      }
    ] : [];
  }).slice(-MAX_STORED_REASONING_BLOCKS) : [];
  const stepStarts = Array.isArray(state["stepStarts"]) ? state["stepStarts"].flatMap((entry) => {
    if (!_chunkQRHGVBKUjs.isObject.call(void 0, entry)) {
      return [];
    }
    const ordinal = entry["ordinal"];
    const open = entry["open"];
    const stepIndex = entry["stepIndex"];
    const turnId = entry["turnId"];
    return typeof ordinal === "number" && Number.isInteger(ordinal) && ordinal >= 0 && typeof open === "boolean" && typeof stepIndex === "number" && Number.isInteger(stepIndex) && typeof turnId === "string" ? [{ open, ordinal, stepIndex, turnId }] : [];
  }).slice(-MAX_STORED_STEP_STARTS) : [];
  return {
    llmInputs,
    metadata: { ...metadata },
    reasoningBlocks,
    spanReferences,
    stepStarts
  };
}
function readEveTraceState(state) {
  try {
    return normalizeEveTraceState(state.get());
  } catch (e4) {
    return emptyEveTraceState();
  }
}
function storeEveReasoning(state, sessionId, event) {
  const eventAt = _optionalChain([event, 'access', _109 => _109.meta, 'optionalAccess', _110 => _110.at]);
  const key = llmInputKey(sessionId, event.data.turnId, event.data.stepIndex);
  let stored = [];
  state.update((current) => {
    const normalized = normalizeEveTraceState(current);
    const alreadyStored = normalized.reasoningBlocks.some(
      (entry) => entry.content === event.data.reasoning && entry.eventAt === eventAt && entry.key === key
    );
    const reasoningBlocks = alreadyStored ? normalized.reasoningBlocks : [
      ...normalized.reasoningBlocks,
      {
        content: event.data.reasoning,
        ...eventAt ? { eventAt } : {},
        key
      }
    ].slice(-MAX_STORED_REASONING_BLOCKS);
    stored = reasoningBlocks.flatMap(
      (entry) => entry.key === key ? [
        {
          content: entry.content,
          ...entry.eventAt ? { eventAt: entry.eventAt } : {}
        }
      ] : []
    );
    return alreadyStored ? normalized : { ...normalized, reasoningBlocks };
  });
  return stored;
}
function readStoredEveReasoning(state, sessionId, turnId, stepIndex) {
  const key = llmInputKey(sessionId, turnId, stepIndex);
  return readEveTraceState(state).reasoningBlocks.flatMap(
    (entry) => entry.key === key ? [
      {
        content: entry.content,
        ...entry.eventAt ? { eventAt: entry.eventAt } : {}
      }
    ] : []
  );
}
function clearStoredEveReasoning(state, sessionId, turnId, stepIndex) {
  const key = llmInputKey(sessionId, turnId, stepIndex);
  state.update((current) => {
    const normalized = normalizeEveTraceState(current);
    return {
      ...normalized,
      reasoningBlocks: normalized.reasoningBlocks.filter(
        (entry) => entry.key !== key
      )
    };
  });
}
function eveOutputMessage(output) {
  return Array.isArray(output) && _chunkQRHGVBKUjs.isObject.call(void 0, output[0]) ? output[0]["message"] : void 0;
}
function mergeEveReasoning(output, reasoning) {
  if (reasoning.length === 0) {
    return output;
  }
  const choice = Array.isArray(output) && _chunkQRHGVBKUjs.isObject.call(void 0, output[0]) ? output[0] : {};
  const message = _chunkQRHGVBKUjs.isObject.call(void 0, choice["message"]) ? choice["message"] : {};
  return [
    {
      ...choice,
      index: typeof choice["index"] === "number" ? choice["index"] : 0,
      message: {
        ...message,
        content: "content" in message ? message["content"] : null,
        reasoning: reasoning.map((block) => ({ content: block.content })),
        role: typeof message["role"] === "string" ? message["role"] : "assistant"
      }
    }
  ];
}
function captureEveModelInput(state, input) {
  const sessionId = input.session.id;
  const turnId = input.turn.id;
  const stepIndex = input.step.index;
  const captured = capturedModelInput(input.modelInput);
  if (!captured) {
    return;
  }
  const key = llmInputKey(sessionId, turnId, stepIndex);
  state.update((current) => {
    const normalized = normalizeEveTraceState(current);
    const llmInputs = [...normalized.llmInputs, { input: captured, key }];
    return {
      ...normalized,
      llmInputs: llmInputs.slice(-MAX_STORED_LLM_INPUTS)
    };
  });
}
function consumeCapturedEveModelInput(state, sessionId, turnId, stepIndex) {
  try {
    const key = llmInputKey(sessionId, turnId, stepIndex);
    let input;
    state.update((current) => {
      const normalized = normalizeEveTraceState(current);
      const index = normalized.llmInputs.findIndex(
        (candidate) => candidate.key === key
      );
      if (index < 0) {
        return normalized;
      }
      input = _optionalChain([normalized, 'access', _111 => _111.llmInputs, 'access', _112 => _112[index], 'optionalAccess', _113 => _113.input]);
      return {
        ...normalized,
        llmInputs: normalized.llmInputs.filter(
          (_, candidateIndex) => candidateIndex !== index
        )
      };
    });
    return input;
  } catch (error) {
    _chunkQRHGVBKUjs.debugLogger.warn("Error in Eve LLM input consumption:", error);
    return void 0;
  }
}
function capturedModelInput(modelInput) {
  const { instructions, messages } = modelInput;
  const value = [];
  if (typeof instructions === "string") {
    value.push({ content: instructions, role: "system" });
  } else if (instructions) {
    value.push(...instructions.map(capturedEveModelMessage));
  }
  value.push(...messages.map(capturedEveModelMessage));
  try {
    const cloned = JSON.parse(JSON.stringify(value));
    if (!Array.isArray(cloned)) {
      return void 0;
    }
    return cloned;
  } catch (e5) {
    return void 0;
  }
}
function capturedEveModelMessage(message) {
  const { content, role } = message;
  if (typeof content === "string") {
    return { content, role };
  }
  return { content: content.map(capturedEveModelContentPart), role };
}
function capturedEveModelContentPart(part) {
  switch (part.type) {
    case "text":
    case "reasoning":
      return { text: part.text, type: part.type };
    case "image":
      return {
        image: part.image,
        ...part.mediaType !== void 0 ? { mediaType: part.mediaType } : {},
        type: "image"
      };
    case "file":
    case "reasoning-file":
      return {
        data: part.data,
        ...part.type === "file" && part.filename !== void 0 ? { filename: part.filename } : {},
        mediaType: part.mediaType,
        type: part.type
      };
    case "custom":
      return {
        ..."kind" in part ? { kind: part.kind } : {},
        type: "custom"
      };
    case "tool-call":
      return {
        input: part.input,
        ...part.providerExecuted !== void 0 ? { providerExecuted: part.providerExecuted } : {},
        toolCallId: part.toolCallId,
        toolName: part.toolName,
        type: "tool-call"
      };
    case "tool-result": {
      const output = part.output;
      let capturedOutput;
      switch (output.type) {
        case "text":
        case "error-text":
          capturedOutput = { type: output.type, value: output.value };
          break;
        case "json":
        case "error-json":
          capturedOutput = { type: output.type, value: output.value };
          break;
        case "execution-denied":
          capturedOutput = {
            ...output.reason !== void 0 ? { reason: output.reason } : {},
            type: "execution-denied"
          };
          break;
        case "content":
          capturedOutput = {
            type: "content",
            value: output.value.map(capturedEveModelContentPart)
          };
          break;
      }
      return {
        output: capturedOutput,
        toolCallId: part.toolCallId,
        toolName: part.toolName,
        type: "tool-result"
      };
    }
    case "tool-approval-request":
      return {
        approvalId: part.approvalId,
        ...part.isAutomatic !== void 0 ? { isAutomatic: part.isAutomatic } : {},
        ...part.signature !== void 0 ? { signature: part.signature } : {},
        toolCallId: part.toolCallId,
        type: "tool-approval-request"
      };
    case "tool-approval-response":
      return {
        approvalId: part.approvalId,
        approved: part.approved,
        ...part.providerExecuted !== void 0 ? { providerExecuted: part.providerExecuted } : {},
        ...part.reason !== void 0 ? { reason: part.reason } : {},
        type: "tool-approval-response"
      };
    case "file-data":
    case "image-data":
      return {
        data: part.data,
        ...part.type === "file-data" && part.filename !== void 0 ? { filename: part.filename } : {},
        mediaType: part.mediaType,
        type: part.type
      };
    case "file-url":
    case "image-url":
      return {
        ...part.type === "file-url" && part.mediaType !== void 0 ? { mediaType: part.mediaType } : {},
        type: part.type,
        url: part.url
      };
    case "file-id":
    case "image-file-id":
      return { fileId: part.fileId, type: part.type };
    case "file-reference":
    case "image-file-reference":
      return {
        providerReference: part.providerReference,
        type: part.type
      };
  }
}
function isCapturedModelInput(input) {
  return Array.isArray(input) && input.every(
    (message) => _chunkQRHGVBKUjs.isObject.call(void 0, message) && (message["role"] === "system" || message["role"] === "user" || message["role"] === "assistant" || message["role"] === "tool") && (typeof message["content"] === "string" || Array.isArray(message["content"]) && message["content"].every(_chunkQRHGVBKUjs.isObject))
  );
}
function llmInputKey(sessionId, turnId, stepIndex) {
  return `${sessionId}\0${turnId}\0${stepIndex}`;
}
function modelMetadataFromRuntime(runtime) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, runtime)) {
    return {};
  }
  const modelId = runtime["modelId"];
  return typeof modelId === "string" && !modelId.trim().startsWith("dynamic:") ? modelMetadataFromModelId(modelId) : {};
}
function modelMetadataFromModelId(modelId) {
  const normalized = modelId.trim();
  if (!normalized) {
    return {};
  }
  const slashIndex = normalized.indexOf("/");
  if (slashIndex > 0 && slashIndex < normalized.length - 1) {
    return {
      model: normalized.slice(slashIndex + 1),
      provider: normalized.slice(0, slashIndex)
    };
  }
  return {
    model: normalized
  };
}
function sessionIdFromContext(ctx) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, ctx)) {
    return void 0;
  }
  const session = ctx["session"];
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, session)) {
    return void 0;
  }
  const id = session["id"];
  return typeof id === "string" ? id : void 0;
}
function toolMetadataFromTurn(turn) {
  const { model: _model, provider: _provider, ...metadata } = turn.metadata;
  return metadata;
}
function isToolCallAction(action) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, action) && action["kind"] === "tool-call" && typeof action["callId"] === "string" && typeof action["toolName"] === "string" && _chunkQRHGVBKUjs.isObject.call(void 0, action["input"]);
}
function isLocalSubagentCallAction(action) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, action) && action["kind"] === "subagent-call" && typeof action["callId"] === "string" && _chunkQRHGVBKUjs.isObject.call(void 0, action["input"]);
}
function isTraceableActionRequest(action) {
  return isToolCallAction(action) || isLocalSubagentCallAction(action);
}
function isToolResult(result) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, result) && result["kind"] === "tool-result" && typeof result["callId"] === "string" && typeof result["toolName"] === "string";
}
function isSubagentResult(result) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, result) && result["kind"] === "subagent-result" && typeof result["callId"] === "string" && typeof result["subagentName"] === "string";
}
function normalizedFinishReason(finishReason) {
  switch (finishReason) {
    case "content-filter":
      return "content_filter";
    case "tool-calls":
      return "tool_calls";
    default:
      return finishReason;
  }
}
function errorFromMessage(message, code, details) {
  const error = new Error(`${code}: ${message}`);
  if (details !== void 0) {
    error.cause = details;
  }
  return error;
}
function actionResultError(error, output) {
  if (error) {
    return errorFromMessage(error.message, error.code);
  }
  const result = new Error("Eve action failed");
  if (output !== void 0) {
    result.cause = output;
  }
  return result;
}
function eventTime(event) {
  if (!_optionalChain([event, 'access', _114 => _114.meta, 'optionalAccess', _115 => _115.at])) {
    return void 0;
  }
  const timestamp = Date.parse(event.meta.at);
  return Number.isFinite(timestamp) ? timestamp / 1e3 : void 0;
}
function turnKey(sessionId, turnId) {
  return `${sessionId}:${turnId}`;
}
function toolKey(sessionId, callId) {
  return `${sessionId}:${callId}`;
}
async function generateEveIds(kind, ...parts) {
  const [rowId, spanId] = await Promise.all([
    deterministicEveId(`eve:row:${kind}`, ...parts),
    deterministicEveId(`eve:${kind}`, ...parts)
  ]);
  return { rowId, spanId };
}
async function deterministicEveId(...parts) {
  const data = new TextEncoder().encode(
    parts.map((part) => `${part.length}:${part}`).join("\0")
  );
  const digest = await globalThis.crypto.subtle.digest("SHA-256", data);
  const bytes = Array.from(new Uint8Array(digest, 0, 16));
  const hex = bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

// src/typed-instrumentation-helpers.ts
var TypedApplyProxy = Proxy;

// src/wrappers/anthropic.ts
function wrapAnthropic(anthropic) {
  const au = anthropic;
  if (au && typeof au === "object" && "messages" in au && typeof au.messages === "object" && au.messages && "create" in au.messages) {
    return anthropicProxy(au);
  }
  console.warn("Unsupported Anthropic library. Not wrapping.");
  return anthropic;
}
function anthropicProxy(anthropic) {
  const proxy = new Proxy(anthropic, {
    get(target, prop, receiver) {
      switch (prop) {
        case "beta":
          return target.beta ? betaProxy(target.beta, proxy) : target.beta;
        case "messages":
          return messagesProxy(target.messages);
        default:
          return Reflect.get(target, prop, receiver);
      }
    }
  });
  return proxy;
}
function betaProxy(beta, anthropic) {
  return new Proxy(beta, {
    get(target, prop, receiver) {
      if (prop === "messages") {
        return betaMessagesProxy(target.messages, anthropic);
      }
      if (prop === "sessions") {
        return target.sessions ? betaSessionsProxy(target.sessions) : target.sessions;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function betaSessionsProxy(sessions) {
  return new Proxy(sessions, {
    get(target, prop, receiver) {
      if (prop === "events") {
        return betaSessionEventsProxy(target.events);
      }
      if (prop === "threads") {
        return target.threads ? betaSessionThreadsProxy(target.threads) : target.threads;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function betaSessionEventsProxy(events) {
  return new Proxy(events, {
    get(target, prop, receiver) {
      if (prop === "stream") {
        return new TypedApplyProxy(target.stream, {
          apply(stream, thisArg, argArray) {
            return _chunkMF7NU6BTjs.anthropicChannels.betaSessionsEventsStream.tracePromise(
              () => Reflect.apply(stream, thisArg, argArray),
              { arguments: argArray }
            );
          }
        });
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function betaSessionThreadsProxy(threads) {
  return new Proxy(threads, {
    get(target, prop, receiver) {
      if (prop === "events") {
        return betaSessionThreadEventsProxy(target.events);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function betaSessionThreadEventsProxy(events) {
  return new Proxy(events, {
    get(target, prop, receiver) {
      if (prop === "stream") {
        return new TypedApplyProxy(target.stream, {
          apply(stream, thisArg, argArray) {
            return _chunkMF7NU6BTjs.anthropicChannels.betaSessionsThreadsEventsStream.tracePromise(
              () => Reflect.apply(stream, thisArg, argArray),
              { arguments: argArray }
            );
          }
        });
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function messagesProxy(messages) {
  return new Proxy(messages, {
    get(target, prop, receiver) {
      if (prop === "create") {
        return createProxy(target.create, _chunkMF7NU6BTjs.anthropicChannels.messagesCreate);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function betaMessagesProxy(messages, anthropic) {
  return new Proxy(messages, {
    get(target, prop, receiver) {
      if (prop === "create") {
        return createProxy(target.create, _chunkMF7NU6BTjs.anthropicChannels.betaMessagesCreate);
      }
      if (prop === "toolRunner") {
        if (typeof target.toolRunner !== "function") {
          return Reflect.get(target, prop, receiver);
        }
        return toolRunnerProxy(
          target.toolRunner,
          anthropic,
          _chunkMF7NU6BTjs.anthropicChannels.betaMessagesToolRunner
        );
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function createProxy(create, channel) {
  return new TypedApplyProxy(create, {
    apply(target, thisArg, argArray) {
      return channel.tracePromise(
        () => Reflect.apply(target, thisArg, argArray),
        {
          arguments: argArray
        }
      );
    }
  });
}
function toolRunnerProxy(toolRunner, anthropic, channel) {
  return new TypedApplyProxy(toolRunner, {
    apply(target, thisArg, argArray) {
      const invocationTarget = thisArg && typeof thisArg === "object" ? new Proxy(thisArg, {
        get(currentTarget, prop, receiver) {
          if (prop === "_client") {
            return anthropic;
          }
          return Reflect.get(currentTarget, prop, receiver);
        }
      }) : { _client: anthropic };
      return channel.traceSync(
        () => Reflect.apply(target, invocationTarget, argArray),
        {
          arguments: argArray
        }
      );
    }
  });
}

// src/wrappers/claude-agent-sdk/claude-agent-sdk.ts
function wrapClaudeAgentSDK(sdk) {
  const s = sdk;
  if (s && typeof s === "object" && "query" in s && typeof s.query === "function") {
    return claudeAgentSDKProxy(s);
  }
  console.warn("Unsupported Claude Agent SDK. Not wrapping.");
  return sdk;
}
function wrapClaudeAgentQuery(queryFn, defaultThis) {
  const proxy = new Proxy(queryFn, {
    apply(target, thisArg, argArray) {
      const params = _nullishCoalesce(argArray[0], () => ( {}));
      const wrappedParams = {
        ...params,
        options: {
          ..._nullishCoalesce(params.options, () => ( {})),
          [_chunkQRHGVBKUjs.CLAUDE_AGENT_SDK_SKIP_LOCAL_TOOL_HOOKS_OPTION]: true
        }
      };
      const invocationTarget = thisArg === proxy || thisArg === void 0 ? _nullishCoalesce(defaultThis, () => ( thisArg)) : thisArg;
      return _chunkMF7NU6BTjs.claudeAgentSDKChannels.query.traceSync(
        () => Reflect.apply(target, invocationTarget, [wrappedParams]),
        // The channel carries no extra context fields, but the generated
        // StartOf<> type for Record<string, never> is overly strict here.
        { arguments: [wrappedParams] }
      );
    }
  });
  return proxy;
}
function wrapClaudeAgentTool(toolFn, localToolMetadataByTool, defaultThis) {
  const proxy = new Proxy(toolFn, {
    apply(target, thisArg, argArray) {
      const invocationTarget = thisArg === proxy || thisArg === void 0 ? _nullishCoalesce(defaultThis, () => ( thisArg)) : thisArg;
      const wrappedArgs = [...argArray];
      const toolName = wrappedArgs[0];
      let handlerIndex = -1;
      for (let i = wrappedArgs.length - 1; i >= 0; i -= 1) {
        if (typeof wrappedArgs[i] === "function") {
          handlerIndex = i;
          break;
        }
      }
      if (typeof toolName !== "string" || handlerIndex === -1) {
        return Reflect.apply(target, invocationTarget, wrappedArgs);
      }
      const localToolMetadata = { toolName };
      const originalHandler = wrappedArgs[handlerIndex];
      wrappedArgs[handlerIndex] = _chunkQRHGVBKUjs.wrapLocalClaudeToolHandler.call(void 0, 
        originalHandler,
        () => localToolMetadata
      );
      const wrappedTool = Reflect.apply(target, invocationTarget, wrappedArgs);
      if (wrappedTool && typeof wrappedTool === "object") {
        localToolMetadataByTool.set(wrappedTool, localToolMetadata);
      }
      return wrappedTool;
    }
  });
  return proxy;
}
function wrapCreateSdkMcpServer(createSdkMcpServerFn, localToolMetadataByTool, defaultThis) {
  const proxy = new Proxy(createSdkMcpServerFn, {
    apply(target, thisArg, argArray) {
      const invocationTarget = thisArg === proxy || thisArg === void 0 ? _nullishCoalesce(defaultThis, () => ( thisArg)) : thisArg;
      const config = argArray[0];
      const serverName = _optionalChain([config, 'optionalAccess', _116 => _116.name]);
      if (typeof serverName === "string" && Array.isArray(_optionalChain([config, 'optionalAccess', _117 => _117.tools]))) {
        for (const tool of config.tools) {
          if (!tool || typeof tool !== "object") {
            continue;
          }
          const metadata = localToolMetadataByTool.get(tool);
          if (metadata) {
            metadata.serverName = serverName;
          }
        }
      }
      return Reflect.apply(target, invocationTarget, argArray);
    }
  });
  return proxy;
}
function claudeAgentSDKProxy(sdk) {
  const cache = /* @__PURE__ */ new Map();
  const localToolMetadataByTool = /* @__PURE__ */ new WeakMap();
  return new Proxy(sdk, {
    get(target, prop, receiver) {
      if (cache.has(prop)) {
        return cache.get(prop);
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "query" && typeof value === "function") {
        const wrappedQuery = wrapClaudeAgentQuery(target.query, target);
        cache.set(prop, wrappedQuery);
        return wrappedQuery;
      }
      if (prop === "tool" && typeof value === "function") {
        const wrappedTool = wrapClaudeAgentTool(
          target.tool,
          localToolMetadataByTool,
          target
        );
        cache.set(prop, wrappedTool);
        return wrappedTool;
      }
      if (prop === "createSdkMcpServer" && typeof value === "function") {
        const wrappedCreateSdkMcpServer = wrapCreateSdkMcpServer(
          value,
          localToolMetadataByTool,
          target
        );
        cache.set(prop, wrappedCreateSdkMcpServer);
        return wrappedCreateSdkMcpServer;
      }
      if (typeof value === "function") {
        const bound = value.bind(target);
        cache.set(prop, bound);
        return bound;
      }
      return value;
    }
  });
}

// src/wrappers/cloudflare-think.ts
var WRAPPED_THINK = /* @__PURE__ */ Symbol.for("braintrust.cloudflare-think.wrapped");
function wrapCloudflareThink(sdk) {
  if (!sdk || typeof sdk !== "object") {
    return sdk;
  }
  const thinkModule = sdk;
  if (typeof thinkModule.Think !== "function") {
    return sdk;
  }
  patchThinkClass(thinkModule.Think);
  return sdk;
}
function patchThinkClass(Think) {
  const prototype = Think.prototype;
  if (!prototype || prototype[WRAPPED_THINK]) {
    return;
  }
  const descriptor = Object.getOwnPropertyDescriptor(
    prototype,
    "_runInferenceLoop"
  );
  if (!descriptor || typeof descriptor.value !== "function") {
    return;
  }
  const original = descriptor.value;
  Object.defineProperty(prototype, "_runInferenceLoop", {
    ...descriptor,
    value: function wrappedCloudflareThinkRunInferenceLoop(input) {
      const args = [input];
      return _chunkMF7NU6BTjs.cloudflareThinkChannels.runInferenceLoop.tracePromise(
        () => Reflect.apply(original, this, args),
        {
          arguments: args,
          self: this
        }
      );
    }
  });
  Object.defineProperty(prototype, WRAPPED_THINK, {
    configurable: false,
    enumerable: false,
    value: true
  });
}

// src/wrappers/openai-codex.ts
var WRAPPED_CLIENT = /* @__PURE__ */ Symbol.for("braintrust.openai-codex.wrapped-client");
var WRAPPED_THREAD = /* @__PURE__ */ Symbol.for("braintrust.openai-codex.wrapped-thread");
function wrapOpenAICodexSDK(sdk) {
  if (!sdk || typeof sdk !== "object") {
    return sdk;
  }
  const maybeSDK = sdk;
  if (hasCodexClientShape(maybeSDK)) {
    return wrapCodexClient(maybeSDK);
  }
  if (!maybeSDK.Codex || typeof maybeSDK.Codex !== "function") {
    console.warn("Unsupported OpenAI Codex SDK. Not wrapping.");
    return sdk;
  }
  const target = isModuleNamespace2(sdk) ? Object.setPrototypeOf({}, sdk) : sdk;
  return new Proxy(target, {
    get(target2, prop, receiver) {
      const value = Reflect.get(target2, prop, receiver);
      if (prop === "Codex" && typeof value === "function") {
        return wrapCodexClass(value);
      }
      if (typeof value === "function") {
        return value.bind(target2);
      }
      return value;
    }
  });
}
function hasCodexClientShape(value) {
  return typeof value.startThread === "function" && typeof value.resumeThread === "function";
}
function isModuleNamespace2(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (_optionalChain([obj, 'access', _118 => _118.constructor, 'optionalAccess', _119 => _119.name]) === "Module") {
    return true;
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return false;
  }
  const descriptor = Object.getOwnPropertyDescriptor(obj, keys[0]);
  return descriptor ? !descriptor.configurable && !descriptor.writable : false;
}
function wrapCodexClass(Codex) {
  return new Proxy(Codex, {
    construct(target, args, newTarget) {
      return wrapCodexClient(Reflect.construct(target, args, newTarget));
    },
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
}
function wrapCodexClient(client) {
  if (!client || typeof client !== "object") {
    return client;
  }
  if (client[WRAPPED_CLIENT]) {
    return client;
  }
  return new Proxy(client, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_CLIENT) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "startThread" && typeof value === "function") {
        return function(options) {
          return wrapCodexThread(Reflect.apply(value, target, [options]));
        };
      }
      if (prop === "resumeThread" && typeof value === "function") {
        return function(id, options) {
          return wrapCodexThread(Reflect.apply(value, target, [id, options]));
        };
      }
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
}
function wrapCodexThread(thread) {
  if (!thread || typeof thread !== "object") {
    return thread;
  }
  if (thread[WRAPPED_THREAD]) {
    return thread;
  }
  return new Proxy(thread, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_THREAD) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "run" && typeof value === "function") {
        return function(input, turnOptions) {
          const args = [input, turnOptions];
          return _chunkMF7NU6BTjs.openAICodexChannels.run.tracePromise(
            () => Reflect.apply(value, target, args),
            {
              arguments: args,
              operation: "run",
              thread: target
            }
          );
        };
      }
      if (prop === "runStreamed" && typeof value === "function") {
        return function(input, turnOptions) {
          const args = [input, turnOptions];
          return _chunkMF7NU6BTjs.openAICodexChannels.runStreamed.tracePromise(
            () => Reflect.apply(value, target, args),
            {
              arguments: args,
              operation: "runStreamed",
              thread: target
            }
          );
        };
      }
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
}

// src/wrappers/cursor-sdk.ts
var WRAPPED_AGENT = /* @__PURE__ */ Symbol.for("braintrust.cursor-sdk.wrapped-agent");
function wrapCursorSDK(sdk) {
  if (!sdk || typeof sdk !== "object") {
    return sdk;
  }
  const maybeSDK = sdk;
  if (!maybeSDK.Agent || typeof maybeSDK.Agent !== "function") {
    console.warn("Unsupported Cursor SDK. Not wrapping.");
    return sdk;
  }
  const target = isModuleNamespace3(sdk) ? Object.setPrototypeOf({}, sdk) : sdk;
  return new Proxy(target, {
    get(target2, prop, receiver) {
      const value = Reflect.get(target2, prop, receiver);
      if (prop === "Agent" && typeof value === "function") {
        return wrapCursorAgentClass(value);
      }
      if (typeof value === "function") {
        return value.bind(target2);
      }
      return value;
    }
  });
}
function isModuleNamespace3(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (_optionalChain([obj, 'access', _120 => _120.constructor, 'optionalAccess', _121 => _121.name]) === "Module") {
    return true;
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return false;
  }
  const descriptor = Object.getOwnPropertyDescriptor(obj, keys[0]);
  return descriptor ? !descriptor.configurable && !descriptor.writable : false;
}
function wrapCursorAgentClass(Agent) {
  const cache = /* @__PURE__ */ new Map();
  return new Proxy(Agent, {
    get(target, prop, receiver) {
      if (cache.has(prop)) {
        return cache.get(prop);
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "create" && typeof value === "function") {
        const wrapped = async function(options) {
          const args = [options];
          return _chunkMF7NU6BTjs.cursorSDKChannels.create.tracePromise(
            async () => wrapCursorAgent(await Reflect.apply(value, target, args)),
            { arguments: args }
          );
        };
        cache.set(prop, wrapped);
        return wrapped;
      }
      if (prop === "resume" && typeof value === "function") {
        const wrapped = async function(agentId, options) {
          const args = [agentId, options];
          return _chunkMF7NU6BTjs.cursorSDKChannels.resume.tracePromise(
            async () => wrapCursorAgent(await Reflect.apply(value, target, args)),
            { arguments: args }
          );
        };
        cache.set(prop, wrapped);
        return wrapped;
      }
      if (prop === "prompt" && typeof value === "function") {
        const wrapped = async function(message, options) {
          const args = [message, options];
          return _chunkMF7NU6BTjs.cursorSDKChannels.prompt.tracePromise(
            () => Reflect.apply(value, target, args),
            { arguments: args }
          );
        };
        cache.set(prop, wrapped);
        return wrapped;
      }
      if (typeof value === "function") {
        const bound = value.bind(target);
        cache.set(prop, bound);
        return bound;
      }
      return value;
    }
  });
}
function wrapCursorAgent(agent) {
  if (!agent || typeof agent !== "object") {
    return agent;
  }
  if (agent[WRAPPED_AGENT]) {
    return agent;
  }
  const proxy = new Proxy(agent, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_AGENT) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "send" && typeof value === "function") {
        return function(message, options) {
          const args = [message, options];
          return _chunkMF7NU6BTjs.cursorSDKChannels.send.tracePromise(
            () => Reflect.apply(value, target, args),
            {
              agent: target,
              arguments: args,
              operation: "send"
            }
          );
        };
      }
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
  return proxy;
}

// src/wrappers/pi-coding-agent.ts
var WRAPPED_PROMPT = /* @__PURE__ */ Symbol.for("braintrust.pi-coding-agent.wrapped-prompt");
function wrapPiCodingAgentSDK(sdk) {
  if (!sdk || typeof sdk !== "object") {
    return sdk;
  }
  const maybeSDK = sdk;
  if (!maybeSDK.AgentSession || typeof maybeSDK.AgentSession !== "function") {
    console.warn("Unsupported Pi Coding Agent SDK. Not wrapping.");
    return sdk;
  }
  patchAgentSessionClass(
    maybeSDK.AgentSession
  );
  return sdk;
}
function patchAgentSessionClass(AgentSession) {
  const prototype = AgentSession.prototype;
  if (!prototype || prototype[WRAPPED_PROMPT]) {
    return;
  }
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "prompt");
  if (!descriptor || typeof descriptor.value !== "function") {
    console.warn("Unsupported Pi Coding Agent SDK. Not wrapping.");
    return;
  }
  const originalPrompt = descriptor.value;
  Object.defineProperty(prototype, "prompt", {
    ...descriptor,
    value: function wrappedPiCodingAgentPrompt(text, options) {
      const args = [text, options];
      return _chunkMF7NU6BTjs.piCodingAgentChannels.prompt.invoke(originalPrompt, this, args, {
        session: this
      });
    }
  });
  Object.defineProperty(prototype, WRAPPED_PROMPT, {
    configurable: false,
    enumerable: false,
    value: true
  });
}

// src/wrappers/cloudflare-agent.ts
var WRAPPED_RUN_AGENT_TOOL = /* @__PURE__ */ Symbol.for(
  "braintrust.cloudflare-agents.wrapped-run-agent-tool"
);
function wrapCloudflareAgent(Agent) {
  if (typeof Agent !== "function") {
    warnUnsupportedAgent();
    return Agent;
  }
  const prototypeDescriptor = Object.getOwnPropertyDescriptor(
    Agent,
    "prototype"
  );
  const prototype = prototypeDescriptor && "value" in prototypeDescriptor ? prototypeDescriptor.value : void 0;
  if (!isObjectLike(prototype)) {
    warnUnsupportedAgent();
    return Agent;
  }
  if (ownValue(prototype, WRAPPED_RUN_AGENT_TOOL) === true) {
    return Agent;
  }
  const descriptor = Object.getOwnPropertyDescriptor(prototype, "runAgentTool");
  if (!descriptor || typeof descriptor.value !== "function") {
    warnUnsupportedAgent();
    return Agent;
  }
  const originalRunAgentTool = descriptor.value;
  Object.defineProperty(prototype, "runAgentTool", {
    ...descriptor,
    value: function wrappedRunAgentTool(...args) {
      const options = args[1];
      if (ownValue(options, "detached")) {
        return Reflect.apply(originalRunAgentTool, this, args);
      }
      return _chunkMF7NU6BTjs.cloudflareAgentsChannels.runAgentTool.tracePromise(
        () => Reflect.apply(originalRunAgentTool, this, args),
        { arguments: args, self: this }
      );
    }
  });
  Object.defineProperty(prototype, WRAPPED_RUN_AGENT_TOOL, {
    configurable: false,
    enumerable: false,
    value: true
  });
  return Agent;
}
function ownValue(value, key) {
  if (!isObjectLike(value)) {
    return void 0;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && "value" in descriptor ? descriptor.value : void 0;
}
function isObjectLike(value) {
  return typeof value === "object" && value !== null || typeof value === "function";
}
function warnUnsupportedAgent() {
  _chunkQRHGVBKUjs.debugLogger.warn("Unsupported Cloudflare Agents Agent class. Not wrapping.");
}

// src/wrappers/strands-agent-sdk.ts
var WRAPPED_CLASS = /* @__PURE__ */ Symbol.for("braintrust.strands-agent-sdk.wrapped-class");
var WRAPPED_INSTANCE = /* @__PURE__ */ Symbol.for(
  "braintrust.strands-agent-sdk.wrapped-instance"
);
function wrapStrandsAgentSDK(sdk) {
  if (!sdk || typeof sdk !== "object") {
    return sdk;
  }
  const maybeSDK = sdk;
  if (typeof maybeSDK.Agent !== "function" && typeof maybeSDK.Graph !== "function" && typeof maybeSDK.Swarm !== "function") {
    console.warn("Unsupported Strands Agent SDK. Not wrapping.");
    return sdk;
  }
  const target = isModuleNamespace4(sdk) ? Object.setPrototypeOf({}, sdk) : sdk;
  return new Proxy(target, {
    get(target2, prop, receiver) {
      const value = Reflect.get(target2, prop, receiver);
      if (prop === "Agent" && typeof value === "function") {
        return wrapAgentClass2(value);
      }
      if (prop === "Graph" && typeof value === "function") {
        return wrapMultiAgentClass(
          value,
          "graph"
        );
      }
      if (prop === "Swarm" && typeof value === "function") {
        return wrapMultiAgentClass(
          value,
          "swarm"
        );
      }
      return value;
    }
  });
}
function isModuleNamespace4(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (_optionalChain([obj, 'access', _122 => _122.constructor, 'optionalAccess', _123 => _123.name]) === "Module") {
    return true;
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return false;
  }
  const descriptor = Object.getOwnPropertyDescriptor(obj, keys[0]);
  return descriptor ? !descriptor.configurable && !descriptor.writable : false;
}
function wrapAgentClass2(AgentClass) {
  if (AgentClass[WRAPPED_CLASS]) {
    return AgentClass;
  }
  return new Proxy(AgentClass, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_CLASS) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
    construct(target, args, newTarget) {
      const instance = Reflect.construct(target, args, newTarget);
      return wrapAgentInstance(instance);
    }
  });
}
function wrapMultiAgentClass(MultiAgentClass, kind) {
  if (MultiAgentClass[WRAPPED_CLASS]) {
    return MultiAgentClass;
  }
  return new Proxy(MultiAgentClass, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_CLASS) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
    construct(target, args, newTarget) {
      const instance = Reflect.construct(target, args, newTarget);
      return wrapMultiAgentInstance(instance, kind);
    }
  });
}
function wrapAgentInstance(agent) {
  if (!agent || typeof agent !== "object") {
    return agent;
  }
  if (agent[WRAPPED_INSTANCE]) {
    return agent;
  }
  const proxy = new Proxy(agent, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_INSTANCE) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "stream" && typeof value === "function") {
        return function(args, options) {
          const callArgs = [args, options];
          return _chunkMF7NU6BTjs.strandsAgentSDKChannels.agentStream.traceSync(
            () => Reflect.apply(value, target, callArgs),
            {
              agent: proxy,
              arguments: callArgs,
              self: proxy
            }
          );
        };
      }
      if (prop === "invoke" && typeof value === "function") {
        return async function(args, options) {
          return consumeAsyncGenerator(proxy.stream(args, options));
        };
      }
      return typeof value === "function" ? value.bind(target) : value;
    }
  });
  return proxy;
}
function wrapMultiAgentInstance(orchestrator, kind) {
  if (!orchestrator || typeof orchestrator !== "object") {
    return orchestrator;
  }
  if (orchestrator[WRAPPED_INSTANCE]) {
    return orchestrator;
  }
  const proxy = new Proxy(orchestrator, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_INSTANCE) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "stream" && typeof value === "function") {
        return function(input, options) {
          const callArgs = [input, options];
          const channel = kind === "graph" ? _chunkMF7NU6BTjs.strandsAgentSDKChannels.graphStream : _chunkMF7NU6BTjs.strandsAgentSDKChannels.swarmStream;
          return channel.traceSync(
            () => Reflect.apply(value, target, callArgs),
            {
              arguments: callArgs,
              orchestrator: proxy,
              self: proxy
            }
          );
        };
      }
      if (prop === "invoke" && typeof value === "function") {
        return async function(input, options) {
          return consumeAsyncGenerator(proxy.stream(input, options));
        };
      }
      return typeof value === "function" ? value.bind(target) : value;
    }
  });
  return proxy;
}
async function consumeAsyncGenerator(generator) {
  let result = await generator.next();
  while (!result.done) {
    result = await generator.next();
  }
  return result.value;
}

// src/wrappers/cloudflare-ai-chat.ts
var wrappedClasses = /* @__PURE__ */ new WeakMap();
function wrapCloudflareAIChat(module) {
  if (!module || typeof module !== "object") {
    return module;
  }
  const candidate = module;
  let AIChatAgent;
  try {
    AIChatAgent = Reflect.get(candidate, "AIChatAgent");
  } catch (error) {
    _chunkQRHGVBKUjs.debugLogger.debug("Failed to inspect @cloudflare/ai-chat module:", error);
    return module;
  }
  if (typeof AIChatAgent !== "function") {
    _chunkQRHGVBKUjs.debugLogger.warn(
      "Unsupported @cloudflare/ai-chat module. AIChatAgent was not found; not wrapping."
    );
    return module;
  }
  const target = isModuleNamespace5(module) ? Object.setPrototypeOf({}, module) : candidate;
  return new Proxy(target, {
    get(target2, property, receiver) {
      const value = Reflect.get(target2, property, receiver);
      if (property === "AIChatAgent" && typeof value === "function") {
        return wrapAIChatAgentClass(
          value
        );
      }
      return value;
    }
  });
}
function wrapAIChatAgentClass(AgentClass) {
  const cached = wrappedClasses.get(AgentClass);
  if (cached) {
    return cached;
  }
  const wrapped = new Proxy(AgentClass, {
    get(target, property) {
      const value = Reflect.get(target, property, target);
      return typeof value === "function" ? value.bind(target) : value;
    },
    construct(target, args, newTarget) {
      const instance = Reflect.construct(
        target,
        args,
        newTarget
      );
      return _chunkQRHGVBKUjs.instrumentCloudflareAIChatAgent.call(void 0, instance);
    }
  });
  wrappedClasses.set(AgentClass, wrapped);
  wrappedClasses.set(wrapped, wrapped);
  return wrapped;
}
function isModuleNamespace5(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  try {
    if (Reflect.get(value, Symbol.toStringTag) === "Module") {
      return true;
    }
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return false;
    }
    const descriptor = Object.getOwnPropertyDescriptor(value, keys[0]);
    return descriptor ? !descriptor.configurable && !descriptor.writable : false;
  } catch (e6) {
    return false;
  }
}

// src/wrappers/google-genai.ts
function wrapGoogleGenAI(googleGenAI) {
  if (!googleGenAI || typeof googleGenAI !== "object") {
    console.warn("Invalid Google GenAI module. Not wrapping.");
    return googleGenAI;
  }
  if (!("GoogleGenAI" in googleGenAI)) {
    console.warn(
      "GoogleGenAI class not found in module. Not wrapping. Make sure you're passing the module itself (import * as googleGenAI from '@google/genai')."
    );
    return googleGenAI;
  }
  return new Proxy(googleGenAI, {
    get(target, prop, receiver) {
      if (prop === "GoogleGenAI") {
        const OriginalGoogleGenAI = Reflect.get(
          target,
          prop,
          receiver
        );
        return wrapGoogleGenAIClass(OriginalGoogleGenAI);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapGoogleGenAIClass(OriginalGoogleGenAI) {
  return new Proxy(OriginalGoogleGenAI, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);
      return wrapGoogleGenAIInstance(instance);
    }
  });
}
function wrapGoogleGenAIInstance(instance) {
  const wrappedModels = wrapModels(instance.models);
  let originalInteractions;
  let wrappedInteractions;
  patchGoogleGenAIChats(instance, wrappedModels);
  return new Proxy(instance, {
    get(target, prop, receiver) {
      if (prop === "models") {
        return wrappedModels;
      }
      if (prop === "interactions") {
        const interactions = Reflect.get(target, prop, receiver);
        if (!_chunkQRHGVBKUjs.isObject.call(void 0, interactions) || typeof interactions.create !== "function") {
          return interactions;
        }
        if (interactions !== originalInteractions) {
          originalInteractions = interactions;
          wrappedInteractions = wrapInteractions(interactions);
        }
        return wrappedInteractions;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function patchGoogleGenAIChats(instance, wrappedModels) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, instance.chats) || !("modelsModule" in instance.chats)) {
    return;
  }
  Reflect.set(instance.chats, "modelsModule", wrappedModels);
}
function wrapModels(models) {
  return new Proxy(models, {
    get(target, prop, receiver) {
      if (prop === "generateContent") {
        return wrapGenerateContent(target.generateContent.bind(target));
      } else if (prop === "generateContentStream") {
        return wrapGenerateContentStream(
          target.generateContentStream.bind(target)
        );
      } else if (prop === "embedContent") {
        return wrapEmbedContent(target.embedContent.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapInteractions(interactions) {
  return new Proxy(interactions, {
    get(target, prop, receiver) {
      if (prop === "create") {
        return wrapInteractionCreate(target.create.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapGenerateContent(original) {
  return function(params) {
    return _chunkMF7NU6BTjs.googleGenAIChannels.generateContent.tracePromise(
      () => original(params),
      { arguments: [params] }
    );
  };
}
function wrapGenerateContentStream(original) {
  return function(params) {
    return _chunkMF7NU6BTjs.googleGenAIChannels.generateContentStream.tracePromise(
      () => original(params),
      { arguments: [params] }
    );
  };
}
function wrapEmbedContent(original) {
  return function(params) {
    return _chunkMF7NU6BTjs.googleGenAIChannels.embedContent.tracePromise(
      () => original(params),
      { arguments: [params] }
    );
  };
}
function wrapInteractionCreate(original) {
  return function(params, options) {
    if (params.background === true) {
      return options === void 0 ? original(params) : original(params, options);
    }
    const traceContext = options === void 0 ? { arguments: [params] } : { arguments: [params, options] };
    return _chunkMF7NU6BTjs.googleGenAIChannels.interactionsCreate.tracePromise(
      () => options === void 0 ? original(params) : original(params, options),
      traceContext
    );
  };
}

// src/wrappers/google-adk.ts
function wrapGoogleADK(adkModule) {
  if (!adkModule || typeof adkModule !== "object") {
    console.warn("Invalid Google ADK module. Not wrapping.");
    return adkModule;
  }
  if (!("Runner" in adkModule) && !("LlmAgent" in adkModule)) {
    console.warn(
      "Runner or LlmAgent class not found in module. Not wrapping. Make sure you're passing the module itself (import * as adk from '@google/adk')."
    );
    return adkModule;
  }
  return new Proxy(adkModule, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (prop === "Runner" && typeof value === "function") {
        return wrapRunnerClass(value);
      }
      if (prop === "InMemoryRunner" && typeof value === "function") {
        return wrapRunnerClass(
          value
        );
      }
      if ((prop === "LlmAgent" || prop === "Agent" || prop === "SequentialAgent" || prop === "ParallelAgent" || prop === "LoopAgent") && typeof value === "function") {
        return wrapAgentClass3(value);
      }
      if (prop === "FunctionTool" && typeof value === "function") {
        return wrapToolClass(value);
      }
      return value;
    }
  });
}
function wrapRunnerClass(RunnerClass) {
  return new Proxy(RunnerClass, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);
      return wrapRunnerInstance(instance);
    }
  });
}
function wrapRunnerInstance(runner) {
  return new Proxy(runner, {
    get(target, prop, receiver) {
      if (prop === "runAsync") {
        return wrapRunnerRunAsync(target);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapRunnerRunAsync(runner) {
  const original = runner.runAsync.bind(runner);
  return function(params) {
    return _chunkMF7NU6BTjs.googleADKChannels.runnerRunAsync.traceSync(() => original(params), {
      arguments: [params],
      self: runner
    });
  };
}
function wrapAgentClass3(AgentClass) {
  return new Proxy(AgentClass, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);
      return wrapAgentInstance2(instance);
    }
  });
}
function wrapAgentInstance2(agent) {
  return new Proxy(agent, {
    get(target, prop, receiver) {
      if (prop === "runAsync") {
        return wrapAgentRunAsync(target);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapAgentRunAsync(agent) {
  const original = agent.runAsync.bind(agent);
  return function(parentContext) {
    return _chunkMF7NU6BTjs.googleADKChannels.agentRunAsync.traceSync(
      () => original(parentContext),
      { arguments: [parentContext], self: agent }
    );
  };
}
function wrapToolClass(ToolClass) {
  return new Proxy(ToolClass, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);
      return wrapToolInstance(instance);
    }
  });
}
function wrapToolInstance(tool) {
  return new Proxy(tool, {
    get(target, prop, receiver) {
      if (prop === "runAsync") {
        return wrapToolRunAsync(target);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapToolRunAsync(tool) {
  const original = tool.runAsync.bind(tool);
  return function(req) {
    return _chunkMF7NU6BTjs.googleADKChannels.toolRunAsync.tracePromise(() => original(req), {
      arguments: [req],
      self: tool
    });
  };
}

// src/wrappers/genkit.ts
var WRAPPED_GENKIT = /* @__PURE__ */ Symbol.for("braintrust.genkit.wrapped");
var PATCHED_GENKIT_REGISTRY = /* @__PURE__ */ Symbol.for(
  "braintrust.genkit.registry.patched"
);
var PATCHED_GENKIT_REGISTRY_CONSTRUCTOR = /* @__PURE__ */ Symbol.for(
  "braintrust.genkit.registry.constructor.patched"
);
var wrappedGenkitActions = /* @__PURE__ */ new WeakMap();
function wrapGenkit(genkit) {
  if (isGenkitInstance(genkit)) {
    return wrapGenkitInstance(genkit);
  }
  if (isGenkitModule(genkit)) {
    return wrapGenkitModule(genkit);
  }
  console.warn("Unsupported Genkit object. Not wrapping.");
  return genkit;
}
function isRecord(value) {
  return typeof value === "object" && value !== null;
}
function isPropertyBag(value) {
  return isRecord(value) || typeof value === "function";
}
function hasFunction(value, methodName) {
  return isPropertyBag(value) && methodName in value && typeof value[methodName] === "function";
}
function isGenkitInstance(value) {
  return isRecord(value) && (hasFunction(value, "generate") || hasFunction(value, "generateStream") || hasFunction(value, "defineFlow") || hasFunction(value, "defineTool"));
}
function isGenkitModule(value) {
  return hasFunction(value, "genkit");
}
function wrapGenkitModule(module) {
  return new Proxy(module, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (prop === "genkit" && typeof value === "function") {
        const factory = value;
        return (...args) => wrapGenkit(factory(...args));
      }
      return value;
    }
  });
}
function wrapGenkitInstance(instance) {
  if (hasWrappedFlag(instance)) {
    return instance;
  }
  patchGenkitRegistry(instance);
  const proxy = new Proxy(instance, {
    get(target, prop, receiver) {
      switch (prop) {
        case WRAPPED_GENKIT:
          return true;
        case "generate":
          return typeof target.generate === "function" ? wrapGenerate(target.generate.bind(target)) : target.generate;
        case "generateStream":
          return typeof target.generateStream === "function" ? wrapGenerateStream(target.generateStream.bind(target)) : target.generateStream;
        case "embed":
          return typeof target.embed === "function" ? wrapEmbed2(target.embed.bind(target)) : target.embed;
        case "embedMany":
          return typeof target.embedMany === "function" ? wrapEmbedMany2(target.embedMany.bind(target)) : target.embedMany;
        case "run":
          return typeof target.run === "function" ? wrapRun(target.run.bind(target)) : target.run;
        case "defineFlow":
          return typeof target.defineFlow === "function" ? (...args) => wrapGenkitAction(target.defineFlow(...args)) : target.defineFlow;
        case "defineTool":
          return typeof target.defineTool === "function" ? (...args) => wrapGenkitAction(target.defineTool(...args)) : target.defineTool;
        default:
          return Reflect.get(target, prop, receiver);
      }
    }
  });
  return proxy;
}
function patchGenkitRegistry(instance) {
  const registry = instance.registry;
  patchGenkitRegistryLookup(registry);
  patchGenkitRegistryConstructor(registry);
}
function patchGenkitRegistryLookup(registry) {
  if (!isRecord(registry) || hasRegistryPatchedFlag(registry) || !hasFunction(registry, "lookupAction")) {
    return;
  }
  const originalLookupAction = registry.lookupAction;
  if (typeof originalLookupAction !== "function") {
    return;
  }
  try {
    Object.defineProperty(registry, "lookupAction", {
      configurable: true,
      value: (...args) => {
        const result = originalLookupAction.apply(registry, args);
        if (isPromiseLike(result)) {
          return result.then((action) => wrapGenkitAction(action));
        }
        return wrapGenkitAction(result);
      },
      writable: true
    });
    Object.defineProperty(registry, PATCHED_GENKIT_REGISTRY, {
      value: true
    });
  } catch (e7) {
  }
}
function patchGenkitRegistryConstructor(registry) {
  if (!isRecord(registry)) {
    return;
  }
  const constructor = registry.constructor;
  if (!isPropertyBag(constructor) || hasRegistryConstructorPatchedFlag(constructor) || !hasFunction(constructor, "withParent")) {
    return;
  }
  const originalWithParent = constructor.withParent;
  if (typeof originalWithParent !== "function") {
    return;
  }
  try {
    Object.defineProperty(constructor, "withParent", {
      configurable: true,
      value: (...args) => {
        const childRegistry = originalWithParent.apply(constructor, args);
        if (args.some((arg) => isRecord(arg) && hasRegistryPatchedFlag(arg))) {
          patchGenkitRegistryLookup(childRegistry);
          patchGenkitRegistryConstructor(childRegistry);
        }
        return childRegistry;
      },
      writable: true
    });
    Object.defineProperty(constructor, PATCHED_GENKIT_REGISTRY_CONSTRUCTOR, {
      value: true
    });
  } catch (e8) {
  }
}
function wrapGenerate(generate) {
  return (input) => _chunkMF7NU6BTjs.genkitChannels.generate.tracePromise(() => generate(input), {
    arguments: [input]
  });
}
function wrapGenerateStream(generateStream) {
  return (input) => _chunkMF7NU6BTjs.genkitChannels.generateStream.traceSync(() => generateStream(input), {
    arguments: [input]
  });
}
function wrapEmbed2(embed) {
  return (params) => _chunkMF7NU6BTjs.genkitChannels.embed.tracePromise(() => embed(params), {
    arguments: [params]
  });
}
function wrapEmbedMany2(embedMany) {
  return (params) => _chunkMF7NU6BTjs.genkitChannels.embedMany.tracePromise(() => embedMany(params), {
    arguments: [params]
  });
}
function wrapRun(run) {
  return (name, inputOrFn, maybeFn) => _chunkMF7NU6BTjs.genkitChannels.actionRun.tracePromise(() => run(name, inputOrFn, maybeFn), {
    arguments: [name, inputOrFn, maybeFn]
  });
}
function wrapGenkitAction(action) {
  if (!isGenkitAction(action) || hasWrappedFlag(action)) {
    return action;
  }
  const existing = wrappedGenkitActions.get(action);
  if (existing) {
    return existing;
  }
  const proxy = new Proxy(action, {
    apply(target, thisArg, argArray) {
      return traceActionRun(
        target,
        () => Reflect.apply(target, thisArg, argArray)
      )(argArray[0], argArray[1]);
    },
    get(target, prop, receiver) {
      switch (prop) {
        case WRAPPED_GENKIT:
          return true;
        case "run":
          return typeof target.run === "function" ? traceActionRun(target, target.run.bind(target)) : target.run;
        case "stream":
          return typeof target.stream === "function" ? traceActionStream(target, target.stream.bind(target)) : target.stream;
        default:
          return Reflect.get(target, prop, receiver);
      }
    }
  });
  wrappedGenkitActions.set(action, proxy);
  return proxy;
}
function isGenkitAction(value) {
  return typeof value === "function" && "__action" in value;
}
function traceActionRun(action, run) {
  return (input, options) => _chunkMF7NU6BTjs.genkitChannels.actionRun.tracePromise(() => run(input, options), {
    arguments: [input, options],
    self: action
  });
}
function traceActionStream(action, stream) {
  return (input, options) => _chunkMF7NU6BTjs.genkitChannels.actionStream.traceSync(() => stream(input, options), {
    arguments: [input, options],
    self: action
  });
}
function hasWrappedFlag(value) {
  return Boolean(value[WRAPPED_GENKIT]);
}
function hasRegistryPatchedFlag(value) {
  return Boolean(
    value[PATCHED_GENKIT_REGISTRY]
  );
}
function hasRegistryConstructorPatchedFlag(value) {
  return Boolean(
    value[PATCHED_GENKIT_REGISTRY_CONSTRUCTOR]
  );
}
function isPromiseLike(value) {
  return isRecord(value) && "then" in value && typeof value.then === "function";
}

// src/wrappers/huggingface.ts
var HUGGINGFACE_CONSTRUCTOR_KEYS = [
  "InferenceClient",
  "InferenceClientEndpoint",
  "HfInference",
  "HfInferenceEndpoint"
];
var HUGGINGFACE_CONSTRUCTOR_KEY_SET = new Set(
  HUGGINGFACE_CONSTRUCTOR_KEYS
);
function wrapHuggingFace(huggingFace) {
  if (isSupportedHuggingFaceModule(huggingFace)) {
    return moduleProxy(huggingFace);
  }
  if (isSupportedHuggingFaceClient(huggingFace)) {
    return clientProxy(huggingFace);
  }
  console.warn("Unsupported HuggingFace Inference SDK. Not wrapping.");
  return huggingFace;
}
function isHuggingFaceConstructorKey(value) {
  return HUGGINGFACE_CONSTRUCTOR_KEY_SET.has(value);
}
function hasFunction2(value, methodName) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, value) && methodName in value && typeof value[methodName] === "function";
}
function isSupportedHuggingFaceModule(value) {
  if (!_chunkQRHGVBKUjs.isObject.call(void 0, value)) {
    return false;
  }
  return HUGGINGFACE_CONSTRUCTOR_KEYS.some(
    (key) => key in value && typeof value[key] === "function"
  ) || isSupportedHuggingFaceClient(value);
}
function isSupportedHuggingFaceClient(value) {
  return hasFunction2(value, "chatCompletion") && hasFunction2(value, "chatCompletionStream") && hasFunction2(value, "textGeneration") && hasFunction2(value, "textGenerationStream") && hasFunction2(value, "featureExtraction");
}
function moduleProxy(module) {
  const shadowTarget = Object.create(module);
  return new Proxy(shadowTarget, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && isHuggingFaceConstructorKey(prop)) {
        const value = Reflect.get(module, prop, receiver);
        return typeof value === "function" ? wrapClientConstructor(value) : value;
      }
      switch (prop) {
        case "chatCompletion":
          return target.chatCompletion ? wrapChatCompletion2(target.chatCompletion.bind(target)) : target.chatCompletion;
        case "chatCompletionStream":
          return target.chatCompletionStream ? wrapChatCompletionStream(target.chatCompletionStream.bind(target)) : target.chatCompletionStream;
        case "textGeneration":
          return target.textGeneration ? wrapTextGeneration(target.textGeneration.bind(target)) : target.textGeneration;
        case "textGenerationStream":
          return target.textGenerationStream ? wrapTextGenerationStream(target.textGenerationStream.bind(target)) : target.textGenerationStream;
        case "featureExtraction":
          return target.featureExtraction ? wrapFeatureExtraction(target.featureExtraction.bind(target)) : target.featureExtraction;
        default:
          return Reflect.get(module, prop, receiver);
      }
    }
  });
}
function wrapClientConstructor(constructor) {
  return new Proxy(constructor, {
    construct(target, args) {
      const instance = Reflect.construct(target, args);
      return clientProxy(instance);
    }
  });
}
function clientProxy(client) {
  return clientProxyWithContext(client);
}
function clientProxyWithContext(client, endpointUrl) {
  const shadowTarget = Object.create(client);
  return new Proxy(shadowTarget, {
    get(_target, prop, receiver) {
      switch (prop) {
        case "chatCompletion":
          return wrapChatCompletion2(
            client.chatCompletion.bind(client),
            endpointUrl
          );
        case "chatCompletionStream":
          return wrapChatCompletionStream(
            client.chatCompletionStream.bind(client),
            endpointUrl
          );
        case "textGeneration":
          return wrapTextGeneration(
            client.textGeneration.bind(client),
            endpointUrl
          );
        case "textGenerationStream":
          return wrapTextGenerationStream(
            client.textGenerationStream.bind(client),
            endpointUrl
          );
        case "featureExtraction":
          return wrapFeatureExtraction(
            client.featureExtraction.bind(client),
            endpointUrl
          );
        case "endpoint":
          if (!client.endpoint) {
            return client.endpoint;
          }
          {
            const endpoint = client.endpoint.bind(client);
            return (nextEndpointUrl) => clientProxyWithContext(
              endpoint(nextEndpointUrl),
              nextEndpointUrl
            );
          }
        default:
          return Reflect.get(client, prop, receiver);
      }
    }
  });
}
function withEndpointUrl(params, endpointUrl) {
  if (!endpointUrl || params.endpointUrl !== void 0) {
    return params;
  }
  return {
    ...params,
    endpointUrl
  };
}
function wrapChatCompletion2(original, endpointUrl) {
  return (params, options) => {
    const traceParams = withEndpointUrl(params, endpointUrl);
    const context = {
      arguments: [traceParams]
    };
    return _chunkMF7NU6BTjs.huggingFaceChannels.chatCompletion.tracePromise(
      () => original(params, options),
      context
    );
  };
}
function wrapChatCompletionStream(original, endpointUrl) {
  return (params, options) => _chunkMF7NU6BTjs.huggingFaceChannels.chatCompletionStream.traceSync(
    () => original(params, options),
    {
      arguments: [withEndpointUrl(params, endpointUrl)]
    }
  );
}
function wrapTextGeneration(original, endpointUrl) {
  return (params, options) => {
    const traceParams = withEndpointUrl(params, endpointUrl);
    const context = {
      arguments: [traceParams]
    };
    return _chunkMF7NU6BTjs.huggingFaceChannels.textGeneration.tracePromise(
      () => original(params, options),
      context
    );
  };
}
function wrapTextGenerationStream(original, endpointUrl) {
  return (params, options) => _chunkMF7NU6BTjs.huggingFaceChannels.textGenerationStream.traceSync(
    () => original(params, options),
    {
      arguments: [withEndpointUrl(params, endpointUrl)]
    }
  );
}
function wrapFeatureExtraction(original, endpointUrl) {
  return (params, options) => {
    const traceParams = withEndpointUrl(params, endpointUrl);
    const context = {
      arguments: [traceParams]
    };
    return _chunkMF7NU6BTjs.huggingFaceChannels.featureExtraction.tracePromise(
      () => original(params, options),
      context
    );
  };
}

// src/wrappers/huggingface-transformers.ts
var PIPELINE_CONSTRUCTOR_KEYS = /* @__PURE__ */ new Set([
  "TextGenerationPipeline",
  "Text2TextGenerationPipeline",
  "SummarizationPipeline",
  "FeatureExtractionPipeline",
  "QuestionAnsweringPipeline"
]);
var wrappedValues = /* @__PURE__ */ new WeakMap();
function wrapHuggingFaceTransformers(transformers) {
  const pipelineTask = _optionalChain([transformers, 'optionalAccess', _124 => _124.task]);
  if (typeof transformers === "function" && _chunkMF7NU6BTjs.isSupportedHuggingFaceTransformersTask.call(void 0, pipelineTask)) {
    return wrapPipeline(transformers);
  }
  if (!isSupportedModule(transformers)) {
    return transformers;
  }
  const existing = wrappedValues.get(transformers);
  if (existing) {
    return existing;
  }
  const proxy = new Proxy(Object.create(transformers), {
    get(_target, property, receiver) {
      const value = Reflect.get(transformers, property, receiver);
      if (property === "pipeline" && typeof value === "function") {
        return wrapPipelineFactory(value);
      }
      if (typeof property === "string" && PIPELINE_CONSTRUCTOR_KEYS.has(property) && typeof value === "function") {
        return wrapPipelineConstructor(
          value
        );
      }
      return value;
    }
  });
  wrappedValues.set(transformers, proxy);
  wrappedValues.set(proxy, proxy);
  return proxy;
}
function isSupportedModule(value) {
  if (value === null || typeof value !== "object" && typeof value !== "function") {
    return false;
  }
  if (typeof Reflect.get(value, "pipeline") === "function") {
    return true;
  }
  for (const key of PIPELINE_CONSTRUCTOR_KEYS) {
    if (typeof Reflect.get(value, key) === "function") {
      return true;
    }
  }
  return false;
}
function wrapPipelineFactory(factory) {
  const existing = wrappedValues.get(factory);
  if (existing) {
    return existing;
  }
  const wrapped = function(...args) {
    const [task] = args;
    const context = {
      arguments: args
    };
    return _chunkMF7NU6BTjs.huggingFaceTransformersChannels.pipeline.tracePromise(() => Reflect.apply(factory, this, args), context).then((pipeline) => {
      if (_chunkMF7NU6BTjs.isSupportedHuggingFaceTransformersTask.call(void 0, _nullishCoalesce(pipeline.task, () => ( task)))) {
        return wrapPipeline(pipeline);
      }
      return pipeline;
    });
  };
  wrappedValues.set(factory, wrapped);
  wrappedValues.set(wrapped, wrapped);
  return wrapped;
}
function wrapPipelineConstructor(constructor) {
  const existing = wrappedValues.get(constructor);
  if (existing) {
    return existing;
  }
  const proxy = new Proxy(constructor, {
    construct(target, args, newTarget) {
      const pipeline = Reflect.construct(target, args, newTarget);
      if (_chunkMF7NU6BTjs.isSupportedHuggingFaceTransformersTask.call(void 0, pipeline.task)) {
        return wrapPipeline(pipeline);
      }
      return pipeline;
    }
  });
  wrappedValues.set(constructor, proxy);
  wrappedValues.set(proxy, proxy);
  return proxy;
}
function wrapPipeline(pipeline) {
  const existing = wrappedValues.get(pipeline);
  if (existing) {
    return existing;
  }
  const proxy = new Proxy(pipeline, {
    apply(target, thisArg, args) {
      const context = {
        arguments: args,
        self: target
      };
      return _chunkMF7NU6BTjs.huggingFaceTransformersChannels.pipelineCall.tracePromise(
        () => Reflect.apply(target, thisArg, args),
        context
      );
    }
  });
  wrappedValues.set(pipeline, proxy);
  wrappedValues.set(proxy, proxy);
  return proxy;
}

// src/wrappers/openrouter-agent.ts
function wrapOpenRouterAgent(agent) {
  const candidate = agent;
  if (candidate && typeof candidate === "object" && "callModel" in candidate && typeof candidate.callModel === "function") {
    return openRouterAgentProxy(candidate);
  }
  console.warn("Unsupported OpenRouter Agent library. Not wrapping.");
  return agent;
}
function openRouterAgentProxy(agent) {
  const cache = /* @__PURE__ */ new Map();
  return new Proxy(agent, {
    get(target, prop, receiver) {
      if (cache.has(prop)) {
        return cache.get(prop);
      }
      const value = Reflect.get(target, prop, receiver);
      if (prop === "callModel" && typeof value === "function") {
        const wrapped = wrapCallModel(
          value,
          target
        );
        cache.set(prop, wrapped);
        return wrapped;
      }
      if (typeof value === "function") {
        const bound = value.bind(target);
        cache.set(prop, bound);
        return bound;
      }
      return value;
    }
  });
}
function wrapCallModel(callModelFn, defaultThis) {
  return new Proxy(callModelFn, {
    apply(target, thisArg, argArray) {
      const request = cloneCallModelRequest(argArray[0]);
      const options = argArray[1];
      const invocationTarget = thisArg === void 0 ? _nullishCoalesce(defaultThis, () => ( thisArg)) : thisArg;
      return _chunkMF7NU6BTjs.openRouterAgentChannels.callModel.traceSync(
        () => Reflect.apply(target, invocationTarget, [request, options]),
        {
          arguments: [request]
        }
      );
    }
  });
}
function cloneCallModelRequest(request) {
  if (!request || typeof request !== "object") {
    return request;
  }
  return { ...request };
}

// src/wrappers/openrouter.ts
function wrapOpenRouter(openrouter) {
  const or = openrouter;
  if (or && typeof or === "object" && ("chat" in or && typeof or.chat === "object" && or.chat && "send" in or.chat && "embeddings" in or && typeof or.embeddings === "object" && or.embeddings && "generate" in or.embeddings || "rerank" in or && typeof or.rerank === "object" && or.rerank && "rerank" in or.rerank || "callModel" in or && typeof or.callModel === "function")) {
    return openRouterProxy(or);
  }
  console.warn("Unsupported OpenRouter library. Not wrapping.");
  return openrouter;
}
function openRouterProxy(openrouter) {
  return new Proxy(openrouter, {
    get(target, prop, receiver) {
      switch (prop) {
        case "chat":
          return target.chat ? chatProxy(target.chat) : target.chat;
        case "embeddings":
          return target.embeddings ? embeddingsProxy(target.embeddings) : target.embeddings;
        case "rerank":
          return target.rerank ? rerankProxy(target.rerank) : target.rerank;
        case "beta":
          return target.beta ? betaProxy2(target.beta) : target.beta;
        case "callModel":
          return typeof target.callModel === "function" ? wrapCallModel2(target.callModel.bind(target)) : target.callModel;
        default:
          return Reflect.get(target, prop, receiver);
      }
    }
  });
}
function betaProxy2(beta) {
  return new Proxy(beta, {
    get(target, prop, receiver) {
      if (prop === "responses") {
        return target.responses ? responsesProxy2(target.responses) : void 0;
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function chatProxy(chat) {
  return new Proxy(chat, {
    get(target, prop, receiver) {
      if (prop === "send") {
        return wrapChatSend(target.send.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function embeddingsProxy(embeddings) {
  return new Proxy(embeddings, {
    get(target, prop, receiver) {
      if (prop === "generate") {
        return wrapEmbeddingsGenerate(target.generate.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function responsesProxy2(responses) {
  return new Proxy(responses, {
    get(target, prop, receiver) {
      if (prop === "send") {
        return wrapResponsesSend(target.send.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function rerankProxy(rerank) {
  return new Proxy(rerank, {
    get(target, prop, receiver) {
      if (prop === "rerank") {
        return wrapRerank2(target.rerank.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapChatSend(send) {
  return (request, options) => _chunkMF7NU6BTjs.openRouterChannels.chatSend.tracePromise(() => send(request, options), {
    arguments: [request]
  });
}
function wrapEmbeddingsGenerate(generate) {
  return (request, options) => _chunkMF7NU6BTjs.openRouterChannels.embeddingsGenerate.tracePromise(
    () => generate(request, options),
    { arguments: [request] }
  );
}
function wrapResponsesSend(send) {
  return (request, options) => _chunkMF7NU6BTjs.openRouterChannels.betaResponsesSend.tracePromise(
    () => send(request, options),
    { arguments: [request] }
  );
}
function wrapRerank2(rerank) {
  return (request, options) => _chunkMF7NU6BTjs.openRouterChannels.rerankRerank.tracePromise(
    () => rerank(request, options),
    { arguments: [request] }
  );
}
function wrapCallModel2(callModel) {
  return (request, options) => {
    const tracedRequest = { ...request };
    return _chunkMF7NU6BTjs.openRouterChannels.callModel.traceSync(
      () => callModel(tracedRequest, options),
      {
        arguments: [tracedRequest]
      }
    );
  };
}

// src/wrappers/mistral.ts
function wrapMistral(mistral) {
  if (isSupportedMistralClient(mistral)) {
    return mistralProxy(mistral);
  }
  console.warn("Unsupported Mistral library. Not wrapping.");
  return mistral;
}
function isRecord2(value) {
  return typeof value === "object" && value !== null;
}
function hasFunction3(value, methodName) {
  return isRecord2(value) && methodName in value && typeof value[methodName] === "function";
}
function isSupportedMistralClient(value) {
  if (!isRecord2(value)) {
    return false;
  }
  return value.chat !== void 0 && hasChat(value.chat) || value.embeddings !== void 0 && hasEmbeddings(value.embeddings) || value.fim !== void 0 && hasFim(value.fim) || value.agents !== void 0 && hasAgents(value.agents) || value.classifiers !== void 0 && hasClassifiers(value.classifiers);
}
function hasChat(value) {
  return hasFunction3(value, "complete") && hasFunction3(value, "stream");
}
function hasEmbeddings(value) {
  return hasFunction3(value, "create");
}
function hasFim(value) {
  return hasFunction3(value, "complete") && hasFunction3(value, "stream");
}
function hasAgents(value) {
  return hasFunction3(value, "complete") && hasFunction3(value, "stream");
}
function hasClassifiers(value) {
  return hasFunction3(value, "moderate") && hasFunction3(value, "moderateChat");
}
function mistralProxy(mistral) {
  return new Proxy(mistral, {
    get(target, prop, receiver) {
      switch (prop) {
        case "chat":
          return target.chat ? chatProxy2(target.chat) : target.chat;
        case "fim":
          return target.fim ? fimProxy(target.fim) : target.fim;
        case "agents":
          return target.agents ? agentsProxy(target.agents) : target.agents;
        case "embeddings":
          return target.embeddings ? embeddingsProxy2(target.embeddings) : target.embeddings;
        case "classifiers":
          return target.classifiers ? classifiersProxy(target.classifiers) : target.classifiers;
        default:
          return Reflect.get(target, prop, receiver);
      }
    }
  });
}
function chatProxy2(chat) {
  return new Proxy(chat, {
    get(target, prop, receiver) {
      if (prop === "complete") {
        return wrapChatComplete(target.complete.bind(target));
      }
      if (prop === "stream") {
        return wrapChatStream(target.stream.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function embeddingsProxy2(embeddings) {
  return new Proxy(embeddings, {
    get(target, prop, receiver) {
      if (prop === "create") {
        return wrapEmbeddingsCreate(target.create.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function fimProxy(fim) {
  return new Proxy(fim, {
    get(target, prop, receiver) {
      if (prop === "complete") {
        return wrapFimComplete(target.complete.bind(target));
      }
      if (prop === "stream") {
        return wrapFimStream(target.stream.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function agentsProxy(agents) {
  return new Proxy(agents, {
    get(target, prop, receiver) {
      if (prop === "complete") {
        return wrapAgentsComplete(target.complete.bind(target));
      }
      if (prop === "stream") {
        return wrapAgentsStream(target.stream.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function classifiersProxy(classifiers) {
  return new Proxy(classifiers, {
    get(target, prop, receiver) {
      if (prop === "moderate") {
        return wrapClassifiersModerate(target.moderate.bind(target));
      }
      if (prop === "moderateChat") {
        return wrapClassifiersModerateChat(target.moderateChat.bind(target));
      }
      if (prop === "classify" && target.classify) {
        return wrapClassifiersClassify(target.classify.bind(target));
      }
      if (prop === "classifyChat" && target.classifyChat) {
        return wrapClassifiersClassifyChat(target.classifyChat.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
function wrapChatComplete(complete) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.chatComplete.tracePromise(
    () => complete(request, options),
    {
      arguments: [request]
    }
  );
}
function wrapChatStream(stream) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.chatStream.tracePromise(() => stream(request, options), {
    arguments: [request]
  });
}
function wrapEmbeddingsCreate(create) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.embeddingsCreate.tracePromise(
    () => create(request, options),
    { arguments: [request] }
  );
}
function wrapClassifiersModerate(moderate) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.classifiersModerate.tracePromise(
    () => moderate(request, options),
    { arguments: [request] }
  );
}
function wrapClassifiersModerateChat(moderateChat) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.classifiersModerateChat.tracePromise(
    () => moderateChat(request, options),
    { arguments: [request] }
  );
}
function wrapClassifiersClassify(classify) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.classifiersClassify.tracePromise(
    () => classify(request, options),
    { arguments: [request] }
  );
}
function wrapClassifiersClassifyChat(classifyChat) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.classifiersClassifyChat.tracePromise(
    () => classifyChat(request, options),
    { arguments: [request] }
  );
}
function wrapFimComplete(complete) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.fimComplete.tracePromise(() => complete(request, options), {
    arguments: [request]
  });
}
function wrapFimStream(stream) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.fimStream.tracePromise(() => stream(request, options), {
    arguments: [request]
  });
}
function wrapAgentsComplete(complete) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.agentsComplete.tracePromise(
    () => complete(request, options),
    {
      arguments: [request]
    }
  );
}
function wrapAgentsStream(stream) {
  return (request, options) => _chunkMF7NU6BTjs.mistralChannels.agentsStream.tracePromise(() => stream(request, options), {
    arguments: [request]
  });
}

// src/wrappers/ollama.ts
function wrapOllama(ollama) {
  if (isSupportedOllamaClient(ollama)) {
    return ollamaProxy(ollama);
  }
  _chunkQRHGVBKUjs.debugLogger.warn("Unsupported Ollama library. Not wrapping.");
  return ollama;
}
var ollamaProxyCache = /* @__PURE__ */ new WeakMap();
function isSupportedOllamaClient(value) {
  return _chunkQRHGVBKUjs.isObject.call(void 0, value) && ["chat", "generate", "embed"].some(
    (name) => typeof value[name] === "function"
  );
}
function ollamaProxy(ollama) {
  const cached = ollamaProxyCache.get(ollama);
  if (cached) {
    return cached;
  }
  let chatSource;
  let wrappedChat;
  let generateSource;
  let wrappedGenerate;
  let embedSource;
  let wrappedEmbed;
  const proxy = new Proxy(ollama, {
    get(target, prop, receiver) {
      switch (prop) {
        case "chat": {
          const source = target.chat;
          if (source !== chatSource) {
            chatSource = source;
            wrappedChat = typeof source === "function" ? wrapChat(source.bind(target)) : source;
          }
          return wrappedChat;
        }
        case "generate": {
          const source = target.generate;
          if (source !== generateSource) {
            generateSource = source;
            wrappedGenerate = typeof source === "function" ? wrapGenerate2(source.bind(target)) : source;
          }
          return wrappedGenerate;
        }
        case "embed": {
          const source = target.embed;
          if (source !== embedSource) {
            embedSource = source;
            wrappedEmbed = typeof source === "function" ? wrapEmbed3(source.bind(target)) : source;
          }
          return wrappedEmbed;
        }
        default:
          return Reflect.get(target, prop, receiver);
      }
    }
  });
  ollamaProxyCache.set(ollama, proxy);
  ollamaProxyCache.set(proxy, proxy);
  return proxy;
}
function wrapChat(chat) {
  return (request) => _chunkMF7NU6BTjs.ollamaChannels.chat.tracePromise(() => chat(request), {
    arguments: [request]
  });
}
function wrapGenerate2(generate) {
  return (request) => _chunkMF7NU6BTjs.ollamaChannels.generate.tracePromise(() => generate(request), {
    arguments: [request]
  });
}
function wrapEmbed3(embed) {
  return (request) => _chunkMF7NU6BTjs.ollamaChannels.embed.tracePromise(() => embed(request), {
    arguments: [request]
  });
}

// src/wrappers/cohere.ts
function wrapCohere(cohere) {
  if (isSupportedCohereClient(cohere)) {
    return cohereProxy(cohere);
  }
  console.warn("Unsupported Cohere library. Not wrapping.");
  return cohere;
}
var cohereProxyCache = /* @__PURE__ */ new WeakMap();
function isRecord3(value) {
  return typeof value === "object" && value !== null;
}
function hasFunction4(value, methodName) {
  return isRecord3(value) && methodName in value && typeof value[methodName] === "function";
}
function isSupportedCohereClient(value) {
  if (!isRecord3(value)) {
    return false;
  }
  return hasFunction4(value, "chat") || hasFunction4(value, "chatStream") || hasFunction4(value, "embed") || hasFunction4(value, "rerank");
}
function cohereProxy(cohere) {
  const cached = cohereProxyCache.get(cohere);
  if (cached) {
    return cached;
  }
  const proxy = new Proxy(cohere, {
    get(target, prop, receiver) {
      switch (prop) {
        case "chat":
          return typeof target.chat === "function" ? wrapChat2(target.chat.bind(target)) : target.chat;
        case "chatStream":
          return typeof target.chatStream === "function" ? wrapChatStream2(target.chatStream.bind(target)) : target.chatStream;
        case "embed":
          return typeof target.embed === "function" ? wrapEmbed4(target.embed.bind(target)) : target.embed;
        case "rerank":
          return typeof target.rerank === "function" ? wrapRerank3(target.rerank.bind(target)) : target.rerank;
        default: {
          const value = Reflect.get(target, prop, receiver);
          return isSupportedCohereClient(value) ? cohereProxy(value) : value;
        }
      }
    }
  });
  cohereProxyCache.set(cohere, proxy);
  return proxy;
}
function wrapChat2(chat) {
  return (request, options) => _chunkMF7NU6BTjs.cohereChannels.chat.tracePromise(() => chat(request, options), {
    arguments: [request]
  });
}
function wrapChatStream2(chatStream) {
  return (request, options) => _chunkMF7NU6BTjs.cohereChannels.chatStream.tracePromise(() => chatStream(request, options), {
    arguments: [request]
  });
}
function wrapEmbed4(embed) {
  return (request, options) => _chunkMF7NU6BTjs.cohereChannels.embed.tracePromise(() => embed(request, options), {
    arguments: [request]
  });
}
function wrapRerank3(rerank) {
  return (request, options) => _chunkMF7NU6BTjs.cohereChannels.rerank.tracePromise(() => rerank(request, options), {
    arguments: [request]
  });
}

// src/wrappers/groq.ts
function wrapGroq(groq) {
  if (isSupportedGroqClient(groq)) {
    return groqProxy(groq);
  }
  console.warn("Unsupported Groq library. Not wrapping.");
  return groq;
}
function isRecord4(value) {
  return typeof value === "object" && value !== null;
}
function hasFunction5(value, methodName) {
  return isRecord4(value) && methodName in value && typeof value[methodName] === "function";
}
function hasChat2(value) {
  return isRecord4(value) && isRecord4(value.completions) && hasFunction5(value.completions, "create");
}
function hasEmbeddings2(value) {
  return hasFunction5(value, "create");
}
function isSupportedGroqClient(value) {
  return isRecord4(value) && (value.chat !== void 0 && hasChat2(value.chat) || value.embeddings !== void 0 && hasEmbeddings2(value.embeddings));
}
function groqProxy(groq) {
  const privateMethodWorkaroundCache = /* @__PURE__ */ new WeakMap();
  const completionProxy = _optionalChain([groq, 'access', _125 => _125.chat, 'optionalAccess', _126 => _126.completions]) ? new Proxy(groq.chat.completions, {
    get(target, prop, receiver) {
      if (prop === "create") {
        return wrapChatCompletionsCreate(target.create.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  }) : void 0;
  const chatProxy3 = groq.chat ? new Proxy(groq.chat, {
    get(target, prop, receiver) {
      if (prop === "completions") {
        return _nullishCoalesce(completionProxy, () => ( target.completions));
      }
      return Reflect.get(target, prop, receiver);
    }
  }) : void 0;
  const embeddingsProxy3 = groq.embeddings ? new Proxy(groq.embeddings, {
    get(target, prop, receiver) {
      if (prop === "create") {
        return wrapEmbeddingsCreate2(target.create.bind(target));
      }
      return Reflect.get(target, prop, receiver);
    }
  }) : void 0;
  const topLevelProxy = new Proxy(groq, {
    get(target, prop, receiver) {
      switch (prop) {
        case "chat":
          return _nullishCoalesce(chatProxy3, () => ( target.chat));
        case "embeddings":
          return _nullishCoalesce(embeddingsProxy3, () => ( target.embeddings));
      }
      const value = Reflect.get(target, prop, target);
      if (typeof value !== "function") {
        return value;
      }
      const cachedValue = privateMethodWorkaroundCache.get(value);
      if (cachedValue) {
        return cachedValue;
      }
      const thisBoundValue = function(...args) {
        const thisArg = this === topLevelProxy ? target : this;
        const output = Reflect.apply(value, thisArg, args);
        return output === target ? topLevelProxy : output;
      };
      privateMethodWorkaroundCache.set(value, thisBoundValue);
      return thisBoundValue;
    }
  });
  return topLevelProxy;
}
function wrapChatCompletionsCreate(create) {
  return (request, options) => _chunkMF7NU6BTjs.groqChannels.chatCompletionsCreate.tracePromise(
    () => create(request, options),
    { arguments: [request] }
  );
}
function wrapEmbeddingsCreate2(create) {
  return (request, options) => _chunkMF7NU6BTjs.groqChannels.embeddingsCreate.tracePromise(() => create(request, options), {
    arguments: [request]
  });
}

// src/wrappers/bedrock-runtime.ts
function wrapBedrockRuntime(client) {
  if (isSupportedBedrockRuntimeClient(client)) {
    return bedrockRuntimeProxy(client);
  }
  console.warn("Unsupported Bedrock Runtime library. Not wrapping.");
  return client;
}
var bedrockRuntimeProxyCache = /* @__PURE__ */ new WeakMap();
var BEDROCK_RUNTIME_OPERATION_METHODS = /* @__PURE__ */ new Set([
  "converse",
  "converseStream",
  "invokeModel",
  "invokeModelWithBidirectionalStream",
  "invokeModelWithResponseStream"
]);
function isRecord5(value) {
  return typeof value === "object" && value !== null;
}
function isSupportedBedrockRuntimeClient(value) {
  return isRecord5(value) && typeof value.send === "function";
}
function bedrockRuntimeProxy(client) {
  const cached = bedrockRuntimeProxyCache.get(client);
  if (cached) {
    return cached;
  }
  const privateMethodWorkaroundCache = /* @__PURE__ */ new WeakMap();
  const operationMethodCache = /* @__PURE__ */ new WeakMap();
  const proxy = new Proxy(client, {
    get(target, prop, receiver) {
      if (prop === "send") {
        return wrapSend(target.send.bind(target));
      }
      const value = Reflect.get(target, prop, receiver);
      if (typeof value !== "function") {
        return value;
      }
      if (typeof prop === "string" && BEDROCK_RUNTIME_OPERATION_METHODS.has(prop)) {
        const cachedValue2 = operationMethodCache.get(value);
        if (cachedValue2) {
          return cachedValue2;
        }
        const thisBoundValue2 = function(...args) {
          const thisArg = this === proxy ? proxy : this;
          const output = Reflect.apply(value, thisArg, args);
          return output === target ? proxy : output;
        };
        operationMethodCache.set(value, thisBoundValue2);
        return thisBoundValue2;
      }
      const cachedValue = privateMethodWorkaroundCache.get(value);
      if (cachedValue) {
        return cachedValue;
      }
      const thisBoundValue = function(...args) {
        const thisArg = this === proxy ? target : this;
        const output = Reflect.apply(value, thisArg, args);
        return output === target ? proxy : output;
      };
      privateMethodWorkaroundCache.set(value, thisBoundValue);
      return thisBoundValue;
    }
  });
  bedrockRuntimeProxyCache.set(client, proxy);
  return proxy;
}
function wrapSend(send) {
  return (command, optionsOrCb, cb) => {
    if (_chunkQRHGVBKUjs.getBedrockRuntimeOperation.call(void 0, command) === void 0 || typeof optionsOrCb === "function" || typeof cb === "function") {
      return send(command, optionsOrCb, cb);
    }
    return _chunkMF7NU6BTjs.bedrockRuntimeChannels.clientSend.tracePromise(
      () => _chunkQRHGVBKUjs.runWithAutoInstrumentationSuppressed.call(void 0, 
        () => send(command, optionsOrCb)
      ),
      {
        arguments: [command, optionsOrCb],
        span_info: _chunkQRHGVBKUjs.buildBedrockRuntimeSpanInfo.call(void 0, command)
      }
    );
  };
}

// src/wrappers/github-copilot.ts
function isGitHubCopilotClient(value) {
  return value !== null && typeof value === "object" && typeof value.createSession === "function" && typeof value.resumeSession === "function";
}
function wrapCopilotClient(client) {
  if (!isGitHubCopilotClient(client)) {
    console.warn(
      "[Braintrust] wrapCopilotClient: argument does not look like a CopilotClient. Not wrapping."
    );
    return client;
  }
  return copilotClientProxy(client);
}
function copilotClientProxy(client) {
  const privateMethodCache = /* @__PURE__ */ new WeakMap();
  const proxy = new Proxy(client, {
    get(target, prop, receiver) {
      if (prop === "createSession") {
        return wrappedCreateSession(target);
      }
      if (prop === "resumeSession") {
        return wrappedResumeSession(target);
      }
      const value = Reflect.get(target, prop, target);
      if (typeof value !== "function") {
        return value;
      }
      const cached = privateMethodCache.get(value);
      if (cached) {
        return cached;
      }
      const bound = function(...args) {
        const thisArg = this === proxy ? target : this;
        const result = Reflect.apply(value, thisArg, args);
        return result === target ? proxy : result;
      };
      privateMethodCache.set(value, bound);
      return bound;
    }
  });
  return proxy;
}
function wrappedCreateSession(client) {
  return (config) => _chunkMF7NU6BTjs.gitHubCopilotChannels.createSession.tracePromise(
    () => client.createSession(config),
    { arguments: [config] }
  );
}
function wrappedResumeSession(client) {
  return (sessionId, config) => _chunkMF7NU6BTjs.gitHubCopilotChannels.resumeSession.tracePromise(
    () => client.resumeSession(sessionId, config),
    { arguments: [sessionId, config] }
  );
}

// src/wrappers/langsmith.ts
var WRAPPED_CLIENT_CLASS = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-client-class"
);
var WRAPPED_CLIENT_INSTANCE = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-client-instance"
);
var WRAPPED_CLIENT_NAMESPACE = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-client-namespace"
);
var WRAPPED_RUN_TREE_CLASS = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-run-tree-class"
);
var WRAPPED_RUN_TREE_INSTANCE = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-run-tree-instance"
);
var WRAPPED_RUN_TREES_NAMESPACE = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-run-trees-namespace"
);
var WRAPPED_TRACEABLE = /* @__PURE__ */ Symbol.for("braintrust.langsmith.wrapped-traceable");
var WRAPPED_TRACEABLE_NAMESPACE = /* @__PURE__ */ Symbol.for(
  "braintrust.langsmith.wrapped-traceable-namespace"
);
function wrapLangSmithTraceable(namespace) {
  return wrapNamespaceExport(
    namespace,
    "traceable",
    WRAPPED_TRACEABLE_NAMESPACE,
    (value) => wrapTraceable(value)
  );
}
function wrapLangSmithRunTrees(namespace) {
  return wrapNamespaceExport(
    namespace,
    "RunTree",
    WRAPPED_RUN_TREES_NAMESPACE,
    (value) => wrapRunTreeClass(value)
  );
}
function wrapLangSmithClient(namespace) {
  return wrapNamespaceExport(
    namespace,
    "Client",
    WRAPPED_CLIENT_NAMESPACE,
    (value) => wrapClientClass(value)
  );
}
function wrapNamespaceExport(namespace, exportName, marker, wrap2) {
  if (!namespace || typeof namespace !== "object") {
    return namespace;
  }
  const candidate = namespace;
  if (candidate[marker] === true) {
    return namespace;
  }
  if (typeof candidate[exportName] !== "function") {
    console.warn(
      `Unsupported LangSmith ${exportName} namespace. Not wrapping.`
    );
    return namespace;
  }
  const target = isModuleNamespace6(namespace) ? Object.setPrototypeOf({}, namespace) : candidate;
  const moduleNamespace = target !== candidate;
  let wrappedExport;
  return new Proxy(target, {
    get(target2, prop, receiver) {
      if (prop === marker) {
        return true;
      }
      const value = Reflect.get(target2, prop, receiver);
      if (prop !== exportName || typeof value !== "function") {
        return value;
      }
      wrappedExport ??= wrap2(value);
      return wrappedExport;
    },
    getOwnPropertyDescriptor(target2, prop) {
      const descriptor = Reflect.getOwnPropertyDescriptor(target2, prop);
      if (descriptor || !moduleNamespace) {
        return descriptor;
      }
      const namespaceDescriptor = Reflect.getOwnPropertyDescriptor(
        candidate,
        prop
      );
      return namespaceDescriptor ? { ...namespaceDescriptor, configurable: true } : void 0;
    },
    has(target2, prop) {
      return Reflect.has(target2, prop) || moduleNamespace && prop in candidate;
    },
    ownKeys(target2) {
      return moduleNamespace ? Reflect.ownKeys(candidate) : Reflect.ownKeys(target2);
    }
  });
}
function isModuleNamespace6(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (_optionalChain([value, 'access', _127 => _127.constructor, 'optionalAccess', _128 => _128.name]) === "Module") {
    return true;
  }
  const firstKey = Object.keys(value)[0];
  if (!firstKey) {
    return false;
  }
  const descriptor = Object.getOwnPropertyDescriptor(value, firstKey);
  return descriptor ? !descriptor.configurable && !descriptor.writable : false;
}
function wrapTraceable(traceable2) {
  if (traceable2[WRAPPED_TRACEABLE]) {
    return traceable2;
  }
  return new Proxy(traceable2, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_TRACEABLE) {
        return true;
      }
      return Reflect.get(target, prop, receiver);
    },
    apply(target, thisArg, argArray) {
      const [fn, rawConfig] = argArray;
      const config = rawConfig && typeof rawConfig === "object" ? rawConfig : void 0;
      const originalOnEnd = _optionalChain([config, 'optionalAccess', _129 => _129.on_end]);
      const wrappedConfig = {
        ...config,
        on_end(runTree) {
          publishRunUpdate(runTree);
          if (originalOnEnd) {
            Reflect.apply(originalOnEnd, config, [runTree]);
          }
        }
      };
      return Reflect.apply(target, thisArg, [fn, wrappedConfig]);
    }
  });
}
function wrapRunTreeClass(RunTree) {
  if (RunTree[WRAPPED_RUN_TREE_CLASS]) {
    return RunTree;
  }
  return new Proxy(RunTree, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_RUN_TREE_CLASS) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
    construct(target, args, newTarget) {
      return wrapRunTreeInstance(Reflect.construct(target, args, newTarget));
    }
  });
}
function wrapRunTreeInstance(runTree) {
  if (runTree[WRAPPED_RUN_TREE_INSTANCE]) {
    return runTree;
  }
  return new Proxy(runTree, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_RUN_TREE_INSTANCE) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (typeof value !== "function") {
        return value;
      }
      let wrapped;
      if (prop === "createChild") {
        wrapped = (...args) => wrapRunTreeInstance(Reflect.apply(value, target, args));
      } else if (prop === "postRun") {
        const method = value;
        wrapped = (...args) => _chunkMF7NU6BTjs.langSmithChannels.createRun.tracePromise(
          () => Reflect.apply(method, target, args),
          { arguments: [target] }
        );
      } else if (prop === "patchRun") {
        const method = value;
        wrapped = (...args) => _chunkMF7NU6BTjs.langSmithChannels.updateRun.tracePromise(
          () => Reflect.apply(method, target, args),
          {
            arguments: [
              typeof target.id === "string" ? target.id : "",
              target
            ]
          }
        );
      } else {
        wrapped = value.bind(target);
      }
      return wrapped;
    }
  });
}
function wrapClientClass(Client) {
  if (Client[WRAPPED_CLIENT_CLASS]) {
    return Client;
  }
  return new Proxy(Client, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_CLIENT_CLASS) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
    construct(target, args, newTarget) {
      return wrapClientInstance(Reflect.construct(target, args, newTarget));
    }
  });
}
function wrapClientInstance(client) {
  if (client[WRAPPED_CLIENT_INSTANCE]) {
    return client;
  }
  return new Proxy(client, {
    get(target, prop, receiver) {
      if (prop === WRAPPED_CLIENT_INSTANCE) {
        return true;
      }
      const value = Reflect.get(target, prop, receiver);
      if (typeof value !== "function") {
        return value;
      }
      let wrapped;
      if (prop === "createRun") {
        const method = value;
        wrapped = (...args) => _chunkMF7NU6BTjs.langSmithChannels.createRun.tracePromise(
          () => Reflect.apply(method, target, args),
          { arguments: args }
        );
      } else if (prop === "updateRun") {
        const method = value;
        wrapped = (...args) => _chunkMF7NU6BTjs.langSmithChannels.updateRun.tracePromise(
          () => Reflect.apply(method, target, args),
          { arguments: args }
        );
      } else if (prop === "batchIngestRuns") {
        const method = value;
        wrapped = (...args) => _chunkMF7NU6BTjs.langSmithChannels.batchIngestRuns.tracePromise(
          () => Reflect.apply(method, target, args),
          { arguments: args }
        );
      } else {
        wrapped = value.bind(target);
      }
      return wrapped;
    }
  });
}
function publishRunUpdate(runTree) {
  if (!runTree || typeof runTree.id !== "string" || !runTree.id) {
    return;
  }
  try {
    void _chunkMF7NU6BTjs.langSmithChannels.updateRun.tracePromise(() => Promise.resolve(void 0), {
      arguments: [runTree.id, runTree]
    }).catch((error) => {
      _chunkQRHGVBKUjs.debugLogger.error("LangSmith traceable instrumentation failed:", error);
    });
  } catch (error) {
    _chunkQRHGVBKUjs.debugLogger.error("LangSmith traceable instrumentation failed:", error);
  }
}

// src/wrappers/vitest/context-manager.ts
var VitestContextManager = class {
  /**
   * AsyncLocalStorage for experiment context isolation.
   * Each async execution flow (test, concurrent test, worker thread) gets its own context.
   */
  
  constructor() {
    this.contextStorage = _chunkMF7NU6BTjs.isomorph_default.newAsyncLocalStorage();
  }
  getCurrentContext() {
    return this.contextStorage.getStore();
  }
  setContext(context) {
    this.contextStorage.enterWith(context);
  }
  runInContext(context, callback) {
    return this.contextStorage.run(context, callback);
  }
  createChildContext(dataset, experiment) {
    const parent = this.getCurrentContext();
    return {
      dataset,
      experiment,
      datasetExamples: /* @__PURE__ */ new Map(),
      parent,
      flushResolved: true,
      passed: 0,
      failed: 0
    };
  }
};
var _contextManager;
function getVitestContextManager() {
  if (!_contextManager) {
    _contextManager = new VitestContextManager();
  }
  return _contextManager;
}

// src/wrappers/vitest/flush-manager.ts
var FlushCoordinator = (_class2 = class {constructor() { _class2.prototype.__init5.call(this); }
  __init5() {this.activeFlushes = /* @__PURE__ */ new Map()}
  async coordinateFlush(context, config) {
    if (!context) return;
    const experimentId = await context.experiment.id;
    if (this.activeFlushes.has(experimentId)) {
      return this.activeFlushes.get(experimentId);
    }
    const flushPromise = _chunkQRHGVBKUjs.summarizeAndFlush.call(void 0, context.experiment, {
      displaySummary: config.displaySummary
    });
    this.activeFlushes.set(experimentId, flushPromise);
    try {
      await flushPromise;
    } finally {
      this.activeFlushes.delete(experimentId);
    }
  }
}, _class2);
var flushCoordinator = new FlushCoordinator();
async function flushExperimentWithSync(context, config) {
  return flushCoordinator.coordinateFlush(context, config);
}

// src/wrappers/shared/scorers.ts
async function runScorers(args) {
  const { scorers, output, expected, input, metadata, span } = args;
  const scorerArgs = {
    output,
    expected,
    input,
    metadata: metadata || {}
  };
  await Promise.all(
    scorers.map(async (scorer) => {
      try {
        const result = await scorer(scorerArgs);
        const scores = normalizeScores(result);
        if (scores.length > 0) {
          const accScores = {};
          let accMetadata = {};
          for (const score of scores) {
            accScores[score.name] = score.score;
            if (score.metadata && Object.keys(score.metadata).length > 0) {
              accMetadata = { ...accMetadata, ...score.metadata };
            }
          }
          span.log({
            scores: accScores,
            ...Object.keys(accMetadata).length > 0 ? { metadata: accMetadata } : {}
          });
        }
      } catch (scorerError) {
        console.warn("Braintrust: Scorer failed:", scorerError);
        const errorStr = scorerError instanceof Error ? `${scorerError.message}

${scorerError.stack || ""}` : String(scorerError);
        span.log({ metadata: { scorer_error: errorStr } });
      }
    })
  );
}
function isScore(val) {
  return "name" in val && "score" in val;
}
function normalizeScores(result) {
  if (result === null || result === void 0) {
    return [];
  }
  if (typeof result === "number") {
    return [{ name: "score", score: result }];
  }
  if (Array.isArray(result)) {
    return result.filter(
      (s) => s !== null && s !== void 0 && typeof s === "object" && isScore(s)
    );
  }
  if (typeof result === "object" && result !== null && isScore(result)) {
    return [result];
  }
  return [];
}

// src/wrappers/shared/traced-eval.ts
async function runTracedEval(args) {
  return args.experiment.traced(
    async (span) => {
      let testResult;
      let testError;
      try {
        testResult = await args.fn();
      } catch (error) {
        testError = error;
      }
      if (args.scorers && args.scorers.length > 0) {
        await runScorers({
          scorers: args.scorers,
          output: testResult,
          expected: args.expected,
          input: args.input,
          metadata: args.metadata,
          span
        });
      }
      if (testError) {
        span.log({ scores: { pass: 0 } });
        _chunkQRHGVBKUjs.logError.call(void 0, span, testError);
        throw testError;
      }
      span.log({
        scores: { pass: 1 },
        ...testResult !== void 0 ? { output: testResult } : {}
      });
      return testResult;
    },
    {
      name: args.spanName,
      spanAttributes: {
        type: "task" /* TASK */
      },
      event: {
        input: args.input,
        expected: args.expected,
        metadata: args.metadata,
        tags: args.tags
      }
    }
  );
}

// src/wrappers/vitest/wrapper.ts
function getExperimentContext() {
  return _nullishCoalesce(getVitestContextManager().getCurrentContext(), () => ( null));
}
function wrapTest(originalTest, config) {
  const wrapBare = (testFn) => {
    const wrapped = function(name, configOrFn, maybeFn) {
      const isEnhanced = typeof configOrFn !== "function";
      const testConfig = isEnhanced ? configOrFn : void 0;
      if (isEnhanced && _optionalChain([testConfig, 'optionalAccess', _130 => _130.data]) && Array.isArray(testConfig.data)) {
        const dataRecords = testConfig.data;
        const testFn2 = maybeFn;
        if (!testFn2) {
          throw new Error(
            "Braintrust: test function required when using data array"
          );
        }
        dataRecords.forEach((record, index) => {
          const mergedConfig = {
            ...testConfig,
            input: record.input,
            expected: record.expected,
            metadata: { ...testConfig.metadata, ...record.metadata },
            tags: [...testConfig.tags || [], ...record.tags || []],
            data: void 0
          };
          wrappedTest(`${name} [${index}]`, mergedConfig, testFn2);
        });
        return;
      }
      let vitestOptions;
      if (testConfig) {
        const {
          input: _input,
          expected: _expected,
          metadata: _metadata,
          tags: _tags,
          scorers: _scorers,
          data: _data,
          ...rest
        } = testConfig;
        vitestOptions = rest;
      }
      const hasVitestOptions = vitestOptions && Object.keys(vitestOptions).length > 0;
      const registrationContext = getExperimentContext();
      const testImplementation = async (vitestContext) => {
        const experimentContext = _nullishCoalesce(getExperimentContext(), () => ( registrationContext));
        const experiment = _optionalChain([experimentContext, 'optionalAccess', _131 => _131.experiment]);
        if (config.onProgress) {
          config.onProgress({ type: "test_start", testName: name });
        }
        const startTime = performance.now();
        let passed = false;
        try {
          if (!experiment) {
            if (testConfig && maybeFn) {
              const params = {
                input: testConfig.input,
                expected: testConfig.expected,
                metadata: testConfig.metadata
              };
              const context = {
                ...vitestContext,
                ...params
              };
              const result2 = await maybeFn(context);
              passed = true;
              return result2;
            } else if (typeof configOrFn === "function") {
              const result2 = await configOrFn(vitestContext);
              passed = true;
              return result2;
            }
            passed = true;
            return;
          }
          const result = await runTracedEval({
            experiment,
            spanName: name,
            input: _optionalChain([testConfig, 'optionalAccess', _132 => _132.input]),
            expected: _optionalChain([testConfig, 'optionalAccess', _133 => _133.expected]),
            metadata: _optionalChain([testConfig, 'optionalAccess', _134 => _134.metadata]),
            tags: _optionalChain([testConfig, 'optionalAccess', _135 => _135.tags]),
            scorers: _optionalChain([testConfig, 'optionalAccess', _136 => _136.scorers]),
            fn: async () => {
              if (testConfig && maybeFn) {
                const params = {
                  input: testConfig.input,
                  expected: testConfig.expected,
                  metadata: testConfig.metadata
                };
                const context = {
                  ...vitestContext,
                  ...params
                };
                return await maybeFn(context);
              } else if (typeof configOrFn === "function") {
                return await configOrFn(vitestContext);
              }
            }
          });
          passed = true;
          return result;
        } catch (error) {
          passed = false;
          throw error;
        } finally {
          const duration = performance.now() - startTime;
          if (experimentContext) {
            if (passed) {
              experimentContext.passed = (_nullishCoalesce(experimentContext.passed, () => ( 0))) + 1;
            } else {
              experimentContext.failed = (_nullishCoalesce(experimentContext.failed, () => ( 0))) + 1;
            }
          }
          if (config.onProgress) {
            config.onProgress({
              type: "test_complete",
              testName: name,
              passed,
              duration
            });
          }
        }
      };
      return testFn(
        name,
        hasVitestOptions ? vitestOptions : void 0,
        testImplementation
      );
    };
    return wrapped;
  };
  const wrappedTest = wrapBare(originalTest);
  wrappedTest.skip = wrapBare(originalTest.skip);
  wrappedTest.only = wrapBare(originalTest.only);
  wrappedTest.concurrent = wrapBare(originalTest.concurrent);
  if (originalTest.todo) wrappedTest.todo = originalTest.todo;
  if (originalTest.each) wrappedTest.each = originalTest.each;
  return wrappedTest;
}
function wrapDescribe(originalDescribe, config, afterAll) {
  const wrapBare = (describeFn) => {
    const wrapped = function(suiteName, factory) {
      return describeFn(suiteName, () => {
        const contextManager = getVitestContextManager();
        let context = null;
        const getOrCreateContext = () => {
          if (!context) {
            const experimentName = `${suiteName}-${(/* @__PURE__ */ new Date()).toISOString()}`;
            const experiment = config.projectId ? _chunkQRHGVBKUjs.initExperiment.call(void 0, {
              projectId: config.projectId,
              experiment: experimentName
            }) : _chunkQRHGVBKUjs.initExperiment.call(void 0, config.projectName || suiteName, {
              experiment: experimentName
            });
            context = contextManager.createChildContext(void 0, experiment);
          }
          return context;
        };
        const lazyContext = {
          get dataset() {
            return getOrCreateContext().dataset;
          },
          get experiment() {
            return getOrCreateContext().experiment;
          },
          get datasetExamples() {
            return getOrCreateContext().datasetExamples;
          },
          get parent() {
            return getOrCreateContext().parent;
          },
          get flushPromise() {
            return getOrCreateContext().flushPromise;
          },
          set flushPromise(value) {
            if (context) context.flushPromise = value;
          },
          get flushResolved() {
            return getOrCreateContext().flushResolved;
          },
          set flushResolved(value) {
            if (context) context.flushResolved = value;
          }
        };
        if (config.onProgress) {
          config.onProgress({ type: "suite_start", suiteName });
        }
        contextManager.setContext(lazyContext);
        factory();
        if (afterAll) {
          afterAll(async () => {
            await flushExperimentWithSync(context, config);
            if (config.onProgress) {
              config.onProgress({
                type: "suite_complete",
                suiteName,
                passed: _nullishCoalesce(_optionalChain([context, 'optionalAccess', _137 => _137.passed]), () => ( 0)),
                failed: _nullishCoalesce(_optionalChain([context, 'optionalAccess', _138 => _138.failed]), () => ( 0))
              });
            }
          });
        }
      });
    };
    return wrapped;
  };
  const wrappedDescribe = wrapBare(originalDescribe);
  wrappedDescribe.skip = wrapBare(originalDescribe.skip);
  wrappedDescribe.only = wrapBare(originalDescribe.only);
  wrappedDescribe.concurrent = wrapBare(originalDescribe.concurrent);
  if (originalDescribe.todo) wrappedDescribe.todo = originalDescribe.todo;
  if (originalDescribe.each)
    wrappedDescribe.each = originalDescribe.each;
  return wrappedDescribe;
}

// src/wrappers/vitest/expect-wrapper.ts
function proxyAssertion(assertion, value, key, span) {
  return new Proxy(assertion, {
    get(target, prop, receiver) {
      const original = Reflect.get(target, prop, receiver);
      if (typeof original === "function") {
        return function(...args) {
          let result;
          try {
            result = original.apply(target, args);
          } catch (err) {
            span.log({ output: { [key]: value }, scores: { [key]: 0 } });
            throw err;
          }
          if (result !== null && typeof result === "object" && "then" in result && typeof Reflect.get(result, "then") === "function") {
            return Promise.resolve(result).then(
              (v) => {
                span.log({ output: { [key]: value }, scores: { [key]: 1 } });
                return v;
              },
              (err) => {
                span.log({ output: { [key]: value }, scores: { [key]: 0 } });
                throw err;
              }
            );
          }
          span.log({ output: { [key]: value }, scores: { [key]: 1 } });
          return result;
        };
      }
      if (original !== null && typeof original === "object") {
        return proxyAssertion(original, value, key, span);
      }
      return original;
    }
  });
}
function wrapExpect(originalExpect) {
  const wrapped = function(value, message) {
    if (message === void 0) {
      return originalExpect(value);
    }
    const assertion = originalExpect(value, message);
    const span = _chunkQRHGVBKUjs.currentSpan.call(void 0, );
    if (!span) {
      return assertion;
    }
    if (assertion === null || typeof assertion !== "object") return assertion;
    return proxyAssertion(assertion, value, message, span);
  };
  return Object.assign(wrapped, originalExpect);
}

// src/wrappers/shared/logging.ts
function logOutputs(outputs) {
  _chunkQRHGVBKUjs.currentSpan.call(void 0, ).log({ output: outputs });
}
function logFeedback(feedback) {
  _chunkQRHGVBKUjs.currentSpan.call(void 0, ).log({
    scores: { [feedback.name]: feedback.score },
    metadata: feedback.metadata
  });
}
function getCurrentSpan() {
  return _chunkQRHGVBKUjs.currentSpan.call(void 0, );
}

// src/wrappers/vitest/index.ts
function wrapVitest(vitestMethods, config = {}) {
  if (!vitestMethods.test) {
    throw new Error(
      "Braintrust: vitestMethods.test is required. Please pass in the test function from vitest."
    );
  }
  if (!vitestMethods.describe) {
    throw new Error(
      "Braintrust: vitestMethods.describe is required. Please pass in the describe function from vitest."
    );
  }
  if (!vitestMethods.expect) {
    throw new Error(
      "Braintrust: vitestMethods.expect is required. Please pass in the expect function from vitest."
    );
  }
  const wrappedTest = wrapTest(vitestMethods.test, config);
  const wrappedDescribe = wrapDescribe(
    vitestMethods.describe,
    config,
    vitestMethods.afterAll
  );
  return {
    test: wrappedTest,
    it: wrappedTest,
    expect: wrapExpect(vitestMethods.expect),
    describe: wrappedDescribe,
    beforeAll: vitestMethods.beforeAll || (() => {
    }),
    afterAll: vitestMethods.afterAll || (() => {
    }),
    beforeEach: vitestMethods.beforeEach,
    afterEach: vitestMethods.afterEach,
    logOutputs,
    logFeedback,
    getCurrentSpan,
    flushExperiment: async (options) => {
      const ctx = getExperimentContext();
      if (!ctx) {
        console.warn(
          "Braintrust: No experiment context found. Make sure you're using bt.describe() and calling flushExperiment() within an afterAll() hook."
        );
        return;
      }
      await _chunkQRHGVBKUjs.summarizeAndFlush.call(void 0, ctx.experiment, {
        displaySummary: _nullishCoalesce(_optionalChain([options, 'optionalAccess', _139 => _139.displaySummary]), () => ( config.displaySummary))
      });
    }
  };
}

// src/wrappers/node-test/suite.ts
function initNodeTestSuite(config) {
  let experiment;
  const getOrCreateExperiment = () => {
    if (experiment) {
      return experiment;
    }
    const experimentName = config.experimentName || `${config.projectName}-${(/* @__PURE__ */ new Date()).toISOString()}`;
    experiment = _chunkQRHGVBKUjs.initExperiment.call(void 0, config.projectName, {
      experiment: experimentName
    });
    return experiment;
  };
  function evalFunc(evalConfig, fn) {
    return async (t) => {
      const exp = getOrCreateExperiment();
      const spanName = _nullishCoalesce(_nullishCoalesce(evalConfig.name, () => ( t.name)), () => ( "unnamed test"));
      if (config.onProgress) {
        config.onProgress({ type: "test_start", testName: spanName });
      }
      const startTime = performance.now();
      let passed = false;
      try {
        await runTracedEval({
          experiment: exp,
          spanName,
          input: evalConfig.input,
          expected: evalConfig.expected,
          metadata: evalConfig.metadata,
          tags: evalConfig.tags,
          scorers: evalConfig.scorers,
          fn: () => fn({
            input: evalConfig.input,
            expected: evalConfig.expected,
            metadata: evalConfig.metadata
          })
        });
        passed = true;
      } catch (error) {
        passed = false;
        throw error;
      } finally {
        if (config.onProgress) {
          config.onProgress({
            type: "test_complete",
            testName: spanName,
            passed,
            duration: performance.now() - startTime
          });
        }
      }
    };
  }
  async function flush2() {
    if (!experiment) {
      return;
    }
    await _chunkQRHGVBKUjs.summarizeAndFlush.call(void 0, experiment, {
      displaySummary: config.displaySummary
    });
    experiment = void 0;
  }
  const suite = {
    eval: evalFunc,
    flush: flush2
  };
  if (config.after) {
    config.after(() => suite.flush());
  }
  return suite;
}

// src/graph-framework.ts
var graph_framework_exports = {};
_chunkMF7NU6BTjs.__export.call(void 0, graph_framework_exports, {
  AggregatorNode: () => AggregatorNode,
  GateNode: () => GateNode,
  GraphBuilder: () => GraphBuilder,
  InputNode: () => InputNode,
  LiteralNode: () => LiteralNode,
  OutputNode: () => OutputNode,
  PromptNode: () => PromptNode,
  PromptTemplateNode: () => PromptTemplateNode,
  createGraph: () => createGraph,
  default: () => graph_framework_default,
  escapePath: () => escapePath,
  unescapePath: () => unescapePath
});
var GraphBuilder = (_class3 = class {
  __init6() {this.nodes = /* @__PURE__ */ new Map()}
  __init7() {this.edges = {}}
  __init8() {this.nodeLikeNodes = /* @__PURE__ */ new Map()}
  // Maps node-like objects, like prompts, to their nodes
  // Special nodes
  
  
  constructor() {;_class3.prototype.__init6.call(this);_class3.prototype.__init7.call(this);_class3.prototype.__init8.call(this);
    this.IN = this.createInputNode();
    this.OUT = this.createOutputNode();
  }
  // Create the final GraphData object
  async build(context) {
    const nodes = await Promise.all(
      Array.from(this.nodes.values()).map(async (node) => [
        node.id,
        await node.build(context)
      ])
    );
    return {
      type: "graph",
      nodes: Object.fromEntries(nodes),
      // XXX Need to resolve the lazy nodes
      edges: this.edges
    };
  }
  addEdge({
    source,
    sourceVar,
    target,
    targetVar,
    expr,
    purpose
  }) {
    const [sourceNode, sourcePath] = this.resolveNode(source);
    if (sourcePath.length > 0) {
      throw new Error("Source path must be empty");
    }
    const [targetNode, targetPath] = this.resolveNode(target);
    if (targetPath.length > 0) {
      throw new Error("Target path must be empty");
    }
    const id = this.generateId();
    sourceVar = _nullishCoalesce(sourceVar, () => ( "output"));
    targetVar = _nullishCoalesce(targetVar, () => ( (purpose === "data" ? "input" : this.generateId("control"))));
    for (const edge of Object.values(this.edges)) {
      if (edge.target.node === targetNode.id && edge.target.variable === targetVar) {
        throw new Error(
          `Variable name ${targetVar} already set on ${targetNode.id}`
        );
      }
    }
    this.edges[id] = {
      source: { node: sourceNode.id, variable: sourceVar },
      target: { node: targetNode.id, variable: targetVar },
      purpose
    };
  }
  resolveNode(node) {
    if (node instanceof _chunkQRHGVBKUjs.Prompt) {
      const cached = this.nodeLikeNodes.get(node);
      if (cached) {
        return [cached, []];
      }
      const promptNode = this.createPromptNode(node);
      this.nodeLikeNodes.set(node, promptNode);
      return [promptNode, []];
    } else if (isProxyVariable(node)) {
      return proxyVariableToNode(node);
    } else {
      return [node, []];
    }
  }
  // Create a literal node
  literal(value) {
    const preview = (typeof value === "string" ? value : JSON.stringify(value)).slice(0, 16);
    const id = this.generateId(`literal-${preview}`);
    const literalNode = new LiteralNode(this, id, value);
    this.nodes.set(id, literalNode);
    return literalNode;
  }
  gate(options) {
    const id = this.generateId("gate");
    const gateNode = new GateNode(this, id, options.condition);
    this.nodes.set(id, gateNode);
    return gateNode;
  }
  aggregator() {
    const id = this.generateId("aggregator");
    const aggregatorNode = new AggregatorNode(this, id);
    this.nodes.set(id, aggregatorNode);
    return aggregatorNode;
  }
  promptTemplate(options) {
    const id = this.generateId("prompt-template");
    const promptTemplateNode = new PromptTemplateNode(this, id, options.prompt);
    this.nodes.set(id, promptTemplateNode);
    return promptTemplateNode;
  }
  // public call(node: NodeLike, input: CallArgs): Node {
  //   const [resolvedNode, path] = this.resolveNode(node);
  //   if (resolvedNode instanceof SingleInputNode) {
  //     return resolvedNode.call(input, path);
  //   } else {
  //     throw new Error("Node must be a SingleInputNode");
  //   }
  // }
  // Helper to generate node IDs
  generateId(name) {
    const uuid = _chunkQRHGVBKUjs.newId.call(void 0, );
    if (name) {
      return `${name}-${uuid.slice(0, 8)}`;
    } else {
      return uuid;
    }
  }
  // Create an input node
  createInputNode() {
    const id = this.generateId("input");
    const inputNode = new InputNode(this, id);
    this.nodes.set(id, inputNode);
    return inputNode;
  }
  // Create an output node
  createOutputNode() {
    const id = this.generateId("output");
    const outputNode = new OutputNode(this, id);
    this.nodes.set(id, outputNode);
    return outputNode;
  }
  // Create a prompt node from a CodePrompt
  createPromptNode(prompt) {
    const id = this.generateId(`prompt-${prompt.slug}`);
    const promptNode = new PromptNode(this, id, prompt);
    this.nodes.set(id, promptNode);
    return promptNode;
  }
}, _class3);
function isProxyVariable(node) {
  return typeof node === "object" && node !== null && "__type" in node && // @ts-ignore
  node.__type === "proxy-variable";
}
function proxyVariableToNode(proxy) {
  return [proxy.__node, proxy.__path];
}
var BaseNode = (_class4 = class {
  constructor(graph, id) {;_class4.prototype.__init9.call(this);_class4.prototype.__init10.call(this);
    this.graph = graph;
    this.id = id;
  }
  
  
  __init9() {this.__type = "node"}
  __init10() {this.dependencies = []}
  addDependency(dependency) {
    this.dependencies.push(dependency);
  }
}, _class4);
var InputNode = class extends BaseNode {
  constructor(graph, id) {
    super(graph, id);
  }
  async build(context) {
    return {
      type: "input",
      description: "Input to the graph"
    };
  }
};
var OutputNode = class extends BaseNode {
  constructor(graph, id) {
    super(graph, id);
  }
  async build(context) {
    return {
      type: "output",
      description: "Output of the graph"
    };
  }
};
var PromptNode = class extends BaseNode {
  constructor(graph, id, prompt) {
    super(graph, id);
    this.prompt = prompt;
  }
  
  async build(context) {
    return {
      type: "function",
      function: await context.getFunctionId(this.prompt)
    };
  }
};
var GateNode = class extends BaseNode {
  constructor(graph, id, condition) {
    super(graph, id);
    this.condition = condition;
  }
  
  async build(context) {
    return {
      type: "gate",
      description: "Conditional gate",
      condition: this.condition
    };
  }
};
var AggregatorNode = class extends BaseNode {
  constructor(graph, id) {
    super(graph, id);
  }
  async build(context) {
    return {
      type: "aggregator",
      description: "Aggregator"
    };
  }
};
var PromptTemplateNode = class extends BaseNode {
  constructor(graph, id, prompt) {
    super(graph, id);
    this.prompt = prompt;
  }
  
  async build(context) {
    return {
      type: "prompt_template",
      prompt: this.prompt
    };
  }
};
var LiteralNode = class extends BaseNode {
  constructor(graph, id, value) {
    super(graph, id);
    this.value = value;
  }
  
  async build(context) {
    return {
      type: "literal",
      value: this.value
    };
  }
};
function createGraph() {
  const graphBuilder = new GraphBuilder();
  return graphBuilder;
}
function escapePath(parts) {
  if (parts.length === 0) {
    return void 0;
  }
  return parts.map((part) => {
    if (/[^\w-]/.test(part)) {
      const escaped = part.replace(/["\\]/g, "\\$&");
      return `"${escaped}"`;
    }
    return part;
  }).join(".");
}
function unescapePath(path) {
  const regex = /"((?:\\["\\]|[^"\\])*)"|([^\.]+)/g;
  const matches = path.match(regex);
  return matches ? matches.map((match) => {
    if (match.startsWith('"')) {
      return match.slice(1, -1).replace(/\\(["\\])/g, "$1");
    }
    return match;
  }) : [];
}
var graph_framework_default = { createGraph };

// ../node_modules/.pnpm/async@3.2.5/node_modules/async/dist/async.mjs
function initialParams(fn) {
  return function(...args) {
    var callback = args.pop();
    return fn.call(this, args, callback);
  };
}
var hasQueueMicrotask = typeof queueMicrotask === "function" && queueMicrotask;
var hasSetImmediate = typeof setImmediate === "function" && setImmediate;
var hasNextTick = typeof process === "object" && typeof process.nextTick === "function";
function fallback(fn) {
  setTimeout(fn, 0);
}
function wrap(defer) {
  return (fn, ...args) => defer(() => fn(...args));
}
var _defer$1;
if (hasQueueMicrotask) {
  _defer$1 = queueMicrotask;
} else if (hasSetImmediate) {
  _defer$1 = setImmediate;
} else if (hasNextTick) {
  _defer$1 = process.nextTick;
} else {
  _defer$1 = fallback;
}
var setImmediate$1 = wrap(_defer$1);
function asyncify(func) {
  if (isAsync(func)) {
    return function(...args) {
      const callback = args.pop();
      const promise = func.apply(this, args);
      return handlePromise(promise, callback);
    };
  }
  return initialParams(function(args, callback) {
    var result;
    try {
      result = func.apply(this, args);
    } catch (e) {
      return callback(e);
    }
    if (result && typeof result.then === "function") {
      return handlePromise(result, callback);
    } else {
      callback(null, result);
    }
  });
}
function handlePromise(promise, callback) {
  return promise.then((value) => {
    invokeCallback(callback, null, value);
  }, (err) => {
    invokeCallback(callback, err && (err instanceof Error || err.message) ? err : new Error(err));
  });
}
function invokeCallback(callback, error, value) {
  try {
    callback(error, value);
  } catch (err) {
    setImmediate$1((e) => {
      throw e;
    }, err);
  }
}
function isAsync(fn) {
  return fn[Symbol.toStringTag] === "AsyncFunction";
}
function isAsyncGenerator(fn) {
  return fn[Symbol.toStringTag] === "AsyncGenerator";
}
function isAsyncIterable(obj) {
  return typeof obj[Symbol.asyncIterator] === "function";
}
function wrapAsync(asyncFn) {
  if (typeof asyncFn !== "function") throw new Error("expected a function");
  return isAsync(asyncFn) ? asyncify(asyncFn) : asyncFn;
}
function awaitify(asyncFn, arity) {
  if (!arity) arity = asyncFn.length;
  if (!arity) throw new Error("arity is undefined");
  function awaitable(...args) {
    if (typeof args[arity - 1] === "function") {
      return asyncFn.apply(this, args);
    }
    return new Promise((resolve, reject2) => {
      args[arity - 1] = (err, ...cbArgs) => {
        if (err) return reject2(err);
        resolve(cbArgs.length > 1 ? cbArgs : cbArgs[0]);
      };
      asyncFn.apply(this, args);
    });
  }
  return awaitable;
}
function applyEach$1(eachfn) {
  return function applyEach2(fns, ...callArgs) {
    const go = awaitify(function(callback) {
      var that = this;
      return eachfn(fns, (fn, cb) => {
        wrapAsync(fn).apply(that, callArgs.concat(cb));
      }, callback);
    });
    return go;
  };
}
function _asyncMap(eachfn, arr, iteratee, callback) {
  arr = arr || [];
  var results = [];
  var counter = 0;
  var _iteratee = wrapAsync(iteratee);
  return eachfn(arr, (value, _, iterCb) => {
    var index = counter++;
    _iteratee(value, (err, v) => {
      results[index] = v;
      iterCb(err);
    });
  }, (err) => {
    callback(err, results);
  });
}
function isArrayLike(value) {
  return value && typeof value.length === "number" && value.length >= 0 && value.length % 1 === 0;
}
var breakLoop = {};
var breakLoop$1 = breakLoop;
function once(fn) {
  function wrapper(...args) {
    if (fn === null) return;
    var callFn = fn;
    fn = null;
    callFn.apply(this, args);
  }
  Object.assign(wrapper, fn);
  return wrapper;
}
function getIterator(coll) {
  return coll[Symbol.iterator] && coll[Symbol.iterator]();
}
function createArrayIterator(coll) {
  var i = -1;
  var len = coll.length;
  return function next() {
    return ++i < len ? { value: coll[i], key: i } : null;
  };
}
function createES2015Iterator(iterator) {
  var i = -1;
  return function next() {
    var item = iterator.next();
    if (item.done)
      return null;
    i++;
    return { value: item.value, key: i };
  };
}
function createObjectIterator(obj) {
  var okeys = obj ? Object.keys(obj) : [];
  var i = -1;
  var len = okeys.length;
  return function next() {
    var key = okeys[++i];
    if (key === "__proto__") {
      return next();
    }
    return i < len ? { value: obj[key], key } : null;
  };
}
function createIterator(coll) {
  if (isArrayLike(coll)) {
    return createArrayIterator(coll);
  }
  var iterator = getIterator(coll);
  return iterator ? createES2015Iterator(iterator) : createObjectIterator(coll);
}
function onlyOnce(fn) {
  return function(...args) {
    if (fn === null) throw new Error("Callback was already called.");
    var callFn = fn;
    fn = null;
    callFn.apply(this, args);
  };
}
function asyncEachOfLimit(generator, limit, iteratee, callback) {
  let done = false;
  let canceled = false;
  let awaiting = false;
  let running = 0;
  let idx = 0;
  function replenish() {
    if (running >= limit || awaiting || done) return;
    awaiting = true;
    generator.next().then(({ value, done: iterDone }) => {
      if (canceled || done) return;
      awaiting = false;
      if (iterDone) {
        done = true;
        if (running <= 0) {
          callback(null);
        }
        return;
      }
      running++;
      iteratee(value, idx, iterateeCallback);
      idx++;
      replenish();
    }).catch(handleError);
  }
  function iterateeCallback(err, result) {
    running -= 1;
    if (canceled) return;
    if (err) return handleError(err);
    if (err === false) {
      done = true;
      canceled = true;
      return;
    }
    if (result === breakLoop$1 || done && running <= 0) {
      done = true;
      return callback(null);
    }
    replenish();
  }
  function handleError(err) {
    if (canceled) return;
    awaiting = false;
    done = true;
    callback(err);
  }
  replenish();
}
var eachOfLimit$2 = (limit) => {
  return (obj, iteratee, callback) => {
    callback = once(callback);
    if (limit <= 0) {
      throw new RangeError("concurrency limit cannot be less than 1");
    }
    if (!obj) {
      return callback(null);
    }
    if (isAsyncGenerator(obj)) {
      return asyncEachOfLimit(obj, limit, iteratee, callback);
    }
    if (isAsyncIterable(obj)) {
      return asyncEachOfLimit(obj[Symbol.asyncIterator](), limit, iteratee, callback);
    }
    var nextElem = createIterator(obj);
    var done = false;
    var canceled = false;
    var running = 0;
    var looping = false;
    function iterateeCallback(err, value) {
      if (canceled) return;
      running -= 1;
      if (err) {
        done = true;
        callback(err);
      } else if (err === false) {
        done = true;
        canceled = true;
      } else if (value === breakLoop$1 || done && running <= 0) {
        done = true;
        return callback(null);
      } else if (!looping) {
        replenish();
      }
    }
    function replenish() {
      looping = true;
      while (running < limit && !done) {
        var elem = nextElem();
        if (elem === null) {
          done = true;
          if (running <= 0) {
            callback(null);
          }
          return;
        }
        running += 1;
        iteratee(elem.value, elem.key, onlyOnce(iterateeCallback));
      }
      looping = false;
    }
    replenish();
  };
};
function eachOfLimit(coll, limit, iteratee, callback) {
  return eachOfLimit$2(limit)(coll, wrapAsync(iteratee), callback);
}
var eachOfLimit$1 = awaitify(eachOfLimit, 4);
function eachOfArrayLike(coll, iteratee, callback) {
  callback = once(callback);
  var index = 0, completed = 0, { length } = coll, canceled = false;
  if (length === 0) {
    callback(null);
  }
  function iteratorCallback(err, value) {
    if (err === false) {
      canceled = true;
    }
    if (canceled === true) return;
    if (err) {
      callback(err);
    } else if (++completed === length || value === breakLoop$1) {
      callback(null);
    }
  }
  for (; index < length; index++) {
    iteratee(coll[index], index, onlyOnce(iteratorCallback));
  }
}
function eachOfGeneric(coll, iteratee, callback) {
  return eachOfLimit$1(coll, Infinity, iteratee, callback);
}
function eachOf(coll, iteratee, callback) {
  var eachOfImplementation = isArrayLike(coll) ? eachOfArrayLike : eachOfGeneric;
  return eachOfImplementation(coll, wrapAsync(iteratee), callback);
}
var eachOf$1 = awaitify(eachOf, 3);
function map(coll, iteratee, callback) {
  return _asyncMap(eachOf$1, coll, iteratee, callback);
}
var map$1 = awaitify(map, 3);
var applyEach = applyEach$1(map$1);
function eachOfSeries(coll, iteratee, callback) {
  return eachOfLimit$1(coll, 1, iteratee, callback);
}
var eachOfSeries$1 = awaitify(eachOfSeries, 3);
function mapSeries(coll, iteratee, callback) {
  return _asyncMap(eachOfSeries$1, coll, iteratee, callback);
}
var mapSeries$1 = awaitify(mapSeries, 3);
var applyEachSeries = applyEach$1(mapSeries$1);
var DLL = class {
  constructor() {
    this.head = this.tail = null;
    this.length = 0;
  }
  removeLink(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
    node.prev = node.next = null;
    this.length -= 1;
    return node;
  }
  empty() {
    while (this.head) this.shift();
    return this;
  }
  insertAfter(node, newNode) {
    newNode.prev = node;
    newNode.next = node.next;
    if (node.next) node.next.prev = newNode;
    else this.tail = newNode;
    node.next = newNode;
    this.length += 1;
  }
  insertBefore(node, newNode) {
    newNode.prev = node.prev;
    newNode.next = node;
    if (node.prev) node.prev.next = newNode;
    else this.head = newNode;
    node.prev = newNode;
    this.length += 1;
  }
  unshift(node) {
    if (this.head) this.insertBefore(this.head, node);
    else setInitial(this, node);
  }
  push(node) {
    if (this.tail) this.insertAfter(this.tail, node);
    else setInitial(this, node);
  }
  shift() {
    return this.head && this.removeLink(this.head);
  }
  pop() {
    return this.tail && this.removeLink(this.tail);
  }
  toArray() {
    return [...this];
  }
  *[Symbol.iterator]() {
    var cur = this.head;
    while (cur) {
      yield cur.data;
      cur = cur.next;
    }
  }
  remove(testFn) {
    var curr = this.head;
    while (curr) {
      var { next } = curr;
      if (testFn(curr)) {
        this.removeLink(curr);
      }
      curr = next;
    }
    return this;
  }
};
function setInitial(dll, node) {
  dll.length = 1;
  dll.head = dll.tail = node;
}
function queue$1(worker, concurrency, payload) {
  if (concurrency == null) {
    concurrency = 1;
  } else if (concurrency === 0) {
    throw new RangeError("Concurrency must not be zero");
  }
  var _worker = wrapAsync(worker);
  var numRunning = 0;
  var workersList = [];
  const events = {
    error: [],
    drain: [],
    saturated: [],
    unsaturated: [],
    empty: []
  };
  function on(event, handler) {
    events[event].push(handler);
  }
  function once2(event, handler) {
    const handleAndRemove = (...args) => {
      off(event, handleAndRemove);
      handler(...args);
    };
    events[event].push(handleAndRemove);
  }
  function off(event, handler) {
    if (!event) return Object.keys(events).forEach((ev) => events[ev] = []);
    if (!handler) return events[event] = [];
    events[event] = events[event].filter((ev) => ev !== handler);
  }
  function trigger(event, ...args) {
    events[event].forEach((handler) => handler(...args));
  }
  var processingScheduled = false;
  function _insert(data, insertAtFront, rejectOnError, callback) {
    if (callback != null && typeof callback !== "function") {
      throw new Error("task callback must be a function");
    }
    q.started = true;
    var res, rej;
    function promiseCallback(err, ...args) {
      if (err) return rejectOnError ? rej(err) : res();
      if (args.length <= 1) return res(args[0]);
      res(args);
    }
    var item = q._createTaskItem(
      data,
      rejectOnError ? promiseCallback : callback || promiseCallback
    );
    if (insertAtFront) {
      q._tasks.unshift(item);
    } else {
      q._tasks.push(item);
    }
    if (!processingScheduled) {
      processingScheduled = true;
      setImmediate$1(() => {
        processingScheduled = false;
        q.process();
      });
    }
    if (rejectOnError || !callback) {
      return new Promise((resolve, reject2) => {
        res = resolve;
        rej = reject2;
      });
    }
  }
  function _createCB(tasks) {
    return function(err, ...args) {
      numRunning -= 1;
      for (var i = 0, l = tasks.length; i < l; i++) {
        var task = tasks[i];
        var index = workersList.indexOf(task);
        if (index === 0) {
          workersList.shift();
        } else if (index > 0) {
          workersList.splice(index, 1);
        }
        task.callback(err, ...args);
        if (err != null) {
          trigger("error", err, task.data);
        }
      }
      if (numRunning <= q.concurrency - q.buffer) {
        trigger("unsaturated");
      }
      if (q.idle()) {
        trigger("drain");
      }
      q.process();
    };
  }
  function _maybeDrain(data) {
    if (data.length === 0 && q.idle()) {
      setImmediate$1(() => trigger("drain"));
      return true;
    }
    return false;
  }
  const eventMethod = (name) => (handler) => {
    if (!handler) {
      return new Promise((resolve, reject2) => {
        once2(name, (err, data) => {
          if (err) return reject2(err);
          resolve(data);
        });
      });
    }
    off(name);
    on(name, handler);
  };
  var isProcessing = false;
  var q = {
    _tasks: new DLL(),
    _createTaskItem(data, callback) {
      return {
        data,
        callback
      };
    },
    *[Symbol.iterator]() {
      yield* q._tasks[Symbol.iterator]();
    },
    concurrency,
    payload,
    buffer: concurrency / 4,
    started: false,
    paused: false,
    push(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data)) return;
        return data.map((datum) => _insert(datum, false, false, callback));
      }
      return _insert(data, false, false, callback);
    },
    pushAsync(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data)) return;
        return data.map((datum) => _insert(datum, false, true, callback));
      }
      return _insert(data, false, true, callback);
    },
    kill() {
      off();
      q._tasks.empty();
    },
    unshift(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data)) return;
        return data.map((datum) => _insert(datum, true, false, callback));
      }
      return _insert(data, true, false, callback);
    },
    unshiftAsync(data, callback) {
      if (Array.isArray(data)) {
        if (_maybeDrain(data)) return;
        return data.map((datum) => _insert(datum, true, true, callback));
      }
      return _insert(data, true, true, callback);
    },
    remove(testFn) {
      q._tasks.remove(testFn);
    },
    process() {
      if (isProcessing) {
        return;
      }
      isProcessing = true;
      while (!q.paused && numRunning < q.concurrency && q._tasks.length) {
        var tasks = [], data = [];
        var l = q._tasks.length;
        if (q.payload) l = Math.min(l, q.payload);
        for (var i = 0; i < l; i++) {
          var node = q._tasks.shift();
          tasks.push(node);
          workersList.push(node);
          data.push(node.data);
        }
        numRunning += 1;
        if (q._tasks.length === 0) {
          trigger("empty");
        }
        if (numRunning === q.concurrency) {
          trigger("saturated");
        }
        var cb = onlyOnce(_createCB(tasks));
        _worker(data, cb);
      }
      isProcessing = false;
    },
    length() {
      return q._tasks.length;
    },
    running() {
      return numRunning;
    },
    workersList() {
      return workersList;
    },
    idle() {
      return q._tasks.length + numRunning === 0;
    },
    pause() {
      q.paused = true;
    },
    resume() {
      if (q.paused === false) {
        return;
      }
      q.paused = false;
      setImmediate$1(q.process);
    }
  };
  Object.defineProperties(q, {
    saturated: {
      writable: false,
      value: eventMethod("saturated")
    },
    unsaturated: {
      writable: false,
      value: eventMethod("unsaturated")
    },
    empty: {
      writable: false,
      value: eventMethod("empty")
    },
    drain: {
      writable: false,
      value: eventMethod("drain")
    },
    error: {
      writable: false,
      value: eventMethod("error")
    }
  });
  return q;
}
function reduce(coll, memo, iteratee, callback) {
  callback = once(callback);
  var _iteratee = wrapAsync(iteratee);
  return eachOfSeries$1(coll, (x, i, iterCb) => {
    _iteratee(memo, x, (err, v) => {
      memo = v;
      iterCb(err);
    });
  }, (err) => callback(err, memo));
}
var reduce$1 = awaitify(reduce, 4);
function mapLimit(coll, limit, iteratee, callback) {
  return _asyncMap(eachOfLimit$2(limit), coll, iteratee, callback);
}
var mapLimit$1 = awaitify(mapLimit, 4);
function concatLimit(coll, limit, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return mapLimit$1(coll, limit, (val, iterCb) => {
    _iteratee(val, (err, ...args) => {
      if (err) return iterCb(err);
      return iterCb(err, args);
    });
  }, (err, mapResults) => {
    var result = [];
    for (var i = 0; i < mapResults.length; i++) {
      if (mapResults[i]) {
        result = result.concat(...mapResults[i]);
      }
    }
    return callback(err, result);
  });
}
var concatLimit$1 = awaitify(concatLimit, 4);
function concat(coll, iteratee, callback) {
  return concatLimit$1(coll, Infinity, iteratee, callback);
}
var concat$1 = awaitify(concat, 3);
function concatSeries(coll, iteratee, callback) {
  return concatLimit$1(coll, 1, iteratee, callback);
}
var concatSeries$1 = awaitify(concatSeries, 3);
function _createTester(check, getResult) {
  return (eachfn, arr, _iteratee, cb) => {
    var testPassed = false;
    var testResult;
    const iteratee = wrapAsync(_iteratee);
    eachfn(arr, (value, _, callback) => {
      iteratee(value, (err, result) => {
        if (err || err === false) return callback(err);
        if (check(result) && !testResult) {
          testPassed = true;
          testResult = getResult(true, value);
          return callback(null, breakLoop$1);
        }
        callback();
      });
    }, (err) => {
      if (err) return cb(err);
      cb(null, testPassed ? testResult : getResult(false));
    });
  };
}
function detect(coll, iteratee, callback) {
  return _createTester((bool) => bool, (res, item) => item)(eachOf$1, coll, iteratee, callback);
}
var detect$1 = awaitify(detect, 3);
function detectLimit(coll, limit, iteratee, callback) {
  return _createTester((bool) => bool, (res, item) => item)(eachOfLimit$2(limit), coll, iteratee, callback);
}
var detectLimit$1 = awaitify(detectLimit, 4);
function detectSeries(coll, iteratee, callback) {
  return _createTester((bool) => bool, (res, item) => item)(eachOfLimit$2(1), coll, iteratee, callback);
}
var detectSeries$1 = awaitify(detectSeries, 3);
function consoleFunc(name) {
  return (fn, ...args) => wrapAsync(fn)(...args, (err, ...resultArgs) => {
    if (typeof console === "object") {
      if (err) {
        if (console.error) {
          console.error(err);
        }
      } else if (console[name]) {
        resultArgs.forEach((x) => console[name](x));
      }
    }
  });
}
var dir = consoleFunc("dir");
function doWhilst(iteratee, test, callback) {
  callback = onlyOnce(callback);
  var _fn = wrapAsync(iteratee);
  var _test = wrapAsync(test);
  var results;
  function next(err, ...args) {
    if (err) return callback(err);
    if (err === false) return;
    results = args;
    _test(...args, check);
  }
  function check(err, truth) {
    if (err) return callback(err);
    if (err === false) return;
    if (!truth) return callback(null, ...results);
    _fn(next);
  }
  return check(null, true);
}
var doWhilst$1 = awaitify(doWhilst, 3);
function _withoutIndex(iteratee) {
  return (value, index, callback) => iteratee(value, callback);
}
function eachLimit$2(coll, iteratee, callback) {
  return eachOf$1(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
var each = awaitify(eachLimit$2, 3);
function eachLimit(coll, limit, iteratee, callback) {
  return eachOfLimit$2(limit)(coll, _withoutIndex(wrapAsync(iteratee)), callback);
}
var eachLimit$1 = awaitify(eachLimit, 4);
function eachSeries(coll, iteratee, callback) {
  return eachLimit$1(coll, 1, iteratee, callback);
}
var eachSeries$1 = awaitify(eachSeries, 3);
function ensureAsync(fn) {
  if (isAsync(fn)) return fn;
  return function(...args) {
    var callback = args.pop();
    var sync = true;
    args.push((...innerArgs) => {
      if (sync) {
        setImmediate$1(() => callback(...innerArgs));
      } else {
        callback(...innerArgs);
      }
    });
    fn.apply(this, args);
    sync = false;
  };
}
function every(coll, iteratee, callback) {
  return _createTester((bool) => !bool, (res) => !res)(eachOf$1, coll, iteratee, callback);
}
var every$1 = awaitify(every, 3);
function everyLimit(coll, limit, iteratee, callback) {
  return _createTester((bool) => !bool, (res) => !res)(eachOfLimit$2(limit), coll, iteratee, callback);
}
var everyLimit$1 = awaitify(everyLimit, 4);
function everySeries(coll, iteratee, callback) {
  return _createTester((bool) => !bool, (res) => !res)(eachOfSeries$1, coll, iteratee, callback);
}
var everySeries$1 = awaitify(everySeries, 3);
function filterArray(eachfn, arr, iteratee, callback) {
  var truthValues = new Array(arr.length);
  eachfn(arr, (x, index, iterCb) => {
    iteratee(x, (err, v) => {
      truthValues[index] = !!v;
      iterCb(err);
    });
  }, (err) => {
    if (err) return callback(err);
    var results = [];
    for (var i = 0; i < arr.length; i++) {
      if (truthValues[i]) results.push(arr[i]);
    }
    callback(null, results);
  });
}
function filterGeneric(eachfn, coll, iteratee, callback) {
  var results = [];
  eachfn(coll, (x, index, iterCb) => {
    iteratee(x, (err, v) => {
      if (err) return iterCb(err);
      if (v) {
        results.push({ index, value: x });
      }
      iterCb(err);
    });
  }, (err) => {
    if (err) return callback(err);
    callback(null, results.sort((a, b) => a.index - b.index).map((v) => v.value));
  });
}
function _filter(eachfn, coll, iteratee, callback) {
  var filter2 = isArrayLike(coll) ? filterArray : filterGeneric;
  return filter2(eachfn, coll, wrapAsync(iteratee), callback);
}
function filter(coll, iteratee, callback) {
  return _filter(eachOf$1, coll, iteratee, callback);
}
var filter$1 = awaitify(filter, 3);
function filterLimit(coll, limit, iteratee, callback) {
  return _filter(eachOfLimit$2(limit), coll, iteratee, callback);
}
var filterLimit$1 = awaitify(filterLimit, 4);
function filterSeries(coll, iteratee, callback) {
  return _filter(eachOfSeries$1, coll, iteratee, callback);
}
var filterSeries$1 = awaitify(filterSeries, 3);
function forever(fn, errback) {
  var done = onlyOnce(errback);
  var task = wrapAsync(ensureAsync(fn));
  function next(err) {
    if (err) return done(err);
    if (err === false) return;
    task(next);
  }
  return next();
}
var forever$1 = awaitify(forever, 2);
function groupByLimit(coll, limit, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return mapLimit$1(coll, limit, (val, iterCb) => {
    _iteratee(val, (err, key) => {
      if (err) return iterCb(err);
      return iterCb(err, { key, val });
    });
  }, (err, mapResults) => {
    var result = {};
    var { hasOwnProperty } = Object.prototype;
    for (var i = 0; i < mapResults.length; i++) {
      if (mapResults[i]) {
        var { key } = mapResults[i];
        var { val } = mapResults[i];
        if (hasOwnProperty.call(result, key)) {
          result[key].push(val);
        } else {
          result[key] = [val];
        }
      }
    }
    return callback(err, result);
  });
}
var groupByLimit$1 = awaitify(groupByLimit, 4);
var log2 = consoleFunc("log");
function mapValuesLimit(obj, limit, iteratee, callback) {
  callback = once(callback);
  var newObj = {};
  var _iteratee = wrapAsync(iteratee);
  return eachOfLimit$2(limit)(obj, (val, key, next) => {
    _iteratee(val, key, (err, result) => {
      if (err) return next(err);
      newObj[key] = result;
      next(err);
    });
  }, (err) => callback(err, newObj));
}
var mapValuesLimit$1 = awaitify(mapValuesLimit, 4);
var _defer;
if (hasNextTick) {
  _defer = process.nextTick;
} else if (hasSetImmediate) {
  _defer = setImmediate;
} else {
  _defer = fallback;
}
var nextTick = wrap(_defer);
var _parallel = awaitify((eachfn, tasks, callback) => {
  var results = isArrayLike(tasks) ? [] : {};
  eachfn(tasks, (task, key, taskCb) => {
    wrapAsync(task)((err, ...result) => {
      if (result.length < 2) {
        [result] = result;
      }
      results[key] = result;
      taskCb(err);
    });
  }, (err) => callback(err, results));
}, 3);
function queue(worker, concurrency) {
  var _worker = wrapAsync(worker);
  return queue$1((items, cb) => {
    _worker(items[0], cb);
  }, concurrency, 1);
}
function race(tasks, callback) {
  callback = once(callback);
  if (!Array.isArray(tasks)) return callback(new TypeError("First argument to race must be an array of functions"));
  if (!tasks.length) return callback();
  for (var i = 0, l = tasks.length; i < l; i++) {
    wrapAsync(tasks[i])(callback);
  }
}
var race$1 = awaitify(race, 2);
function reject$2(eachfn, arr, _iteratee, callback) {
  const iteratee = wrapAsync(_iteratee);
  return _filter(eachfn, arr, (value, cb) => {
    iteratee(value, (err, v) => {
      cb(err, !v);
    });
  }, callback);
}
function reject(coll, iteratee, callback) {
  return reject$2(eachOf$1, coll, iteratee, callback);
}
var reject$1 = awaitify(reject, 3);
function rejectLimit(coll, limit, iteratee, callback) {
  return reject$2(eachOfLimit$2(limit), coll, iteratee, callback);
}
var rejectLimit$1 = awaitify(rejectLimit, 4);
function rejectSeries(coll, iteratee, callback) {
  return reject$2(eachOfSeries$1, coll, iteratee, callback);
}
var rejectSeries$1 = awaitify(rejectSeries, 3);
function some(coll, iteratee, callback) {
  return _createTester(Boolean, (res) => res)(eachOf$1, coll, iteratee, callback);
}
var some$1 = awaitify(some, 3);
function someLimit(coll, limit, iteratee, callback) {
  return _createTester(Boolean, (res) => res)(eachOfLimit$2(limit), coll, iteratee, callback);
}
var someLimit$1 = awaitify(someLimit, 4);
function someSeries(coll, iteratee, callback) {
  return _createTester(Boolean, (res) => res)(eachOfSeries$1, coll, iteratee, callback);
}
var someSeries$1 = awaitify(someSeries, 3);
function sortBy(coll, iteratee, callback) {
  var _iteratee = wrapAsync(iteratee);
  return map$1(coll, (x, iterCb) => {
    _iteratee(x, (err, criteria) => {
      if (err) return iterCb(err);
      iterCb(err, { value: x, criteria });
    });
  }, (err, results) => {
    if (err) return callback(err);
    callback(null, results.sort(comparator).map((v) => v.value));
  });
  function comparator(left, right) {
    var a = left.criteria, b = right.criteria;
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
var sortBy$1 = awaitify(sortBy, 3);
function tryEach(tasks, callback) {
  var error = null;
  var result;
  return eachSeries$1(tasks, (task, taskCb) => {
    wrapAsync(task)((err, ...args) => {
      if (err === false) return taskCb(err);
      if (args.length < 2) {
        [result] = args;
      } else {
        result = args;
      }
      error = err;
      taskCb(err ? null : {});
    });
  }, () => callback(error, result));
}
var tryEach$1 = awaitify(tryEach);
function whilst(test, iteratee, callback) {
  callback = onlyOnce(callback);
  var _fn = wrapAsync(iteratee);
  var _test = wrapAsync(test);
  var results = [];
  function next(err, ...rest) {
    if (err) return callback(err);
    results = rest;
    if (err === false) return;
    _test(check);
  }
  function check(err, truth) {
    if (err) return callback(err);
    if (err === false) return;
    if (!truth) return callback(null, ...results);
    _fn(next);
  }
  return _test(check);
}
var whilst$1 = awaitify(whilst, 3);
function waterfall(tasks, callback) {
  callback = once(callback);
  if (!Array.isArray(tasks)) return callback(new Error("First argument to waterfall must be an array of functions"));
  if (!tasks.length) return callback();
  var taskIndex = 0;
  function nextTask(args) {
    var task = wrapAsync(tasks[taskIndex++]);
    task(...args, onlyOnce(next));
  }
  function next(err, ...args) {
    if (err === false) return;
    if (err || taskIndex === tasks.length) {
      return callback(err, ...args);
    }
    nextTask(args);
  }
  nextTask([]);
}
var waterfall$1 = awaitify(waterfall);

// src/trace.ts
var SpanFetcher = class _SpanFetcher extends _chunkQRHGVBKUjs.ObjectFetcher {
  constructor(objectType, _objectId, rootSpanId, _state, spanTypeFilter, includeScorers = false, brainstoreRealtime = true) {
    const filterExpr = _SpanFetcher.buildFilter(
      rootSpanId,
      spanTypeFilter,
      includeScorers
    );
    super(
      objectType,
      void 0,
      void 0,
      {
        filter: filterExpr
      },
      brainstoreRealtime
    );
    this._objectId = _objectId;
    this.rootSpanId = rootSpanId;
    this._state = _state;
    this.spanTypeFilter = spanTypeFilter;
  }
  
  
  
  
  static buildFilter(rootSpanId, spanTypeFilter, includeScorers = false) {
    const children = [
      // Base filter: root_span_id = 'value'
      {
        op: "eq",
        left: { op: "ident", name: ["root_span_id"] },
        right: { op: "literal", value: rootSpanId }
      }
    ];
    if (!includeScorers) {
      children.push({
        op: "or",
        children: [
          {
            op: "isnull",
            expr: { op: "ident", name: ["span_attributes", "purpose"] }
          },
          {
            op: "ne",
            left: { op: "ident", name: ["span_attributes", "purpose"] },
            right: { op: "literal", value: "scorer" }
          }
        ]
      });
    }
    if (spanTypeFilter && spanTypeFilter.length > 0) {
      children.push({
        op: "in",
        left: { op: "ident", name: ["span_attributes", "type"] },
        right: { op: "literal", value: spanTypeFilter }
      });
    }
    return {
      op: "and",
      children
    };
  }
  get id() {
    return Promise.resolve(this._objectId);
  }
  async getState() {
    return this._state;
  }
};
var CachedSpanFetcher = (_class5 = class {
  __init11() {this.spanCache = /* @__PURE__ */ new Map()}
  __init12() {this.allFetched = false}
  
  constructor(objectTypeOrFetchFn, objectId, rootSpanId, getState, brainstoreRealtime = true) {;_class5.prototype.__init11.call(this);_class5.prototype.__init12.call(this);
    if (typeof objectTypeOrFetchFn === "function") {
      this.fetchFn = (spanType) => objectTypeOrFetchFn(spanType);
    } else {
      const objectType = objectTypeOrFetchFn;
      this.fetchFn = async (spanType, includeScorers) => {
        const state = await getState();
        const fetcher = new SpanFetcher(
          objectType,
          objectId,
          rootSpanId,
          state,
          spanType,
          includeScorers,
          brainstoreRealtime
        );
        const rows = await fetcher.fetchedData();
        return rows.map((row) => ({
          input: row.input,
          output: row.output,
          expected: row.expected,
          error: row.error,
          scores: row.scores,
          metrics: row.metrics,
          metadata: row.metadata,
          span_id: row.span_id,
          span_parents: row.span_parents,
          is_root: row.is_root,
          span_attributes: row.span_attributes,
          id: row.id,
          _xact_id: row._xact_id,
          _pagination_key: row._pagination_key,
          root_span_id: row.root_span_id,
          created: row.created,
          tags: row.tags
        }));
      };
    }
  }
  async getSpans({
    spanType,
    includeScorers = false
  } = {}) {
    if (includeScorers) {
      return this.fetchFn(spanType, true);
    }
    if (this.allFetched) {
      return this.getFromCache(spanType);
    }
    if (!spanType || spanType.length === 0) {
      await this.fetchSpans(void 0);
      this.allFetched = true;
      return this.getFromCache(void 0);
    }
    const missingTypes = spanType.filter((t) => !this.spanCache.has(t));
    if (missingTypes.length === 0) {
      return this.getFromCache(spanType);
    }
    await this.fetchSpans(missingTypes);
    return this.getFromCache(spanType);
  }
  async fetchSpans(spanType) {
    const spans = await this.fetchFn(spanType, false);
    for (const span of spans) {
      const type = _nullishCoalesce(_optionalChain([span, 'access', _140 => _140.span_attributes, 'optionalAccess', _141 => _141.type]), () => ( ""));
      const existing = _nullishCoalesce(this.spanCache.get(type), () => ( []));
      existing.push(span);
      this.spanCache.set(type, existing);
    }
  }
  getFromCache(spanType) {
    if (!spanType || spanType.length === 0) {
      return Array.from(this.spanCache.values()).flat();
    }
    const result = [];
    for (const type of spanType) {
      const spans = this.spanCache.get(type);
      if (spans) result.push(...spans);
    }
    return result;
  }
}, _class5);
var LocalTrace = (_class6 = class {
  
  
  
  
  
  __init13() {this.spansFlushed = false}
  __init14() {this.spansFlushPromise = null}
  
  __init15() {this.threadCache = /* @__PURE__ */ new Map()}
  constructor({
    objectType,
    objectId,
    rootSpanId,
    ensureSpansFlushed,
    state
  }) {;_class6.prototype.__init13.call(this);_class6.prototype.__init14.call(this);_class6.prototype.__init15.call(this);
    this.objectType = objectType;
    this.objectId = objectId;
    this.rootSpanId = rootSpanId;
    this.ensureSpansFlushed = ensureSpansFlushed;
    this.state = state;
    this.cachedFetcher = new CachedSpanFetcher(
      objectType,
      objectId,
      rootSpanId,
      async () => {
        await this.ensureSpansReady();
        await state.login({});
        return state;
      }
    );
  }
  getConfiguration() {
    return {
      object_type: this.objectType,
      object_id: this.objectId,
      root_span_id: this.rootSpanId
    };
  }
  /**
   * Custom JSON serialization - returns trace_ref format so LocalTrace
   * can be safely passed through JSON.stringify() (e.g., in invoke()).
   */
  toJSON() {
    return {
      trace_ref: {
        object_type: this.objectType,
        object_id: this.objectId,
        root_span_id: this.rootSpanId
      }
    };
  }
  /**
   * Fetch all rows for this root span from its parent object (experiment or project logs).
   * First checks the local span cache for recently logged spans, then falls
   * back to CachedSpanFetcher which handles BTQL fetching and caching.
   */
  async getSpans({
    spanType,
    includeScorers = false
  } = {}) {
    const cachedSpans = this.state.spanCache.getByRootSpanId(this.rootSpanId);
    if (cachedSpans && cachedSpans.length > 0) {
      let spans = includeScorers ? cachedSpans : cachedSpans.filter(
        (span) => _optionalChain([span, 'access', _142 => _142.span_attributes, 'optionalAccess', _143 => _143.purpose]) !== "scorer"
      );
      if (spanType && spanType.length > 0) {
        spans = spans.filter(
          (span) => spanType.includes(_nullishCoalesce(_optionalChain([span, 'access', _144 => _144.span_attributes, 'optionalAccess', _145 => _145.type]), () => ( "")))
        );
      }
      return spans.map((span) => ({
        input: span.input,
        output: span.output,
        expected: span.expected,
        error: span.error,
        scores: span.scores,
        metrics: span.metrics,
        metadata: span.metadata,
        span_id: span.span_id,
        span_parents: span.span_parents,
        is_root: span.is_root,
        span_attributes: span.span_attributes,
        tags: span.tags
      }));
    }
    return this.cachedFetcher.getSpans({ spanType, includeScorers });
  }
  /**
   * Get the thread (preprocessed messages) for this trace.
   * Calls the API with the project_default preprocessor (which falls back to "thread").
   */
  async getThread(options) {
    const cacheKey = _nullishCoalesce(_optionalChain([options, 'optionalAccess', _146 => _146.preprocessor]), () => ( "project_default"));
    if (!this.threadCache.has(cacheKey)) {
      const promise = this.fetchThread(options);
      this.threadCache.set(cacheKey, promise);
    }
    return this.threadCache.get(cacheKey);
  }
  async fetchThread(options) {
    await this.ensureSpansReady();
    await this.state.login({});
    const result = await invoke({
      globalFunction: _nullishCoalesce(_optionalChain([options, 'optionalAccess', _147 => _147.preprocessor]), () => ( "project_default")),
      functionType: "preprocessor",
      input: {
        trace_ref: {
          object_type: this.objectType,
          object_id: this.objectId,
          root_span_id: this.rootSpanId
        }
      },
      mode: "json",
      state: this.state
    });
    return Array.isArray(result) ? result : [];
  }
  async ensureSpansReady() {
    if (this.spansFlushed || !this.ensureSpansFlushed) {
      return;
    }
    if (!this.spansFlushPromise) {
      this.spansFlushPromise = this.ensureSpansFlushed().then(
        () => {
          this.spansFlushed = true;
        },
        (err) => {
          this.spansFlushPromise = null;
          throw err;
        }
      );
    }
    await this.spansFlushPromise;
  }
}, _class6);

// src/reporters/progress.ts
var SimpleProgressReporter = class {
  start(name, _total) {
    console.log(`Running evaluator ${name}`);
  }
  stop() {
  }
  increment(_name) {
  }
  setTotal(_name, _total) {
  }
};

// src/eval-parameters.ts

var _ajv = require('ajv'); var _ajv2 = _interopRequireDefault(_ajv);

// src/prompt-schemas.ts

var promptContentsSchema = _v3.z.union([
  _v3.z.object({
    prompt: _v3.z.string()
  }),
  _v3.z.object({
    messages: _v3.z.array(_chunkQRHGVBKUjs.ChatCompletionMessageParam)
  })
]);
var promptDefinitionSchema = promptContentsSchema.and(
  _v3.z.object({
    model: _v3.z.string(),
    params: _chunkQRHGVBKUjs.ModelParams.optional(),
    templateFormat: _v3.z.enum(["mustache", "nunjucks", "none"]).optional(),
    environments: _v3.z.array(_v3.z.string()).optional()
  })
);
var promptDefinitionWithToolsSchema = promptDefinitionSchema.and(
  _v3.z.object({
    tools: _v3.z.array(_chunkQRHGVBKUjs.ToolFunctionDefinition).optional()
  })
);
function promptDefinitionToPromptData(promptDefinition, rawTools) {
  const promptBlock = "messages" in promptDefinition ? {
    type: "chat",
    messages: promptDefinition.messages,
    tools: rawTools && rawTools.length > 0 ? JSON.stringify(rawTools) : void 0
  } : {
    type: "completion",
    content: promptDefinition.prompt
  };
  return {
    prompt: promptBlock,
    options: {
      model: promptDefinition.model,
      params: promptDefinition.params
    },
    ...promptDefinition.templateFormat ? { template_format: promptDefinition.templateFormat } : {}
  };
}

// src/eval-parameters.ts
var evalParametersSchema = _v3.z.record(
  _v3.z.string(),
  _v3.z.union([
    _v3.z.object({
      type: _v3.z.literal("prompt"),
      default: promptDefinitionWithToolsSchema.optional(),
      description: _v3.z.string().optional()
    }),
    _v3.z.object({
      type: _v3.z.literal("model"),
      default: _v3.z.string().optional(),
      description: _v3.z.string().optional()
    }),
    _v3.z.instanceof(_v3.z.ZodType)
    // For Zod schemas
  ])
);
async function validateParameters(parameters, parameterSchema) {
  let resolvedSchema = parameterSchema;
  if (resolvedSchema instanceof Promise) {
    resolvedSchema = await resolvedSchema;
  }
  if (resolvedSchema === void 0 || resolvedSchema === null) {
    return parameters;
  }
  if (_chunkQRHGVBKUjs.RemoteEvalParameters.isParameters(resolvedSchema)) {
    const mergedParameters = parameters && Object.keys(parameters).length > 0 ? {
      ...resolvedSchema.data,
      ...parameters
    } : resolvedSchema.data;
    return validateParametersWithJsonSchema(
      mergedParameters,
      resolvedSchema.schema
    );
  }
  return validateParametersWithZod(
    parameters,
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    resolvedSchema
  );
}
function validateParametersWithZod(parameters, parameterSchema) {
  return Object.fromEntries(
    Object.entries(parameterSchema).map(([name, schema]) => {
      const value = parameters[name];
      try {
        if ("type" in schema && schema.type === "prompt") {
          const promptData = value ? _chunkQRHGVBKUjs.PromptData.parse(value) : schema.default ? promptDefinitionToPromptData(
            schema.default,
            schema.default.tools
          ) : void 0;
          if (!promptData) {
            throw new Error(`Parameter '${name}' is required`);
          }
          return [name, _chunkQRHGVBKUjs.Prompt.fromPromptData(name, promptData)];
        } else if ("type" in schema && schema.type === "model") {
          const model = _nullishCoalesce(value, () => ( schema.default));
          if (model === void 0) {
            throw new Error(`Parameter '${name}' is required`);
          }
          if (typeof model !== "string") {
            throw new Error(
              `Parameter '${name}' must be a string model identifier`
            );
          }
          return [name, model];
        } else {
          const schemaCasted = schema;
          return [name, schemaCasted.parse(value)];
        }
      } catch (e) {
        console.error("Error validating parameter", name, e);
        throw Error(
          `Invalid parameter '${name}': ${e instanceof Error ? e.message : String(e)}`
        );
      }
    })
  );
}
function validateParametersWithJsonSchema(parameters, schema) {
  const ajv = new (0, _ajv2.default)({ coerceTypes: true, useDefaults: true, strict: false });
  const validate = ajv.compile(schema);
  if (!validate(parameters)) {
    const errorMessages = _optionalChain([validate, 'access', _148 => _148.errors, 'optionalAccess', _149 => _149.map, 'call', _150 => _150((err) => {
      const path = err.instancePath || "root";
      return `${path}: ${err.message}`;
    }), 'access', _151 => _151.join, 'call', _152 => _152(", ")]);
    throw Error(`Invalid parameters: ${errorMessages}`);
  }
  return rehydrateRemoteParameters(parameters, schema);
}
function rehydrateRemoteParameters(parameters, schema) {
  const schemaProperties = schema.properties;
  if (typeof schemaProperties !== "object" || schemaProperties === null) {
    return parameters;
  }
  return Object.fromEntries(
    Object.entries(parameters).map(([name, value]) => {
      const propertySchema = Reflect.get(schemaProperties, name);
      if (typeof propertySchema !== "object" || propertySchema === null) {
        return [name, value];
      }
      if (Reflect.get(propertySchema, "x-bt-type") === "prompt") {
        return [
          name,
          _chunkQRHGVBKUjs.Prompt.fromPromptData(name, _chunkQRHGVBKUjs.PromptData.parse(value))
        ];
      }
      return [name, value];
    })
  );
}

// src/framework.ts
function BaseExperiment(options = {}) {
  return { _type: "BaseExperiment", ...options };
}
var EvalResultWithSummary = class {
  constructor(summary, results) {
    this.summary = summary;
    this.results = results;
  }
  
  
  /**
   * @deprecated Use `summary` instead.
   */
  toString() {
    return JSON.stringify(this.summary);
  }
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `EvalResultWithSummary(summary="...", results=[...])`;
  }
  toJSON() {
    return {
      summary: this.summary,
      results: this.results
    };
  }
};
async function getPersistedBaseExperimentId(experiment) {
  try {
    return await experiment._getBaseExperimentId();
  } catch (e9) {
    return void 0;
  }
}
function makeEvalName(projectName, experimentName) {
  let out = projectName;
  if (experimentName) {
    out += ` [experimentName=${experimentName}]`;
  }
  return out;
}
function initExperiment2(state, options = {}) {
  return _chunkQRHGVBKUjs.init.call(void 0, {
    state,
    ...options,
    setCurrent: false
  });
}
async function getExperimentParametersRef(parameters) {
  if (!parameters) {
    return void 0;
  }
  const resolvedParameters = parameters instanceof Promise ? await parameters : parameters;
  if (!_chunkQRHGVBKUjs.RemoteEvalParameters.isParameters(resolvedParameters)) {
    return void 0;
  }
  if (resolvedParameters.id === void 0) {
    return void 0;
  }
  return {
    id: resolvedParameters.id,
    version: resolvedParameters.version
  };
}
function callEvaluatorData(data) {
  const dataResult = typeof data === "function" ? data() : data;
  let baseExperiment = void 0;
  if ("_type" in dataResult && dataResult._type === "BaseExperiment") {
    baseExperiment = dataResult.name;
  }
  return {
    data: dataResult,
    baseExperiment
  };
}
function isAsyncIterable2(value) {
  return typeof value === "object" && value !== null && Symbol.asyncIterator in value && typeof value[Symbol.asyncIterator] === "function";
}
function isIterable(value) {
  return typeof value === "object" && value !== null && Symbol.iterator in value && typeof value[Symbol.iterator] === "function";
}
globalThis._evals = {
  functions: [],
  prompts: [],
  parameters: [],
  evaluators: {},
  reporters: {}
};
function _initializeSpanContext() {
  globalThis._spanContext = { currentSpan: _chunkQRHGVBKUjs.currentSpan, withCurrent: _chunkQRHGVBKUjs.withCurrent, startSpan: _chunkQRHGVBKUjs.startSpan, NOOP_SPAN: _chunkQRHGVBKUjs.NOOP_SPAN };
}
async function Eval(name, evaluator, reporterOrOpts) {
  const options = _chunkQRHGVBKUjs.isEmpty.call(void 0, reporterOrOpts) ? {} : typeof reporterOrOpts === "string" ? { reporter: reporterOrOpts } : "name" in reporterOrOpts ? { reporter: reporterOrOpts } : reporterOrOpts;
  let evalName = makeEvalName(name, evaluator.experimentName);
  if (globalThis._evals.evaluators[evalName]) {
    evalName = `${evalName}_${Object.keys(_evals).length}`;
  }
  if (globalThis._lazy_load) {
    globalThis._evals.evaluators[evalName] = {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      evaluator: {
        evalName,
        projectName: name,
        ...evaluator
      },
      reporter: options.reporter
    };
    _initializeSpanContext();
    return new EvalResultWithSummary(
      {
        scores: {},
        metrics: {},
        projectName: "",
        experimentName: ""
      },
      []
    );
  }
  const progressReporter = _nullishCoalesce(options.progress, () => ( new SimpleProgressReporter()));
  const shouldCollectResults = _nullishCoalesce(options.returnResults, () => ( true));
  if (typeof options.reporter === "string") {
    throw new Error(
      "Must specify a reporter object, not a name. Can only specify reporter names when running 'braintrust eval'"
    );
  }
  const resolvedReporter = options.reporter || defaultReporter;
  try {
    const { data, baseExperiment: defaultBaseExperiment } = callEvaluatorData(
      evaluator.data
    );
    const parameters = await getExperimentParametersRef(evaluator.parameters);
    const experiment = options.parent || options.noSendLogs ? null : initExperiment2(evaluator.state, {
      ...evaluator.projectId ? { projectId: evaluator.projectId } : { project: name },
      experiment: evaluator.experimentName,
      description: evaluator.description,
      metadata: evaluator.metadata,
      tags: evaluator.tags,
      isPublic: evaluator.isPublic,
      update: evaluator.update,
      baseExperiment: _nullishCoalesce(evaluator.baseExperimentName, () => ( defaultBaseExperiment)),
      baseExperimentId: evaluator.baseExperimentId,
      gitMetadataSettings: evaluator.gitMetadataSettings,
      repoInfo: evaluator.repoInfo,
      dataset: _chunkQRHGVBKUjs.Dataset.isDataset(data) ? data : void 0,
      parameters
    });
    if (experiment && typeof process !== "undefined" && globalThis.BRAINTRUST_CONTEXT_MANAGER !== void 0) {
      await experiment._waitForId();
    }
    if (experiment && options.onStart) {
      const summary = await experiment.summarize({ summarizeScores: false });
      options.onStart(summary);
    }
    try {
      const evalDef = {
        evalName,
        projectName: name,
        ...evaluator,
        data
      };
      const enableCache = _nullishCoalesce(options.enableCache, () => ( true));
      let ret;
      if (options.parent) {
        ret = await _chunkQRHGVBKUjs.withParent.call(void 0, 
          options.parent,
          () => runEvaluator(
            null,
            evalDef,
            progressReporter,
            [],
            options.stream,
            options.parameters,
            shouldCollectResults,
            enableCache
          ),
          evaluator.state
        );
      } else {
        ret = await runEvaluator(
          experiment,
          evalDef,
          progressReporter,
          [],
          options.stream,
          options.parameters,
          shouldCollectResults,
          enableCache
        );
      }
      progressReporter.stop();
      resolvedReporter.reportEval(evalDef, ret, {
        verbose: true,
        jsonl: false
      });
      return ret;
    } finally {
      if (experiment) {
        await experiment.flush().catch(console.error);
      } else if (options.parent) {
        await _chunkQRHGVBKUjs.flush.call(void 0, { state: evaluator.state }).catch(console.error);
      }
    }
  } finally {
    progressReporter.stop();
  }
}
function Reporter(name, reporter) {
  const ret = { name, ...reporter };
  if (_evals.reporters[name]) {
    throw new Error(`Reporter ${name} already exists`);
  }
  if (globalThis._lazy_load) {
    _evals.reporters[name] = ret;
  }
  return ret;
}
function serializeJSONWithPlainString(v) {
  if (typeof v === "string") {
    return v;
  } else {
    return JSON.stringify(v);
  }
}
function evaluateFilter(object, filter2) {
  const { path, pattern } = filter2;
  const key = path.reduce(
    (acc, p) => typeof acc === "object" && acc !== null ? (
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      acc[p]
    ) : void 0,
    object
  );
  if (key === void 0) {
    return false;
  }
  return pattern.test(serializeJSONWithPlainString(key));
}
function scorerName(scorer, scorer_idx) {
  return scorer.name || `scorer_${scorer_idx}`;
}
function classifierName(classifier, classifier_idx) {
  return classifier.name || `classifier_${classifier_idx}`;
}
function buildSpanMetadata(results) {
  return results.length === 1 ? results[0].metadata : results.reduce(
    (prev, s) => _chunkQRHGVBKUjs.mergeDicts.call(void 0, prev, { [s.name]: s.metadata }),
    {}
  );
}
function buildSpanScores(results) {
  const scoresRecord = results.reduce(
    (prev, s) => _chunkQRHGVBKUjs.mergeDicts.call(void 0, prev, { [s.name]: s.score }),
    {}
  );
  return { resultMetadata: buildSpanMetadata(results), scoresRecord };
}
async function runInScorerSpan(rootSpan, spanName, spanType, propagatedEvent, eventInput, fn) {
  try {
    const value = await rootSpan.traced(fn, {
      name: spanName,
      spanAttributes: { type: spanType, purpose: "scorer" },
      propagatedEvent,
      event: { input: eventInput }
    });
    return { kind: "score", value };
  } catch (e) {
    return { kind: "error", value: e };
  }
}
function collectScoringResults(runResults, names, onResult) {
  const failing = [];
  runResults.forEach((r, i) => {
    if (r.kind === "score") {
      (_nullishCoalesce(r.value, () => ( []))).forEach(onResult);
    } else {
      failing.push({ name: names[i], error: r.value });
    }
  });
  return failing;
}
function validateClassificationResult(value, scorerName2) {
  if (!(typeof value === "object" && value !== null && !_chunkQRHGVBKUjs.isEmpty.call(void 0, value))) {
    throw new Error(
      `When returning structured classifier results, each classification must be a non-empty object. Got: ${JSON.stringify(value)}`
    );
  }
  if (!("name" in value) || typeof value.name !== "string" || !value.name) {
    const classification = value;
    classification.name = scorerName2;
    return classification;
  }
  return value;
}
function toClassificationItem(c) {
  return {
    id: c.id,
    label: _nullishCoalesce(c.label, () => ( c.id)),
    ...c.metadata !== void 0 ? { metadata: c.metadata } : {}
  };
}
function logScoringFailures(kind, failures, metadata, rootSpan, state) {
  if (!failures.length) return [];
  const errorMap = Object.fromEntries(
    failures.map(({ name, error }) => [
      name,
      error instanceof Error ? error.stack : `${error}`
    ])
  );
  metadata[`${kind}_errors`] = errorMap;
  rootSpan.log({ metadata: { [`${kind}_errors`]: errorMap } });
  _chunkQRHGVBKUjs.debugLogger.forState(state).warn(
    `Found exceptions for the following ${kind}s: ${Object.keys(errorMap).join(", ")}`,
    failures.map((f) => f.error)
  );
  return Object.keys(errorMap);
}
async function runEvaluator(experiment, evaluator, progressReporter, filters, stream, parameters, collectResults = true, enableCache = true) {
  if (!evaluator.scores && !evaluator.classifiers) {
    throw new Error(
      "Evaluator must include at least one of `scores` or `classifiers`"
    );
  }
  return await runEvaluatorInternal(
    experiment,
    evaluator,
    progressReporter,
    filters,
    stream,
    parameters,
    collectResults,
    enableCache
  );
}
var defaultErrorScoreHandler = ({
  rootSpan,
  data: _,
  unhandledScores
}) => {
  const scores = Object.fromEntries(unhandledScores.map((s) => [s, 0]));
  rootSpan.log({ scores });
  return scores;
};
async function runEvaluatorInternal(experiment, evaluator, progressReporter, filters, stream, parameters, collectResults, enableCache) {
  if (enableCache) {
    _optionalChain([(_nullishCoalesce(evaluator.state, () => ( _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, )))), 'optionalAccess', _153 => _153.spanCache, 'optionalAccess', _154 => _154.start, 'call', _155 => _155()]);
  }
  try {
    if (typeof evaluator.data === "string") {
      throw new Error("Unimplemented: string data paths");
    }
    let dataResult = typeof evaluator.data === "function" ? evaluator.data() : evaluator.data;
    parameters = await validateParameters(
      _nullishCoalesce(parameters, () => ( {})),
      evaluator.parameters
    );
    if ("_type" in dataResult) {
      if (dataResult._type !== "BaseExperiment") {
        throw new Error("Invalid _type");
      }
      if (!experiment) {
        throw new Error(
          "Cannot use BaseExperiment() without connecting to Braintrust (you most likely set --no-send-logs)"
        );
      }
      let name = dataResult.name;
      if (_chunkQRHGVBKUjs.isEmpty.call(void 0, name)) {
        const baseExperiment = await experiment.fetchBaseExperiment();
        if (!baseExperiment) {
          throw new Error("BaseExperiment() failed to fetch base experiment");
        }
        name = baseExperiment.name;
      }
      dataResult = initExperiment2(evaluator.state, {
        ...evaluator.projectId ? { projectId: evaluator.projectId } : { project: evaluator.projectName },
        experiment: name,
        open: true
      }).asDataset();
    }
    const resolvedDataResult = dataResult instanceof Promise ? await dataResult : dataResult;
    const dataIterable = (() => {
      if (isAsyncIterable2(resolvedDataResult)) {
        return resolvedDataResult;
      }
      if (Array.isArray(resolvedDataResult) || isIterable(resolvedDataResult)) {
        const iterable = resolvedDataResult;
        return (async function* () {
          for (const datum of iterable) {
            yield datum;
          }
        })();
      }
      throw new Error(
        "Evaluator data must be an array, iterable, or async iterable"
      );
    })();
    progressReporter.start(evaluator.evalName, 0);
    const experimentIdPromise = experiment ? (async () => {
      try {
        return await experiment.id;
      } catch (e10) {
        return void 0;
      }
    })() : void 0;
    const collectedResults = [];
    const localScoreAccumulator = experiment ? null : {};
    let cancelled = false;
    let scheduledTrials = 0;
    const q = queue(
      async ({
        datum,
        trialIndex
      }) => {
        if (cancelled) {
          return;
        }
        const eventDataset = experiment ? experiment.dataset : _chunkQRHGVBKUjs.Dataset.isDataset(evaluator.data) ? evaluator.data : void 0;
        const inlineDatasetOrigin = eventDataset && datum.id && datum._xact_id ? {
          object_type: "dataset",
          object_id: await eventDataset.id,
          id: datum.id,
          created: datum.created,
          _xact_id: datum._xact_id
        } : void 0;
        const parsedDatumOrigin = _chunkQRHGVBKUjs.ObjectReference.safeParse(datum.origin);
        const origin = _nullishCoalesce(inlineDatasetOrigin, () => ( (_optionalChain([parsedDatumOrigin, 'optionalAccess', _156 => _156.success]) ? parsedDatumOrigin.data : void 0)));
        const baseEvent = {
          name: "eval",
          spanAttributes: {
            type: "eval" /* EVAL */
          },
          event: {
            input: datum.input,
            expected: "expected" in datum ? datum.expected : void 0,
            tags: datum.tags,
            origin,
            ...datum.upsert_id ? { id: datum.upsert_id } : {}
          }
        };
        const callback = async (rootSpan) => {
          const state = _nullishCoalesce(evaluator.state, () => ( _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, )));
          const ensureSpansFlushed = async () => {
            if (experiment) {
              await _chunkQRHGVBKUjs.flush.call(void 0, { state: experiment.loggingState });
            } else if (state) {
              await _chunkQRHGVBKUjs.flush.call(void 0, { state });
            } else {
              await _chunkQRHGVBKUjs.flush.call(void 0, );
            }
            if (state) {
              await state.flushOtel();
            }
          };
          const parentStr = state.currentParent.getStore();
          const parentComponents = typeof parentStr === "string" ? _chunkQRHGVBKUjs.SpanComponentsV4.fromStr(parentStr) : null;
          const trace = state ? new LocalTrace({
            objectType: parentComponents ? _chunkQRHGVBKUjs.spanObjectTypeV3ToTypedString.call(void 0, 
              parentComponents.data.object_type
            ) : "experiment",
            objectId: await _asyncNullishCoalesce(await _asyncOptionalChain([parentComponents, 'optionalAccess', async _157 => _157.data, 'access', async _158 => _158.object_id]), async () => ( (experimentIdPromise ? await _asyncNullishCoalesce(await experimentIdPromise, async () => ( "")) : ""))),
            rootSpanId: rootSpan.rootSpanId,
            ensureSpansFlushed,
            state
          }) : void 0;
          let metadata = {
            ..."metadata" in datum ? datum.metadata : {}
          };
          const expected = "expected" in datum ? datum.expected : void 0;
          let output = void 0;
          let error = void 0;
          let tags = [..._nullishCoalesce(datum.tags, () => ( []))];
          const scores = {};
          const classifications = {};
          const scorerNames = (_nullishCoalesce(evaluator.scores, () => ( []))).map(scorerName);
          const classifierNames = (_nullishCoalesce(evaluator.classifiers, () => ( []))).map(
            classifierName
          );
          let unhandledScores = scorerNames;
          try {
            const meta = (o) => metadata = { ...metadata, ...o };
            await rootSpan.traced(
              async (span) => {
                const hooksForTask = {
                  meta,
                  metadata,
                  expected,
                  span,
                  parameters: _nullishCoalesce(parameters, () => ( {})),
                  reportProgress: (event) => {
                    _optionalChain([stream, 'optionalCall', _159 => _159({
                      ...event,
                      id: rootSpan.id,
                      origin: _optionalChain([baseEvent, 'access', _160 => _160.event, 'optionalAccess', _161 => _161.origin]),
                      name: evaluator.evalName,
                      object_type: "task"
                    })]);
                  },
                  trialIndex,
                  tags
                };
                const outputResult = evaluator.task(datum.input, hooksForTask);
                if (outputResult instanceof Promise) {
                  output = await outputResult;
                } else {
                  output = outputResult;
                }
                tags = _nullishCoalesce(hooksForTask.tags, () => ( []));
                span.log({ output });
              },
              {
                name: "task",
                spanAttributes: { type: "task" /* TASK */ },
                event: { input: datum.input }
              }
            );
            if (tags.length) {
              rootSpan.log({ output, metadata, expected, tags });
            } else {
              rootSpan.log({ output, metadata, expected });
            }
            if (evaluator.flushBeforeScoring) {
              await rootSpan.flush();
            }
            const scoringArgs = {
              input: datum.input,
              expected: "expected" in datum ? datum.expected : void 0,
              metadata,
              output,
              trace
            };
            const { trace: _trace, ...scoringArgsForLogging } = scoringArgs;
            const propagatedEvent = _chunkQRHGVBKUjs.makeScorerPropagatedEvent.call(void 0, 
              await rootSpan.export()
            );
            const getOtherFields = (s) => {
              const { metadata: _metadata, name: _name, ...rest } = s;
              return rest;
            };
            const [scoreResults, classificationResults] = await Promise.all([
              Promise.all(
                (_nullishCoalesce(evaluator.scores, () => ( []))).map(
                  (score, score_idx) => runInScorerSpan(
                    rootSpan,
                    scorerNames[score_idx],
                    "score" /* SCORE */,
                    propagatedEvent,
                    scoringArgsForLogging,
                    async (span) => {
                      const scoreValue = await Promise.resolve(
                        score(scoringArgs)
                      );
                      if (scoreValue === null) return null;
                      if (Array.isArray(scoreValue)) {
                        for (const s of scoreValue) {
                          if (!(typeof s === "object" && !_chunkQRHGVBKUjs.isEmpty.call(void 0, s))) {
                            throw new Error(
                              `When returning an array of scores, each score must be a non-empty object. Got: ${JSON.stringify(s)}`
                            );
                          }
                        }
                      }
                      const results = Array.isArray(scoreValue) ? scoreValue : typeof scoreValue === "object" && !_chunkQRHGVBKUjs.isEmpty.call(void 0, scoreValue) ? [scoreValue] : [
                        {
                          name: scorerNames[score_idx],
                          score: scoreValue
                        }
                      ];
                      const { resultMetadata, scoresRecord } = buildSpanScores(results);
                      const resultOutput = results.length === 1 ? getOtherFields(results[0]) : results.reduce(
                        (prev, s) => _chunkQRHGVBKUjs.mergeDicts.call(void 0, prev, {
                          [s.name]: getOtherFields(s)
                        }),
                        {}
                      );
                      span.log({
                        output: resultOutput,
                        metadata: resultMetadata,
                        scores: scoresRecord
                      });
                      return results;
                    }
                  )
                )
              ),
              Promise.all(
                (_nullishCoalesce(evaluator.classifiers, () => ( []))).map(
                  (classifier, idx) => runInScorerSpan(
                    rootSpan,
                    classifierNames[idx],
                    "classifier" /* CLASSIFIER */,
                    propagatedEvent,
                    scoringArgsForLogging,
                    async (span) => {
                      const classifierValue = await Promise.resolve(
                        classifier(scoringArgs)
                      );
                      if (classifierValue === null) return null;
                      const rawResults = (Array.isArray(classifierValue) ? classifierValue : [classifierValue]).map(
                        (result) => validateClassificationResult(
                          result,
                          classifierNames[idx]
                        )
                      );
                      const resultOutput = rawResults.length === 1 ? toClassificationItem(rawResults[0]) : rawResults.reduce(
                        (prev, r) => _chunkQRHGVBKUjs.mergeDicts.call(void 0, prev, {
                          [r.name]: toClassificationItem(r)
                        }),
                        {}
                      );
                      span.log({
                        output: resultOutput,
                        metadata: buildSpanMetadata(rawResults)
                      });
                      return rawResults;
                    }
                  )
                )
              )
            ]);
            const failingScorers = collectScoringResults(
              scoreResults,
              scorerNames,
              (result) => {
                scores[result.name] = result.score;
              }
            );
            const failingClassifiers = collectScoringResults(
              classificationResults,
              classifierNames,
              (result) => {
                const item = toClassificationItem(result);
                if (!classifications[result.name]) {
                  classifications[result.name] = [];
                }
                classifications[result.name].push(item);
              }
            );
            if (Object.keys(classifications).length > 0) {
              rootSpan.log({ classifications });
            }
            const failedScorerNames = logScoringFailures(
              "scorer",
              failingScorers,
              metadata,
              rootSpan,
              evaluator.state
            );
            unhandledScores = failedScorerNames.length ? failedScorerNames : null;
            logScoringFailures(
              "classifier",
              failingClassifiers,
              metadata,
              rootSpan,
              evaluator.state
            );
          } catch (e) {
            _chunkQRHGVBKUjs.logError.call(void 0, rootSpan, e);
            error = e;
          } finally {
            progressReporter.increment(evaluator.evalName);
          }
          const mergedScores = {
            ...evaluator.errorScoreHandler && unhandledScores ? evaluator.errorScoreHandler({
              rootSpan,
              data: datum,
              unhandledScores
            }) : void 0,
            ...scores
          };
          if (localScoreAccumulator) {
            accumulateScores(localScoreAccumulator, mergedScores);
          }
          if (collectResults) {
            const baseResult = {
              input: datum.input,
              ..."expected" in datum ? { expected: datum.expected } : {},
              output,
              tags: tags.length ? tags : void 0,
              metadata,
              error,
              origin: _optionalChain([baseEvent, 'access', _162 => _162.event, 'optionalAccess', _163 => _163.origin])
            };
            collectedResults.push({
              ...baseResult,
              scores: mergedScores,
              ...Object.keys(classifications).length > 0 ? { classifications } : {}
            });
          }
        };
        if (!experiment) {
          return await _chunkQRHGVBKUjs.traced.call(void 0, callback, {
            ...baseEvent,
            state: evaluator.state
          });
        } else {
          const result = await experiment.traced(callback, baseEvent);
          const bgLogger = experiment.loggingState.bgLogger();
          if (evaluator.maxConcurrency !== void 0 && bgLogger.pendingFlushBytes() >= bgLogger.flushBackpressureBytes()) {
            await experiment.flush();
          }
          return result;
        }
      },
      Math.max(_nullishCoalesce(evaluator.maxConcurrency, () => ( Number.MAX_SAFE_INTEGER)), 1)
    );
    const queueErrors = [];
    const enqueuePromise = (async () => {
      for await (const datum of dataIterable) {
        if (cancelled) {
          break;
        }
        if (!filters.every((f) => evaluateFilter(datum, f))) {
          continue;
        }
        const trialCount = _nullishCoalesce(_nullishCoalesce(datum.trialCount, () => ( evaluator.trialCount)), () => ( 1));
        for (let trialIndex = 0; trialIndex < trialCount; trialIndex++) {
          if (cancelled) {
            break;
          }
          scheduledTrials++;
          _optionalChain([progressReporter, 'access', _164 => _164.setTotal, 'optionalCall', _165 => _165(evaluator.evalName, scheduledTrials)]);
          q.pushAsync({ datum, trialIndex }).catch((e) => {
            if (queueErrors.length < 5) {
              queueErrors.push(e);
            }
          });
        }
      }
    })();
    let timeoutId;
    let abortHandler;
    const cleanupCancellation = () => {
      if (timeoutId !== void 0) {
        clearTimeout(timeoutId);
        timeoutId = void 0;
      }
      if (abortHandler && evaluator.signal) {
        evaluator.signal.removeEventListener("abort", abortHandler);
        abortHandler = void 0;
      }
    };
    const cancel = async () => {
      await new Promise((_, reject2) => {
        if (cancelled) {
          reject2(new (0, _chunkQRHGVBKUjs.InternalAbortError)("Evaluator already cancelled"));
          return;
        }
        const rejectOnce = (error) => {
          if (cancelled) {
            return;
          }
          cancelled = true;
          cleanupCancellation();
          reject2(error);
        };
        if (evaluator.timeout) {
          timeoutId = setTimeout(() => {
            rejectOnce(new (0, _chunkQRHGVBKUjs.InternalAbortError)("Evaluator timed out"));
          }, evaluator.timeout);
        }
        if (evaluator.signal) {
          abortHandler = () => {
            rejectOnce(new (0, _chunkQRHGVBKUjs.InternalAbortError)("Evaluator aborted"));
          };
          evaluator.signal.addEventListener("abort", abortHandler);
        }
      });
    };
    const waitForQueue = (async () => {
      await enqueuePromise;
      if (q.idle()) {
        return;
      }
      await q.drain();
    })();
    try {
      await Promise.race([waitForQueue, cancel()]);
      if (queueErrors.length > 0) {
        throw new AggregateError(
          queueErrors,
          `Encountered ${queueErrors.length} unhandled task errors`
        );
      }
    } catch (e) {
      q.kill();
      if (e instanceof _chunkQRHGVBKUjs.InternalAbortError) {
        if (_chunkMF7NU6BTjs.isomorph_default.getEnv("BRAINTRUST_VERBOSE")) {
          _chunkQRHGVBKUjs.debugLogger.forState(evaluator.state).warn("Evaluator cancelled:", e.message);
        }
      }
      throw e;
    } finally {
      cleanupCancellation();
      if (!collectResults) {
        collectedResults.length = 0;
      }
    }
    const comparisonExperimentId = experiment ? await _asyncNullishCoalesce(evaluator.baseExperimentId, async () => ( await getPersistedBaseExperimentId(experiment))) : void 0;
    const summary = experiment ? await experiment.summarize({
      summarizeScores: evaluator.summarizeScores,
      ...comparisonExperimentId !== void 0 ? { comparisonExperimentId } : {}
    }) : buildLocalSummary(
      evaluator,
      collectResults ? collectedResults : [],
      _nullishCoalesce(localScoreAccumulator, () => ( void 0))
    );
    return new EvalResultWithSummary(
      summary,
      collectResults ? collectedResults : []
    );
  } finally {
    if (enableCache) {
      const spanCache = _optionalChain([(_nullishCoalesce(evaluator.state, () => ( _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, )))), 'optionalAccess', _166 => _166.spanCache]);
      _optionalChain([spanCache, 'optionalAccess', _167 => _167.dispose, 'call', _168 => _168()]);
      _optionalChain([spanCache, 'optionalAccess', _169 => _169.stop, 'call', _170 => _170()]);
    }
  }
}
var warning = (text) => `Warning: ${text}`;
function logError2(e, verbose) {
  if (!verbose) {
    console.error(`${e}`);
  } else {
    console.error(e);
  }
}
function accumulateScores(accumulator, scores) {
  if (!scores) {
    return;
  }
  for (const [name, score] of Object.entries(scores)) {
    if (score === null || score === void 0) {
      continue;
    }
    const existing = _nullishCoalesce(accumulator[name], () => ( { total: 0, count: 0 }));
    accumulator[name] = {
      total: existing.total + score,
      count: existing.count + 1
    };
  }
}
function ensureScoreAccumulator(results) {
  const accumulator = {};
  for (const result of results) {
    accumulateScores(accumulator, result.scores);
  }
  return accumulator;
}
function buildLocalSummary(evaluator, results, precomputedScores) {
  const scoresByName = _nullishCoalesce(precomputedScores, () => ( ensureScoreAccumulator(results)));
  return {
    projectName: evaluator.projectName,
    experimentName: evaluator.evalName,
    scores: Object.fromEntries(
      Object.entries(scoresByName).map(([name, { total, count }]) => [
        name,
        {
          name,
          score: count === 0 ? 0 : total / count,
          improvements: 0,
          regressions: 0
        }
      ])
    )
  };
}
function reportFailures(evaluator, failingResults, { verbose, jsonl }) {
  if (failingResults.length > 0) {
    console.error(
      warning(
        `Evaluator ${evaluator.evalName} failed with ${failingResults.length} error${failingResults.length === 1 ? "" : "s"}. This evaluation ("${evaluator.evalName}") will not be fully logged.`
      )
    );
    if (jsonl) {
      console.log(
        JSON.stringify({
          evaluatorName: evaluator.evalName,
          errors: failingResults.map(
            (r) => `${r.error instanceof Error ? r.error.stack : r.error}`
          )
        })
      );
    } else {
      for (const result of failingResults) {
        logError2(result.error, verbose);
      }
    }
    if (!verbose && !jsonl) {
      console.error(
        warning(
          "Use --debug-logging debug to see full stack traces and troubleshooting details."
        )
      );
    }
  }
}
var defaultReporter = {
  name: "Braintrust default reporter",
  async reportEval(evaluator, result, { verbose, jsonl }) {
    const { results, summary } = result;
    const failingResults = results.filter(
      (r) => r.error !== void 0
    );
    if (failingResults.length > 0) {
      reportFailures(evaluator, failingResults, { verbose, jsonl });
    }
    if (jsonl) {
      _chunkMF7NU6BTjs.isomorph_default.writeln(JSON.stringify(summary));
    } else {
      _chunkMF7NU6BTjs.isomorph_default.writeln("Experiment summary");
      _chunkMF7NU6BTjs.isomorph_default.writeln("==================");
      if (summary.comparisonExperimentName) {
        _chunkMF7NU6BTjs.isomorph_default.writeln(
          `${summary.comparisonExperimentName} (baseline) <- ${summary.experimentName} (comparison)`
        );
        _chunkMF7NU6BTjs.isomorph_default.writeln("");
      }
      const hasScores = Object.keys(summary.scores).length > 0;
      const hasMetrics = Object.keys(_nullishCoalesce(summary.metrics, () => ( {}))).length > 0;
      const hasComparison = !!summary.comparisonExperimentName;
      if (hasScores || hasMetrics) {
        if (hasComparison) {
          _chunkMF7NU6BTjs.isomorph_default.writeln(
            "Name                Value      Change     Improvements Regressions"
          );
          _chunkMF7NU6BTjs.isomorph_default.writeln(
            "----------------------------------------------------------------"
          );
        }
        for (const score of Object.values(summary.scores)) {
          const scorePercent = (score.score * 100).toFixed(2);
          const scoreValue = `${scorePercent}%`;
          if (hasComparison) {
            let diffString = "-";
            if (!_chunkQRHGVBKUjs.isEmpty.call(void 0, score.diff)) {
              const diffPercent = (score.diff * 100).toFixed(2);
              const diffSign = score.diff > 0 ? "+" : "";
              diffString = `${diffSign}${diffPercent}%`;
            }
            const improvements = score.improvements > 0 ? score.improvements.toString() : "-";
            const regressions = score.regressions > 0 ? score.regressions.toString() : "-";
            _chunkMF7NU6BTjs.isomorph_default.writeln(
              `${score.name.padEnd(18)} ${scoreValue.padStart(10)} ${diffString.padStart(10)} ${improvements.padStart(12)} ${regressions.padStart(11)}`
            );
          } else {
            _chunkMF7NU6BTjs.isomorph_default.writeln(`${score.name.padEnd(20)} ${scoreValue.padStart(15)}`);
          }
        }
        for (const metric of Object.values(_nullishCoalesce(summary.metrics, () => ( {})))) {
          const fractionDigits = Number.isInteger(metric.metric) ? 0 : 2;
          const formattedValue = metric.metric.toFixed(fractionDigits);
          const metricValue = metric.unit === "$" ? `${metric.unit}${formattedValue}` : `${formattedValue}${metric.unit}`;
          if (hasComparison) {
            let diffString = "-";
            if (!_chunkQRHGVBKUjs.isEmpty.call(void 0, metric.diff)) {
              const diffPercent = (metric.diff * 100).toFixed(2);
              const diffSign = metric.diff > 0 ? "+" : "";
              diffString = `${diffSign}${diffPercent}%`;
            }
            const improvements = metric.improvements > 0 ? metric.improvements.toString() : "-";
            const regressions = metric.regressions > 0 ? metric.regressions.toString() : "-";
            _chunkMF7NU6BTjs.isomorph_default.writeln(
              `${metric.name.padEnd(18)} ${metricValue.padStart(10)} ${diffString.padStart(10)} ${improvements.padStart(12)} ${regressions.padStart(11)}`
            );
          } else {
            _chunkMF7NU6BTjs.isomorph_default.writeln(
              `${metric.name.padEnd(20)} ${metricValue.padStart(15)}`
            );
          }
        }
      }
      if (summary.experimentUrl) {
        _chunkMF7NU6BTjs.isomorph_default.writeln("");
        _chunkMF7NU6BTjs.isomorph_default.writeln(`View results for ${summary.experimentName}`);
        _chunkMF7NU6BTjs.isomorph_default.writeln(`See results at ${summary.experimentUrl}`);
      }
    }
    _chunkMF7NU6BTjs.isomorph_default.writeln("");
    return failingResults.length === 0;
  },
  async reportRun(evalReports) {
    return evalReports.every((r) => r);
  }
};

// src/agent-assertions.ts
function agentAssertionScorer(callback, options = {}) {
  return async (args) => {
    const { trace: _trace, ...callbackArgs } = args;
    const callbackMetadata = _nullishCoalesce(callbackArgs.metadata, () => ( {}));
    const assertions = await callback({
      ...callbackArgs,
      metadata: callbackMetadata,
      assert: agentAssertionHelpers
    });
    const resources = {};
    if (assertions.some((assertion) => assertion.requiresTrace)) {
      resources.spans = await _optionalChain([args, 'access', _171 => _171.trace, 'optionalAccess', _172 => _172.getSpans, 'call', _173 => _173({ spanType: ["tool"] })]);
    }
    const results = await Promise.all(
      assertions.map(async (assertion) => {
        const result = await assertion.evaluate(resources);
        return {
          name: assertion.name,
          passed: result.passed,
          failure: result.failure
        };
      })
    );
    const passed = results.filter((result) => result.passed).length;
    const total = results.length;
    const failed = results.filter((result) => !result.passed).map(
      (result) => `${result.name}: ${_nullishCoalesce(result.failure, () => ( "assertion did not pass"))}`
    );
    return {
      name: _nullishCoalesce(options.name, () => ( "assertions")),
      score: total === 0 ? 1 : passed / total,
      metadata: {
        assertions: results.map(({ name, passed: passed2 }) => ({ name, passed: passed2 })),
        failed
      }
    };
  };
}
var agentAssertionHelpers = {
  equals: (actual, expected, name = "equals") => ({
    name,
    evaluate: () => {
      const passed = deepEqual(actual, expected);
      return {
        passed,
        failure: passed ? void 0 : `expected ${formatValue(actual)} to equal ${formatValue(expected)}`
      };
    }
  }),
  notEquals: (actual, expected, name = "not equals") => ({
    name,
    evaluate: () => {
      const passed = !deepEqual(actual, expected);
      return {
        passed,
        failure: passed ? void 0 : `expected ${formatValue(actual)} not to equal ${formatValue(expected)}`
      };
    }
  }),
  contains: (value, expected, name = "contains") => ({
    name,
    evaluate: () => {
      const searchedValue = typeof value === "string" ? value : formatValue(value);
      const passed = expected instanceof RegExp ? testRegex(expected, value) : searchedValue.includes(expected);
      return {
        passed,
        failure: passed ? void 0 : `expected ${formatValue(value)} to contain ${formatValue(expected)}`
      };
    }
  }),
  matches: (value, schema, name = "matches schema") => ({
    name,
    evaluate: async () => {
      const result = await validateSchema(schema, value);
      return {
        passed: result.passed,
        failure: result.passed ? void 0 : `expected value to match schema: ${result.message}`
      };
    }
  }),
  calledTool: (toolName, options = {}, name = `called tool ${toolName}`) => ({
    name,
    requiresTrace: true,
    evaluate: ({ spans }) => {
      const calls = matchingToolCalls(_nullishCoalesce(spans, () => ( [])), toolName, options);
      const passed = options.times === void 0 ? calls.length > 0 : calls.length === options.times;
      return {
        passed,
        failure: passed ? void 0 : options.times === void 0 ? `expected tool "${toolName}" to be called; found ${calls.length} matching call${calls.length === 1 ? "" : "s"}` : `expected tool "${toolName}" to be called ${options.times} time${options.times === 1 ? "" : "s"}; found ${calls.length} matching call${calls.length === 1 ? "" : "s"}`
      };
    }
  }),
  notCalledTool: (toolName, name = `did not call tool ${toolName}`) => ({
    name,
    requiresTrace: true,
    evaluate: ({ spans }) => {
      const calls = toolCalls(_nullishCoalesce(spans, () => ( []))).filter(
        (span) => getToolName(span) === toolName
      );
      const passed = calls.length === 0;
      return {
        passed,
        failure: passed ? void 0 : `expected tool "${toolName}" not to be called; found ${calls.length} call${calls.length === 1 ? "" : "s"}`
      };
    }
  }),
  toolOrder: (toolNames, name = "tool order") => ({
    name,
    requiresTrace: true,
    evaluate: ({ spans }) => {
      const observed = toolCalls(_nullishCoalesce(spans, () => ( []))).map(getToolName).filter((toolName) => toolName !== void 0);
      let fromIndex = 0;
      const passed = toolNames.every((toolName) => {
        const index = observed.indexOf(toolName, fromIndex);
        if (index === -1) return false;
        fromIndex = index + 1;
        return true;
      });
      return {
        passed,
        failure: passed ? void 0 : `expected tool order ${toolNames.join(" -> ")}; observed ${observed.join(" -> ") || "no tools"}`
      };
    }
  }),
  usedNoTools: (name = "used no tools") => ({
    name,
    requiresTrace: true,
    evaluate: ({ spans }) => {
      const calls = toolCalls(_nullishCoalesce(spans, () => ( [])));
      const passed = calls.length === 0;
      return {
        passed,
        failure: passed ? void 0 : `expected no tool calls; found ${calls.length}`
      };
    }
  }),
  maxToolCalls: (max, name = `at most ${max} tool calls`) => ({
    name,
    requiresTrace: true,
    evaluate: ({ spans }) => {
      const calls = toolCalls(_nullishCoalesce(spans, () => ( [])));
      const passed = calls.length <= max;
      return {
        passed,
        failure: passed ? void 0 : `expected at most ${max} tool call${max === 1 ? "" : "s"}; found ${calls.length}`
      };
    }
  })
};
async function validateSchema(schema, value) {
  try {
    if ("safeParse" in schema) {
      const result2 = schema.safeParse(value);
      return result2.success ? { passed: true, message: "" } : { passed: false, message: formatSchemaError(result2.error) };
    }
    if ("parse" in schema) {
      schema.parse(value);
      return { passed: true, message: "" };
    }
    const result = await schema["~standard"].validate(value);
    if (typeof result === "object" && result !== null && "issues" in result && Array.isArray(result.issues) && result.issues.length > 0) {
      return { passed: false, message: formatValue(result.issues) };
    }
    return { passed: true, message: "" };
  } catch (e) {
    return { passed: false, message: formatSchemaError(e) };
  }
}
function toolCalls(spans) {
  return spans.filter((span) => _optionalChain([span, 'access', _174 => _174.span_attributes, 'optionalAccess', _175 => _175.type]) === "tool");
}
function matchingToolCalls(spans, toolName, options) {
  return toolCalls(spans).filter((span) => {
    if (getToolName(span) !== toolName) return false;
    if (Object.prototype.hasOwnProperty.call(options, "input") && !matchesValue(span.input, options.input)) {
      return false;
    }
    if (Object.prototype.hasOwnProperty.call(options, "output") && !matchesValue(span.output, options.output)) {
      return false;
    }
    if (options.isError !== void 0 && Boolean(span.error) !== options.isError) {
      return false;
    }
    return true;
  });
}
function getToolName(span) {
  const spanName = [_optionalChain([span, 'access', _176 => _176.span_attributes, 'optionalAccess', _177 => _177.name]), span.name].map(normalizeToolName).find((value) => value !== void 0);
  if (_optionalChain([spanName, 'optionalAccess', _178 => _178.includes, 'call', _179 => _179("/")])) {
    return spanName;
  }
  const metadataName = [
    _optionalChain([span, 'access', _180 => _180.metadata, 'optionalAccess', _181 => _181.tool_name]),
    _optionalChain([span, 'access', _182 => _182.metadata, 'optionalAccess', _183 => _183["gen_ai.tool.name"]])
  ].map(normalizeToolName).find((value) => value !== void 0);
  const mcpServer = [
    _optionalChain([span, 'access', _184 => _184.metadata, 'optionalAccess', _185 => _185["mcp.server"]]),
    _optionalChain([span, 'access', _186 => _186.metadata, 'optionalAccess', _187 => _187["openai_codex.mcp.server"]])
  ].find((value) => typeof value === "string" && value !== "");
  if (metadataName && mcpServer) {
    return `${mcpServer}/${metadataName}`;
  }
  return _nullishCoalesce(metadataName, () => ( spanName));
}
function normalizeToolName(value) {
  if (typeof value !== "string" || value === "") {
    return void 0;
  }
  return value.startsWith("tool:") ? value.slice("tool:".length).trim() : value;
}
function matchesValue(actual, matcher) {
  if (matcher instanceof RegExp) {
    return testRegex(matcher, actual);
  }
  if (typeof matcher === "function") {
    return matcher(actual);
  }
  if (Array.isArray(matcher)) {
    return Array.isArray(actual) && actual.length === matcher.length && matcher.every((value, index) => matchesValue(actual[index], value));
  }
  if (isPlainObject(matcher) && isPlainObject(actual)) {
    return Object.entries(matcher).every(
      ([key, value]) => Object.prototype.hasOwnProperty.call(actual, key) && matchesValue(actual[key], value)
    );
  }
  return deepEqual(actual, matcher);
}
function testRegex(matcher, value) {
  matcher.lastIndex = 0;
  return matcher.test(typeof value === "string" ? value : formatValue(value));
}
function deepEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (Array.isArray(left) && Array.isArray(right)) {
    return left.length === right.length && left.every((item, index) => deepEqual(item, right[index]));
  }
  if (isPlainObject(left) && isPlainObject(right)) {
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    return leftKeys.length === rightKeys.length && leftKeys.every(
      (key) => Object.prototype.hasOwnProperty.call(right, key) && deepEqual(left[key], right[key])
    );
  }
  return false;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
}
function formatSchemaError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return formatValue(error);
}
function formatValue(value) {
  if (value instanceof RegExp) {
    return value.toString();
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  try {
    const serialized = JSON.stringify(value);
    if (serialized !== void 0 && !hasUndefinedJsonValue(value)) {
      return serialized;
    }
    return formatValueWithUndefined(value, /* @__PURE__ */ new Set());
  } catch (e11) {
    return String(value);
  }
}
function hasUndefinedJsonValue(value, seen = /* @__PURE__ */ new Set()) {
  if (value === void 0) {
    return true;
  }
  if (typeof value !== "object" || value === null) {
    return false;
  }
  if (seen.has(value)) {
    return false;
  }
  seen.add(value);
  if (Array.isArray(value)) {
    return Array.from({ length: value.length }).some(
      (_, index) => hasUndefinedJsonValue(value[index], seen)
    );
  }
  return Object.keys(value).some(
    (key) => hasUndefinedJsonValue(value[key], seen)
  );
}
function formatValueWithUndefined(value, seen) {
  if (value === void 0) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return JSON.stringify(value);
  }
  if (typeof value === "bigint" || typeof value === "function") {
    return String(value);
  }
  if (typeof value === "symbol") {
    return String(value);
  }
  if (value instanceof RegExp) {
    return value.toString();
  }
  if (typeof value !== "object") {
    return String(value);
  }
  if (seen.has(value)) {
    return '"[Circular]"';
  }
  seen.add(value);
  if (typeof value.toJSON === "function") {
    const jsonValue = value.toJSON();
    seen.delete(value);
    return formatValueWithUndefined(jsonValue, seen);
  }
  if (Array.isArray(value)) {
    const formatted2 = Array.from(
      { length: value.length },
      (_, index) => formatValueWithUndefined(value[index], seen)
    );
    seen.delete(value);
    return `[${formatted2.join(",")}]`;
  }
  const formatted = Object.keys(value).map(
    (key) => `${JSON.stringify(key)}:${formatValueWithUndefined(
      value[key],
      seen
    )}`
  );
  seen.delete(value);
  return `{${formatted.join(",")}}`;
}

// src/dataset-pipeline.ts
function DatasetPipeline(definition) {
  if (!globalThis.__braintrust_dataset_pipelines) {
    globalThis.__braintrust_dataset_pipelines = [];
  }
  const storedDefinition = {
    name: definition.name,
    source: {
      projectId: definition.source.projectId,
      projectName: definition.source.projectName,
      orgName: definition.source.orgName,
      filter: definition.source.filter,
      scope: _nullishCoalesce(definition.source.scope, () => ( "span"))
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
    transform: definition.transform,
    target: {
      projectId: definition.target.projectId,
      projectName: definition.target.projectName,
      orgName: definition.target.orgName,
      datasetName: definition.target.datasetName,
      description: definition.target.description,
      metadata: definition.target.metadata
    }
  };
  globalThis.__braintrust_dataset_pipelines.push(storedDefinition);
}

// src/framework2.ts

var currentFilename = typeof __filename !== "undefined" ? __filename : "unknown";
var ProjectBuilder = class {
  create(opts) {
    return new Project2(opts);
  }
};
var projects = new ProjectBuilder();
var Project2 = (_class7 = class {
  
  
  
  
  
  
  
  __init16() {this._publishableCodeFunctions = []}
  __init17() {this._publishablePrompts = []}
  __init18() {this._publishableParameters = []}
  constructor(args) {;_class7.prototype.__init16.call(this);_class7.prototype.__init17.call(this);_class7.prototype.__init18.call(this);
    _initializeSpanContext();
    this.name = "name" in args ? args.name : void 0;
    this.id = "id" in args ? args.id : void 0;
    this.tools = new ToolBuilder(this);
    this.prompts = new PromptBuilder(this);
    this.parameters = new ParametersBuilder(this);
    this.scorers = new ScorerBuilder(this);
    this.classifiers = new ClassifierBuilder(this);
  }
  addPrompt(prompt) {
    this._publishablePrompts.push(prompt);
    if (globalThis._lazy_load) {
      globalThis._evals.prompts.push(prompt);
    }
  }
  addParameters(parameters) {
    this._publishableParameters.push(parameters);
    if (globalThis._lazy_load) {
      if (globalThis._evals.parameters == null)
        globalThis._evals.parameters = [];
      globalThis._evals.parameters.push(parameters);
    }
  }
  addCodeFunction(fn) {
    this._publishableCodeFunctions.push(fn);
    if (globalThis._lazy_load) {
      globalThis._evals.functions.push(fn);
    }
  }
  async publish() {
    if (globalThis._lazy_load) {
      console.warn("publish() is a no-op when running `braintrust push`.");
      return;
    }
    await _chunkQRHGVBKUjs.login.call(void 0, );
    const projectMap = new ProjectNameIdMap();
    const functionDefinitions = [];
    if (this._publishableCodeFunctions.length > 0) {
      console.warn(
        "Code functions cannot be published directly. Use `braintrust push` instead."
      );
    }
    if (this._publishablePrompts.length > 0) {
      for (const prompt of this._publishablePrompts) {
        const functionDefinition = await prompt.toFunctionDefinition(projectMap);
        functionDefinitions.push(functionDefinition);
      }
    }
    await _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, ).apiConn().post_json("insert-functions", {
      functions: functionDefinitions
    });
  }
}, _class7);
var ToolBuilder = (_class8 = class {
  constructor(project) {;_class8.prototype.__init19.call(this);
    this.project = project;
  }
  
  __init19() {this.taskCounter = 0}
  // This type definition is just a catch all so that the implementation can be
  // less specific than the two more specific declarations above.
  create(opts) {
    this.taskCounter++;
    opts = _nullishCoalesce(opts, () => ( {}));
    const { handler, name, slug, parameters, returns, ...rest } = opts;
    let resolvedName = _nullishCoalesce(name, () => ( handler.name));
    if (resolvedName.trim().length === 0) {
      resolvedName = `Tool ${_chunkMF7NU6BTjs.isomorph_default.basename(currentFilename)} ${this.taskCounter}`;
    }
    const tool = new CodeFunction(this.project, {
      handler,
      name: resolvedName,
      slug: _nullishCoalesce(slug, () => ( _chunkQRHGVBKUjs.slugify.call(void 0, resolvedName, { lower: true, strict: true }))),
      type: "tool",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
      parameters,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/consistent-type-assertions
      returns,
      ...rest
    });
    this.project.addCodeFunction(tool);
    return tool;
  }
}, _class8);
var ScorerBuilder = (_class9 = class {
  constructor(project) {;_class9.prototype.__init20.call(this);
    this.project = project;
  }
  
  __init20() {this.taskCounter = 0}
  create(opts) {
    this.taskCounter++;
    let resolvedName = opts.name;
    if (!resolvedName && "handler" in opts) {
      resolvedName = opts.handler.name;
    }
    if (!resolvedName || resolvedName.trim().length === 0) {
      resolvedName = `Scorer ${_chunkMF7NU6BTjs.isomorph_default.basename(currentFilename)} ${this.taskCounter}`;
    }
    const slug = _nullishCoalesce(opts.slug, () => ( _chunkQRHGVBKUjs.slugify.call(void 0, resolvedName, { lower: true, strict: true })));
    if ("handler" in opts) {
      const scorer = new CodeFunction(this.project, {
        ...opts,
        name: resolvedName,
        slug,
        type: "scorer"
      });
      this.project.addCodeFunction(scorer);
    } else {
      const promptBlock = "messages" in opts ? {
        type: "chat",
        messages: opts.messages
      } : {
        type: "completion",
        content: opts.prompt
      };
      const promptData = {
        prompt: promptBlock,
        options: {
          model: opts.model,
          params: opts.params
        },
        parser: {
          type: "llm_classifier",
          use_cot: opts.useCot,
          choice_scores: opts.choiceScores
        },
        ...opts.templateFormat ? { template_format: opts.templateFormat } : {}
      };
      const codePrompt = new CodePrompt(
        this.project,
        promptData,
        [],
        {
          ...opts,
          name: resolvedName,
          slug
        },
        "scorer"
      );
      this.project.addPrompt(codePrompt);
    }
  }
}, _class9);
var ClassifierBuilder = (_class10 = class {
  constructor(project) {;_class10.prototype.__init21.call(this);
    this.project = project;
  }
  
  __init21() {this.taskCounter = 0}
  create(opts) {
    this.taskCounter++;
    let resolvedName = _nullishCoalesce(opts.name, () => ( opts.handler.name));
    if (!resolvedName || resolvedName.trim().length === 0) {
      resolvedName = `Classifier ${_chunkMF7NU6BTjs.isomorph_default.basename(currentFilename)} ${this.taskCounter}`;
    }
    const slug = _nullishCoalesce(opts.slug, () => ( _chunkQRHGVBKUjs.slugify.call(void 0, resolvedName, { lower: true, strict: true })));
    const classifier = new CodeFunction(this.project, {
      ...opts,
      name: resolvedName,
      slug,
      type: "classifier"
    });
    this.project.addCodeFunction(classifier);
    return classifier;
  }
}, _class10);
var CodeFunction = class {
  constructor(project, opts) {
    this.project = project;
    this.handler = opts.handler;
    this.name = opts.name;
    this.slug = opts.slug;
    this.description = opts.description;
    this.type = opts.type;
    this.ifExists = opts.ifExists;
    this.tags = opts.tags;
    this.metadata = opts.metadata;
    this.parameters = opts.parameters;
    this.returns = opts.returns;
    if (this.returns && !this.parameters) {
      throw new Error("parameters are required if return type is defined");
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  key() {
    return JSON.stringify([
      _nullishCoalesce(this.project.id, () => ( "")),
      _nullishCoalesce(this.project.name, () => ( "")),
      this.slug
    ]);
  }
};
var CodePrompt = class {
  
  
  
  
  
  
  
  
  
  
  
  
  constructor(project, prompt, toolFunctions, opts, functionType) {
    this.project = project;
    this.name = opts.name;
    this.slug = opts.slug;
    this.prompt = prompt;
    this.toolFunctions = toolFunctions;
    this.ifExists = opts.ifExists;
    this.description = opts.description;
    this.id = opts.id;
    this.functionType = functionType;
    this.tags = opts.tags;
    this.metadata = opts.metadata;
    this.environmentSlugs = opts.environments;
  }
  async toFunctionDefinition(projectNameToId) {
    const prompt_data = {
      ...this.prompt
    };
    if (this.toolFunctions.length > 0) {
      const resolvableToolFunctions = await Promise.all(
        this.toolFunctions.map(async (fn) => {
          if ("slug" in fn) {
            return {
              type: "slug",
              project_id: await projectNameToId.resolve(fn.project),
              slug: fn.slug
            };
          } else {
            return fn;
          }
        })
      );
      prompt_data.tool_functions = // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      resolvableToolFunctions;
    }
    return {
      project_id: await projectNameToId.resolve(this.project),
      name: this.name,
      slug: this.slug,
      description: _nullishCoalesce(this.description, () => ( "")),
      function_data: {
        type: "prompt"
      },
      function_type: this.functionType,
      prompt_data,
      if_exists: this.ifExists,
      tags: this.tags,
      metadata: this.metadata,
      environments: this.environmentSlugs && this.environmentSlugs.length > 0 ? this.environmentSlugs.map((slug) => ({ slug })) : void 0
    };
  }
};
var PromptBuilder = class {
  constructor(project) {
    this.project = project;
  }
  
  create(opts) {
    const toolFunctions = [];
    const rawTools = [];
    for (const tool of _nullishCoalesce(opts.tools, () => ( []))) {
      if (tool instanceof CodeFunction) {
        toolFunctions.push(tool);
      } else if ("type" in tool && !("function" in tool)) {
        toolFunctions.push(tool);
      } else {
        rawTools.push(tool);
      }
    }
    const slug = _nullishCoalesce(opts.slug, () => ( _chunkQRHGVBKUjs.slugify.call(void 0, opts.name, { lower: true, strict: true })));
    const promptData = promptDefinitionToPromptData(opts, rawTools);
    const promptRow = {
      id: opts.id,
      _xact_id: opts.version ? _chunkQRHGVBKUjs.loadPrettyXact.call(void 0, opts.version) : void 0,
      name: opts.name,
      slug,
      prompt_data: promptData,
      tags: opts.tags,
      ...this.project.id !== void 0 ? { project_id: this.project.id } : {}
    };
    const prompt = new (0, _chunkQRHGVBKUjs.Prompt)(
      promptRow,
      {},
      // It doesn't make sense to specify defaults here.
      _nullishCoalesce(opts.noTrace, () => ( false))
    );
    const codePrompt = new CodePrompt(this.project, promptData, toolFunctions, {
      ...opts,
      slug
    });
    this.project.addPrompt(codePrompt);
    return prompt;
  }
};
var CodeParameters = class {
  
  
  
  
  
  
  
  constructor(project, opts) {
    this.project = project;
    this.name = opts.name;
    this.slug = opts.slug;
    this.description = opts.description;
    this.schema = opts.schema;
    this.ifExists = opts.ifExists;
    this.metadata = opts.metadata;
  }
  async toFunctionDefinition(projectNameToId) {
    const schema = serializeEvalParameterstoParametersSchema(this.schema);
    return {
      project_id: await projectNameToId.resolve(this.project),
      name: this.name,
      slug: this.slug,
      description: _nullishCoalesce(this.description, () => ( "")),
      function_type: "parameters",
      function_data: {
        type: "parameters",
        data: getDefaultDataFromParametersSchema(schema),
        __schema: schema
      },
      if_exists: this.ifExists,
      metadata: this.metadata
    };
  }
};
var ParametersBuilder = class {
  constructor(project) {
    this.project = project;
  }
  
  create(opts) {
    const slug = _nullishCoalesce(opts.slug, () => ( _chunkQRHGVBKUjs.slugify.call(void 0, opts.name, { lower: true, strict: true })));
    const codeParameters = new CodeParameters(this.project, {
      name: opts.name,
      slug,
      description: opts.description,
      schema: opts.schema,
      ifExists: opts.ifExists,
      metadata: opts.metadata
    });
    this.project.addParameters(codeParameters);
    return opts.schema;
  }
};
function serializeEvalParameterstoParametersSchema(parameters) {
  const properties = {};
  const required = [];
  for (const [name, value] of Object.entries(parameters)) {
    if ("type" in value && value.type === "prompt") {
      const defaultPromptData = value.default ? promptDefinitionToPromptData(value.default) : void 0;
      properties[name] = {
        type: "object",
        "x-bt-type": "prompt",
        ...value.description ? { description: value.description } : {},
        ...defaultPromptData ? { default: defaultPromptData } : {}
      };
      if (!defaultPromptData) {
        required.push(name);
      }
    } else if ("type" in value && value.type === "model") {
      properties[name] = {
        type: "string",
        "x-bt-type": "model",
        ...value.description ? { description: value.description } : {},
        ..."default" in value ? { default: value.default } : {}
      };
      if (!("default" in value)) {
        required.push(name);
      }
    } else {
      const schemaObj = _chunkQRHGVBKUjs.zodToJsonSchema.call(void 0, value);
      properties[name] = schemaObj;
      if (!("default" in schemaObj)) {
        required.push(name);
      }
    }
  }
  return {
    type: "object",
    properties,
    ...required.length > 0 ? { required } : {},
    additionalProperties: true
  };
}
function getDefaultDataFromParametersSchema(schema) {
  return Object.fromEntries(
    Object.entries(schema.properties).flatMap(([name, value]) => {
      if (!("default" in value)) {
        return [];
      }
      return [[name, value.default]];
    })
  );
}
var ProjectNameIdMap = (_class11 = class {constructor() { _class11.prototype.__init22.call(this);_class11.prototype.__init23.call(this); }
  __init22() {this.nameToId = {}}
  __init23() {this.idToName = {}}
  async getId(projectName) {
    if (!(projectName in this.nameToId)) {
      const response = await _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, ).appConn().post_json("api/project/register", {
        project_name: projectName
      });
      const result = _v3.z.object({
        project: _chunkQRHGVBKUjs.Project
      }).parse(response);
      const projectId = result.project.id;
      this.nameToId[projectName] = projectId;
      this.idToName[projectId] = projectName;
    }
    return this.nameToId[projectName];
  }
  async getName(projectId) {
    if (!(projectId in this.idToName)) {
      const response = await _chunkQRHGVBKUjs._internalGetGlobalState.call(void 0, ).appConn().post_json("api/project/get", {
        id: projectId
      });
      const result = _v3.z.array(_chunkQRHGVBKUjs.Project).nonempty().parse(response);
      const projectName = result[0].name;
      this.idToName[projectId] = projectName;
      this.nameToId[projectName] = projectId;
    }
    return this.idToName[projectId];
  }
  async resolve(project) {
    if (project.id) {
      return project.id;
    }
    return this.getId(project.name);
  }
}, _class11);

// dev/types.ts

var evalBodySchema = _v3.z.object({
  name: _v3.z.string(),
  parameters: _v3.z.record(_v3.z.string(), _v3.z.unknown()).nullish(),
  data: _chunkQRHGVBKUjs.RunEval.shape.data,
  scores: _v3.z.array(
    _v3.z.object({
      function_id: _chunkQRHGVBKUjs.FunctionId,
      name: _v3.z.string()
    })
  ).nullish(),
  experiment_name: _v3.z.string().nullish(),
  project_id: _v3.z.string().nullish(),
  parent: _chunkQRHGVBKUjs.InvokeParent.optional(),
  stream: _v3.z.boolean().optional()
});
var staticParametersSchema = _v3.z.record(
  _v3.z.string(),
  _v3.z.union([
    _v3.z.object({
      type: _v3.z.literal("prompt"),
      default: _chunkQRHGVBKUjs.PromptData.optional(),
      description: _v3.z.string().optional()
    }),
    _v3.z.object({
      type: _v3.z.literal("model"),
      default: _v3.z.string().optional(),
      description: _v3.z.string().optional()
    }),
    _v3.z.object({
      type: _v3.z.literal("data"),
      schema: _v3.z.record(_v3.z.unknown()),
      default: _v3.z.unknown().optional(),
      description: _v3.z.string().optional()
    })
  ])
);
var parametersSchema = _v3.z.object({
  type: _v3.z.literal("object"),
  properties: _v3.z.record(_v3.z.string(), _v3.z.record(_v3.z.unknown())),
  required: _v3.z.array(_v3.z.string()).optional(),
  additionalProperties: _v3.z.boolean().optional()
});
var parametersSourceSchema = _v3.z.object({
  parametersId: _v3.z.string().optional(),
  slug: _v3.z.string(),
  name: _v3.z.string(),
  projectId: _v3.z.string().optional(),
  version: _v3.z.string().optional()
});
var parametersContainerSchema = _v3.z.object({
  type: _v3.z.literal("braintrust.parameters"),
  schema: parametersSchema,
  source: parametersSourceSchema
});
var staticParametersContainerSchema = _v3.z.object({
  type: _v3.z.literal("braintrust.staticParameters"),
  schema: staticParametersSchema,
  source: _v3.z.null().nullish()
});
var serializedParametersContainerSchema = _v3.z.union([
  parametersContainerSchema,
  staticParametersContainerSchema,
  // keeping this type here since old versions of the SDK will still pass the unwrapped schema and we need to handle this in the app
  staticParametersSchema
]);
var evaluatorDefinitionSchema = _v3.z.object({
  parameters: serializedParametersContainerSchema.nullish(),
  scores: _v3.z.array(_v3.z.object({ name: _v3.z.string() })).optional(),
  classifiers: _v3.z.array(_v3.z.object({ name: _v3.z.string() })).optional()
});
var evaluatorDefinitionsSchema = _v3.z.record(
  _v3.z.string(),
  evaluatorDefinitionSchema
);

// src/node/index.ts
_chunkQRHGVBKUjs.configureNode.call(void 0, );
















































































































































































exports.Attachment = _chunkQRHGVBKUjs.Attachment; exports.AttachmentReference = _chunkQRHGVBKUjs.AttachmentReference; exports.BAGGAGE_HEADER = _chunkQRHGVBKUjs.BAGGAGE_HEADER; exports.BRAINTRUST_CURRENT_SPAN_STORE = _chunkQRHGVBKUjs.BRAINTRUST_CURRENT_SPAN_STORE; exports.BRAINTRUST_LANGCHAIN_CALLBACK_HANDLER_NAME = _chunkQRHGVBKUjs.BRAINTRUST_LANGCHAIN_CALLBACK_HANDLER_NAME; exports.BRAINTRUST_PARENT_KEY = _chunkQRHGVBKUjs.BRAINTRUST_PARENT_KEY; exports.BaseAttachment = _chunkQRHGVBKUjs.BaseAttachment; exports.BaseExperiment = BaseExperiment; exports.BraintrustLangChainCallbackHandler = _chunkQRHGVBKUjs.BraintrustLangChainCallbackHandler; exports.BraintrustMiddleware = BraintrustMiddleware; exports.BraintrustObservabilityExporter = _chunkQRHGVBKUjs.BraintrustObservabilityExporter; exports.BraintrustState = _chunkQRHGVBKUjs.BraintrustState; exports.BraintrustStream = _chunkQRHGVBKUjs.BraintrustStream; exports.CachedSpanFetcher = CachedSpanFetcher; exports.CodeFunction = CodeFunction; exports.CodePrompt = CodePrompt; exports.ContextManager = _chunkQRHGVBKUjs.ContextManager; exports.DEFAULT_FETCH_BATCH_SIZE = _chunkQRHGVBKUjs.DEFAULT_FETCH_BATCH_SIZE; exports.DEFAULT_MAX_REQUEST_SIZE = _chunkQRHGVBKUjs.DEFAULT_MAX_REQUEST_SIZE; exports.Dataset = _chunkQRHGVBKUjs.Dataset; exports.DatasetPipeline = DatasetPipeline; exports.ERR_PERMALINK = _chunkQRHGVBKUjs.ERR_PERMALINK; exports.Eval = Eval; exports.EvalResultWithSummary = EvalResultWithSummary; exports.Experiment = _chunkQRHGVBKUjs.Experiment; exports.ExternalAttachment = _chunkQRHGVBKUjs.ExternalAttachment; exports.FailedHTTPResponse = _chunkQRHGVBKUjs.FailedHTTPResponse; exports.IDGenerator = _chunkQRHGVBKUjs.IDGenerator; exports.JSONAttachment = _chunkQRHGVBKUjs.JSONAttachment; exports.LEGACY_CACHED_HEADER = _chunkQRHGVBKUjs.LEGACY_CACHED_HEADER; exports.LOGS3_OVERFLOW_REFERENCE_TYPE = _chunkQRHGVBKUjs.LOGS3_OVERFLOW_REFERENCE_TYPE; exports.LazyValue = _chunkQRHGVBKUjs.LazyValue; exports.LocalTrace = LocalTrace; exports.Logger = _chunkQRHGVBKUjs.Logger; exports.LoginInvalidOrgError = _chunkQRHGVBKUjs.LoginInvalidOrgError; exports.NOOP_SPAN = _chunkQRHGVBKUjs.NOOP_SPAN; exports.NOOP_SPAN_PERMALINK = _chunkQRHGVBKUjs.NOOP_SPAN_PERMALINK; exports.NoopSpan = _chunkQRHGVBKUjs.NoopSpan; exports.OTELIDGenerator = _chunkQRHGVBKUjs.OTELIDGenerator; exports.ObjectFetcher = _chunkQRHGVBKUjs.ObjectFetcher; exports.Project = Project2; exports.ProjectNameIdMap = ProjectNameIdMap; exports.Prompt = _chunkQRHGVBKUjs.Prompt; exports.PromptBuilder = PromptBuilder; exports.ReadonlyAttachment = _chunkQRHGVBKUjs.ReadonlyAttachment; exports.ReadonlyExperiment = _chunkQRHGVBKUjs.ReadonlyExperiment; exports.Reporter = Reporter; exports.ScorerBuilder = ScorerBuilder; exports.SpanFetcher = SpanFetcher; exports.SpanImpl = _chunkQRHGVBKUjs.SpanImpl; exports.TRACEPARENT_HEADER = _chunkQRHGVBKUjs.TRACEPARENT_HEADER; exports.TRACESTATE_HEADER = _chunkQRHGVBKUjs.TRACESTATE_HEADER; exports.TestBackgroundLogger = _chunkQRHGVBKUjs.TestBackgroundLogger; exports.ToolBuilder = ToolBuilder; exports.UUIDGenerator = _chunkQRHGVBKUjs.UUIDGenerator; exports.X_CACHED_HEADER = _chunkQRHGVBKUjs.X_CACHED_HEADER; exports._exportsForTestingOnly = _chunkQRHGVBKUjs._exportsForTestingOnly; exports._internalGetGlobalState = _chunkQRHGVBKUjs._internalGetGlobalState; exports._internalIso = _chunkMF7NU6BTjs.isomorph_default; exports._internalSetInitialState = _chunkQRHGVBKUjs._internalSetInitialState; exports.addAzureBlobHeaders = _chunkQRHGVBKUjs.addAzureBlobHeaders; exports.agentAssertionScorer = agentAssertionScorer; exports.braintrustAISDKTelemetry = _chunkQRHGVBKUjs.braintrustAISDKTelemetry; exports.braintrustEveHook = braintrustEveHook; exports.braintrustEveInstrumentation = braintrustEveInstrumentation; exports.braintrustFlueInstrumentation = _chunkQRHGVBKUjs.braintrustFlueInstrumentation; exports.braintrustFlueObserver = _chunkQRHGVBKUjs.braintrustFlueObserver; exports.braintrustStreamChunkSchema = _chunkQRHGVBKUjs.braintrustStreamChunkSchema; exports.buildLocalSummary = buildLocalSummary; exports.collectAnthropicSession = _chunkQRHGVBKUjs.collectAnthropicSession; exports.configureInstrumentation = _chunkQRHGVBKUjs.configureInstrumentation; exports.constructLogs3OverflowRequest = _chunkQRHGVBKUjs.constructLogs3OverflowRequest; exports.createFinalValuePassThroughStream = _chunkQRHGVBKUjs.createFinalValuePassThroughStream; exports.currentExperiment = _chunkQRHGVBKUjs.currentExperiment; exports.currentLogger = _chunkQRHGVBKUjs.currentLogger; exports.currentSpan = _chunkQRHGVBKUjs.currentSpan; exports.deepCopyEvent = _chunkQRHGVBKUjs.deepCopyEvent; exports.default = exports_exports; exports.defaultErrorScoreHandler = defaultErrorScoreHandler; exports.deserializePlainStringAsJSON = _chunkQRHGVBKUjs.deserializePlainStringAsJSON; exports.devNullWritableStream = _chunkQRHGVBKUjs.devNullWritableStream; exports.evaluatorDefinitionSchema = evaluatorDefinitionSchema; exports.evaluatorDefinitionsSchema = evaluatorDefinitionsSchema; exports.extractTraceContextFromHeaders = _chunkQRHGVBKUjs.extractTraceContextFromHeaders; exports.flush = _chunkQRHGVBKUjs.flush; exports.getContextManager = _chunkQRHGVBKUjs.getContextManager; exports.getIdGenerator = _chunkQRHGVBKUjs.getIdGenerator; exports.getPromptVersions = _chunkQRHGVBKUjs.getPromptVersions; exports.getSpanParentObject = _chunkQRHGVBKUjs.getSpanParentObject; exports.getTemplateRenderer = _chunkQRHGVBKUjs.getTemplateRenderer; exports.graph = graph_framework_exports; exports.init = _chunkQRHGVBKUjs.init; exports.initDataset = _chunkQRHGVBKUjs.initDataset; exports.initExperiment = _chunkQRHGVBKUjs.initExperiment; exports.initFunction = initFunction; exports.initLogger = _chunkQRHGVBKUjs.initLogger; exports.initNodeTestSuite = initNodeTestSuite; exports.injectTraceContext = _chunkQRHGVBKUjs.injectTraceContext; exports.invoke = invoke; exports.isTemplateFormat = _chunkQRHGVBKUjs.isTemplateFormat; exports.loadParameters = _chunkQRHGVBKUjs.loadParameters; exports.loadPrompt = _chunkQRHGVBKUjs.loadPrompt; exports.log = _chunkQRHGVBKUjs.log; exports.logError = _chunkQRHGVBKUjs.logError; exports.login = _chunkQRHGVBKUjs.login; exports.loginToState = _chunkQRHGVBKUjs.loginToState; exports.logs3OverflowUploadSchema = _chunkQRHGVBKUjs.logs3OverflowUploadSchema; exports.newId = _chunkQRHGVBKUjs.newId; exports.parseCachedHeader = _chunkQRHGVBKUjs.parseCachedHeader; exports.parseTemplateFormat = _chunkQRHGVBKUjs.parseTemplateFormat; exports.permalink = _chunkQRHGVBKUjs.permalink; exports.pickLogs3OverflowObjectIds = _chunkQRHGVBKUjs.pickLogs3OverflowObjectIds; exports.projects = projects; exports.promptContentsSchema = promptContentsSchema; exports.promptDefinitionSchema = promptDefinitionSchema; exports.promptDefinitionToPromptData = promptDefinitionToPromptData; exports.promptDefinitionWithToolsSchema = promptDefinitionWithToolsSchema; exports.registerOtelFlush = _chunkQRHGVBKUjs.registerOtelFlush; exports.registerSandbox = registerSandbox; exports.registerTemplatePlugin = _chunkQRHGVBKUjs.registerTemplatePlugin; exports.renderMessage = _chunkQRHGVBKUjs.renderMessage; exports.renderPromptParams = _chunkQRHGVBKUjs.renderPromptParams; exports.renderTemplateContent = _chunkQRHGVBKUjs.renderTemplateContent; exports.reportFailures = reportFailures; exports.runEvaluator = runEvaluator; exports.setFetch = _chunkQRHGVBKUjs.setFetch; exports.setMaskingFunction = _chunkQRHGVBKUjs.setMaskingFunction; exports.spanComponentsToObjectId = _chunkQRHGVBKUjs.spanComponentsToObjectId; exports.startSpan = _chunkQRHGVBKUjs.startSpan; exports.summarize = _chunkQRHGVBKUjs.summarize; exports.templateRegistry = _chunkQRHGVBKUjs.templateRegistry; exports.toolFunctionDefinitionSchema = _chunkQRHGVBKUjs.ToolFunctionDefinition; exports.traceable = _chunkQRHGVBKUjs.traceable; exports.traced = _chunkQRHGVBKUjs.traced; exports.updateSpan = _chunkQRHGVBKUjs.updateSpan; exports.uploadLogs3OverflowPayload = _chunkQRHGVBKUjs.uploadLogs3OverflowPayload; exports.utf8ByteLength = _chunkQRHGVBKUjs.utf8ByteLength; exports.withCurrent = _chunkQRHGVBKUjs.withCurrent; exports.withDataset = _chunkQRHGVBKUjs.withDataset; exports.withExperiment = _chunkQRHGVBKUjs.withExperiment; exports.withLogger = _chunkQRHGVBKUjs.withLogger; exports.withParent = _chunkQRHGVBKUjs.withParent; exports.wrapAISDK = wrapAISDK; exports.wrapAISDKModel = wrapAISDKModel; exports.wrapAgentClass = wrapAgentClass; exports.wrapAnthropic = wrapAnthropic; exports.wrapBedrockRuntime = wrapBedrockRuntime; exports.wrapClaudeAgentSDK = wrapClaudeAgentSDK; exports.wrapCloudflareAIChat = wrapCloudflareAIChat; exports.wrapCloudflareAgent = wrapCloudflareAgent; exports.wrapCloudflareThink = wrapCloudflareThink; exports.wrapCohere = wrapCohere; exports.wrapCopilotClient = wrapCopilotClient; exports.wrapCursorSDK = wrapCursorSDK; exports.wrapGenkit = wrapGenkit; exports.wrapGoogleADK = wrapGoogleADK; exports.wrapGoogleGenAI = wrapGoogleGenAI; exports.wrapGroq = wrapGroq; exports.wrapHuggingFace = wrapHuggingFace; exports.wrapHuggingFaceTransformers = wrapHuggingFaceTransformers; exports.wrapLangSmithClient = wrapLangSmithClient; exports.wrapLangSmithRunTrees = wrapLangSmithRunTrees; exports.wrapLangSmithTraceable = wrapLangSmithTraceable; exports.wrapMastraAgent = _chunkQRHGVBKUjs.wrapMastraAgent; exports.wrapMistral = wrapMistral; exports.wrapOllama = wrapOllama; exports.wrapOpenAI = wrapOpenAI; exports.wrapOpenAICodexSDK = wrapOpenAICodexSDK; exports.wrapOpenAIv4 = wrapOpenAIv4; exports.wrapOpenRouter = wrapOpenRouter; exports.wrapOpenRouterAgent = wrapOpenRouterAgent; exports.wrapPiCodingAgentSDK = wrapPiCodingAgentSDK; exports.wrapStrandsAgentSDK = wrapStrandsAgentSDK; exports.wrapTraced = _chunkQRHGVBKUjs.wrapTraced; exports.wrapVitest = wrapVitest;
