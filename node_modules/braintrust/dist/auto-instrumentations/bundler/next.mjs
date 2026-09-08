import {
  webpackPlugin
} from "../chunk-BW33ULMW.mjs";
import "../chunk-XEYKUBLY.mjs";
import "../chunk-ZNHTSSGI.mjs";
import "../chunk-I55G56ZL.mjs";
import "../chunk-JPUFNW7X.mjs";
import "../chunk-P5YLNB2A.mjs";

// src/auto-instrumentations/bundler/next.ts
import { createRequire } from "module";
import { join } from "path";
var requireFromProject = createRequire(join(process.cwd(), "package.json"));
var TURBOPACK_RULE_MATCHER = "*.{js,mjs,cjs}";
function wrapNextjsConfigWithBraintrust(nextConfig) {
  const castNextConfig = nextConfig ?? {};
  if (typeof castNextConfig === "function") {
    return function(...args) {
      const maybeConfig = castNextConfig.apply(this, args);
      if (isThenable(maybeConfig)) {
        return maybeConfig.then(
          (resolvedConfig) => createConfigObject(resolvedConfig)
        );
      }
      return createConfigObject(maybeConfig);
    };
  }
  return createConfigObject(castNextConfig);
}
function createConfigObject(nextConfig) {
  const config = { ...nextConfig ?? {} };
  const activeBundler = detectBundler();
  if (activeBundler === "turbopack") {
    if (config.turbopack || !config.experimental?.turbo) {
      return {
        ...config,
        turbopack: wrapTurbopackConfig(config.turbopack)
      };
    }
    return {
      ...config,
      experimental: {
        ...config.experimental,
        turbo: wrapTurbopackConfig(config.experimental.turbo)
      }
    };
  }
  return {
    ...config,
    webpack: wrapWebpackConfig(config.webpack)
  };
}
function detectBundler() {
  if (process.argv.includes("--webpack")) {
    return "webpack";
  }
  const turbopackEnv = process.env.TURBOPACK?.trim().toLowerCase();
  if (turbopackEnv && turbopackEnv !== "0" && turbopackEnv !== "false" || process.argv.includes("--turbo") || process.argv.includes("--turbopack")) {
    return "turbopack";
  }
  const nextMajorVersion = getNextMajorVersion();
  if (nextMajorVersion !== void 0 && nextMajorVersion >= 16) {
    return "turbopack";
  }
  return "webpack";
}
function wrapWebpackConfig(userWebpack) {
  return (incomingConfig, buildContext) => {
    const rawConfig = typeof userWebpack === "function" ? userWebpack(incomingConfig, buildContext) : incomingConfig;
    const config = rawConfig ?? incomingConfig;
    const existingPlugins = Array.isArray(config.plugins) ? config.plugins : [];
    const runtime = buildContext.isServer ? buildContext.nextRuntime === "edge" || buildContext.nextRuntime === "experimental-edge" ? "edge" : "server" : "client";
    const plugin = webpackPlugin({
      browser: runtime === "client" || runtime === "edge"
    });
    return {
      ...config,
      plugins: [...existingPlugins, plugin]
    };
  };
}
function wrapTurbopackConfig(turbopackConfig) {
  const config = { ...turbopackConfig ?? {} };
  const rules = config.rules && typeof config.rules === "object" && !Array.isArray(config.rules) ? config.rules : {};
  return {
    ...config,
    rules: addBraintrustTurbopackRule(rules)
  };
}
function addBraintrustTurbopackRule(rules) {
  const loaderPath = getWebpackLoaderPath();
  const braintrustRules = [
    {
      condition: { all: ["foreign", "browser"] },
      loaders: [
        {
          loader: loaderPath,
          options: { browser: true }
        }
      ]
    },
    {
      condition: { all: ["foreign", "edge-light"] },
      loaders: [
        {
          loader: loaderPath,
          options: { browser: true }
        }
      ]
    },
    {
      condition: { all: ["foreign", "node"] },
      loaders: [
        {
          loader: loaderPath,
          options: { browser: false }
        }
      ]
    }
  ];
  const existingRule = rules[TURBOPACK_RULE_MATCHER];
  if (!existingRule) {
    return {
      ...rules,
      // Turbopack exposes the active runtime through rule conditions, so keep
      // client, edge, and node transforms separate instead of inferring later.
      [TURBOPACK_RULE_MATCHER]: braintrustRules
    };
  }
  if (Array.isArray(existingRule)) {
    return {
      ...rules,
      [TURBOPACK_RULE_MATCHER]: [...existingRule, ...braintrustRules]
    };
  }
  if (typeof existingRule === "object" && existingRule !== null) {
    return {
      ...rules,
      [TURBOPACK_RULE_MATCHER]: [existingRule, ...braintrustRules]
    };
  }
  return rules;
}
function getWebpackLoaderPath() {
  try {
    return requireFromProject.resolve("braintrust/webpack-loader");
  } catch {
    return "braintrust/webpack-loader";
  }
}
function getNextMajorVersion() {
  try {
    const nextPackageJson = requireFromProject("next/package.json");
    if (typeof nextPackageJson.version !== "string") {
      return void 0;
    }
    const major = Number.parseInt(nextPackageJson.version.split(".")[0] ?? "");
    return Number.isFinite(major) ? major : void 0;
  } catch {
    return void 0;
  }
}
function isThenable(value) {
  return value !== null && value !== void 0 && (typeof value === "object" || typeof value === "function") && "then" in value && typeof value.then === "function";
}
export {
  wrapNextjsConfigWithBraintrust
};
