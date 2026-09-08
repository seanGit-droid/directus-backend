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

export {
  getPackageVersion,
  getPackageName
};
