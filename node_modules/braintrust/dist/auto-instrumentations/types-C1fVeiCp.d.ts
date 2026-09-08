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

export type { InstrumentationConfig as I };
