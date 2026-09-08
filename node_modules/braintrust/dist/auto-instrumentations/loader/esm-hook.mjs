import {
  applySpecialCasePatch,
  create,
  getPackageName,
  getPackageVersion,
  isSpecialCaseTarget
} from "../chunk-2AMDGD65.mjs";

// src/auto-instrumentations/loader/esm-hook.mts
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { extname, sep } from "path";
import moduleDetailsFromPath from "module-details-from-path";
var instrumentator;
var packages;
var transformers = /* @__PURE__ */ new Map();
var specialCaseUrls = /* @__PURE__ */ new Map();
function getModuleType(url, format) {
  if (format === "module") {
    return "esm";
  }
  if (format === "commonjs") {
    return "cjs";
  }
  const pathname = url.startsWith("file:") ? fileURLToPath(url) : url;
  const ext = extname(pathname);
  if (ext === ".mjs") {
    return "esm";
  }
  if (ext === ".cjs") {
    return "cjs";
  }
  return "unknown";
}
async function initialize(data = {}) {
  const configs = data.instrumentations || [];
  instrumentator = create(configs);
  packages = new Set(configs.map((i) => i.module.name));
}
async function resolve(specifier, context, nextResolve) {
  const url = await nextResolve(specifier, context);
  const filePath = url.url.startsWith("file:") ? fileURLToPath(url.url) : url.url;
  const normalizedForPlatform = filePath.split("/").join(sep);
  const resolvedModule = moduleDetailsFromPath(normalizedForPlatform);
  if (resolvedModule) {
    const packageName = getPackageName(resolvedModule.basedir) ?? resolvedModule.name;
    const normalizedModulePath = resolvedModule.path.replace(/\\/g, "/");
    const version = getPackageVersion(resolvedModule.basedir);
    if (isSpecialCaseTarget(packageName, normalizedModulePath)) {
      specialCaseUrls.set(url.url, {
        packageName,
        modulePath: normalizedModulePath
      });
    }
    if (!packages?.has(packageName)) {
      return url;
    }
    const transformer = instrumentator.getTransformer(
      packageName,
      version,
      normalizedModulePath
    );
    if (transformer) {
      transformers.set(url.url, transformer);
    }
  }
  return url;
}
async function load(url, context, nextLoad) {
  const result = await nextLoad(url, context);
  const specialCase = specialCaseUrls.get(url);
  if (specialCase) {
    if (result.format === "commonjs") {
      const parsedUrl = new URL(result.responseURL ?? url);
      result.source ??= await readFile(parsedUrl);
    }
    if (result.source) {
      const patched = applySpecialCasePatch({
        packageName: specialCase.packageName,
        modulePath: specialCase.modulePath,
        source: result.source.toString("utf8"),
        format: result.format === "commonjs" ? "cjs" : "esm"
      });
      if (patched !== null) {
        result.source = patched;
        result.shortCircuit = true;
      }
    }
    return result;
  }
  if (!transformers.has(url)) {
    return result;
  }
  if (result.format === "commonjs") {
    const parsedUrl = new URL(result.responseURL ?? url);
    result.source ??= await readFile(parsedUrl);
  }
  const code = result.source;
  if (code) {
    const transformer = transformers.get(url);
    try {
      const moduleType = getModuleType(url, result.format);
      const transformedCode = transformer.transform(
        code.toString("utf8"),
        moduleType
      );
      result.source = transformedCode?.code;
      result.shortCircuit = true;
    } catch (err) {
      console.warn(`Error transforming module ${url}:`, err);
    }
  }
  return result;
}
export {
  initialize,
  load,
  resolve
};
