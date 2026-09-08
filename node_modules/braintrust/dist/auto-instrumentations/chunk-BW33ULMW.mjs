import {
  unplugin
} from "./chunk-XEYKUBLY.mjs";

// src/auto-instrumentations/bundler/webpack.ts
function braintrustWebpackPlugin(options = {}) {
  return unplugin.webpack(options);
}
var webpackPlugin = unplugin.webpack;

export {
  braintrustWebpackPlugin,
  webpackPlugin
};
