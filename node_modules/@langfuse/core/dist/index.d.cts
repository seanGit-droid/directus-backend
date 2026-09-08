import { Context } from '@opentelemetry/api';

/**
 * Enumeration of log levels in order of severity (lowest to highest).
 */
declare enum LogLevel {
    /** Critical errors that may cause application failure */
    ERROR = 3,
    /** Warning messages for potentially harmful situations */
    WARN = 2,
    /** General informational messages */
    INFO = 1,
    /** Detailed debug information for troubleshooting */
    DEBUG = 0
}
/**
 * Configuration options for the Logger.
 */
interface LoggerConfig {
    /** The minimum log level to output */
    level: LogLevel;
    /** Optional prefix to prepend to all log messages */
    prefix?: string;
    /** Whether to include timestamps in log messages (default: true) */
    enableTimestamp?: boolean;
}
/**
 * A configurable logger class that supports different log levels and formatting.
 *
 * @example
 * ```typescript
 * const logger = new Logger({ level: LogLevel.DEBUG, prefix: 'Langfuse SDK' });
 * logger.info('Application started');
 * logger.error('An error occurred', error);
 * ```
 */
declare class Logger {
    private config;
    /**
     * Creates a new Logger instance.
     *
     * @param config - Configuration options for the logger
     */
    constructor(config?: LoggerConfig);
    /**
     * Determines if a message should be logged based on the current log level.
     *
     * @param level - The log level to check
     * @returns True if the message should be logged, false otherwise
     */
    private shouldLog;
    /**
     * Formats a log message with timestamp, prefix, and log level.
     *
     * @param level - The log level string
     * @param message - The message to format
     * @returns The formatted message string
     */
    private formatMessage;
    /**
     * Logs an error message.
     *
     * @param message - The error message to log
     * @param args - Additional arguments to pass to console.error
     */
    error(message: string, ...args: unknown[]): void;
    /**
     * Logs a warning message.
     *
     * @param message - The warning message to log
     * @param args - Additional arguments to pass to console.warn
     */
    warn(message: string, ...args: unknown[]): void;
    /**
     * Logs an informational message.
     *
     * @param message - The info message to log
     * @param args - Additional arguments to pass to console.info
     */
    info(message: string, ...args: unknown[]): void;
    /**
     * Logs a debug message.
     *
     * @param message - The debug message to log
     * @param args - Additional arguments to pass to console.debug
     */
    debug(message: string, ...args: unknown[]): void;
    /**
     * Sets the minimum log level.
     *
     * @param level - The new log level
     */
    setLevel(level: LogLevel): void;
    /**
     * Gets the current log level.
     *
     * @returns The current log level
     */
    getLevel(): LogLevel;
    /**
     * Checks if a given log level is enabled.
     * Use this to guard expensive operations (like JSON.stringify) before debug logging.
     *
     * @param level - The log level to check
     * @returns True if the level is enabled, false otherwise
     *
     * @example
     * ```typescript
     * if (logger.isLevelEnabled(LogLevel.DEBUG)) {
     *   logger.debug('Expensive data:', JSON.stringify(largeObject));
     * }
     * ```
     */
    isLevelEnabled(level: LogLevel): boolean;
}
/**
 * Singleton class that manages a global logger instance.
 */
declare class LoggerSingleton {
    private static instance;
    private static defaultConfig;
    /**
     * Gets the singleton logger instance, creating it if it doesn't exist.
     *
     * @returns The singleton logger instance
     */
    static getInstance(): Logger;
    /**
     * Configures the global logger with new settings.
     * This will replace the existing logger instance.
     *
     * @param config - The new logger configuration
     */
    static configure(config: LoggerConfig): void;
    /**
     * Resets the singleton logger instance and configuration.
     * Useful for testing or reinitializing the logger.
     */
    static reset(): void;
}
/**
 * Creates a new Logger instance with the specified configuration.
 * This is independent of the global singleton logger.
 *
 * @param config - Optional configuration for the logger
 * @returns A new Logger instance
 *
 * @example
 * ```typescript
 * const customLogger = createLogger({ level: LogLevel.DEBUG, prefix: 'Custom' });
 * customLogger.debug('This is a debug message');
 * ```
 */
declare const createLogger: (config?: LoggerConfig) => Logger;
/**
 * Gets the global singleton logger instance.
 * If no logger exists, creates one with default configuration.
 *
 * @returns The global logger instance
 *
 * @example
 * ```typescript
 * const logger = getGlobalLogger();
 * logger.info('Application started');
 * ```
 */
declare const getGlobalLogger: () => Logger;
/**
 * Configures the global logger with new settings.
 * This should be called early in your application initialization.
 *
 * @param config - The logger configuration
 *
 * @example
 * ```typescript
 * configureGlobalLogger({
 *   level: LogLevel.DEBUG,
 *   prefix: 'Langfuse SDK',
 *   enableTimestamp: true
 * });
 * ```
 */
declare const configureGlobalLogger: (config: LoggerConfig) => void;
/**
 * Resets the global logger instance and configuration.
 * Primarily used for testing to ensure clean state between tests.
 *
 * @example
 * ```typescript
 * // In test teardown
 * resetGlobalLogger();
 * ```
 */
declare const resetGlobalLogger: () => void;

declare const LANGFUSE_TRACER_NAME = "langfuse-sdk";
declare const LANGFUSE_SDK_VERSION: string;
declare const LANGFUSE_SDK_NAME = "javascript";
declare const LANGFUSE_SDK_EXPERIMENT_ENVIRONMENT = "sdk-experiment";
declare enum LangfuseOtelSpanAttributes {
    TRACE_NAME = "langfuse.trace.name",
    TRACE_USER_ID = "user.id",
    TRACE_SESSION_ID = "session.id",
    TRACE_TAGS = "langfuse.trace.tags",
    TRACE_PUBLIC = "langfuse.trace.public",
    TRACE_METADATA = "langfuse.trace.metadata",
    TRACE_INPUT = "langfuse.trace.input",
    TRACE_OUTPUT = "langfuse.trace.output",
    OBSERVATION_TYPE = "langfuse.observation.type",
    OBSERVATION_METADATA = "langfuse.observation.metadata",
    OBSERVATION_LEVEL = "langfuse.observation.level",
    OBSERVATION_STATUS_MESSAGE = "langfuse.observation.status_message",
    OBSERVATION_INPUT = "langfuse.observation.input",
    OBSERVATION_OUTPUT = "langfuse.observation.output",
    OBSERVATION_COMPLETION_START_TIME = "langfuse.observation.completion_start_time",
    OBSERVATION_MODEL = "langfuse.observation.model.name",
    OBSERVATION_MODEL_PARAMETERS = "langfuse.observation.model.parameters",
    OBSERVATION_USAGE_DETAILS = "langfuse.observation.usage_details",
    OBSERVATION_COST_DETAILS = "langfuse.observation.cost_details",
    OBSERVATION_PROMPT_NAME = "langfuse.observation.prompt.name",
    OBSERVATION_PROMPT_VERSION = "langfuse.observation.prompt.version",
    ENVIRONMENT = "langfuse.environment",
    RELEASE = "langfuse.release",
    VERSION = "langfuse.version",
    AS_ROOT = "langfuse.internal.as_root",
    EXPERIMENT_ID = "langfuse.experiment.id",
    EXPERIMENT_NAME = "langfuse.experiment.name",
    EXPERIMENT_DESCRIPTION = "langfuse.experiment.description",
    EXPERIMENT_METADATA = "langfuse.experiment.metadata",
    EXPERIMENT_DATASET_ID = "langfuse.experiment.dataset.id",
    EXPERIMENT_ITEM_ID = "langfuse.experiment.item.id",
    EXPERIMENT_ITEM_EXPECTED_OUTPUT = "langfuse.experiment.item.expected_output",
    EXPERIMENT_ITEM_METADATA = "langfuse.experiment.item.metadata",
    EXPERIMENT_ITEM_ROOT_OBSERVATION_ID = "langfuse.experiment.item.root_observation_id",
    TRACE_COMPAT_USER_ID = "langfuse.user.id",
    TRACE_COMPAT_SESSION_ID = "langfuse.session.id"
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type AnnotationQueueStatus = "PENDING" | "COMPLETED";
declare const AnnotationQueueStatus: {
    readonly Pending: "PENDING";
    readonly Completed: "COMPLETED";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type AnnotationQueueObjectType = "TRACE" | "OBSERVATION" | "SESSION";
declare const AnnotationQueueObjectType: {
    readonly Trace: "TRACE";
    readonly Observation: "OBSERVATION";
    readonly Session: "SESSION";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface AnnotationQueue {
    id: string;
    name: string;
    description?: string;
    scoreConfigIds: string[];
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface AnnotationQueueItem {
    id: string;
    queueId: string;
    objectId: string;
    objectType: AnnotationQueueObjectType;
    status: AnnotationQueueStatus;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedAnnotationQueues {
    data: AnnotationQueue[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedAnnotationQueueItems {
    data: AnnotationQueueItem[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateAnnotationQueueRequest {
    name: string;
    description?: string;
    scoreConfigIds: string[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateAnnotationQueueItemRequest {
    objectId: string;
    objectType: AnnotationQueueObjectType;
    /** Defaults to PENDING for new queue items */
    status?: AnnotationQueueStatus;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateAnnotationQueueItemRequest {
    status?: AnnotationQueueStatus;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DeleteAnnotationQueueItemResponse {
    success: boolean;
    message: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface AnnotationQueueAssignmentRequest {
    userId: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DeleteAnnotationQueueAssignmentResponse {
    success: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateAnnotationQueueAssignmentResponse {
    userId: string;
    queueId: string;
    projectId: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetAnnotationQueuesRequest {
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {}
 */
interface GetAnnotationQueueItemsRequest {
    /** Filter by status */
    status?: AnnotationQueueStatus;
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

type index$s_AnnotationQueue = AnnotationQueue;
type index$s_AnnotationQueueAssignmentRequest = AnnotationQueueAssignmentRequest;
type index$s_AnnotationQueueItem = AnnotationQueueItem;
declare const index$s_AnnotationQueueObjectType: typeof AnnotationQueueObjectType;
declare const index$s_AnnotationQueueStatus: typeof AnnotationQueueStatus;
type index$s_CreateAnnotationQueueAssignmentResponse = CreateAnnotationQueueAssignmentResponse;
type index$s_CreateAnnotationQueueItemRequest = CreateAnnotationQueueItemRequest;
type index$s_CreateAnnotationQueueRequest = CreateAnnotationQueueRequest;
type index$s_DeleteAnnotationQueueAssignmentResponse = DeleteAnnotationQueueAssignmentResponse;
type index$s_DeleteAnnotationQueueItemResponse = DeleteAnnotationQueueItemResponse;
type index$s_GetAnnotationQueueItemsRequest = GetAnnotationQueueItemsRequest;
type index$s_GetAnnotationQueuesRequest = GetAnnotationQueuesRequest;
type index$s_PaginatedAnnotationQueueItems = PaginatedAnnotationQueueItems;
type index$s_PaginatedAnnotationQueues = PaginatedAnnotationQueues;
type index$s_UpdateAnnotationQueueItemRequest = UpdateAnnotationQueueItemRequest;
declare namespace index$s {
  export { type index$s_AnnotationQueue as AnnotationQueue, type index$s_AnnotationQueueAssignmentRequest as AnnotationQueueAssignmentRequest, type index$s_AnnotationQueueItem as AnnotationQueueItem, index$s_AnnotationQueueObjectType as AnnotationQueueObjectType, index$s_AnnotationQueueStatus as AnnotationQueueStatus, type index$s_CreateAnnotationQueueAssignmentResponse as CreateAnnotationQueueAssignmentResponse, type index$s_CreateAnnotationQueueItemRequest as CreateAnnotationQueueItemRequest, type index$s_CreateAnnotationQueueRequest as CreateAnnotationQueueRequest, type index$s_DeleteAnnotationQueueAssignmentResponse as DeleteAnnotationQueueAssignmentResponse, type index$s_DeleteAnnotationQueueItemResponse as DeleteAnnotationQueueItemResponse, type index$s_GetAnnotationQueueItemsRequest as GetAnnotationQueueItemsRequest, type index$s_GetAnnotationQueuesRequest as GetAnnotationQueuesRequest, type index$s_PaginatedAnnotationQueueItems as PaginatedAnnotationQueueItems, type index$s_PaginatedAnnotationQueues as PaginatedAnnotationQueues, type index$s_UpdateAnnotationQueueItemRequest as UpdateAnnotationQueueItemRequest };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type BlobStorageIntegrationType = "S3" | "S3_COMPATIBLE" | "AZURE_BLOB_STORAGE";
declare const BlobStorageIntegrationType: {
    readonly S3: "S3";
    readonly S3Compatible: "S3_COMPATIBLE";
    readonly AzureBlobStorage: "AZURE_BLOB_STORAGE";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type BlobStorageIntegrationFileType = "JSON" | "CSV" | "JSONL";
declare const BlobStorageIntegrationFileType: {
    readonly Json: "JSON";
    readonly Csv: "CSV";
    readonly Jsonl: "JSONL";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type BlobStorageExportMode = "FULL_HISTORY" | "FROM_TODAY" | "FROM_CUSTOM_DATE";
declare const BlobStorageExportMode: {
    readonly FullHistory: "FULL_HISTORY";
    readonly FromToday: "FROM_TODAY";
    readonly FromCustomDate: "FROM_CUSTOM_DATE";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type BlobStorageExportFrequency = "hourly" | "daily" | "weekly";
declare const BlobStorageExportFrequency: {
    readonly Hourly: "hourly";
    readonly Daily: "daily";
    readonly Weekly: "weekly";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateBlobStorageIntegrationRequest {
    /** ID of the project in which to configure the blob storage integration */
    projectId: string;
    type: BlobStorageIntegrationType;
    /** Name of the storage bucket */
    bucketName: string;
    /** Custom endpoint URL (required for S3_COMPATIBLE type) */
    endpoint?: string;
    /** Storage region */
    region: string;
    /** Access key ID for authentication */
    accessKeyId?: string;
    /** Secret access key for authentication (will be encrypted when stored) */
    secretAccessKey?: string;
    /** Path prefix for exported files (must end with forward slash if provided) */
    prefix?: string;
    exportFrequency: BlobStorageExportFrequency;
    /** Whether the integration is active */
    enabled: boolean;
    /** Use path-style URLs for S3 requests */
    forcePathStyle: boolean;
    fileType: BlobStorageIntegrationFileType;
    exportMode: BlobStorageExportMode;
    /** Custom start date for exports (required when exportMode is FROM_CUSTOM_DATE) */
    exportStartDate?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface BlobStorageIntegrationResponse {
    id: string;
    projectId: string;
    type: BlobStorageIntegrationType;
    bucketName: string;
    endpoint?: string;
    region: string;
    accessKeyId?: string;
    prefix: string;
    exportFrequency: BlobStorageExportFrequency;
    enabled: boolean;
    forcePathStyle: boolean;
    fileType: BlobStorageIntegrationFileType;
    exportMode: BlobStorageExportMode;
    exportStartDate?: string;
    nextSyncAt?: string;
    lastSyncAt?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface BlobStorageIntegrationsResponse {
    data: BlobStorageIntegrationResponse[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface BlobStorageIntegrationDeletionResponse {
    message: string;
}

declare const index$r_BlobStorageExportFrequency: typeof BlobStorageExportFrequency;
declare const index$r_BlobStorageExportMode: typeof BlobStorageExportMode;
type index$r_BlobStorageIntegrationDeletionResponse = BlobStorageIntegrationDeletionResponse;
declare const index$r_BlobStorageIntegrationFileType: typeof BlobStorageIntegrationFileType;
type index$r_BlobStorageIntegrationResponse = BlobStorageIntegrationResponse;
declare const index$r_BlobStorageIntegrationType: typeof BlobStorageIntegrationType;
type index$r_BlobStorageIntegrationsResponse = BlobStorageIntegrationsResponse;
type index$r_CreateBlobStorageIntegrationRequest = CreateBlobStorageIntegrationRequest;
declare namespace index$r {
  export { index$r_BlobStorageExportFrequency as BlobStorageExportFrequency, index$r_BlobStorageExportMode as BlobStorageExportMode, type index$r_BlobStorageIntegrationDeletionResponse as BlobStorageIntegrationDeletionResponse, index$r_BlobStorageIntegrationFileType as BlobStorageIntegrationFileType, type index$r_BlobStorageIntegrationResponse as BlobStorageIntegrationResponse, index$r_BlobStorageIntegrationType as BlobStorageIntegrationType, type index$r_BlobStorageIntegrationsResponse as BlobStorageIntegrationsResponse, type index$r_CreateBlobStorageIntegrationRequest as CreateBlobStorageIntegrationRequest };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateCommentRequest {
    /** The id of the project to attach the comment to. */
    projectId: string;
    /** The type of the object to attach the comment to (trace, observation, session, prompt). */
    objectType: string;
    /** The id of the object to attach the comment to. If this does not reference a valid existing object, an error will be thrown. */
    objectId: string;
    /** The content of the comment. May include markdown. Currently limited to 5000 characters. */
    content: string;
    /** The id of the user who created the comment. */
    authorUserId?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateCommentResponse {
    /** The id of the created object in Langfuse */
    id: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetCommentsResponse {
    data: Comment[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetCommentsRequest {
    /** Page number, starts at 1. */
    page?: number;
    /** Limit of items per page. If you encounter api issues due to too large page sizes, try to reduce the limit */
    limit?: number;
    /** Filter comments by object type (trace, observation, session, prompt). */
    objectType?: string;
    /** Filter comments by object id. If objectType is not provided, an error will be thrown. */
    objectId?: string;
    /** Filter comments by author user id. */
    authorUserId?: string;
}

type index$q_CreateCommentRequest = CreateCommentRequest;
type index$q_CreateCommentResponse = CreateCommentResponse;
type index$q_GetCommentsRequest = GetCommentsRequest;
type index$q_GetCommentsResponse = GetCommentsResponse;
declare namespace index$q {
  export type { index$q_CreateCommentRequest as CreateCommentRequest, index$q_CreateCommentResponse as CreateCommentResponse, index$q_GetCommentsRequest as GetCommentsRequest, index$q_GetCommentsResponse as GetCommentsResponse };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface Trace$1 {
    /** The unique identifier of a trace */
    id: string;
    /** The timestamp when the trace was created */
    timestamp: string;
    /** The name of the trace */
    name: string | null;
    /** The input data of the trace. Can be any JSON. */
    input?: unknown;
    /** The output data of the trace. Can be any JSON. */
    output?: unknown;
    /** The session identifier associated with the trace */
    sessionId: string | null;
    /** The release version of the application when the trace was created */
    release: string | null;
    /** The version of the trace */
    version: string | null;
    /** The user identifier associated with the trace */
    userId: string | null;
    /** The metadata associated with the trace. Can be any JSON. */
    metadata?: unknown;
    /** The tags associated with the trace. */
    tags: string[];
    /** Public traces are accessible via url without login */
    public: boolean;
    /** The environment from which this trace originated. Can be any lowercase alphanumeric string with hyphens and underscores that does not start with 'langfuse'. */
    environment: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface TraceWithDetails extends Trace$1 {
    /** Path of trace in Langfuse UI */
    htmlPath: string;
    /** Latency of trace in seconds */
    latency?: number | null;
    /** Cost of trace in USD */
    totalCost?: number | null;
    /** List of observation ids */
    observations?: string[] | null;
    /** List of score ids */
    scores?: string[] | null;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface TraceWithFullDetails extends Trace$1 {
    /** Path of trace in Langfuse UI */
    htmlPath: string;
    /** Latency of trace in seconds */
    latency?: number | null;
    /** Cost of trace in USD */
    totalCost?: number | null;
    /** List of observations */
    observations: ObservationsView[];
    /** List of scores */
    scores: ScoreV1[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface Session {
    id: string;
    createdAt: string;
    projectId: string;
    /** The environment from which this session originated. */
    environment: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface SessionWithTraces extends Session {
    traces: Trace$1[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface Observation {
    /** The unique identifier of the observation */
    id: string;
    /** The trace ID associated with the observation */
    traceId: string | null;
    /** The type of the observation */
    type: string;
    /** The name of the observation */
    name: string | null;
    /** The start time of the observation */
    startTime: string;
    /** The end time of the observation. */
    endTime: string | null;
    /** The completion start time of the observation */
    completionStartTime: string | null;
    /** The model used for the observation */
    model: string | null;
    /** The parameters of the model used for the observation */
    modelParameters?: unknown;
    /** The input data of the observation */
    input?: unknown;
    /** The version of the observation */
    version: string | null;
    /** Additional metadata of the observation */
    metadata?: unknown;
    /** The output data of the observation */
    output?: unknown;
    /** (Deprecated. Use usageDetails and costDetails instead.) The usage data of the observation */
    usage: Usage;
    /** The level of the observation */
    level: ObservationLevel;
    /** The status message of the observation */
    statusMessage: string | null;
    /** The parent observation ID */
    parentObservationId: string | null;
    /** The prompt ID associated with the observation */
    promptId: string | null;
    /** The usage details of the observation. Key is the name of the usage metric, value is the number of units consumed. The total key is the sum of all (non-total) usage metrics or the total value ingested. */
    usageDetails: Record<string, number>;
    /** The cost details of the observation. Key is the name of the cost metric, value is the cost in USD. The total key is the sum of all (non-total) cost metrics or the total value ingested. */
    costDetails: Record<string, number>;
    /** The environment from which this observation originated. Can be any lowercase alphanumeric string with hyphens and underscores that does not start with 'langfuse'. */
    environment: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ObservationsView extends Observation {
    /** The name of the prompt associated with the observation */
    promptName: string | null;
    /** The version of the prompt associated with the observation */
    promptVersion: number | null;
    /** The unique identifier of the model */
    modelId: string | null;
    /** The price of the input in USD */
    inputPrice: number | null;
    /** The price of the output in USD. */
    outputPrice: number | null;
    /** The total price in USD. */
    totalPrice: number | null;
    /** (Deprecated. Use usageDetails and costDetails instead.) The calculated cost of the input in USD */
    calculatedInputCost: number | null;
    /** (Deprecated. Use usageDetails and costDetails instead.) The calculated cost of the output in USD */
    calculatedOutputCost: number | null;
    /** (Deprecated. Use usageDetails and costDetails instead.) The calculated total cost in USD */
    calculatedTotalCost: number | null;
    /** The latency in seconds. */
    latency: number | null;
    /** The time to the first token in seconds */
    timeToFirstToken: number | null;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * (Deprecated. Use usageDetails and costDetails instead.) Standard interface for usage and cost
 */
interface Usage {
    /** Number of input units (e.g. tokens) */
    input: number;
    /** Number of output units (e.g. tokens) */
    output: number;
    /** Defaults to input+output if not set */
    total: number;
    /** Unit of measurement */
    unit: string | null;
    /** USD input cost */
    inputCost?: number;
    /** USD output cost */
    outputCost?: number;
    /** USD total cost, defaults to input+output */
    totalCost?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Configuration for a score
 */
interface ScoreConfig {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    projectId: string;
    dataType: ScoreConfigDataType;
    /** Whether the score config is archived. Defaults to false */
    isArchived: boolean;
    /** Sets minimum value for numerical scores. If not set, the minimum value defaults to -∞ */
    minValue?: number | null;
    /** Sets maximum value for numerical scores. If not set, the maximum value defaults to +∞ */
    maxValue?: number | null;
    /** Configures custom categories for categorical scores */
    categories?: ConfigCategory[];
    /** Description of the score config */
    description?: string | null;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ConfigCategory {
    value: number;
    label: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface BaseScoreV1 {
    id: string;
    traceId: string;
    name: string;
    source: ScoreSource;
    /** The observation ID associated with the score */
    observationId?: string | null;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    /** The user ID of the author */
    authorUserId: string | null;
    /** Comment on the score */
    comment: string | null;
    /** Metadata associated with the score */
    metadata?: unknown;
    /** Reference a score config on a score. When set, config and score name must be equal and value must comply to optionally defined numerical range */
    configId: string | null;
    /** The annotation queue referenced by the score. Indicates if score was initially created while processing annotation queue. */
    queueId: string | null;
    /** The environment from which this score originated. Can be any lowercase alphanumeric string with hyphens and underscores that does not start with 'langfuse'. */
    environment: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface NumericScoreV1 extends BaseScoreV1 {
    /** The numeric value of the score */
    value: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface BooleanScoreV1 extends BaseScoreV1 {
    /** The numeric value of the score. Equals 1 for "True" and 0 for "False" */
    value: number;
    /** The string representation of the score value. Is inferred from the numeric value and equals "True" or "False" */
    stringValue: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CategoricalScoreV1 extends BaseScoreV1 {
    /** Represents the numeric category mapping of the stringValue. If no config is linked, defaults to 0. */
    value: number;
    /** The string representation of the score value. If no config is linked, can be any string. Otherwise, must map to a config category */
    stringValue: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type ScoreV1 = 
/**
 * Score with NUMERIC data type */
ScoreV1.Numeric
/**
 * Score with CATEGORICAL data type */
 | ScoreV1.Categorical
/**
 * Score with BOOLEAN data type */
 | ScoreV1.Boolean;
declare namespace ScoreV1 {
    interface Numeric extends NumericScoreV1 {
        dataType: "NUMERIC";
    }
    interface Categorical extends CategoricalScoreV1 {
        dataType: "CATEGORICAL";
    }
    interface Boolean extends BooleanScoreV1 {
        dataType: "BOOLEAN";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface BaseScore {
    id: string;
    /** The trace ID associated with the score */
    traceId?: string | null;
    /** The session ID associated with the score */
    sessionId?: string | null;
    /** The observation ID associated with the score */
    observationId?: string | null;
    /** The dataset run ID associated with the score */
    datasetRunId?: string | null;
    name: string;
    source: ScoreSource;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    /** The user ID of the author */
    authorUserId: string | null;
    /** Comment on the score */
    comment: string | null;
    /** Metadata associated with the score */
    metadata?: unknown;
    /** Reference a score config on a score. When set, config and score name must be equal and value must comply to optionally defined numerical range */
    configId: string | null;
    /** The annotation queue referenced by the score. Indicates if score was initially created while processing annotation queue. */
    queueId: string | null;
    /** The environment from which this score originated. Can be any lowercase alphanumeric string with hyphens and underscores that does not start with 'langfuse'. */
    environment: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface NumericScore extends BaseScore {
    /** The numeric value of the score */
    value: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface BooleanScore extends BaseScore {
    /** The numeric value of the score. Equals 1 for "True" and 0 for "False" */
    value: number;
    /** The string representation of the score value. Is inferred from the numeric value and equals "True" or "False" */
    stringValue: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CategoricalScore extends BaseScore {
    /** Represents the numeric category mapping of the stringValue. If no config is linked, defaults to 0. */
    value: number;
    /** The string representation of the score value. If no config is linked, can be any string. Otherwise, must map to a config category */
    stringValue: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CorrectionScore extends BaseScore {
    /** The numeric value of the score. Always 0 for correction scores. */
    value: number;
    /** The string representation of the correction content */
    stringValue: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type Score$1 = 
/**
 * Score with NUMERIC data type */
Score$1.Numeric
/**
 * Score with CATEGORICAL data type */
 | Score$1.Categorical
/**
 * Score with BOOLEAN data type */
 | Score$1.Boolean
/**
 * Score with CORRECTION data type */
 | Score$1.Correction;
declare namespace Score$1 {
    interface Numeric extends NumericScore {
        dataType: "NUMERIC";
    }
    interface Categorical extends CategoricalScore {
        dataType: "CATEGORICAL";
    }
    interface Boolean extends BooleanScore {
        dataType: "BOOLEAN";
    }
    interface Correction extends CorrectionScore {
        dataType: "CORRECTION";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * The value of the score. Must be passed as string for categorical scores, and numeric for boolean and numeric scores
 */
type CreateScoreValue = number | string;

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface Comment {
    id: string;
    projectId: string;
    createdAt: string;
    updatedAt: string;
    objectType: CommentObjectType;
    objectId: string;
    content: string;
    /** The user ID of the comment author */
    authorUserId?: string | null;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface Dataset {
    id: string;
    name: string;
    /** Description of the dataset */
    description: string | null;
    /** Metadata associated with the dataset */
    metadata?: unknown;
    /** JSON Schema for validating dataset item inputs */
    inputSchema: unknown | null;
    /** JSON Schema for validating dataset item expected outputs */
    expectedOutputSchema: unknown | null;
    projectId: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface DatasetItem {
    id: string;
    status: DatasetStatus;
    /** Input data for the dataset item */
    input?: unknown;
    /** Expected output for the dataset item */
    expectedOutput?: unknown;
    /** Metadata associated with the dataset item */
    metadata?: unknown;
    /** The trace ID that sourced this dataset item */
    sourceTraceId: string | null;
    /** The observation ID that sourced this dataset item */
    sourceObservationId: string | null;
    datasetId: string;
    datasetName: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DatasetRunItem {
    id: string;
    datasetRunId: string;
    datasetRunName: string;
    datasetItemId: string;
    traceId: string;
    /** The observation ID associated with this run item */
    observationId: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DatasetRun {
    /** Unique identifier of the dataset run */
    id: string;
    /** Name of the dataset run */
    name: string;
    /** Description of the run */
    description: string | null;
    /** Metadata of the dataset run */
    metadata?: unknown;
    /** Id of the associated dataset */
    datasetId: string;
    /** Name of the associated dataset */
    datasetName: string;
    /** The date and time when the dataset run was created */
    createdAt: string;
    /** The date and time when the dataset run was last updated */
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface DatasetRunWithItems extends DatasetRun {
    datasetRunItems: DatasetRunItem[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Model definition used for transforming usage into USD cost and/or tokenization.
 *
 * Models can have either simple flat pricing or tiered pricing:
 * - Flat pricing: Single price per usage type (legacy, but still supported)
 * - Tiered pricing: Multiple pricing tiers with conditional matching based on usage patterns
 *
 * The pricing tiers approach is recommended for models with usage-based pricing variations.
 * When using tiered pricing, the flat price fields (inputPrice, outputPrice, prices) are populated
 * from the default tier for backward compatibility.
 */
interface Model {
    id: string;
    /** Name of the model definition. If multiple with the same name exist, they are applied in the following order: (1) custom over built-in, (2) newest according to startTime where model.startTime<observation.startTime */
    modelName: string;
    /** Regex pattern which matches this model definition to generation.model. Useful in case of fine-tuned models. If you want to exact match, use `(?i)^modelname$` */
    matchPattern: string;
    /** Apply only to generations which are newer than this ISO date. */
    startDate: string | null;
    /** Unit used by this model. */
    unit?: ModelUsageUnit | null;
    /** Deprecated. See 'prices' instead. Price (USD) per input unit */
    inputPrice: number | null;
    /** Deprecated. See 'prices' instead. Price (USD) per output unit */
    outputPrice: number | null;
    /** Deprecated. See 'prices' instead. Price (USD) per total unit. Cannot be set if input or output price is set. */
    totalPrice: number | null;
    /** Optional. Tokenizer to be applied to observations which match to this model. See docs for more details. */
    tokenizerId: string | null;
    /** Optional. Configuration for the selected tokenizer. Needs to be JSON. See docs for more details. */
    tokenizerConfig?: unknown;
    isLangfuseManaged: boolean;
    /** Timestamp when the model was created */
    createdAt: string;
    /**
     * Deprecated. Use 'pricingTiers' instead for models with usage-based pricing variations.
     *
     * This field shows prices by usage type from the default pricing tier. Maintained for backward compatibility.
     * If the model uses tiered pricing, this field will be populated from the default tier's prices.
     */
    prices: Record<string, ModelPrice>;
    /**
     * Array of pricing tiers with conditional pricing based on usage thresholds.
     *
     * Pricing tiers enable accurate cost tracking for models that charge different rates based on usage patterns
     * (e.g., different rates for high-volume usage, large context windows, or cached tokens).
     *
     * Each model must have exactly one default tier (isDefault=true, priority=0) that serves as a fallback.
     * Additional conditional tiers can be defined with specific matching criteria.
     *
     * If this array is empty, the model uses legacy flat pricing from the inputPrice/outputPrice/totalPrice fields.
     */
    pricingTiers: PricingTier[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ModelPrice {
    price: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Condition for matching a pricing tier based on usage details. Used to implement tiered pricing models where costs vary based on usage thresholds.
 *
 * How it works:
 * 1. The regex pattern matches against usage detail keys (e.g., "input_tokens", "input_cached")
 * 2. Values of all matching keys are summed together
 * 3. The sum is compared against the threshold value using the specified operator
 * 4. All conditions in a tier must be met (AND logic) for the tier to match
 *
 * Common use cases:
 * - Threshold-based pricing: Match when accumulated usage exceeds a certain amount
 * - Usage-type-specific pricing: Different rates for cached vs non-cached tokens, or input vs output
 * - Volume-based pricing: Different rates based on total request or token count
 */
interface PricingTierCondition {
    /**
     * Regex pattern to match against usage detail keys. All matching keys' values are summed for threshold comparison.
     *
     * Examples:
     * - "^input" matches "input", "input_tokens", "input_cached", etc.
     * - "^(input|prompt)" matches both "input_tokens" and "prompt_tokens"
     * - "_cache$" matches "input_cache", "output_cache", etc.
     *
     * The pattern is case-insensitive by default. If no keys match, the sum is treated as zero.
     */
    usageDetailPattern: string;
    /**
     * Comparison operator to apply between the summed value and the threshold.
     *
     * - gt: greater than (sum > threshold)
     * - gte: greater than or equal (sum >= threshold)
     * - lt: less than (sum < threshold)
     * - lte: less than or equal (sum <= threshold)
     * - eq: equal (sum == threshold)
     * - neq: not equal (sum != threshold)
     */
    operator: PricingTierOperator;
    /** Threshold value for comparison. For token-based pricing, this is typically the token count threshold (e.g., 200000 for a 200K token threshold). */
    value: number;
    /** Whether the regex pattern matching is case-sensitive. Default is false (case-insensitive matching). */
    caseSensitive: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Pricing tier definition with conditional pricing based on usage thresholds.
 *
 * Pricing tiers enable accurate cost tracking for LLM providers that charge different rates based on usage patterns.
 * For example, some providers charge higher rates when context size exceeds certain thresholds.
 *
 * How tier matching works:
 * 1. Tiers are evaluated in ascending priority order (priority 1 before priority 2, etc.)
 * 2. The first tier where ALL conditions match is selected
 * 3. If no conditional tiers match, the default tier is used as a fallback
 * 4. The default tier has priority 0 and no conditions
 *
 * Why priorities matter:
 * - Lower priority numbers are evaluated first, allowing you to define specific cases before general ones
 * - Example: Priority 1 for "high usage" (>200K tokens), Priority 2 for "medium usage" (>100K tokens), Priority 0 for default
 * - Without proper ordering, a less specific condition might match before a more specific one
 *
 * Every model must have exactly one default tier to ensure cost calculation always succeeds.
 */
interface PricingTier {
    /** Unique identifier for the pricing tier */
    id: string;
    /**
     * Name of the pricing tier for display and identification purposes.
     *
     * Examples: "Standard", "High Volume Tier", "Large Context", "Extended Context Tier"
     */
    name: string;
    /**
     * Whether this is the default tier. Every model must have exactly one default tier with priority 0 and no conditions.
     *
     * The default tier serves as a fallback when no conditional tiers match, ensuring cost calculation always succeeds.
     * It typically represents the base pricing for standard usage patterns.
     */
    isDefault: boolean;
    /**
     * Priority for tier matching evaluation. Lower numbers = higher priority (evaluated first).
     *
     * The default tier must always have priority 0. Conditional tiers should have priority 1, 2, 3, etc.
     *
     * Example ordering:
     * - Priority 0: Default tier (no conditions, always matches as fallback)
     * - Priority 1: High usage tier (e.g., >200K tokens)
     * - Priority 2: Medium usage tier (e.g., >100K tokens)
     *
     * This ensures more specific conditions are checked before general ones.
     */
    priority: number;
    /**
     * Array of conditions that must ALL be met for this tier to match (AND logic).
     *
     * The default tier must have an empty conditions array. Conditional tiers should have one or more conditions
     * that define when this tier's pricing applies.
     *
     * Multiple conditions enable complex matching scenarios (e.g., "high input tokens AND low output tokens").
     */
    conditions: PricingTierCondition[];
    /**
     * Prices (USD) by usage type for this tier.
     *
     * Common usage types: "input", "output", "total", "request", "image"
     * Prices are specified in USD per unit (e.g., per token, per request, per second).
     *
     * Example: {"input": 0.000003, "output": 0.000015} means $3 per million input tokens and $15 per million output tokens.
     */
    prices: Record<string, number>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Input schema for creating a pricing tier. The tier ID will be automatically generated server-side.
 *
 * When creating a model with pricing tiers:
 * - Exactly one tier must have isDefault=true (the fallback tier)
 * - The default tier must have priority=0 and conditions=[]
 * - All tier names and priorities must be unique within the model
 * - Each tier must define at least one price
 *
 * See PricingTier for detailed information about how tiers work and why they're useful.
 */
interface PricingTierInput {
    /**
     * Name of the pricing tier for display and identification purposes.
     *
     * Must be unique within the model. Common patterns: "Standard", "High Volume Tier", "Extended Context"
     */
    name: string;
    /**
     * Whether this is the default tier. Exactly one tier per model must be marked as default.
     *
     * Requirements for default tier:
     * - Must have isDefault=true
     * - Must have priority=0
     * - Must have empty conditions array (conditions=[])
     *
     * The default tier acts as a fallback when no conditional tiers match.
     */
    isDefault: boolean;
    /**
     * Priority for tier matching evaluation. Lower numbers = higher priority (evaluated first).
     *
     * Must be unique within the model. The default tier must have priority=0.
     * Conditional tiers should use priority 1, 2, 3, etc. based on their specificity.
     */
    priority: number;
    /**
     * Array of conditions that must ALL be met for this tier to match (AND logic).
     *
     * The default tier must have an empty array (conditions=[]).
     * Conditional tiers should define one or more conditions that specify when this tier's pricing applies.
     *
     * Each condition specifies a regex pattern, operator, and threshold value for matching against usage details.
     */
    conditions: PricingTierCondition[];
    /**
     * Prices (USD) by usage type for this tier. At least one price must be defined.
     *
     * Common usage types: "input", "output", "total", "request", "image"
     * Prices are in USD per unit (e.g., per token).
     *
     * Example: {"input": 0.000003, "output": 0.000015} represents $3 per million input tokens and $15 per million output tokens.
     */
    prices: Record<string, number>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Comparison operators for pricing tier conditions
 */
type PricingTierOperator = "gt" | "gte" | "lt" | "lte" | "eq" | "neq";
declare const PricingTierOperator: {
    readonly Gt: "gt";
    readonly Gte: "gte";
    readonly Lt: "lt";
    readonly Lte: "lte";
    readonly Eq: "eq";
    readonly Neq: "neq";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Unit of usage in Langfuse
 */
type ModelUsageUnit = "CHARACTERS" | "TOKENS" | "MILLISECONDS" | "SECONDS" | "IMAGES" | "REQUESTS";
declare const ModelUsageUnit: {
    readonly Characters: "CHARACTERS";
    readonly Tokens: "TOKENS";
    readonly Milliseconds: "MILLISECONDS";
    readonly Seconds: "SECONDS";
    readonly Images: "IMAGES";
    readonly Requests: "REQUESTS";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type ObservationLevel = "DEBUG" | "DEFAULT" | "WARNING" | "ERROR";
declare const ObservationLevel: {
    readonly Debug: "DEBUG";
    readonly Default: "DEFAULT";
    readonly Warning: "WARNING";
    readonly Error: "ERROR";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type MapValue = string | undefined | number | undefined | boolean | undefined | string[] | undefined;

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type CommentObjectType = "TRACE" | "OBSERVATION" | "SESSION" | "PROMPT";
declare const CommentObjectType: {
    readonly Trace: "TRACE";
    readonly Observation: "OBSERVATION";
    readonly Session: "SESSION";
    readonly Prompt: "PROMPT";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type DatasetStatus = "ACTIVE" | "ARCHIVED";
declare const DatasetStatus: {
    readonly Active: "ACTIVE";
    readonly Archived: "ARCHIVED";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type ScoreSource = "ANNOTATION" | "API" | "EVAL";
declare const ScoreSource: {
    readonly Annotation: "ANNOTATION";
    readonly Api: "API";
    readonly Eval: "EVAL";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type ScoreConfigDataType = "NUMERIC" | "BOOLEAN" | "CATEGORICAL";
declare const ScoreConfigDataType: {
    readonly Numeric: "NUMERIC";
    readonly Boolean: "BOOLEAN";
    readonly Categorical: "CATEGORICAL";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type ScoreDataType = "NUMERIC" | "BOOLEAN" | "CATEGORICAL" | "CORRECTION";
declare const ScoreDataType: {
    readonly Numeric: "NUMERIC";
    readonly Boolean: "BOOLEAN";
    readonly Categorical: "CATEGORICAL";
    readonly Correction: "CORRECTION";
};

/**
 * The raw response from the fetch call excluding the body.
 */
type RawResponse = Omit<{
    [K in keyof Response as Response[K] extends Function ? never : K]: Response[K];
}, "ok" | "body" | "bodyUsed">;
/**
 * Creates a `RawResponse` from a standard `Response` object.
 */
interface WithRawResponse<T> {
    readonly data: T;
    readonly rawResponse: RawResponse;
}

type Supplier<T> = T | Promise<T> | (() => T | Promise<T>);
declare const Supplier: {
    get: <T>(supplier: Supplier<T>) => Promise<T>;
};

/**
 * A promise that returns the parsed response and lets you retrieve the raw response too.
 */
declare class HttpResponsePromise<T> extends Promise<T> {
    private innerPromise;
    private unwrappedPromise;
    private constructor();
    /**
     * Creates an `HttpResponsePromise` from a function that returns a promise.
     *
     * @param fn - A function that returns a promise resolving to a `WithRawResponse` object.
     * @param args - Arguments to pass to the function.
     * @returns An `HttpResponsePromise` instance.
     */
    static fromFunction<F extends (...args: never[]) => Promise<WithRawResponse<T>>, T>(fn: F, ...args: Parameters<F>): HttpResponsePromise<T>;
    /**
     * Creates a function that returns an `HttpResponsePromise` from a function that returns a promise.
     *
     * @param fn - A function that returns a promise resolving to a `WithRawResponse` object.
     * @returns A function that returns an `HttpResponsePromise` instance.
     */
    static interceptFunction<F extends (...args: never[]) => Promise<WithRawResponse<T>>, T = Awaited<ReturnType<F>>["data"]>(fn: F): (...args: Parameters<F>) => HttpResponsePromise<T>;
    /**
     * Creates an `HttpResponsePromise` from an existing promise.
     *
     * @param promise - A promise resolving to a `WithRawResponse` object.
     * @returns An `HttpResponsePromise` instance.
     */
    static fromPromise<T>(promise: Promise<WithRawResponse<T>>): HttpResponsePromise<T>;
    /**
     * Creates an `HttpResponsePromise` from an executor function.
     *
     * @param executor - A function that takes resolve and reject callbacks to create a promise.
     * @returns An `HttpResponsePromise` instance.
     */
    static fromExecutor<T>(executor: (resolve: (value: WithRawResponse<T>) => void, reject: (reason?: unknown) => void) => void): HttpResponsePromise<T>;
    /**
     * Creates an `HttpResponsePromise` from a resolved result.
     *
     * @param result - A `WithRawResponse` object to resolve immediately.
     * @returns An `HttpResponsePromise` instance.
     */
    static fromResult<T>(result: WithRawResponse<T>): HttpResponsePromise<T>;
    private unwrap;
    /** @inheritdoc */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null, onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2>;
    /** @inheritdoc */
    catch<TResult = never>(onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null): Promise<T | TResult>;
    /** @inheritdoc */
    finally(onfinally?: (() => void) | null): Promise<T>;
    /**
     * Retrieves the data and raw response.
     *
     * @returns A promise resolving to a `WithRawResponse` object.
     */
    withRawResponse(): Promise<WithRawResponse<T>>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class LangfuseAPIError extends Error {
    readonly statusCode?: number;
    readonly body?: unknown;
    readonly rawResponse?: RawResponse;
    constructor({ message, statusCode, body, rawResponse, }: {
        message?: string;
        statusCode?: number;
        body?: unknown;
        rawResponse?: RawResponse;
    });
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
declare class LangfuseAPITimeoutError extends Error {
    constructor(message: string);
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class Error$1 extends LangfuseAPIError {
    constructor(body?: unknown, rawResponse?: RawResponse);
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class UnauthorizedError extends LangfuseAPIError {
    constructor(body?: unknown, rawResponse?: RawResponse);
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class AccessDeniedError extends LangfuseAPIError {
    constructor(body?: unknown, rawResponse?: RawResponse);
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class NotFoundError extends LangfuseAPIError {
    constructor(body?: unknown, rawResponse?: RawResponse);
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class MethodNotAllowedError extends LangfuseAPIError {
    constructor(body?: unknown, rawResponse?: RawResponse);
}

type index$p_AccessDeniedError = AccessDeniedError;
declare const index$p_AccessDeniedError: typeof AccessDeniedError;
type index$p_BaseScore = BaseScore;
type index$p_BaseScoreV1 = BaseScoreV1;
type index$p_BooleanScore = BooleanScore;
type index$p_BooleanScoreV1 = BooleanScoreV1;
type index$p_CategoricalScore = CategoricalScore;
type index$p_CategoricalScoreV1 = CategoricalScoreV1;
type index$p_Comment = Comment;
declare const index$p_CommentObjectType: typeof CommentObjectType;
type index$p_ConfigCategory = ConfigCategory;
type index$p_CorrectionScore = CorrectionScore;
type index$p_CreateScoreValue = CreateScoreValue;
type index$p_Dataset = Dataset;
type index$p_DatasetItem = DatasetItem;
type index$p_DatasetRun = DatasetRun;
type index$p_DatasetRunItem = DatasetRunItem;
type index$p_DatasetRunWithItems = DatasetRunWithItems;
declare const index$p_DatasetStatus: typeof DatasetStatus;
type index$p_MapValue = MapValue;
type index$p_MethodNotAllowedError = MethodNotAllowedError;
declare const index$p_MethodNotAllowedError: typeof MethodNotAllowedError;
type index$p_Model = Model;
type index$p_ModelPrice = ModelPrice;
declare const index$p_ModelUsageUnit: typeof ModelUsageUnit;
type index$p_NotFoundError = NotFoundError;
declare const index$p_NotFoundError: typeof NotFoundError;
type index$p_NumericScore = NumericScore;
type index$p_NumericScoreV1 = NumericScoreV1;
type index$p_Observation = Observation;
declare const index$p_ObservationLevel: typeof ObservationLevel;
type index$p_ObservationsView = ObservationsView;
type index$p_PricingTier = PricingTier;
type index$p_PricingTierCondition = PricingTierCondition;
type index$p_PricingTierInput = PricingTierInput;
declare const index$p_PricingTierOperator: typeof PricingTierOperator;
type index$p_ScoreConfig = ScoreConfig;
declare const index$p_ScoreConfigDataType: typeof ScoreConfigDataType;
declare const index$p_ScoreDataType: typeof ScoreDataType;
declare const index$p_ScoreSource: typeof ScoreSource;
declare const index$p_ScoreV1: typeof ScoreV1;
type index$p_Session = Session;
type index$p_SessionWithTraces = SessionWithTraces;
type index$p_TraceWithDetails = TraceWithDetails;
type index$p_TraceWithFullDetails = TraceWithFullDetails;
type index$p_UnauthorizedError = UnauthorizedError;
declare const index$p_UnauthorizedError: typeof UnauthorizedError;
type index$p_Usage = Usage;
declare namespace index$p {
  export { index$p_AccessDeniedError as AccessDeniedError, type index$p_BaseScore as BaseScore, type index$p_BaseScoreV1 as BaseScoreV1, type index$p_BooleanScore as BooleanScore, type index$p_BooleanScoreV1 as BooleanScoreV1, type index$p_CategoricalScore as CategoricalScore, type index$p_CategoricalScoreV1 as CategoricalScoreV1, type index$p_Comment as Comment, index$p_CommentObjectType as CommentObjectType, type index$p_ConfigCategory as ConfigCategory, type index$p_CorrectionScore as CorrectionScore, type index$p_CreateScoreValue as CreateScoreValue, type index$p_Dataset as Dataset, type index$p_DatasetItem as DatasetItem, type index$p_DatasetRun as DatasetRun, type index$p_DatasetRunItem as DatasetRunItem, type index$p_DatasetRunWithItems as DatasetRunWithItems, index$p_DatasetStatus as DatasetStatus, Error$1 as Error, type index$p_MapValue as MapValue, index$p_MethodNotAllowedError as MethodNotAllowedError, type index$p_Model as Model, type index$p_ModelPrice as ModelPrice, index$p_ModelUsageUnit as ModelUsageUnit, index$p_NotFoundError as NotFoundError, type index$p_NumericScore as NumericScore, type index$p_NumericScoreV1 as NumericScoreV1, type index$p_Observation as Observation, index$p_ObservationLevel as ObservationLevel, type index$p_ObservationsView as ObservationsView, type index$p_PricingTier as PricingTier, type index$p_PricingTierCondition as PricingTierCondition, type index$p_PricingTierInput as PricingTierInput, index$p_PricingTierOperator as PricingTierOperator, Score$1 as Score, type index$p_ScoreConfig as ScoreConfig, index$p_ScoreConfigDataType as ScoreConfigDataType, index$p_ScoreDataType as ScoreDataType, index$p_ScoreSource as ScoreSource, index$p_ScoreV1 as ScoreV1, type index$p_Session as Session, type index$p_SessionWithTraces as SessionWithTraces, type Trace$1 as Trace, type index$p_TraceWithDetails as TraceWithDetails, type index$p_TraceWithFullDetails as TraceWithFullDetails, index$p_UnauthorizedError as UnauthorizedError, type index$p_Usage as Usage };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DeleteDatasetItemResponse {
    /** Success message after deletion */
    message: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateDatasetItemRequest {
    datasetName: string;
    input?: unknown;
    expectedOutput?: unknown;
    metadata?: unknown;
    sourceTraceId?: string;
    sourceObservationId?: string;
    /** Dataset items are upserted on their id. Id needs to be unique (project-level) and cannot be reused across datasets. */
    id?: string;
    /** Defaults to ACTIVE for newly created items */
    status?: DatasetStatus;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedDatasetItems {
    data: DatasetItem[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetDatasetItemsRequest {
    datasetName?: string;
    sourceTraceId?: string;
    sourceObservationId?: string;
    /**
     * ISO 8601 timestamp (RFC 3339, Section 5.6) in UTC (e.g., "2026-01-21T14:35:42Z").
     * If provided, returns state of dataset at this timestamp.
     * If not provided, returns the latest version. Requires datasetName to be specified.
     */
    version?: string;
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

type index$o_CreateDatasetItemRequest = CreateDatasetItemRequest;
type index$o_DeleteDatasetItemResponse = DeleteDatasetItemResponse;
type index$o_GetDatasetItemsRequest = GetDatasetItemsRequest;
type index$o_PaginatedDatasetItems = PaginatedDatasetItems;
declare namespace index$o {
  export type { index$o_CreateDatasetItemRequest as CreateDatasetItemRequest, index$o_DeleteDatasetItemResponse as DeleteDatasetItemResponse, index$o_GetDatasetItemsRequest as GetDatasetItemsRequest, index$o_PaginatedDatasetItems as PaginatedDatasetItems };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateDatasetRunItemRequest {
    runName: string;
    /** Description of the run. If run exists, description will be updated. */
    runDescription?: string;
    /** Metadata of the dataset run, updates run if run already exists */
    metadata?: unknown;
    datasetItemId: string;
    observationId?: string;
    /** traceId should always be provided. For compatibility with older SDK versions it can also be inferred from the provided observationId. */
    traceId?: string;
    /**
     * ISO 8601 timestamp (RFC 3339, Section 5.6) in UTC (e.g., "2026-01-21T14:35:42Z").
     * Specifies the dataset version to use for this experiment run.
     * If provided, the experiment will use dataset items as they existed at or before this timestamp.
     * If not provided, uses the latest version of dataset items.
     */
    datasetVersion?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedDatasetRunItems {
    data: DatasetRunItem[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         datasetId: "datasetId",
 *         runName: "runName"
 *     }
 */
interface ListDatasetRunItemsRequest {
    datasetId: string;
    runName: string;
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

type index$n_CreateDatasetRunItemRequest = CreateDatasetRunItemRequest;
type index$n_ListDatasetRunItemsRequest = ListDatasetRunItemsRequest;
type index$n_PaginatedDatasetRunItems = PaginatedDatasetRunItems;
declare namespace index$n {
  export type { index$n_CreateDatasetRunItemRequest as CreateDatasetRunItemRequest, index$n_ListDatasetRunItemsRequest as ListDatasetRunItemsRequest, index$n_PaginatedDatasetRunItems as PaginatedDatasetRunItems };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedDatasets {
    data: Dataset[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateDatasetRequest {
    name: string;
    description?: string;
    metadata?: unknown;
    /** JSON Schema for validating dataset item inputs. When set, all new and existing dataset items will be validated against this schema. */
    inputSchema?: unknown;
    /** JSON Schema for validating dataset item expected outputs. When set, all new and existing dataset items will be validated against this schema. */
    expectedOutputSchema?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedDatasetRuns {
    data: DatasetRun[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DeleteDatasetRunResponse {
    message: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetDatasetsRequest {
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetDatasetRunsRequest {
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

type index$m_CreateDatasetRequest = CreateDatasetRequest;
type index$m_DeleteDatasetRunResponse = DeleteDatasetRunResponse;
type index$m_GetDatasetRunsRequest = GetDatasetRunsRequest;
type index$m_GetDatasetsRequest = GetDatasetsRequest;
type index$m_PaginatedDatasetRuns = PaginatedDatasetRuns;
type index$m_PaginatedDatasets = PaginatedDatasets;
declare namespace index$m {
  export type { index$m_CreateDatasetRequest as CreateDatasetRequest, index$m_DeleteDatasetRunResponse as DeleteDatasetRunResponse, index$m_GetDatasetRunsRequest as GetDatasetRunsRequest, index$m_GetDatasetsRequest as GetDatasetsRequest, index$m_PaginatedDatasetRuns as PaginatedDatasetRuns, index$m_PaginatedDatasets as PaginatedDatasets };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         version: "1.25.0",
 *         status: "OK"
 *     }
 */
interface HealthResponse {
    /** Langfuse server version */
    version: string;
    status: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare class ServiceUnavailableError extends LangfuseAPIError {
    constructor(rawResponse?: RawResponse);
}

type index$l_HealthResponse = HealthResponse;
type index$l_ServiceUnavailableError = ServiceUnavailableError;
declare const index$l_ServiceUnavailableError: typeof ServiceUnavailableError;
declare namespace index$l {
  export { type index$l_HealthResponse as HealthResponse, index$l_ServiceUnavailableError as ServiceUnavailableError };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type IngestionEvent = 
/**
 * Creates a new trace. Upserts on id for updates if trace with id exists. */
IngestionEvent.TraceCreate
/**
 * Creates a new score. Upserts on id for updates if score with id exists. */
 | IngestionEvent.ScoreCreate
/**
 * Creates a new span. */
 | IngestionEvent.SpanCreate
/**
 * Updates span based on id. */
 | IngestionEvent.SpanUpdate
/**
 * Creates a new generation. */
 | IngestionEvent.GenerationCreate
/**
 * Updates a generation based on id. */
 | IngestionEvent.GenerationUpdate
/**
 * Creates an event. */
 | IngestionEvent.EventCreate
/**
 * Langfuse SDKs only, used for debugging purposes. */
 | IngestionEvent.SdkLog
/**
 * Deprecated event type */
 | IngestionEvent.ObservationCreate
/**
 * Deprecated event type */
 | IngestionEvent.ObservationUpdate;
declare namespace IngestionEvent {
    interface TraceCreate extends TraceEvent {
        type: "trace-create";
    }
    interface ScoreCreate extends ScoreEvent {
        type: "score-create";
    }
    interface SpanCreate extends CreateSpanEvent {
        type: "span-create";
    }
    interface SpanUpdate extends UpdateSpanEvent {
        type: "span-update";
    }
    interface GenerationCreate extends CreateGenerationEvent {
        type: "generation-create";
    }
    interface GenerationUpdate extends UpdateGenerationEvent {
        type: "generation-update";
    }
    interface EventCreate extends CreateEventEvent {
        type: "event-create";
    }
    interface SdkLog extends SdkLogEvent {
        type: "sdk-log";
    }
    interface ObservationCreate extends CreateObservationEvent {
        type: "observation-create";
    }
    interface ObservationUpdate extends UpdateObservationEvent {
        type: "observation-update";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type ObservationType = "SPAN" | "GENERATION" | "EVENT" | "AGENT" | "TOOL" | "CHAIN" | "RETRIEVER" | "EVALUATOR" | "EMBEDDING" | "GUARDRAIL";
declare const ObservationType: {
    readonly Span: "SPAN";
    readonly Generation: "GENERATION";
    readonly Event: "EVENT";
    readonly Agent: "AGENT";
    readonly Tool: "TOOL";
    readonly Chain: "CHAIN";
    readonly Retriever: "RETRIEVER";
    readonly Evaluator: "EVALUATOR";
    readonly Embedding: "EMBEDDING";
    readonly Guardrail: "GUARDRAIL";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type IngestionUsage = Usage | OpenAiUsage;

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Usage interface of OpenAI for improved compatibility.
 */
interface OpenAiUsage {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface OptionalObservationBody {
    traceId?: string;
    name?: string;
    startTime?: string;
    metadata?: unknown;
    input?: unknown;
    output?: unknown;
    level?: ObservationLevel;
    statusMessage?: string;
    parentObservationId?: string;
    version?: string;
    environment?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateEventBody extends OptionalObservationBody {
    id?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateEventBody extends OptionalObservationBody {
    id: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateSpanBody extends CreateEventBody {
    endTime?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateSpanBody extends UpdateEventBody {
    endTime?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateGenerationBody extends CreateSpanBody {
    completionStartTime?: string;
    model?: string;
    modelParameters?: Record<string, MapValue>;
    usage?: IngestionUsage;
    usageDetails?: UsageDetails;
    costDetails?: Record<string, number>;
    promptName?: string;
    promptVersion?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateGenerationBody extends UpdateSpanBody {
    completionStartTime?: string;
    model?: string;
    modelParameters?: Record<string, MapValue>;
    usage?: IngestionUsage;
    promptName?: string;
    usageDetails?: UsageDetails;
    costDetails?: Record<string, number>;
    promptVersion?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ObservationBody {
    id?: string;
    traceId?: string;
    type: ObservationType;
    name?: string;
    startTime?: string;
    endTime?: string;
    completionStartTime?: string;
    model?: string;
    modelParameters?: Record<string, MapValue>;
    input?: unknown;
    version?: string;
    metadata?: unknown;
    output?: unknown;
    usage?: Usage;
    level?: ObservationLevel;
    statusMessage?: string;
    parentObservationId?: string;
    environment?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface TraceBody {
    id?: string;
    timestamp?: string;
    name?: string;
    userId?: string;
    input?: unknown;
    output?: unknown;
    sessionId?: string;
    release?: string;
    version?: string;
    metadata?: unknown;
    tags?: string[];
    environment?: string;
    /** Make trace publicly accessible via url */
    public?: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface SdkLogBody {
    log?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         name: "novelty",
 *         value: 0.9,
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "consistency",
 *         value: 1.2,
 *         dataType: LangfuseAPI.ScoreDataType.Numeric,
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "accuracy",
 *         value: 0.9,
 *         dataType: LangfuseAPI.ScoreDataType.Numeric,
 *         configId: "9203-4567-89ab-cdef",
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "toxicity",
 *         value: "not toxic",
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "correctness",
 *         value: "partially correct",
 *         dataType: LangfuseAPI.ScoreDataType.Categorical,
 *         configId: "1234-5678-90ab-cdef",
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "hallucination",
 *         value: 0,
 *         dataType: LangfuseAPI.ScoreDataType.Boolean,
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "helpfulness",
 *         value: 1,
 *         dataType: LangfuseAPI.ScoreDataType.Boolean,
 *         configId: "1234-5678-90ab-cdef",
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "contextrelevant",
 *         value: "not relevant",
 *         sessionId: "abyt-1234-5678-80ab"
 *     }
 *
 * @example
 *     {
 *         name: "hallucination",
 *         value: 0,
 *         datasetRunId: "7891-5678-90ab-hijk"
 *     }
 */
interface ScoreBody {
    id?: string;
    traceId?: string;
    sessionId?: string;
    observationId?: string;
    datasetRunId?: string;
    /** The name of the score. Always overrides "output" for correction scores. */
    name: string;
    environment?: string;
    /** The annotation queue referenced by the score. Indicates if score was initially created while processing annotation queue. */
    queueId?: string;
    /** The value of the score. Must be passed as string for categorical scores, and numeric for boolean and numeric scores. Boolean score values must equal either 1 or 0 (true or false) */
    value: CreateScoreValue;
    comment?: string;
    metadata?: unknown;
    /** When set, must match the score value's type. If not set, will be inferred from the score value or config */
    dataType?: ScoreDataType;
    /** Reference a score config on a score. When set, the score name must equal the config name and scores must comply with the config's range and data type. For categorical scores, the value must map to a config category. Numeric scores might be constrained by the score config's max and min values */
    configId?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface BaseEvent {
    /** UUID v4 that identifies the event */
    id: string;
    /** Datetime (ISO 8601) of event creation in client. Should be as close to actual event creation in client as possible, this timestamp will be used for ordering of events in future release. Resolution: milliseconds (required), microseconds (optimal). */
    timestamp: string;
    /** Optional. Metadata field used by the Langfuse SDKs for debugging. */
    metadata?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface TraceEvent extends BaseEvent {
    body: TraceBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateObservationEvent extends BaseEvent {
    body: ObservationBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateObservationEvent extends BaseEvent {
    body: ObservationBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ScoreEvent extends BaseEvent {
    body: ScoreBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface SdkLogEvent extends BaseEvent {
    body: SdkLogBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateGenerationEvent extends BaseEvent {
    body: CreateGenerationBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateGenerationEvent extends BaseEvent {
    body: UpdateGenerationBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateSpanEvent extends BaseEvent {
    body: CreateSpanBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateSpanEvent extends BaseEvent {
    body: UpdateSpanBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateEventEvent extends BaseEvent {
    body: CreateEventBody;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface IngestionSuccess {
    id: string;
    status: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface IngestionError {
    id: string;
    status: number;
    message?: string;
    error?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface IngestionResponse {
    successes: IngestionSuccess[];
    errors: IngestionError[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * OpenAI Usage schema from (Chat-)Completion APIs
 */
interface OpenAiCompletionUsageSchema {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details?: Record<string, number | undefined>;
    completion_tokens_details?: Record<string, number | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * OpenAI Usage schema from Response API
 */
interface OpenAiResponseUsageSchema {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    input_tokens_details?: Record<string, number | undefined>;
    output_tokens_details?: Record<string, number | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type UsageDetails = Record<string, number> | OpenAiCompletionUsageSchema | OpenAiResponseUsageSchema;

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         batch: [{
 *                 type: "trace-create",
 *                 id: "abcdef-1234-5678-90ab",
 *                 timestamp: "2022-01-01T00:00:00.000Z",
 *                 body: {
 *                     id: "abcdef-1234-5678-90ab",
 *                     timestamp: "2022-01-01T00:00:00.000Z",
 *                     environment: "production",
 *                     name: "My Trace",
 *                     userId: "1234-5678-90ab-cdef",
 *                     input: "My input",
 *                     output: "My output",
 *                     sessionId: "1234-5678-90ab-cdef",
 *                     release: "1.0.0",
 *                     version: "1.0.0",
 *                     metadata: "My metadata",
 *                     tags: ["tag1", "tag2"],
 *                     "public": true
 *                 }
 *             }]
 *     }
 *
 * @example
 *     {
 *         batch: [{
 *                 type: "span-create",
 *                 id: "abcdef-1234-5678-90ab",
 *                 timestamp: "2022-01-01T00:00:00.000Z",
 *                 body: {
 *                     id: "abcdef-1234-5678-90ab",
 *                     traceId: "1234-5678-90ab-cdef",
 *                     startTime: "2022-01-01T00:00:00.000Z",
 *                     environment: "test"
 *                 }
 *             }]
 *     }
 *
 * @example
 *     {
 *         batch: [{
 *                 type: "score-create",
 *                 id: "abcdef-1234-5678-90ab",
 *                 timestamp: "2022-01-01T00:00:00.000Z",
 *                 body: {
 *                     id: "abcdef-1234-5678-90ab",
 *                     traceId: "1234-5678-90ab-cdef",
 *                     name: "My Score",
 *                     value: 0.9,
 *                     environment: "default"
 *                 }
 *             }]
 *     }
 */
interface IngestionRequest {
    /** Batch of tracing events to be ingested. Discriminated by attribute `type`. */
    batch: IngestionEvent[];
    /** Optional. Metadata field used by the Langfuse SDKs for debugging. */
    metadata?: unknown;
}

type index$k_BaseEvent = BaseEvent;
type index$k_CreateEventBody = CreateEventBody;
type index$k_CreateEventEvent = CreateEventEvent;
type index$k_CreateGenerationBody = CreateGenerationBody;
type index$k_CreateGenerationEvent = CreateGenerationEvent;
type index$k_CreateObservationEvent = CreateObservationEvent;
type index$k_CreateSpanBody = CreateSpanBody;
type index$k_CreateSpanEvent = CreateSpanEvent;
type index$k_IngestionError = IngestionError;
declare const index$k_IngestionEvent: typeof IngestionEvent;
type index$k_IngestionRequest = IngestionRequest;
type index$k_IngestionResponse = IngestionResponse;
type index$k_IngestionSuccess = IngestionSuccess;
type index$k_IngestionUsage = IngestionUsage;
type index$k_ObservationBody = ObservationBody;
declare const index$k_ObservationType: typeof ObservationType;
type index$k_OpenAiCompletionUsageSchema = OpenAiCompletionUsageSchema;
type index$k_OpenAiResponseUsageSchema = OpenAiResponseUsageSchema;
type index$k_OpenAiUsage = OpenAiUsage;
type index$k_OptionalObservationBody = OptionalObservationBody;
type index$k_ScoreBody = ScoreBody;
type index$k_ScoreEvent = ScoreEvent;
type index$k_SdkLogBody = SdkLogBody;
type index$k_SdkLogEvent = SdkLogEvent;
type index$k_TraceBody = TraceBody;
type index$k_TraceEvent = TraceEvent;
type index$k_UpdateEventBody = UpdateEventBody;
type index$k_UpdateGenerationBody = UpdateGenerationBody;
type index$k_UpdateGenerationEvent = UpdateGenerationEvent;
type index$k_UpdateObservationEvent = UpdateObservationEvent;
type index$k_UpdateSpanBody = UpdateSpanBody;
type index$k_UpdateSpanEvent = UpdateSpanEvent;
type index$k_UsageDetails = UsageDetails;
declare namespace index$k {
  export { type index$k_BaseEvent as BaseEvent, type index$k_CreateEventBody as CreateEventBody, type index$k_CreateEventEvent as CreateEventEvent, type index$k_CreateGenerationBody as CreateGenerationBody, type index$k_CreateGenerationEvent as CreateGenerationEvent, type index$k_CreateObservationEvent as CreateObservationEvent, type index$k_CreateSpanBody as CreateSpanBody, type index$k_CreateSpanEvent as CreateSpanEvent, type index$k_IngestionError as IngestionError, index$k_IngestionEvent as IngestionEvent, type index$k_IngestionRequest as IngestionRequest, type index$k_IngestionResponse as IngestionResponse, type index$k_IngestionSuccess as IngestionSuccess, type index$k_IngestionUsage as IngestionUsage, type index$k_ObservationBody as ObservationBody, index$k_ObservationType as ObservationType, type index$k_OpenAiCompletionUsageSchema as OpenAiCompletionUsageSchema, type index$k_OpenAiResponseUsageSchema as OpenAiResponseUsageSchema, type index$k_OpenAiUsage as OpenAiUsage, type index$k_OptionalObservationBody as OptionalObservationBody, type index$k_ScoreBody as ScoreBody, type index$k_ScoreEvent as ScoreEvent, type index$k_SdkLogBody as SdkLogBody, type index$k_SdkLogEvent as SdkLogEvent, type index$k_TraceBody as TraceBody, type index$k_TraceEvent as TraceEvent, type index$k_UpdateEventBody as UpdateEventBody, type index$k_UpdateGenerationBody as UpdateGenerationBody, type index$k_UpdateGenerationEvent as UpdateGenerationEvent, type index$k_UpdateObservationEvent as UpdateObservationEvent, type index$k_UpdateSpanBody as UpdateSpanBody, type index$k_UpdateSpanEvent as UpdateSpanEvent, type index$k_UsageDetails as UsageDetails };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * LLM API connection configuration (secrets excluded)
 */
interface LlmConnection {
    id: string;
    /** Provider name (e.g., 'openai', 'my-gateway'). Must be unique in project, used for upserting. */
    provider: string;
    /** The adapter used to interface with the LLM */
    adapter: string;
    /** Masked version of the secret key for display purposes */
    displaySecretKey: string;
    /** Custom base URL for the LLM API */
    baseURL?: string;
    /** List of custom model names available for this connection */
    customModels: string[];
    /** Whether to include default models for this adapter */
    withDefaultModels: boolean;
    /** Keys of extra headers sent with requests (values excluded for security) */
    extraHeaderKeys: string[];
    /** Adapter-specific configuration. Required for Bedrock (`{"region":"us-east-1"}`), optional for VertexAI (`{"location":"us-central1"}`), not used by other adapters. */
    config?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedLlmConnections {
    data: LlmConnection[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Request to create or update an LLM connection (upsert)
 */
interface UpsertLlmConnectionRequest {
    /** Provider name (e.g., 'openai', 'my-gateway'). Must be unique in project, used for upserting. */
    provider: string;
    /** The adapter used to interface with the LLM */
    adapter: LlmAdapter;
    /** Secret key for the LLM API. */
    secretKey: string;
    /** Custom base URL for the LLM API */
    baseURL?: string;
    /** List of custom model names */
    customModels?: string[];
    /** Whether to include default models. Default is true. */
    withDefaultModels?: boolean;
    /** Extra headers to send with requests */
    extraHeaders?: Record<string, string>;
    /** Adapter-specific configuration. Validation rules: - **Bedrock**: Required. Must be `{"region": "<aws-region>"}` (e.g., `{"region":"us-east-1"}`) - **VertexAI**: Optional. If provided, must be `{"location": "<gcp-location>"}` (e.g., `{"location":"us-central1"}`) - **Other adapters**: Not supported. Omit this field or set to null. */
    config?: Record<string, unknown>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type LlmAdapter = "anthropic" | "openai" | "azure" | "bedrock" | "google-vertex-ai" | "google-ai-studio";
declare const LlmAdapter: {
    readonly Anthropic: "anthropic";
    readonly OpenAi: "openai";
    readonly Azure: "azure";
    readonly Bedrock: "bedrock";
    readonly GoogleVertexAi: "google-vertex-ai";
    readonly GoogleAiStudio: "google-ai-studio";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetLlmConnectionsRequest {
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

type index$j_GetLlmConnectionsRequest = GetLlmConnectionsRequest;
declare const index$j_LlmAdapter: typeof LlmAdapter;
type index$j_LlmConnection = LlmConnection;
type index$j_PaginatedLlmConnections = PaginatedLlmConnections;
type index$j_UpsertLlmConnectionRequest = UpsertLlmConnectionRequest;
declare namespace index$j {
  export { type index$j_GetLlmConnectionsRequest as GetLlmConnectionsRequest, index$j_LlmAdapter as LlmAdapter, type index$j_LlmConnection as LlmConnection, type index$j_PaginatedLlmConnections as PaginatedLlmConnections, type index$j_UpsertLlmConnectionRequest as UpsertLlmConnectionRequest };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface GetMediaResponse {
    /** The unique langfuse identifier of a media record */
    mediaId: string;
    /** The MIME type of the media record */
    contentType: string;
    /** The size of the media record in bytes */
    contentLength: number;
    /** The date and time when the media record was uploaded */
    uploadedAt: string;
    /** The download URL of the media record */
    url: string;
    /** The expiry date and time of the media record download URL */
    urlExpiry: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface PatchMediaBody {
    /** The date and time when the media record was uploaded */
    uploadedAt: string;
    /** The HTTP status code of the upload */
    uploadHttpStatus: number;
    /** The HTTP error message of the upload */
    uploadHttpError?: string;
    /** The time in milliseconds it took to upload the media record */
    uploadTimeMs?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetMediaUploadUrlRequest {
    /** The trace ID associated with the media record */
    traceId: string;
    /** The observation ID associated with the media record. If the media record is associated directly with a trace, this will be null. */
    observationId?: string;
    contentType: MediaContentType;
    /** The size of the media record in bytes */
    contentLength: number;
    /** The SHA-256 hash of the media record */
    sha256Hash: string;
    /** The trace / observation field the media record is associated with. This can be one of `input`, `output`, `metadata` */
    field: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface GetMediaUploadUrlResponse {
    /** The presigned upload URL. If the asset is already uploaded, this will be null */
    uploadUrl?: string;
    /** The unique langfuse identifier of a media record */
    mediaId: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * The MIME type of the media record
 */
type MediaContentType = "image/png" | "image/jpeg" | "image/jpg" | "image/webp" | "image/gif" | "image/svg+xml" | "image/tiff" | "image/bmp" | "image/avif" | "image/heic" | "audio/mpeg" | "audio/mp3" | "audio/wav" | "audio/ogg" | "audio/oga" | "audio/aac" | "audio/mp4" | "audio/flac" | "audio/opus" | "audio/webm" | "video/mp4" | "video/webm" | "video/ogg" | "video/mpeg" | "video/quicktime" | "video/x-msvideo" | "video/x-matroska" | "text/plain" | "text/html" | "text/css" | "text/csv" | "text/markdown" | "text/x-python" | "application/javascript" | "text/x-typescript" | "application/x-yaml" | "application/pdf" | "application/msword" | "application/vnd.ms-excel" | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" | "application/zip" | "application/json" | "application/xml" | "application/octet-stream" | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "application/rtf" | "application/x-ndjson" | "application/vnd.apache.parquet" | "application/gzip" | "application/x-tar" | "application/x-7z-compressed";
declare const MediaContentType: {
    readonly ImagePng: "image/png";
    readonly ImageJpeg: "image/jpeg";
    readonly ImageJpg: "image/jpg";
    readonly ImageWebp: "image/webp";
    readonly ImageGif: "image/gif";
    readonly ImageSvgXml: "image/svg+xml";
    readonly ImageTiff: "image/tiff";
    readonly ImageBmp: "image/bmp";
    readonly ImageAvif: "image/avif";
    readonly ImageHeic: "image/heic";
    readonly AudioMpeg: "audio/mpeg";
    readonly AudioMp3: "audio/mp3";
    readonly AudioWav: "audio/wav";
    readonly AudioOgg: "audio/ogg";
    readonly AudioOga: "audio/oga";
    readonly AudioAac: "audio/aac";
    readonly AudioMp4: "audio/mp4";
    readonly AudioFlac: "audio/flac";
    readonly AudioOpus: "audio/opus";
    readonly AudioWebm: "audio/webm";
    readonly VideoMp4: "video/mp4";
    readonly VideoWebm: "video/webm";
    readonly VideoOgg: "video/ogg";
    readonly VideoMpeg: "video/mpeg";
    readonly VideoQuicktime: "video/quicktime";
    readonly VideoXMsvideo: "video/x-msvideo";
    readonly VideoXMatroska: "video/x-matroska";
    readonly TextPlain: "text/plain";
    readonly TextHtml: "text/html";
    readonly TextCss: "text/css";
    readonly TextCsv: "text/csv";
    readonly TextMarkdown: "text/markdown";
    readonly TextXPython: "text/x-python";
    readonly ApplicationJavascript: "application/javascript";
    readonly TextXTypescript: "text/x-typescript";
    readonly ApplicationXYaml: "application/x-yaml";
    readonly ApplicationPdf: "application/pdf";
    readonly ApplicationMsword: "application/msword";
    readonly ApplicationMsExcel: "application/vnd.ms-excel";
    readonly ApplicationOpenxmlSpreadsheet: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    readonly ApplicationZip: "application/zip";
    readonly ApplicationJson: "application/json";
    readonly ApplicationXml: "application/xml";
    readonly ApplicationOctetStream: "application/octet-stream";
    readonly ApplicationOpenxmlWord: "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    readonly ApplicationOpenxmlPresentation: "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    readonly ApplicationRtf: "application/rtf";
    readonly ApplicationXNdjson: "application/x-ndjson";
    readonly ApplicationParquet: "application/vnd.apache.parquet";
    readonly ApplicationGzip: "application/gzip";
    readonly ApplicationXTar: "application/x-tar";
    readonly ApplicationX7ZCompressed: "application/x-7z-compressed";
};

type index$i_GetMediaResponse = GetMediaResponse;
type index$i_GetMediaUploadUrlRequest = GetMediaUploadUrlRequest;
type index$i_GetMediaUploadUrlResponse = GetMediaUploadUrlResponse;
declare const index$i_MediaContentType: typeof MediaContentType;
type index$i_PatchMediaBody = PatchMediaBody;
declare namespace index$i {
  export { type index$i_GetMediaResponse as GetMediaResponse, type index$i_GetMediaUploadUrlRequest as GetMediaUploadUrlRequest, type index$i_GetMediaUploadUrlResponse as GetMediaUploadUrlResponse, index$i_MediaContentType as MediaContentType, type index$i_PatchMediaBody as PatchMediaBody };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface MetricsV2Response {
    /**
     * The metrics data. Each item in the list contains the metric values and dimensions requested in the query.
     * Format varies based on the query parameters.
     * Histograms will return an array with [lower, upper, height] tuples.
     */
    data: Record<string, unknown>[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         query: "query"
 *     }
 */
interface GetMetricsV2Request {
    /**
     * JSON string containing the query parameters with the following structure:
     * ```json
     * {
     *   "view": string,           // Required. One of "observations", "scores-numeric", "scores-categorical"
     *   "dimensions": [           // Optional. Default: []
     *     {
     *       "field": string       // Field to group by (see available dimensions above)
     *     }
     *   ],
     *   "metrics": [              // Required. At least one metric must be provided
     *     {
     *       "measure": string,    // What to measure (see available measures above)
     *       "aggregation": string // How to aggregate: "sum", "avg", "count", "max", "min", "p50", "p75", "p90", "p95", "p99", "histogram"
     *     }
     *   ],
     *   "filters": [              // Optional. Default: []
     *     {
     *       "column": string,     // Column to filter on (any dimension field)
     *       "operator": string,   // Operator based on type:
     *                             // - datetime: ">", "<", ">=", "<="
     *                             // - string: "=", "contains", "does not contain", "starts with", "ends with"
     *                             // - stringOptions: "any of", "none of"
     *                             // - arrayOptions: "any of", "none of", "all of"
     *                             // - number: "=", ">", "<", ">=", "<="
     *                             // - stringObject/numberObject: same as string/number with required "key"
     *                             // - boolean: "=", "<>"
     *                             // - null: "is null", "is not null"
     *       "value": any,         // Value to compare against
     *       "type": string,       // Data type: "datetime", "string", "number", "stringOptions", "categoryOptions", "arrayOptions", "stringObject", "numberObject", "boolean", "null"
     *       "key": string         // Required only for stringObject/numberObject types (e.g., metadata filtering)
     *     }
     *   ],
     *   "timeDimension": {        // Optional. Default: null. If provided, results will be grouped by time
     *     "granularity": string   // One of "auto", "minute", "hour", "day", "week", "month"
     *   },
     *   "fromTimestamp": string,  // Required. ISO datetime string for start of time range
     *   "toTimestamp": string,    // Required. ISO datetime string for end of time range (must be after fromTimestamp)
     *   "orderBy": [              // Optional. Default: null
     *     {
     *       "field": string,      // Field to order by (dimension or metric alias)
     *       "direction": string   // "asc" or "desc"
     *     }
     *   ],
     *   "config": {               // Optional. Query-specific configuration
     *     "bins": number,         // Optional. Number of bins for histogram aggregation (1-100), default: 10
     *     "row_limit": number     // Optional. Maximum number of rows to return (1-1000), default: 100
     *   }
     * }
     * ```
     */
    query: string;
}

type index$h_GetMetricsV2Request = GetMetricsV2Request;
type index$h_MetricsV2Response = MetricsV2Response;
declare namespace index$h {
  export type { index$h_GetMetricsV2Request as GetMetricsV2Request, index$h_MetricsV2Response as MetricsV2Response };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface MetricsResponse {
    /**
     * The metrics data. Each item in the list contains the metric values and dimensions requested in the query.
     * Format varies based on the query parameters.
     * Histograms will return an array with [lower, upper, height] tuples.
     */
    data: Record<string, unknown>[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         query: "query"
 *     }
 */
interface GetMetricsRequest {
    /**
     * JSON string containing the query parameters with the following structure:
     * ```json
     * {
     *   "view": string,           // Required. One of "traces", "observations", "scores-numeric", "scores-categorical"
     *   "dimensions": [           // Optional. Default: []
     *     {
     *       "field": string       // Field to group by, e.g. "name", "userId", "sessionId"
     *     }
     *   ],
     *   "metrics": [              // Required. At least one metric must be provided
     *     {
     *       "measure": string,    // What to measure, e.g. "count", "latency", "value"
     *       "aggregation": string // How to aggregate, e.g. "count", "sum", "avg", "p95", "histogram"
     *     }
     *   ],
     *   "filters": [              // Optional. Default: []
     *     {
     *       "column": string,     // Column to filter on
     *       "operator": string,   // Operator, e.g. "=", ">", "<", "contains"
     *       "value": any,         // Value to compare against
     *       "type": string,       // Data type, e.g. "string", "number", "stringObject"
     *       "key": string         // Required only when filtering on metadata
     *     }
     *   ],
     *   "timeDimension": {        // Optional. Default: null. If provided, results will be grouped by time
     *     "granularity": string   // One of "minute", "hour", "day", "week", "month", "auto"
     *   },
     *   "fromTimestamp": string,  // Required. ISO datetime string for start of time range
     *   "toTimestamp": string,    // Required. ISO datetime string for end of time range
     *   "orderBy": [              // Optional. Default: null
     *     {
     *       "field": string,      // Field to order by
     *       "direction": string   // "asc" or "desc"
     *     }
     *   ],
     *   "config": {               // Optional. Query-specific configuration
     *     "bins": number,         // Optional. Number of bins for histogram (1-100), default: 10
     *     "row_limit": number     // Optional. Row limit for results (1-1000)
     *   }
     * }
     * ```
     */
    query: string;
}

type index$g_GetMetricsRequest = GetMetricsRequest;
type index$g_MetricsResponse = MetricsResponse;
declare namespace index$g {
  export type { index$g_GetMetricsRequest as GetMetricsRequest, index$g_MetricsResponse as MetricsResponse };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedModels {
    data: Model[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateModelRequest {
    /** Name of the model definition. If multiple with the same name exist, they are applied in the following order: (1) custom over built-in, (2) newest according to startTime where model.startTime<observation.startTime */
    modelName: string;
    /** Regex pattern which matches this model definition to generation.model. Useful in case of fine-tuned models. If you want to exact match, use `(?i)^modelname$` */
    matchPattern: string;
    /** Apply only to generations which are newer than this ISO date. */
    startDate?: string;
    /** Unit used by this model. */
    unit?: ModelUsageUnit;
    /** Deprecated. Use 'pricingTiers' instead. Price (USD) per input unit. Creates a default tier if pricingTiers not provided. */
    inputPrice?: number;
    /** Deprecated. Use 'pricingTiers' instead. Price (USD) per output unit. Creates a default tier if pricingTiers not provided. */
    outputPrice?: number;
    /** Deprecated. Use 'pricingTiers' instead. Price (USD) per total units. Cannot be set if input or output price is set. Creates a default tier if pricingTiers not provided. */
    totalPrice?: number;
    /**
     * Optional. Array of pricing tiers for this model.
     *
     * Use pricing tiers for all models - both those with threshold-based pricing variations and those with simple flat pricing:
     *
     * - For models with standard flat pricing: Create a single default tier with your prices
     *   (e.g., one tier with isDefault=true, priority=0, conditions=[], and your standard prices)
     *
     * - For models with threshold-based pricing: Create a default tier plus additional conditional tiers
     *   (e.g., default tier for standard usage + high-volume tier for usage above certain thresholds)
     *
     * Requirements:
     * - Cannot be provided with flat prices (inputPrice/outputPrice/totalPrice) - use one approach or the other
     * - Must include exactly one default tier with isDefault=true, priority=0, and conditions=[]
     * - All tier names and priorities must be unique within the model
     * - Each tier must define at least one price
     *
     * If omitted, you must provide flat prices instead (inputPrice/outputPrice/totalPrice),
     * which will automatically create a single default tier named "Standard".
     */
    pricingTiers?: PricingTierInput[];
    /** Optional. Tokenizer to be applied to observations which match to this model. See docs for more details. */
    tokenizerId?: string;
    /** Optional. Configuration for the selected tokenizer. Needs to be JSON. See docs for more details. */
    tokenizerConfig?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetModelsRequest {
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
}

type index$f_CreateModelRequest = CreateModelRequest;
type index$f_GetModelsRequest = GetModelsRequest;
type index$f_PaginatedModels = PaginatedModels;
declare namespace index$f {
  export type { index$f_CreateModelRequest as CreateModelRequest, index$f_GetModelsRequest as GetModelsRequest, index$f_PaginatedModels as PaginatedModels };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Response containing observations with field-group-based filtering and cursor-based pagination.
 *
 * The `data` array contains observation objects with only the requested field groups included.
 * Use the `cursor` in `meta` to retrieve the next page of results.
 */
interface ObservationsV2Response {
    /** Array of observation objects. Fields included depend on the `fields` parameter in the request. */
    data: Record<string, unknown>[];
    meta: ObservationsV2Meta;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Metadata for cursor-based pagination
 */
interface ObservationsV2Meta {
    /** Base64-encoded cursor to use for retrieving the next page. If not present, there are no more results. */
    cursor?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {}
 */
interface GetObservationsV2Request {
    /**
     * Comma-separated list of field groups to include in the response.
     * Available groups: core, basic, time, io, metadata, model, usage, prompt, metrics.
     * If not specified, `core` and `basic` field groups are returned.
     * Example: "basic,usage,model"
     */
    fields?: string;
    /**
     * Comma-separated list of metadata keys to return non-truncated.
     * By default, metadata values over 200 characters are truncated.
     * Use this parameter to retrieve full values for specific keys.
     * Example: "key1,key2"
     */
    expandMetadata?: string;
    /** Number of items to return per page. Maximum 1000, default 50. */
    limit?: number;
    /** Base64-encoded cursor for pagination. Use the cursor from the previous response to get the next page. */
    cursor?: string;
    /**
     * Set to `true` to parse input/output fields as JSON, or `false` to return raw strings.
     * Defaults to `false` if not provided.
     */
    parseIoAsJson?: boolean;
    name?: string;
    userId?: string;
    /** Filter by observation type (e.g., "GENERATION", "SPAN", "EVENT", "AGENT", "TOOL", "CHAIN", "RETRIEVER", "EVALUATOR", "EMBEDDING", "GUARDRAIL") */
    type?: string;
    traceId?: string;
    /** Optional filter for observations with a specific level (e.g. "DEBUG", "DEFAULT", "WARNING", "ERROR"). */
    level?: ObservationLevel;
    parentObservationId?: string;
    /** Optional filter for observations where the environment is one of the provided values. */
    environment?: string | string[];
    /** Retrieve only observations with a start_time on or after this datetime (ISO 8601). */
    fromStartTime?: string;
    /** Retrieve only observations with a start_time before this datetime (ISO 8601). */
    toStartTime?: string;
    /** Optional filter to only include observations with a certain version. */
    version?: string;
    /**
     * JSON string containing an array of filter conditions. When provided, this takes precedence over query parameter filters (userId, name, type, level, environment, fromStartTime, ...).
     *
     * ## Filter Structure
     * Each filter condition has the following structure:
     * ```json
     * [
     *   {
     *     "type": string,           // Required. One of: "datetime", "string", "number", "stringOptions", "categoryOptions", "arrayOptions", "stringObject", "numberObject", "boolean", "null"
     *     "column": string,         // Required. Column to filter on (see available columns below)
     *     "operator": string,       // Required. Operator based on type:
     *                               // - datetime: ">", "<", ">=", "<="
     *                               // - string: "=", "contains", "does not contain", "starts with", "ends with"
     *                               // - stringOptions: "any of", "none of"
     *                               // - categoryOptions: "any of", "none of"
     *                               // - arrayOptions: "any of", "none of", "all of"
     *                               // - number: "=", ">", "<", ">=", "<="
     *                               // - stringObject: "=", "contains", "does not contain", "starts with", "ends with"
     *                               // - numberObject: "=", ">", "<", ">=", "<="
     *                               // - boolean: "=", "<>"
     *                               // - null: "is null", "is not null"
     *     "value": any,             // Required (except for null type). Value to compare against. Type depends on filter type
     *     "key": string             // Required only for stringObject, numberObject, and categoryOptions types when filtering on nested fields like metadata
     *   }
     * ]
     * ```
     *
     * ## Available Columns
     *
     * ### Core Observation Fields
     * - `id` (string) - Observation ID
     * - `type` (string) - Observation type (SPAN, GENERATION, EVENT)
     * - `name` (string) - Observation name
     * - `traceId` (string) - Associated trace ID
     * - `startTime` (datetime) - Observation start time
     * - `endTime` (datetime) - Observation end time
     * - `environment` (string) - Environment tag
     * - `level` (string) - Log level (DEBUG, DEFAULT, WARNING, ERROR)
     * - `statusMessage` (string) - Status message
     * - `version` (string) - Version tag
     * - `userId` (string) - User ID
     * - `sessionId` (string) - Session ID
     *
     * ### Trace-Related Fields
     * - `traceName` (string) - Name of the parent trace
     * - `traceTags` (arrayOptions) - Tags from the parent trace
     * - `tags` (arrayOptions) - Alias for traceTags
     *
     * ### Performance Metrics
     * - `latency` (number) - Latency in seconds (calculated: end_time - start_time)
     * - `timeToFirstToken` (number) - Time to first token in seconds
     * - `tokensPerSecond` (number) - Output tokens per second
     *
     * ### Token Usage
     * - `inputTokens` (number) - Number of input tokens
     * - `outputTokens` (number) - Number of output tokens
     * - `totalTokens` (number) - Total tokens (alias: `tokens`)
     *
     * ### Cost Metrics
     * - `inputCost` (number) - Input cost in USD
     * - `outputCost` (number) - Output cost in USD
     * - `totalCost` (number) - Total cost in USD
     *
     * ### Model Information
     * - `model` (string) - Provided model name (alias: `providedModelName`)
     * - `promptName` (string) - Associated prompt name
     * - `promptVersion` (number) - Associated prompt version
     *
     * ### Structured Data
     * - `metadata` (stringObject/numberObject/categoryOptions) - Metadata key-value pairs. Use `key` parameter to filter on specific metadata keys.
     *
     * ## Filter Examples
     * ```json
     * [
     *   {
     *     "type": "string",
     *     "column": "type",
     *     "operator": "=",
     *     "value": "GENERATION"
     *   },
     *   {
     *     "type": "number",
     *     "column": "latency",
     *     "operator": ">=",
     *     "value": 2.5
     *   },
     *   {
     *     "type": "stringObject",
     *     "column": "metadata",
     *     "key": "environment",
     *     "operator": "=",
     *     "value": "production"
     *   }
     * ]
     * ```
     */
    filter?: string;
}

type index$e_GetObservationsV2Request = GetObservationsV2Request;
type index$e_ObservationsV2Meta = ObservationsV2Meta;
type index$e_ObservationsV2Response = ObservationsV2Response;
declare namespace index$e {
  export type { index$e_GetObservationsV2Request as GetObservationsV2Request, index$e_ObservationsV2Meta as ObservationsV2Meta, index$e_ObservationsV2Response as ObservationsV2Response };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface Observations$1 {
    data: Observation[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ObservationsViews {
    data: ObservationsView[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {}
 */
interface GetObservationsRequest {
    /** Page number, starts at 1. */
    page?: number;
    /** Limit of items per page. If you encounter api issues due to too large page sizes, try to reduce the limit. */
    limit?: number;
    name?: string;
    userId?: string;
    type?: string;
    traceId?: string;
    /** Optional filter for observations with a specific level (e.g. "DEBUG", "DEFAULT", "WARNING", "ERROR"). */
    level?: ObservationLevel;
    parentObservationId?: string;
    /** Optional filter for observations where the environment is one of the provided values. */
    environment?: string | string[];
    /** Retrieve only observations with a start_time on or after this datetime (ISO 8601). */
    fromStartTime?: string;
    /** Retrieve only observations with a start_time before this datetime (ISO 8601). */
    toStartTime?: string;
    /** Optional filter to only include observations with a certain version. */
    version?: string;
    /**
     * JSON string containing an array of filter conditions. When provided, this takes precedence over query parameter filters (userId, name, type, level, environment, fromStartTime, ...).
     *
     * ## Filter Structure
     * Each filter condition has the following structure:
     * ```json
     * [
     *   {
     *     "type": string,           // Required. One of: "datetime", "string", "number", "stringOptions", "categoryOptions", "arrayOptions", "stringObject", "numberObject", "boolean", "null"
     *     "column": string,         // Required. Column to filter on (see available columns below)
     *     "operator": string,       // Required. Operator based on type:
     *                               // - datetime: ">", "<", ">=", "<="
     *                               // - string: "=", "contains", "does not contain", "starts with", "ends with"
     *                               // - stringOptions: "any of", "none of"
     *                               // - categoryOptions: "any of", "none of"
     *                               // - arrayOptions: "any of", "none of", "all of"
     *                               // - number: "=", ">", "<", ">=", "<="
     *                               // - stringObject: "=", "contains", "does not contain", "starts with", "ends with"
     *                               // - numberObject: "=", ">", "<", ">=", "<="
     *                               // - boolean: "=", "<>"
     *                               // - null: "is null", "is not null"
     *     "value": any,             // Required (except for null type). Value to compare against. Type depends on filter type
     *     "key": string             // Required only for stringObject, numberObject, and categoryOptions types when filtering on nested fields like metadata
     *   }
     * ]
     * ```
     *
     * ## Available Columns
     *
     * ### Core Observation Fields
     * - `id` (string) - Observation ID
     * - `type` (string) - Observation type (SPAN, GENERATION, EVENT)
     * - `name` (string) - Observation name
     * - `traceId` (string) - Associated trace ID
     * - `startTime` (datetime) - Observation start time
     * - `endTime` (datetime) - Observation end time
     * - `environment` (string) - Environment tag
     * - `level` (string) - Log level (DEBUG, DEFAULT, WARNING, ERROR)
     * - `statusMessage` (string) - Status message
     * - `version` (string) - Version tag
     *
     * ### Performance Metrics
     * - `latency` (number) - Latency in seconds (calculated: end_time - start_time)
     * - `timeToFirstToken` (number) - Time to first token in seconds
     * - `tokensPerSecond` (number) - Output tokens per second
     *
     * ### Token Usage
     * - `inputTokens` (number) - Number of input tokens
     * - `outputTokens` (number) - Number of output tokens
     * - `totalTokens` (number) - Total tokens (alias: `tokens`)
     *
     * ### Cost Metrics
     * - `inputCost` (number) - Input cost in USD
     * - `outputCost` (number) - Output cost in USD
     * - `totalCost` (number) - Total cost in USD
     *
     * ### Model Information
     * - `model` (string) - Provided model name
     * - `promptName` (string) - Associated prompt name
     * - `promptVersion` (number) - Associated prompt version
     *
     * ### Structured Data
     * - `metadata` (stringObject/numberObject/categoryOptions) - Metadata key-value pairs. Use `key` parameter to filter on specific metadata keys.
     *
     * ### Associated Trace Fields (requires join with traces table)
     * - `userId` (string) - User ID from associated trace
     * - `traceName` (string) - Name from associated trace
     * - `traceEnvironment` (string) - Environment from associated trace
     * - `traceTags` (arrayOptions) - Tags from associated trace
     *
     * ## Filter Examples
     * ```json
     * [
     *   {
     *     "type": "string",
     *     "column": "type",
     *     "operator": "=",
     *     "value": "GENERATION"
     *   },
     *   {
     *     "type": "number",
     *     "column": "latency",
     *     "operator": ">=",
     *     "value": 2.5
     *   },
     *   {
     *     "type": "stringObject",
     *     "column": "metadata",
     *     "key": "environment",
     *     "operator": "=",
     *     "value": "production"
     *   }
     * ]
     * ```
     */
    filter?: string;
}

type index$d_GetObservationsRequest = GetObservationsRequest;
type index$d_ObservationsViews = ObservationsViews;
declare namespace index$d {
  export type { index$d_GetObservationsRequest as GetObservationsRequest, Observations$1 as Observations, index$d_ObservationsViews as ObservationsViews };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Represents a collection of spans from a single resource as per OTLP specification
 */
interface OtelResourceSpan {
    /** Resource information */
    resource?: OtelResource;
    /** Array of scope spans */
    scopeSpans?: OtelScopeSpan[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Resource attributes identifying the source of telemetry
 */
interface OtelResource {
    /** Resource attributes like service.name, service.version, etc. */
    attributes?: OtelAttribute[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Collection of spans from a single instrumentation scope
 */
interface OtelScopeSpan {
    /** Instrumentation scope information */
    scope?: OtelScope;
    /** Array of spans */
    spans?: OtelSpan[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Instrumentation scope information
 */
interface OtelScope {
    /** Instrumentation scope name */
    name?: string;
    /** Instrumentation scope version */
    version?: string;
    /** Additional scope attributes */
    attributes?: OtelAttribute[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Individual span representing a unit of work or operation
 */
interface OtelSpan {
    /** Trace ID (16 bytes, hex-encoded string in JSON or Buffer in binary) */
    traceId?: unknown;
    /** Span ID (8 bytes, hex-encoded string in JSON or Buffer in binary) */
    spanId?: unknown;
    /** Parent span ID if this is a child span */
    parentSpanId?: unknown;
    /** Span name describing the operation */
    name?: string;
    /** Span kind (1=INTERNAL, 2=SERVER, 3=CLIENT, 4=PRODUCER, 5=CONSUMER) */
    kind?: number;
    /** Start time in nanoseconds since Unix epoch */
    startTimeUnixNano?: unknown;
    /** End time in nanoseconds since Unix epoch */
    endTimeUnixNano?: unknown;
    /** Span attributes including Langfuse-specific attributes (langfuse.observation.*) */
    attributes?: OtelAttribute[];
    /** Span status object */
    status?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * Key-value attribute pair for resources, scopes, or spans
 */
interface OtelAttribute {
    /** Attribute key (e.g., "service.name", "langfuse.observation.type") */
    key?: string;
    /** Attribute value */
    value?: OtelAttributeValue;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Attribute value wrapper supporting different value types
 */
interface OtelAttributeValue {
    /** String value */
    stringValue?: string;
    /** Integer value */
    intValue?: number;
    /** Double value */
    doubleValue?: number;
    /** Boolean value */
    boolValue?: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Response from trace export request. Empty object indicates success.
 */
interface OtelTraceResponse {
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         resourceSpans: [{
 *                 resource: {
 *                     attributes: [{
 *                             key: "service.name",
 *                             value: {
 *                                 stringValue: "my-service"
 *                             }
 *                         }, {
 *                             key: "service.version",
 *                             value: {
 *                                 stringValue: "1.0.0"
 *                             }
 *                         }]
 *                 },
 *                 scopeSpans: [{
 *                         scope: {
 *                             name: "langfuse-sdk",
 *                             version: "2.60.3"
 *                         },
 *                         spans: [{
 *                                 traceId: "0123456789abcdef0123456789abcdef",
 *                                 spanId: "0123456789abcdef",
 *                                 name: "my-operation",
 *                                 kind: 1,
 *                                 startTimeUnixNano: "1747872000000000000",
 *                                 endTimeUnixNano: "1747872001000000000",
 *                                 attributes: [{
 *                                         key: "langfuse.observation.type",
 *                                         value: {
 *                                             stringValue: "generation"
 *                                         }
 *                                     }],
 *                                 status: {}
 *                             }]
 *                     }]
 *             }]
 *     }
 */
interface OtelTraceRequest {
    /** Array of resource spans containing trace data as defined in the OTLP specification */
    resourceSpans: OtelResourceSpan[];
}

type index$c_OtelAttribute = OtelAttribute;
type index$c_OtelAttributeValue = OtelAttributeValue;
type index$c_OtelResource = OtelResource;
type index$c_OtelResourceSpan = OtelResourceSpan;
type index$c_OtelScope = OtelScope;
type index$c_OtelScopeSpan = OtelScopeSpan;
type index$c_OtelSpan = OtelSpan;
type index$c_OtelTraceRequest = OtelTraceRequest;
type index$c_OtelTraceResponse = OtelTraceResponse;
declare namespace index$c {
  export type { index$c_OtelAttribute as OtelAttribute, index$c_OtelAttributeValue as OtelAttributeValue, index$c_OtelResource as OtelResource, index$c_OtelResourceSpan as OtelResourceSpan, index$c_OtelScope as OtelScope, index$c_OtelScopeSpan as OtelScopeSpan, index$c_OtelSpan as OtelSpan, index$c_OtelTraceRequest as OtelTraceRequest, index$c_OtelTraceResponse as OtelTraceResponse };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type MembershipRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
declare const MembershipRole: {
    readonly Owner: "OWNER";
    readonly Admin: "ADMIN";
    readonly Member: "MEMBER";
    readonly Viewer: "VIEWER";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface MembershipRequest {
    userId: string;
    role: MembershipRole;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DeleteMembershipRequest {
    userId: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface MembershipResponse {
    userId: string;
    role: MembershipRole;
    email: string;
    name: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface MembershipDeletionResponse {
    message: string;
    userId: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface MembershipsResponse {
    memberships: MembershipResponse[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface OrganizationProject {
    id: string;
    name: string;
    metadata?: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface OrganizationProjectsResponse {
    projects: OrganizationProject[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface OrganizationApiKey {
    id: string;
    createdAt: string;
    expiresAt?: string;
    lastUsedAt?: string;
    note?: string;
    publicKey: string;
    displaySecretKey: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface OrganizationApiKeysResponse {
    apiKeys: OrganizationApiKey[];
}

type index$b_DeleteMembershipRequest = DeleteMembershipRequest;
type index$b_MembershipDeletionResponse = MembershipDeletionResponse;
type index$b_MembershipRequest = MembershipRequest;
type index$b_MembershipResponse = MembershipResponse;
declare const index$b_MembershipRole: typeof MembershipRole;
type index$b_MembershipsResponse = MembershipsResponse;
type index$b_OrganizationApiKey = OrganizationApiKey;
type index$b_OrganizationApiKeysResponse = OrganizationApiKeysResponse;
type index$b_OrganizationProject = OrganizationProject;
type index$b_OrganizationProjectsResponse = OrganizationProjectsResponse;
declare namespace index$b {
  export { type index$b_DeleteMembershipRequest as DeleteMembershipRequest, type index$b_MembershipDeletionResponse as MembershipDeletionResponse, type index$b_MembershipRequest as MembershipRequest, type index$b_MembershipResponse as MembershipResponse, index$b_MembershipRole as MembershipRole, type index$b_MembershipsResponse as MembershipsResponse, type index$b_OrganizationApiKey as OrganizationApiKey, type index$b_OrganizationApiKeysResponse as OrganizationApiKeysResponse, type index$b_OrganizationProject as OrganizationProject, type index$b_OrganizationProjectsResponse as OrganizationProjectsResponse };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface Projects$1 {
    data: Project[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface Organization {
    /** The unique identifier of the organization */
    id: string;
    /** The name of the organization */
    name: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface Project {
    id: string;
    name: string;
    /** The organization this project belongs to */
    organization: Organization;
    /** Metadata for the project */
    metadata: Record<string, unknown>;
    /** Number of days to retain data. Null or 0 means no retention. Omitted if no retention is configured. */
    retentionDays?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ProjectDeletionResponse {
    success: boolean;
    message: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * List of API keys for a project
 */
interface ApiKeyList {
    apiKeys: ApiKeySummary[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Summary of an API key
 */
interface ApiKeySummary {
    id: string;
    createdAt: string;
    expiresAt?: string;
    lastUsedAt?: string;
    note?: string;
    publicKey: string;
    displaySecretKey: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Response for API key creation
 */
interface ApiKeyResponse {
    id: string;
    createdAt: string;
    publicKey: string;
    secretKey: string;
    displaySecretKey: string;
    note?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Response for API key deletion
 */
interface ApiKeyDeletionResponse {
    success: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         name: "name",
 *         metadata: undefined,
 *         retention: 1
 *     }
 */
interface CreateProjectRequest {
    name: string;
    /** Optional metadata for the project */
    metadata?: Record<string, unknown>;
    /** Number of days to retain data. Must be 0 or at least 3 days. Requires data-retention entitlement for non-zero values. Optional. */
    retention: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         name: "name",
 *         metadata: undefined,
 *         retention: undefined
 *     }
 */
interface UpdateProjectRequest {
    name: string;
    /** Optional metadata for the project */
    metadata?: Record<string, unknown>;
    /**
     * Number of days to retain data.
     * Must be 0 or at least 3 days.
     * Requires data-retention entitlement for non-zero values.
     * Optional. Will retain existing retention setting if omitted.
     */
    retention?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         note: undefined,
 *         publicKey: undefined,
 *         secretKey: undefined
 *     }
 */
interface CreateApiKeyRequest {
    /** Optional note for the API key */
    note?: string;
    /** Optional predefined public key. Must start with 'pk-lf-'. If provided, secretKey must also be provided. */
    publicKey?: string;
    /** Optional predefined secret key. Must start with 'sk-lf-'. If provided, publicKey must also be provided. */
    secretKey?: string;
}

type index$a_ApiKeyDeletionResponse = ApiKeyDeletionResponse;
type index$a_ApiKeyList = ApiKeyList;
type index$a_ApiKeyResponse = ApiKeyResponse;
type index$a_ApiKeySummary = ApiKeySummary;
type index$a_CreateApiKeyRequest = CreateApiKeyRequest;
type index$a_CreateProjectRequest = CreateProjectRequest;
type index$a_Organization = Organization;
type index$a_Project = Project;
type index$a_ProjectDeletionResponse = ProjectDeletionResponse;
type index$a_UpdateProjectRequest = UpdateProjectRequest;
declare namespace index$a {
  export type { index$a_ApiKeyDeletionResponse as ApiKeyDeletionResponse, index$a_ApiKeyList as ApiKeyList, index$a_ApiKeyResponse as ApiKeyResponse, index$a_ApiKeySummary as ApiKeySummary, index$a_CreateApiKeyRequest as CreateApiKeyRequest, index$a_CreateProjectRequest as CreateProjectRequest, index$a_Organization as Organization, index$a_Project as Project, index$a_ProjectDeletionResponse as ProjectDeletionResponse, Projects$1 as Projects, index$a_UpdateProjectRequest as UpdateProjectRequest };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PromptMetaListResponse {
    data: PromptMeta[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PromptMeta {
    name: string;
    /** Indicates whether the prompt is a text or chat prompt. */
    type: PromptType;
    versions: number[];
    labels: string[];
    tags: string[];
    lastUpdatedAt: string;
    /** Config object of the most recent prompt version that matches the filters (if any are provided) */
    lastConfig?: unknown;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type CreatePromptRequest = CreatePromptRequest.Chat | CreatePromptRequest.Text;
declare namespace CreatePromptRequest {
    interface Chat extends CreateChatPromptRequest {
        type: "chat";
    }
    interface Text extends CreateTextPromptRequest {
        type: "text";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateChatPromptRequest {
    name: string;
    prompt: ChatMessageWithPlaceholders[];
    config?: unknown;
    /** List of deployment labels of this prompt version. */
    labels?: string[];
    /** List of tags to apply to all versions of this prompt. */
    tags?: string[];
    /** Commit message for this prompt version. */
    commitMessage?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateTextPromptRequest {
    name: string;
    prompt: string;
    config?: unknown;
    /** List of deployment labels of this prompt version. */
    labels?: string[];
    /** List of tags to apply to all versions of this prompt. */
    tags?: string[];
    /** Commit message for this prompt version. */
    commitMessage?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type Prompt = Prompt.Chat | Prompt.Text;
declare namespace Prompt {
    interface Chat extends ChatPrompt {
        type: "chat";
    }
    interface Text extends TextPrompt {
        type: "text";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
type PromptType = "chat" | "text";
declare const PromptType: {
    readonly Chat: "chat";
    readonly Text: "text";
};

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface BasePrompt {
    name: string;
    version: number;
    config?: unknown;
    /** List of deployment labels of this prompt version. */
    labels: string[];
    /** List of tags. Used to filter via UI and API. The same across versions of a prompt. */
    tags: string[];
    /** Commit message for this prompt version. */
    commitMessage?: string;
    /** The dependency resolution graph for the current prompt. Null if prompt has no dependencies. */
    resolutionGraph?: Record<string, unknown>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type ChatMessageWithPlaceholders = ChatMessageWithPlaceholders.Chatmessage | ChatMessageWithPlaceholders.Placeholder;
declare namespace ChatMessageWithPlaceholders {
    interface Chatmessage extends ChatMessage {
        type: "chatmessage";
    }
    interface Placeholder extends PlaceholderMessage {
        type: "placeholder";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ChatMessage {
    role: string;
    content: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface PlaceholderMessage {
    name: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface TextPrompt extends BasePrompt {
    prompt: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ChatPrompt extends BasePrompt {
    prompt: ChatMessageWithPlaceholders[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetPromptRequest {
    /** Version of the prompt to be retrieved. */
    version?: number;
    /** Label of the prompt to be retrieved. Defaults to "production" if no label or version is set. */
    label?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface ListPromptsMetaRequest {
    name?: string;
    label?: string;
    tag?: string;
    /** page number, starts at 1 */
    page?: number;
    /** limit of items per page */
    limit?: number;
    /** Optional filter to only include prompt versions created/updated on or after a certain datetime (ISO 8601) */
    fromUpdatedAt?: string;
    /** Optional filter to only include prompt versions created/updated before a certain datetime (ISO 8601) */
    toUpdatedAt?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface DeletePromptRequest {
    /** Optional label to filter deletion. If specified, deletes all prompt versions that have this label. */
    label?: string;
    /** Optional version to filter deletion. If specified, deletes only this specific version of the prompt. */
    version?: number;
}

type index$9_BasePrompt = BasePrompt;
type index$9_ChatMessage = ChatMessage;
declare const index$9_ChatMessageWithPlaceholders: typeof ChatMessageWithPlaceholders;
type index$9_ChatPrompt = ChatPrompt;
type index$9_CreateChatPromptRequest = CreateChatPromptRequest;
declare const index$9_CreatePromptRequest: typeof CreatePromptRequest;
type index$9_CreateTextPromptRequest = CreateTextPromptRequest;
type index$9_DeletePromptRequest = DeletePromptRequest;
type index$9_GetPromptRequest = GetPromptRequest;
type index$9_ListPromptsMetaRequest = ListPromptsMetaRequest;
type index$9_PlaceholderMessage = PlaceholderMessage;
declare const index$9_Prompt: typeof Prompt;
type index$9_PromptMeta = PromptMeta;
type index$9_PromptMetaListResponse = PromptMetaListResponse;
declare const index$9_PromptType: typeof PromptType;
type index$9_TextPrompt = TextPrompt;
declare namespace index$9 {
  export { type index$9_BasePrompt as BasePrompt, type index$9_ChatMessage as ChatMessage, index$9_ChatMessageWithPlaceholders as ChatMessageWithPlaceholders, type index$9_ChatPrompt as ChatPrompt, type index$9_CreateChatPromptRequest as CreateChatPromptRequest, index$9_CreatePromptRequest as CreatePromptRequest, type index$9_CreateTextPromptRequest as CreateTextPromptRequest, type index$9_DeletePromptRequest as DeletePromptRequest, type index$9_GetPromptRequest as GetPromptRequest, type index$9_ListPromptsMetaRequest as ListPromptsMetaRequest, type index$9_PlaceholderMessage as PlaceholderMessage, index$9_Prompt as Prompt, type index$9_PromptMeta as PromptMeta, type index$9_PromptMetaListResponse as PromptMetaListResponse, index$9_PromptType as PromptType, type index$9_TextPrompt as TextPrompt };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ServiceProviderConfig {
    schemas: string[];
    documentationUri: string;
    patch: ScimFeatureSupport;
    bulk: BulkConfig;
    filter: FilterConfig;
    changePassword: ScimFeatureSupport;
    sort: ScimFeatureSupport;
    etag: ScimFeatureSupport;
    authenticationSchemes: AuthenticationScheme[];
    meta: ResourceMeta;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ScimFeatureSupport {
    supported: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface BulkConfig {
    supported: boolean;
    maxOperations: number;
    maxPayloadSize: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface FilterConfig {
    supported: boolean;
    maxResults: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ResourceMeta {
    resourceType: string;
    location: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface AuthenticationScheme {
    name: string;
    description: string;
    specUri: string;
    type: string;
    primary: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ResourceTypesResponse {
    schemas: string[];
    totalResults: number;
    Resources: ResourceType[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ResourceType {
    schemas?: string[];
    id: string;
    name: string;
    endpoint: string;
    description: string;
    schema: string;
    schemaExtensions: SchemaExtension[];
    meta: ResourceMeta;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface SchemaExtension {
    schema: string;
    required: boolean;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface SchemasResponse {
    schemas: string[];
    totalResults: number;
    Resources: SchemaResource[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface SchemaResource {
    id: string;
    name: string;
    description: string;
    attributes: unknown[];
    meta: ResourceMeta;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ScimUsersListResponse {
    schemas: string[];
    totalResults: number;
    startIndex: number;
    itemsPerPage: number;
    Resources: ScimUser[];
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ScimUser {
    schemas: string[];
    id: string;
    userName: string;
    name: ScimName;
    emails: ScimEmail[];
    meta: UserMeta;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface UserMeta {
    resourceType: string;
    created?: string;
    lastModified?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ScimName {
    formatted?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface ScimEmail {
    primary: boolean;
    value: string;
    type: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * Empty response for 204 No Content responses
 */
interface EmptyResponse {
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface ListUsersRequest {
    /** Filter expression (e.g. userName eq "value") */
    filter?: string;
    /** 1-based index of the first result to return (default 1) */
    startIndex?: number;
    /** Maximum number of results to return (default 100) */
    count?: number;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         userName: "userName",
 *         name: {
 *             formatted: undefined
 *         },
 *         emails: undefined,
 *         active: undefined,
 *         password: undefined
 *     }
 */
interface CreateUserRequest {
    /** User's email address (required) */
    userName: string;
    /** User's name information */
    name: ScimName;
    /** User's email addresses */
    emails?: ScimEmail[];
    /** Whether the user is active */
    active?: boolean;
    /** Initial password for the user */
    password?: string;
}

type index$8_AuthenticationScheme = AuthenticationScheme;
type index$8_BulkConfig = BulkConfig;
type index$8_CreateUserRequest = CreateUserRequest;
type index$8_EmptyResponse = EmptyResponse;
type index$8_FilterConfig = FilterConfig;
type index$8_ListUsersRequest = ListUsersRequest;
type index$8_ResourceMeta = ResourceMeta;
type index$8_ResourceType = ResourceType;
type index$8_ResourceTypesResponse = ResourceTypesResponse;
type index$8_SchemaExtension = SchemaExtension;
type index$8_SchemaResource = SchemaResource;
type index$8_SchemasResponse = SchemasResponse;
type index$8_ScimEmail = ScimEmail;
type index$8_ScimFeatureSupport = ScimFeatureSupport;
type index$8_ScimName = ScimName;
type index$8_ScimUser = ScimUser;
type index$8_ScimUsersListResponse = ScimUsersListResponse;
type index$8_ServiceProviderConfig = ServiceProviderConfig;
type index$8_UserMeta = UserMeta;
declare namespace index$8 {
  export type { index$8_AuthenticationScheme as AuthenticationScheme, index$8_BulkConfig as BulkConfig, index$8_CreateUserRequest as CreateUserRequest, index$8_EmptyResponse as EmptyResponse, index$8_FilterConfig as FilterConfig, index$8_ListUsersRequest as ListUsersRequest, index$8_ResourceMeta as ResourceMeta, index$8_ResourceType as ResourceType, index$8_ResourceTypesResponse as ResourceTypesResponse, index$8_SchemaExtension as SchemaExtension, index$8_SchemaResource as SchemaResource, index$8_SchemasResponse as SchemasResponse, index$8_ScimEmail as ScimEmail, index$8_ScimFeatureSupport as ScimFeatureSupport, index$8_ScimName as ScimName, index$8_ScimUser as ScimUser, index$8_ScimUsersListResponse as ScimUsersListResponse, index$8_ServiceProviderConfig as ServiceProviderConfig, index$8_UserMeta as UserMeta };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface ScoreConfigs$1 {
    data: ScoreConfig[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface CreateScoreConfigRequest {
    name: string;
    dataType: ScoreConfigDataType;
    /** Configure custom categories for categorical scores. Pass a list of objects with `label` and `value` properties. Categories are autogenerated for boolean configs and cannot be passed */
    categories?: ConfigCategory[];
    /** Configure a minimum value for numerical scores. If not set, the minimum value defaults to -∞ */
    minValue?: number;
    /** Configure a maximum value for numerical scores. If not set, the maximum value defaults to +∞ */
    maxValue?: number;
    /** Description is shown across the Langfuse UI and can be used to e.g. explain the config categories in detail, why a numeric range was set, or provide additional context on config name or usage */
    description?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface UpdateScoreConfigRequest {
    /** The status of the score config showing if it is archived or not */
    isArchived?: boolean;
    /** The name of the score config */
    name?: string;
    /** Configure custom categories for categorical scores. Pass a list of objects with `label` and `value` properties. Categories are autogenerated for boolean configs and cannot be passed */
    categories?: ConfigCategory[];
    /** Configure a minimum value for numerical scores. If not set, the minimum value defaults to -∞ */
    minValue?: number;
    /** Configure a maximum value for numerical scores. If not set, the maximum value defaults to +∞ */
    maxValue?: number;
    /** Description is shown across the Langfuse UI and can be used to e.g. explain the config categories in detail, why a numeric range was set, or provide additional context on config name or usage */
    description?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetScoreConfigsRequest {
    /** Page number, starts at 1. */
    page?: number;
    /** Limit of items per page. If you encounter api issues due to too large page sizes, try to reduce the limit */
    limit?: number;
}

type index$7_CreateScoreConfigRequest = CreateScoreConfigRequest;
type index$7_GetScoreConfigsRequest = GetScoreConfigsRequest;
type index$7_UpdateScoreConfigRequest = UpdateScoreConfigRequest;
declare namespace index$7 {
  export type { index$7_CreateScoreConfigRequest as CreateScoreConfigRequest, index$7_GetScoreConfigsRequest as GetScoreConfigsRequest, ScoreConfigs$1 as ScoreConfigs, index$7_UpdateScoreConfigRequest as UpdateScoreConfigRequest };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface GetScoresResponseTraceData {
    /** The user ID associated with the trace referenced by score */
    userId?: string;
    /** A list of tags associated with the trace referenced by score */
    tags?: string[];
    /** The environment of the trace referenced by score */
    environment?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetScoresResponseDataNumeric extends NumericScore {
    trace?: GetScoresResponseTraceData;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetScoresResponseDataCategorical extends CategoricalScore {
    trace?: GetScoresResponseTraceData;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetScoresResponseDataBoolean extends BooleanScore {
    trace?: GetScoresResponseTraceData;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetScoresResponseDataCorrection extends CorrectionScore {
    trace?: GetScoresResponseTraceData;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

type GetScoresResponseData = GetScoresResponseData.Numeric | GetScoresResponseData.Categorical | GetScoresResponseData.Boolean | GetScoresResponseData.Correction;
declare namespace GetScoresResponseData {
    interface Numeric extends GetScoresResponseDataNumeric {
        dataType: "NUMERIC";
    }
    interface Categorical extends GetScoresResponseDataCategorical {
        dataType: "CATEGORICAL";
    }
    interface Boolean extends GetScoresResponseDataBoolean {
        dataType: "BOOLEAN";
    }
    interface Correction extends GetScoresResponseDataCorrection {
        dataType: "CORRECTION";
    }
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface GetScoresResponse {
    data: GetScoresResponseData[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {}
 */
interface GetScoresRequest {
    /** Page number, starts at 1. */
    page?: number;
    /** Limit of items per page. If you encounter api issues due to too large page sizes, try to reduce the limit. */
    limit?: number;
    /** Retrieve only scores with this userId associated to the trace. */
    userId?: string;
    /** Retrieve only scores with this name. */
    name?: string;
    /** Optional filter to only include scores created on or after a certain datetime (ISO 8601) */
    fromTimestamp?: string;
    /** Optional filter to only include scores created before a certain datetime (ISO 8601) */
    toTimestamp?: string;
    /** Optional filter for scores where the environment is one of the provided values. */
    environment?: string | string[];
    /** Retrieve only scores from a specific source. */
    source?: ScoreSource;
    /** Retrieve only scores with <operator> value. */
    operator?: string;
    /** Retrieve only scores with <operator> value. */
    value?: number;
    /** Comma-separated list of score IDs to limit the results to. */
    scoreIds?: string;
    /** Retrieve only scores with a specific configId. */
    configId?: string;
    /** Retrieve only scores with a specific sessionId. */
    sessionId?: string;
    /** Retrieve only scores with a specific datasetRunId. */
    datasetRunId?: string;
    /** Retrieve only scores with a specific traceId. */
    traceId?: string;
    /** Comma-separated list of observation IDs to filter scores by. */
    observationId?: string;
    /** Retrieve only scores with a specific annotation queueId. */
    queueId?: string;
    /** Retrieve only scores with a specific dataType. */
    dataType?: ScoreDataType;
    /** Only scores linked to traces that include all of these tags will be returned. */
    traceTags?: string | string[];
    /** Comma-separated list of field groups to include in the response. Available field groups: 'score' (core score fields), 'trace' (trace properties: userId, tags, environment). If not specified, both 'score' and 'trace' are returned by default. Example: 'score' to exclude trace data, 'score,trace' to include both. Note: When filtering by trace properties (using userId or traceTags parameters), the 'trace' field group must be included, otherwise a 400 error will be returned. */
    fields?: string;
}

type index$6_GetScoresRequest = GetScoresRequest;
type index$6_GetScoresResponse = GetScoresResponse;
declare const index$6_GetScoresResponseData: typeof GetScoresResponseData;
type index$6_GetScoresResponseDataBoolean = GetScoresResponseDataBoolean;
type index$6_GetScoresResponseDataCategorical = GetScoresResponseDataCategorical;
type index$6_GetScoresResponseDataCorrection = GetScoresResponseDataCorrection;
type index$6_GetScoresResponseDataNumeric = GetScoresResponseDataNumeric;
type index$6_GetScoresResponseTraceData = GetScoresResponseTraceData;
declare namespace index$6 {
  export { type index$6_GetScoresRequest as GetScoresRequest, type index$6_GetScoresResponse as GetScoresResponse, index$6_GetScoresResponseData as GetScoresResponseData, type index$6_GetScoresResponseDataBoolean as GetScoresResponseDataBoolean, type index$6_GetScoresResponseDataCategorical as GetScoresResponseDataCategorical, type index$6_GetScoresResponseDataCorrection as GetScoresResponseDataCorrection, type index$6_GetScoresResponseDataNumeric as GetScoresResponseDataNumeric, type index$6_GetScoresResponseTraceData as GetScoresResponseTraceData };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

/**
 * @example
 *     {
 *         name: "novelty",
 *         value: 0.9,
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "consistency",
 *         value: 1.2,
 *         dataType: LangfuseAPI.ScoreDataType.Numeric,
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "accuracy",
 *         value: 0.9,
 *         dataType: LangfuseAPI.ScoreDataType.Numeric,
 *         configId: "9203-4567-89ab-cdef",
 *         traceId: "cdef-1234-5678-90ab",
 *         environment: "test"
 *     }
 *
 * @example
 *     {
 *         name: "toxicity",
 *         value: "not toxic",
 *         traceId: "cdef-1234-5678-90ab",
 *         environment: "production"
 *     }
 *
 * @example
 *     {
 *         name: "correctness",
 *         value: "partially correct",
 *         dataType: LangfuseAPI.ScoreDataType.Categorical,
 *         configId: "1234-5678-90ab-cdef",
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "hallucination",
 *         value: 0,
 *         dataType: LangfuseAPI.ScoreDataType.Boolean,
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 *
 * @example
 *     {
 *         name: "helpfulness",
 *         value: 1,
 *         dataType: LangfuseAPI.ScoreDataType.Boolean,
 *         configId: "1234-5678-90ab-cdef",
 *         traceId: "cdef-1234-5678-90ab"
 *     }
 */
interface CreateScoreRequest {
    id?: string;
    traceId?: string;
    sessionId?: string;
    observationId?: string;
    datasetRunId?: string;
    name: string;
    /** The value of the score. Must be passed as string for categorical scores, and numeric for boolean and numeric scores. Boolean score values must equal either 1 or 0 (true or false) */
    value: CreateScoreValue;
    comment?: string;
    metadata?: Record<string, unknown>;
    /** The environment of the score. Can be any lowercase alphanumeric string with hyphens and underscores that does not start with 'langfuse'. */
    environment?: string;
    /** The annotation queue referenced by the score. Indicates if score was initially created while processing annotation queue. */
    queueId?: string;
    /** The data type of the score. When passing a configId this field is inferred. Otherwise, this field must be passed or will default to numeric. */
    dataType?: ScoreDataType;
    /** Reference a score config on a score. The unique langfuse identifier of a score config. When passing this field, the dataType and stringValue fields are automatically populated. */
    configId?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface CreateScoreResponse {
    /** The id of the created object in Langfuse */
    id: string;
}

type index$5_CreateScoreRequest = CreateScoreRequest;
type index$5_CreateScoreResponse = CreateScoreResponse;
declare namespace index$5 {
  export type { index$5_CreateScoreRequest as CreateScoreRequest, index$5_CreateScoreResponse as CreateScoreResponse };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface PaginatedSessions {
    data: Session[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetSessionsRequest {
    /** Page number, starts at 1 */
    page?: number;
    /** Limit of items per page. If you encounter api issues due to too large page sizes, try to reduce the limit. */
    limit?: number;
    /** Optional filter to only include sessions created on or after a certain datetime (ISO 8601) */
    fromTimestamp?: string;
    /** Optional filter to only include sessions created before a certain datetime (ISO 8601) */
    toTimestamp?: string;
    /** Optional filter for sessions where the environment is one of the provided values. */
    environment?: string | string[];
}

type index$4_GetSessionsRequest = GetSessionsRequest;
type index$4_PaginatedSessions = PaginatedSessions;
declare namespace index$4 {
  export type { index$4_GetSessionsRequest as GetSessionsRequest, index$4_PaginatedSessions as PaginatedSessions };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

interface Traces {
    data: TraceWithDetails[];
    meta: MetaResponse;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface DeleteTraceResponse {
    message: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface Sort {
    id: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {}
 */
interface GetTracesRequest {
    /** Page number, starts at 1 */
    page?: number;
    /** Limit of items per page. If you encounter api issues due to too large page sizes, try to reduce the limit. */
    limit?: number;
    userId?: string;
    name?: string;
    sessionId?: string;
    /** Optional filter to only include traces with a trace.timestamp on or after a certain datetime (ISO 8601) */
    fromTimestamp?: string;
    /** Optional filter to only include traces with a trace.timestamp before a certain datetime (ISO 8601) */
    toTimestamp?: string;
    /** Format of the string [field].[asc/desc]. Fields: id, timestamp, name, userId, release, version, public, bookmarked, sessionId. Example: timestamp.asc */
    orderBy?: string;
    /** Only traces that include all of these tags will be returned. */
    tags?: string | string[];
    /** Optional filter to only include traces with a certain version. */
    version?: string;
    /** Optional filter to only include traces with a certain release. */
    release?: string;
    /** Optional filter for traces where the environment is one of the provided values. */
    environment?: string | string[];
    /** Comma-separated list of fields to include in the response. Available field groups: 'core' (always included), 'io' (input, output, metadata), 'scores', 'observations', 'metrics'. If not specified, all fields are returned. Example: 'core,scores,metrics'. Note: Excluded 'observations' or 'scores' fields return empty arrays; excluded 'metrics' returns -1 for 'totalCost' and 'latency'. */
    fields?: string;
    /**
     * JSON string containing an array of filter conditions. When provided, this takes precedence over query parameter filters (userId, name, sessionId, tags, version, release, environment, fromTimestamp, toTimestamp).
     *
     * ## Filter Structure
     * Each filter condition has the following structure:
     * ```json
     * [
     *   {
     *     "type": string,           // Required. One of: "datetime", "string", "number", "stringOptions", "categoryOptions", "arrayOptions", "stringObject", "numberObject", "boolean", "null"
     *     "column": string,         // Required. Column to filter on (see available columns below)
     *     "operator": string,       // Required. Operator based on type:
     *                               // - datetime: ">", "<", ">=", "<="
     *                               // - string: "=", "contains", "does not contain", "starts with", "ends with"
     *                               // - stringOptions: "any of", "none of"
     *                               // - categoryOptions: "any of", "none of"
     *                               // - arrayOptions: "any of", "none of", "all of"
     *                               // - number: "=", ">", "<", ">=", "<="
     *                               // - stringObject: "=", "contains", "does not contain", "starts with", "ends with"
     *                               // - numberObject: "=", ">", "<", ">=", "<="
     *                               // - boolean: "=", "<>"
     *                               // - null: "is null", "is not null"
     *     "value": any,             // Required (except for null type). Value to compare against. Type depends on filter type
     *     "key": string             // Required only for stringObject, numberObject, and categoryOptions types when filtering on nested fields like metadata
     *   }
     * ]
     * ```
     *
     * ## Available Columns
     *
     * ### Core Trace Fields
     * - `id` (string) - Trace ID
     * - `name` (string) - Trace name
     * - `timestamp` (datetime) - Trace timestamp
     * - `userId` (string) - User ID
     * - `sessionId` (string) - Session ID
     * - `environment` (string) - Environment tag
     * - `version` (string) - Version tag
     * - `release` (string) - Release tag
     * - `tags` (arrayOptions) - Array of tags
     * - `bookmarked` (boolean) - Bookmark status
     *
     * ### Structured Data
     * - `metadata` (stringObject/numberObject/categoryOptions) - Metadata key-value pairs. Use `key` parameter to filter on specific metadata keys.
     *
     * ### Aggregated Metrics (from observations)
     * These metrics are aggregated from all observations within the trace:
     * - `latency` (number) - Latency in seconds (time from first observation start to last observation end)
     * - `inputTokens` (number) - Total input tokens across all observations
     * - `outputTokens` (number) - Total output tokens across all observations
     * - `totalTokens` (number) - Total tokens (alias: `tokens`)
     * - `inputCost` (number) - Total input cost in USD
     * - `outputCost` (number) - Total output cost in USD
     * - `totalCost` (number) - Total cost in USD
     *
     * ### Observation Level Aggregations
     * These fields aggregate observation levels within the trace:
     * - `level` (string) - Highest severity level (ERROR > WARNING > DEFAULT > DEBUG)
     * - `warningCount` (number) - Count of WARNING level observations
     * - `errorCount` (number) - Count of ERROR level observations
     * - `defaultCount` (number) - Count of DEFAULT level observations
     * - `debugCount` (number) - Count of DEBUG level observations
     *
     * ### Scores (requires join with scores table)
     * - `scores_avg` (number) - Average of numeric scores (alias: `scores`)
     * - `score_categories` (categoryOptions) - Categorical score values
     *
     * ## Filter Examples
     * ```json
     * [
     *   {
     *     "type": "datetime",
     *     "column": "timestamp",
     *     "operator": ">=",
     *     "value": "2024-01-01T00:00:00Z"
     *   },
     *   {
     *     "type": "string",
     *     "column": "userId",
     *     "operator": "=",
     *     "value": "user-123"
     *   },
     *   {
     *     "type": "number",
     *     "column": "totalCost",
     *     "operator": ">=",
     *     "value": 0.01
     *   },
     *   {
     *     "type": "arrayOptions",
     *     "column": "tags",
     *     "operator": "all of",
     *     "value": ["production", "critical"]
     *   },
     *   {
     *     "type": "stringObject",
     *     "column": "metadata",
     *     "key": "customer_tier",
     *     "operator": "=",
     *     "value": "enterprise"
     *   }
     * ]
     * ```
     *
     * ## Performance Notes
     * - Filtering on `userId`, `sessionId`, or `metadata` may enable skip indexes for better query performance
     * - Score filters require a join with the scores table and may impact query performance
     */
    filter?: string;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         traceIds: ["traceIds", "traceIds"]
 *     }
 */
interface DeleteTracesRequest {
    /** List of trace IDs to delete */
    traceIds: string[];
}

type index$3_DeleteTraceResponse = DeleteTraceResponse;
type index$3_DeleteTracesRequest = DeleteTracesRequest;
type index$3_GetTracesRequest = GetTracesRequest;
type index$3_Sort = Sort;
type index$3_Traces = Traces;
declare namespace index$3 {
  export type { index$3_DeleteTraceResponse as DeleteTraceResponse, index$3_DeleteTracesRequest as DeleteTracesRequest, index$3_GetTracesRequest as GetTracesRequest, index$3_Sort as Sort, index$3_Traces as Traces };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
interface MetaResponse {
    /** current page number */
    page: number;
    /** number of items per page */
    limit: number;
    /** number of total items given the current filters/selection (if any) */
    totalItems: number;
    /** number of total pages given the current limit */
    totalPages: number;
}

type index$2_MetaResponse = MetaResponse;
declare namespace index$2 {
  export type { index$2_MetaResponse as MetaResponse };
}

type index$1_MetaResponse = MetaResponse;
declare namespace index$1 {
  export { type index$1_MetaResponse as MetaResponse, index$2 as pagination };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */
/**
 * @example
 *     {
 *         newLabels: ["newLabels", "newLabels"]
 *     }
 */
interface UpdatePromptRequest {
    /** New labels for the prompt version. Labels are unique across versions. The "latest" label is reserved and managed by Langfuse. */
    newLabels: string[];
}

type index_UpdatePromptRequest = UpdatePromptRequest;
declare namespace index {
  export type { index_UpdatePromptRequest as UpdatePromptRequest };
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace AnnotationQueues {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class AnnotationQueues {
    protected readonly _options: AnnotationQueues.Options;
    constructor(_options: AnnotationQueues.Options);
    /**
     * Get all annotation queues
     *
     * @param {LangfuseAPI.GetAnnotationQueuesRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.listQueues()
     */
    listQueues(request?: GetAnnotationQueuesRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<PaginatedAnnotationQueues>;
    private __listQueues;
    /**
     * Create an annotation queue
     *
     * @param {LangfuseAPI.CreateAnnotationQueueRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.createQueue({
     *         name: "name",
     *         description: undefined,
     *         scoreConfigIds: ["scoreConfigIds", "scoreConfigIds"]
     *     })
     */
    createQueue(request: CreateAnnotationQueueRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<AnnotationQueue>;
    private __createQueue;
    /**
     * Get an annotation queue by ID
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.getQueue("queueId")
     */
    getQueue(queueId: string, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<AnnotationQueue>;
    private __getQueue;
    /**
     * Get items for a specific annotation queue
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {LangfuseAPI.GetAnnotationQueueItemsRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.listQueueItems("queueId")
     */
    listQueueItems(queueId: string, request?: GetAnnotationQueueItemsRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<PaginatedAnnotationQueueItems>;
    private __listQueueItems;
    /**
     * Get a specific item from an annotation queue
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {string} itemId - The unique identifier of the annotation queue item
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.getQueueItem("queueId", "itemId")
     */
    getQueueItem(queueId: string, itemId: string, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<AnnotationQueueItem>;
    private __getQueueItem;
    /**
     * Add an item to an annotation queue
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {LangfuseAPI.CreateAnnotationQueueItemRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.createQueueItem("queueId", {
     *         objectId: "objectId",
     *         objectType: "TRACE",
     *         status: undefined
     *     })
     */
    createQueueItem(queueId: string, request: CreateAnnotationQueueItemRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<AnnotationQueueItem>;
    private __createQueueItem;
    /**
     * Update an annotation queue item
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {string} itemId - The unique identifier of the annotation queue item
     * @param {LangfuseAPI.UpdateAnnotationQueueItemRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.updateQueueItem("queueId", "itemId", {
     *         status: undefined
     *     })
     */
    updateQueueItem(queueId: string, itemId: string, request: UpdateAnnotationQueueItemRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<AnnotationQueueItem>;
    private __updateQueueItem;
    /**
     * Remove an item from an annotation queue
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {string} itemId - The unique identifier of the annotation queue item
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.deleteQueueItem("queueId", "itemId")
     */
    deleteQueueItem(queueId: string, itemId: string, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<DeleteAnnotationQueueItemResponse>;
    private __deleteQueueItem;
    /**
     * Create an assignment for a user to an annotation queue
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {LangfuseAPI.AnnotationQueueAssignmentRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.createQueueAssignment("queueId", {
     *         userId: "userId"
     *     })
     */
    createQueueAssignment(queueId: string, request: AnnotationQueueAssignmentRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<CreateAnnotationQueueAssignmentResponse>;
    private __createQueueAssignment;
    /**
     * Delete an assignment for a user to an annotation queue
     *
     * @param {string} queueId - The unique identifier of the annotation queue
     * @param {LangfuseAPI.AnnotationQueueAssignmentRequest} request
     * @param {AnnotationQueues.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.annotationQueues.deleteQueueAssignment("queueId", {
     *         userId: "userId"
     *     })
     */
    deleteQueueAssignment(queueId: string, request: AnnotationQueueAssignmentRequest, requestOptions?: AnnotationQueues.RequestOptions): HttpResponsePromise<DeleteAnnotationQueueAssignmentResponse>;
    private __deleteQueueAssignment;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace BlobStorageIntegrations {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class BlobStorageIntegrations {
    protected readonly _options: BlobStorageIntegrations.Options;
    constructor(_options: BlobStorageIntegrations.Options);
    /**
     * Get all blob storage integrations for the organization (requires organization-scoped API key)
     *
     * @param {BlobStorageIntegrations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.blobStorageIntegrations.getBlobStorageIntegrations()
     */
    getBlobStorageIntegrations(requestOptions?: BlobStorageIntegrations.RequestOptions): HttpResponsePromise<BlobStorageIntegrationsResponse>;
    private __getBlobStorageIntegrations;
    /**
     * Create or update a blob storage integration for a specific project (requires organization-scoped API key). The configuration is validated by performing a test upload to the bucket.
     *
     * @param {LangfuseAPI.CreateBlobStorageIntegrationRequest} request
     * @param {BlobStorageIntegrations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.blobStorageIntegrations.upsertBlobStorageIntegration({
     *         projectId: "projectId",
     *         type: "S3",
     *         bucketName: "bucketName",
     *         endpoint: undefined,
     *         region: "region",
     *         accessKeyId: undefined,
     *         secretAccessKey: undefined,
     *         prefix: undefined,
     *         exportFrequency: "hourly",
     *         enabled: true,
     *         forcePathStyle: true,
     *         fileType: "JSON",
     *         exportMode: "FULL_HISTORY",
     *         exportStartDate: undefined
     *     })
     */
    upsertBlobStorageIntegration(request: CreateBlobStorageIntegrationRequest, requestOptions?: BlobStorageIntegrations.RequestOptions): HttpResponsePromise<BlobStorageIntegrationResponse>;
    private __upsertBlobStorageIntegration;
    /**
     * Delete a blob storage integration by ID (requires organization-scoped API key)
     *
     * @param {string} id
     * @param {BlobStorageIntegrations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.blobStorageIntegrations.deleteBlobStorageIntegration("id")
     */
    deleteBlobStorageIntegration(id: string, requestOptions?: BlobStorageIntegrations.RequestOptions): HttpResponsePromise<BlobStorageIntegrationDeletionResponse>;
    private __deleteBlobStorageIntegration;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Comments {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Comments {
    protected readonly _options: Comments.Options;
    constructor(_options: Comments.Options);
    /**
     * Create a comment. Comments may be attached to different object types (trace, observation, session, prompt).
     *
     * @param {LangfuseAPI.CreateCommentRequest} request
     * @param {Comments.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.comments.create({
     *         projectId: "projectId",
     *         objectType: "objectType",
     *         objectId: "objectId",
     *         content: "content",
     *         authorUserId: undefined
     *     })
     */
    create(request: CreateCommentRequest, requestOptions?: Comments.RequestOptions): HttpResponsePromise<CreateCommentResponse>;
    private __create;
    /**
     * Get all comments
     *
     * @param {LangfuseAPI.GetCommentsRequest} request
     * @param {Comments.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.comments.get()
     */
    get(request?: GetCommentsRequest, requestOptions?: Comments.RequestOptions): HttpResponsePromise<GetCommentsResponse>;
    private __get;
    /**
     * Get a comment by id
     *
     * @param {string} commentId - The unique langfuse identifier of a comment
     * @param {Comments.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.comments.getById("commentId")
     */
    getById(commentId: string, requestOptions?: Comments.RequestOptions): HttpResponsePromise<Comment>;
    private __getById;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace DatasetItems {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class DatasetItems {
    protected readonly _options: DatasetItems.Options;
    constructor(_options: DatasetItems.Options);
    /**
     * Create a dataset item
     *
     * @param {LangfuseAPI.CreateDatasetItemRequest} request
     * @param {DatasetItems.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasetItems.create({
     *         datasetName: "datasetName",
     *         input: undefined,
     *         expectedOutput: undefined,
     *         metadata: undefined,
     *         sourceTraceId: undefined,
     *         sourceObservationId: undefined,
     *         id: undefined,
     *         status: undefined
     *     })
     */
    create(request: CreateDatasetItemRequest, requestOptions?: DatasetItems.RequestOptions): HttpResponsePromise<DatasetItem>;
    private __create;
    /**
     * Get a dataset item
     *
     * @param {string} id
     * @param {DatasetItems.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasetItems.get("id")
     */
    get(id: string, requestOptions?: DatasetItems.RequestOptions): HttpResponsePromise<DatasetItem>;
    private __get;
    /**
     * Get dataset items. Optionally specify a version to get the items as they existed at that point in time.
     * Note: If version parameter is provided, datasetName must also be provided.
     *
     * @param {LangfuseAPI.GetDatasetItemsRequest} request
     * @param {DatasetItems.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasetItems.list()
     */
    list(request?: GetDatasetItemsRequest, requestOptions?: DatasetItems.RequestOptions): HttpResponsePromise<PaginatedDatasetItems>;
    private __list;
    /**
     * Delete a dataset item and all its run items. This action is irreversible.
     *
     * @param {string} id
     * @param {DatasetItems.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasetItems.delete("id")
     */
    delete(id: string, requestOptions?: DatasetItems.RequestOptions): HttpResponsePromise<DeleteDatasetItemResponse>;
    private __delete;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace DatasetRunItems {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class DatasetRunItems {
    protected readonly _options: DatasetRunItems.Options;
    constructor(_options: DatasetRunItems.Options);
    /**
     * Create a dataset run item
     *
     * @param {LangfuseAPI.CreateDatasetRunItemRequest} request
     * @param {DatasetRunItems.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasetRunItems.create({
     *         runName: "runName",
     *         runDescription: undefined,
     *         metadata: undefined,
     *         datasetItemId: "datasetItemId",
     *         observationId: undefined,
     *         traceId: undefined,
     *         datasetVersion: undefined
     *     })
     */
    create(request: CreateDatasetRunItemRequest, requestOptions?: DatasetRunItems.RequestOptions): HttpResponsePromise<DatasetRunItem>;
    private __create;
    /**
     * List dataset run items
     *
     * @param {LangfuseAPI.ListDatasetRunItemsRequest} request
     * @param {DatasetRunItems.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasetRunItems.list({
     *         datasetId: "datasetId",
     *         runName: "runName"
     *     })
     */
    list(request: ListDatasetRunItemsRequest, requestOptions?: DatasetRunItems.RequestOptions): HttpResponsePromise<PaginatedDatasetRunItems>;
    private __list;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Datasets {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Datasets {
    protected readonly _options: Datasets.Options;
    constructor(_options: Datasets.Options);
    /**
     * Get all datasets
     *
     * @param {LangfuseAPI.GetDatasetsRequest} request
     * @param {Datasets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasets.list()
     */
    list(request?: GetDatasetsRequest, requestOptions?: Datasets.RequestOptions): HttpResponsePromise<PaginatedDatasets>;
    private __list;
    /**
     * Get a dataset
     *
     * @param {string} datasetName
     * @param {Datasets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasets.get("datasetName")
     */
    get(datasetName: string, requestOptions?: Datasets.RequestOptions): HttpResponsePromise<Dataset>;
    private __get;
    /**
     * Create a dataset
     *
     * @param {LangfuseAPI.CreateDatasetRequest} request
     * @param {Datasets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasets.create({
     *         name: "name",
     *         description: undefined,
     *         metadata: undefined,
     *         inputSchema: undefined,
     *         expectedOutputSchema: undefined
     *     })
     */
    create(request: CreateDatasetRequest, requestOptions?: Datasets.RequestOptions): HttpResponsePromise<Dataset>;
    private __create;
    /**
     * Get a dataset run and its items
     *
     * @param {string} datasetName
     * @param {string} runName
     * @param {Datasets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasets.getRun("datasetName", "runName")
     */
    getRun(datasetName: string, runName: string, requestOptions?: Datasets.RequestOptions): HttpResponsePromise<DatasetRunWithItems>;
    private __getRun;
    /**
     * Delete a dataset run and all its run items. This action is irreversible.
     *
     * @param {string} datasetName
     * @param {string} runName
     * @param {Datasets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasets.deleteRun("datasetName", "runName")
     */
    deleteRun(datasetName: string, runName: string, requestOptions?: Datasets.RequestOptions): HttpResponsePromise<DeleteDatasetRunResponse>;
    private __deleteRun;
    /**
     * Get dataset runs
     *
     * @param {string} datasetName
     * @param {LangfuseAPI.GetDatasetRunsRequest} request
     * @param {Datasets.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.datasets.getRuns("datasetName")
     */
    getRuns(datasetName: string, request?: GetDatasetRunsRequest, requestOptions?: Datasets.RequestOptions): HttpResponsePromise<PaginatedDatasetRuns>;
    private __getRuns;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Health {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Health {
    protected readonly _options: Health.Options;
    constructor(_options: Health.Options);
    /**
     * Check health of API and database
     *
     * @param {Health.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.ServiceUnavailableError}
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.health.health()
     */
    health(requestOptions?: Health.RequestOptions): HttpResponsePromise<HealthResponse>;
    private __health;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Ingestion {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Ingestion {
    protected readonly _options: Ingestion.Options;
    constructor(_options: Ingestion.Options);
    /**
     * **Legacy endpoint for batch ingestion for Langfuse Observability.**
     *
     * -> Please use the OpenTelemetry endpoint (`/api/public/otel/v1/traces`). Learn more: https://langfuse.com/integrations/native/opentelemetry
     *
     * Within each batch, there can be multiple events.
     * Each event has a type, an id, a timestamp, metadata and a body.
     * Internally, we refer to this as the "event envelope" as it tells us something about the event but not the trace.
     * We use the event id within this envelope to deduplicate messages to avoid processing the same event twice, i.e. the event id should be unique per request.
     * The event.body.id is the ID of the actual trace and will be used for updates and will be visible within the Langfuse App.
     * I.e. if you want to update a trace, you'd use the same body id, but separate event IDs.
     *
     * Notes:
     * - Introduction to data model: https://langfuse.com/docs/observability/data-model
     * - Batch sizes are limited to 3.5 MB in total. You need to adjust the number of events per batch accordingly.
     * - The API does not return a 4xx status code for input errors. Instead, it responds with a 207 status code, which includes a list of the encountered errors.
     *
     * @param {LangfuseAPI.IngestionRequest} request
     * @param {Ingestion.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.ingestion.batch({
     *         batch: [{
     *                 type: "trace-create",
     *                 id: "abcdef-1234-5678-90ab",
     *                 timestamp: "2022-01-01T00:00:00.000Z",
     *                 body: {
     *                     id: "abcdef-1234-5678-90ab",
     *                     timestamp: "2022-01-01T00:00:00.000Z",
     *                     environment: "production",
     *                     name: "My Trace",
     *                     userId: "1234-5678-90ab-cdef",
     *                     input: "My input",
     *                     output: "My output",
     *                     sessionId: "1234-5678-90ab-cdef",
     *                     release: "1.0.0",
     *                     version: "1.0.0",
     *                     metadata: "My metadata",
     *                     tags: ["tag1", "tag2"],
     *                     "public": true
     *                 }
     *             }]
     *     })
     *
     * @example
     *     await client.ingestion.batch({
     *         batch: [{
     *                 type: "span-create",
     *                 id: "abcdef-1234-5678-90ab",
     *                 timestamp: "2022-01-01T00:00:00.000Z",
     *                 body: {
     *                     id: "abcdef-1234-5678-90ab",
     *                     traceId: "1234-5678-90ab-cdef",
     *                     startTime: "2022-01-01T00:00:00.000Z",
     *                     environment: "test"
     *                 }
     *             }]
     *     })
     *
     * @example
     *     await client.ingestion.batch({
     *         batch: [{
     *                 type: "score-create",
     *                 id: "abcdef-1234-5678-90ab",
     *                 timestamp: "2022-01-01T00:00:00.000Z",
     *                 body: {
     *                     id: "abcdef-1234-5678-90ab",
     *                     traceId: "1234-5678-90ab-cdef",
     *                     name: "My Score",
     *                     value: 0.9,
     *                     environment: "default"
     *                 }
     *             }]
     *     })
     */
    batch(request: IngestionRequest, requestOptions?: Ingestion.RequestOptions): HttpResponsePromise<IngestionResponse>;
    private __batch;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace LlmConnections {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class LlmConnections {
    protected readonly _options: LlmConnections.Options;
    constructor(_options: LlmConnections.Options);
    /**
     * Get all LLM connections in a project
     *
     * @param {LangfuseAPI.GetLlmConnectionsRequest} request
     * @param {LlmConnections.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.llmConnections.list()
     */
    list(request?: GetLlmConnectionsRequest, requestOptions?: LlmConnections.RequestOptions): HttpResponsePromise<PaginatedLlmConnections>;
    private __list;
    /**
     * Create or update an LLM connection. The connection is upserted on provider.
     *
     * @param {LangfuseAPI.UpsertLlmConnectionRequest} request
     * @param {LlmConnections.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.llmConnections.upsert({
     *         provider: "provider",
     *         adapter: "anthropic",
     *         secretKey: "secretKey",
     *         baseURL: undefined,
     *         customModels: undefined,
     *         withDefaultModels: undefined,
     *         extraHeaders: undefined,
     *         config: undefined
     *     })
     */
    upsert(request: UpsertLlmConnectionRequest, requestOptions?: LlmConnections.RequestOptions): HttpResponsePromise<LlmConnection>;
    private __upsert;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Media {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Media {
    protected readonly _options: Media.Options;
    constructor(_options: Media.Options);
    /**
     * Get a media record
     *
     * @param {string} mediaId - The unique langfuse identifier of a media record
     * @param {Media.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.media.get("mediaId")
     */
    get(mediaId: string, requestOptions?: Media.RequestOptions): HttpResponsePromise<GetMediaResponse>;
    private __get;
    /**
     * Patch a media record
     *
     * @param {string} mediaId - The unique langfuse identifier of a media record
     * @param {LangfuseAPI.PatchMediaBody} request
     * @param {Media.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.media.patch("mediaId", {
     *         uploadedAt: "2024-01-15T09:30:00Z",
     *         uploadHttpStatus: 1,
     *         uploadHttpError: undefined,
     *         uploadTimeMs: undefined
     *     })
     */
    patch(mediaId: string, request: PatchMediaBody, requestOptions?: Media.RequestOptions): HttpResponsePromise<void>;
    private __patch;
    /**
     * Get a presigned upload URL for a media record
     *
     * @param {LangfuseAPI.GetMediaUploadUrlRequest} request
     * @param {Media.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.media.getUploadUrl({
     *         traceId: "traceId",
     *         observationId: undefined,
     *         contentType: "image/png",
     *         contentLength: 1,
     *         sha256Hash: "sha256Hash",
     *         field: "field"
     *     })
     */
    getUploadUrl(request: GetMediaUploadUrlRequest, requestOptions?: Media.RequestOptions): HttpResponsePromise<GetMediaUploadUrlResponse>;
    private __getUploadUrl;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace MetricsV2 {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class MetricsV2 {
    protected readonly _options: MetricsV2.Options;
    constructor(_options: MetricsV2.Options);
    /**
     * Get metrics from the Langfuse project using a query object. V2 endpoint with optimized performance.
     *
     * ## V2 Differences
     * - Supports `observations`, `scores-numeric`, and `scores-categorical` views only (traces view not supported)
     * - Direct access to tags and release fields on observations
     * - Backwards-compatible: traceName, traceRelease, traceVersion dimensions are still available on observations view
     * - High cardinality dimensions are not supported and will return a 400 error (see below)
     *
     * For more details, see the [Metrics API documentation](https://langfuse.com/docs/metrics/features/metrics-api).
     *
     * ## Available Views
     *
     * ### observations
     * Query observation-level data (spans, generations, events).
     *
     * **Dimensions:**
     * - `environment` - Deployment environment (e.g., production, staging)
     * - `type` - Type of observation (SPAN, GENERATION, EVENT)
     * - `name` - Name of the observation
     * - `level` - Logging level of the observation
     * - `version` - Version of the observation
     * - `tags` - User-defined tags
     * - `release` - Release version
     * - `traceName` - Name of the parent trace (backwards-compatible)
     * - `traceRelease` - Release version of the parent trace (backwards-compatible, maps to release)
     * - `traceVersion` - Version of the parent trace (backwards-compatible, maps to version)
     * - `providedModelName` - Name of the model used
     * - `promptName` - Name of the prompt used
     * - `promptVersion` - Version of the prompt used
     * - `startTimeMonth` - Month of start_time in YYYY-MM format
     *
     * **Measures:**
     * - `count` - Total number of observations
     * - `latency` - Observation latency (milliseconds)
     * - `streamingLatency` - Generation latency from completion start to end (milliseconds)
     * - `inputTokens` - Sum of input tokens consumed
     * - `outputTokens` - Sum of output tokens produced
     * - `totalTokens` - Sum of all tokens consumed
     * - `outputTokensPerSecond` - Output tokens per second
     * - `tokensPerSecond` - Total tokens per second
     * - `inputCost` - Input cost (USD)
     * - `outputCost` - Output cost (USD)
     * - `totalCost` - Total cost (USD)
     * - `timeToFirstToken` - Time to first token (milliseconds)
     * - `countScores` - Number of scores attached to the observation
     *
     * ### scores-numeric
     * Query numeric and boolean score data.
     *
     * **Dimensions:**
     * - `environment` - Deployment environment
     * - `name` - Name of the score (e.g., accuracy, toxicity)
     * - `source` - Origin of the score (API, ANNOTATION, EVAL)
     * - `dataType` - Data type (NUMERIC, BOOLEAN)
     * - `configId` - Identifier of the score config
     * - `timestampMonth` - Month in YYYY-MM format
     * - `timestampDay` - Day in YYYY-MM-DD format
     * - `value` - Numeric value of the score
     * - `traceName` - Name of the parent trace
     * - `tags` - Tags
     * - `traceRelease` - Release version
     * - `traceVersion` - Version
     * - `observationName` - Name of the associated observation
     * - `observationModelName` - Model name of the associated observation
     * - `observationPromptName` - Prompt name of the associated observation
     * - `observationPromptVersion` - Prompt version of the associated observation
     *
     * **Measures:**
     * - `count` - Total number of scores
     * - `value` - Score value (for aggregations)
     *
     * ### scores-categorical
     * Query categorical score data. Same dimensions as scores-numeric except uses `stringValue` instead of `value`.
     *
     * **Measures:**
     * - `count` - Total number of scores
     *
     * ## High Cardinality Dimensions
     * The following dimensions cannot be used as grouping dimensions in v2 metrics API as they can cause performance issues.
     * Use them in filters instead.
     *
     * **observations view:**
     * - `id` - Use traceId filter to narrow down results
     * - `traceId` - Use traceId filter instead
     * - `userId` - Use userId filter instead
     * - `sessionId` - Use sessionId filter instead
     * - `parentObservationId` - Use parentObservationId filter instead
     *
     * **scores-numeric / scores-categorical views:**
     * - `id` - Use specific filters to narrow down results
     * - `traceId` - Use traceId filter instead
     * - `userId` - Use userId filter instead
     * - `sessionId` - Use sessionId filter instead
     * - `observationId` - Use observationId filter instead
     *
     * ## Aggregations
     * Available aggregation functions: `sum`, `avg`, `count`, `max`, `min`, `p50`, `p75`, `p90`, `p95`, `p99`, `histogram`
     *
     * ## Time Granularities
     * Available granularities for timeDimension: `auto`, `minute`, `hour`, `day`, `week`, `month`
     * - `auto` bins the data into approximately 50 buckets based on the time range
     *
     * @param {LangfuseAPI.GetMetricsV2Request} request
     * @param {MetricsV2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.metricsV2.metrics({
     *         query: "query"
     *     })
     */
    metrics(request: GetMetricsV2Request, requestOptions?: MetricsV2.RequestOptions): HttpResponsePromise<MetricsV2Response>;
    private __metrics;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Metrics {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Metrics {
    protected readonly _options: Metrics.Options;
    constructor(_options: Metrics.Options);
    /**
     * Get metrics from the Langfuse project using a query object.
     *
     * Consider using the [v2 metrics endpoint](/api-reference#tag/metricsv2/GET/api/public/v2/metrics) for better performance.
     *
     * For more details, see the [Metrics API documentation](https://langfuse.com/docs/metrics/features/metrics-api).
     *
     * @param {LangfuseAPI.GetMetricsRequest} request
     * @param {Metrics.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.metrics.metrics({
     *         query: "query"
     *     })
     */
    metrics(request: GetMetricsRequest, requestOptions?: Metrics.RequestOptions): HttpResponsePromise<MetricsResponse>;
    private __metrics;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Models {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Models {
    protected readonly _options: Models.Options;
    constructor(_options: Models.Options);
    /**
     * Create a model
     *
     * @param {LangfuseAPI.CreateModelRequest} request
     * @param {Models.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.models.create({
     *         modelName: "modelName",
     *         matchPattern: "matchPattern",
     *         startDate: undefined,
     *         unit: undefined,
     *         inputPrice: undefined,
     *         outputPrice: undefined,
     *         totalPrice: undefined,
     *         pricingTiers: undefined,
     *         tokenizerId: undefined,
     *         tokenizerConfig: undefined
     *     })
     */
    create(request: CreateModelRequest, requestOptions?: Models.RequestOptions): HttpResponsePromise<Model>;
    private __create;
    /**
     * Get all models
     *
     * @param {LangfuseAPI.GetModelsRequest} request
     * @param {Models.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.models.list()
     */
    list(request?: GetModelsRequest, requestOptions?: Models.RequestOptions): HttpResponsePromise<PaginatedModels>;
    private __list;
    /**
     * Get a model
     *
     * @param {string} id
     * @param {Models.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.models.get("id")
     */
    get(id: string, requestOptions?: Models.RequestOptions): HttpResponsePromise<Model>;
    private __get;
    /**
     * Delete a model. Cannot delete models managed by Langfuse. You can create your own definition with the same modelName to override the definition though.
     *
     * @param {string} id
     * @param {Models.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.models.delete("id")
     */
    delete(id: string, requestOptions?: Models.RequestOptions): HttpResponsePromise<void>;
    private __delete;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace ObservationsV2 {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class ObservationsV2 {
    protected readonly _options: ObservationsV2.Options;
    constructor(_options: ObservationsV2.Options);
    /**
     * Get a list of observations with cursor-based pagination and flexible field selection.
     *
     * ## Cursor-based Pagination
     * This endpoint uses cursor-based pagination for efficient traversal of large datasets.
     * The cursor is returned in the response metadata and should be passed in subsequent requests
     * to retrieve the next page of results.
     *
     * ## Field Selection
     * Use the `fields` parameter to control which observation fields are returned:
     * - `core` - Always included: id, traceId, startTime, endTime, projectId, parentObservationId, type
     * - `basic` - name, level, statusMessage, version, environment, bookmarked, public, userId, sessionId
     * - `time` - completionStartTime, createdAt, updatedAt
     * - `io` - input, output
     * - `metadata` - metadata (truncated to 200 chars by default, use `expandMetadata` to get full values)
     * - `model` - providedModelName, internalModelId, modelParameters
     * - `usage` - usageDetails, costDetails, totalCost
     * - `prompt` - promptId, promptName, promptVersion
     * - `metrics` - latency, timeToFirstToken
     *
     * If not specified, `core` and `basic` field groups are returned.
     *
     * ## Filters
     * Multiple filtering options are available via query parameters or the structured `filter` parameter.
     * When using the `filter` parameter, it takes precedence over individual query parameter filters.
     *
     * @param {LangfuseAPI.GetObservationsV2Request} request
     * @param {ObservationsV2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.observationsV2.getMany()
     */
    getMany(request?: GetObservationsV2Request, requestOptions?: ObservationsV2.RequestOptions): HttpResponsePromise<ObservationsV2Response>;
    private __getMany;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Observations {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Observations {
    protected readonly _options: Observations.Options;
    constructor(_options: Observations.Options);
    /**
     * Get a observation
     *
     * @param {string} observationId - The unique langfuse identifier of an observation, can be an event, span or generation
     * @param {Observations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.observations.get("observationId")
     */
    get(observationId: string, requestOptions?: Observations.RequestOptions): HttpResponsePromise<ObservationsView>;
    private __get;
    /**
     * Get a list of observations.
     *
     * Consider using the [v2 observations endpoint](/api-reference#tag/observationsv2/GET/api/public/v2/observations) for cursor-based pagination and field selection.
     *
     * @param {LangfuseAPI.GetObservationsRequest} request
     * @param {Observations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.observations.getMany()
     */
    getMany(request?: GetObservationsRequest, requestOptions?: Observations.RequestOptions): HttpResponsePromise<ObservationsViews>;
    private __getMany;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Opentelemetry {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Opentelemetry {
    protected readonly _options: Opentelemetry.Options;
    constructor(_options: Opentelemetry.Options);
    /**
     * **OpenTelemetry Traces Ingestion Endpoint**
     *
     * This endpoint implements the OTLP/HTTP specification for trace ingestion, providing native OpenTelemetry integration for Langfuse Observability.
     *
     * **Supported Formats:**
     * - Binary Protobuf: `Content-Type: application/x-protobuf`
     * - JSON Protobuf: `Content-Type: application/json`
     * - Supports gzip compression via `Content-Encoding: gzip` header
     *
     * **Specification Compliance:**
     * - Conforms to [OTLP/HTTP Trace Export](https://opentelemetry.io/docs/specs/otlp/#otlphttp)
     * - Implements `ExportTraceServiceRequest` message format
     *
     * **Documentation:**
     * - Integration guide: https://langfuse.com/integrations/native/opentelemetry
     * - Data model: https://langfuse.com/docs/observability/data-model
     *
     * @param {LangfuseAPI.OtelTraceRequest} request
     * @param {Opentelemetry.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.opentelemetry.exportTraces({
     *         resourceSpans: [{
     *                 resource: {
     *                     attributes: [{
     *                             key: "service.name",
     *                             value: {
     *                                 stringValue: "my-service"
     *                             }
     *                         }, {
     *                             key: "service.version",
     *                             value: {
     *                                 stringValue: "1.0.0"
     *                             }
     *                         }]
     *                 },
     *                 scopeSpans: [{
     *                         scope: {
     *                             name: "langfuse-sdk",
     *                             version: "2.60.3"
     *                         },
     *                         spans: [{
     *                                 traceId: "0123456789abcdef0123456789abcdef",
     *                                 spanId: "0123456789abcdef",
     *                                 name: "my-operation",
     *                                 kind: 1,
     *                                 startTimeUnixNano: "1747872000000000000",
     *                                 endTimeUnixNano: "1747872001000000000",
     *                                 attributes: [{
     *                                         key: "langfuse.observation.type",
     *                                         value: {
     *                                             stringValue: "generation"
     *                                         }
     *                                     }],
     *                                 status: {}
     *                             }]
     *                     }]
     *             }]
     *     })
     */
    exportTraces(request: OtelTraceRequest, requestOptions?: Opentelemetry.RequestOptions): HttpResponsePromise<OtelTraceResponse>;
    private __exportTraces;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Organizations {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Organizations {
    protected readonly _options: Organizations.Options;
    constructor(_options: Organizations.Options);
    /**
     * Get all memberships for the organization associated with the API key (requires organization-scoped API key)
     *
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.getOrganizationMemberships()
     */
    getOrganizationMemberships(requestOptions?: Organizations.RequestOptions): HttpResponsePromise<MembershipsResponse>;
    private __getOrganizationMemberships;
    /**
     * Create or update a membership for the organization associated with the API key (requires organization-scoped API key)
     *
     * @param {LangfuseAPI.MembershipRequest} request
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.updateOrganizationMembership({
     *         userId: "userId",
     *         role: "OWNER"
     *     })
     */
    updateOrganizationMembership(request: MembershipRequest, requestOptions?: Organizations.RequestOptions): HttpResponsePromise<MembershipResponse>;
    private __updateOrganizationMembership;
    /**
     * Delete a membership from the organization associated with the API key (requires organization-scoped API key)
     *
     * @param {LangfuseAPI.DeleteMembershipRequest} request
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.deleteOrganizationMembership({
     *         userId: "userId"
     *     })
     */
    deleteOrganizationMembership(request: DeleteMembershipRequest, requestOptions?: Organizations.RequestOptions): HttpResponsePromise<MembershipDeletionResponse>;
    private __deleteOrganizationMembership;
    /**
     * Get all memberships for a specific project (requires organization-scoped API key)
     *
     * @param {string} projectId
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.getProjectMemberships("projectId")
     */
    getProjectMemberships(projectId: string, requestOptions?: Organizations.RequestOptions): HttpResponsePromise<MembershipsResponse>;
    private __getProjectMemberships;
    /**
     * Create or update a membership for a specific project (requires organization-scoped API key). The user must already be a member of the organization.
     *
     * @param {string} projectId
     * @param {LangfuseAPI.MembershipRequest} request
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.updateProjectMembership("projectId", {
     *         userId: "userId",
     *         role: "OWNER"
     *     })
     */
    updateProjectMembership(projectId: string, request: MembershipRequest, requestOptions?: Organizations.RequestOptions): HttpResponsePromise<MembershipResponse>;
    private __updateProjectMembership;
    /**
     * Delete a membership from a specific project (requires organization-scoped API key). The user must be a member of the organization.
     *
     * @param {string} projectId
     * @param {LangfuseAPI.DeleteMembershipRequest} request
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.deleteProjectMembership("projectId", {
     *         userId: "userId"
     *     })
     */
    deleteProjectMembership(projectId: string, request: DeleteMembershipRequest, requestOptions?: Organizations.RequestOptions): HttpResponsePromise<MembershipDeletionResponse>;
    private __deleteProjectMembership;
    /**
     * Get all projects for the organization associated with the API key (requires organization-scoped API key)
     *
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.getOrganizationProjects()
     */
    getOrganizationProjects(requestOptions?: Organizations.RequestOptions): HttpResponsePromise<OrganizationProjectsResponse>;
    private __getOrganizationProjects;
    /**
     * Get all API keys for the organization associated with the API key (requires organization-scoped API key)
     *
     * @param {Organizations.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.organizations.getOrganizationApiKeys()
     */
    getOrganizationApiKeys(requestOptions?: Organizations.RequestOptions): HttpResponsePromise<OrganizationApiKeysResponse>;
    private __getOrganizationApiKeys;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Projects {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Projects {
    protected readonly _options: Projects.Options;
    constructor(_options: Projects.Options);
    /**
     * Get Project associated with API key (requires project-scoped API key). You can use GET /api/public/organizations/projects to get all projects with an organization-scoped key.
     *
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.get()
     */
    get(requestOptions?: Projects.RequestOptions): HttpResponsePromise<Projects$1>;
    private __get;
    /**
     * Create a new project (requires organization-scoped API key)
     *
     * @param {LangfuseAPI.CreateProjectRequest} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.create({
     *         name: "name",
     *         metadata: undefined,
     *         retention: 1
     *     })
     */
    create(request: CreateProjectRequest, requestOptions?: Projects.RequestOptions): HttpResponsePromise<Project>;
    private __create;
    /**
     * Update a project by ID (requires organization-scoped API key).
     *
     * @param {string} projectId
     * @param {LangfuseAPI.UpdateProjectRequest} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.update("projectId", {
     *         name: "name",
     *         metadata: undefined,
     *         retention: undefined
     *     })
     */
    update(projectId: string, request: UpdateProjectRequest, requestOptions?: Projects.RequestOptions): HttpResponsePromise<Project>;
    private __update;
    /**
     * Delete a project by ID (requires organization-scoped API key). Project deletion is processed asynchronously.
     *
     * @param {string} projectId
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.delete("projectId")
     */
    delete(projectId: string, requestOptions?: Projects.RequestOptions): HttpResponsePromise<ProjectDeletionResponse>;
    private __delete;
    /**
     * Get all API keys for a project (requires organization-scoped API key)
     *
     * @param {string} projectId
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.getApiKeys("projectId")
     */
    getApiKeys(projectId: string, requestOptions?: Projects.RequestOptions): HttpResponsePromise<ApiKeyList>;
    private __getApiKeys;
    /**
     * Create a new API key for a project (requires organization-scoped API key)
     *
     * @param {string} projectId
     * @param {LangfuseAPI.CreateApiKeyRequest} request
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.createApiKey("projectId", {
     *         note: undefined,
     *         publicKey: undefined,
     *         secretKey: undefined
     *     })
     */
    createApiKey(projectId: string, request?: CreateApiKeyRequest, requestOptions?: Projects.RequestOptions): HttpResponsePromise<ApiKeyResponse>;
    private __createApiKey;
    /**
     * Delete an API key for a project (requires organization-scoped API key)
     *
     * @param {string} projectId
     * @param {string} apiKeyId
     * @param {Projects.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.projects.deleteApiKey("projectId", "apiKeyId")
     */
    deleteApiKey(projectId: string, apiKeyId: string, requestOptions?: Projects.RequestOptions): HttpResponsePromise<ApiKeyDeletionResponse>;
    private __deleteApiKey;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace PromptVersion {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class PromptVersion {
    protected readonly _options: PromptVersion.Options;
    constructor(_options: PromptVersion.Options);
    /**
     * Update labels for a specific prompt version
     *
     * @param {string} name - The name of the prompt. If the prompt is in a folder (e.g., "folder/subfolder/prompt-name"),
     *                        the folder path must be URL encoded.
     * @param {number} version - Version of the prompt to update
     * @param {LangfuseAPI.UpdatePromptRequest} request
     * @param {PromptVersion.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.promptVersion.update("name", 1, {
     *         newLabels: ["newLabels", "newLabels"]
     *     })
     */
    update(name: string, version: number, request: UpdatePromptRequest, requestOptions?: PromptVersion.RequestOptions): HttpResponsePromise<Prompt>;
    private __update;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Prompts {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Prompts {
    protected readonly _options: Prompts.Options;
    constructor(_options: Prompts.Options);
    /**
     * Get a prompt
     *
     * @param {string} promptName - The name of the prompt. If the prompt is in a folder (e.g., "folder/subfolder/prompt-name"),
     *                              the folder path must be URL encoded.
     * @param {LangfuseAPI.GetPromptRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.prompts.get("promptName")
     */
    get(promptName: string, request?: GetPromptRequest, requestOptions?: Prompts.RequestOptions): HttpResponsePromise<Prompt>;
    private __get;
    /**
     * Get a list of prompt names with versions and labels
     *
     * @param {LangfuseAPI.ListPromptsMetaRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.prompts.list()
     */
    list(request?: ListPromptsMetaRequest, requestOptions?: Prompts.RequestOptions): HttpResponsePromise<PromptMetaListResponse>;
    private __list;
    /**
     * Create a new version for the prompt with the given `name`
     *
     * @param {LangfuseAPI.CreatePromptRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.prompts.create({
     *         type: "chat",
     *         name: "name",
     *         prompt: [{
     *                 type: "chatmessage",
     *                 role: "role",
     *                 content: "content"
     *             }, {
     *                 type: "chatmessage",
     *                 role: "role",
     *                 content: "content"
     *             }],
     *         config: undefined,
     *         labels: undefined,
     *         tags: undefined,
     *         commitMessage: undefined
     *     })
     */
    create(request: CreatePromptRequest, requestOptions?: Prompts.RequestOptions): HttpResponsePromise<Prompt>;
    private __create;
    /**
     * Delete prompt versions. If neither version nor label is specified, all versions of the prompt are deleted.
     *
     * @param {string} promptName - The name of the prompt
     * @param {LangfuseAPI.DeletePromptRequest} request
     * @param {Prompts.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.prompts.delete("promptName")
     */
    delete(promptName: string, request?: DeletePromptRequest, requestOptions?: Prompts.RequestOptions): HttpResponsePromise<void>;
    private __delete;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Scim {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Scim {
    protected readonly _options: Scim.Options;
    constructor(_options: Scim.Options);
    /**
     * Get SCIM Service Provider Configuration (requires organization-scoped API key)
     *
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.getServiceProviderConfig()
     */
    getServiceProviderConfig(requestOptions?: Scim.RequestOptions): HttpResponsePromise<ServiceProviderConfig>;
    private __getServiceProviderConfig;
    /**
     * Get SCIM Resource Types (requires organization-scoped API key)
     *
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.getResourceTypes()
     */
    getResourceTypes(requestOptions?: Scim.RequestOptions): HttpResponsePromise<ResourceTypesResponse>;
    private __getResourceTypes;
    /**
     * Get SCIM Schemas (requires organization-scoped API key)
     *
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.getSchemas()
     */
    getSchemas(requestOptions?: Scim.RequestOptions): HttpResponsePromise<SchemasResponse>;
    private __getSchemas;
    /**
     * List users in the organization (requires organization-scoped API key)
     *
     * @param {LangfuseAPI.ListUsersRequest} request
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.listUsers()
     */
    listUsers(request?: ListUsersRequest, requestOptions?: Scim.RequestOptions): HttpResponsePromise<ScimUsersListResponse>;
    private __listUsers;
    /**
     * Create a new user in the organization (requires organization-scoped API key)
     *
     * @param {LangfuseAPI.CreateUserRequest} request
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.createUser({
     *         userName: "userName",
     *         name: {
     *             formatted: undefined
     *         },
     *         emails: undefined,
     *         active: undefined,
     *         password: undefined
     *     })
     */
    createUser(request: CreateUserRequest, requestOptions?: Scim.RequestOptions): HttpResponsePromise<ScimUser>;
    private __createUser;
    /**
     * Get a specific user by ID (requires organization-scoped API key)
     *
     * @param {string} userId
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.getUser("userId")
     */
    getUser(userId: string, requestOptions?: Scim.RequestOptions): HttpResponsePromise<ScimUser>;
    private __getUser;
    /**
     * Remove a user from the organization (requires organization-scoped API key). Note that this only removes the user from the organization but does not delete the user entity itself.
     *
     * @param {string} userId
     * @param {Scim.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scim.deleteUser("userId")
     */
    deleteUser(userId: string, requestOptions?: Scim.RequestOptions): HttpResponsePromise<EmptyResponse>;
    private __deleteUser;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace ScoreConfigs {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class ScoreConfigs {
    protected readonly _options: ScoreConfigs.Options;
    constructor(_options: ScoreConfigs.Options);
    /**
     * Create a score configuration (config). Score configs are used to define the structure of scores
     *
     * @param {LangfuseAPI.CreateScoreConfigRequest} request
     * @param {ScoreConfigs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scoreConfigs.create({
     *         name: "name",
     *         dataType: "NUMERIC",
     *         categories: undefined,
     *         minValue: undefined,
     *         maxValue: undefined,
     *         description: undefined
     *     })
     */
    create(request: CreateScoreConfigRequest, requestOptions?: ScoreConfigs.RequestOptions): HttpResponsePromise<ScoreConfig>;
    private __create;
    /**
     * Get all score configs
     *
     * @param {LangfuseAPI.GetScoreConfigsRequest} request
     * @param {ScoreConfigs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scoreConfigs.get()
     */
    get(request?: GetScoreConfigsRequest, requestOptions?: ScoreConfigs.RequestOptions): HttpResponsePromise<ScoreConfigs$1>;
    private __get;
    /**
     * Get a score config
     *
     * @param {string} configId - The unique langfuse identifier of a score config
     * @param {ScoreConfigs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scoreConfigs.getById("configId")
     */
    getById(configId: string, requestOptions?: ScoreConfigs.RequestOptions): HttpResponsePromise<ScoreConfig>;
    private __getById;
    /**
     * Update a score config
     *
     * @param {string} configId - The unique langfuse identifier of a score config
     * @param {LangfuseAPI.UpdateScoreConfigRequest} request
     * @param {ScoreConfigs.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scoreConfigs.update("configId", {
     *         isArchived: undefined,
     *         name: undefined,
     *         categories: undefined,
     *         minValue: undefined,
     *         maxValue: undefined,
     *         description: undefined
     *     })
     */
    update(configId: string, request: UpdateScoreConfigRequest, requestOptions?: ScoreConfigs.RequestOptions): HttpResponsePromise<ScoreConfig>;
    private __update;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace ScoreV2 {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class ScoreV2 {
    protected readonly _options: ScoreV2.Options;
    constructor(_options: ScoreV2.Options);
    /**
     * Get a list of scores (supports both trace and session scores)
     *
     * @param {LangfuseAPI.GetScoresRequest} request
     * @param {ScoreV2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scoreV2.get()
     */
    get(request?: GetScoresRequest, requestOptions?: ScoreV2.RequestOptions): HttpResponsePromise<GetScoresResponse>;
    private __get;
    /**
     * Get a score (supports both trace and session scores)
     *
     * @param {string} scoreId - The unique langfuse identifier of a score
     * @param {ScoreV2.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.scoreV2.getById("scoreId")
     */
    getById(scoreId: string, requestOptions?: ScoreV2.RequestOptions): HttpResponsePromise<Score$1>;
    private __getById;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Score {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Score {
    protected readonly _options: Score.Options;
    constructor(_options: Score.Options);
    /**
     * Create a score (supports both trace and session scores)
     *
     * @param {LangfuseAPI.CreateScoreRequest} request
     * @param {Score.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.score.create({
     *         id: undefined,
     *         traceId: undefined,
     *         sessionId: undefined,
     *         observationId: undefined,
     *         datasetRunId: undefined,
     *         name: "name",
     *         value: 1.1,
     *         comment: undefined,
     *         metadata: undefined,
     *         environment: undefined,
     *         queueId: undefined,
     *         dataType: undefined,
     *         configId: undefined
     *     })
     */
    create(request: CreateScoreRequest, requestOptions?: Score.RequestOptions): HttpResponsePromise<CreateScoreResponse>;
    private __create;
    /**
     * Delete a score (supports both trace and session scores)
     *
     * @param {string} scoreId - The unique langfuse identifier of a score
     * @param {Score.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.score.delete("scoreId")
     */
    delete(scoreId: string, requestOptions?: Score.RequestOptions): HttpResponsePromise<void>;
    private __delete;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Sessions {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Sessions {
    protected readonly _options: Sessions.Options;
    constructor(_options: Sessions.Options);
    /**
     * Get sessions
     *
     * @param {LangfuseAPI.GetSessionsRequest} request
     * @param {Sessions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.sessions.list()
     */
    list(request?: GetSessionsRequest, requestOptions?: Sessions.RequestOptions): HttpResponsePromise<PaginatedSessions>;
    private __list;
    /**
     * Get a session. Please note that `traces` on this endpoint are not paginated, if you plan to fetch large sessions, consider `GET /api/public/traces?sessionId=<sessionId>`
     *
     * @param {string} sessionId - The unique id of a session
     * @param {Sessions.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.sessions.get("sessionId")
     */
    get(sessionId: string, requestOptions?: Sessions.RequestOptions): HttpResponsePromise<SessionWithTraces>;
    private __get;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace Trace {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class Trace {
    protected readonly _options: Trace.Options;
    constructor(_options: Trace.Options);
    /**
     * Get a specific trace
     *
     * @param {string} traceId - The unique langfuse identifier of a trace
     * @param {Trace.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.trace.get("traceId")
     */
    get(traceId: string, requestOptions?: Trace.RequestOptions): HttpResponsePromise<TraceWithFullDetails>;
    private __get;
    /**
     * Delete a specific trace
     *
     * @param {string} traceId - The unique langfuse identifier of the trace to delete
     * @param {Trace.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.trace.delete("traceId")
     */
    delete(traceId: string, requestOptions?: Trace.RequestOptions): HttpResponsePromise<DeleteTraceResponse>;
    private __delete;
    /**
     * Get list of traces
     *
     * @param {LangfuseAPI.GetTracesRequest} request
     * @param {Trace.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.trace.list()
     */
    list(request?: GetTracesRequest, requestOptions?: Trace.RequestOptions): HttpResponsePromise<Traces>;
    private __list;
    /**
     * Delete multiple traces
     *
     * @param {LangfuseAPI.DeleteTracesRequest} request
     * @param {Trace.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link LangfuseAPI.Error}
     * @throws {@link LangfuseAPI.UnauthorizedError}
     * @throws {@link LangfuseAPI.AccessDeniedError}
     * @throws {@link LangfuseAPI.MethodNotAllowedError}
     * @throws {@link LangfuseAPI.NotFoundError}
     *
     * @example
     *     await client.trace.deleteMultiple({
     *         traceIds: ["traceIds", "traceIds"]
     *     })
     */
    deleteMultiple(request: DeleteTracesRequest, requestOptions?: Trace.RequestOptions): HttpResponsePromise<DeleteTraceResponse>;
    private __deleteMultiple;
    protected _getAuthorizationHeader(): Promise<string | undefined>;
}

/**
 * This file was auto-generated by Fern from our API Definition.
 */

declare namespace LangfuseAPIClient {
    interface Options {
        environment: Supplier<string>;
        /** Specify a custom URL to connect the client to. */
        baseUrl?: Supplier<string>;
        username?: Supplier<string | undefined>;
        password?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: Supplier<string | undefined>;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: Supplier<string | undefined>;
        /** Additional headers to include in requests. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
    interface RequestOptions {
        /** The maximum time to wait for a response in seconds. */
        timeoutInSeconds?: number;
        /** The number of times to retry the request. Defaults to 2. */
        maxRetries?: number;
        /** A hook to abort the request. */
        abortSignal?: AbortSignal;
        /** Override the X-Langfuse-Sdk-Name header */
        xLangfuseSdkName?: string | undefined;
        /** Override the X-Langfuse-Sdk-Version header */
        xLangfuseSdkVersion?: string | undefined;
        /** Override the X-Langfuse-Public-Key header */
        xLangfusePublicKey?: string | undefined;
        /** Additional query string parameters to include in the request. */
        queryParams?: Record<string, unknown>;
        /** Additional headers to include in the request. */
        headers?: Record<string, string | Supplier<string | null | undefined> | null | undefined>;
    }
}
declare class LangfuseAPIClient {
    protected readonly _options: LangfuseAPIClient.Options;
    protected _annotationQueues: AnnotationQueues | undefined;
    protected _blobStorageIntegrations: BlobStorageIntegrations | undefined;
    protected _comments: Comments | undefined;
    protected _datasetItems: DatasetItems | undefined;
    protected _datasetRunItems: DatasetRunItems | undefined;
    protected _datasets: Datasets | undefined;
    protected _health: Health | undefined;
    protected _ingestion: Ingestion | undefined;
    protected _llmConnections: LlmConnections | undefined;
    protected _media: Media | undefined;
    protected _metricsV2: MetricsV2 | undefined;
    protected _metrics: Metrics | undefined;
    protected _models: Models | undefined;
    protected _observationsV2: ObservationsV2 | undefined;
    protected _observations: Observations | undefined;
    protected _opentelemetry: Opentelemetry | undefined;
    protected _organizations: Organizations | undefined;
    protected _projects: Projects | undefined;
    protected _promptVersion: PromptVersion | undefined;
    protected _prompts: Prompts | undefined;
    protected _scim: Scim | undefined;
    protected _scoreConfigs: ScoreConfigs | undefined;
    protected _scoreV2: ScoreV2 | undefined;
    protected _score: Score | undefined;
    protected _sessions: Sessions | undefined;
    protected _trace: Trace | undefined;
    constructor(_options: LangfuseAPIClient.Options);
    get annotationQueues(): AnnotationQueues;
    get blobStorageIntegrations(): BlobStorageIntegrations;
    get comments(): Comments;
    get datasetItems(): DatasetItems;
    get datasetRunItems(): DatasetRunItems;
    get datasets(): Datasets;
    get health(): Health;
    get ingestion(): Ingestion;
    get llmConnections(): LlmConnections;
    get media(): Media;
    get metricsV2(): MetricsV2;
    get metrics(): Metrics;
    get models(): Models;
    get observationsV2(): ObservationsV2;
    get observations(): Observations;
    get opentelemetry(): Opentelemetry;
    get organizations(): Organizations;
    get projects(): Projects;
    get promptVersion(): PromptVersion;
    get prompts(): Prompts;
    get scim(): Scim;
    get scoreConfigs(): ScoreConfigs;
    get scoreV2(): ScoreV2;
    get score(): Score;
    get sessions(): Sessions;
    get trace(): Trace;
}

type LangfuseEnvVar = "LANGFUSE_PUBLIC_KEY" | "LANGFUSE_SECRET_KEY" | "LANGFUSE_BASE_URL" | "LANGFUSE_BASEURL" | "LANGFUSE_TIMEOUT" | "LANGFUSE_FLUSH_AT" | "LANGFUSE_FLUSH_INTERVAL" | "LANGFUSE_LOG_LEVEL" | "LANGFUSE_RELEASE" | "LANGFUSE_TRACING_ENVIRONMENT";
declare function getEnv(key: LangfuseEnvVar): string | undefined;
declare function generateUUID(globalThis?: any): string;
declare function safeSetTimeout(fn: () => void, timeout: number): any;
declare function base64ToBytes(base64: string): Uint8Array;
declare function bytesToBase64(bytes: Uint8Array): string;
declare function base64Encode(input: string): string;
declare function base64Decode(input: string): string;
/**
 * Generate a random experiment ID (16 hex characters from 8 random bytes).
 * @internal
 */
declare function createExperimentId(): Promise<string>;
/**
 * Generate experiment item ID from input hash (first 16 hex chars of SHA-256).
 * Skips serialization if input is already a string.
 * @internal
 */
declare function createExperimentItemId(input: any): Promise<string>;
/**
 * Serialize a value to JSON string, handling undefined/null.
 * Skips serialization if value is already a string.
 * @internal
 */
declare function serializeValue(value: any): string | undefined;

type ParsedMediaReference = {
    mediaId: string;
    source: string;
    contentType: MediaContentType;
};

/**
 * Parameters for creating a LangfuseMedia instance.
 *
 * Supports two input formats:
 * - Base64 data URI (e.g., "data:image/png;base64,...")
 * - Raw bytes with explicit content type
 *
 * @public
 */
type LangfuseMediaParams = {
    /** Indicates the media is provided as a base64 data URI */
    source: "base64_data_uri";
    /** The complete base64 data URI string */
    base64DataUri: string;
} | {
    /** Indicates the media is provided as raw bytes */
    source: "bytes";
    /** The raw content bytes */
    contentBytes: Uint8Array;
    /** The MIME type of the content */
    contentType: MediaContentType;
};
/**
 * A class for wrapping media objects for upload to Langfuse.
 *
 * This class handles the preparation and formatting of media content for Langfuse,
 * supporting both base64 data URIs and raw content bytes. It automatically:
 * - Parses base64 data URIs to extract content type and bytes
 * - Generates SHA-256 hashes for content integrity
 * - Creates unique media IDs based on content hash
 * - Formats media references for embedding in traces
 *
 * @example
 * ```typescript
 * // From base64 data URI
 * const media1 = new LangfuseMedia({
 *   source: "base64_data_uri",
 *   base64DataUri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
 * });
 *
 * // From raw bytes
 * const media2 = new LangfuseMedia({
 *   source: "bytes",
 *   contentBytes: new Uint8Array([72, 101, 108, 108, 111])
 *   contentType: "text/plain"
 * });
 *
 * console.log(media1.id); // Unique media ID
 * console.log(media1.tag); // Media reference tag
 * ```
 *
 * @public
 */
declare class LangfuseMedia {
    _contentBytes?: Uint8Array;
    _contentType?: MediaContentType;
    _source?: string;
    /**
     * Creates a new LangfuseMedia instance.
     *
     * @param params - Media parameters specifying the source and content
     *
     * @example
     * ```typescript
     * // Create from base64 data URI
     * const media = new LangfuseMedia({
     *   source: "base64_data_uri",
     *   base64DataUri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
     * });
     * ```
     */
    constructor(params: LangfuseMediaParams);
    /**
     * Parses a base64 data URI to extract content bytes and type.
     *
     * @param data - The base64 data URI string
     * @returns Tuple of [contentBytes, contentType] or [undefined, undefined] on error
     * @private
     */
    private parseBase64DataUri;
    /**
     * Gets a unique identifier for this media based on its content hash.
     *
     * The ID is derived from the first 22 characters of the URL-safe base64-encoded
     * SHA-256 hash of the content.
     *
     * @returns The unique media ID, or null if hash generation failed
     *
     * @example
     * ```typescript
     * const media = new LangfuseMedia({...});
     * console.log(media.id); // "A1B2C3D4E5F6G7H8I9J0K1"
     * ```
     */
    getId(): Promise<string | null>;
    /**
     * Gets the length of the media content in bytes.
     *
     * @returns The content length in bytes, or undefined if no content is available
     */
    get contentLength(): number | undefined;
    /**
     * Gets the SHA-256 hash of the media content.
     *
     * The hash is used for content integrity verification and generating unique media IDs.
     * Returns undefined if crypto is not available or hash generation fails.
     *
     * @returns The base64-encoded SHA-256 hash, or undefined if unavailable
     */
    getSha256Hash(): Promise<string | undefined>;
    /**
     * Gets the media reference tag for embedding in trace data.
     *
     * The tag format is: `@@@langfuseMedia:type=<contentType>|id=<mediaId>|source=<source>@@@`
     * This tag can be embedded in trace attributes and will be replaced with actual
     * media content when the trace is viewed in Langfuse.
     *
     * @returns The media reference tag, or null if required data is missing
     *
     * @example
     * ```typescript
     * const media = new LangfuseMedia({...});
     * console.log(media.tag);
     * // "@@@langfuseMedia:type=image/png|id=A1B2C3D4E5F6G7H8I9J0K1|source=base64_data_uri@@@"
     * ```
     */
    getTag(): Promise<string | null>;
    /**
     * Gets the media content as a base64 data URI.
     *
     * @returns The complete data URI string, or null if no content is available
     *
     * @example
     * ```typescript
     * const media = new LangfuseMedia({...});
     * console.log(media.base64DataUri);
     * // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
     * ```
     */
    get base64DataUri(): string | null;
    /**
     * Serializes the media to JSON (returns the base64 data URI).
     *
     * @returns The base64 data URI, or null if no content is available
     */
    toJSON(): string | null;
}

/**
 * Attribute propagation utilities for Langfuse OpenTelemetry integration.
 *
 * This module provides the `propagateAttributes` function for setting trace-level
 * attributes (userId, sessionId, metadata) that automatically propagate to all child spans
 * within the context.
 */

type CorrelatedKey = "userId" | "sessionId" | "metadata" | "version" | "tags" | "traceName";
declare const experimentKeys: readonly ["experimentId", "experimentName", "experimentMetadata", "experimentDatasetId", "experimentItemId", "experimentItemMetadata", "experimentItemRootObservationId"];
type ExperimentKey = (typeof experimentKeys)[number];
type PropagatedKey = CorrelatedKey | ExperimentKey;
type PropagatedExperimentAttributes = {
    experimentId: string;
    experimentName: string;
    experimentMetadata?: string;
    experimentDatasetId?: string;
    experimentItemId: string;
    experimentItemMetadata?: string;
    experimentItemRootObservationId: string;
};
declare const LangfuseOtelContextKeys: Record<PropagatedKey, symbol>;
/**
 * Parameters for propagateAttributes function.
 *
 * @public
 */
interface PropagateAttributesParams {
    /**
     * User identifier to associate with all spans in this context.
     * Must be a string ≤200 characters. Use this to track which user
     * generated each trace and enable e.g. per-user cost/performance analysis.
     */
    userId?: string;
    /**
     * Session identifier to associate with all spans in this context.
     * Must be a string ≤200 characters. Use this to group related traces
     * within a user session (e.g., a conversation thread, multi-turn interaction).
     */
    sessionId?: string;
    /**
     * Additional key-value metadata to propagate to all spans.
     * - Keys and values must be strings
     * - All values must be ≤200 characters
     * - Use for dimensions like internal correlating identifiers
     * - AVOID: large payloads, sensitive data, non-string values (will be dropped with warning)
     */
    metadata?: Record<string, string>;
    /**
     * Version identifier for parts of your application that are independently versioned, e.g. agents
     */
    version?: string;
    /**
     * List of tags to categorize the group of observations
     */
    tags?: string[];
    /**
     * Trace name to associate with all spans in this context.
     * Must be a string ≤200 characters.
     */
    traceName?: string;
    /**
     * If true, propagates attributes using OpenTelemetry baggage for
     * cross-process/service propagation.
     *
     * **Security warning**: When enabled, attribute values are added to HTTP headers
     * on ALL outbound requests. Only enable if values are safe to transmit via HTTP
     * headers and you need cross-service tracing.
     *
     * @defaultValue false
     */
    asBaggage?: boolean;
    /**
     * **INTERNAL USE ONLY** - For Langfuse experiment framework.
     *
     * This parameter is used internally by the Langfuse experiment system to propagate
     * experiment context to child spans. It should NOT be used by external code.
     *
     * @internal
     */
    _internalExperiment?: PropagatedExperimentAttributes;
}
/**
 * Propagate trace-level attributes to all spans created within this context.
 *
 * This function sets attributes on the currently active span AND automatically
 * propagates them to all new child spans created within the callback. This is the
 * recommended way to set trace-level attributes like userId, sessionId, and metadata
 * dimensions that should be consistently applied across all observations in a trace.
 *
 * **IMPORTANT**: Call this as early as possible within your trace/workflow. Only the
 * currently active span and spans created after entering this context will have these
 * attributes. Pre-existing spans will NOT be retroactively updated.
 *
 * **Why this matters**: Langfuse aggregation queries (e.g., total cost by userId,
 * filtering by sessionId) only include observations that have the attribute set.
 * If you call `propagateAttributes` late in your workflow, earlier spans won't be
 * included in aggregations for that attribute.
 *
 * @param params - Configuration for attributes to propagate
 * @param fn - Callback function (sync or async) within which attributes are propagated
 * @returns The result of the callback function
 *
 * @example
 * Basic usage with user and session tracking:
 *
 * ```typescript
 * import { startActiveObservation, propagateAttributes } from '@langfuse/tracing';
 *
 * // Set attributes early in the trace
 * await startActiveObservation('user_workflow', async (span) => {
 *   await propagateAttributes({
 *     userId: 'user_123',
 *     sessionId: 'session_abc',
 *     metadata: { experiment: 'variant_a', environment: 'production' }
 *   }, async () => {
 *     // All spans created here will have userId, sessionId, and metadata
 *     const llmSpan = startObservation('llm_call', { input: 'Hello' });
 *     // This span inherits: userId, sessionId, experiment, environment
 *     llmSpan.end();
 *
 *     const gen = startObservation('completion', {}, { asType: 'generation' });
 *     // This span also inherits all attributes
 *     gen.end();
 *   });
 * });
 * ```
 *
 * @example
 * Late propagation (anti-pattern):
 *
 * ```typescript
 * await startActiveObservation('workflow', async (span) => {
 *   // These spans WON'T have userId
 *   const earlySpan = startObservation('early_work', { input: 'data' });
 *   earlySpan.end();
 *
 *   // Set attributes in the middle
 *   await propagateAttributes({ userId: 'user_123' }, async () => {
 *     // Only spans created AFTER this point will have userId
 *     const lateSpan = startObservation('late_work', { input: 'more' });
 *     lateSpan.end();
 *   });
 *
 *   // Result: Aggregations by userId will miss "early_work" span
 * });
 * ```
 *
 * @example
 * Cross-service propagation with baggage (advanced):
 *
 * ```typescript
 * import fetch from 'node-fetch';
 *
 * // Service A - originating service
 * await startActiveObservation('api_request', async () => {
 *   await propagateAttributes({
 *     userId: 'user_123',
 *     sessionId: 'session_abc',
 *     asBaggage: true  // Propagate via HTTP headers
 *   }, async () => {
 *     // Make HTTP request to Service B
 *     const response = await fetch('https://service-b.example.com/api');
 *     // userId and sessionId are now in HTTP headers
 *   });
 * });
 *
 * // Service B - downstream service
 * // OpenTelemetry will automatically extract baggage from HTTP headers
 * // and propagate to spans in Service B
 * ```
 *
 * @remarks
 * - **Validation**: All attribute values (userId, sessionId, metadata values)
 *   must be strings ≤200 characters. Invalid values will be dropped with a
 *   warning logged. Ensure values meet constraints before calling.
 * - **OpenTelemetry**: This uses OpenTelemetry context propagation under the hood,
 *   making it compatible with other OTel-instrumented libraries.
 * - **Baggage Security**: When `asBaggage=true`, attribute values are added to HTTP
 *   headers on outbound requests. Only use for non-sensitive values and when you
 *   need cross-service tracing.
 *
 * @public
 */
declare function propagateAttributes<A extends unknown[], F extends (...args: A) => ReturnType<F>>(params: PropagateAttributesParams, fn: F): ReturnType<F>;
declare function getPropagatedAttributesFromContext(context: Context): Record<string, string | string[]>;

export { AccessDeniedError, type AnnotationQueue, type AnnotationQueueAssignmentRequest, type AnnotationQueueItem, AnnotationQueueObjectType, AnnotationQueueStatus, type ApiKeyDeletionResponse, type ApiKeyList, type ApiKeyResponse, type ApiKeySummary, type AuthenticationScheme, type BaseEvent, type BasePrompt, type BaseScore, type BaseScoreV1, BlobStorageExportFrequency, BlobStorageExportMode, type BlobStorageIntegrationDeletionResponse, BlobStorageIntegrationFileType, type BlobStorageIntegrationResponse, BlobStorageIntegrationType, type BlobStorageIntegrationsResponse, type BooleanScore, type BooleanScoreV1, type BulkConfig, type CategoricalScore, type CategoricalScoreV1, type ChatMessage, ChatMessageWithPlaceholders, type ChatPrompt, type Comment, CommentObjectType, type ConfigCategory, type CorrectionScore, type CreateAnnotationQueueAssignmentResponse, type CreateAnnotationQueueItemRequest, type CreateAnnotationQueueRequest, type CreateApiKeyRequest, type CreateBlobStorageIntegrationRequest, type CreateChatPromptRequest, type CreateCommentRequest, type CreateCommentResponse, type CreateDatasetItemRequest, type CreateDatasetRequest, type CreateDatasetRunItemRequest, type CreateEventBody, type CreateEventEvent, type CreateGenerationBody, type CreateGenerationEvent, type CreateModelRequest, type CreateObservationEvent, type CreateProjectRequest, CreatePromptRequest, type CreateScoreConfigRequest, type CreateScoreRequest, type CreateScoreResponse, type CreateScoreValue, type CreateSpanBody, type CreateSpanEvent, type CreateTextPromptRequest, type CreateUserRequest, type Dataset, type DatasetItem, type DatasetRun, type DatasetRunItem, type DatasetRunWithItems, DatasetStatus, type DeleteAnnotationQueueAssignmentResponse, type DeleteAnnotationQueueItemResponse, type DeleteDatasetItemResponse, type DeleteDatasetRunResponse, type DeleteMembershipRequest, type DeletePromptRequest, type DeleteTraceResponse, type DeleteTracesRequest, type EmptyResponse, Error$1 as Error, type FilterConfig, type GetAnnotationQueueItemsRequest, type GetAnnotationQueuesRequest, type GetCommentsRequest, type GetCommentsResponse, type GetDatasetItemsRequest, type GetDatasetRunsRequest, type GetDatasetsRequest, type GetLlmConnectionsRequest, type GetMediaResponse, type GetMediaUploadUrlRequest, type GetMediaUploadUrlResponse, type GetMetricsRequest, type GetMetricsV2Request, type GetModelsRequest, type GetObservationsRequest, type GetObservationsV2Request, type GetPromptRequest, type GetScoreConfigsRequest, type GetScoresRequest, type GetScoresResponse, GetScoresResponseData, type GetScoresResponseDataBoolean, type GetScoresResponseDataCategorical, type GetScoresResponseDataCorrection, type GetScoresResponseDataNumeric, type GetScoresResponseTraceData, type GetSessionsRequest, type GetTracesRequest, type HealthResponse, type IngestionError, IngestionEvent, type IngestionRequest, type IngestionResponse, type IngestionSuccess, type IngestionUsage, LANGFUSE_SDK_EXPERIMENT_ENVIRONMENT, LANGFUSE_SDK_NAME, LANGFUSE_SDK_VERSION, LANGFUSE_TRACER_NAME, LangfuseAPIClient, LangfuseAPIError, LangfuseAPITimeoutError, LangfuseMedia, type LangfuseMediaParams, LangfuseOtelContextKeys, LangfuseOtelSpanAttributes, type ListDatasetRunItemsRequest, type ListPromptsMetaRequest, type ListUsersRequest, LlmAdapter, type LlmConnection, LogLevel, Logger, type LoggerConfig, type MapValue, MediaContentType, type MembershipDeletionResponse, type MembershipRequest, type MembershipResponse, MembershipRole, type MembershipsResponse, MethodNotAllowedError, type MetricsResponse, type MetricsV2Response, type Model, type ModelPrice, ModelUsageUnit, NotFoundError, type NumericScore, type NumericScoreV1, type Observation, type ObservationBody, ObservationLevel, ObservationType, type Observations$1 as Observations, type ObservationsV2Meta, type ObservationsV2Response, type ObservationsView, type ObservationsViews, type OpenAiCompletionUsageSchema, type OpenAiResponseUsageSchema, type OpenAiUsage, type OptionalObservationBody, type Organization, type OrganizationApiKey, type OrganizationApiKeysResponse, type OrganizationProject, type OrganizationProjectsResponse, type OtelAttribute, type OtelAttributeValue, type OtelResource, type OtelResourceSpan, type OtelScope, type OtelScopeSpan, type OtelSpan, type OtelTraceRequest, type OtelTraceResponse, type PaginatedAnnotationQueueItems, type PaginatedAnnotationQueues, type PaginatedDatasetItems, type PaginatedDatasetRunItems, type PaginatedDatasetRuns, type PaginatedDatasets, type PaginatedLlmConnections, type PaginatedModels, type PaginatedSessions, type ParsedMediaReference, type PatchMediaBody, type PlaceholderMessage, type PricingTier, type PricingTierCondition, type PricingTierInput, PricingTierOperator, type Project, type ProjectDeletionResponse, type Projects$1 as Projects, Prompt, type PromptMeta, type PromptMetaListResponse, PromptType, type PropagateAttributesParams, type ResourceMeta, type ResourceType, type ResourceTypesResponse, type SchemaExtension, type SchemaResource, type SchemasResponse, type ScimEmail, type ScimFeatureSupport, type ScimName, type ScimUser, type ScimUsersListResponse, Score$1 as Score, type ScoreBody, type ScoreConfig, ScoreConfigDataType, type ScoreConfigs$1 as ScoreConfigs, ScoreDataType, type ScoreEvent, ScoreSource, ScoreV1, type SdkLogBody, type SdkLogEvent, type ServiceProviderConfig, ServiceUnavailableError, type Session, type SessionWithTraces, type Sort, type TextPrompt, type Trace$1 as Trace, type TraceBody, type TraceEvent, type TraceWithDetails, type TraceWithFullDetails, type Traces, UnauthorizedError, type UpdateAnnotationQueueItemRequest, type UpdateEventBody, type UpdateGenerationBody, type UpdateGenerationEvent, type UpdateObservationEvent, type UpdateProjectRequest, type UpdatePromptRequest, type UpdateScoreConfigRequest, type UpdateSpanBody, type UpdateSpanEvent, type UpsertLlmConnectionRequest, type Usage, type UsageDetails, type UserMeta, index$s as annotationQueues, base64Decode, base64Encode, base64ToBytes, index$r as blobStorageIntegrations, bytesToBase64, index$q as comments, index$p as commons, configureGlobalLogger, createExperimentId, createExperimentItemId, createLogger, index$o as datasetItems, index$n as datasetRunItems, index$m as datasets, generateUUID, getEnv, getGlobalLogger, getPropagatedAttributesFromContext, index$l as health, index$k as ingestion, index$j as llmConnections, LoggerSingleton as logger, index$i as media, index$g as metrics, index$h as metricsV2, index$f as models, index$d as observations, index$e as observationsV2, index$c as opentelemetry, index$b as organizations, index$a as projects, index as promptVersion, index$9 as prompts, propagateAttributes, resetGlobalLogger, safeSetTimeout, index$8 as scim, index$5 as score, index$7 as scoreConfigs, index$6 as scoreV2, serializeValue, index$4 as sessions, index$3 as trace, index$1 as utils };
