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

export {
  GLOBAL_INSTRUMENTATION_HOOKS_KEY,
  GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
  GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND,
  GLOBAL_INSTRUMENTATION_HOOK_BRAND,
  newGlobalTracingChannel
};
