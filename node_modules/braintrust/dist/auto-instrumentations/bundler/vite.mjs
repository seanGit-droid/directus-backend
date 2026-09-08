import {
  unplugin
} from "../chunk-XEYKUBLY.mjs";
import "../chunk-ZNHTSSGI.mjs";
import "../chunk-I55G56ZL.mjs";
import "../chunk-JPUFNW7X.mjs";
import "../chunk-P5YLNB2A.mjs";

// src/auto-instrumentations/bundler/vite.ts
function braintrustVitePlugin(options = {}) {
  const transformPlugin = unplugin.vite(options);
  const optimizeDepsPlugin = {
    name: "braintrust:optimize-deps",
    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [unplugin.esbuild(options)]
          }
        }
      };
    },
    configEnvironment(name) {
      if (name === "client") {
        return;
      }
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [unplugin.esbuild(options)]
          }
        }
      };
    }
  };
  return [
    optimizeDepsPlugin,
    ...Array.isArray(transformPlugin) ? transformPlugin : [transformPlugin]
  ];
}
var vitePlugin = unplugin.vite;
export {
  braintrustVitePlugin,
  vitePlugin
};
