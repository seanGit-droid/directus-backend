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

// src/auto-instrumentations/index.ts
var index_exports = {};
__export(index_exports, {
  aiSDKConfigs: () => aiSDKConfigs,
  anthropicConfigs: () => anthropicConfigs,
  bedrockRuntimeConfigs: () => bedrockRuntimeConfigs,
  claudeAgentSDKConfigs: () => claudeAgentSDKConfigs,
  cloudflareAIChatConfigs: () => cloudflareAIChatConfigs,
  cloudflareAgentsConfigs: () => cloudflareAgentsConfigs,
  cloudflareThinkConfigs: () => cloudflareThinkConfigs,
  cohereConfigs: () => cohereConfigs,
  cursorSDKConfigs: () => cursorSDKConfigs,
  genkitConfigs: () => genkitConfigs,
  gitHubCopilotConfigs: () => gitHubCopilotConfigs,
  googleADKConfigs: () => googleADKConfigs,
  googleGenAIConfigs: () => googleGenAIConfigs,
  groqConfigs: () => groqConfigs,
  huggingFaceConfigs: () => huggingFaceConfigs,
  langSmithConfigs: () => langSmithConfigs,
  langchainConfigs: () => langchainConfigs,
  mistralConfigs: () => mistralConfigs,
  ollamaConfigs: () => ollamaConfigs,
  openAIAgentsCoreConfigs: () => openAIAgentsCoreConfigs,
  openAICodexConfigs: () => openAICodexConfigs,
  openRouterAgentConfigs: () => openRouterAgentConfigs,
  openRouterConfigs: () => openRouterConfigs,
  openaiConfigs: () => openaiConfigs,
  piCodingAgentConfigs: () => piCodingAgentConfigs
});
module.exports = __toCommonJS(index_exports);

// src/global-instrumentation-hooks.ts
var GLOBAL_INSTRUMENTATION_HOOKS_KEY = "__braintrust_instrumentation_hooks";
var GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION = 1;
var GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND = "braintrust.global-instrumentation-hooks.registry";
var GLOBAL_INSTRUMENTATION_HOOK_BRAND = "braintrust.global-instrumentation-hooks.hook";
var GLOBAL_INVOCATION_HOOK_BRAND = "braintrust.global-instrumentation-hooks.invocation-hook";
var registryBrand = Symbol.for(GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND);
var hookBrand = Symbol.for(GLOBAL_INSTRUMENTATION_HOOK_BRAND);
var invocationHookBrand = Symbol.for(GLOBAL_INVOCATION_HOOK_BRAND);
var errorReporter;
function reportError(error) {
  try {
    errorReporter?.(error);
  } catch {
  }
}
function setContextValue(context, key, value) {
  try {
    context[key] = value;
  } catch (error) {
    reportError(error);
  }
}
function wrapStoreRun(store, message, next, transform) {
  return () => {
    let context;
    try {
      context = transform ? transform(message) : message;
    } catch (error) {
      reportError(error);
      return next();
    }
    let called = false;
    let result;
    let providerError;
    let providerThrew = false;
    const runNext = () => {
      if (called) {
        reportError(
          new Error(
            "Instrumentation store invoked its callback more than once"
          )
        );
        if (providerThrew) {
          throw providerError;
        }
        return result;
      }
      called = true;
      try {
        result = next();
        return result;
      } catch (error) {
        providerThrew = true;
        providerError = error;
        throw error;
      }
    };
    try {
      store.run(context, runNext);
    } catch (error) {
      if (!providerThrew || error !== providerError) {
        reportError(error);
      }
    }
    if (!called) {
      reportError(
        new Error("Instrumentation store did not invoke its callback")
      );
      return runNext();
    }
    if (providerThrew) {
      throw providerError;
    }
    return result;
  };
}
var HookChannel = class {
  constructor(name) {
    this.name = name;
  }
  name;
  subscribers = [];
  stores = /* @__PURE__ */ new Map();
  get hasSubscribers() {
    return this.subscribers.length > 0 || this.stores.size > 0;
  }
  subscribe(subscription) {
    if (typeof subscription !== "function") {
      throw new TypeError("subscription must be a function");
    }
    this.subscribers = [...this.subscribers, subscription];
  }
  unsubscribe(subscription) {
    const index = this.subscribers.indexOf(subscription);
    if (index === -1) {
      return false;
    }
    this.subscribers = [
      ...this.subscribers.slice(0, index),
      ...this.subscribers.slice(index + 1)
    ];
    return true;
  }
  bindStore(store, transform) {
    if (!store || typeof store.run !== "function") {
      throw new TypeError("store must have a run method");
    }
    this.stores.set(
      store,
      transform
    );
  }
  unbindStore(store) {
    return this.stores.delete(store);
  }
  publish(message) {
    const subscribers = this.subscribers;
    for (const subscriber of subscribers) {
      try {
        subscriber(message, this.name);
      } catch (error) {
        reportError(error);
      }
    }
  }
  runStores(message, fn, thisArg, ...args) {
    let run = () => {
      this.publish(message);
      return Reflect.apply(fn, thisArg, args);
    };
    for (const [store, transform] of this.stores.entries()) {
      run = wrapStoreRun(store, message, run, transform);
    }
    return run();
  }
};
var traceEvents = [
  "start",
  "end",
  "asyncStart",
  "asyncEnd",
  "error"
];
function traceInvocation(hook, operator, target, thisArg, args, additional, callbackIndex = -1) {
  const context = {
    ...additional,
    arguments: args,
    self: thisArg
  };
  const invoke = () => hook.invoke(target, thisArg, args, additional);
  if (operator === "traceCallback") {
    return hook.traceCallback(invoke, callbackIndex, context);
  }
  if (operator === "tracePromise") {
    return hook.tracePromise(invoke, context);
  }
  return hook.traceSync(invoke, context);
}
var InvocationHook = class {
  interceptors = [];
  get hasInterceptors() {
    return this.interceptors.length > 0;
  }
  intercept(interceptor) {
    if (typeof interceptor !== "function") {
      throw new TypeError("interceptor must be a function");
    }
    this.interceptors = [...this.interceptors, interceptor];
    let active = true;
    return () => {
      if (!active) {
        return;
      }
      active = false;
      const index = this.interceptors.indexOf(interceptor);
      if (index !== -1) {
        this.interceptors = [
          ...this.interceptors.slice(0, index),
          ...this.interceptors.slice(index + 1)
        ];
      }
    };
  }
  invoke(target, thisArg, args, additional) {
    const interceptors = this.interceptors;
    if (interceptors.length === 0) {
      return Reflect.apply(target, thisArg, args);
    }
    let next = target;
    for (let index = interceptors.length - 1; index >= 0; index -= 1) {
      const interceptor = interceptors[index];
      const downstream = next;
      next = function(...nextArgs) {
        return interceptor(downstream, this, nextArgs, additional);
      };
    }
    return Reflect.apply(next, thisArg, args);
  }
};
var TracingHook = class {
  start;
  end;
  asyncStart;
  asyncEnd;
  error;
  invocationHook = new InvocationHook();
  constructor(nameOrChannels) {
    Object.defineProperty(this, hookBrand, {
      configurable: false,
      enumerable: false,
      value: GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
      writable: false
    });
    Object.defineProperty(this, invocationHookBrand, {
      configurable: false,
      enumerable: false,
      value: GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
      writable: false
    });
    if (typeof nameOrChannels === "string") {
      this.start = new HookChannel(`tracing:${nameOrChannels}:start`);
      this.end = new HookChannel(`tracing:${nameOrChannels}:end`);
      this.asyncStart = new HookChannel(`tracing:${nameOrChannels}:asyncStart`);
      this.asyncEnd = new HookChannel(`tracing:${nameOrChannels}:asyncEnd`);
      this.error = new HookChannel(`tracing:${nameOrChannels}:error`);
      return;
    }
    this.start = nameOrChannels.start ?? new HookChannel("tracing:start");
    this.end = nameOrChannels.end ?? new HookChannel("tracing:end");
    this.asyncStart = nameOrChannels.asyncStart ?? new HookChannel("tracing:asyncStart");
    this.asyncEnd = nameOrChannels.asyncEnd ?? new HookChannel("tracing:asyncEnd");
    this.error = nameOrChannels.error ?? new HookChannel("tracing:error");
  }
  get hasSubscribers() {
    return this.start.hasSubscribers || this.end.hasSubscribers || this.asyncStart.hasSubscribers || this.asyncEnd.hasSubscribers || this.error.hasSubscribers;
  }
  get hasInterceptors() {
    return this.invocationHook.hasInterceptors;
  }
  intercept(interceptor) {
    return this.invocationHook.intercept(interceptor);
  }
  invoke(target, thisArg, args, additional) {
    return this.invocationHook.invoke(target, thisArg, args, additional);
  }
  traceInvocation(operator, target, thisArg, args, additional, callbackIndex = -1) {
    return traceInvocation(
      this,
      operator,
      target,
      thisArg,
      args,
      additional,
      callbackIndex
    );
  }
  subscribe(handlers) {
    for (const eventName of traceEvents) {
      const handler = handlers[eventName];
      if (handler) {
        this[eventName].subscribe(handler);
      }
    }
  }
  unsubscribe(handlers) {
    let done = true;
    for (const eventName of traceEvents) {
      const handler = handlers[eventName];
      if (handler && !this[eventName].unsubscribe(handler)) {
        done = false;
      }
    }
    return done;
  }
  traceSync(fn, message = {}, thisArg, ...args) {
    if (!this.hasSubscribers) {
      return Reflect.apply(fn, thisArg, args);
    }
    const context = message;
    return this.start.runStores(message, () => {
      try {
        const result = Reflect.apply(fn, thisArg, args);
        setContextValue(context, "result", result);
        return result;
      } catch (error) {
        setContextValue(context, "error", error);
        this.error.publish(message);
        throw error;
      } finally {
        this.end.publish(message);
      }
    });
  }
  tracePromise(fn, message = {}, thisArg, ...args) {
    if (!this.hasSubscribers) {
      return Reflect.apply(fn, thisArg, args);
    }
    const context = message;
    return this.start.runStores(message, () => {
      let result;
      try {
        result = Reflect.apply(fn, thisArg, args);
      } catch (error) {
        setContextValue(context, "error", error);
        this.error.publish(message);
        this.end.publish(message);
        throw error;
      }
      this.end.publish(message);
      if (!result || typeof result !== "object" && typeof result !== "function") {
        setContextValue(context, "result", result);
        this.asyncStart.publish(message);
        this.asyncEnd.publish(message);
        return result;
      }
      let terminalPublished = false;
      const finishUnobservedResult = (error) => {
        reportError(error);
        if (!terminalPublished) {
          terminalPublished = true;
          setContextValue(context, "result", result);
          this.asyncStart.publish(message);
          this.asyncEnd.publish(message);
        }
        return result;
      };
      let then;
      try {
        then = result.then;
      } catch (error) {
        return finishUnobservedResult(error);
      }
      if (typeof then !== "function") {
        setContextValue(context, "result", result);
        this.asyncStart.publish(message);
        this.asyncEnd.publish(message);
        return result;
      }
      const resolve = (resolved) => {
        if (!terminalPublished) {
          terminalPublished = true;
          setContextValue(context, "result", resolved);
          this.asyncStart.publish(message);
          this.asyncEnd.publish(message);
        }
        return resolved;
      };
      let rejectionThrown = false;
      let rejectionError;
      const reject = (error) => {
        if (!terminalPublished) {
          terminalPublished = true;
          setContextValue(context, "error", error);
          this.error.publish(message);
          this.asyncStart.publish(message);
          this.asyncEnd.publish(message);
        }
        rejectionThrown = true;
        rejectionError = error;
        throw error;
      };
      let isPlainPromise;
      try {
        isPlainPromise = result instanceof Promise && result.constructor === Promise;
      } catch (error) {
        return finishUnobservedResult(error);
      }
      try {
        if (isPlainPromise) {
          return Reflect.apply(then, result, [resolve, reject]);
        }
        Reflect.apply(then, result, [
          resolve,
          (error) => {
            try {
              reject(error);
            } catch {
            }
          }
        ]);
      } catch (error) {
        if (rejectionThrown && error === rejectionError) {
          return result;
        }
        return finishUnobservedResult(error);
      }
      return result;
    });
  }
  traceCallback(fn, position = -1, message = {}, thisArg, ...args) {
    if (!this.hasSubscribers) {
      return Reflect.apply(fn, thisArg, args);
    }
    const context = message;
    const callArgs = args.length > 0 ? args : context.arguments ?? args;
    const callback = Array.prototype.at.call(callArgs, position);
    if (typeof callback !== "function") {
      return Reflect.apply(fn, thisArg, args);
    }
    const { asyncStart, asyncEnd, error: errorChannel } = this;
    function wrappedCallback(error, result) {
      if (error) {
        setContextValue(context, "error", error);
        errorChannel.publish(message);
      } else {
        setContextValue(context, "result", result);
      }
      return asyncStart.runStores(message, () => {
        try {
          return Reflect.apply(callback, this, arguments);
        } finally {
          asyncEnd.publish(message);
        }
      });
    }
    Array.prototype.splice.call(callArgs, position, 1, wrappedCallback);
    return this.start.runStores(message, () => {
      try {
        return Reflect.apply(fn, thisArg, args);
      } catch (error) {
        setContextValue(context, "error", error);
        this.error.publish(message);
        throw error;
      } finally {
        this.end.publish(message);
      }
    });
  }
};
var inertChannel = Object.freeze({
  name: "braintrust:inert",
  hasSubscribers: false,
  subscribe() {
  },
  unsubscribe() {
    return false;
  },
  bindStore() {
  },
  unbindStore() {
    return false;
  },
  publish() {
  },
  runStores(_message, fn, thisArg, ...args) {
    return Reflect.apply(fn, thisArg, args);
  }
});
var inertTracingHook = new TracingHook({
  start: inertChannel,
  end: inertChannel,
  asyncStart: inertChannel,
  asyncEnd: inertChannel,
  error: inertChannel
});
function isHookChannel(value) {
  if (typeof value !== "object" && typeof value !== "function" || value === null) {
    return false;
  }
  try {
    const channel2 = value;
    return typeof channel2.hasSubscribers === "boolean" && typeof channel2.subscribe === "function" && typeof channel2.unsubscribe === "function" && typeof channel2.bindStore === "function" && typeof channel2.unbindStore === "function" && typeof channel2.publish === "function" && typeof channel2.runStores === "function";
  } catch {
    return false;
  }
}
function hasTracingHookShape(value) {
  if (typeof value !== "object" && typeof value !== "function" || value === null) {
    return false;
  }
  try {
    const hook = value;
    return typeof hook.hasSubscribers === "boolean" && typeof hook.subscribe === "function" && typeof hook.unsubscribe === "function" && typeof hook.traceSync === "function" && typeof hook.tracePromise === "function" && typeof hook.traceCallback === "function" && isHookChannel(hook.start) && isHookChannel(hook.end) && isHookChannel(hook.asyncStart) && isHookChannel(hook.asyncEnd) && isHookChannel(hook.error);
  } catch {
    return false;
  }
}
function hasInvocationHookShape(value) {
  if (typeof value !== "object" && typeof value !== "function" || value === null) {
    return false;
  }
  try {
    const hook = value;
    return value[invocationHookBrand] === GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION && typeof hook.hasInterceptors === "boolean" && typeof hook.intercept === "function" && typeof hook.invoke === "function";
  } catch {
    return false;
  }
}
function installInvocationHook(value) {
  const hasInvocationHook = hasInvocationHookShape(value);
  const invocationHook = new InvocationHook();
  try {
    if (!hasInvocationHook) {
      Object.defineProperties(value, {
        [invocationHookBrand]: {
          configurable: false,
          enumerable: false,
          value: GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
          writable: false
        },
        hasInterceptors: {
          configurable: false,
          enumerable: false,
          get: () => invocationHook.hasInterceptors
        },
        intercept: {
          configurable: false,
          enumerable: false,
          value: invocationHook.intercept.bind(invocationHook),
          writable: false
        },
        invoke: {
          configurable: false,
          enumerable: false,
          value: invocationHook.invoke.bind(invocationHook),
          writable: false
        }
      });
    }
    if (typeof value.traceInvocation !== "function") {
      Object.defineProperty(value, "traceInvocation", {
        configurable: false,
        enumerable: false,
        value: traceInvocation.bind(void 0, value),
        writable: false
      });
    }
  } catch (error) {
    reportError(error);
  }
}
function isCompatibleTracingHook(value) {
  try {
    return value[hookBrand] === GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION && hasTracingHookShape(value);
  } catch {
    return false;
  }
}
function isCompatibleHookRegistry(value) {
  try {
    return value instanceof Map && value[registryBrand] === GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION;
  } catch {
    return false;
  }
}
function getHookRegistry() {
  let descriptor;
  try {
    descriptor = Object.getOwnPropertyDescriptor(
      globalThis,
      GLOBAL_INSTRUMENTATION_HOOKS_KEY
    );
  } catch (error) {
    reportError(error);
    return void 0;
  }
  if (descriptor && "value" in descriptor && isCompatibleHookRegistry(descriptor.value) && (descriptor.configurable || descriptor.enumerable === false)) {
    if (descriptor.configurable || descriptor.writable) {
      try {
        Object.defineProperty(globalThis, GLOBAL_INSTRUMENTATION_HOOKS_KEY, {
          configurable: false,
          enumerable: false,
          value: descriptor.value,
          writable: false
        });
      } catch (error) {
        reportError(error);
        return void 0;
      }
    }
    return descriptor.value;
  }
  if (descriptor && !descriptor.configurable) {
    reportError(new Error("Incompatible global instrumentation hook registry"));
    return void 0;
  }
  const registry = /* @__PURE__ */ new Map();
  try {
    Object.defineProperty(registry, registryBrand, {
      configurable: false,
      enumerable: false,
      value: GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
      writable: false
    });
  } catch (error) {
    reportError(error);
    return void 0;
  }
  try {
    Object.defineProperty(globalThis, GLOBAL_INSTRUMENTATION_HOOKS_KEY, {
      configurable: false,
      enumerable: false,
      value: registry,
      writable: false
    });
    return registry;
  } catch (error) {
    reportError(error);
    return void 0;
  }
}
function newGlobalTracingChannel(nameOrChannels) {
  if (typeof nameOrChannels !== "string") {
    return new TracingHook(nameOrChannels);
  }
  const registry = getHookRegistry();
  if (!registry) {
    return inertTracingHook;
  }
  let existing;
  try {
    existing = Map.prototype.get.call(registry, nameOrChannels);
  } catch (error) {
    reportError(error);
    return inertTracingHook;
  }
  if (isCompatibleTracingHook(existing)) {
    installInvocationHook(existing);
    return existing;
  }
  if (existing !== void 0) {
    reportError(
      new Error(`Invalid global instrumentation hook: ${nameOrChannels}`)
    );
    try {
      Map.prototype.delete.call(registry, nameOrChannels);
    } catch (error) {
      reportError(error);
      return inertTracingHook;
    }
  }
  const hook = new TracingHook(nameOrChannels);
  try {
    Map.prototype.set.call(registry, nameOrChannels, hook);
  } catch (error) {
    reportError(error);
    return inertTracingHook;
  }
  return hook;
}

// src/isomorph.ts
var DefaultAsyncLocalStorage = class {
  constructor() {
  }
  enterWith(_) {
  }
  run(_, callback) {
    return callback();
  }
  getStore() {
    return void 0;
  }
};
var iso = {
  buildType: "unknown",
  // Will be set by configureBrowser() or configureNode()
  getRepoInfo: async (_settings) => void 0,
  getPastNAncestors: async () => [],
  getEnv: (_name) => void 0,
  getBraintrustApiKey: async () => void 0,
  getCallerLocation: () => void 0,
  newAsyncLocalStorage: () => new DefaultAsyncLocalStorage(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newTracingChannel: (nameOrChannels) => newGlobalTracingChannel(nameOrChannels),
  processOn: (_0, _1) => {
  },
  basename: (filepath) => filepath.split(/[\\/]/).pop() || filepath,
  // eslint-disable-next-line no-restricted-properties -- preserving intentional console usage.
  writeln: (text) => console.log(text)
};
var isomorph_default = iso;

// src/instrumentation/core/channel-definitions.ts
function channel(spec) {
  return spec;
}
function defineChannels(pkg, channels, options) {
  const { instrumentationName } = options;
  return Object.fromEntries(
    Object.entries(channels).map(([key, spec]) => {
      const fullChannelName = `orchestrion:${pkg}:${spec.channelName}`;
      if (spec.kind === "async") {
        const asyncSpec = spec;
        const tracingChannel2 = () => isomorph_default.newTracingChannel(
          fullChannelName
        );
        const intercept2 = (interceptor) => {
          const hook = tracingChannel2();
          return typeof hook.intercept === "function" ? hook.intercept(interceptor) : () => {
          };
        };
        return [
          key,
          {
            ...asyncSpec,
            instrumentationName,
            intercept: intercept2,
            invoke: (target, thisArg, args, additional) => {
              const hook = tracingChannel2();
              return typeof hook.invoke === "function" ? hook.invoke(target, thisArg, args, additional) : Reflect.apply(target, thisArg, args);
            },
            tracingChannel: tracingChannel2,
            tracePromise: (fn, context) => tracingChannel2().tracePromise(
              fn,
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              context
            )
          }
        ];
      }
      const syncSpec = spec;
      const tracingChannel = () => isomorph_default.newTracingChannel(
        fullChannelName
      );
      const intercept = (interceptor) => {
        const hook = tracingChannel();
        return typeof hook.intercept === "function" ? hook.intercept(interceptor) : () => {
        };
      };
      return [
        key,
        {
          ...syncSpec,
          instrumentationName,
          intercept,
          invoke: (target, thisArg, args, additional) => {
            const hook = tracingChannel();
            return typeof hook.invoke === "function" ? hook.invoke(target, thisArg, args, additional) : Reflect.apply(target, thisArg, args);
          },
          tracingChannel,
          traceSync: (fn, context) => tracingChannel().traceSync(
            fn,
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            context
          )
        }
      ];
    })
  );
}

// src/span-origin.ts
var INSTRUMENTATION_NAMES = {
  AI_SDK: "ai-sdk",
  ANTHROPIC: "anthropic",
  BEDROCK_RUNTIME: "bedrock-runtime",
  BRAINTRUST_JS_LOGGER: "braintrust-js-logger",
  CLAUDE_AGENT_SDK: "claude-agent-sdk",
  CLOUDFLARE_AI_CHAT: "cloudflare-ai-chat",
  CLOUDFLARE_AGENTS: "cloudflare-agents",
  CLOUDFLARE_THINK: "cloudflare-think",
  COHERE: "cohere",
  CURSOR_SDK: "cursor-sdk",
  EVE: "eve",
  FLUE: "flue",
  GENKIT: "genkit",
  GITHUB_COPILOT: "github-copilot",
  GOOGLE_ADK: "google-adk",
  GOOGLE_GENAI: "google-genai",
  GROQ: "groq",
  HUGGINGFACE: "huggingface",
  LANGCHAIN: "langchain",
  LANGSMITH: "langsmith",
  MASTRA: "mastra",
  MISTRAL: "mistral",
  OLLAMA: "ollama",
  OPENAI: "openai",
  OPENAI_AGENTS: "openai-agents",
  OPENAI_CODEX: "openai-codex",
  OPENROUTER: "openrouter",
  OPENROUTER_AGENT: "openrouter-agent",
  PI_CODING_AGENT: "pi-coding-agent",
  STRANDS_AGENT_SDK: "strands-agent-sdk"
};

// src/instrumentation/plugins/openai-channels.ts
var openAIChannels = defineChannels(
  "openai",
  {
    chatCompletionsCreate: channel({
      channelName: "chat.completions.create",
      kind: "async"
    }),
    embeddingsCreate: channel({
      channelName: "embeddings.create",
      kind: "async"
    }),
    betaChatCompletionsParse: channel({
      channelName: "beta.chat.completions.parse",
      kind: "async"
    }),
    betaChatCompletionsStream: channel({
      channelName: "beta.chat.completions.stream",
      kind: "sync-stream"
    }),
    moderationsCreate: channel({
      channelName: "moderations.create",
      kind: "async"
    }),
    responsesCreate: channel({
      channelName: "responses.create",
      kind: "async"
    }),
    responsesStream: channel({
      channelName: "responses.stream",
      kind: "sync-stream"
    }),
    responsesParse: channel({
      channelName: "responses.parse",
      kind: "async"
    }),
    responsesCompact: channel({
      channelName: "responses.compact",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENAI }
);

// src/auto-instrumentations/configs/openai.ts
var openaiConfigs = [
  // Chat Completions
  {
    channelName: openAIChannels.chatCompletionsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.chatCompletionsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.chatCompletionsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  // Embeddings
  {
    channelName: openAIChannels.embeddingsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0",
      filePath: "resources/embeddings.mjs"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Chat Completions Parse
  {
    channelName: openAIChannels.betaChatCompletionsParse.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/beta/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "parse",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.betaChatCompletionsParse.channelName,
    module: {
      name: "openai",
      versionRange: ">=5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "parse",
      kind: "Async"
    }
  },
  // Moderations
  {
    channelName: openAIChannels.moderationsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0",
      filePath: "resources/moderations.mjs"
    },
    functionQuery: {
      className: "Moderations",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Chat Completions Stream
  {
    channelName: openAIChannels.betaChatCompletionsStream.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/beta/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "stream",
      kind: "Sync"
    }
  },
  {
    channelName: openAIChannels.betaChatCompletionsStream.channelName,
    module: {
      name: "openai",
      versionRange: ">=5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "stream",
      kind: "Sync"
    }
  },
  // Responses API (v4.87.0+)
  {
    channelName: openAIChannels.responsesCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.87.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.responsesStream.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.87.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "stream",
      kind: "Sync"
    }
  },
  {
    channelName: openAIChannels.responsesParse.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.87.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "parse",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.responsesCompact.channelName,
    module: {
      name: "openai",
      versionRange: ">=6.10.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "compact",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/openai-codex-channels.ts
var openAICodexChannels = defineChannels(
  "@openai/codex-sdk",
  {
    run: channel({
      channelName: "Thread.run",
      kind: "async"
    }),
    runStreamed: channel({
      channelName: "Thread.runStreamed",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENAI_CODEX }
);

// src/auto-instrumentations/configs/openai-codex.ts
var openAICodexVersionRange = ">=0.128.0 <1.0.0";
var openAICodexConfigs = [
  {
    channelName: openAICodexChannels.run.channelName,
    module: {
      name: "@openai/codex-sdk",
      versionRange: openAICodexVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "Thread",
      methodName: "run",
      kind: "Async"
    }
  },
  {
    channelName: openAICodexChannels.runStreamed.channelName,
    module: {
      name: "@openai/codex-sdk",
      versionRange: openAICodexVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "Thread",
      methodName: "runStreamed",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/anthropic-channels.ts
var anthropicChannels = defineChannels(
  "@anthropic-ai/sdk",
  {
    messagesCreate: channel({
      channelName: "messages.create",
      kind: "async"
    }),
    betaMessagesCreate: channel({
      channelName: "beta.messages.create",
      kind: "async"
    }),
    betaMessagesToolRunner: channel({
      channelName: "beta.messages.toolRunner",
      kind: "sync-stream"
    }),
    betaSessionsEventsStream: channel({
      channelName: "beta.sessions.events.stream",
      kind: "async"
    }),
    betaSessionsThreadsEventsStream: channel({
      channelName: "beta.sessions.threads.events.stream",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.ANTHROPIC }
);

// src/auto-instrumentations/configs/anthropic.ts
var anthropicConfigs = [
  // Each logical target is listed for both published module formats:
  // `.mjs` covers ESM imports, while `.js` covers CJS requires. The Bedrock
  // SDK delegates CJS `messages.create` calls through these Anthropic SDK
  // `.js` resource files.
  // Messages API - create in older SDK layouts (supports streaming via stream=true parameter)
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.27.0 <0.39.0",
      filePath: "resources/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.27.0 <0.39.0",
      filePath: "resources/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  // Messages API - create (supports streaming via stream=true parameter)
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/messages/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/messages/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Messages API - create (supports streaming via stream=true parameter)
  {
    channelName: anthropicChannels.betaMessagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: anthropicChannels.betaMessagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Messages API - toolRunner (sync helper returning async iterable/thenable)
  {
    channelName: anthropicChannels.betaMessagesToolRunner.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "toolRunner",
      kind: "Sync"
    }
  },
  {
    channelName: anthropicChannels.betaMessagesToolRunner.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "toolRunner",
      kind: "Sync"
    }
  },
  // Managed Agents Sessions event streams are discovered automatically, but
  // remain passive until the user calls collectAnthropicSession() on the
  // returned stream.
  ...["mjs", "js"].map(
    (extension) => ({
      channelName: anthropicChannels.betaSessionsEventsStream.channelName,
      module: {
        name: "@anthropic-ai/sdk",
        versionRange: ">=0.86.0",
        filePath: `resources/beta/sessions/events.${extension}`
      },
      functionQuery: {
        className: "Events",
        methodName: "stream",
        kind: "Async"
      }
    })
  ),
  ...["mjs", "js"].map(
    (extension) => ({
      channelName: anthropicChannels.betaSessionsThreadsEventsStream.channelName,
      module: {
        name: "@anthropic-ai/sdk",
        versionRange: ">=0.86.0",
        filePath: `resources/beta/sessions/threads/events.${extension}`
      },
      functionQuery: {
        className: "Events",
        methodName: "stream",
        kind: "Async"
      }
    })
  )
];

// src/instrumentation/plugins/bedrock-runtime-channels.ts
var clientSendChannel = channel({
  channelName: "client.send",
  kind: "async"
});
var bedrockRuntimeChannels = defineChannels(
  "aws-bedrock-runtime",
  {
    clientSend: clientSendChannel
  },
  { instrumentationName: INSTRUMENTATION_NAMES.BEDROCK_RUNTIME }
);
var smithyCoreChannels = defineChannels(
  "@smithy/core",
  {
    clientSend: clientSendChannel
  },
  { instrumentationName: INSTRUMENTATION_NAMES.BEDROCK_RUNTIME }
);
var smithyClientChannels = defineChannels(
  "@smithy/smithy-client",
  {
    clientSend: clientSendChannel
  },
  { instrumentationName: INSTRUMENTATION_NAMES.BEDROCK_RUNTIME }
);

// src/auto-instrumentations/configs/bedrock-runtime.ts
var bedrockRuntimeConfigs = [
  {
    channelName: smithyCoreChannels.clientSend.channelName,
    module: {
      name: "@smithy/core",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist-cjs/submodules/client/index.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: smithyCoreChannels.clientSend.channelName,
    module: {
      name: "@smithy/core",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist-es/submodules/client/smithy-client/client.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: smithyClientChannels.clientSend.channelName,
    module: {
      name: "@smithy/smithy-client",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist-cjs/index.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: smithyClientChannels.clientSend.channelName,
    module: {
      name: "@smithy/smithy-client",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist-es/client.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/ai-sdk-channels.ts
var aiSDKChannels = defineChannels(
  "ai",
  {
    generateText: channel({
      channelName: "generateText",
      kind: "async"
    }),
    streamText: channel({
      channelName: "streamText",
      kind: "async"
    }),
    streamTextSync: channel({
      channelName: "streamText.sync",
      kind: "sync-stream"
    }),
    generateObject: channel({
      channelName: "generateObject",
      kind: "async"
    }),
    streamObject: channel({
      channelName: "streamObject",
      kind: "async"
    }),
    streamObjectSync: channel({
      channelName: "streamObject.sync",
      kind: "sync-stream"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    }),
    embedMany: channel({
      channelName: "embedMany",
      kind: "async"
    }),
    rerank: channel({
      channelName: "rerank",
      kind: "async"
    }),
    agentGenerate: channel({
      channelName: "Agent.generate",
      kind: "async"
    }),
    agentStream: channel({
      channelName: "Agent.stream",
      kind: "async"
    }),
    agentStreamSync: channel({
      channelName: "Agent.stream.sync",
      kind: "sync-stream"
    }),
    toolLoopAgentGenerate: channel({
      channelName: "ToolLoopAgent.generate",
      kind: "async"
    }),
    toolLoopAgentStream: channel({
      channelName: "ToolLoopAgent.stream",
      kind: "async"
    }),
    workflowAgentStream: channel({
      channelName: "WorkflowAgent.stream",
      kind: "async"
    }),
    v7CreateTelemetryDispatcher: channel({
      channelName: "createTelemetryDispatcher",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.AI_SDK }
);
var harnessAgentChannels = defineChannels(
  "@ai-sdk/harness",
  {
    createSession: channel({
      channelName: "HarnessAgent.createSession",
      kind: "async"
    }),
    generate: channel({
      channelName: "HarnessAgent.generate",
      kind: "async"
    }),
    stream: channel({
      channelName: "HarnessAgent.stream",
      kind: "async"
    }),
    continueGenerate: channel({
      channelName: "HarnessAgent.continueGenerate",
      kind: "async"
    }),
    continueStream: channel({
      channelName: "HarnessAgent.continueStream",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.AI_SDK }
);

// src/auto-instrumentations/configs/ai-sdk.ts
var aiSDKConfigs = [
  // HarnessAgent turn methods are published only from the package's ESM
  // `./agent` entrypoint. The compiled class expression is anonymous, so match
  // the first async method with each public name instead of a class name.
  ...[
    ["createSession", harnessAgentChannels.createSession.channelName],
    ["generate", harnessAgentChannels.generate.channelName],
    ["stream", harnessAgentChannels.stream.channelName],
    ["continueGenerate", harnessAgentChannels.continueGenerate.channelName],
    ["continueStream", harnessAgentChannels.continueStream.channelName]
  ].map(([methodName, channelName]) => ({
    channelName,
    module: {
      name: "@ai-sdk/harness",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "dist/agent/index.js"
    },
    functionQuery: {
      methodName,
      kind: "Async",
      index: 0
    }
  })),
  // generateText - async function
  {
    channelName: aiSDKChannels.generateText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "generateText",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.generateText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "generateText",
      kind: "Async"
    }
  },
  // streamText - async function (v3 only, before the sync refactor in v4)
  {
    channelName: aiSDKChannels.streamText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Async"
    }
  },
  // streamText - sync function returning stream (v4+)
  {
    channelName: aiSDKChannels.streamTextSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Sync"
    }
  },
  {
    channelName: aiSDKChannels.streamText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.streamTextSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Sync"
    }
  },
  // generateObject - async function
  {
    channelName: aiSDKChannels.generateObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "generateObject",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.generateObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "generateObject",
      kind: "Async"
    }
  },
  // embed - async function
  {
    channelName: aiSDKChannels.embed.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.embed.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "embed",
      kind: "Async"
    }
  },
  // embedMany - async function
  {
    channelName: aiSDKChannels.embedMany.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "embedMany",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.embedMany.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "embedMany",
      kind: "Async"
    }
  },
  // rerank - async function
  {
    channelName: aiSDKChannels.rerank.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.rerank.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "rerank",
      kind: "Async"
    }
  },
  // AI SDK v7 exposes its telemetry lifecycle through a dispatcher created for
  // each operation. We patch that dispatcher in the plugin instead of rewriting
  // the module to call registerTelemetry().
  {
    channelName: aiSDKChannels.v7CreateTelemetryDispatcher.channelName,
    module: {
      name: "ai",
      versionRange: ">=7.0.0-0 <8.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "createTelemetryDispatcher",
      kind: "Sync"
    }
  },
  {
    channelName: aiSDKChannels.v7CreateTelemetryDispatcher.channelName,
    module: {
      name: "ai",
      versionRange: ">=7.0.0-0 <8.0.0",
      filePath: "dist/internal/index.js"
    },
    functionQuery: {
      functionName: "createTelemetryDispatcher",
      kind: "Sync"
    }
  },
  // streamObject - async function (v3 only, before the sync refactor in v4)
  {
    channelName: aiSDKChannels.streamObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Async"
    }
  },
  // streamObject - sync function returning stream (v4+)
  {
    channelName: aiSDKChannels.streamObjectSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Sync"
    }
  },
  {
    channelName: aiSDKChannels.streamObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.streamObjectSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Sync"
    }
  },
  // Agent.generate - async method (v5 only)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first async `generate` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.agentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.agentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  // Agent.stream - sync method (v5 only)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first sync `stream` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.agentStreamSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Sync",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.agentStreamSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Sync",
      index: 0
    }
  },
  // ToolLoopAgent.generate - async method (v6 only, Experimental_Agent is an alias)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first async `generate` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.toolLoopAgentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.toolLoopAgentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  // ToolLoopAgent.stream - async method (v6 only, Experimental_Agent is an alias)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first async `stream` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.toolLoopAgentStream.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Async",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.toolLoopAgentStream.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Async",
      index: 0
    }
  }
];

// src/instrumentation/plugins/claude-agent-sdk-channels.ts
var claudeAgentSDKChannels = defineChannels(
  "@anthropic-ai/claude-agent-sdk",
  {
    query: channel({
      channelName: "query",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLAUDE_AGENT_SDK }
);

// src/auto-instrumentations/configs/claude-agent-sdk.ts
var claudeAgentSDKConfigs = [
  // query - Main entry point for agent interactions. The SDK returns an async
  // iterable, but the exported query function itself is synchronous.
  {
    channelName: claudeAgentSDKChannels.query.channelName,
    module: {
      name: "@anthropic-ai/claude-agent-sdk",
      versionRange: ">=0.1.0 <0.2.0",
      filePath: "sdk.mjs"
    },
    functionQuery: {
      functionName: "query",
      kind: "Sync"
    }
  },
  {
    channelName: claudeAgentSDKChannels.query.channelName,
    module: {
      name: "@anthropic-ai/claude-agent-sdk",
      versionRange: ">=0.2.0",
      filePath: "sdk.mjs"
    },
    functionQuery: {
      functionName: "query",
      kind: "Sync",
      isExportAlias: true
    }
  }
];

// src/instrumentation/plugins/cloudflare-agents-channels.ts
var cloudflareAgentsChannels = defineChannels(
  "agents",
  {
    runAgentTool: channel({
      channelName: "Agent.runAgentTool",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLOUDFLARE_AGENTS }
);

// src/auto-instrumentations/configs/cloudflare-agents.ts
var cloudflareAgentsVersionRange = ">=0.17.0 <0.18.0";
var cloudflareAgentsConfigs = [
  {
    channelName: cloudflareAgentsChannels.runAgentTool.channelName,
    module: {
      name: "agents",
      versionRange: cloudflareAgentsVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "Agent",
      methodName: "runAgentTool",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cloudflare-think-channels.ts
var cloudflareThinkChannels = defineChannels(
  "@cloudflare/think",
  {
    runInferenceLoop: channel({
      channelName: "Think.runInferenceLoop",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLOUDFLARE_THINK }
);

// src/auto-instrumentations/configs/cloudflare-think.ts
var cloudflareThinkVersionRange = ">=0.13.0 <0.14.0";
var cloudflareThinkConfigs = [
  {
    channelName: cloudflareThinkChannels.runInferenceLoop.channelName,
    module: {
      name: "@cloudflare/think",
      versionRange: cloudflareThinkVersionRange,
      filePath: "dist/think.js"
    },
    functionQuery: {
      className: "Think",
      methodName: "_runInferenceLoop",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cursor-sdk-channels.ts
var cursorSDKChannels = defineChannels(
  "@cursor/sdk",
  {
    create: channel({
      channelName: "Agent.create",
      kind: "async"
    }),
    resume: channel({
      channelName: "Agent.resume",
      kind: "async"
    }),
    prompt: channel({
      channelName: "Agent.prompt",
      kind: "async"
    }),
    send: channel({
      channelName: "agent.send",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CURSOR_SDK }
);

// src/auto-instrumentations/configs/cursor-sdk.ts
var cursorSDKVersionRange = ">=1.0.7 <2.0.0";
var cursorSDKEntrypoints = ["dist/esm/index.js", "dist/cjs/index.js"];
var cursorSDKConfigs = cursorSDKEntrypoints.flatMap((filePath) => [
  {
    channelName: cursorSDKChannels.create.channelName,
    module: {
      name: "@cursor/sdk",
      versionRange: cursorSDKVersionRange,
      filePath
    },
    functionQuery: {
      className: "Agent",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: cursorSDKChannels.resume.channelName,
    module: {
      name: "@cursor/sdk",
      versionRange: cursorSDKVersionRange,
      filePath
    },
    functionQuery: {
      className: "Agent",
      methodName: "resume",
      kind: "Async"
    }
  },
  {
    channelName: cursorSDKChannels.prompt.channelName,
    module: {
      name: "@cursor/sdk",
      versionRange: cursorSDKVersionRange,
      filePath
    },
    functionQuery: {
      className: "Agent",
      methodName: "prompt",
      kind: "Async"
    }
  }
]);

// src/instrumentation/plugins/openai-agents-channels.ts
var openAIAgentsCoreChannels = defineChannels(
  "@openai/agents-core",
  {
    onTraceStart: channel({
      channelName: "tracing.processor.onTraceStart",
      kind: "async"
    }),
    onTraceEnd: channel({
      channelName: "tracing.processor.onTraceEnd",
      kind: "async"
    }),
    onSpanStart: channel({
      channelName: "tracing.processor.onSpanStart",
      kind: "async"
    }),
    onSpanEnd: channel({
      channelName: "tracing.processor.onSpanEnd",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENAI_AGENTS }
);

// src/auto-instrumentations/configs/openai-agents.ts
var lifecycleMethods = [
  ["onTraceStart", openAIAgentsCoreChannels.onTraceStart.channelName],
  ["onTraceEnd", openAIAgentsCoreChannels.onTraceEnd.channelName],
  ["onSpanStart", openAIAgentsCoreChannels.onSpanStart.channelName],
  ["onSpanEnd", openAIAgentsCoreChannels.onSpanEnd.channelName]
];
var openAIAgentsCoreConfigs = lifecycleMethods.flatMap(
  ([methodName, channelName]) => ["dist/tracing/processor.mjs", "dist/tracing/processor.js"].map(
    (filePath) => ({
      channelName,
      module: {
        name: "@openai/agents-core",
        versionRange: ">=0.0.14",
        filePath
      },
      functionQuery: {
        className: "MultiTracingProcessor",
        methodName,
        kind: "Async"
      }
    })
  )
);

// src/instrumentation/plugins/google-genai-channels.ts
var googleGenAIChannels = defineChannels(
  "@google/genai",
  {
    generateContent: channel({
      channelName: "models.generateContent",
      kind: "async"
    }),
    generateContentStream: channel({
      channelName: "models.generateContentStream",
      kind: "async"
    }),
    embedContent: channel({
      channelName: "models.embedContent",
      kind: "async"
    }),
    interactionsCreate: channel({
      channelName: "interactions.create",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GOOGLE_GENAI }
);

// src/auto-instrumentations/configs/google-genai.ts
var googleGenAIConfigs = [
  // Models.generateContentInternal - The actual class method (Node.js entry point)
  // Note: generateContent is an arrow function property that calls this internal method
  {
    channelName: googleGenAIChannels.generateContent.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.0.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "generateContentInternal",
      kind: "Async"
    }
  },
  // Models.generateContentStreamInternal - The actual class method (Node.js entry point)
  // Note: generateContentStream is an arrow function property that calls this internal method
  {
    channelName: googleGenAIChannels.generateContentStream.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.0.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "generateContentStreamInternal",
      kind: "Async"
    }
  },
  // Models.embedContent - class method in older SDK versions
  {
    channelName: googleGenAIChannels.embedContent.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.0.0 <1.44.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "embedContent",
      kind: "Async"
    }
  },
  // Models.embedContentInternal - class method in newer SDK versions
  // Note: embedContent is an arrow function property that calls this method
  {
    channelName: googleGenAIChannels.embedContent.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.44.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "embedContentInternal",
      kind: "Async"
    }
  },
  // BaseInteractions.create - Interactions API entry point
  {
    channelName: googleGenAIChannels.interactionsCreate.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.33.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "BaseInteractions",
      methodName: "create",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/huggingface-channels.ts
var huggingFaceChannels = defineChannels(
  "@huggingface/inference",
  {
    chatCompletion: channel({
      channelName: "chatCompletion",
      kind: "async"
    }),
    chatCompletionStream: channel({
      channelName: "chatCompletionStream",
      kind: "sync-stream"
    }),
    textGeneration: channel({
      channelName: "textGeneration",
      kind: "async"
    }),
    textGenerationStream: channel({
      channelName: "textGenerationStream",
      kind: "sync-stream"
    }),
    featureExtraction: channel({
      channelName: "featureExtraction",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.HUGGINGFACE }
);

// src/auto-instrumentations/configs/huggingface.ts
var huggingFaceConfigs = [
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/chatCompletion.js"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/chatCompletion.js"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/chatCompletionStream.js"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/chatCompletionStream.js"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/textGeneration.js"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/textGeneration.js"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/textGenerationStream.js"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/textGenerationStream.js"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/featureExtraction.js"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/featureExtraction.js"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/openrouter-agent-channels.ts
var openRouterAgentChannels = defineChannels(
  "@openrouter/agent",
  {
    callModel: channel({
      channelName: "callModel",
      kind: "sync-stream"
    }),
    callModelTurn: channel({
      channelName: "callModel.turn",
      kind: "async"
    }),
    toolExecute: channel({
      channelName: "tool.execute",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENROUTER_AGENT }
);

// src/auto-instrumentations/configs/openrouter-agent.ts
var openRouterAgentConfigs = [
  {
    channelName: openRouterAgentChannels.callModel.channelName,
    module: {
      name: "@openrouter/agent",
      versionRange: ">=0.1.2",
      filePath: "esm/inner-loop/call-model.js"
    },
    functionQuery: {
      functionName: "callModel",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/openrouter-channels.ts
var openRouterChannels = defineChannels(
  "@openrouter/sdk",
  {
    chatSend: channel({
      channelName: "chat.send",
      kind: "async"
    }),
    embeddingsGenerate: channel({
      channelName: "embeddings.generate",
      kind: "async"
    }),
    rerankRerank: channel({
      channelName: "rerank.rerank",
      kind: "async"
    }),
    betaResponsesSend: channel({
      channelName: "beta.responses.send",
      kind: "async"
    }),
    callModel: channel({
      channelName: "callModel",
      kind: "sync-stream"
    }),
    callModelTurn: channel({
      channelName: "callModel.turn",
      kind: "async"
    }),
    toolExecute: channel({
      channelName: "tool.execute",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENROUTER }
);

// src/auto-instrumentations/configs/openrouter.ts
var openRouterConfigs = [
  {
    channelName: openRouterChannels.chatSend.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.embeddingsGenerate.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/embeddings.js"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "generate",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.rerankRerank.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.12.0 <2.0.0",
      filePath: "esm/sdk/rerank.js"
    },
    functionQuery: {
      className: "Rerank",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.betaResponsesSend.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/responses.js"
    },
    functionQuery: {
      className: "Responses",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.betaResponsesSend.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=1.1.2 <2.0.0",
      filePath: "esm/sdk/betaresponses.js"
    },
    functionQuery: {
      className: "BetaResponses",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.callModel.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/sdk.js"
    },
    functionQuery: {
      className: "OpenRouter",
      methodName: "callModel",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/mistral-channels.ts
var mistralChannels = defineChannels(
  "@mistralai/mistralai",
  {
    chatComplete: channel({
      channelName: "chat.complete",
      kind: "async"
    }),
    chatStream: channel({
      channelName: "chat.stream",
      kind: "async"
    }),
    embeddingsCreate: channel({
      channelName: "embeddings.create",
      kind: "async"
    }),
    classifiersModerate: channel({
      channelName: "classifiers.moderate",
      kind: "async"
    }),
    classifiersModerateChat: channel({
      channelName: "classifiers.moderateChat",
      kind: "async"
    }),
    classifiersClassify: channel({
      channelName: "classifiers.classify",
      kind: "async"
    }),
    classifiersClassifyChat: channel({
      channelName: "classifiers.classifyChat",
      kind: "async"
    }),
    fimComplete: channel({
      channelName: "fim.complete",
      kind: "async"
    }),
    fimStream: channel({
      channelName: "fim.stream",
      kind: "async"
    }),
    agentsComplete: channel({
      channelName: "agents.complete",
      kind: "async"
    }),
    agentsStream: channel({
      channelName: "agents.stream",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.MISTRAL }
);

// src/auto-instrumentations/configs/mistral.ts
var mistralConfigs = [
  {
    channelName: mistralChannels.chatComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.chatComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.chatStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.chatStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.embeddingsCreate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/embeddings.js"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.embeddingsCreate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/embeddings.js"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderate",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderate",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerateChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderateChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerateChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderateChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassify.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.10.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classify",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassify.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classify",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassifyChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.10.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classifyChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassifyChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classifyChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "stream",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/ollama-channels.ts
var ollamaChannels = defineChannels(
  "ollama",
  {
    chat: channel({
      channelName: "chat",
      kind: "async"
    }),
    generate: channel({
      channelName: "generate",
      kind: "async"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OLLAMA }
);

// src/auto-instrumentations/configs/ollama.ts
var methods = [
  ["chat", ollamaChannels.chat.channelName],
  ["generate", ollamaChannels.generate.channelName],
  ["embed", ollamaChannels.embed.channelName]
];
var implementationFiles = ["dist/browser.mjs", "dist/browser.cjs"];
var ollamaConfigs = [
  ...implementationFiles.flatMap(
    (filePath) => methods.map(([methodName, channelName]) => ({
      channelName,
      module: {
        name: "ollama",
        versionRange: ">=0.6.0 <0.7.0",
        filePath
      },
      functionQuery: {
        className: "Ollama",
        methodName,
        kind: "Async"
      }
    }))
  )
];

// src/instrumentation/plugins/google-adk-channels.ts
var googleADKChannels = defineChannels(
  "@google/adk",
  {
    runnerRunAsync: channel({
      channelName: "runner.runAsync",
      kind: "sync-stream"
    }),
    agentRunAsync: channel({
      channelName: "agent.runAsync",
      kind: "sync-stream"
    }),
    toolRunAsync: channel({
      channelName: "tool.runAsync",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GOOGLE_ADK }
);

// src/auto-instrumentations/configs/google-adk.ts
var googleADKVersionRange = ">=0.1.0";
var googleADKBundledIndexV06VersionRange = ">=0.6.1 <0.7.0";
var googleADKBundledIndexV1VersionRange = ">=1.0.0 <2.0.0";
var googleADKConfigs = [
  // --- Runner.runAsync --- async generator, kind "Sync" + sync-stream channel
  // Runner.runAsync — ESM individual module file
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKVersionRange,
      filePath: "dist/esm/runner/runner.js"
    },
    functionQuery: {
      className: "Runner",
      methodName: "runAsync",
      kind: "Sync"
    }
  },
  // Runner.runAsync — bundled CJS/ESM indexes
  // The bundled entrypoints minify class names, so target the 12th sync
  // `runAsync` method in file order rather than a class name. This mapping is
  // only validated against the current 0.6.x bundle layout, so keep the range
  // tight until we verify newer bundled outputs.
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 11
    }
  },
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 11
    }
  },
  // The 1.x bundled entrypoints still inline the runtime into index.js, but
  // the minified method order changed. These indices are verified against 1.0.0.
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 12
    }
  },
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 12
    }
  },
  // --- BaseAgent.runAsync --- async generator, kind "Sync" + sync-stream channel
  // BaseAgent.runAsync — ESM individual module file
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKVersionRange,
      filePath: "dist/esm/agents/base_agent.js"
    },
    functionQuery: {
      className: "BaseAgent",
      methodName: "runAsync",
      kind: "Sync"
    }
  },
  // BaseAgent.runAsync — bundled CJS/ESM indexes
  // The bundled entrypoints minify class names, so target the first sync
  // `runAsync` method in file order rather than a class name. This mapping is
  // only validated against the current 0.6.x bundle layout, so keep the range
  // tight until we verify newer bundled outputs.
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  // The 1.x bundled entrypoints keep BaseAgent.runAsync as the first bundled
  // async-generator runAsync method in file order.
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  // --- FunctionTool.runAsync --- regular async, kind "Async"
  // FunctionTool.runAsync — ESM individual module file
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKVersionRange,
      filePath: "dist/esm/tools/function_tool.js"
    },
    functionQuery: {
      className: "FunctionTool",
      methodName: "runAsync",
      kind: "Async"
    }
  },
  // FunctionTool.runAsync — bundled CJS/ESM indexes
  // The bundled entrypoints minify class names, so target the first async
  // `runAsync` method in file order rather than a class name. This mapping is
  // only validated against the current 0.6.x bundle layout, so keep the range
  // tight until we verify newer bundled outputs.
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  },
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  },
  // The 1.x bundle moves FunctionTool.runAsync behind one helper method.
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  },
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  }
];

// src/instrumentation/plugins/cloudflare-ai-chat-channels.ts
var cloudflareAIChatChannels = defineChannels(
  "@cloudflare/ai-chat",
  {
    runExclusiveChatTurn: channel({
      channelName: "AIChatAgent._runExclusiveChatTurn",
      kind: "async"
    }),
    onChatResponse: channel({
      channelName: "AIChatAgent.onChatResponse",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLOUDFLARE_AI_CHAT }
);

// src/auto-instrumentations/configs/cloudflare-ai-chat.ts
var cloudflareAIChatVersionRange = ">=0.9.0 <0.10.0";
var cloudflareAIChatConfigs = [
  {
    // AIChatAgent subclasses replace onChatMessage, so there is no stable
    // public implementation for the transformer to target. This runner is
    // the narrowest shared boundary around every chat turn; keep the version
    // range tight because it is an internal method.
    channelName: cloudflareAIChatChannels.runExclusiveChatTurn.channelName,
    module: {
      name: "@cloudflare/ai-chat",
      versionRange: cloudflareAIChatVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "AIChatAgent",
      methodName: "_runExclusiveChatTurn",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cohere-channels.ts
var cohereChannels = defineChannels(
  "cohere-ai",
  {
    chat: channel({
      channelName: "chat",
      kind: "async"
    }),
    chatStream: channel({
      channelName: "chatStream",
      kind: "async"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    }),
    rerank: channel({
      channelName: "rerank",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.COHERE }
);

// src/auto-instrumentations/configs/cohere.ts
var cohereConfigs = [
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "rerank",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/groq-channels.ts
var groqChannels = defineChannels(
  "groq-sdk",
  {
    chatCompletionsCreate: channel({
      channelName: "chat.completions.create",
      kind: "async"
    }),
    embeddingsCreate: channel({
      channelName: "embeddings.create",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GROQ }
);

// src/auto-instrumentations/configs/groq.ts
var groqConfigs = [
  {
    channelName: groqChannels.chatCompletionsCreate.channelName,
    module: {
      name: "groq-sdk",
      versionRange: ">=1.0.0",
      filePath: "resources/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: groqChannels.embeddingsCreate.channelName,
    module: {
      name: "groq-sdk",
      versionRange: ">=1.0.0",
      filePath: "resources/embeddings.mjs"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/genkit-channels.ts
var genkitChannels = defineChannels(
  "@genkit-ai/ai",
  {
    generate: channel({
      channelName: "generate",
      kind: "async"
    }),
    generateStream: channel({
      channelName: "generateStream",
      kind: "sync-stream"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    }),
    embedMany: channel({
      channelName: "embedMany",
      kind: "async"
    }),
    actionRun: channel({
      channelName: "action.run",
      kind: "async"
    }),
    actionStream: channel({
      channelName: "action.stream",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GENKIT }
);
var genkitCoreChannels = defineChannels(
  "@genkit-ai/core",
  {
    actionSpan: channel({
      channelName: "action.span",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GENKIT }
);

// src/auto-instrumentations/configs/genkit.ts
var genkitVersionRange = ">=1.0.0 <2.0.0";
var genkitConfigs = [
  {
    channelName: genkitChannels.generate.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generate",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.generate.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generate",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.generateStream.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generateStream",
      kind: "Sync"
    }
  },
  {
    channelName: genkitChannels.generateStream.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generateStream",
      kind: "Sync"
    }
  },
  {
    channelName: genkitChannels.embed.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.embed.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.embedMany.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embedMany",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.embedMany.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embedMany",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.actionRun.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "run",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.actionRun.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "run",
      kind: "Async"
    }
  },
  {
    channelName: genkitCoreChannels.actionSpan.channelName,
    module: {
      name: "@genkit-ai/core",
      versionRange: genkitVersionRange,
      filePath: "lib/tracing/instrumentation.mjs"
    },
    functionQuery: {
      functionName: "runInNewSpan",
      kind: "Async"
    }
  },
  {
    channelName: genkitCoreChannels.actionSpan.channelName,
    module: {
      name: "@genkit-ai/core",
      versionRange: genkitVersionRange,
      filePath: "lib/tracing/instrumentation.js"
    },
    functionQuery: {
      functionName: "runInNewSpan",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/github-copilot-channels.ts
var gitHubCopilotChannels = defineChannels(
  "@github/copilot-sdk",
  {
    createSession: channel({
      channelName: "client.createSession",
      kind: "async"
    }),
    resumeSession: channel({
      channelName: "client.resumeSession",
      kind: "async"
    }),
    sendAndWait: channel({
      channelName: "session.sendAndWait",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GITHUB_COPILOT }
);

// src/auto-instrumentations/configs/github-copilot.ts
var gitHubCopilotConfigs = [
  // ESM: CopilotClient.createSession
  {
    channelName: gitHubCopilotChannels.createSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "createSession",
      kind: "Async"
    }
  },
  // CJS: CopilotClient.createSession
  {
    channelName: gitHubCopilotChannels.createSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/cjs/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "createSession",
      kind: "Async"
    }
  },
  // ESM: CopilotClient.resumeSession
  {
    channelName: gitHubCopilotChannels.resumeSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "resumeSession",
      kind: "Async"
    }
  },
  // CJS: CopilotClient.resumeSession
  {
    channelName: gitHubCopilotChannels.resumeSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/cjs/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "resumeSession",
      kind: "Async"
    }
  },
  // ESM: CopilotSession.sendAndWait
  {
    channelName: gitHubCopilotChannels.sendAndWait.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/session.js"
    },
    functionQuery: {
      className: "CopilotSession",
      methodName: "sendAndWait",
      kind: "Async"
    }
  },
  // CJS: CopilotSession.sendAndWait
  {
    channelName: gitHubCopilotChannels.sendAndWait.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/cjs/session.js"
    },
    functionQuery: {
      className: "CopilotSession",
      methodName: "sendAndWait",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/langchain-channels.ts
var langChainChannels = defineChannels(
  "@langchain/core",
  {
    configure: channel({
      channelName: "CallbackManager.configure",
      kind: "sync-stream"
    }),
    configureSync: channel({
      channelName: "CallbackManager._configureSync",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.LANGCHAIN }
);

// src/auto-instrumentations/configs/langchain.ts
var langChainCoreVersionRange = ">=0.3.42";
var langChainCallbackManagerFilePath = "dist/callbacks/manager.js";
var langchainConfigs = [
  {
    channelName: langChainChannels.configure.channelName,
    module: {
      name: "@langchain/core",
      versionRange: langChainCoreVersionRange,
      filePath: langChainCallbackManagerFilePath
    },
    functionQuery: {
      className: "CallbackManager",
      methodName: "configure",
      kind: "Sync"
    }
  },
  {
    channelName: langChainChannels.configureSync.channelName,
    module: {
      name: "@langchain/core",
      versionRange: langChainCoreVersionRange,
      filePath: langChainCallbackManagerFilePath
    },
    functionQuery: {
      className: "CallbackManager",
      methodName: "_configureSync",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/langsmith-channels.ts
var langSmithChannels = defineChannels(
  "langsmith",
  {
    createRun: channel({
      channelName: "Client.createRun",
      kind: "async"
    }),
    updateRun: channel({
      channelName: "Client.updateRun",
      kind: "async"
    }),
    batchIngestRuns: channel({
      channelName: "Client.batchIngestRuns",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.LANGSMITH }
);

// src/auto-instrumentations/configs/langsmith.ts
var versionRange = ">=0.3.30 <1.0.0";
var langSmithConfigs = [
  ...["dist/client.js", "dist/client.cjs"].flatMap((filePath) => [
    {
      channelName: langSmithChannels.createRun.channelName,
      module: { name: "langsmith", versionRange, filePath },
      functionQuery: {
        className: "Client",
        methodName: "createRun",
        kind: "Async"
      }
    },
    {
      channelName: langSmithChannels.updateRun.channelName,
      module: { name: "langsmith", versionRange, filePath },
      functionQuery: {
        className: "Client",
        methodName: "updateRun",
        kind: "Async"
      }
    },
    {
      channelName: langSmithChannels.batchIngestRuns.channelName,
      module: { name: "langsmith", versionRange, filePath },
      functionQuery: {
        className: "Client",
        methodName: "batchIngestRuns",
        kind: "Async"
      }
    }
  ])
];

// src/instrumentation/plugins/pi-coding-agent-channels.ts
var piCodingAgentChannels = defineChannels(
  "@earendil-works/pi-coding-agent",
  {
    prompt: channel({
      channelName: "AgentSession.prompt",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.PI_CODING_AGENT }
);

// src/auto-instrumentations/configs/pi-coding-agent.ts
var piCodingAgentVersionRange = ">=0.79.0 <0.82.0";
var piCodingAgentConfigs = [
  {
    channelName: piCodingAgentChannels.prompt.channelName,
    module: {
      name: "@earendil-works/pi-coding-agent",
      versionRange: piCodingAgentVersionRange,
      filePath: "dist/core/agent-session.js"
    },
    functionQuery: {
      className: "AgentSession",
      methodName: "prompt",
      kind: "Async"
    }
  }
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aiSDKConfigs,
  anthropicConfigs,
  bedrockRuntimeConfigs,
  claudeAgentSDKConfigs,
  cloudflareAIChatConfigs,
  cloudflareAgentsConfigs,
  cloudflareThinkConfigs,
  cohereConfigs,
  cursorSDKConfigs,
  genkitConfigs,
  gitHubCopilotConfigs,
  googleADKConfigs,
  googleGenAIConfigs,
  groqConfigs,
  huggingFaceConfigs,
  langSmithConfigs,
  langchainConfigs,
  mistralConfigs,
  ollamaConfigs,
  openAIAgentsCoreConfigs,
  openAICodexConfigs,
  openRouterAgentConfigs,
  openRouterConfigs,
  openaiConfigs,
  piCodingAgentConfigs
});
