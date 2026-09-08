"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class; var _class2; var _class3;var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

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
function setGlobalHookErrorReporter(reporter) {
  const previousReporter = errorReporter;
  errorReporter = reporter;
  return () => {
    if (errorReporter === reporter) {
      errorReporter = previousReporter;
    }
  };
}
function reportError(error) {
  try {
    _optionalChain([errorReporter, 'optionalCall', _2 => _2(error)]);
  } catch (e) {
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
var HookChannel = (_class = class {
  constructor(name) {;_class.prototype.__init.call(this);_class.prototype.__init2.call(this);
    this.name = name;
  }
  
  __init() {this.subscribers = []}
  __init2() {this.stores = /* @__PURE__ */ new Map()}
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
}, _class);
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
var InvocationHook = (_class2 = class {constructor() { _class2.prototype.__init3.call(this); }
  __init3() {this.interceptors = []}
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
}, _class2);
var TracingHook = (_class3 = class {
  
  
  
  
  
  __init4() {this.invocationHook = new InvocationHook()}
  constructor(nameOrChannels) {;_class3.prototype.__init4.call(this);
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
    this.start = _nullishCoalesce(nameOrChannels.start, () => ( new HookChannel("tracing:start")));
    this.end = _nullishCoalesce(nameOrChannels.end, () => ( new HookChannel("tracing:end")));
    this.asyncStart = _nullishCoalesce(nameOrChannels.asyncStart, () => ( new HookChannel("tracing:asyncStart")));
    this.asyncEnd = _nullishCoalesce(nameOrChannels.asyncEnd, () => ( new HookChannel("tracing:asyncEnd")));
    this.error = _nullishCoalesce(nameOrChannels.error, () => ( new HookChannel("tracing:error")));
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
            } catch (e2) {
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
    const callArgs = args.length > 0 ? args : _nullishCoalesce(context.arguments, () => ( args));
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
}, _class3);
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
  } catch (e3) {
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
  } catch (e4) {
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
  } catch (e5) {
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
  } catch (e6) {
    return false;
  }
}
function isCompatibleHookRegistry(value) {
  try {
    return value instanceof Map && value[registryBrand] === GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION;
  } catch (e7) {
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
var INTERNAL_SPAN_INSTRUMENTATION_NAME = /* @__PURE__ */ Symbol.for(
  "braintrust.spanInstrumentationName"
);
var SDK_VERSION = true ? "3.27.0" : "0.0.0";
function withSpanInstrumentationName(args, instrumentationName) {
  return {
    ...args,
    [INTERNAL_SPAN_INSTRUMENTATION_NAME]: instrumentationName
  };
}
function getSpanInstrumentationName(args) {
  if (typeof args !== "object" || args === null) {
    return void 0;
  }
  const value = args[INTERNAL_SPAN_INSTRUMENTATION_NAME];
  return isSpanInstrumentationName(value) ? value : void 0;
}
function detectSpanOriginEnvironment(explicit) {
  if (explicit) return explicit;
  const envType = isomorph_default.getEnv("BRAINTRUST_ENVIRONMENT_TYPE");
  const envName = isomorph_default.getEnv("BRAINTRUST_ENVIRONMENT_NAME");
  if (envType || envName) {
    return {
      ...envType ? { type: envType } : {},
      ...envName ? { name: envName } : {}
    };
  }
  const ci = firstPresent([
    ["GITHUB_ACTIONS", "github_actions"],
    ["GITLAB_CI", "gitlab_ci"],
    ["CIRCLECI", "circleci"],
    ["BUILDKITE", "buildkite"],
    ["JENKINS_URL", "jenkins"],
    ["JENKINS_HOME", "jenkins"],
    ["TF_BUILD", "azure_pipelines"],
    ["TEAMCITY_VERSION", "teamcity"],
    ["TRAVIS", "travis"],
    ["BITBUCKET_BUILD_NUMBER", "bitbucket"]
  ]);
  if (ci) return { type: "ci", name: ci };
  if (isomorph_default.getEnv("CI")) return { type: "ci", name: "ci" };
  const earlyServer = firstPresent([
    ["VERCEL", "vercel"],
    ["NETLIFY", "netlify"]
  ]);
  if (earlyServer) return { type: "server", name: earlyServer };
  if (isomorph_default.getEnv("ECS_CONTAINER_METADATA_URI") || isomorph_default.getEnv("ECS_CONTAINER_METADATA_URI_V4")) {
    return { type: "server", name: "ecs" };
  }
  const awsExecutionEnv = isomorph_default.getEnv("AWS_EXECUTION_ENV");
  if (_optionalChain([awsExecutionEnv, 'optionalAccess', _3 => _3.startsWith, 'call', _4 => _4("AWS_ECS_")])) {
    return { type: "server", name: "ecs" };
  }
  if (_optionalChain([awsExecutionEnv, 'optionalAccess', _5 => _5.startsWith, 'call', _6 => _6("AWS_Lambda_")])) {
    return { type: "server", name: "aws_lambda" };
  }
  if (isomorph_default.getEnv("AWS_LAMBDA_FUNCTION_NAME")) {
    return { type: "server", name: "aws_lambda" };
  }
  const server = firstPresent([
    ["K_SERVICE", "cloud_run"],
    ["FUNCTION_TARGET", "gcp_functions"],
    ["KUBERNETES_SERVICE_HOST", "kubernetes"],
    ["DYNO", "heroku"],
    ["FLY_APP_NAME", "fly"],
    ["RAILWAY_ENVIRONMENT", "railway"],
    ["RENDER_SERVICE_NAME", "render"]
  ]);
  if (server) return { type: "server", name: server };
  return deploymentModeEnvironment("NODE_ENV", isomorph_default.getEnv("NODE_ENV"));
}
function makeSpanOrigin(instrumentationName, environment) {
  return {
    name: "braintrust.sdk.javascript",
    version: SDK_VERSION,
    instrumentation: { name: instrumentationName },
    ...environment ? { environment } : {}
  };
}
function mergeSpanOriginContext(context, instrumentationName, environment) {
  const next = { ..._nullishCoalesce(context, () => ( {})) };
  const current = isObject(next.span_origin) ? { ...next.span_origin } : {};
  next.span_origin = {
    ...makeSpanOrigin(instrumentationName, environment),
    ...current
  };
  return next;
}
function isSpanInstrumentationName(value) {
  return Object.values(INSTRUMENTATION_NAMES).some((name) => name === value);
}
function firstPresent(entries) {
  return _optionalChain([entries, 'access', _7 => _7.find, 'call', _8 => _8(([key]) => Boolean(isomorph_default.getEnv(key))), 'optionalAccess', _9 => _9[1]]);
}
function deploymentModeEnvironment(_key, value) {
  if (!value) return void 0;
  const normalized = value.toLowerCase();
  if (normalized === "production" || normalized === "staging") {
    return { type: "server", name: normalized };
  }
  if (normalized === "development" || normalized === "local") {
    return { type: "local", name: normalized };
  }
  return { name: value };
}
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

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

// src/instrumentation/plugins/huggingface-transformers-channels.ts
var SUPPORTED_TASKS = /* @__PURE__ */ new Set([
  "text-generation",
  "text2text-generation",
  "summarization",
  "feature-extraction",
  "question-answering"
]);
var pipelineInfo = /* @__PURE__ */ new WeakMap();
function isSupportedHuggingFaceTransformersTask(task) {
  return typeof task === "string" && SUPPORTED_TASKS.has(task);
}
function registerHuggingFaceTransformersPipeline(pipeline, task, model) {
  if (typeof task !== "string") {
    return;
  }
  const info = { task };
  if (typeof model === "string") {
    info.model = model;
  }
  pipelineInfo.set(pipeline, info);
}
function getHuggingFaceTransformersPipelineInfo(pipeline) {
  return pipeline ? pipelineInfo.get(pipeline) : void 0;
}
var huggingFaceTransformersChannels = defineChannels(
  "@huggingface/transformers",
  {
    pipeline: channel({
      channelName: "pipeline",
      kind: "async"
    }),
    pipelineCall: channel({
      channelName: "pipeline.call",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.HUGGINGFACE }
);

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

// src/instrumentation/plugins/flue-channels.ts
var flueChannels = defineChannels(
  "@flue/runtime",
  {
    createContext: channel({
      channelName: "createFlueContext",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.FLUE }
);

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

// src/instrumentation/plugins/strands-agent-sdk-channels.ts
var strandsAgentSDKChannels = defineChannels(
  "@strands-agents/sdk",
  {
    agentStream: channel({
      channelName: "Agent.stream",
      kind: "sync-stream"
    }),
    graphStream: channel({
      channelName: "Graph.stream",
      kind: "sync-stream"
    }),
    swarmStream: channel({
      channelName: "Swarm.stream",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.STRANDS_AGENT_SDK }
);

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

// src/instrumentation/config.ts
var envIntegrationAliases = {
  openai: "openai",
  "openai-codex": "openaiCodexSDK",
  "openai-codex-sdk": "openaiCodexSDK",
  openaicodexsdk: "openaiCodexSDK",
  codex: "openaiCodexSDK",
  "codex-sdk": "openaiCodexSDK",
  "pi-coding-agent": "piCodingAgent",
  "pi-coding-agent-sdk": "piCodingAgent",
  picodingagent: "piCodingAgent",
  picodingagentsdk: "piCodingAgent",
  "@earendil-works/pi-coding-agent": "piCodingAgent",
  strandsAgentSDK: "strandsAgentSDK",
  strandsagentsdk: "strandsAgentSDK",
  "strands-agent-sdk": "strandsAgentSDK",
  "@strands-agents/sdk": "strandsAgentSDK",
  agents: "cloudflareAgents",
  "cloudflare-agents": "cloudflareAgents",
  cloudflareagents: "cloudflareAgents",
  anthropic: "anthropic",
  aisdk: "aisdk",
  "ai-sdk": "aisdk",
  "vercel-ai": "aisdk",
  vercel: "vercel",
  claudeagentsdk: "claudeAgentSDK",
  "claude-agent-sdk": "claudeAgentSDK",
  cloudflareaichat: "cloudflareAIChat",
  "cloudflare-ai-chat": "cloudflareAIChat",
  "@cloudflare/ai-chat": "cloudflareAIChat",
  cloudflarethink: "cloudflareThink",
  cursor: "cursor",
  "cursor-sdk": "cursorSDK",
  cursorsdk: "cursorSDK",
  flue: "flue",
  "flue-runtime": "flue",
  mastra: "mastra",
  "openai-agents": "openAIAgents",
  openaiagents: "openAIAgents",
  "openai-agents-core": "openAIAgents",
  openaiagentscore: "openAIAgents",
  google: "google",
  "google-genai": "googleGenAI",
  googlegenai: "googleGenAI",
  huggingface: "huggingface",
  "@huggingface/transformers": "huggingface",
  transformers: "huggingface",
  openrouter: "openrouter",
  openrouteragent: "openrouterAgent",
  "openrouter-agent": "openrouterAgent",
  mistral: "mistral",
  ollama: "ollama",
  googleadk: "googleADK",
  "google-adk": "googleADK",
  cohere: "cohere",
  groq: "groq",
  "groq-sdk": "groq",
  bedrock: "bedrock",
  "aws-bedrock": "awsBedrock",
  awsbedrock: "awsBedrock",
  "aws-bedrock-runtime": "awsBedrockRuntime",
  awsbedrockruntime: "awsBedrockRuntime",
  "@aws-sdk/client-bedrock-runtime": "awsBedrockRuntime",
  genkit: "genkit",
  "firebase-genkit": "genkit",
  githubcopilot: "gitHubCopilot",
  "github-copilot": "gitHubCopilot",
  "copilot-sdk": "gitHubCopilot",
  langchain: "langchain",
  "langchain-js": "langchain",
  "@langchain": "langchain",
  langgraph: "langgraph",
  langsmith: "langsmith"
};
function getDefaultInstrumentationIntegrations() {
  return {
    openai: true,
    openaiCodexSDK: true,
    anthropic: true,
    vercel: true,
    aisdk: true,
    google: true,
    googleGenAI: true,
    googleADK: true,
    huggingface: true,
    claudeAgentSDK: true,
    cloudflareAIChat: true,
    cloudflareThink: true,
    cursor: true,
    cursorSDK: true,
    flue: true,
    mastra: true,
    openAIAgents: true,
    openrouter: true,
    openrouterAgent: true,
    mistral: true,
    ollama: true,
    cohere: true,
    groq: true,
    bedrock: true,
    awsBedrock: true,
    awsBedrockRuntime: true,
    genkit: true,
    gitHubCopilot: true,
    langchain: true,
    langgraph: true,
    langsmith: true,
    piCodingAgent: true,
    strandsAgentSDK: true,
    cloudflareAgents: true
  };
}
function readDisabledInstrumentationEnvConfig(disabledList) {
  const integrations = {};
  if (disabledList) {
    for (const value of disabledList.split(",")) {
      const rawSdk = value.trim();
      const sdk = rawSdk.toLowerCase();
      if (sdk.length > 0) {
        integrations[_nullishCoalesce(_nullishCoalesce(envIntegrationAliases[rawSdk], () => ( envIntegrationAliases[sdk])), () => ( sdk))] = false;
      }
    }
  }
  return { integrations };
}
function isInstrumentationIntegrationDisabled(integrations, ...names) {
  return names.some((name) => _optionalChain([integrations, 'optionalAccess', _10 => _10[name]]) === false);
}

// src/auto-instrumentations/loader/mastra-observability-patch.ts
var MASTRA_EXPORTER_FACTORY_GLOBAL = "__braintrustMastraExporterFactory";
function installMastraExporterFactory(factory) {
  const globals = globalThis;
  globals[MASTRA_EXPORTER_FACTORY_GLOBAL] ??= factory;
}
var MASTRA_CORE_PACKAGE = "@mastra/core";
var MASTRA_OBSERVABILITY_PACKAGE = "@mastra/observability";
var MASTRA_CORE_ENTRY_PATHS = /* @__PURE__ */ new Set([
  "dist/index.js",
  "dist/index.cjs",
  "dist/mastra/index.js",
  "dist/mastra/index.cjs"
]);
var MASTRA_OBSERVABILITY_ENTRY_PATHS = /* @__PURE__ */ new Set([
  "dist/index.js",
  "dist/index.cjs"
]);
function classifyMastraTarget(packageName, modulePath) {
  if (packageName === MASTRA_CORE_PACKAGE && MASTRA_CORE_ENTRY_PATHS.has(modulePath)) {
    return "core";
  }
  if (packageName === MASTRA_OBSERVABILITY_PACKAGE && MASTRA_OBSERVABILITY_ENTRY_PATHS.has(modulePath)) {
    return "observability";
  }
  return null;
}
function extractChunkPath(source) {
  const esmMatch = source.match(
    /export\s*\{\s*Mastra(?:\s+as\s+\w+)?\s*\}\s*from\s*['"]([^'"]+)['"]/
  );
  if (esmMatch) return esmMatch[1];
  const cjsMatch = source.match(
    /require\s*\(\s*['"]([^'"]+chunk-[^'"]+)['"]\s*\)/
  );
  if (cjsMatch) return cjsMatch[1];
  return null;
}
var EXPORTER_FACTORY_KEY = JSON.stringify(MASTRA_EXPORTER_FACTORY_GLOBAL);
var MASTRA_PROXY_HANDLER_BODY = `
{
  construct(target, args, newTarget) {
    var firstArg = args[0];
    if (
      (!firstArg || typeof firstArg !== "object" || !firstArg.observability) &&
      __braintrustObservabilityClass
    ) {
      try {
        // serviceName is required by Mastra's Observability validator; pass
        // something sensible by default. Users who want a different name
        // should construct Observability themselves.
        var observability = new __braintrustObservabilityClass({
          configs: { default: { serviceName: "mastra" } },
        });
        args = args.slice();
        args[0] = Object.assign({}, firstArg, { observability: observability });
      } catch (e) {
        // Fall through. Mastra will use its own NoOp; user code still works,
        // just without auto-instrumentation.
      }
    }
    return Reflect.construct(target, args, newTarget);
  },
}`;
function buildMastraEsmWrapper(chunkPath) {
  const chunk = JSON.stringify(chunkPath);
  return `import { Mastra as __braintrustOrigMastra } from ${chunk};
import { createRequire as __braintrustCreateRequire } from "node:module";

let __braintrustObservabilityClass = null;
try {
  // Resolve @mastra/observability relative to this module (the Mastra entry),
  // so it's looked up from the user's node_modules tree.
  const __braintrustRequire = __braintrustCreateRequire(import.meta.url);
  __braintrustObservabilityClass =
    __braintrustRequire("@mastra/observability").Observability;
} catch (e) {
  // @mastra/observability isn't installed; the construct trap will skip the
  // auto-construct branch and Mastra falls back to its own NoOp.
}
const Mastra = new Proxy(__braintrustOrigMastra, ${MASTRA_PROXY_HANDLER_BODY});
export { Mastra };
`;
}
function buildMastraCjsWrapper(chunkPath) {
  const chunk = JSON.stringify(chunkPath);
  return `'use strict';
const __braintrustChunk = require(${chunk});

let __braintrustObservabilityClass = null;
try {
  __braintrustObservabilityClass = require("@mastra/observability").Observability;
} catch (e) {
  // @mastra/observability isn't installed; same fallback as the ESM wrapper.
}

const __braintrustWrappedMastra = new Proxy(
  __braintrustChunk.Mastra,
  ${MASTRA_PROXY_HANDLER_BODY},
);
Object.defineProperty(exports, "Mastra", {
  enumerable: true,
  configurable: true,
  get: function () { return __braintrustWrappedMastra; }
});
`;
}
var OBSERVABILITY_APPEND_BODY = `
;(function __braintrustWrapObservability() {
  // Top-level so we can both read and reassign the var binding the original
  // entry declared.
  if (typeof Observability === "undefined") return;
  if (Observability.__braintrustWrapped) return;
  function __braintrustEnsureExporter(rawConfig) {
    try {
      var factory = globalThis[${EXPORTER_FACTORY_KEY}];
      if (typeof factory !== "function") return rawConfig;
      var config = rawConfig && typeof rawConfig === "object" ? rawConfig : {};
      var configsIn = config.configs && typeof config.configs === "object" ? config.configs : null;
      var configsOut = {};
      var hadEntries = false;
      if (configsIn) {
        for (var name in configsIn) {
          if (!Object.prototype.hasOwnProperty.call(configsIn, name)) continue;
          hadEntries = true;
          var inst = configsIn[name] || {};
          var existing = Array.isArray(inst.exporters) ? inst.exporters : [];
          var hasOurs = existing.some(function (e) { return e && e.name === "braintrust"; });
          configsOut[name] = Object.assign({}, inst, {
            exporters: hasOurs ? existing : existing.concat([factory()]),
          });
        }
      }
      if (!hadEntries) {
        configsOut.default = {
          serviceName: "mastra",
          exporters: [factory()],
        };
      }
      return Object.assign({}, config, { configs: configsOut });
    } catch (e) {
      return rawConfig;
    }
  }
  var __OriginalObservability = Observability;
  Observability = new Proxy(__OriginalObservability, {
    construct: function (target, args, newTarget) {
      var nextArgs = args.slice();
      nextArgs[0] = __braintrustEnsureExporter(nextArgs[0]);
      return Reflect.construct(target, nextArgs, newTarget);
    },
  });
  Observability.__braintrustWrapped = true;
  if (typeof exports !== "undefined" && exports && typeof exports === "object") {
    try {
      Object.defineProperty(exports, "Observability", {
        enumerable: true,
        configurable: true,
        get: function () { return Observability; },
      });
    } catch (e) {}
  }
})();
`;
function patchMastraSource(source, target, format) {
  if (target === "core") {
    const chunkPath = extractChunkPath(source);
    if (!chunkPath) return source;
    return format === "esm" ? buildMastraEsmWrapper(chunkPath) : buildMastraCjsWrapper(chunkPath);
  }
  return source + OBSERVABILITY_APPEND_BODY;
}

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























































exports.__export = __export; exports.GLOBAL_INSTRUMENTATION_HOOKS_KEY = GLOBAL_INSTRUMENTATION_HOOKS_KEY; exports.GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION = GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION; exports.GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND = GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND; exports.GLOBAL_INSTRUMENTATION_HOOK_BRAND = GLOBAL_INSTRUMENTATION_HOOK_BRAND; exports.setGlobalHookErrorReporter = setGlobalHookErrorReporter; exports.isomorph_default = isomorph_default; exports.INSTRUMENTATION_NAMES = INSTRUMENTATION_NAMES; exports.withSpanInstrumentationName = withSpanInstrumentationName; exports.getSpanInstrumentationName = getSpanInstrumentationName; exports.detectSpanOriginEnvironment = detectSpanOriginEnvironment; exports.mergeSpanOriginContext = mergeSpanOriginContext; exports.openAIChannels = openAIChannels; exports.openAICodexChannels = openAICodexChannels; exports.anthropicChannels = anthropicChannels; exports.aiSDKChannels = aiSDKChannels; exports.harnessAgentChannels = harnessAgentChannels; exports.claudeAgentSDKChannels = claudeAgentSDKChannels; exports.cloudflareThinkChannels = cloudflareThinkChannels; exports.cursorSDKChannels = cursorSDKChannels; exports.openAIAgentsCoreChannels = openAIAgentsCoreChannels; exports.googleGenAIChannels = googleGenAIChannels; exports.huggingFaceChannels = huggingFaceChannels; exports.isSupportedHuggingFaceTransformersTask = isSupportedHuggingFaceTransformersTask; exports.registerHuggingFaceTransformersPipeline = registerHuggingFaceTransformersPipeline; exports.getHuggingFaceTransformersPipelineInfo = getHuggingFaceTransformersPipelineInfo; exports.huggingFaceTransformersChannels = huggingFaceTransformersChannels; exports.openRouterAgentChannels = openRouterAgentChannels; exports.openRouterChannels = openRouterChannels; exports.mistralChannels = mistralChannels; exports.ollamaChannels = ollamaChannels; exports.googleADKChannels = googleADKChannels; exports.cohereChannels = cohereChannels; exports.groqChannels = groqChannels; exports.bedrockRuntimeChannels = bedrockRuntimeChannels; exports.smithyCoreChannels = smithyCoreChannels; exports.smithyClientChannels = smithyClientChannels; exports.genkitChannels = genkitChannels; exports.genkitCoreChannels = genkitCoreChannels; exports.gitHubCopilotChannels = gitHubCopilotChannels; exports.flueChannels = flueChannels; exports.langChainChannels = langChainChannels; exports.langSmithChannels = langSmithChannels; exports.piCodingAgentChannels = piCodingAgentChannels; exports.strandsAgentSDKChannels = strandsAgentSDKChannels; exports.cloudflareAIChatChannels = cloudflareAIChatChannels; exports.cloudflareAgentsChannels = cloudflareAgentsChannels; exports.getDefaultInstrumentationIntegrations = getDefaultInstrumentationIntegrations; exports.readDisabledInstrumentationEnvConfig = readDisabledInstrumentationEnvConfig; exports.isInstrumentationIntegrationDisabled = isInstrumentationIntegrationDisabled; exports.installMastraExporterFactory = installMastraExporterFactory; exports.classifyMastraTarget = classifyMastraTarget; exports.patchMastraSource = patchMastraSource;
