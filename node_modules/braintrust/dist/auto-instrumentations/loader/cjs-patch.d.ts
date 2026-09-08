import { I as InstrumentationConfig } from '../types-C1fVeiCp.js';

/**
 * CJS module patcher for auto-instrumentation.
 * Patches Module.prototype._compile to transform CommonJS modules at load time.
 */

declare class ModulePatch {
    private packages;
    private instrumentator;
    private modulePrototype;
    private originalCompile;
    constructor({ instrumentations, }?: {
        instrumentations?: InstrumentationConfig[];
    });
    /**
     * Patches the Node.js module class method that is responsible for compiling code.
     * If a module is found that has an instrumentator, it will transform the code before compiling it
     * with global hook calls.
     */
    patch(): void;
    /**
     * Restores the original Module.prototype._compile method
     * **Note**: This is intended to be used in testing only.
     */
    unpatch(): void;
}

export { ModulePatch };
