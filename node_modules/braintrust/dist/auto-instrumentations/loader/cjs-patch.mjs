import {
  applySpecialCasePatch,
  create
} from "../chunk-I55G56ZL.mjs";
import "../chunk-JPUFNW7X.mjs";
import {
  getPackageName,
  getPackageVersion
} from "../chunk-P5YLNB2A.mjs";

// src/auto-instrumentations/loader/cjs-patch.ts
import * as NodeModule from "module";
import { sep } from "path";
import moduleDetailsFromPath from "module-details-from-path";
var ModulePatch = class {
  packages;
  instrumentator;
  modulePrototype;
  originalCompile;
  constructor({
    instrumentations = []
  } = {}) {
    const modulePrototype = resolveModulePrototype();
    this.packages = new Set(instrumentations.map((i) => i.module.name));
    this.instrumentator = create(instrumentations);
    this.modulePrototype = modulePrototype;
    this.originalCompile = modulePrototype._compile;
  }
  /**
   * Patches the Node.js module class method that is responsible for compiling code.
   * If a module is found that has an instrumentator, it will transform the code before compiling it
   * with global hook calls.
   */
  patch() {
    const self = this;
    this.modulePrototype._compile = function wrappedCompile(...args) {
      const [content, filename] = args;
      const normalizedForPlatform = filename.split("/").join(sep);
      const resolvedModule = moduleDetailsFromPath(normalizedForPlatform);
      if (resolvedModule) {
        const packageName = getPackageName(resolvedModule.basedir) ?? resolvedModule.name;
        const normalizedModulePath = resolvedModule.path.replace(/\\/g, "/");
        const version = getPackageVersion(resolvedModule.basedir);
        const patched = applySpecialCasePatch({
          packageName,
          modulePath: normalizedModulePath,
          source: String(content),
          format: "cjs"
        });
        if (patched !== null) {
          args[0] = patched;
          return self.originalCompile.apply(this, args);
        }
        if (!self.packages.has(packageName)) {
          return self.originalCompile.apply(this, args);
        }
        const transformer = self.instrumentator.getTransformer(
          packageName,
          version,
          normalizedModulePath
        );
        if (transformer) {
          try {
            const transformedCode = transformer.transform(content, "unknown");
            args[0] = transformedCode?.code;
          } catch (error) {
            console.warn(`Error transforming module ${filename}:`, error);
          }
        }
      }
      return self.originalCompile.apply(this, args);
    };
  }
  /**
   * Restores the original Module.prototype._compile method
   * **Note**: This is intended to be used in testing only.
   */
  unpatch() {
    this.modulePrototype._compile = this.originalCompile;
  }
};
function resolveModulePrototype() {
  const moduleCtor = NodeModule.Module;
  if (moduleCtor && typeof moduleCtor === "function") {
    return moduleCtor.prototype;
  }
  return NodeModule.prototype;
}
export {
  ModulePatch
};
