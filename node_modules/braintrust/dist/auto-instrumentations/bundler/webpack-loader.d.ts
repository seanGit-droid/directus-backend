/**
 * The kind of function.
 */
type FunctionKind = "Sync" | "Async" | "Callback";
interface FunctionQueryBase {
    kind: FunctionKind;
    index?: number | null;
    callbackIndex?: number;
}
/**
 * Describes which function to instrument.
 */
type FunctionQuery = (FunctionQueryBase & {
    className: string;
    methodName: string;
    isExportAlias?: boolean;
}) | (FunctionQueryBase & {
    className: string;
    privateMethodName: string;
    isExportAlias?: boolean;
}) | (FunctionQueryBase & {
    methodName: string;
}) | (FunctionQueryBase & {
    functionName: string;
    isExportAlias?: boolean;
}) | (FunctionQueryBase & {
    objectName: string;
    propertyName: string;
}) | FunctionQueryBase;
/**
 * Configuration for injecting instrumentation code.
 */
interface InstrumentationConfig {
    /**
     * The name of the global instrumentation hook to invoke.
     */
    channelName: string;
    /**
     * The module matcher to identify the module and file to instrument.
     */
    module: ModuleMatcher;
    /**
     * The function query to identify the function to instrument.
     */
    functionQuery: FunctionQuery;
    /**
     * Optional raw esquery selector. When provided, this selector is used instead
     * of deriving one from functionQuery.
     */
    astQuery?: string;
}
/**
 * Describes the module and file path you would like to match.
 */
interface ModuleMatcher {
    /**
     * The name of the module you want to match.
     */
    name: string;
    /**
     * The semver range that you want to match.
     */
    versionRange: string;
    /**
     * The path of the file you want to match from the module root.
     */
    filePath: string;
}

interface BundlerPluginOptions {
    /**
     * Additional instrumentation configs to apply
     */
    instrumentations?: InstrumentationConfig[];
    /**
     * Whether the transformed source will run in a browser or edge-like
     * environment.
     *
     * Global instrumentation hooks are runtime-independent. This option only
     * prevents the Node-specific Mastra source patch from entering the bundle.
     *
     * @default false
     */
    browser?: boolean;
    /**
     * Marks transformed source as targeting a browser or edge-like environment.
     *
     * This retains the previous browser-target behavior of the option. Global
     * instrumentation hooks are runtime-independent, so no diagnostics-channel
     * compatibility shim is injected.
     *
     * @deprecated Use `browser` instead.
     */
    useDiagnosticChannelCompatShim?: boolean;
}

/**
 * Webpack loader for auto-instrumentation.
 *
 * This is a webpack loader (not a plugin) for compatibility with tools that only support loaders,
 * such as Next.js Turbopack.
 *
 * Usage in next.config.js / next.config.ts:
 * ```javascript
 * const nextConfig: NextConfig = {
 *   turbopack: {
 *     rules: {
 *       // Apply the loader to all JS/MJS/CJS files from node_modules.
 *       // condition: "foreign" restricts the rule to third-party packages only.
 *       "*.{js,mjs,cjs}": {
 *         condition: "foreign",
 *         loaders: [{ loader: require.resolve("braintrust/webpack-loader") }],
 *       },
 *     },
 *   },
 * };
 * ```
 */

/**
 * Webpack loader that instruments JavaScript code using code-transformer.
 *
 * Accepts the same options as the Braintrust bundler plugins.
 */
declare function codeTransformerLoader(this: any, code: string, inputSourceMap?: any): void;
declare namespace codeTransformerLoader {
    type Options = BundlerPluginOptions;
}

export { codeTransformerLoader as default };
