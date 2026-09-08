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

// src/auto-instrumentations/loader/get-package-version.ts
var get_package_version_exports = {};
__export(get_package_version_exports, {
  getPackageName: () => getPackageName,
  getPackageVersion: () => getPackageVersion
});
module.exports = __toCommonJS(get_package_version_exports);
var import_node_fs = require("fs");
var import_node_path = require("path");
var packageVersions = /* @__PURE__ */ new Map();
var packageNames = /* @__PURE__ */ new Map();
function readPackageJson(baseDir) {
  try {
    const packageJsonPath = (0, import_node_path.join)(baseDir, "package.json");
    const jsonFile = (0, import_node_fs.readFileSync)(packageJsonPath, "utf8");
    return JSON.parse(jsonFile);
  } catch {
    return void 0;
  }
}
function resolvePackageBaseDir(baseDir) {
  try {
    return (0, import_node_fs.realpathSync)(baseDir);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPackageName,
  getPackageVersion
});
