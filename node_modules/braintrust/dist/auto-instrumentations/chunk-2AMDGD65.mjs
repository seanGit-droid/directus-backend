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
    const channel = value;
    return typeof channel.hasSubscribers === "boolean" && typeof channel.subscribe === "function" && typeof channel.unsubscribe === "function" && typeof channel.bindStore === "function" && typeof channel.unbindStore === "function" && typeof channel.publish === "function" && typeof channel.runStores === "function";
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

// src/auto-instrumentations/orchestrion-js/matcher.ts
import semifies from "semifies";

// src/auto-instrumentations/orchestrion-js/transformer.ts
import esquery2 from "esquery";
import { generate } from "astring";
import { parse as parse2 } from "meriyah";
import { SourceMapGenerator } from "source-map";

// src/auto-instrumentations/orchestrion-js/transforms.ts
import esquery from "esquery";
import { parse } from "meriyah";
var CHANNEL_REGEX = /[^\w]/g;
var SHARED_HOOK_LOOKUP = "tr_ch_bt$get_hook";
function formatChannelVariable(channelName) {
  return `tr_ch_bt$${channelName.replace(CHANNEL_REGEX, "_")}`;
}
function formatChannelGetter(channelName) {
  return `tr_ch_bt$get_${channelName.replace(CHANNEL_REGEX, "_")}`;
}
var transforms = {
  tracingHookDeclaration(state, node) {
    const {
      channelName,
      module: { name }
    } = state;
    const channelVariable = formatChannelVariable(channelName);
    const channelGetter = formatChannelGetter(channelName);
    const hasSharedHookLookup = node.body.some(
      (child) => child.declarations?.[0]?.id?.name === SHARED_HOOK_LOOKUP
    );
    if (node.body.some(
      (child) => child.declarations?.[0]?.id?.name === channelGetter
    )) {
      return;
    }
    const sharedHookLookup = hasSharedHookLookup ? "" : `
      const ${SHARED_HOOK_LOOKUP} = (__bt$hookName) => {
        try {
          const __bt$hooks = globalThis[${JSON.stringify(
      GLOBAL_INSTRUMENTATION_HOOKS_KEY
    )}];
          if (
            !(__bt$hooks instanceof Map) ||
            __bt$hooks[Symbol.for(${JSON.stringify(
      GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND
    )})] !== ${GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION}
          ) return undefined;
          const __bt$hook = Map.prototype.get.call(
            __bt$hooks,
            __bt$hookName
          );
          if (
            (__bt$hook === null ||
              (typeof __bt$hook !== "object" &&
                typeof __bt$hook !== "function")) ||
            __bt$hook[Symbol.for(${JSON.stringify(
      GLOBAL_INSTRUMENTATION_HOOK_BRAND
    )})] !== ${GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION} ||
            typeof __bt$hook.traceInvocation !== "function"
          ) return undefined;
          return __bt$hook;
        } catch {
          return undefined;
        }
      };
    `;
    const code = `
      ${sharedHookLookup}
      let ${channelVariable};
      const ${channelGetter} = () =>
        ${channelVariable} ??= ${SHARED_HOOK_LOOKUP}(
          ${JSON.stringify(`orchestrion:${name}:${channelName}`)}
        );
    `;
    const sharedHookLookupIndex = node.body.findIndex(
      (child) => child.declarations?.[0]?.id?.name === SHARED_HOOK_LOOKUP
    );
    const index = sharedHookLookupIndex === -1 ? node.body.findIndex(
      (child) => child.directive === "use strict"
    ) : sharedHookLookupIndex;
    node.body.splice(index + 1, 0, ...parse(code).body);
  },
  traceCallback: traceAny,
  tracePromise: traceAny,
  traceSync: traceAny
};
function traceAny(state, node, _parent, ancestry) {
  const program = ancestry[ancestry.length - 1];
  if (node.type === "ClassDeclaration" || node.type === "ClassExpression") {
    traceInstanceMethod(state, node, program);
  } else {
    traceFunction(state, node, program);
  }
}
function traceFunction(state, node, program) {
  transforms.tracingHookDeclaration(state, program, null, []);
  const { functionQuery } = state;
  const methodName = "methodName" in functionQuery ? functionQuery.methodName : void 0;
  const privateMethodName = "privateMethodName" in functionQuery ? functionQuery.privateMethodName : void 0;
  const functionName = "functionName" in functionQuery ? functionQuery.functionName : void 0;
  const isConstructor = methodName === "constructor" || !methodName && !privateMethodName && !functionName;
  const type = isConstructor ? "ArrowFunctionExpression" : "FunctionExpression";
  node.body = wrap(state, {
    type,
    params: node.params,
    body: node.body,
    async: node.async,
    expression: false,
    generator: node.generator
  });
  node.generator = false;
  node.async = false;
  wrapSuper(node);
}
function traceInstanceMethod(state, node, program) {
  const { functionQuery, operator } = state;
  const { methodName } = functionQuery;
  if (!methodName) {
    return;
  }
  const classBody = node.body;
  if (classBody.body.some(({ key }) => key?.name === methodName)) {
    return;
  }
  let ctor = classBody.body.find(({ kind }) => kind === "constructor");
  transforms.tracingHookDeclaration(state, program, null, []);
  if (!ctor) {
    ctor = parse(
      node.superClass ? "class A extends Object { constructor (...args) { super(...args) } }" : "class A { constructor () {} }"
    ).body[0].body.body[0];
    classBody.body.unshift(ctor);
  }
  const ctorBody = parse(`
    const __bt$${methodName} = this["${methodName}"]
    this["${methodName}"] = function () {}
  `).body;
  const fn = ctorBody[1].expression.right;
  fn.async = operator === "tracePromise";
  fn.body = wrap(state, {
    type: "Identifier",
    name: `__bt$${methodName}`
  });
  wrapSuper(fn);
  ctor.value.body.body.push(...ctorBody);
}
function wrap(state, node) {
  const wrapper = wrapInvocation(state);
  const block = wrapper.body[0].body;
  const common = parse(
    node.type === "ArrowFunctionExpression" ? `
    const __bt$target = (...__bt$args) => {
      const __bt$wrapped = () => {};
      return __bt$wrapped(...__bt$args);
    };
  ` : `
    const __bt$target = function (...__bt$args) {
      const __bt$wrapped = () => {};
      return __bt$wrapped.apply(this, __bt$args);
    };
  `
  ).body;
  block.body.unshift(...common);
  esquery.query(block, "[id.name=__bt$wrapped]")[0].init = node;
  return block;
}
function wrapSuper(node) {
  const members = /* @__PURE__ */ new Set();
  esquery.traverse(
    node.body,
    esquery.parse("[object.type=Super]"),
    (node2, parent) => {
      const { name } = node2.property;
      let child;
      if (parent.callee) {
        const { expression } = parse(`__bt$super['${name}'].call(this)`).body[0];
        parent.callee = child = expression.callee;
        parent.arguments.unshift(...expression.arguments);
      } else {
        parent.expression = child = parse(`__bt$super['${name}']`).body[0];
      }
      child.computed = parent.callee.computed;
      child.optional = parent.callee.optional;
      members.add(name);
    }
  );
  for (const name of members) {
    const member = parse(`
      class Wrapper {
        wrapper () {
          __bt$super['${name}'] = super['${name}']
        }
      }
    `).body[0].body.body[0].value.body.body[0];
    node.body.body.unshift(member);
  }
  if (members.size > 0) {
    node.body.body.unshift(parse("const __bt$super = {}").body[0]);
  }
}
function wrapInvocation(state) {
  const { channelName, moduleVersion, operator, functionQuery } = state;
  const channelGetter = formatChannelGetter(channelName);
  const callbackIndex = functionQuery.callbackIndex ?? -1;
  return parse(`
    function wrapper () {
      const __bt$hook = ${channelGetter}();
      if (!__bt$hook) return __bt$target.apply(this, arguments);
      return __bt$hook.traceInvocation(
        ${JSON.stringify(operator)},
        __bt$target,
        this,
        arguments,
        { moduleVersion: ${JSON.stringify(moduleVersion)} },
        ${callbackIndex}
      );
    }
  `);
}

// src/auto-instrumentations/orchestrion-js/transformer.ts
var Transformer = class {
  moduleName;
  version;
  filePath;
  configs = [];
  constructor(moduleName, version, filePath, configs) {
    this.moduleName = moduleName;
    this.version = version;
    this.filePath = filePath;
    this.configs = configs;
  }
  /**
   * Instruments `code` by injecting global tracing hooks around the
   * target functions defined by this transformer's configs.
   */
  transform(code, moduleType) {
    if (Buffer.isBuffer(code)) {
      code = code.toString();
    }
    if (!code) {
      return { code };
    }
    let ast;
    let aliases = {};
    let injectionCount = 0;
    for (const config of this.configs) {
      const { astQuery, functionQuery } = config;
      if (!ast) {
        const options = {
          loc: true,
          ranges: true,
          raw: true,
          module: moduleType === "esm"
        };
        try {
          ast = parse2(code, options);
        } catch {
          ast = parse2(code, { ...options, module: !options.module });
        }
        if (moduleType === "esm") {
          aliases = this.collectExportAliases(ast);
        }
      }
      const resolvedFunctionQuery = this.resolveExportAlias(
        functionQuery,
        aliases
      );
      const query = astQuery || this.fromFunctionQuery(resolvedFunctionQuery);
      const state = {
        ...config,
        moduleVersion: this.version,
        functionQuery: resolvedFunctionQuery,
        operator: this.getOperator(resolvedFunctionQuery.kind)
      };
      esquery2.traverse(ast, esquery2.parse(query), (...args) => {
        injectionCount++;
        this.visit(state, ...args);
      });
    }
    if (injectionCount === 0 && this.configs.length > 0) {
      const names = this.configs.map(({ astQuery, functionQuery }) => {
        const resolvedQuery = this.resolveExportAlias(functionQuery, aliases);
        const queryName = (q) => q.methodName || q.privateMethodName || q.functionName || q.propertyName || astQuery || "unknown";
        const originalName = queryName(functionQuery);
        const originalAlias = functionQuery.className || functionQuery.functionName;
        const resolvedAlias = resolvedQuery.className || resolvedQuery.functionName;
        if (originalAlias && originalAlias !== resolvedAlias) {
          return `${originalAlias} (local name: ${resolvedAlias})`;
        }
        return originalName;
      });
      throw new Error(
        `Failed to find injection points for: ${JSON.stringify(names)}`
      );
    }
    if (ast) {
      const file = `${this.moduleName}/${this.filePath}`;
      const sourceMap = new SourceMapGenerator({ file });
      const transformedCode = generate(ast, { sourceMap });
      const map = sourceMap.toString();
      return { code: transformedCode, map };
    }
    return { code };
  }
  free() {
  }
  visit(state, ...args) {
    const transform = transforms[state.operator];
    const { index = 0 } = state.functionQuery;
    const [node] = args;
    const type = node.init?.type || node.type;
    if (type !== "ClassDeclaration" && type !== "ClassExpression") {
      if (node.type === "VariableDeclarator") {
        return;
      }
      state.functionIndex = state.functionIndex === void 0 ? 0 : state.functionIndex + 1;
      if (index !== null && index !== state.functionIndex) {
        return;
      }
    }
    transform(state, ...args);
  }
  getOperator(kind) {
    switch (kind) {
      case "Async":
        return "tracePromise";
      case "Callback":
        return "traceCallback";
      case "Sync":
        return "traceSync";
    }
  }
  collectExportAliases(ast) {
    const aliases = {};
    for (const node of ast.body) {
      if (node.type === "ExportNamedDeclaration" && !node.source) {
        for (const spec of node.specifiers) {
          if (spec.exported && spec.local) {
            const exportedName = spec.exported.name ?? spec.exported.value;
            const localName = spec.local.name ?? spec.local.value;
            if (exportedName && localName) {
              aliases[exportedName] = localName;
            }
          }
        }
      }
    }
    return aliases;
  }
  resolveExportAlias(functionQuery, aliases) {
    if (!("isExportAlias" in functionQuery) || !functionQuery.isExportAlias) {
      return functionQuery;
    }
    if ("className" in functionQuery && aliases[functionQuery.className]) {
      return {
        ...functionQuery,
        className: aliases[functionQuery.className]
      };
    }
    if ("functionName" in functionQuery && aliases[functionQuery.functionName]) {
      return {
        ...functionQuery,
        functionName: aliases[functionQuery.functionName]
      };
    }
    return functionQuery;
  }
  functionQueryLabel(functionQuery) {
    if ("methodName" in functionQuery) {
      return functionQuery.methodName;
    }
    if ("privateMethodName" in functionQuery) {
      return functionQuery.privateMethodName;
    }
    if ("functionName" in functionQuery) {
      return functionQuery.functionName;
    }
    if ("propertyName" in functionQuery) {
      return functionQuery.propertyName;
    }
    return "unknown";
  }
  fromFunctionQuery(functionQuery) {
    const queries = [];
    if ("className" in functionQuery) {
      const { className } = functionQuery;
      const methodName = this.functionQueryLabel(functionQuery);
      const keyType = "privateMethodName" in functionQuery ? "PrivateIdentifier" : "Identifier";
      queries.push(
        `[id.name="${className}"]`,
        `[id.name="${className}"] > ClassExpression`,
        `[id.name="${className}"] > ClassBody > [key.name="${methodName}"][key.type=${keyType}] > [async]`,
        `[id.name="${className}"] > ClassExpression > ClassBody > [key.name="${methodName}"][key.type=${keyType}] > [async]`
      );
    } else if ("methodName" in functionQuery) {
      const { methodName } = functionQuery;
      queries.push(
        `ClassBody > [key.name="${methodName}"][key.type=Identifier] > [async]`,
        `Property[key.name="${methodName}"][key.type=Identifier] > [async]`
      );
    }
    if ("functionName" in functionQuery) {
      const { functionName } = functionQuery;
      queries.push(`FunctionDeclaration[id.name="${functionName}"][async]`);
    }
    if ("objectName" in functionQuery) {
      const { objectName, propertyName } = functionQuery;
      const objectSelector = objectName === "this" ? "left.object.type=ThisExpression" : `left.object.name="${objectName}"`;
      queries.push(
        `AssignmentExpression[${objectSelector}][left.property.name="${propertyName}"] > [async]`
      );
    }
    return queries.join(", ");
  }
};

// src/auto-instrumentations/orchestrion-js/matcher.ts
var InstrumentationMatcher = class {
  configs = [];
  transformers = {};
  constructor(configs) {
    this.configs = configs;
  }
  /**
   * Returns a Transformer for the given module/file/version, or undefined if no
   * registered config matches.
   */
  getTransformer(moduleName, version, filePath) {
    filePath = filePath.replace(/\\/g, "/");
    const id = `${moduleName}/${filePath}@${version}`;
    if (this.transformers[id]) {
      return this.transformers[id];
    }
    const configs = this.configs.filter(
      ({ module: mod }) => mod.name === moduleName && mod.filePath === filePath && semifies(version, mod.versionRange)
    );
    if (configs.length === 0) {
      return void 0;
    }
    this.transformers[id] = new Transformer(
      moduleName,
      version,
      filePath,
      configs
    );
    return this.transformers[id];
  }
  free() {
    this.transformers = {};
  }
};

// src/auto-instrumentations/orchestrion-js/index.ts
function create(configs) {
  return new InstrumentationMatcher(configs);
}

// src/auto-instrumentations/loader/get-package-version.ts
import { readFileSync, realpathSync } from "fs";
import { join } from "path";
var packageVersions = /* @__PURE__ */ new Map();
var packageNames = /* @__PURE__ */ new Map();
function readPackageJson(baseDir) {
  try {
    const packageJsonPath = join(baseDir, "package.json");
    const jsonFile = readFileSync(packageJsonPath, "utf8");
    return JSON.parse(jsonFile);
  } catch {
    return void 0;
  }
}
function resolvePackageBaseDir(baseDir) {
  try {
    return realpathSync(baseDir);
  } catch {
    return baseDir;
  }
}
function readPackageJsonWithFallback(baseDir) {
  const packageJson = readPackageJson(baseDir);
  if (packageJson) {
    return packageJson;
  }
  const resolvedBaseDir = resolvePackageBaseDir(baseDir);
  if (resolvedBaseDir === baseDir) {
    return void 0;
  }
  return readPackageJson(resolvedBaseDir);
}
function getPackageVersion(baseDir) {
  if (packageVersions.has(baseDir)) {
    return packageVersions.get(baseDir);
  }
  const packageJson = readPackageJsonWithFallback(baseDir);
  if (typeof packageJson?.version === "string") {
    packageVersions.set(baseDir, packageJson.version);
    return packageJson.version;
  }
  return process.version.slice(1);
}
function getPackageName(baseDir) {
  if (packageNames.has(baseDir)) {
    return packageNames.get(baseDir);
  }
  const packageJson = readPackageJsonWithFallback(baseDir);
  if (typeof packageJson?.name === "string") {
    packageNames.set(baseDir, packageJson.name);
    return packageJson.name;
  }
  return void 0;
}

// src/auto-instrumentations/loader/openai-api-promise-patch.ts
var OPENAI_API_PROMISE_PATCH = `
;(function __btPatchAPIPromise() {
  if (typeof APIPromise === "undefined" || APIPromise.prototype.__btParsePatched) return;
  APIPromise.prototype.__btParsePatched = true;
  var _origThen = APIPromise.prototype.then;
  APIPromise.prototype.then = function __btThen(onfulfilled, onrejected) {
    if (!this.__btParseWrapped && Object.prototype.hasOwnProperty.call(this, "parseResponse")) {
      this.__btParseWrapped = true;
      var _origParse = this.parseResponse;
      var _cached;
      this.parseResponse = function() {
        if (!_cached) _cached = _origParse.apply(this, arguments);
        return _cached;
      };
    }
    return _origThen.call(this, onfulfilled, onrejected);
  };
})();
`;

// src/auto-instrumentations/loader/special-case-patches.ts
function applySpecialCasePatch(input) {
  if (input.packageName === "openai" && input.modulePath.includes("api-promise")) {
    return input.source + OPENAI_API_PROMISE_PATCH;
  }
  if (input.browser) {
    return null;
  }
  const mastraTarget = classifyMastraTarget(
    input.packageName,
    input.modulePath
  );
  if (mastraTarget) {
    return patchMastraSource(input.source, mastraTarget, input.format);
  }
  return null;
}
function isSpecialCaseTarget(packageName, modulePath) {
  if (packageName === "openai" && modulePath.includes("api-promise")) {
    return true;
  }
  if (classifyMastraTarget(packageName, modulePath) !== null) {
    return true;
  }
  return false;
}

export {
  GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
  setGlobalHookErrorReporter,
  newGlobalTracingChannel,
  installMastraExporterFactory,
  create,
  getPackageVersion,
  getPackageName,
  applySpecialCasePatch,
  isSpecialCaseTarget
};
