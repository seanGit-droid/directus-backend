import {
  GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
  applySpecialCasePatch,
  create,
  getPackageName,
  getPackageVersion,
  installMastraExporterFactory,
  newGlobalTracingChannel,
  setGlobalHookErrorReporter
} from "./chunk-2AMDGD65.mjs";

// src/auto-instrumentations/hook.mts
import { register } from "module";

// src/instrumentation/config.ts
var envIntegrationAliases = {
  openai: "openai",
  "openai-codex": "openaiCodexSDK",
  "openai-codex-sdk": "openaiCodexSDK",
  openaicodexsdk: "openaiCodexSDK",
  codex: "openaiCodexSDK",
  "codex-sdk": "openaiCodexSDK",
  "pi-coding-agent": "piCodingAgent",
  "pi-coding-agent-sdk": "piCodingAgent",
  picodingagent: "piCodingAgent",
  picodingagentsdk: "piCodingAgent",
  "@earendil-works/pi-coding-agent": "piCodingAgent",
  strandsAgentSDK: "strandsAgentSDK",
  strandsagentsdk: "strandsAgentSDK",
  "strands-agent-sdk": "strandsAgentSDK",
  "@strands-agents/sdk": "strandsAgentSDK",
  agents: "cloudflareAgents",
  "cloudflare-agents": "cloudflareAgents",
  cloudflareagents: "cloudflareAgents",
  anthropic: "anthropic",
  aisdk: "aisdk",
  "ai-sdk": "aisdk",
  "vercel-ai": "aisdk",
  vercel: "vercel",
  claudeagentsdk: "claudeAgentSDK",
  "claude-agent-sdk": "claudeAgentSDK",
  cloudflareaichat: "cloudflareAIChat",
  "cloudflare-ai-chat": "cloudflareAIChat",
  "@cloudflare/ai-chat": "cloudflareAIChat",
  cloudflarethink: "cloudflareThink",
  cursor: "cursor",
  "cursor-sdk": "cursorSDK",
  cursorsdk: "cursorSDK",
  flue: "flue",
  "flue-runtime": "flue",
  mastra: "mastra",
  "openai-agents": "openAIAgents",
  openaiagents: "openAIAgents",
  "openai-agents-core": "openAIAgents",
  openaiagentscore: "openAIAgents",
  google: "google",
  "google-genai": "googleGenAI",
  googlegenai: "googleGenAI",
  huggingface: "huggingface",
  "@huggingface/transformers": "huggingface",
  transformers: "huggingface",
  openrouter: "openrouter",
  openrouteragent: "openrouterAgent",
  "openrouter-agent": "openrouterAgent",
  mistral: "mistral",
  ollama: "ollama",
  googleadk: "googleADK",
  "google-adk": "googleADK",
  cohere: "cohere",
  groq: "groq",
  "groq-sdk": "groq",
  bedrock: "bedrock",
  "aws-bedrock": "awsBedrock",
  awsbedrock: "awsBedrock",
  "aws-bedrock-runtime": "awsBedrockRuntime",
  awsbedrockruntime: "awsBedrockRuntime",
  "@aws-sdk/client-bedrock-runtime": "awsBedrockRuntime",
  genkit: "genkit",
  "firebase-genkit": "genkit",
  githubcopilot: "gitHubCopilot",
  "github-copilot": "gitHubCopilot",
  "copilot-sdk": "gitHubCopilot",
  langchain: "langchain",
  "langchain-js": "langchain",
  "@langchain": "langchain",
  langgraph: "langgraph",
  langsmith: "langsmith"
};
function readDisabledInstrumentationEnvConfig(disabledList) {
  const integrations = {};
  if (disabledList) {
    for (const value of disabledList.split(",")) {
      const rawSdk = value.trim();
      const sdk = rawSdk.toLowerCase();
      if (sdk.length > 0) {
        integrations[envIntegrationAliases[rawSdk] ?? envIntegrationAliases[sdk] ?? sdk] = false;
      }
    }
  }
  return { integrations };
}
function isInstrumentationIntegrationDisabled(integrations, ...names) {
  return names.some((name) => integrations?.[name] === false);
}

// src/isomorph.ts
var DefaultAsyncLocalStorage = class {
  constructor() {
  }
  enterWith(_) {
  }
  run(_, callback) {
    return callback();
  }
  getStore() {
    return void 0;
  }
};
var iso = {
  buildType: "unknown",
  // Will be set by configureBrowser() or configureNode()
  getRepoInfo: async (_settings) => void 0,
  getPastNAncestors: async () => [],
  getEnv: (_name) => void 0,
  getBraintrustApiKey: async () => void 0,
  getCallerLocation: () => void 0,
  newAsyncLocalStorage: () => new DefaultAsyncLocalStorage(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newTracingChannel: (nameOrChannels) => newGlobalTracingChannel(nameOrChannels),
  processOn: (_0, _1) => {
  },
  basename: (filepath) => filepath.split(/[\\/]/).pop() || filepath,
  // eslint-disable-next-line no-restricted-properties -- preserving intentional console usage.
  writeln: (text) => console.log(text)
};
var isomorph_default = iso;

// src/debug-logger.ts
var PREFIX = "[braintrust]";
var DEBUG_LOG_LEVEL_SYMBOL = /* @__PURE__ */ Symbol.for("braintrust-debug-log-level");
var LOG_LEVEL_PRIORITY = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
var hasWarnedAboutInvalidEnvValue = false;
var debugLogStateResolver = void 0;
function warnInvalidEnvValue(value) {
  if (hasWarnedAboutInvalidEnvValue) {
    return;
  }
  hasWarnedAboutInvalidEnvValue = true;
  console.warn(
    PREFIX,
    `Invalid BRAINTRUST_DEBUG_LOG_LEVEL value "${value}". Expected "error", "warn", "info", or "debug".`
  );
}
function normalizeDebugLogLevelOption(option) {
  if (option === false) {
    return void 0;
  }
  if (option === "error" || option === "warn" || option === "info" || option === "debug") {
    return option;
  }
  throw new Error(
    `Invalid debugLogLevel value "${option}". Expected false, "error", "warn", "info", or "debug".`
  );
}
function parseDebugLogLevelEnv(value) {
  if (!value) {
    return void 0;
  }
  if (value === "error" || value === "warn" || value === "info" || value === "debug") {
    return value;
  }
  warnInvalidEnvValue(value);
  return void 0;
}
function getEnvDebugLogLevel() {
  return parseDebugLogLevelEnv(isomorph_default.getEnv("BRAINTRUST_DEBUG_LOG_LEVEL"));
}
function setGlobalDebugLogLevel(level) {
  globalThis[DEBUG_LOG_LEVEL_SYMBOL] = level;
}
function setDebugLogStateResolver(resolver) {
  debugLogStateResolver = resolver;
}
function resolveDebugLogLevel(state2) {
  const stateLevel = state2?.getDebugLogLevel?.();
  const hasStateOverride = state2?.hasDebugLogLevelOverride?.() ?? false;
  if (hasStateOverride) {
    return stateLevel;
  }
  const globalLevel = (
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    globalThis[DEBUG_LOG_LEVEL_SYMBOL]
  );
  if (globalLevel !== void 0) {
    return globalLevel === false ? void 0 : globalLevel;
  }
  return getEnvDebugLogLevel();
}
function emit(method, state2, args) {
  const level = resolveDebugLogLevel(state2);
  if (!level || LOG_LEVEL_PRIORITY[method] > LOG_LEVEL_PRIORITY[level]) {
    return;
  }
  if (method === "info") {
    console.log(PREFIX, ...args);
  } else if (method === "debug") {
    console.debug(PREFIX, ...args);
  } else if (method === "warn") {
    console.warn(PREFIX, ...args);
  } else {
    console.error(PREFIX, ...args);
  }
}
function createDebugLogger(state2) {
  const resolveState = () => state2 ?? debugLogStateResolver?.();
  return {
    info(...args) {
      emit("info", resolveState(), args);
    },
    debug(...args) {
      emit("debug", resolveState(), args);
    },
    warn(...args) {
      emit("warn", resolveState(), args);
    },
    error(...args) {
      emit("error", resolveState(), args);
    }
  };
}
var debugLogger = {
  ...createDebugLogger(),
  forState(state2) {
    return createDebugLogger(state2);
  }
};
setGlobalHookErrorReporter((error) => {
  debugLogger.error("Global instrumentation hook error:", error);
});

// src/logger.ts
import { v4 as uuidv42 } from "uuid";

// src/queue.ts
var DEFAULT_QUEUE_SIZE = 15e3;
var Queue = class {
  items = [];
  maxSize;
  enforceSizeLimit = false;
  constructor(maxSize) {
    if (maxSize < 1) {
      debugLogger.warn(
        `maxSize ${maxSize} is <1, using default ${DEFAULT_QUEUE_SIZE}`
      );
      maxSize = DEFAULT_QUEUE_SIZE;
    }
    this.maxSize = maxSize;
  }
  /**
   * Set queue size limit enforcement. When enabled, the queue will drop new items
   * when it reaches maxSize. When disabled (default), the queue can grow unlimited.
   */
  enforceQueueSizeLimit(enforce) {
    this.enforceSizeLimit = enforce;
  }
  push(...items) {
    const dropped = [];
    for (const item of items) {
      if (!this.enforceSizeLimit) {
        this.items.push(item);
      } else {
        if (this.items.length >= this.maxSize) {
          dropped.push(item);
        } else {
          this.items.push(item);
        }
      }
    }
    return dropped;
  }
  peek() {
    return this.items[0];
  }
  drain() {
    const items = [...this.items];
    this.items = [];
    return items;
  }
  clear() {
    this.items = [];
  }
  length() {
    return this.items.length;
  }
  get capacity() {
    return this.maxSize;
  }
};

// src/id-gen.ts
import { v4 as uuidv4 } from "uuid";
var IDGenerator = class {
};
var UUIDGenerator = class extends IDGenerator {
  getSpanId() {
    return uuidv4();
  }
  getTraceId() {
    return uuidv4();
  }
  shareRootSpanId() {
    return true;
  }
};
function generateHexId(bytes) {
  let result = "";
  for (let i = 0; i < bytes; i++) {
    result += Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
  }
  return result;
}
var OTELIDGenerator = class extends IDGenerator {
  getSpanId() {
    return generateHexId(8);
  }
  getTraceId() {
    return generateHexId(16);
  }
  shareRootSpanId() {
    return false;
  }
};
function parseEnvBool(name) {
  const raw = isomorph_default.getEnv(name);
  if (raw === void 0 || raw === null) {
    return false;
  }
  const normalized = raw.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes" || normalized === "y" || normalized === "on";
}
var _warnedLegacyUuidConflict = false;
function resolveUseLegacyUuidIds() {
  const legacy = parseEnvBool("BRAINTRUST_LEGACY_IDS");
  if (parseEnvBool("BRAINTRUST_OTEL_COMPAT")) {
    if (legacy && !_warnedLegacyUuidConflict) {
      _warnedLegacyUuidConflict = true;
      debugLogger.warn(
        "BRAINTRUST_LEGACY_IDS is ignored because BRAINTRUST_OTEL_COMPAT requires OpenTelemetry-compatible hex span IDs. Using hex IDs."
      );
    }
    return false;
  }
  return legacy;
}
function getIdGenerator() {
  if (globalThis.BRAINTRUST_ID_GENERATOR !== void 0) {
    return new globalThis.BRAINTRUST_ID_GENERATOR();
  }
  return resolveUseLegacyUuidIds() ? new UUIDGenerator() : new OTELIDGenerator();
}

// src/propagation.ts
var TRACEPARENT_HEADER = "traceparent";
var TRACESTATE_HEADER = "tracestate";
var BAGGAGE_HEADER = "baggage";
var BRAINTRUST_PARENT_KEY = "braintrust.parent";
var DEFAULT_TRACE_FLAGS = "01";
var TRACEPARENT_RE = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/;
var ZERO_TRACE_ID = "0".repeat(32);
var ZERO_SPAN_ID = "0".repeat(16);
var MAX_BAGGAGE_LENGTH = 8192;
var MAX_BAGGAGE_MEMBERS = 64;
var _utf8Encoder = new TextEncoder();
function utf8ByteLength(value) {
  return _utf8Encoder.encode(value).length;
}
function capBaggageToMemberBoundary(value) {
  const totalBytes = utf8ByteLength(value);
  const withinBytes = totalBytes <= MAX_BAGGAGE_LENGTH;
  let commaCount = 0;
  for (let i = 0; i < value.length; i++) {
    if (value.charCodeAt(i) === 44) {
      commaCount++;
    }
  }
  const withinMembers = commaCount < MAX_BAGGAGE_MEMBERS;
  if (withinBytes && withinMembers) {
    return value;
  }
  const kept = [];
  let length = 0;
  for (const rawMember of value.split(",")) {
    if (kept.length >= MAX_BAGGAGE_MEMBERS) {
      break;
    }
    const cost = utf8ByteLength(rawMember) + (kept.length ? 1 : 0);
    if (length + cost > MAX_BAGGAGE_LENGTH) {
      break;
    }
    kept.push(rawMember);
    length += cost;
  }
  if (!kept.length) {
    return "";
  }
  return kept.join(",");
}
function isTraceContextHeaderTupleArray(value) {
  return Array.isArray(value) && value.every(
    (item) => Array.isArray(item) && typeof item[0] === "string" && typeof item[1] === "string"
  );
}
function isListHeader(name) {
  const lowered = name.toLowerCase();
  return lowered === BAGGAGE_HEADER || lowered === TRACESTATE_HEADER;
}
function headerValueToString(value, name) {
  if (value === void 0 || value === null) {
    return void 0;
  }
  if (Array.isArray(value)) {
    const stringValues = value.filter((item) => {
      return typeof item === "string";
    });
    if (!stringValues.length) {
      return void 0;
    }
    return isListHeader(name) ? stringValues.join(",") : stringValues[0];
  }
  return typeof value === "string" ? value : String(value);
}
function getHeader(headers, name) {
  if (!headers) {
    return void 0;
  }
  if (isTraceContextHeaderTupleArray(headers)) {
    const lowered2 = name.toLowerCase();
    const matches = headers.filter(([key]) => key.toLowerCase() === lowered2).map(([, value]) => value);
    if (!matches.length) {
      return void 0;
    }
    return headerValueToString(matches, name);
  }
  const getter = headers.get;
  if (typeof getter === "function") {
    try {
      const value = headerValueToString(getter.call(headers, name), name);
      if (value !== void 0) {
        return value;
      }
    } catch {
    }
  }
  const nodeGetter = headers.getHeader;
  if (typeof nodeGetter === "function") {
    try {
      const value = headerValueToString(nodeGetter.call(headers, name), name);
      if (value !== void 0) {
        return value;
      }
    } catch {
    }
  }
  const headerBag = headers;
  const exact = headerValueToString(headerBag[name], name);
  if (exact !== void 0) {
    return exact;
  }
  const lowered = name.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key !== name && key.toLowerCase() === lowered) {
      const value = headerValueToString(headerBag[key], name);
      if (value !== void 0) {
        return value;
      }
    }
  }
  return void 0;
}
function isHex(value, length) {
  if (typeof value !== "string" || value.length !== length) {
    return false;
  }
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    const isDigit = c >= "0" && c <= "9";
    const isLowerHex = c >= "a" && c <= "f";
    if (!isDigit && !isLowerHex) {
      return false;
    }
  }
  return true;
}
function parseTraceparent(value) {
  if (!value || typeof value !== "string") {
    return void 0;
  }
  const match = TRACEPARENT_RE.exec(value.trim());
  if (!match) {
    return void 0;
  }
  const traceId = match[1];
  const spanId = match[2];
  const traceFlags = match[3];
  if (traceId === ZERO_TRACE_ID || spanId === ZERO_SPAN_ID) {
    return void 0;
  }
  return { traceId, spanId, traceFlags };
}
function formatTraceparent(traceId, spanId, traceFlags = DEFAULT_TRACE_FLAGS) {
  if (!isHex(traceId, 32) || traceId === ZERO_TRACE_ID) {
    return void 0;
  }
  if (!isHex(spanId, 16) || spanId === ZERO_SPAN_ID) {
    return void 0;
  }
  const flags = isHex(traceFlags, 2) ? traceFlags : DEFAULT_TRACE_FLAGS;
  return `00-${traceId}-${spanId}-${flags}`;
}
function percentEncode(value) {
  return encodeURIComponent(value);
}
function percentDecode(value) {
  if (!value.includes("%")) {
    return value;
  }
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
function parseBaggage(value) {
  const result = {};
  if (!value || typeof value !== "string") {
    return result;
  }
  const bounded = capBaggageToMemberBoundary(value);
  for (let member of bounded.split(",")) {
    member = member.trim();
    if (!member || !member.includes("=")) {
      continue;
    }
    member = member.split(";", 1)[0];
    const eq = member.indexOf("=");
    const key = percentDecode(member.slice(0, eq).trim());
    const val = member.slice(eq + 1).trim();
    if (!key) {
      continue;
    }
    result[key] = percentDecode(val);
  }
  return result;
}
function mergeBaggage(existing, braintrustParent) {
  let btMember = void 0;
  if (braintrustParent) {
    const encodedKey = percentEncode(BRAINTRUST_PARENT_KEY);
    const encodedVal = percentEncode(String(braintrustParent));
    btMember = `${encodedKey}=${encodedVal}`;
    if (utf8ByteLength(btMember) > MAX_BAGGAGE_LENGTH) {
      btMember = void 0;
    }
  }
  let byteBudget = MAX_BAGGAGE_LENGTH;
  let memberBudget = MAX_BAGGAGE_MEMBERS;
  if (btMember !== void 0) {
    byteBudget -= utf8ByteLength(btMember) + 1;
    memberBudget -= 1;
  }
  const relayed = [];
  let length = 0;
  if (existing && typeof existing === "string") {
    for (const rawMember of existing.split(",")) {
      const member = rawMember.trim();
      if (!member || !member.includes("=")) {
        continue;
      }
      const keyPart = member.split(";", 1)[0].split("=", 1)[0];
      const key = percentDecode(keyPart.trim());
      if (key === BRAINTRUST_PARENT_KEY) {
        continue;
      }
      if (relayed.length >= memberBudget) {
        break;
      }
      const cost = utf8ByteLength(member) + (relayed.length ? 1 : 0);
      if (length + cost > byteBudget) {
        break;
      }
      relayed.push(member);
      length += cost;
    }
  }
  const members = btMember !== void 0 ? [...relayed, btMember] : relayed;
  if (!members.length) {
    return void 0;
  }
  return members.join(",");
}

// util/db_fields.ts
var TRANSACTION_ID_FIELD = "_xact_id";
var OBJECT_DELETE_FIELD = "_object_delete";
var IS_MERGE_FIELD = "_is_merge";
var AUDIT_SOURCE_FIELD = "_audit_source";
var AUDIT_METADATA_FIELD = "_audit_metadata";
var VALID_SOURCES = ["app", "api", "external"];
var OBJECT_ID_KEYS = [
  "experiment_id",
  "dataset_id",
  "prompt_session_id",
  "project_id",
  "log_id",
  "function_data"
];

// util/span_identifier_v3.ts
import * as uuid3 from "uuid";

// util/span_identifier_v2.ts
import * as uuid2 from "uuid";

// util/span_identifier_v1.ts
import * as uuid from "uuid";
import { z } from "zod/v3";
function tryMakeUuid(s) {
  try {
    const ret = uuid.parse(s);
    if (ret.length !== 16) {
      throw new Error();
    }
    return { bytes: Buffer.from(ret), isUUID: true };
  } catch (e) {
    return { bytes: Buffer.from(s, "utf-8"), isUUID: false };
  }
}
var ENCODING_VERSION_NUMBER = 1;
var INVALID_ENCODING_ERRMSG = "SpanComponents string is not properly encoded. This may be due to a version mismatch between the SDK library used to export the span and the library used to decode it. Please make sure you are using the same SDK version across the board";
var SpanObjectTypeV1 = /* @__PURE__ */ ((SpanObjectTypeV12) => {
  SpanObjectTypeV12[SpanObjectTypeV12["EXPERIMENT"] = 1] = "EXPERIMENT";
  SpanObjectTypeV12[SpanObjectTypeV12["PROJECT_LOGS"] = 2] = "PROJECT_LOGS";
  return SpanObjectTypeV12;
})(SpanObjectTypeV1 || {});
var SpanObjectTypeV1EnumSchema = z.nativeEnum(SpanObjectTypeV1);
var SpanRowIdsV1 = class {
  rowId;
  spanId;
  rootSpanId;
  constructor(args) {
    this.rowId = args.rowId;
    this.spanId = args.spanId;
    this.rootSpanId = args.rootSpanId;
    if (!this.rowId) {
      throw new Error("rowId must be nonempty string");
    }
    if (!this.spanId) {
      throw new Error("spanId must be nonempty string");
    }
    if (!this.rootSpanId) {
      throw new Error("rootSpanId must be nonempty string");
    }
  }
  toObject() {
    return {
      rowId: this.rowId,
      spanId: this.spanId,
      rootSpanId: this.rootSpanId
    };
  }
};
var SpanComponentsV1 = class _SpanComponentsV1 {
  objectType;
  objectId;
  rowIds;
  constructor(args) {
    this.objectType = args.objectType;
    this.objectId = args.objectId;
    this.rowIds = args.rowIds;
  }
  toStr() {
    const allBuffers = [];
    const { bytes: rowIdBytes, isUUID: rowIdIsUUID } = this.rowIds ? tryMakeUuid(this.rowIds.rowId) : { bytes: Buffer.from(""), isUUID: false };
    allBuffers.push(
      Buffer.from([
        ENCODING_VERSION_NUMBER,
        this.objectType,
        this.rowIds ? 1 : 0,
        rowIdIsUUID ? 1 : 0
      ])
    );
    const { bytes: objectIdBytes, isUUID: objectIdIsUUID } = tryMakeUuid(
      this.objectId
    );
    if (!objectIdIsUUID) {
      throw new Error("object_id component must be a valid UUID");
    }
    allBuffers.push(objectIdBytes);
    if (this.rowIds) {
      const { bytes: spanIdBytes, isUUID: spanIdIsUUID } = tryMakeUuid(
        this.rowIds.spanId
      );
      if (!spanIdIsUUID) {
        throw new Error("span_id component must be a valid UUID");
      }
      const { bytes: rootSpanIdBytes, isUUID: rootSpanIdIsUUID } = tryMakeUuid(
        this.rowIds.rootSpanId
      );
      if (!rootSpanIdIsUUID) {
        throw new Error("root_span_id component must be a valid UUID");
      }
      allBuffers.push(spanIdBytes, rootSpanIdBytes, rowIdBytes);
    }
    return Buffer.concat(allBuffers).toString("base64");
  }
  static fromStr(s) {
    try {
      const rawBytes = Buffer.from(s, "base64");
      if (rawBytes[0] !== ENCODING_VERSION_NUMBER) {
        throw new Error();
      }
      const objectType = SpanObjectTypeV1EnumSchema.parse(rawBytes[1]);
      if (![0, 1].includes(rawBytes[2])) {
        throw new Error();
      }
      if (![0, 1].includes(rawBytes[3])) {
        throw new Error();
      }
      const hasRowId = rawBytes[2] == 1;
      const rowIdIsUUID = rawBytes[3] == 1;
      const objectId = uuid.stringify(rawBytes.subarray(4, 20));
      const rowIds = (() => {
        if (!hasRowId) {
          return void 0;
        }
        const spanId = uuid.stringify(rawBytes.subarray(20, 36));
        const rootSpanId = uuid.stringify(rawBytes.subarray(36, 52));
        const rowId = rowIdIsUUID ? uuid.stringify(rawBytes.subarray(52)) : rawBytes.subarray(52).toString("utf-8");
        return new SpanRowIdsV1({ rowId, spanId, rootSpanId });
      })();
      return new _SpanComponentsV1({ objectType, objectId, rowIds });
    } catch (e) {
      throw new Error(INVALID_ENCODING_ERRMSG);
    }
  }
  objectIdFields() {
    switch (this.objectType) {
      case 1 /* EXPERIMENT */:
        return { experiment_id: this.objectId };
      case 2 /* PROJECT_LOGS */:
        return { project_id: this.objectId, log_id: "g" };
      default:
        throw new Error("Impossible");
    }
  }
  toObject() {
    return {
      objectType: this.objectType,
      objectId: this.objectId,
      rowIds: this.rowIds?.toObject()
    };
  }
};

// util/span_identifier_v2.ts
import { z as z2 } from "zod/v3";
function tryMakeUuid2(s) {
  try {
    const ret = uuid2.parse(s);
    if (ret.length !== 16) {
      throw new Error();
    }
    return { bytes: Buffer.from(ret), isUUID: true };
  } catch (e) {
    return { bytes: Buffer.from(s, "utf-8"), isUUID: false };
  }
}
var ENCODING_VERSION_NUMBER2 = 2;
var INVALID_ENCODING_ERRMSG2 = `SpanComponents string is not properly encoded. This library only supports encoding versions up to ${ENCODING_VERSION_NUMBER2}. Please make sure the SDK library used to decode the SpanComponents is at least as new as any library used to encode it.`;
var INTEGER_ENCODING_NUM_BYTES = 4;
var SpanObjectTypeV2 = /* @__PURE__ */ ((SpanObjectTypeV22) => {
  SpanObjectTypeV22[SpanObjectTypeV22["EXPERIMENT"] = 1] = "EXPERIMENT";
  SpanObjectTypeV22[SpanObjectTypeV22["PROJECT_LOGS"] = 2] = "PROJECT_LOGS";
  return SpanObjectTypeV22;
})(SpanObjectTypeV2 || {});
var SpanObjectTypeV2EnumSchema = z2.nativeEnum(SpanObjectTypeV2);
var SpanRowIdsV2 = class {
  rowId;
  spanId;
  rootSpanId;
  constructor(args) {
    this.rowId = args.rowId;
    this.spanId = args.spanId;
    this.rootSpanId = args.rootSpanId;
    if (!this.rowId) {
      throw new Error("rowId must be nonempty string");
    }
    if (!this.spanId) {
      throw new Error("spanId must be nonempty string");
    }
    if (!this.rootSpanId) {
      throw new Error("rootSpanId must be nonempty string");
    }
  }
  toObject() {
    return {
      rowId: this.rowId,
      spanId: this.spanId,
      rootSpanId: this.rootSpanId
    };
  }
};
var SpanComponentsV2 = class _SpanComponentsV2 {
  objectType;
  objectId;
  computeObjectMetadataArgs;
  rowIds;
  constructor(args) {
    this.objectType = args.objectType;
    this.objectId = args.objectId;
    this.computeObjectMetadataArgs = args.computeObjectMetadataArgs;
    this.rowIds = args.rowIds;
    if (!(this.objectId || this.computeObjectMetadataArgs)) {
      throw new Error(
        "Must provide either objectId or computeObjectMetadataArgs"
      );
    }
  }
  toStr() {
    const allBuffers = [];
    const { bytes: rowIdBytes, isUUID: rowIdIsUUID } = this.rowIds ? tryMakeUuid2(this.rowIds.rowId) : { bytes: Buffer.from(""), isUUID: false };
    allBuffers.push(
      Buffer.from([
        ENCODING_VERSION_NUMBER2,
        this.objectType,
        this.objectId ? 1 : 0,
        this.computeObjectMetadataArgs ? 1 : 0,
        this.rowIds ? 1 : 0,
        rowIdIsUUID ? 1 : 0
      ])
    );
    if (this.objectId) {
      const { bytes: objectIdBytes, isUUID: objectIdIsUUID } = tryMakeUuid2(
        this.objectId
      );
      if (!objectIdIsUUID) {
        throw new Error("object_id component must be a valid UUID");
      }
      allBuffers.push(objectIdBytes);
    }
    if (this.computeObjectMetadataArgs) {
      const computeObjectMetadataBytes = Buffer.from(
        JSON.stringify(this.computeObjectMetadataArgs),
        "utf-8"
      );
      const serializedLenBytes = Buffer.alloc(INTEGER_ENCODING_NUM_BYTES);
      serializedLenBytes.writeInt32BE(computeObjectMetadataBytes.length);
      allBuffers.push(serializedLenBytes, computeObjectMetadataBytes);
    }
    if (this.rowIds) {
      const { bytes: spanIdBytes, isUUID: spanIdIsUUID } = tryMakeUuid2(
        this.rowIds.spanId
      );
      if (!spanIdIsUUID) {
        throw new Error("span_id component must be a valid UUID");
      }
      const { bytes: rootSpanIdBytes, isUUID: rootSpanIdIsUUID } = tryMakeUuid2(
        this.rowIds.rootSpanId
      );
      if (!rootSpanIdIsUUID) {
        throw new Error("root_span_id component must be a valid UUID");
      }
      allBuffers.push(spanIdBytes, rootSpanIdBytes, rowIdBytes);
    }
    return Buffer.concat(allBuffers).toString("base64");
  }
  static fromStr(s) {
    try {
      const rawBytes = Buffer.from(s, "base64");
      if (rawBytes[0] < ENCODING_VERSION_NUMBER2) {
        const spanComponentsOld = SpanComponentsV1.fromStr(s);
        return new _SpanComponentsV2({
          objectType: SpanObjectTypeV2EnumSchema.parse(
            spanComponentsOld.objectType
          ),
          objectId: spanComponentsOld.objectId,
          rowIds: spanComponentsOld.rowIds ? new SpanRowIdsV2({
            rowId: spanComponentsOld.rowIds.rowId,
            spanId: spanComponentsOld.rowIds.spanId,
            rootSpanId: spanComponentsOld.rowIds.rootSpanId
          }) : void 0
        });
      }
      if (rawBytes[0] !== ENCODING_VERSION_NUMBER2) {
        throw new Error();
      }
      const objectType = SpanObjectTypeV2EnumSchema.parse(rawBytes[1]);
      for (let i = 2; i < 6; ++i) {
        if (![0, 1].includes(rawBytes[i])) {
          throw new Error();
        }
      }
      const hasObjectId = rawBytes[2] == 1;
      const hasComputeObjectMetadataArgs = rawBytes[3] == 1;
      const hasRowId = rawBytes[4] == 1;
      const rowIdIsUUID = rawBytes[5] == 1;
      let byteCursor = 6;
      let objectId = void 0;
      if (hasObjectId) {
        const nextByteCursor = byteCursor + 16;
        objectId = uuid2.stringify(
          rawBytes.subarray(byteCursor, nextByteCursor)
        );
        byteCursor = nextByteCursor;
      }
      let computeObjectMetadataArgs;
      if (hasComputeObjectMetadataArgs) {
        let nextByteCursor = byteCursor + INTEGER_ENCODING_NUM_BYTES;
        const serializedLenBytes = rawBytes.readInt32BE(byteCursor);
        byteCursor = nextByteCursor;
        nextByteCursor = byteCursor + serializedLenBytes;
        computeObjectMetadataArgs = JSON.parse(
          rawBytes.subarray(byteCursor, nextByteCursor).toString("utf-8")
        );
        byteCursor = nextByteCursor;
      }
      const rowIds = (() => {
        if (!hasRowId) {
          return void 0;
        }
        let nextByteCursor = byteCursor + 16;
        const spanId = uuid2.stringify(
          rawBytes.subarray(byteCursor, nextByteCursor)
        );
        byteCursor = nextByteCursor;
        nextByteCursor = byteCursor + 16;
        const rootSpanId = uuid2.stringify(
          rawBytes.subarray(byteCursor, nextByteCursor)
        );
        byteCursor = nextByteCursor;
        const rowId = rowIdIsUUID ? uuid2.stringify(rawBytes.subarray(byteCursor)) : rawBytes.subarray(byteCursor).toString("utf-8");
        return new SpanRowIdsV2({ rowId, spanId, rootSpanId });
      })();
      return new _SpanComponentsV2({
        objectType,
        objectId,
        computeObjectMetadataArgs,
        rowIds
      });
    } catch (e) {
      throw new Error(INVALID_ENCODING_ERRMSG2);
    }
  }
  objectIdFields() {
    if (!this.objectId) {
      throw new Error(
        "Impossible: cannot invoke `object_id_fields` unless SpanComponentsV2 is initialized with an `object_id`"
      );
    }
    switch (this.objectType) {
      case 1 /* EXPERIMENT */:
        return { experiment_id: this.objectId };
      case 2 /* PROJECT_LOGS */:
        return { project_id: this.objectId, log_id: "g" };
      default:
        throw new Error("Impossible");
    }
  }
  toObject() {
    return {
      objectType: this.objectType,
      objectId: this.objectId,
      computeObjectMetadataArgs: this.computeObjectMetadataArgs,
      rowIds: this.rowIds?.toObject()
    };
  }
};

// util/span_identifier_v3.ts
import { z as z3 } from "zod/v3";

// util/bytes.ts
function concatUint8Arrays(...arrays) {
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function uint8ArrayToBase64(uint8Array) {
  let binary = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}
function base64ToUint8Array(base64) {
  const binary = atob(base64);
  const uint8Array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    uint8Array[i] = binary.charCodeAt(i);
  }
  return uint8Array;
}
function uint8ArrayToString(uint8Array) {
  const decoder = new TextDecoder("utf-8");
  return decoder.decode(uint8Array);
}
function stringToUint8Array(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// util/span_identifier_v3.ts
function tryMakeUuid3(s) {
  try {
    const ret = uuid3.parse(s);
    if (ret.length !== 16) {
      throw new Error();
    }
    return { bytes: new Uint8Array(ret), isUUID: true };
  } catch {
    return { bytes: void 0, isUUID: false };
  }
}
var ENCODING_VERSION_NUMBER3 = 3;
var INVALID_ENCODING_ERRMSG3 = `SpanComponents string is not properly encoded. This library only supports encoding versions up to ${ENCODING_VERSION_NUMBER3}. Please make sure the SDK library used to decode the SpanComponents is at least as new as any library used to encode it.`;
var SpanObjectTypeV3 = /* @__PURE__ */ ((SpanObjectTypeV32) => {
  SpanObjectTypeV32[SpanObjectTypeV32["EXPERIMENT"] = 1] = "EXPERIMENT";
  SpanObjectTypeV32[SpanObjectTypeV32["PROJECT_LOGS"] = 2] = "PROJECT_LOGS";
  SpanObjectTypeV32[SpanObjectTypeV32["PLAYGROUND_LOGS"] = 3] = "PLAYGROUND_LOGS";
  return SpanObjectTypeV32;
})(SpanObjectTypeV3 || {});
var spanObjectTypeV3EnumSchema = z3.nativeEnum(SpanObjectTypeV3);
function spanObjectTypeV3ToTypedString(objectType) {
  switch (objectType) {
    case 1 /* EXPERIMENT */:
      return "experiment";
    case 2 /* PROJECT_LOGS */:
      return "project_logs";
    case 3 /* PLAYGROUND_LOGS */:
      return "playground_logs";
    default:
      const x = objectType;
      throw new Error(`Unknown SpanObjectTypeV3: ${x}`);
  }
}
function spanObjectTypeV3ToString(objectType) {
  return spanObjectTypeV3ToTypedString(objectType);
}
var InternalSpanComponentUUIDFields = /* @__PURE__ */ ((InternalSpanComponentUUIDFields2) => {
  InternalSpanComponentUUIDFields2[InternalSpanComponentUUIDFields2["OBJECT_ID"] = 1] = "OBJECT_ID";
  InternalSpanComponentUUIDFields2[InternalSpanComponentUUIDFields2["ROW_ID"] = 2] = "ROW_ID";
  InternalSpanComponentUUIDFields2[InternalSpanComponentUUIDFields2["SPAN_ID"] = 3] = "SPAN_ID";
  InternalSpanComponentUUIDFields2[InternalSpanComponentUUIDFields2["ROOT_SPAN_ID"] = 4] = "ROOT_SPAN_ID";
  return InternalSpanComponentUUIDFields2;
})(InternalSpanComponentUUIDFields || {});
var internalSpanComponentUUIDFieldsEnumSchema = z3.nativeEnum(
  InternalSpanComponentUUIDFields
);
var _INTERNAL_SPAN_COMPONENT_UUID_FIELDS_ID_TO_NAME = {
  [1 /* OBJECT_ID */]: "object_id",
  [2 /* ROW_ID */]: "row_id",
  [3 /* SPAN_ID */]: "span_id",
  [4 /* ROOT_SPAN_ID */]: "root_span_id"
};
var spanComponentsV3Schema = z3.object({
  object_type: spanObjectTypeV3EnumSchema,
  // TODO(manu): We should have a more elaborate zod schema for
  // `propagated_event`. This will required zod-ifying the contents of
  // sdk/js/util/object.ts.
  propagated_event: z3.record(z3.unknown()).nullish()
}).and(
  z3.union([
    // Must provide one or the other.
    z3.object({
      object_id: z3.string().nullish(),
      compute_object_metadata_args: z3.optional(z3.null())
    }),
    z3.object({
      object_id: z3.optional(z3.null()),
      compute_object_metadata_args: z3.record(z3.unknown())
    })
  ])
).and(
  z3.union([
    // Either all of these must be provided or none.
    z3.object({
      row_id: z3.string(),
      span_id: z3.string(),
      root_span_id: z3.string()
    }),
    z3.object({
      row_id: z3.optional(z3.null()),
      span_id: z3.optional(z3.null()),
      root_span_id: z3.optional(z3.null())
    })
  ])
);
var SpanComponentsV3 = class _SpanComponentsV3 {
  constructor(data) {
    this.data = data;
  }
  data;
  toStr() {
    const jsonObj = {
      compute_object_metadata_args: this.data.compute_object_metadata_args || void 0,
      propagated_event: this.data.propagated_event || void 0
    };
    const allBuffers = [];
    allBuffers.push(
      new Uint8Array([ENCODING_VERSION_NUMBER3, this.data.object_type])
    );
    const uuidEntries = [];
    function addUuidField(origVal, fieldId) {
      const ret = tryMakeUuid3(origVal);
      if (ret.isUUID) {
        uuidEntries.push(
          concatUint8Arrays(new Uint8Array([fieldId]), ret.bytes)
        );
      } else {
        jsonObj[_INTERNAL_SPAN_COMPONENT_UUID_FIELDS_ID_TO_NAME[fieldId]] = origVal;
      }
    }
    if (this.data.object_id) {
      addUuidField(
        this.data.object_id,
        1 /* OBJECT_ID */
      );
    }
    if (this.data.row_id) {
      addUuidField(this.data.row_id, 2 /* ROW_ID */);
    }
    if (this.data.span_id) {
      addUuidField(this.data.span_id, 3 /* SPAN_ID */);
    }
    if (this.data.root_span_id) {
      addUuidField(
        this.data.root_span_id,
        4 /* ROOT_SPAN_ID */
      );
    }
    if (uuidEntries.length > 255) {
      throw new Error("Impossible: too many UUID entries to encode");
    }
    allBuffers.push(new Uint8Array([uuidEntries.length]));
    allBuffers.push(...uuidEntries);
    if (Object.keys(jsonObj).length > 0) {
      allBuffers.push(stringToUint8Array(JSON.stringify(jsonObj)));
    }
    return uint8ArrayToBase64(concatUint8Arrays(...allBuffers));
  }
  static fromStr(s) {
    try {
      const rawBytes = base64ToUint8Array(s);
      const jsonObj = {};
      if (rawBytes[0] < ENCODING_VERSION_NUMBER3) {
        const spanComponentsOld = SpanComponentsV2.fromStr(s);
        jsonObj["object_type"] = spanComponentsOld.objectType;
        jsonObj["object_id"] = spanComponentsOld.objectId;
        jsonObj["compute_object_metadata_args"] = spanComponentsOld.computeObjectMetadataArgs;
        if (spanComponentsOld.rowIds) {
          jsonObj["row_id"] = spanComponentsOld.rowIds.rowId;
          jsonObj["span_id"] = spanComponentsOld.rowIds.spanId;
          jsonObj["root_span_id"] = spanComponentsOld.rowIds.rootSpanId;
        }
      } else {
        jsonObj["object_type"] = rawBytes[1];
        const numUuidEntries = rawBytes[2];
        let byteOffset = 3;
        for (let i = 0; i < numUuidEntries; ++i) {
          const fieldId = internalSpanComponentUUIDFieldsEnumSchema.parse(
            rawBytes[byteOffset]
          );
          const fieldBytes = rawBytes.subarray(byteOffset + 1, byteOffset + 17);
          byteOffset += 17;
          jsonObj[_INTERNAL_SPAN_COMPONENT_UUID_FIELDS_ID_TO_NAME[fieldId]] = uuid3.stringify(fieldBytes);
        }
        if (byteOffset < rawBytes.length) {
          const remainingJsonObj = JSON.parse(
            uint8ArrayToString(rawBytes.subarray(byteOffset))
          );
          Object.assign(jsonObj, remainingJsonObj);
        }
      }
      return _SpanComponentsV3.fromJsonObj(jsonObj);
    } catch {
      throw new Error(INVALID_ENCODING_ERRMSG3);
    }
  }
  objectIdFields() {
    if (!this.data.object_id) {
      throw new Error(
        "Impossible: cannot invoke `objectIdFields` unless SpanComponentsV3 is initialized with an `object_id`"
      );
    }
    switch (this.data.object_type) {
      case 1 /* EXPERIMENT */:
        return { experiment_id: this.data.object_id };
      case 2 /* PROJECT_LOGS */:
        return { project_id: this.data.object_id, log_id: "g" };
      case 3 /* PLAYGROUND_LOGS */:
        return { prompt_session_id: this.data.object_id, log_id: "x" };
      default:
        this.data.object_type;
        throw new Error("Impossible");
    }
  }
  async export() {
    return this.toStr();
  }
  static fromJsonObj(jsonObj) {
    return new _SpanComponentsV3(spanComponentsV3Schema.parse(jsonObj));
  }
};

// util/type_util.ts
function isObject(value) {
  return value instanceof Object && !(value instanceof Array);
}
function isArray(value) {
  return value instanceof Array;
}
function isObjectOrArray(value) {
  return value instanceof Object;
}

// util/object_util.ts
var SET_UNION_FIELDS = /* @__PURE__ */ new Set(["tags"]);
var FORBIDDEN_MERGE_KEYS = /* @__PURE__ */ new Set([
  "__proto__",
  "constructor",
  "prototype"
]);
function mergeDictsWithPaths({
  mergeInto,
  mergeFrom,
  mergePaths
}) {
  const mergePathsSerialized = new Set(
    mergePaths.map((p) => JSON.stringify(p))
  );
  return mergeDictsWithPathsHelper({
    mergeInto,
    mergeFrom,
    path: [],
    mergePaths: mergePathsSerialized
  });
}
function mergeDictsWithPathsHelper({
  mergeInto,
  mergeFrom,
  path,
  mergePaths
}) {
  Object.entries(mergeFrom).forEach(([k, mergeFromV]) => {
    if (FORBIDDEN_MERGE_KEYS.has(k)) return;
    const fullPath = path.concat([k]);
    const fullPathSerialized = JSON.stringify(fullPath);
    const mergeIntoV = recordFind(mergeInto, k);
    const isSetUnionField = path.length === 0 && SET_UNION_FIELDS.has(k) && !mergePaths.has(fullPathSerialized);
    if (isSetUnionField && isArray(mergeIntoV) && isArray(mergeFromV)) {
      const seen = /* @__PURE__ */ new Set();
      const combined = [];
      for (const item of [...mergeIntoV, ...mergeFromV]) {
        const key = typeof item === "object" ? JSON.stringify(item) : String(item);
        if (!seen.has(key)) {
          seen.add(key);
          combined.push(item);
        }
      }
      mergeInto[k] = combined;
    } else if (isObject(mergeIntoV) && isObject(mergeFromV) && !mergePaths.has(fullPathSerialized)) {
      mergeDictsWithPathsHelper({
        mergeInto: mergeIntoV,
        mergeFrom: mergeFromV,
        path: fullPath,
        mergePaths
      });
    } else {
      if (mergeFromV !== void 0) {
        mergeInto[k] = mergeFromV;
      }
    }
  });
  return mergeInto;
}
function mergeDicts(mergeInto, mergeFrom) {
  return mergeDictsWithPaths({ mergeInto, mergeFrom, mergePaths: [] });
}
function recordFind(m, k) {
  return m[k];
}
function getObjValueByPath(row, path) {
  let curr = row;
  for (const p of path) {
    if (!isObjectOrArray(curr)) {
      return null;
    }
    curr = curr[p];
  }
  return curr;
}

// util/merge_row_batch.ts
function generateMergedRowKey(row) {
  return JSON.stringify(
    [
      "org_id",
      "project_id",
      "experiment_id",
      "dataset_id",
      "prompt_session_id",
      "log_id",
      "id"
    ].map((k) => row[k])
  );
}
var MERGE_ROW_SKIP_FIELDS = [
  "created",
  "span_id",
  "root_span_id",
  "span_parents",
  "_parent_id"
  // TODO: handle merge paths.
];
function popMergeRowSkipFields(row) {
  const popped = {};
  for (const field of MERGE_ROW_SKIP_FIELDS) {
    if (field in row) {
      popped[field] = row[field];
      delete row[field];
    }
  }
  return popped;
}
function restoreMergeRowSkipFields(row, skipFields) {
  for (const field of MERGE_ROW_SKIP_FIELDS) {
    delete row[field];
    if (field in skipFields) {
      row[field] = skipFields[field];
    }
  }
}
function mergeRowBatch(rows) {
  for (const row of rows) {
    if (row.id === void 0) {
      throw new Error(
        "Logged row is missing an id. This is an internal braintrust error. Please contact us at info@braintrust.dev for help"
      );
    }
  }
  const rowGroups = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const key = generateMergedRowKey(row);
    const existingRow = rowGroups.get(key);
    if (existingRow !== void 0 && row[IS_MERGE_FIELD]) {
      const skipFields = popMergeRowSkipFields(existingRow);
      const preserveNoMerge = !existingRow[IS_MERGE_FIELD];
      mergeDicts(existingRow, row);
      restoreMergeRowSkipFields(existingRow, skipFields);
      if (preserveNoMerge) {
        delete existingRow[IS_MERGE_FIELD];
      }
    } else {
      rowGroups.set(key, row);
    }
  }
  return [...rowGroups.values()];
}
function batchItems(args) {
  const { items } = args;
  const batchMaxNumItems = args.batchMaxNumItems ?? Number.POSITIVE_INFINITY;
  const batchMaxNumBytes = args.batchMaxNumBytes ?? Number.POSITIVE_INFINITY;
  const getByteSize = args.getByteSize;
  const output = [];
  let batch = [];
  let batchLen = 0;
  function addToBatch(item) {
    batch.push(item);
    batchLen += getByteSize(item);
  }
  function flushBatch() {
    output.push(batch);
    batch = [];
    batchLen = 0;
  }
  for (const item of items) {
    const itemSize = getByteSize(item);
    if (batch.length > 0 && !(itemSize + batchLen < batchMaxNumBytes && batch.length < batchMaxNumItems)) {
      flushBatch();
    }
    addToBatch(item);
  }
  if (batch.length > 0) {
    flushBatch();
  }
  return output;
}

// util/object.ts
var DEFAULT_IS_LEGACY_DATASET = false;
function ensureDatasetRecord(r, legacy) {
  if (legacy) {
    return ensureLegacyDatasetRecord(r);
  } else {
    return ensureNewDatasetRecord(r);
  }
}
function ensureLegacyDatasetRecord(r) {
  if ("output" in r) {
    return r;
  }
  const row = {
    ...r,
    output: r.expected
  };
  delete row.expected;
  return row;
}
function ensureNewDatasetRecord(r) {
  if ("expected" in r) {
    return r;
  }
  const row = {
    ...r,
    tags: null,
    expected: r.output
  };
  delete row.output;
  return row;
}

// util/json_util.ts
function constructJsonArray(items) {
  return `[${items.join(",")}]`;
}

// util/string_util.ts
function _urljoin(...parts) {
  return parts.map(
    (x, i) => x.replace(/^\//, "").replace(i < parts.length - 1 ? /\/$/ : "", "")
  ).filter((x) => x.trim() !== "").join("/");
}

// util/span_identifier_v4.ts
import { z as z4 } from "zod/v3";
var ENCODING_VERSION_NUMBER_V4 = 4;
function tryMakeHexTraceId(s) {
  try {
    if (typeof s === "string" && s.length === 32) {
      const bytes = new Uint8Array(16);
      for (let i = 0; i < 16; i++) {
        const hex = s.substr(i * 2, 2);
        const byte = parseInt(hex, 16);
        if (isNaN(byte)) throw new Error();
        bytes[i] = byte;
      }
      return { bytes, isHex: true };
    }
  } catch {
  }
  return { bytes: void 0, isHex: false };
}
function tryMakeHexSpanId(s) {
  try {
    if (typeof s === "string" && s.length === 16) {
      const bytes = new Uint8Array(8);
      for (let i = 0; i < 8; i++) {
        const hex = s.substr(i * 2, 2);
        const byte = parseInt(hex, 16);
        if (isNaN(byte)) throw new Error();
        bytes[i] = byte;
      }
      return { bytes, isHex: true };
    }
  } catch {
  }
  return { bytes: void 0, isHex: false };
}
var INVALID_ENCODING_ERRMSG_V4 = `SpanComponents string is not properly encoded. This library only supports encoding versions up to ${ENCODING_VERSION_NUMBER_V4}. Please make sure the SDK library used to decode the SpanComponents is at least as new as any library used to encode it.`;
var FIELDS_ID_TO_NAME = {
  [1 /* OBJECT_ID */]: "object_id",
  [2 /* ROW_ID */]: "row_id",
  [3 /* SPAN_ID */]: "span_id",
  [4 /* ROOT_SPAN_ID */]: "root_span_id"
};
var spanComponentsV4Schema = z4.object({
  object_type: spanObjectTypeV3EnumSchema,
  propagated_event: z4.record(z4.unknown()).nullish()
}).and(
  z4.union([
    // Must provide one or the other.
    z4.object({
      object_id: z4.string().nullish(),
      compute_object_metadata_args: z4.optional(z4.null())
    }),
    z4.object({
      object_id: z4.optional(z4.null()),
      compute_object_metadata_args: z4.record(z4.unknown())
    })
  ])
).and(
  z4.union([
    // Either all of these must be provided or none.
    z4.object({
      row_id: z4.string(),
      span_id: z4.string(),
      root_span_id: z4.string()
    }),
    z4.object({
      row_id: z4.optional(z4.null()),
      span_id: z4.optional(z4.null()),
      root_span_id: z4.optional(z4.null())
    })
  ])
);
var SpanComponentsV4 = class _SpanComponentsV4 {
  constructor(data) {
    this.data = data;
  }
  data;
  toStr() {
    const jsonObj = {
      compute_object_metadata_args: this.data.compute_object_metadata_args || void 0,
      propagated_event: this.data.propagated_event || void 0
    };
    Object.keys(jsonObj).forEach((key) => {
      if (jsonObj[key] === void 0) {
        delete jsonObj[key];
      }
    });
    const allBuffers = [];
    allBuffers.push(
      new Uint8Array([ENCODING_VERSION_NUMBER_V4, this.data.object_type])
    );
    const hexEntries = [];
    function addHexField(origVal, fieldId) {
      let hexResult;
      if (fieldId === 3 /* SPAN_ID */) {
        hexResult = tryMakeHexSpanId(origVal);
      } else if (fieldId === 4 /* ROOT_SPAN_ID */) {
        hexResult = tryMakeHexTraceId(origVal);
      } else {
        hexResult = { bytes: void 0, isHex: false };
      }
      if (hexResult.isHex) {
        hexEntries.push(
          concatUint8Arrays(new Uint8Array([fieldId]), hexResult.bytes)
        );
      } else {
        jsonObj[FIELDS_ID_TO_NAME[fieldId]] = origVal;
      }
    }
    if (this.data.object_id) {
      addHexField(this.data.object_id, 1 /* OBJECT_ID */);
    }
    if (this.data.row_id) {
      addHexField(this.data.row_id, 2 /* ROW_ID */);
    }
    if (this.data.span_id) {
      addHexField(this.data.span_id, 3 /* SPAN_ID */);
    }
    if (this.data.root_span_id) {
      addHexField(this.data.root_span_id, 4 /* ROOT_SPAN_ID */);
    }
    if (hexEntries.length > 255) {
      throw new Error("Impossible: too many hex entries to encode");
    }
    allBuffers.push(new Uint8Array([hexEntries.length]));
    allBuffers.push(...hexEntries);
    if (Object.keys(jsonObj).length > 0) {
      allBuffers.push(stringToUint8Array(JSON.stringify(jsonObj)));
    }
    return uint8ArrayToBase64(concatUint8Arrays(...allBuffers));
  }
  static fromStr(s) {
    try {
      const rawBytes = base64ToUint8Array(s);
      const jsonObj = {};
      if (rawBytes[0] < ENCODING_VERSION_NUMBER_V4) {
        const v3Components = SpanComponentsV3.fromStr(s);
        jsonObj["object_type"] = v3Components.data.object_type;
        jsonObj["object_id"] = v3Components.data.object_id;
        jsonObj["compute_object_metadata_args"] = v3Components.data.compute_object_metadata_args;
        jsonObj["row_id"] = v3Components.data.row_id;
        jsonObj["span_id"] = v3Components.data.span_id;
        jsonObj["root_span_id"] = v3Components.data.root_span_id;
        jsonObj["propagated_event"] = v3Components.data.propagated_event;
      } else {
        jsonObj["object_type"] = rawBytes[1];
        const numHexEntries = rawBytes[2];
        let byteOffset = 3;
        for (let i = 0; i < numHexEntries; i++) {
          const fieldId = rawBytes[byteOffset];
          if (fieldId === 3 /* SPAN_ID */) {
            const hexBytes = rawBytes.subarray(byteOffset + 1, byteOffset + 9);
            byteOffset += 9;
            jsonObj[FIELDS_ID_TO_NAME[fieldId]] = Array.from(
              hexBytes,
              (b) => b.toString(16).padStart(2, "0")
            ).join("");
          } else if (fieldId === 4 /* ROOT_SPAN_ID */) {
            const hexBytes = rawBytes.subarray(byteOffset + 1, byteOffset + 17);
            byteOffset += 17;
            jsonObj[FIELDS_ID_TO_NAME[fieldId]] = Array.from(
              hexBytes,
              (b) => b.toString(16).padStart(2, "0")
            ).join("");
          } else {
            const hexBytes = rawBytes.subarray(byteOffset + 1, byteOffset + 17);
            byteOffset += 17;
            jsonObj[FIELDS_ID_TO_NAME[fieldId]] = Array.from(
              hexBytes,
              (b) => b.toString(16).padStart(2, "0")
            ).join("");
          }
        }
        if (byteOffset < rawBytes.length) {
          const remainingJsonObj = JSON.parse(
            uint8ArrayToString(rawBytes.subarray(byteOffset))
          );
          Object.assign(jsonObj, remainingJsonObj);
        }
      }
      return _SpanComponentsV4.fromJsonObj(jsonObj);
    } catch {
      throw new Error(INVALID_ENCODING_ERRMSG_V4);
    }
  }
  objectIdFields() {
    if (!this.data.object_id) {
      throw new Error(
        "Impossible: cannot invoke `objectIdFields` unless SpanComponentsV4 is initialized with an `object_id`"
      );
    }
    switch (this.data.object_type) {
      case 1 /* EXPERIMENT */:
        return { experiment_id: this.data.object_id };
      case 2 /* PROJECT_LOGS */:
        return { project_id: this.data.object_id, log_id: "g" };
      case 3 /* PLAYGROUND_LOGS */:
        return { prompt_session_id: this.data.object_id, log_id: "x" };
      default:
        this.data.object_type;
        throw new Error(`Invalid object_type ${this.data.object_type}`);
    }
  }
  async export() {
    return this.toStr();
  }
  static fromJsonObj(jsonObj) {
    return new _SpanComponentsV4(spanComponentsV4Schema.parse(jsonObj));
  }
};

// util/xact-ids.ts
var TOP_BITS = BigInt("0x0DE1") << BigInt(48);
var MOD = BigInt(1) << BigInt(64);
var COPRIME = BigInt("205891132094649");
var COPRIME_INVERSE = BigInt("1522336535492693385");

// util/zod_util.ts
import { z as z5 } from "zod/v3";

// src/util.ts
var GLOBAL_PROJECT = "Global";
function runCatchFinally(f, catchF, finallyF) {
  let runSyncCleanup = true;
  try {
    const ret = f();
    if (ret instanceof Promise) {
      runSyncCleanup = false;
      return ret.catch(catchF).finally(finallyF);
    } else {
      return ret;
    }
  } catch (e) {
    return catchF(e);
  } finally {
    if (runSyncCleanup) {
      finallyF();
    }
  }
}
function getCurrentUnixTimestamp() {
  return (/* @__PURE__ */ new Date()).getTime() / 1e3;
}
function isEmpty2(a) {
  return a === void 0 || a === null;
}
var LazyValue = class {
  callable;
  resolvedValue = void 0;
  value = {
    computedState: "uninitialized"
  };
  constructor(callable) {
    this.callable = callable;
  }
  get() {
    if (this.value.computedState !== "uninitialized") {
      return this.value.val;
    }
    this.value = {
      computedState: "in_progress",
      val: this.callable().then((x) => {
        this.value.computedState = "succeeded";
        this.resolvedValue = x;
        return x;
      })
    };
    return this.value.val;
  }
  getSync() {
    return {
      resolved: this.value.computedState === "succeeded",
      value: this.resolvedValue
    };
  }
  // If this is true, the caller should be able to obtain the LazyValue without
  // it throwing.
  get hasSucceeded() {
    return this.value.computedState === "succeeded";
  }
};
var SyncLazyValue = class {
  callable;
  value = {
    computedState: "uninitialized"
  };
  constructor(callable) {
    this.callable = callable;
  }
  get() {
    if (this.value.computedState !== "uninitialized") {
      return this.value.val;
    }
    const result = this.callable();
    this.value = { computedState: "succeeded", val: result };
    return result;
  }
  // If this is true, the caller should be able to obtain the SyncLazyValue without
  // it throwing.
  get hasSucceeded() {
    return this.value.computedState === "succeeded";
  }
};
function addAzureBlobHeaders(headers, url) {
  if (url.includes("blob.core.windows.net")) {
    headers["x-ms-blob-type"] = "BlockBlob";
  }
}

// src/generated_types.ts
import { z as z6 } from "zod/v3";
var AclObjectType = z6.union([
  z6.enum([
    "organization",
    "project",
    "experiment",
    "dataset",
    "prompt",
    "prompt_session",
    "group",
    "role",
    "org_member",
    "project_log",
    "org_project",
    "org_audit_logs"
  ]),
  z6.null()
]);
var Permission = z6.enum([
  "create",
  "read",
  "update",
  "delete",
  "create_acls",
  "read_acls",
  "update_acls",
  "delete_acls"
]);
var Acl = z6.object({
  id: z6.string().uuid(),
  object_type: AclObjectType.and(z6.string()),
  object_id: z6.string().uuid(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  group_id: z6.union([z6.string(), z6.null()]).optional(),
  permission: Permission.and(z6.union([z6.string(), z6.null()])).optional(),
  restrict_object_type: AclObjectType.and(z6.unknown()).optional(),
  role_id: z6.union([z6.string(), z6.null()]).optional(),
  _object_org_id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional()
});
var Agent = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  user_id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  slug: z6.string(),
  kind: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional()
});
var AISecret = z6.object({
  id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  updated_at: z6.union([z6.string(), z6.null()]).optional(),
  secret_updated_at: z6.union([z6.string(), z6.null()]).optional(),
  org_id: z6.string().uuid(),
  name: z6.string(),
  type: z6.union([z6.string(), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
  secret_updated_by_user_id: z6.union([z6.string(), z6.null()]).optional(),
  preview_secret: z6.union([z6.string(), z6.null()]).optional()
});
var ResponseFormatJsonSchema = z6.object({
  name: z6.string(),
  description: z6.string().optional(),
  schema: z6.union([z6.object({}).partial().passthrough(), z6.string()]).optional(),
  strict: z6.union([z6.boolean(), z6.null()]).optional()
});
var ResponseFormatNullish = z6.union([
  z6.object({ type: z6.literal("json_object") }),
  z6.object({
    type: z6.literal("json_schema"),
    json_schema: ResponseFormatJsonSchema
  }),
  z6.object({ type: z6.literal("text") }),
  z6.null()
]);
var AnyModelParams = z6.object({
  temperature: z6.number().optional(),
  top_p: z6.number().optional(),
  max_tokens: z6.number(),
  max_completion_tokens: z6.number().optional(),
  frequency_penalty: z6.number().optional(),
  presence_penalty: z6.number().optional(),
  response_format: ResponseFormatNullish.optional(),
  tool_choice: z6.union([
    z6.literal("auto"),
    z6.literal("none"),
    z6.literal("required"),
    z6.object({
      type: z6.literal("function"),
      function: z6.object({ name: z6.string() })
    })
  ]).optional(),
  function_call: z6.union([
    z6.literal("auto"),
    z6.literal("none"),
    z6.object({ name: z6.string() })
  ]).optional(),
  n: z6.number().optional(),
  stop: z6.array(z6.string()).optional(),
  reasoning_effort: z6.enum(["none", "minimal", "low", "medium", "high"]).optional(),
  verbosity: z6.enum(["low", "medium", "high"]).optional(),
  top_k: z6.number().optional(),
  stop_sequences: z6.array(z6.string()).optional(),
  reasoning_enabled: z6.boolean().optional(),
  reasoning_budget: z6.number().optional(),
  max_tokens_to_sample: z6.number().optional(),
  maxOutputTokens: z6.number().optional(),
  topP: z6.number().optional(),
  topK: z6.number().optional(),
  use_cache: z6.boolean().optional()
});
var ApiKey = z6.object({
  id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  preview_name: z6.string(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  user_email: z6.union([z6.string(), z6.null()]).optional(),
  user_given_name: z6.union([z6.string(), z6.null()]).optional(),
  user_family_name: z6.union([z6.string(), z6.null()]).optional(),
  org_id: z6.union([z6.string(), z6.null()]).optional(),
  expires_at: z6.union([z6.string(), z6.null()]).optional()
});
var TriggeredFunctionState = z6.object({
  triggered_xact_id: z6.string(),
  completed_xact_id: z6.union([z6.string(), z6.null()]).optional(),
  idempotency_key: z6.union([z6.string(), z6.null()]).optional(),
  attempts: z6.number().int().gte(0).optional().default(0),
  scope: z6.union([
    z6.object({ type: z6.literal("span") }),
    z6.object({ type: z6.literal("trace") }),
    z6.object({ type: z6.literal("group"), key: z6.string(), value: z6.string() })
  ])
});
var AsyncScoringState = z6.union([
  z6.object({
    status: z6.literal("enabled"),
    token: z6.string(),
    function_ids: z6.array(z6.unknown()),
    skip_logging: z6.union([z6.boolean(), z6.null()]).optional(),
    triggered_functions: z6.union([z6.record(TriggeredFunctionState), z6.null()]).optional()
  }),
  z6.object({ status: z6.literal("disabled") }),
  z6.null(),
  z6.null()
]);
var AsyncScoringControl = z6.union([
  z6.object({ kind: z6.literal("score_update"), token: z6.string().optional() }),
  z6.object({ kind: z6.literal("state_override"), state: AsyncScoringState }),
  z6.object({ kind: z6.literal("state_force_reselect") }),
  z6.object({ kind: z6.literal("state_enabled_force_rescore") }),
  z6.object({
    kind: z6.literal("trigger_functions"),
    triggered_functions: z6.array(
      z6.object({
        function_id: z6.unknown().optional(),
        scope: z6.union([
          z6.object({ type: z6.literal("span") }),
          z6.object({ type: z6.literal("trace") })
        ]),
        idempotency_key: z6.string().optional()
      })
    ).min(1)
  }),
  z6.object({
    kind: z6.literal("complete_triggered_functions"),
    function_ids: z6.array(z6.unknown()).min(1),
    triggered_xact_id: z6.string()
  }),
  z6.object({
    kind: z6.literal("mark_attempt_failed"),
    function_ids: z6.array(z6.unknown()).min(1)
  })
]);
var BraintrustAttachmentReference = z6.object({
  type: z6.literal("braintrust_attachment"),
  filename: z6.string().min(1),
  content_type: z6.string().min(1),
  key: z6.string().min(1)
});
var ExternalAttachmentReference = z6.object({
  type: z6.literal("external_attachment"),
  filename: z6.string().min(1),
  content_type: z6.string().min(1),
  url: z6.string().min(1)
});
var AttachmentReference = z6.discriminatedUnion("type", [
  BraintrustAttachmentReference,
  ExternalAttachmentReference
]);
var UploadStatus = z6.enum(["uploading", "done", "error"]);
var AttachmentStatus = z6.object({
  upload_status: UploadStatus,
  error_message: z6.string().optional()
});
var AutomationStatus = z6.enum(["active", "paused"]);
var FunctionTypeEnum = z6.enum([
  "llm",
  "scorer",
  "task",
  "tool",
  "custom_view",
  "preprocessor",
  "facet",
  "classifier",
  "tag",
  "parameters",
  "sandbox"
]);
var NullableSavedFunctionId = z6.union([
  z6.object({
    type: z6.literal("function"),
    id: z6.string(),
    version: z6.string().optional()
  }),
  z6.object({
    type: z6.literal("global"),
    name: z6.string(),
    function_type: FunctionTypeEnum.optional().default("scorer")
  }),
  z6.null()
]);
var TopicMapGenerationSettings = z6.object({
  algorithm: z6.enum(["hdbscan", "kmeans"]),
  dimension_reduction: z6.enum(["umap", "pca", "none"]),
  sample_size: z6.number().int().gt(0).optional(),
  n_clusters: z6.number().int().gt(0).optional(),
  min_cluster_size: z6.number().int().gt(0).optional(),
  min_samples: z6.number().int().gt(0).optional(),
  hierarchy_threshold: z6.number().int().gt(0).optional(),
  naming_model: z6.string().optional()
});
var TopicMapData = z6.object({
  type: z6.literal("topic_map"),
  source_facet: z6.string(),
  embedding_model: z6.string(),
  bundle_key: z6.string().optional(),
  report_key: z6.string().optional(),
  topic_names: z6.record(z6.string()).optional(),
  generation_settings: TopicMapGenerationSettings.optional(),
  disable_reconciliation: z6.boolean().optional(),
  reconcile_mode: z6.enum(["evolve", "names_only"]).optional(),
  distance_threshold: z6.number().optional(),
  btql_filter: z6.string().optional(),
  automation_btql_filter: z6.string().optional()
});
var BatchedFacetData = z6.object({
  type: z6.literal("batched_facet"),
  preprocessor: NullableSavedFunctionId.and(z6.unknown()).optional(),
  facets: z6.array(
    z6.object({
      name: z6.string(),
      prompt: z6.string(),
      model: z6.string().optional(),
      embedding_model: z6.string().optional(),
      no_match_pattern: z6.string().optional()
    })
  ),
  topic_maps: z6.record(
    z6.array(
      z6.object({
        function_name: z6.string(),
        topic_map_id: z6.string().optional(),
        topic_map_data: TopicMapData
      })
    )
  ).optional()
});
var BraintrustModelParams = z6.object({
  use_cache: z6.boolean(),
  reasoning_enabled: z6.boolean(),
  reasoning_budget: z6.number()
}).partial();
var CallEvent = z6.union([
  z6.object({
    id: z6.string().optional(),
    data: z6.string(),
    event: z6.literal("text_delta")
  }),
  z6.object({
    id: z6.string().optional(),
    data: z6.string(),
    event: z6.literal("reasoning_delta")
  }),
  z6.object({
    id: z6.string().optional(),
    data: z6.string(),
    event: z6.literal("json_delta")
  }),
  z6.object({
    id: z6.string().optional(),
    data: z6.string(),
    event: z6.literal("progress")
  }),
  z6.object({
    id: z6.string().optional(),
    data: z6.string(),
    event: z6.literal("error")
  }),
  z6.object({
    id: z6.string().optional(),
    data: z6.string(),
    event: z6.literal("console")
  }),
  z6.object({
    id: z6.string().optional(),
    event: z6.literal("start"),
    data: z6.literal("")
  }),
  z6.object({
    id: z6.string().optional(),
    event: z6.literal("done"),
    data: z6.literal("")
  })
]);
var ChatCompletionContentPartTextWithTitle = z6.object({
  text: z6.string().default(""),
  type: z6.literal("text"),
  cache_control: z6.object({
    type: z6.literal("ephemeral"),
    ttl: z6.enum(["5m", "1h"]).optional()
  }).optional()
});
var ChatCompletionContentPartImageWithTitle = z6.object({
  image_url: z6.object({
    url: z6.string(),
    detail: z6.union([z6.literal("auto"), z6.literal("low"), z6.literal("high")]).optional()
  }),
  type: z6.literal("image_url"),
  cache_control: z6.object({
    type: z6.literal("ephemeral"),
    ttl: z6.enum(["5m", "1h"]).optional()
  }).optional()
});
var ChatCompletionContentPartFileFile = z6.object({ file_data: z6.string(), filename: z6.string(), file_id: z6.string() }).partial();
var ChatCompletionContentPartFileWithTitle = z6.object({
  file: ChatCompletionContentPartFileFile,
  type: z6.literal("file"),
  cache_control: z6.object({
    type: z6.literal("ephemeral"),
    ttl: z6.enum(["5m", "1h"]).optional()
  }).optional()
});
var ChatCompletionContentPart = z6.union([
  ChatCompletionContentPartTextWithTitle,
  ChatCompletionContentPartImageWithTitle,
  ChatCompletionContentPartFileWithTitle
]);
var ChatCompletionContentPartText = z6.object({
  text: z6.string().default(""),
  type: z6.literal("text"),
  cache_control: z6.object({
    type: z6.literal("ephemeral"),
    ttl: z6.enum(["5m", "1h"]).optional()
  }).optional()
});
var ChatCompletionMessageToolCall = z6.object({
  id: z6.string(),
  function: z6.object({ arguments: z6.string(), name: z6.string() }),
  type: z6.literal("function")
});
var ChatCompletionMessageReasoning = z6.object({ id: z6.string(), content: z6.string() }).partial();
var ChatCompletionMessageParam = z6.union([
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText)]),
    role: z6.literal("system"),
    name: z6.string().optional()
  }),
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPart)]),
    role: z6.literal("user"),
    name: z6.string().optional()
  }),
  z6.object({
    role: z6.literal("assistant"),
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText), z6.null()]).optional(),
    function_call: z6.object({ arguments: z6.string(), name: z6.string() }).optional(),
    name: z6.string().optional(),
    tool_calls: z6.array(ChatCompletionMessageToolCall).optional(),
    reasoning: z6.array(ChatCompletionMessageReasoning).optional(),
    reasoning_signature: z6.string().optional()
  }),
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText)]),
    role: z6.literal("tool"),
    tool_call_id: z6.string().default("")
  }),
  z6.object({
    content: z6.union([z6.string(), z6.null()]),
    name: z6.string(),
    role: z6.literal("function")
  }),
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText)]),
    role: z6.literal("developer"),
    name: z6.string().optional()
  }),
  z6.object({
    role: z6.literal("model"),
    content: z6.union([z6.string(), z6.null()]).optional()
  })
]);
var ChatCompletionOpenAIMessageParam = z6.union([
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText)]),
    role: z6.literal("system"),
    name: z6.string().optional()
  }),
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPart)]),
    role: z6.literal("user"),
    name: z6.string().optional()
  }),
  z6.object({
    role: z6.literal("assistant"),
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText), z6.null()]).optional(),
    function_call: z6.object({ arguments: z6.string(), name: z6.string() }).optional(),
    name: z6.string().optional(),
    tool_calls: z6.array(ChatCompletionMessageToolCall).optional(),
    reasoning: z6.array(ChatCompletionMessageReasoning).optional(),
    reasoning_signature: z6.string().optional()
  }),
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText)]),
    role: z6.literal("tool"),
    tool_call_id: z6.string().default("")
  }),
  z6.object({
    content: z6.union([z6.string(), z6.null()]),
    name: z6.string(),
    role: z6.literal("function")
  }),
  z6.object({
    content: z6.union([z6.string(), z6.array(ChatCompletionContentPartText)]),
    role: z6.literal("developer"),
    name: z6.string().optional()
  })
]);
var ChatCompletionTool = z6.object({
  function: z6.object({
    name: z6.string(),
    description: z6.string().optional(),
    parameters: z6.object({}).partial().passthrough().optional()
  }),
  type: z6.literal("function")
});
var CodeBundle = z6.object({
  runtime_context: z6.object({
    runtime: z6.enum(["node", "python", "browser", "quickjs"]),
    version: z6.string()
  }),
  location: z6.union([
    z6.object({
      type: z6.literal("experiment"),
      eval_name: z6.string(),
      position: z6.union([
        z6.object({ type: z6.literal("task") }),
        z6.object({ type: z6.literal("scorer"), index: z6.number().int().gte(0) }),
        z6.object({
          type: z6.literal("classifier"),
          index: z6.number().int().gte(0)
        })
      ])
    }),
    z6.object({ type: z6.literal("function"), index: z6.number().int().gte(0) }),
    z6.object({
      type: z6.literal("sandbox"),
      sandbox_spec: z6.union([
        z6.object({ provider: z6.literal("modal"), snapshot_ref: z6.string() }),
        z6.object({ provider: z6.literal("lambda") })
      ]),
      entrypoints: z6.array(z6.string()).optional(),
      eval_name: z6.string(),
      parameters: z6.object({}).partial().passthrough().optional(),
      evaluator_definition: z6.unknown().optional()
    })
  ]),
  bundle_id: z6.union([z6.string(), z6.null()]).optional(),
  preview: z6.union([z6.string(), z6.null()]).optional()
});
var Dataset = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
  url_slug: z6.string()
});
var ObjectReferenceNullish = z6.union([
  z6.object({
    object_type: z6.enum([
      "project_logs",
      "experiment",
      "dataset",
      "prompt",
      "function",
      "prompt_session"
    ]),
    object_id: z6.string().uuid(),
    id: z6.string(),
    _xact_id: z6.union([z6.string(), z6.null()]).optional(),
    created: z6.union([z6.string(), z6.null()]).optional()
  }),
  z6.null()
]);
var SavedFunctionId = z6.union([
  z6.object({
    type: z6.literal("function"),
    id: z6.string(),
    version: z6.string().optional()
  }),
  z6.object({
    type: z6.literal("global"),
    name: z6.string(),
    function_type: FunctionTypeEnum.optional().default("scorer")
  })
]);
var DatasetEvent = z6.object({
  id: z6.string(),
  _xact_id: z6.string(),
  created: z6.string().datetime({ offset: true }),
  _pagination_key: z6.union([z6.string(), z6.null()]).optional(),
  project_id: z6.string().uuid(),
  dataset_id: z6.string().uuid(),
  input: z6.unknown().optional(),
  expected: z6.unknown().optional(),
  metadata: z6.union([
    z6.object({ model: z6.union([z6.string(), z6.null()]) }).partial().passthrough(),
    z6.null()
  ]).optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  span_id: z6.string(),
  root_span_id: z6.string(),
  is_root: z6.union([z6.boolean(), z6.null()]).optional(),
  origin: ObjectReferenceNullish.optional(),
  comments: z6.union([z6.array(z6.unknown()), z6.null()]).optional(),
  audit_data: z6.union([z6.array(z6.unknown()), z6.null()]).optional(),
  facets: z6.union([z6.record(z6.union([z6.string(), z6.null()])), z6.null()]).optional(),
  classifications: z6.union([
    z6.record(
      z6.array(
        z6.object({
          id: z6.string(),
          label: z6.string().optional(),
          confidence: z6.union([z6.number(), z6.null()]).optional(),
          metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
          source: SavedFunctionId.and(
            z6.union([
              z6.object({
                type: z6.literal("function"),
                id: z6.string(),
                version: z6.string().optional()
              }),
              z6.object({
                type: z6.literal("global"),
                name: z6.string(),
                function_type: FunctionTypeEnum.optional().default("scorer")
              }),
              z6.null()
            ])
          ).optional()
        })
      )
    ),
    z6.null()
  ]).optional()
});
var DatasetSnapshot = z6.object({
  id: z6.string().uuid(),
  dataset_id: z6.string().uuid(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]),
  xact_id: z6.string(),
  created: z6.union([z6.string(), z6.null()])
});
var EnvVar = z6.object({
  id: z6.string().uuid(),
  object_type: z6.enum(["organization", "project", "function"]),
  object_id: z6.string().uuid(),
  name: z6.string(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  secret_updated_at: z6.union([z6.string(), z6.null()]).optional(),
  secret_updated_by_user_id: z6.union([z6.string(), z6.null()]).optional(),
  used: z6.union([z6.string(), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
  preview_secret: z6.union([z6.string(), z6.null()]).optional(),
  secret_type: z6.union([z6.string(), z6.null()]).optional(),
  secret_category: z6.enum(["env_var", "ai_provider", "sandbox_provider"]).optional().default("env_var")
});
var RepoInfo = z6.union([
  z6.object({
    commit: z6.union([z6.string(), z6.null()]),
    branch: z6.union([z6.string(), z6.null()]),
    tag: z6.union([z6.string(), z6.null()]),
    dirty: z6.union([z6.boolean(), z6.null()]),
    author_name: z6.union([z6.string(), z6.null()]),
    author_email: z6.union([z6.string(), z6.null()]),
    commit_message: z6.union([z6.string(), z6.null()]),
    commit_time: z6.union([z6.string(), z6.null()]),
    git_diff: z6.union([z6.string(), z6.null()])
  }).partial(),
  z6.null()
]);
var Experiment = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  repo_info: RepoInfo.optional(),
  commit: z6.union([z6.string(), z6.null()]).optional(),
  base_exp_id: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  dataset_id: z6.union([z6.string(), z6.null()]).optional(),
  dataset_version: z6.union([z6.string(), z6.null()]).optional(),
  internal_metadata: z6.union([
    z6.object({
      dataset_filter: z6.union([
        z6.object({}).partial().passthrough(),
        z6.null()
      ])
    }).partial().passthrough(),
    z6.null()
  ]).optional(),
  parameters_id: z6.union([z6.string(), z6.null()]).optional(),
  parameters_version: z6.union([z6.string(), z6.null()]).optional(),
  public: z6.boolean(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional()
});
var SpanType = z6.union([
  z6.enum([
    "llm",
    "score",
    "function",
    "eval",
    "task",
    "tool",
    "automation",
    "facet",
    "preprocessor",
    "classifier",
    "review"
  ]),
  z6.null()
]);
var SpanAttributes = z6.union([
  z6.object({
    name: z6.union([z6.string(), z6.null()]),
    type: SpanType,
    purpose: z6.union([z6.literal("scorer"), z6.null()])
  }).partial().passthrough(),
  z6.null()
]);
var ExperimentEvent = z6.object({
  id: z6.string(),
  _xact_id: z6.string(),
  created: z6.string().datetime({ offset: true }),
  _pagination_key: z6.union([z6.string(), z6.null()]).optional(),
  project_id: z6.string().uuid(),
  experiment_id: z6.string().uuid(),
  input: z6.unknown().optional(),
  output: z6.unknown().optional(),
  expected: z6.unknown().optional(),
  error: z6.unknown().optional(),
  scores: z6.union([z6.record(z6.union([z6.number(), z6.null()])), z6.null()]).optional(),
  metadata: z6.union([
    z6.object({ model: z6.union([z6.string(), z6.null()]) }).partial().passthrough(),
    z6.null()
  ]).optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  metrics: z6.union([z6.record(z6.number()), z6.null()]).optional(),
  context: z6.union([
    z6.object({
      caller_functionname: z6.union([z6.string(), z6.null()]),
      caller_filename: z6.union([z6.string(), z6.null()]),
      caller_lineno: z6.union([z6.number(), z6.null()])
    }).partial().passthrough(),
    z6.null()
  ]).optional(),
  span_id: z6.string(),
  span_parents: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  root_span_id: z6.string(),
  span_attributes: SpanAttributes.optional(),
  is_root: z6.union([z6.boolean(), z6.null()]).optional(),
  origin: ObjectReferenceNullish.optional(),
  comments: z6.union([z6.array(z6.unknown()), z6.null()]).optional(),
  audit_data: z6.union([z6.array(z6.unknown()), z6.null()]).optional(),
  facets: z6.union([z6.record(z6.union([z6.string(), z6.null()])), z6.null()]).optional(),
  classifications: z6.union([
    z6.record(
      z6.array(
        z6.object({
          id: z6.string(),
          label: z6.string().optional(),
          confidence: z6.union([z6.number(), z6.null()]).optional(),
          metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
          source: SavedFunctionId.and(
            z6.union([
              z6.object({
                type: z6.literal("function"),
                id: z6.string(),
                version: z6.string().optional()
              }),
              z6.object({
                type: z6.literal("global"),
                name: z6.string(),
                function_type: FunctionTypeEnum.optional().default("scorer")
              }),
              z6.null()
            ])
          ).optional()
        })
      )
    ),
    z6.null()
  ]).optional()
});
var ExtendedSavedFunctionId = z6.union([
  z6.object({
    type: z6.literal("function"),
    id: z6.string(),
    version: z6.string().optional()
  }),
  z6.object({
    type: z6.literal("global"),
    name: z6.string(),
    function_type: FunctionTypeEnum.optional().default("scorer")
  }),
  z6.object({
    type: z6.literal("slug"),
    project_id: z6.string(),
    slug: z6.string()
  })
]);
var FacetData = z6.object({
  type: z6.literal("facet"),
  preprocessor: NullableSavedFunctionId.and(z6.unknown()).optional(),
  prompt: z6.string(),
  model: z6.string().optional(),
  embedding_model: z6.string().optional(),
  no_match_pattern: z6.string().optional()
});
var PromptBlockDataNullish = z6.union([
  z6.object({
    type: z6.literal("chat"),
    messages: z6.array(ChatCompletionMessageParam),
    tools: z6.string().optional()
  }),
  z6.object({ type: z6.literal("completion"), content: z6.string() }),
  z6.null()
]);
var ModelParams = z6.union([
  z6.object({
    use_cache: z6.boolean(),
    reasoning_enabled: z6.boolean(),
    reasoning_budget: z6.number(),
    temperature: z6.number(),
    top_p: z6.number(),
    max_tokens: z6.number(),
    max_completion_tokens: z6.number(),
    frequency_penalty: z6.number(),
    presence_penalty: z6.number(),
    response_format: ResponseFormatNullish,
    tool_choice: z6.union([
      z6.literal("auto"),
      z6.literal("none"),
      z6.literal("required"),
      z6.object({
        type: z6.literal("function"),
        function: z6.object({ name: z6.string() })
      })
    ]),
    function_call: z6.union([
      z6.literal("auto"),
      z6.literal("none"),
      z6.object({ name: z6.string() })
    ]),
    n: z6.number(),
    stop: z6.array(z6.string()),
    reasoning_effort: z6.enum(["none", "minimal", "low", "medium", "high"]),
    verbosity: z6.enum(["low", "medium", "high"])
  }).partial().passthrough(),
  z6.object({
    use_cache: z6.boolean().optional(),
    reasoning_enabled: z6.boolean().optional(),
    reasoning_budget: z6.number().optional(),
    max_tokens: z6.number(),
    temperature: z6.number(),
    top_p: z6.number().optional(),
    top_k: z6.number().optional(),
    stop_sequences: z6.array(z6.string()).optional(),
    max_tokens_to_sample: z6.number().optional()
  }).passthrough(),
  z6.object({
    use_cache: z6.boolean(),
    reasoning_enabled: z6.boolean(),
    reasoning_budget: z6.number(),
    temperature: z6.number(),
    maxOutputTokens: z6.number(),
    topP: z6.number(),
    topK: z6.number()
  }).partial().passthrough(),
  z6.object({
    use_cache: z6.boolean(),
    reasoning_enabled: z6.boolean(),
    reasoning_budget: z6.number(),
    temperature: z6.number(),
    topK: z6.number()
  }).partial().passthrough(),
  z6.object({
    use_cache: z6.boolean(),
    reasoning_enabled: z6.boolean(),
    reasoning_budget: z6.number()
  }).partial().passthrough()
]);
var PromptOptionsNullish = z6.union([
  z6.object({
    model: z6.string(),
    params: ModelParams,
    position: z6.string(),
    endpoint_name: z6.union([z6.string(), z6.null()])
  }).partial(),
  z6.null()
]);
var PromptParserNullish = z6.union([
  z6.object({
    type: z6.literal("llm_classifier"),
    use_cot: z6.boolean(),
    choice_scores: z6.record(z6.number().gte(0).lte(1)).optional(),
    choice: z6.array(z6.string()).optional(),
    allow_no_match: z6.boolean().optional(),
    allow_skip: z6.boolean().optional()
  }),
  z6.null()
]);
var PreprocessorSavedFunctionId = z6.union([
  z6.object({
    type: z6.literal("function"),
    id: z6.string(),
    version: z6.string().optional()
  }),
  z6.object({
    type: z6.literal("global"),
    name: z6.string(),
    function_type: z6.literal("preprocessor").optional().default("preprocessor")
  }),
  z6.null()
]);
var PromptDataNullish = z6.union([
  z6.object({
    prompt: PromptBlockDataNullish,
    options: PromptOptionsNullish,
    parser: PromptParserNullish,
    preprocessor: PreprocessorSavedFunctionId,
    tool_functions: z6.union([z6.array(SavedFunctionId), z6.null()]),
    template_format: z6.union([
      z6.enum(["mustache", "nunjucks", "none"]),
      z6.null()
    ]),
    mcp: z6.union([
      z6.record(
        z6.union([
          z6.object({
            type: z6.literal("id"),
            id: z6.string().uuid(),
            is_disabled: z6.boolean().optional(),
            enabled_tools: z6.union([z6.array(z6.string()), z6.null()]).optional()
          }),
          z6.object({
            type: z6.literal("url"),
            url: z6.string(),
            is_disabled: z6.boolean().optional(),
            enabled_tools: z6.union([z6.array(z6.string()), z6.null()]).optional()
          })
        ])
      ),
      z6.null()
    ]),
    origin: z6.union([
      z6.object({
        prompt_id: z6.string(),
        project_id: z6.string(),
        prompt_version: z6.string()
      }).partial(),
      z6.null()
    ])
  }).partial(),
  z6.null()
]);
var FunctionTypeEnumNullish = z6.union([
  z6.enum([
    "llm",
    "scorer",
    "task",
    "tool",
    "custom_view",
    "preprocessor",
    "facet",
    "classifier",
    "tag",
    "parameters",
    "sandbox"
  ]),
  z6.null()
]);
var FunctionIdRef = z6.object({}).partial().passthrough();
var PromptBlockData = z6.union([
  z6.object({
    type: z6.literal("chat"),
    messages: z6.array(ChatCompletionMessageParam),
    tools: z6.string().optional()
  }),
  z6.object({ type: z6.literal("completion"), content: z6.string() })
]);
var GraphNode = z6.union([
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("function"),
    function: FunctionIdRef
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("input")
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("output")
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("literal"),
    value: z6.unknown().optional()
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("btql"),
    expr: z6.string()
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("gate"),
    condition: z6.union([z6.string(), z6.null()]).optional()
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("aggregator")
  }),
  z6.object({
    description: z6.union([z6.string(), z6.null()]).optional(),
    position: z6.union([z6.object({ x: z6.number(), y: z6.number() }), z6.null()]).optional(),
    type: z6.literal("prompt_template"),
    prompt: PromptBlockData
  })
]);
var GraphEdge = z6.object({
  source: z6.object({ node: z6.string().max(1024), variable: z6.string() }),
  target: z6.object({ node: z6.string().max(1024), variable: z6.string() }),
  purpose: z6.enum(["control", "data", "messages"])
});
var GraphData = z6.object({
  type: z6.literal("graph"),
  nodes: z6.record(GraphNode),
  edges: z6.record(GraphEdge)
});
var FunctionData = z6.union([
  z6.object({ type: z6.literal("prompt") }),
  z6.object({
    type: z6.literal("code"),
    data: z6.union([
      z6.object({ type: z6.literal("bundle") }).and(CodeBundle),
      z6.object({
        type: z6.literal("inline"),
        runtime_context: z6.object({
          runtime: z6.enum(["node", "python", "browser", "quickjs"]),
          version: z6.string()
        }),
        code: z6.string(),
        code_hash: z6.string().optional()
      })
    ])
  }),
  GraphData,
  z6.object({
    type: z6.literal("remote_eval"),
    endpoint: z6.string(),
    eval_name: z6.string(),
    parameters: z6.object({}).partial().passthrough(),
    parameters_version: z6.union([z6.string(), z6.null()]).optional()
  }),
  z6.object({
    type: z6.literal("global"),
    name: z6.string(),
    function_type: FunctionTypeEnum.optional().default("scorer"),
    config: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional()
  }),
  FacetData,
  BatchedFacetData,
  z6.object({
    type: z6.literal("parameters"),
    data: z6.object({}).partial().passthrough(),
    __schema: z6.object({
      type: z6.literal("object"),
      properties: z6.record(z6.object({}).partial().passthrough()),
      required: z6.array(z6.string()).optional(),
      additionalProperties: z6.boolean().optional()
    })
  }),
  TopicMapData.and(z6.unknown())
]);
var Function = z6.object({
  id: z6.string().uuid(),
  _xact_id: z6.string(),
  project_id: z6.string().uuid(),
  log_id: z6.literal("p"),
  org_id: z6.string().uuid(),
  name: z6.string(),
  slug: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  prompt_data: PromptDataNullish.optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
  function_type: FunctionTypeEnumNullish.optional(),
  function_data: FunctionData,
  origin: z6.union([
    z6.object({
      object_type: AclObjectType.and(z6.string()),
      object_id: z6.string().uuid(),
      internal: z6.union([z6.boolean(), z6.null()]).optional()
    }),
    z6.null()
  ]).optional(),
  function_schema: z6.union([
    z6.object({ parameters: z6.unknown(), returns: z6.unknown() }).partial(),
    z6.null()
  ]).optional()
});
var FunctionFormat = z6.enum([
  "llm",
  "code",
  "global",
  "graph",
  "topic_map"
]);
var PromptData = z6.object({
  prompt: PromptBlockDataNullish,
  options: PromptOptionsNullish,
  parser: PromptParserNullish,
  preprocessor: PreprocessorSavedFunctionId,
  tool_functions: z6.union([z6.array(SavedFunctionId), z6.null()]),
  template_format: z6.union([
    z6.enum(["mustache", "nunjucks", "none"]),
    z6.null()
  ]),
  mcp: z6.union([
    z6.record(
      z6.union([
        z6.object({
          type: z6.literal("id"),
          id: z6.string().uuid(),
          is_disabled: z6.boolean().optional(),
          enabled_tools: z6.union([z6.array(z6.string()), z6.null()]).optional()
        }),
        z6.object({
          type: z6.literal("url"),
          url: z6.string(),
          is_disabled: z6.boolean().optional(),
          enabled_tools: z6.union([z6.array(z6.string()), z6.null()]).optional()
        })
      ])
    ),
    z6.null()
  ]),
  origin: z6.union([
    z6.object({
      prompt_id: z6.string(),
      project_id: z6.string(),
      prompt_version: z6.string()
    }).partial(),
    z6.null()
  ])
}).partial();
var FunctionId = z6.union([
  z6.object({ function_id: z6.string(), version: z6.string().optional() }),
  z6.object({
    project_name: z6.string(),
    slug: z6.string(),
    version: z6.string().optional()
  }),
  z6.object({
    global_function: z6.string(),
    function_type: FunctionTypeEnum.optional().default("scorer")
  }),
  z6.object({
    prompt_session_id: z6.string(),
    prompt_session_function_id: z6.string(),
    version: z6.string().optional()
  }),
  z6.object({
    inline_context: z6.object({
      runtime: z6.enum(["node", "python", "browser", "quickjs"]),
      version: z6.string()
    }),
    code: z6.string(),
    function_type: FunctionTypeEnum.and(z6.unknown()).optional(),
    name: z6.union([z6.string(), z6.null()]).optional()
  }),
  z6.object({
    inline_prompt: PromptData.optional(),
    inline_function: z6.object({}).partial().passthrough(),
    function_type: FunctionTypeEnum.optional().default("scorer"),
    name: z6.union([z6.string(), z6.null()]).optional()
  }),
  z6.object({
    inline_prompt: PromptData,
    function_type: FunctionTypeEnum.optional().default("scorer"),
    name: z6.union([z6.string(), z6.null()]).optional()
  })
]);
var FunctionObjectType = z6.enum([
  "prompt",
  "tool",
  "scorer",
  "task",
  "workflow",
  "custom_view",
  "preprocessor",
  "facet",
  "classifier",
  "parameters",
  "sandbox"
]);
var FunctionOutputType = z6.enum([
  "completion",
  "score",
  "facet",
  "classification",
  "any"
]);
var GitMetadataSettings = z6.object({
  collect: z6.enum(["all", "none", "some"]),
  fields: z6.array(
    z6.enum([
      "commit",
      "branch",
      "tag",
      "dirty",
      "author_name",
      "author_email",
      "commit_message",
      "commit_time",
      "git_diff"
    ])
  ).optional()
});
var Group = z6.object({
  id: z6.string().uuid(),
  org_id: z6.string().uuid(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  member_users: z6.union([z6.array(z6.string().uuid()), z6.null()]).optional(),
  member_groups: z6.union([z6.array(z6.string().uuid()), z6.null()]).optional()
});
var GroupScope = z6.object({
  type: z6.literal("group"),
  group_by: z6.string(),
  interval_seconds: z6.number().gte(1).optional(),
  max_traces: z6.number().int().gte(1).lte(64).optional(),
  placement: z6.enum(["first", "each"]),
  idle_seconds: z6.number().optional()
});
var IfExists = z6.enum(["error", "ignore", "replace"]);
var ImageRenderingMode = z6.union([
  z6.enum(["auto", "click_to_load", "blocked"]),
  z6.null()
]);
var InvokeParent = z6.union([
  z6.object({
    object_type: z6.enum(["project_logs", "experiment", "playground_logs"]),
    object_id: z6.string(),
    row_ids: z6.union([
      z6.object({
        id: z6.string(),
        span_id: z6.string(),
        root_span_id: z6.string()
      }),
      z6.null()
    ]).optional(),
    propagated_event: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional()
  }),
  z6.string()
]);
var StreamingMode = z6.union([
  z6.enum(["auto", "parallel", "json", "text"]),
  z6.null()
]);
var InvokeFunction = FunctionId.and(
  z6.object({
    input: z6.unknown(),
    expected: z6.unknown(),
    metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]),
    tags: z6.union([z6.array(z6.string()), z6.null()]),
    messages: z6.array(ChatCompletionMessageParam),
    parent: InvokeParent,
    stream: z6.union([z6.boolean(), z6.null()]),
    mode: StreamingMode,
    strict: z6.union([z6.boolean(), z6.null()]),
    mcp_auth: z6.record(z6.object({ oauth_token: z6.string() }).partial()),
    overrides: z6.union([z6.object({}).partial().passthrough(), z6.null()]),
    endpoint_name: z6.union([z6.string(), z6.null()])
  }).partial()
);
var MCPServer = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  url: z6.string()
});
var MessageRole = z6.enum([
  "system",
  "user",
  "assistant",
  "function",
  "tool",
  "model",
  "developer"
]);
var ObjectReference = z6.object({
  object_type: z6.enum([
    "project_logs",
    "experiment",
    "dataset",
    "prompt",
    "function",
    "prompt_session"
  ]),
  object_id: z6.string().uuid(),
  id: z6.string(),
  _xact_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional()
});
var SpanScope = z6.object({ type: z6.literal("span") });
var TraceScope = z6.object({
  type: z6.literal("trace"),
  idle_seconds: z6.number().optional()
});
var OnlineScoreConfig = z6.union([
  z6.object({
    sampling_rate: z6.number().gte(0).lte(1),
    scorers: z6.array(SavedFunctionId),
    btql_filter: z6.union([z6.string(), z6.null()]).optional(),
    apply_to_root_span: z6.union([z6.boolean(), z6.null()]).optional(),
    apply_to_span_names: z6.union([z6.array(z6.string()), z6.null()]).optional(),
    skip_logging: z6.union([z6.boolean(), z6.null()]).optional(),
    scope: z6.union([SpanScope, TraceScope, GroupScope, z6.null()]).optional()
  }),
  z6.null()
]);
var Organization = z6.object({
  id: z6.string().uuid(),
  name: z6.string(),
  api_url: z6.union([z6.string(), z6.null()]).optional(),
  is_universal_api: z6.union([z6.boolean(), z6.null()]).optional(),
  is_dataplane_private: z6.union([z6.boolean(), z6.null()]).optional(),
  proxy_url: z6.union([z6.string(), z6.null()]).optional(),
  realtime_url: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  image_rendering_mode: ImageRenderingMode.optional()
});
var RetentionObjectType = z6.enum([
  "project_logs",
  "experiment",
  "dataset"
]);
var OrgAutomation = z6.object({
  id: z6.string().uuid(),
  org_id: z6.string().uuid(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  config: z6.object({
    event_type: z6.literal("retention"),
    object_type: RetentionObjectType,
    retention_days: z6.number().int().gte(0)
  })
});
var ProjectSettings = z6.union([
  z6.object({
    comparison_key: z6.union([z6.string(), z6.null()]),
    baseline_experiment_id: z6.union([z6.string(), z6.null()]),
    spanFieldOrder: z6.union([
      z6.array(
        z6.object({
          object_type: z6.string(),
          column_id: z6.string(),
          position: z6.string(),
          layout: z6.union([z6.literal("full"), z6.literal("two_column"), z6.null()]).optional()
        })
      ),
      z6.null()
    ]),
    remote_eval_sources: z6.union([
      z6.array(
        z6.object({
          url: z6.string(),
          name: z6.union([z6.string(), z6.null()]).optional(),
          description: z6.union([z6.string(), z6.null()]).optional()
        })
      ),
      z6.null()
    ]),
    disable_realtime_queries: z6.union([z6.boolean(), z6.null()]),
    monitor_charts_use_metrics_start: z6.union([z6.boolean(), z6.null()]),
    default_preprocessor: NullableSavedFunctionId
  }).partial(),
  z6.null()
]);
var Project = z6.object({
  id: z6.string().uuid(),
  org_id: z6.string().uuid(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  settings: ProjectSettings.optional()
});
var TopicAutomationFacetModel = z6.union([
  z6.enum(["brain-facet-latest", "brain-facet-1", "brain-facet-2"]),
  z6.null()
]);
var TopicMapFunctionAutomation = z6.object({
  function: SavedFunctionId.and(z6.unknown()),
  btql_filter: z6.union([z6.string(), z6.null()]).optional()
});
var TopicAutomationDataScope = z6.union([
  z6.object({ type: z6.literal("project_logs") }),
  z6.object({ type: z6.literal("project_experiments") }),
  z6.object({ type: z6.literal("experiment"), experiment_id: z6.string() }),
  z6.null()
]);
var TopicAutomationConfig = z6.object({
  event_type: z6.literal("topic"),
  status: AutomationStatus.optional(),
  sampling_rate: z6.number().gte(0).lte(1),
  facet_model: TopicAutomationFacetModel.optional(),
  facet_functions: z6.array(SavedFunctionId),
  topic_map_functions: z6.array(TopicMapFunctionAutomation),
  scope: z6.union([SpanScope, TraceScope, GroupScope, z6.null()]).optional(),
  data_scope: TopicAutomationDataScope.optional(),
  btql_filter: z6.union([z6.string(), z6.null()]).optional(),
  rerun_seconds: z6.union([z6.number(), z6.null()]).optional(),
  relabel_overlap_seconds: z6.union([z6.number(), z6.null()]).optional(),
  backfill_time_range: z6.union([
    z6.string(),
    z6.object({ from: z6.string(), to: z6.string() }),
    z6.null()
  ]).optional()
});
var TopicDigestAutomationConfig = z6.object({
  event_type: z6.literal("topic_digest"),
  status: AutomationStatus.optional(),
  window_seconds: z6.number().int().gte(3600).lte(2592e3).optional().default(86400),
  scheduled_time_minutes_utc: z6.number().int().gte(0).lte(1439),
  action: z6.object({
    type: z6.literal("slack"),
    workspace_id: z6.string(),
    channel: z6.string(),
    message_template: z6.string().optional()
  }),
  topic_map_function_ids: z6.array(z6.string()).max(10).optional()
});
var ProjectAutomation = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  config: z6.union([
    z6.object({
      event_type: z6.literal("logs"),
      btql_filter: z6.string(),
      interval_seconds: z6.number().gte(1).lte(2592e3),
      action: z6.union([
        z6.object({ type: z6.literal("webhook"), url: z6.string() }),
        z6.object({
          type: z6.literal("slack"),
          workspace_id: z6.string(),
          channel: z6.string(),
          message_template: z6.string().optional()
        })
      ])
    }),
    z6.object({
      event_type: z6.literal("btql_export"),
      status: AutomationStatus.optional(),
      export_definition: z6.union([
        z6.object({ type: z6.literal("log_traces") }),
        z6.object({ type: z6.literal("log_spans") }),
        z6.object({ type: z6.literal("btql_query"), btql_query: z6.string() })
      ]),
      scope: z6.union([SpanScope, TraceScope, GroupScope, z6.null()]).optional(),
      export_path: z6.string(),
      format: z6.enum(["jsonl", "parquet"]),
      interval_seconds: z6.number().gte(1).lte(2592e3),
      credentials: z6.union([
        z6.object({
          type: z6.literal("aws_iam"),
          role_arn: z6.string(),
          external_id: z6.string()
        }),
        z6.object({
          type: z6.literal("gcp_service_account"),
          service_account_email: z6.string()
        })
      ]),
      batch_size: z6.union([z6.number(), z6.null()]).optional()
    }),
    z6.object({
      event_type: z6.literal("async_query"),
      status: AutomationStatus.optional(),
      created_by_user_id: z6.string().uuid(),
      object_type: z6.enum([
        "project_logs",
        "experiment",
        "dataset",
        "playground_logs"
      ]),
      object_id: z6.string(),
      query: z6.string(),
      format: z6.literal("jsonl"),
      batch_size: z6.union([z6.number(), z6.null()]).optional()
    }),
    z6.object({
      event_type: z6.literal("retention"),
      object_type: RetentionObjectType,
      retention_days: z6.number().int().gte(0)
    }),
    z6.object({
      event_type: z6.literal("environment_update"),
      environment_filter: z6.array(z6.string()).optional(),
      action: z6.union([
        z6.object({ type: z6.literal("webhook"), url: z6.string() }),
        z6.object({
          type: z6.literal("slack"),
          workspace_id: z6.string(),
          channel: z6.string(),
          message_template: z6.string().optional()
        })
      ])
    }),
    TopicAutomationConfig,
    TopicDigestAutomationConfig
  ])
});
var ProjectLogsEvent = z6.object({
  id: z6.string(),
  _xact_id: z6.string(),
  _pagination_key: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.string().datetime({ offset: true }),
  org_id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  log_id: z6.literal("g"),
  input: z6.unknown().optional(),
  output: z6.unknown().optional(),
  expected: z6.unknown().optional(),
  error: z6.unknown().optional(),
  scores: z6.union([z6.record(z6.union([z6.number(), z6.null()])), z6.null()]).optional(),
  metadata: z6.union([
    z6.object({ model: z6.union([z6.string(), z6.null()]) }).partial().passthrough(),
    z6.null()
  ]).optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  metrics: z6.union([z6.record(z6.number()), z6.null()]).optional(),
  context: z6.union([
    z6.object({
      caller_functionname: z6.union([z6.string(), z6.null()]),
      caller_filename: z6.union([z6.string(), z6.null()]),
      caller_lineno: z6.union([z6.number(), z6.null()])
    }).partial().passthrough(),
    z6.null()
  ]).optional(),
  span_id: z6.string(),
  span_parents: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  root_span_id: z6.string(),
  is_root: z6.union([z6.boolean(), z6.null()]).optional(),
  span_attributes: SpanAttributes.optional(),
  origin: ObjectReferenceNullish.optional(),
  comments: z6.union([z6.array(z6.unknown()), z6.null()]).optional(),
  audit_data: z6.union([z6.array(z6.unknown()), z6.null()]).optional(),
  _async_scoring_state: z6.unknown().optional(),
  facets: z6.union([z6.record(z6.union([z6.string(), z6.null()])), z6.null()]).optional(),
  classifications: z6.union([
    z6.record(
      z6.array(
        z6.object({
          id: z6.string(),
          label: z6.string().optional(),
          confidence: z6.union([z6.number(), z6.null()]).optional(),
          metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
          source: SavedFunctionId.and(
            z6.union([
              z6.object({
                type: z6.literal("function"),
                id: z6.string(),
                version: z6.string().optional()
              }),
              z6.object({
                type: z6.literal("global"),
                name: z6.string(),
                function_type: FunctionTypeEnum.optional().default("scorer")
              }),
              z6.null()
            ])
          ).optional()
        })
      )
    ),
    z6.null()
  ]).optional()
});
var ProjectScoreType = z6.enum([
  "slider",
  "categorical",
  "weighted",
  "minimum",
  "maximum",
  "online",
  "free-form"
]);
var ProjectScoreCategory = z6.object({
  name: z6.string(),
  value: z6.number()
});
var ProjectScoreCategories = z6.union([
  z6.array(ProjectScoreCategory),
  z6.record(z6.number()),
  z6.array(z6.string()),
  z6.null()
]);
var ProjectScoreCondition = z6.union([
  z6.object({
    when: z6.object({
      clauses: z6.union([z6.array(z6.string()), z6.null()]),
      subspan_clauses: z6.union([z6.array(z6.string()), z6.null()]),
      trace_clauses: z6.union([z6.array(z6.string()), z6.null()])
    }).partial(),
    behavior: z6.literal("hidden").optional().default("hidden")
  }),
  z6.null()
]);
var ProjectScoreConfig = z6.union([
  z6.object({
    multi_select: z6.union([z6.boolean(), z6.null()]),
    destination: z6.union([z6.string(), z6.null()]),
    visibility: z6.union([
      z6.object({
        users: z6.union([z6.array(z6.string()), z6.null()]),
        groups: z6.union([z6.array(z6.string()), z6.null()])
      }).partial(),
      z6.null()
    ]),
    online: OnlineScoreConfig,
    condition: ProjectScoreCondition,
    object_types: z6.union([
      z6.array(z6.enum(["project_logs", "dataset", "experiment"])),
      z6.null()
    ])
  }).partial(),
  z6.null()
]);
var ProjectScore = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  user_id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  score_type: ProjectScoreType,
  categories: ProjectScoreCategories.optional(),
  config: ProjectScoreConfig.optional(),
  position: z6.union([z6.string(), z6.null()]).optional()
});
var ProjectTag = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  user_id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  color: z6.union([z6.string(), z6.null()]).optional(),
  position: z6.union([z6.string(), z6.null()]).optional()
});
var Prompt = z6.object({
  id: z6.string().uuid(),
  _xact_id: z6.string(),
  project_id: z6.string().uuid(),
  log_id: z6.literal("p"),
  org_id: z6.string().uuid(),
  name: z6.string(),
  slug: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  prompt_data: PromptDataNullish.optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional(),
  metadata: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional(),
  function_type: FunctionTypeEnumNullish.optional()
});
var PromptOptions = z6.object({
  model: z6.string(),
  params: ModelParams,
  position: z6.string(),
  endpoint_name: z6.union([z6.string(), z6.null()])
}).partial();
var PromptSessionEvent = z6.object({
  id: z6.string(),
  _xact_id: z6.string(),
  created: z6.string().datetime({ offset: true }),
  _pagination_key: z6.union([z6.string(), z6.null()]).optional(),
  project_id: z6.string().uuid(),
  prompt_session_id: z6.string().uuid(),
  prompt_session_data: z6.unknown().optional(),
  prompt_data: z6.unknown().optional(),
  function_data: z6.unknown().optional(),
  function_type: FunctionTypeEnumNullish.optional(),
  object_data: z6.unknown().optional(),
  completion: z6.unknown().optional(),
  tags: z6.union([z6.array(z6.string()), z6.null()]).optional()
});
var ResponseFormat = z6.union([
  z6.object({ type: z6.literal("json_object") }),
  z6.object({
    type: z6.literal("json_schema"),
    json_schema: ResponseFormatJsonSchema
  }),
  z6.object({ type: z6.literal("text") })
]);
var Role = z6.object({
  id: z6.string().uuid(),
  org_id: z6.union([z6.string(), z6.null()]).optional(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  member_permissions: z6.union([
    z6.array(
      z6.object({
        permission: Permission,
        restrict_object_type: AclObjectType.optional()
      })
    ),
    z6.null()
  ]).optional(),
  member_roles: z6.union([z6.array(z6.string().uuid()), z6.null()]).optional()
});
var RunEval = z6.object({
  project_id: z6.string(),
  data: z6.union([
    z6.object({
      dataset_id: z6.string(),
      dataset_version: z6.union([z6.string(), z6.null()]).optional(),
      dataset_environment: z6.union([z6.string(), z6.null()]).optional(),
      _internal_btql: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional()
    }),
    z6.object({
      project_name: z6.string(),
      dataset_name: z6.string(),
      dataset_version: z6.union([z6.string(), z6.null()]).optional(),
      dataset_environment: z6.union([z6.string(), z6.null()]).optional(),
      _internal_btql: z6.union([z6.object({}).partial().passthrough(), z6.null()]).optional()
    }),
    z6.object({ data: z6.array(z6.unknown()) })
  ]),
  name: z6.string().optional(),
  parameters: z6.object({}).partial().passthrough().optional(),
  task: FunctionId.and(z6.unknown()),
  scores: z6.array(FunctionId),
  experiment_name: z6.string().optional(),
  metadata: z6.object({}).partial().passthrough().optional(),
  parent: InvokeParent.and(z6.unknown()).optional(),
  stream: z6.boolean().optional(),
  trial_count: z6.union([z6.number(), z6.null()]).optional(),
  is_public: z6.union([z6.boolean(), z6.null()]).optional(),
  timeout: z6.union([z6.number(), z6.null()]).optional(),
  max_concurrency: z6.union([z6.number(), z6.null()]).optional().default(10),
  base_experiment_name: z6.union([z6.string(), z6.null()]).optional(),
  base_experiment_id: z6.union([z6.string(), z6.null()]).optional(),
  git_metadata_settings: GitMetadataSettings.and(
    z6.union([z6.object({}).partial(), z6.null()])
  ).optional(),
  repo_info: RepoInfo.and(z6.unknown()).optional(),
  strict: z6.union([z6.boolean(), z6.null()]).optional(),
  stop_token: z6.union([z6.string(), z6.null()]).optional(),
  extra_messages: z6.string().optional(),
  tags: z6.array(z6.string()).optional(),
  mcp_auth: z6.record(z6.object({ oauth_token: z6.string() }).partial()).optional(),
  endpoint_name: z6.union([z6.string(), z6.null()]).optional()
});
var ServiceToken = z6.object({
  id: z6.string().uuid(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  preview_name: z6.string(),
  service_account_id: z6.union([z6.string(), z6.null()]).optional(),
  service_account_email: z6.union([z6.string(), z6.null()]).optional(),
  service_account_name: z6.union([z6.string(), z6.null()]).optional(),
  org_id: z6.union([z6.string(), z6.null()]).optional(),
  expires_at: z6.union([z6.string(), z6.null()]).optional()
});
var SpanIFrame = z6.object({
  id: z6.string().uuid(),
  project_id: z6.string().uuid(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional(),
  name: z6.string(),
  description: z6.union([z6.string(), z6.null()]).optional(),
  url: z6.string(),
  post_message: z6.union([z6.boolean(), z6.null()]).optional()
});
var SSEConsoleEventData = z6.object({
  stream: z6.enum(["stderr", "stdout"]),
  message: z6.string()
});
var SSEProgressEventData = z6.object({
  id: z6.string(),
  object_type: FunctionObjectType,
  origin: ObjectReferenceNullish.and(z6.unknown()).optional(),
  format: FunctionFormat,
  output_type: FunctionOutputType,
  name: z6.string(),
  event: z6.enum([
    "reasoning_delta",
    "text_delta",
    "json_delta",
    "error",
    "console",
    "start",
    "done",
    "progress"
  ]),
  data: z6.string()
});
var ToolFunctionDefinition = z6.object({
  type: z6.literal("function"),
  function: z6.object({
    name: z6.string(),
    description: z6.string().optional(),
    parameters: z6.object({}).partial().passthrough().optional(),
    strict: z6.union([z6.boolean(), z6.null()]).optional()
  })
});
var User = z6.object({
  id: z6.string().uuid(),
  given_name: z6.union([z6.string(), z6.null()]).optional(),
  family_name: z6.union([z6.string(), z6.null()]).optional(),
  email: z6.union([z6.string(), z6.null()]).optional(),
  avatar_url: z6.union([z6.string(), z6.null()]).optional(),
  created: z6.union([z6.string(), z6.null()]).optional()
});
var ViewDataSearch = z6.union([
  z6.object({
    filter: z6.union([z6.array(z6.unknown()), z6.null()]),
    tag: z6.union([z6.array(z6.unknown()), z6.null()]),
    match: z6.union([z6.array(z6.unknown()), z6.null()]),
    sort: z6.union([z6.array(z6.unknown()), z6.null()])
  }).partial(),
  z6.null()
]);
var ViewData = z6.union([
  z6.object({ search: ViewDataSearch, custom_charts: z6.unknown() }).partial(),
  z6.null()
]);
var ViewOptions = z6.union([
  z6.object({
    viewType: z6.literal("monitor"),
    options: z6.object({
      spanType: z6.union([z6.enum(["range", "frame"]), z6.null()]),
      rangeValue: z6.union([z6.string(), z6.null()]),
      frameStart: z6.union([z6.string(), z6.null()]),
      frameEnd: z6.union([z6.string(), z6.null()]),
      tzUTC: z6.union([z6.boolean(), z6.null()]),
      chartVisibility: z6.union([z6.record(z6.boolean()), z6.null()]),
      projectId: z6.union([z6.string(), z6.null()]),
      type: z6.union([z6.enum(["project", "experiment"]), z6.null()]),
      groupBy: z6.union([z6.string(), z6.null()])
    }).partial(),
    freezeColumns: z6.union([z6.boolean(), z6.null()]).optional()
  }),
  z6.object({
    columnVisibility: z6.union([z6.record(z6.boolean()), z6.null()]),
    columnOrder: z6.union([z6.array(z6.string()), z6.null()]),
    columnSizing: z6.union([z6.record(z6.number()), z6.null()]),
    grouping: z6.union([z6.string(), z6.null()]),
    rowHeight: z6.union([z6.string(), z6.null()]),
    tallGroupRows: z6.union([z6.boolean(), z6.null()]),
    layout: z6.union([z6.string(), z6.null()]),
    topicMapReportKey: z6.union([z6.string(), z6.null()]),
    chartHeight: z6.union([z6.number(), z6.null()]),
    excludedMeasures: z6.union([
      z6.array(
        z6.object({
          type: z6.enum(["none", "score", "metric", "metadata"]),
          value: z6.string()
        })
      ),
      z6.null()
    ]),
    yMetric: z6.union([
      z6.object({
        type: z6.enum(["none", "score", "metric", "metadata"]),
        value: z6.string()
      }),
      z6.null()
    ]),
    xAxis: z6.union([
      z6.object({
        type: z6.enum(["none", "score", "metric", "metadata"]),
        value: z6.string()
      }),
      z6.null()
    ]),
    symbolGrouping: z6.union([
      z6.object({
        type: z6.enum(["none", "score", "metric", "metadata"]),
        value: z6.string()
      }),
      z6.null()
    ]),
    pointSizeMetric: z6.union([
      z6.object({
        type: z6.enum(["none", "score", "metric", "metadata"]),
        value: z6.string()
      }),
      z6.null()
    ]),
    xAxisAggregation: z6.union([z6.string(), z6.null()]),
    chartAnnotations: z6.union([
      z6.array(z6.object({ id: z6.string(), text: z6.string() })),
      z6.null()
    ]),
    timeRangeFilter: z6.union([
      z6.string(),
      z6.object({ from: z6.string(), to: z6.string() }),
      z6.null()
    ]),
    queryShape: z6.union([z6.enum(["traces", "spans", "topics"]), z6.null()]),
    cluster: z6.union([z6.string(), z6.null()]),
    freezeColumns: z6.union([z6.boolean(), z6.null()])
  }).partial(),
  z6.null()
]);
var View = z6.object({
  id: z6.string().uuid(),
  object_type: AclObjectType.and(z6.string()),
  object_id: z6.string().uuid(),
  view_type: z6.enum([
    "projects",
    "experiments",
    "experiment",
    "playgrounds",
    "playground",
    "datasets",
    "dataset",
    "prompts",
    "parameters",
    "tools",
    "scorers",
    "classifiers",
    "logs",
    "monitor",
    "for_review_project_log",
    "for_review_experiments",
    "for_review_datasets"
  ]),
  name: z6.string(),
  created: z6.union([z6.string(), z6.null()]).optional(),
  view_data: ViewData.optional(),
  options: ViewOptions.optional(),
  user_id: z6.union([z6.string(), z6.null()]).optional(),
  deleted_at: z6.union([z6.string(), z6.null()]).optional()
});

// src/logger.ts
import { waitUntil } from "@vercel/functions";

// src/template/plugins/mustache.ts
import Mustache2 from "mustache";

// src/template/mustache-utils.ts
import Mustache from "mustache";
function lintTemplate(template, context) {
  const variables = getMustacheVars(template);
  for (const variable of variables) {
    const arrPathsReplaced = variable[1].replaceAll(/\.\d+/g, ".0");
    const fieldExists = getObjValueByPath(context, arrPathsReplaced.split(".")) !== void 0;
    if (!fieldExists) {
      throw new Error(`Variable '${variable[1]}' does not exist.`);
    }
  }
}
function getMustacheVars(prompt) {
  try {
    return Mustache.parse(prompt).filter(
      (span) => span[0] === "name" || span[0] === "&"
    );
  } catch {
    return [];
  }
}

// src/template/plugins/mustache.ts
var jsonEscape = (v) => typeof v === "string" ? v : JSON.stringify(v);
var mustachePlugin = {
  name: "mustache",
  defaultOptions: { strict: true, escape: jsonEscape },
  createRenderer() {
    const opts = this.defaultOptions ?? {};
    const escapeFn = opts?.escape ?? jsonEscape;
    const strictDefault = typeof opts?.strict === "boolean" ? opts.strict : true;
    return {
      render(template, variables, escape, strict) {
        const esc = escape ?? escapeFn;
        const strictMode = typeof strict === "boolean" ? strict : strictDefault;
        if (strictMode) lintTemplate(template, variables);
        return Mustache2.render(template, variables, void 0, { escape: esc });
      },
      lint(template, variables) {
        lintTemplate(template, variables);
      }
    };
  }
};

// src/template/registry.ts
var TemplatePluginRegistry = class {
  plugins = /* @__PURE__ */ new Map();
  register(plugin) {
    if (this.plugins.has(plugin.name)) {
      console.warn(
        `Template plugin '${plugin.name}' already registered, overwriting`
      );
    }
    const entry = {
      plugin,
      renderer: plugin.defaultOptions !== void 0 ? plugin.createRenderer() : void 0
    };
    this.plugins.set(plugin.name, entry);
  }
  getAvailable() {
    return Array.from(this.plugins.keys());
  }
  get(name) {
    return this.plugins.get(name)?.renderer;
  }
  isRegistered(name) {
    return this.plugins.has(name);
  }
};
var templateRegistry = new TemplatePluginRegistry();
var registerTemplatePlugin = templateRegistry.register.bind(templateRegistry);
var getTemplateRenderer = templateRegistry.get.bind(templateRegistry);
registerTemplatePlugin(mustachePlugin);

// src/logger.ts
import { z as z8, ZodError } from "zod/v3";

// src/functions/stream.ts
import {
  createParser
} from "eventsource-parser";
import { z as z7 } from "zod/v3";
var braintrustStreamChunkSchema = z7.union([
  z7.object({
    type: z7.literal("text_delta"),
    data: z7.string()
  }),
  z7.object({
    type: z7.literal("reasoning_delta"),
    data: z7.string()
  }),
  z7.object({
    type: z7.literal("json_delta"),
    data: z7.string()
  }),
  z7.object({
    type: z7.literal("error"),
    data: z7.string()
  }),
  z7.object({
    type: z7.literal("console"),
    data: SSEConsoleEventData
  }),
  z7.object({
    type: z7.literal("progress"),
    data: SSEProgressEventData
  }),
  z7.object({
    type: z7.literal("start"),
    data: z7.string()
  }),
  z7.object({
    type: z7.literal("done"),
    data: z7.string()
  })
]);
var BraintrustStream = class _BraintrustStream {
  stream;
  memoizedFinalValue;
  signal;
  constructor(baseStream, { signal } = {}) {
    this.signal = signal;
    this.stream = baseStream.pipeThrough(btStreamParser(), { signal });
  }
  /**
   * Copy the stream. This returns a new stream that shares the same underlying
   * stream (via `tee`). Since streams are consumed in Javascript, use `copy()` if you
   * need to use the stream multiple times.
   *
   * @returns A new stream that you can independently consume.
   */
  copy() {
    const [newStream, copyStream] = this.stream.tee();
    this.stream = copyStream;
    return new _BraintrustStream(newStream, { signal: this.signal });
  }
  /**
   * Get the underlying ReadableStream.
   *
   * @returns The underlying `ReadableStream<BraintrustStreamChunk>`.
   */
  toReadableStream() {
    return this.stream;
  }
  /**
   * Returns an async iterator for the BraintrustStream.
   * This allows for easy consumption of the stream using a for-await...of loop.
   *
   * @returns An async iterator that yields BraintrustStreamChunk objects.
   */
  [Symbol.asyncIterator]() {
    const reader = this.stream.getReader();
    return {
      async next() {
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          return { done: true, value: void 0 };
        }
        return { done: false, value };
      },
      async return() {
        reader.releaseLock();
        return { done: true, value: void 0 };
      },
      async throw(error) {
        reader.releaseLock();
        throw error;
      }
    };
  }
  /**
   * Get the final value of the stream. The final value is the concatenation of all
   * the chunks in the stream, deserialized into a string or JSON object, depending on
   * the value's type.
   *
   * This function returns a promise that resolves when the stream is closed, and
   * contains the final value. Multiple calls to `finalValue()` will return the same
   * promise, so it is safe to call this multiple times.
   *
   * This function consumes the stream, so if you need to use the stream multiple
   * times, you should call `copy()` first.
   *
   * @returns A promise that resolves with the final value of the stream or `undefined` if the stream is empty.
   */
  finalValue() {
    if (this.memoizedFinalValue) {
      return this.memoizedFinalValue;
    }
    this.memoizedFinalValue = new Promise((resolve, reject) => {
      this.stream.pipeThrough(createFinalValuePassThroughStream(resolve, reject), {
        signal: this.signal
      }).pipeTo(devNullWritableStream(), { signal: this.signal }).catch(reject);
    });
    return this.memoizedFinalValue;
  }
  static parseRawEvent(event) {
    switch (event.event) {
      case "text_delta":
        return {
          type: "text_delta",
          data: JSON.parse(event.data)
        };
      case "reasoning_delta":
        return {
          type: "reasoning_delta",
          data: JSON.parse(event.data)
        };
      case "json_delta":
        return {
          type: "json_delta",
          data: event.data
        };
      case "error":
        return {
          type: "error",
          data: JSON.parse(event.data)
        };
      case "progress":
        return {
          type: "progress",
          data: SSEProgressEventData.parse(JSON.parse(event.data))
        };
      case "console":
        return {
          type: "console",
          data: SSEConsoleEventData.parse(JSON.parse(event.data))
        };
      case "start":
        return {
          type: "start",
          data: ""
        };
      case "done":
        return {
          type: "done",
          data: ""
        };
      default: {
        const _event = event;
        throw new Error(`Unknown event type ${JSON.stringify(_event)}`);
      }
    }
  }
  static serializeRawEvent(event) {
    switch (event.type) {
      case "text_delta":
        return {
          event: "text_delta",
          data: JSON.stringify(event.data)
        };
      case "reasoning_delta":
        return {
          event: "reasoning_delta",
          data: JSON.stringify(event.data)
        };
      case "json_delta":
        return {
          event: "json_delta",
          data: event.data
        };
      case "error":
        return {
          event: "error",
          data: JSON.stringify(event.data)
        };
      case "progress":
        return {
          event: "progress",
          data: JSON.stringify(event.data)
        };
      case "console":
        return {
          event: "console",
          data: JSON.stringify(event.data)
        };
      case "start":
        return {
          event: "start",
          data: ""
        };
      case "done":
        return {
          event: "done",
          data: ""
        };
      default: {
        const _event = event;
        throw new Error(`Unknown event type ${JSON.stringify(_event)}`);
      }
    }
  }
};
function btStreamParser() {
  const decoder = new TextDecoder();
  let parser;
  return new TransformStream({
    async start(controller) {
      parser = createParser((event) => {
        if (event.type === "reconnect-interval") {
          return;
        }
        const parsed = CallEvent.safeParse(event);
        if (!parsed.success) {
          throw new Error(`Failed to parse event: ${parsed.error}`);
        }
        controller.enqueue(BraintrustStream.parseRawEvent(parsed.data));
      });
    },
    async transform(chunk, controller) {
      if (chunk instanceof Uint8Array) {
        parser.feed(decoder.decode(chunk, { stream: true }));
      } else if (typeof chunk === "string") {
        parser.feed(chunk);
      } else {
        controller.enqueue(chunk);
      }
    },
    async flush(controller) {
      const tail = decoder.decode();
      if (tail) {
        parser.feed(tail);
      }
      controller.terminate();
    }
  });
}
function createFinalValuePassThroughStream(onFinal, onError) {
  const decoder = new TextDecoder();
  const textChunks = [];
  const jsonChunks = [];
  const reasoningChunks = [];
  const transformStream = new TransformStream({
    transform(chunk, controller) {
      if (typeof chunk === "string") {
        textChunks.push(chunk);
        controller.enqueue({
          type: "text_delta",
          data: chunk
        });
      } else if (chunk instanceof Uint8Array) {
        textChunks.push(decoder.decode(chunk));
        controller.enqueue({
          type: "text_delta",
          data: decoder.decode(chunk)
        });
      } else if (braintrustStreamChunkSchema.safeParse(chunk).success) {
        const chunkType = chunk.type;
        switch (chunkType) {
          case "text_delta":
            textChunks.push(chunk.data);
            break;
          case "json_delta":
            jsonChunks.push(chunk.data);
            break;
          case "reasoning_delta":
            reasoningChunks.push(chunk.data);
            break;
          case "error":
            onError(chunk.data);
            break;
          case "progress":
          case "start":
          case "done":
          case "console":
            break;
          default:
            const _type = chunkType;
            onError(`Unknown chunk type: ${_type}`);
        }
        controller.enqueue(chunk);
      } else {
        onError(`Unknown chunk type ${JSON.stringify(chunk)}`);
      }
    },
    flush(controller) {
      if (jsonChunks.length > 0) {
        onFinal(JSON.parse(jsonChunks.join("")));
      } else if (textChunks.length > 0) {
        onFinal(textChunks.join(""));
      } else if (reasoningChunks.length > 0) {
        onFinal(reasoningChunks.join(""));
      } else {
        onFinal(void 0);
      }
      controller.terminate();
    }
  });
  return transformStream;
}
function devNullWritableStream() {
  return new WritableStream({
    write(chunk) {
    },
    close() {
    },
    abort(reason) {
    },
    start(controller) {
    }
  });
}

// src/prompt-cache/disk-cache.ts
function canUseDiskCache() {
  return !!(isomorph_default.hash && isomorph_default.gunzip && isomorph_default.gzip && isomorph_default.stat && isomorph_default.readFile && isomorph_default.writeFile && isomorph_default.utimes && isomorph_default.readdir && isomorph_default.mkdir && isomorph_default.unlink && isomorph_default.homedir);
}
var DiskCache = class {
  dir;
  max;
  mkdir;
  logWarnings;
  /**
   * Creates a new DiskCache instance.
   * @param options - Configuration options for the cache.
   */
  constructor(options) {
    if (!canUseDiskCache()) {
      throw new Error("Disk cache is not supported on this platform");
    }
    this.dir = options.cacheDir;
    this.max = options.max;
    this.logWarnings = options.logWarnings ?? true;
    this.mkdir = options.mkdir ?? true;
  }
  getEntryPath(key) {
    const hashed = isomorph_default.hash(key);
    return isomorph_default.pathJoin(this.dir, hashed);
  }
  /**
   * Retrieves a value from the cache.
   * Updates the entry's access time when read.
   *
   * @param key - The key to look up in the cache.
   * @returns The cached value if found, undefined otherwise.
   */
  async get(key) {
    try {
      const filePath = this.getEntryPath(key);
      const data = await isomorph_default.gunzip(await isomorph_default.readFile(filePath));
      await isomorph_default.utimes(filePath, /* @__PURE__ */ new Date(), /* @__PURE__ */ new Date());
      return JSON.parse(data.toString());
    } catch (e) {
      if (e.code === "ENOENT") {
        return void 0;
      }
      if (this.logWarnings) {
        console.warn("Failed to read from disk cache", e);
      }
      return void 0;
    }
  }
  /**
   * Stores a value in the cache.
   * If the cache is at its maximum size, the least recently used entries will be evicted.
   *
   * @param key - The key to store the value under.
   * @param value - The value to store in the cache.
   */
  async set(key, value) {
    try {
      if (this.mkdir) {
        await isomorph_default.mkdir(this.dir, { recursive: true });
      }
      const filePath = this.getEntryPath(key);
      const data = await isomorph_default.gzip(JSON.stringify(value));
      await isomorph_default.writeFile(filePath, data);
      await this.evictOldestIfFull();
    } catch (e) {
      if (this.logWarnings) {
        console.warn("Failed to write to disk cache", e);
      }
      return;
    }
  }
  async evictOldestIfFull() {
    if (!this.max) {
      return;
    }
    const files = await isomorph_default.readdir(this.dir);
    const paths = files.map((file) => isomorph_default.pathJoin(this.dir, file));
    if (paths.length <= this.max) {
      return;
    }
    const stats = await Promise.all(
      paths.map(async (path) => {
        const stat = await isomorph_default.stat(path);
        return {
          path,
          mtime: stat.mtime.getTime()
        };
      })
    );
    stats.sort((a, b) => a.mtime - b.mtime);
    const toRemove = stats.slice(0, stats.length - this.max);
    await Promise.all(toRemove.map((stat) => isomorph_default.unlink(stat.path)));
  }
};

// src/lru-cache.ts
var LRUCache = class {
  cache;
  maxSize;
  constructor(options = {}) {
    this.cache = /* @__PURE__ */ new Map();
    this.maxSize = options.max;
  }
  /**
   * Retrieves a value from the cache.
   * If the key exists, the item is marked as most recently used.
   *
   * @param key - The key to look up.
   * @returns The cached value if found, undefined otherwise.
   */
  get(key) {
    const entry = this.cache.get(key);
    if (entry === void 0) {
      return void 0;
    }
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.value;
  }
  /**
   * Checks whether a key exists and marks it as most recently used.
   */
  has(key) {
    if (!this.cache.has(key)) {
      return false;
    }
    this.get(key);
    return true;
  }
  /**
   * Stores a value in the cache.
   * If the key already exists, the value is updated and marked as most recently used.
   * If the cache is at its maximum size, the least recently used item is evicted.
   *
   * @param key - The key to store.
   * @param value - The value to store.
   */
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.maxSize && this.cache.size >= this.maxSize) {
      const first = this.cache.keys().next().value;
      this.cache.delete(first);
    }
    this.cache.set(key, { value });
  }
  /**
   * Removes an item from the cache.
   */
  delete(key) {
    return this.cache.delete(key);
  }
  /**
   * Iterates over cache entries from least to most recently used.
   */
  *entries() {
    for (const [key, entry] of this.cache) {
      yield [key, entry.value];
    }
  }
  /**
   * Iterates over cache keys from least to most recently used.
   */
  keys() {
    return this.cache.keys();
  }
  /**
   * Iterates over cache values from least to most recently used.
   */
  *values() {
    for (const entry of this.cache.values()) {
      yield entry.value;
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Removes all items from the cache.
   */
  clear() {
    this.cache.clear();
  }
};

// src/prompt-cache/cache-config.ts
var CACHE_LOCATION_ENV_VAR = "BRAINTRUST_CACHE_LOCATION";
var DEFAULT_CACHE_MEMORY_MAX = 1 << 10;
var DEFAULT_CACHE_DISK_MAX = 1 << 20;
var warnedInvalidCacheModeEnvValue = false;
var warnedUnavailableDiskCacheMode = false;
function warnInvalidCacheMode(value) {
  if (warnedInvalidCacheModeEnvValue) {
    return;
  }
  warnedInvalidCacheModeEnvValue = true;
  debugLogger.warn(
    `Invalid ${CACHE_LOCATION_ENV_VAR} value "${value}". Expected "mixed", "memory", "disk", or "none". Falling back to "mixed".`
  );
}
function warnUnavailableDiskCache() {
  if (warnedUnavailableDiskCacheMode) {
    return;
  }
  warnedUnavailableDiskCacheMode = true;
  debugLogger.warn(
    `Disk cache is not supported on this platform, so ${CACHE_LOCATION_ENV_VAR}="disk" disables prompt and parameters caching.`
  );
}
function parseCacheMode() {
  const value = isomorph_default.getEnv(CACHE_LOCATION_ENV_VAR);
  const normalized = value?.trim().toLowerCase();
  if (!normalized) {
    return "mixed";
  }
  if (normalized === "mixed" || normalized === "memory" || normalized === "disk" || normalized === "none") {
    return normalized;
  }
  warnInvalidCacheMode(value ?? "");
  return "mixed";
}
function parsePositiveIntegerEnv(envVar, defaultValue) {
  const value = Number(isomorph_default.getEnv(envVar));
  return Number.isInteger(value) && value > 0 ? value : defaultValue;
}
function createCacheLayers({
  memoryMaxEnvVar,
  diskCacheDirEnvVar,
  diskMaxEnvVar,
  getDefaultDiskCacheDir
}) {
  const mode = parseCacheMode();
  const memoryCache = mode === "mixed" || mode === "memory" ? new LRUCache({
    max: parsePositiveIntegerEnv(
      memoryMaxEnvVar,
      DEFAULT_CACHE_MEMORY_MAX
    )
  }) : void 0;
  let diskCache;
  if (mode === "mixed" || mode === "disk") {
    if (canUseDiskCache()) {
      diskCache = new DiskCache({
        cacheDir: isomorph_default.getEnv(diskCacheDirEnvVar) ?? getDefaultDiskCacheDir(),
        max: parsePositiveIntegerEnv(diskMaxEnvVar, DEFAULT_CACHE_DISK_MAX)
      });
    } else if (mode === "disk") {
      warnUnavailableDiskCache();
    }
  }
  if (diskCache) {
    return { memoryCache, diskCache };
  }
  return { memoryCache };
}

// src/prompt-cache/prompt-cache.ts
function createCacheKey(key) {
  if (key.id) {
    return `id:${key.id}`;
  }
  const prefix = key.projectId ?? key.projectName;
  if (!prefix) {
    throw new Error("Either projectId or projectName must be provided");
  }
  if (!key.slug) {
    throw new Error("Slug must be provided when not using ID");
  }
  return `${prefix}:${key.slug}:${key.version ?? "latest"}`;
}
var PromptCache = class {
  memoryCache;
  diskCache;
  constructor(options) {
    this.memoryCache = options.memoryCache;
    this.diskCache = options.diskCache;
  }
  /**
   * Retrieves a prompt from the cache.
   * First checks the in-memory LRU cache, then falls back to checking the disk cache if available.
   */
  async get(key) {
    const cacheKey = createCacheKey(key);
    if (this.memoryCache) {
      const memoryPrompt = this.memoryCache.get(cacheKey);
      if (memoryPrompt !== void 0) {
        return memoryPrompt;
      }
    }
    if (this.diskCache) {
      const diskPrompt = await this.diskCache.get(cacheKey);
      if (!diskPrompt) {
        return void 0;
      }
      this.memoryCache?.set(cacheKey, diskPrompt);
      return diskPrompt;
    }
    return void 0;
  }
  /**
   * Stores a prompt in the cache.
   * Writes to the in-memory cache and the disk cache if available.
   *
   * @param key - The key to store the value under.
   * @param value - The value to store in the cache.
   * @throws If there is an error writing to the disk cache.
   */
  async set(key, value) {
    const cacheKey = createCacheKey(key);
    this.memoryCache?.set(cacheKey, value);
    if (this.diskCache) {
      await this.diskCache.set(cacheKey, value);
    }
  }
};

// src/prompt-cache/parameters-cache.ts
function createCacheKey2(key) {
  if (key.id) {
    return `parameters:id:${key.id}`;
  }
  const prefix = key.projectId ?? key.projectName;
  if (!prefix) {
    throw new Error("Either projectId or projectName must be provided");
  }
  if (!key.slug) {
    throw new Error("Slug must be provided when not using ID");
  }
  return `parameters:${prefix}:${key.slug}:${key.version ?? "latest"}`;
}
var ParametersCache = class {
  memoryCache;
  diskCache;
  constructor(options) {
    this.memoryCache = options.memoryCache;
    this.diskCache = options.diskCache;
  }
  async get(key) {
    const cacheKey = createCacheKey2(key);
    if (this.memoryCache) {
      const memoryParams = this.memoryCache.get(cacheKey);
      if (memoryParams !== void 0) {
        return memoryParams;
      }
    }
    if (this.diskCache) {
      const diskParams = await this.diskCache.get(cacheKey);
      if (!diskParams) {
        return void 0;
      }
      this.memoryCache?.set(cacheKey, diskParams);
      return diskParams;
    }
    return void 0;
  }
  async set(key, value) {
    const cacheKey = createCacheKey2(key);
    this.memoryCache?.set(cacheKey, value);
    if (this.diskCache) {
      await this.diskCache.set(cacheKey, value);
    }
  }
};

// src/span-cache.ts
var activeCaches = /* @__PURE__ */ new Set();
var exitHandlersRegistered = false;
function canUseSpanCache() {
  return !!(isomorph_default.pathJoin && isomorph_default.tmpdir && isomorph_default.writeFileSync && isomorph_default.appendFileSync && isomorph_default.readFileSync && isomorph_default.unlinkSync && isomorph_default.openFile);
}
var SpanCache = class {
  cacheFilePath = null;
  fileHandle = null;
  // type-erased fs.promises.FileHandle
  initialized = false;
  initPromise = null;
  // Tracks whether the cache was explicitly disabled (via constructor or disable())
  _explicitlyDisabled;
  // Tracks whether the cache has been enabled (for evals only)
  _enabled = false;
  // Reference count of active evals using this cache
  _activeEvalCount = 0;
  // Small in-memory index tracking which rootSpanIds have data
  rootSpanIndex = /* @__PURE__ */ new Set();
  constructor(options) {
    this._explicitlyDisabled = options?.disabled ?? false;
  }
  /**
   * Disable the cache at runtime. This is called automatically when
   * initFunction is used, since remote function spans won't be in the cache.
   */
  disable() {
    this._explicitlyDisabled = true;
  }
  /**
   * Start caching spans for use during evaluations.
   * This only starts caching if the cache wasn't permanently disabled.
   * Called by Eval() to turn on caching for the duration of the eval.
   * Uses reference counting to support parallel evals.
   */
  start() {
    if (!this._explicitlyDisabled) {
      this._enabled = true;
      this._activeEvalCount++;
    }
  }
  /**
   * Stop caching spans and return to the default disabled state.
   * Unlike disable(), this allows start() to work again for future evals.
   * Called after an eval completes to return to the default state.
   * Uses reference counting - only disables when all evals are complete.
   */
  stop() {
    this._activeEvalCount--;
    if (this._activeEvalCount <= 0) {
      this._activeEvalCount = 0;
      this._enabled = false;
    }
  }
  get disabled() {
    return this._explicitlyDisabled || !this._enabled || !canUseSpanCache();
  }
  async ensureInitialized() {
    if (this.disabled) {
      return;
    }
    if (this.initialized) {
      return;
    }
    if (this.initPromise) {
      return this.initPromise;
    }
    this.initPromise = (async () => {
      if (!isomorph_default.tmpdir || !isomorph_default.pathJoin || !isomorph_default.openFile) {
        return;
      }
      const tmpDir = isomorph_default.tmpdir();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      this.cacheFilePath = isomorph_default.pathJoin(
        tmpDir,
        `braintrust-span-cache-${uniqueId}.jsonl`
      );
      this.fileHandle = await isomorph_default.openFile(this.cacheFilePath, "a+");
      this.initialized = true;
      this.registerExitHandler();
    })();
    return this.initPromise;
  }
  /**
   * Register a handler to clean up the temp file on process exit.
   * Uses a global registry to avoid registering multiple handlers.
   */
  registerExitHandler() {
    activeCaches.add(this);
    if (typeof process !== "undefined" && process.on && !exitHandlersRegistered) {
      exitHandlersRegistered = true;
      const cleanupAllCaches = () => {
        for (const cache of activeCaches) {
          if (cache.fileHandle) {
            try {
              cache.fileHandle.close().catch(() => {
              });
              cache.fileHandle = null;
            } catch {
            }
          }
          if (cache.cacheFilePath && canUseSpanCache() && isomorph_default.unlinkSync) {
            try {
              isomorph_default.unlinkSync(cache.cacheFilePath);
            } catch {
            }
          }
        }
      };
      process.on("exit", cleanupAllCaches);
      process.on("SIGINT", cleanupAllCaches);
      process.on("SIGTERM", cleanupAllCaches);
      process.on("beforeExit", cleanupAllCaches);
    }
  }
  // Buffer for pending writes - flushed asynchronously
  writeBuffer = [];
  flushScheduled = false;
  flushPromise = null;
  /**
   * Queue a span write for async flushing.
   * This is non-blocking - writes are buffered in memory and flushed
   * to disk on the next microtask.
   */
  queueWrite(rootSpanId, spanId, data) {
    if (this.disabled) {
      return;
    }
    const record = { rootSpanId, spanId, data };
    this.writeBuffer.push(record);
    this.rootSpanIndex.add(rootSpanId);
    if (!this.flushScheduled) {
      this.flushScheduled = true;
      this.flushPromise = this.flushWriteBuffer();
    }
  }
  /**
   * Flush the write buffer to disk asynchronously.
   * Called automatically after queueWrite, but can also be called explicitly.
   */
  async flushWriteBuffer() {
    const recordsToFlush = [...this.writeBuffer];
    this.flushScheduled = false;
    if (recordsToFlush.length === 0) {
      return;
    }
    await this.ensureInitialized();
    if (!this.fileHandle) {
      return;
    }
    const lines = recordsToFlush.map((r) => JSON.stringify(r) + "\n").join("");
    await this.fileHandle.appendFile(lines, "utf8");
    this.writeBuffer = this.writeBuffer.filter(
      (r) => !recordsToFlush.includes(r)
    );
  }
  /**
   * Wait for any pending writes to complete.
   * Call this before reading from the cache to ensure consistency.
   */
  async waitForPendingWrites() {
    if (this.flushPromise) {
      await this.flushPromise;
      this.flushPromise = null;
    }
  }
  /**
   * Get all cached spans for a given rootSpanId.
   *
   * This reads the file and merges all records for the given rootSpanId.
   *
   * @param rootSpanId The root span ID to look up
   * @returns Array of cached spans, or undefined if not in cache
   */
  getByRootSpanId(rootSpanId) {
    if (this.disabled) {
      return void 0;
    }
    if (!this.rootSpanIndex.has(rootSpanId)) {
      return void 0;
    }
    const spanMap = /* @__PURE__ */ new Map();
    if (this.initialized && this.cacheFilePath && isomorph_default.readFileSync) {
      try {
        const content = isomorph_default.readFileSync(this.cacheFilePath, "utf8");
        const lines = content.trim().split("\n").filter(Boolean);
        for (const line of lines) {
          try {
            const record = JSON.parse(line);
            if (record.rootSpanId !== rootSpanId) {
              continue;
            }
            const existing = spanMap.get(record.spanId);
            if (existing) {
              mergeDicts(
                existing,
                record.data
              );
            } else {
              spanMap.set(record.spanId, record.data);
            }
          } catch {
          }
        }
      } catch {
      }
    }
    for (const record of this.writeBuffer) {
      if (record.rootSpanId !== rootSpanId) {
        continue;
      }
      const existing = spanMap.get(record.spanId);
      if (existing) {
        mergeDicts(
          existing,
          record.data
        );
      } else {
        spanMap.set(record.spanId, record.data);
      }
    }
    if (spanMap.size === 0) {
      return void 0;
    }
    return Array.from(spanMap.values());
  }
  /**
   * Check if a rootSpanId has cached data.
   */
  has(rootSpanId) {
    if (this.disabled) {
      return false;
    }
    return this.rootSpanIndex.has(rootSpanId);
  }
  /**
   * Clear all cached spans for a given rootSpanId.
   * Note: This only removes from the index. The data remains in the file
   * but will be ignored on reads.
   */
  clear(rootSpanId) {
    this.rootSpanIndex.delete(rootSpanId);
  }
  /**
   * Clear all cached data and remove the cache file.
   */
  clearAll() {
    this.rootSpanIndex.clear();
    this.dispose();
  }
  /**
   * Get the number of root spans currently tracked.
   */
  get size() {
    return this.rootSpanIndex.size;
  }
  /**
   * Clean up the cache file. Call this when the eval is complete.
   * Only performs cleanup when all active evals have completed (refcount = 0).
   */
  dispose() {
    if (this._activeEvalCount > 0) {
      return;
    }
    activeCaches.delete(this);
    this.writeBuffer = [];
    this.flushScheduled = false;
    this.flushPromise = null;
    if (this.fileHandle) {
      this.fileHandle.close().catch(() => {
      });
      this.fileHandle = null;
    }
    if (this.cacheFilePath && canUseSpanCache() && isomorph_default.unlinkSync) {
      try {
        isomorph_default.unlinkSync(this.cacheFilePath);
      } catch {
      }
      this.cacheFilePath = null;
    }
    this.initialized = false;
    this.initPromise = null;
    this.rootSpanIndex.clear();
  }
};

// src/span-origin.ts
var INSTRUMENTATION_NAMES = {
  AI_SDK: "ai-sdk",
  ANTHROPIC: "anthropic",
  BEDROCK_RUNTIME: "bedrock-runtime",
  BRAINTRUST_JS_LOGGER: "braintrust-js-logger",
  CLAUDE_AGENT_SDK: "claude-agent-sdk",
  CLOUDFLARE_AI_CHAT: "cloudflare-ai-chat",
  CLOUDFLARE_AGENTS: "cloudflare-agents",
  CLOUDFLARE_THINK: "cloudflare-think",
  COHERE: "cohere",
  CURSOR_SDK: "cursor-sdk",
  EVE: "eve",
  FLUE: "flue",
  GENKIT: "genkit",
  GITHUB_COPILOT: "github-copilot",
  GOOGLE_ADK: "google-adk",
  GOOGLE_GENAI: "google-genai",
  GROQ: "groq",
  HUGGINGFACE: "huggingface",
  LANGCHAIN: "langchain",
  LANGSMITH: "langsmith",
  MASTRA: "mastra",
  MISTRAL: "mistral",
  OLLAMA: "ollama",
  OPENAI: "openai",
  OPENAI_AGENTS: "openai-agents",
  OPENAI_CODEX: "openai-codex",
  OPENROUTER: "openrouter",
  OPENROUTER_AGENT: "openrouter-agent",
  PI_CODING_AGENT: "pi-coding-agent",
  STRANDS_AGENT_SDK: "strands-agent-sdk"
};
var INTERNAL_SPAN_INSTRUMENTATION_NAME = /* @__PURE__ */ Symbol.for(
  "braintrust.spanInstrumentationName"
);
var SDK_VERSION = true ? "3.27.0" : "0.0.0";
function withSpanInstrumentationName(args, instrumentationName) {
  return {
    ...args,
    [INTERNAL_SPAN_INSTRUMENTATION_NAME]: instrumentationName
  };
}
function getSpanInstrumentationName(args) {
  if (typeof args !== "object" || args === null) {
    return void 0;
  }
  const value = args[INTERNAL_SPAN_INSTRUMENTATION_NAME];
  return isSpanInstrumentationName(value) ? value : void 0;
}
function detectSpanOriginEnvironment(explicit) {
  if (explicit) return explicit;
  const envType = isomorph_default.getEnv("BRAINTRUST_ENVIRONMENT_TYPE");
  const envName = isomorph_default.getEnv("BRAINTRUST_ENVIRONMENT_NAME");
  if (envType || envName) {
    return {
      ...envType ? { type: envType } : {},
      ...envName ? { name: envName } : {}
    };
  }
  const ci = firstPresent([
    ["GITHUB_ACTIONS", "github_actions"],
    ["GITLAB_CI", "gitlab_ci"],
    ["CIRCLECI", "circleci"],
    ["BUILDKITE", "buildkite"],
    ["JENKINS_URL", "jenkins"],
    ["JENKINS_HOME", "jenkins"],
    ["TF_BUILD", "azure_pipelines"],
    ["TEAMCITY_VERSION", "teamcity"],
    ["TRAVIS", "travis"],
    ["BITBUCKET_BUILD_NUMBER", "bitbucket"]
  ]);
  if (ci) return { type: "ci", name: ci };
  if (isomorph_default.getEnv("CI")) return { type: "ci", name: "ci" };
  const earlyServer = firstPresent([
    ["VERCEL", "vercel"],
    ["NETLIFY", "netlify"]
  ]);
  if (earlyServer) return { type: "server", name: earlyServer };
  if (isomorph_default.getEnv("ECS_CONTAINER_METADATA_URI") || isomorph_default.getEnv("ECS_CONTAINER_METADATA_URI_V4")) {
    return { type: "server", name: "ecs" };
  }
  const awsExecutionEnv = isomorph_default.getEnv("AWS_EXECUTION_ENV");
  if (awsExecutionEnv?.startsWith("AWS_ECS_")) {
    return { type: "server", name: "ecs" };
  }
  if (awsExecutionEnv?.startsWith("AWS_Lambda_")) {
    return { type: "server", name: "aws_lambda" };
  }
  if (isomorph_default.getEnv("AWS_LAMBDA_FUNCTION_NAME")) {
    return { type: "server", name: "aws_lambda" };
  }
  const server = firstPresent([
    ["K_SERVICE", "cloud_run"],
    ["FUNCTION_TARGET", "gcp_functions"],
    ["KUBERNETES_SERVICE_HOST", "kubernetes"],
    ["DYNO", "heroku"],
    ["FLY_APP_NAME", "fly"],
    ["RAILWAY_ENVIRONMENT", "railway"],
    ["RENDER_SERVICE_NAME", "render"]
  ]);
  if (server) return { type: "server", name: server };
  return deploymentModeEnvironment("NODE_ENV", isomorph_default.getEnv("NODE_ENV"));
}
function makeSpanOrigin(instrumentationName, environment) {
  return {
    name: "braintrust.sdk.javascript",
    version: SDK_VERSION,
    instrumentation: { name: instrumentationName },
    ...environment ? { environment } : {}
  };
}
function mergeSpanOriginContext(context, instrumentationName, environment) {
  const next = { ...context ?? {} };
  const current = isObject2(next.span_origin) ? { ...next.span_origin } : {};
  next.span_origin = {
    ...makeSpanOrigin(instrumentationName, environment),
    ...current
  };
  return next;
}
function isSpanInstrumentationName(value) {
  return Object.values(INSTRUMENTATION_NAMES).some((name) => name === value);
}
function firstPresent(entries) {
  return entries.find(([key]) => Boolean(isomorph_default.getEnv(key)))?.[1];
}
function deploymentModeEnvironment(_key, value) {
  if (!value) return void 0;
  const normalized = value.toLowerCase();
  if (normalized === "production" || normalized === "staging") {
    return { type: "server", name: normalized };
  }
  if (normalized === "development" || normalized === "local") {
    return { type: "local", name: normalized };
  }
  return { name: value };
}
function isObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// src/logger.ts
var BRAINTRUST_ATTACHMENT = BraintrustAttachmentReference.shape.type.value;
var EXTERNAL_ATTACHMENT = ExternalAttachmentReference.shape.type.value;
var LOGS3_OVERFLOW_REFERENCE_TYPE = "logs3_overflow";
var BRAINTRUST_PARAMS = Object.keys(BraintrustModelParams.shape);
var RESET_CONTEXT_MANAGER_STATE = /* @__PURE__ */ Symbol.for(
  "braintrust.resetContextManagerState"
);
var DEFAULT_MAX_REQUEST_SIZE = 6 * 1024 * 1024;
var datasetSnapshotRegisterResponseSchema = z8.object({
  dataset_snapshot: DatasetSnapshot,
  found_existing: z8.boolean().optional()
});
var datasetRestorePreviewResultSchema = z8.object({
  rows_to_restore: z8.number(),
  rows_to_delete: z8.number()
});
var datasetRestoreResultSchema = z8.object({
  xact_id: z8.string().nullable(),
  rows_restored: z8.number(),
  rows_deleted: z8.number()
});
var parametersRowSchema = z8.object({
  id: z8.string().uuid(),
  _xact_id: z8.string(),
  project_id: z8.string().uuid(),
  name: z8.string(),
  slug: z8.string(),
  description: z8.union([z8.string(), z8.null()]).optional(),
  function_type: z8.literal("parameters"),
  function_data: z8.object({
    type: z8.literal("parameters"),
    data: z8.record(z8.unknown()).optional(),
    __schema: z8.record(z8.unknown())
  }),
  metadata: z8.union([z8.object({}).partial().passthrough(), z8.null()]).optional()
});
var InlineAttachmentReferenceSchema = z8.object({
  type: z8.literal("inline_attachment"),
  src: z8.string().min(1),
  content_type: z8.string().optional(),
  filename: z8.string().optional()
});
var LoginInvalidOrgError = class extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
  message;
};
var REDACTION_FIELDS = [
  "input",
  "output",
  "expected",
  "metadata",
  "context",
  "scores",
  "metrics"
];
var MaskingError = class {
  constructor(fieldName, errorType) {
    this.fieldName = fieldName;
    this.errorType = errorType;
  }
  fieldName;
  errorType;
  get errorMsg() {
    return `ERROR: Failed to mask field '${this.fieldName}' - ${this.errorType}`;
  }
};
function applyMaskingToField(maskingFunction, data, fieldName) {
  try {
    return maskingFunction(data);
  } catch (error) {
    const errorType = error instanceof Error ? error.constructor.name : "Error";
    if (fieldName === "scores" || fieldName === "metrics") {
      return new MaskingError(fieldName, errorType);
    }
    if (fieldName === "metadata") {
      return {
        error: `ERROR: Failed to mask field '${fieldName}' - ${errorType}`
      };
    }
    return `ERROR: Failed to mask field '${fieldName}' - ${errorType}`;
  }
}
var INITIAL_SPAN_WRITE_AS_MERGE = /* @__PURE__ */ Symbol(
  "braintrust.initial-span-write-as-merge"
);
var INTERNAL_SPAN_CONTEXT = /* @__PURE__ */ Symbol("braintrust.internal-span-context");
var BRAINTRUST_CURRENT_SPAN_STORE = /* @__PURE__ */ Symbol.for(
  "braintrust.currentSpanStore"
);
var ContextManager = class {
  /**
   * Returns the value to store in the ALS bound to a global hook's start event.
   * In default mode this is the Span itself; in OTEL mode it is the OTEL Context
   * containing the span so that OTEL's own ALS stores a proper Context object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  wrapSpanForStore(span) {
    return span;
  }
};
var BraintrustContextManager = class extends ContextManager {
  _currentSpan;
  [BRAINTRUST_CURRENT_SPAN_STORE];
  constructor() {
    super();
    this._currentSpan = isomorph_default.newAsyncLocalStorage();
    this[BRAINTRUST_CURRENT_SPAN_STORE] = this._currentSpan;
  }
  getParentSpanIds() {
    const currentSpan2 = this._currentSpan.getStore();
    if (!currentSpan2) {
      return void 0;
    }
    return {
      rootSpanId: currentSpan2.rootSpanId,
      spanParents: [currentSpan2.spanId]
    };
  }
  runInContext(span, callback) {
    return this._currentSpan.run(span, callback);
  }
  getCurrentSpan() {
    return this._currentSpan.getStore();
  }
};
function getSpanComponentsClass() {
  if (globalThis.BRAINTRUST_SPAN_COMPONENT) {
    return globalThis.BRAINTRUST_SPAN_COMPONENT;
  }
  return resolveUseLegacyUuidIds() ? SpanComponentsV3 : SpanComponentsV4;
}
function getContextManager() {
  return globalThis.BRAINTRUST_CONTEXT_MANAGER ? new globalThis.BRAINTRUST_CONTEXT_MANAGER() : new BraintrustContextManager();
}
var NoopSpan = class {
  id;
  spanId;
  rootSpanId;
  spanParents;
  kind = "span";
  constructor() {
    this.id = "";
    this.spanId = "";
    this.rootSpanId = "";
    this.spanParents = [];
  }
  log(_) {
  }
  logFeedback(_event) {
  }
  traced(callback, _1) {
    return callback(this);
  }
  getParentInfo() {
    return void 0;
  }
  startSpan(_1) {
    return this;
  }
  end(args) {
    return args?.endTime ?? getCurrentUnixTimestamp();
  }
  async export() {
    return "";
  }
  inject(carrier) {
    return carrier ?? {};
  }
  async permalink() {
    return NOOP_SPAN_PERMALINK;
  }
  link() {
    return NOOP_SPAN_PERMALINK;
  }
  async flush() {
  }
  close(args) {
    return this.end(args);
  }
  setAttributes(_args) {
  }
  startSpanWithParents(_spanId, _spanParents, _args) {
    return this;
  }
  state() {
    return _internalGetGlobalState();
  }
  // Custom inspect for Node.js console.log
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `NoopSpan {
  kind: '${this.kind}',
  id: '${this.id}',
  spanId: '${this.spanId}',
  rootSpanId: '${this.rootSpanId}',
  spanParents: ${JSON.stringify(this.spanParents)}
}`;
  }
  // Custom toString
  toString() {
    return `NoopSpan(id=${this.id}, spanId=${this.spanId})`;
  }
};
var NOOP_SPAN = new NoopSpan();
var NOOP_SPAN_PERMALINK = "https://braintrust.dev/noop-span";
var loginSchema = z8.strictObject({
  appUrl: z8.string(),
  appPublicUrl: z8.string(),
  orgName: z8.string(),
  apiUrl: z8.string(),
  proxyUrl: z8.string(),
  loginToken: z8.string(),
  orgId: z8.string().nullish(),
  gitMetadataSettings: GitMetadataSettings.nullish(),
  debugLogLevel: z8.enum(["error", "warn", "info", "debug"]).optional(),
  // Distinguishes explicit false from unset so env fallback stays disabled after deserialization.
  debugLogLevelDisabled: z8.boolean().optional()
});
var stateNonce = 0;
var V1_PROXY_SUFFIX = "/v1/proxy";
function normalizeProxyConnUrl(proxyUrl) {
  return proxyUrl.endsWith(V1_PROXY_SUFFIX) ? proxyUrl.slice(0, proxyUrl.length - V1_PROXY_SUFFIX.length) : proxyUrl;
}
var BraintrustState = class _BraintrustState {
  constructor(loginParams) {
    this.loginParams = loginParams;
    this.id = `${(/* @__PURE__ */ new Date()).toLocaleString()}-${stateNonce++}`;
    this.currentExperiment = void 0;
    this.currentLogger = void 0;
    this.currentParent = isomorph_default.newAsyncLocalStorage();
    this.currentSpan = isomorph_default.newAsyncLocalStorage();
    if (loginParams.fetch) {
      this.fetch = loginParams.fetch;
    }
    const defaultGetLogConn = async () => {
      await this.login({});
      return this.apiConn();
    };
    this._bgLogger = new SyncLazyValue(
      () => new HTTPBackgroundLogger(new LazyValue(defaultGetLogConn), loginParams)
    );
    if (loginParams.debugLogLevel !== void 0) {
      this.debugLogLevelConfigured = true;
      this.debugLogLevel = normalizeDebugLogLevelOption(
        loginParams.debugLogLevel
      );
      setGlobalDebugLogLevel(this.debugLogLevel ?? false);
    } else {
      this.debugLogLevel = getEnvDebugLogLevel();
      setGlobalDebugLogLevel(void 0);
    }
    this.resetLoginInfo();
    const { memoryCache, diskCache } = createCacheLayers({
      memoryMaxEnvVar: "BRAINTRUST_PROMPT_CACHE_MEMORY_MAX",
      diskCacheDirEnvVar: "BRAINTRUST_PROMPT_CACHE_DIR",
      diskMaxEnvVar: "BRAINTRUST_PROMPT_CACHE_DISK_MAX",
      getDefaultDiskCacheDir: () => `${isomorph_default.getEnv("HOME") ?? isomorph_default.homedir()}/.braintrust/prompt_cache`
    });
    this.promptCache = new PromptCache({ memoryCache, diskCache });
    const {
      memoryCache: parametersMemoryCache,
      diskCache: parametersDiskCache
    } = createCacheLayers({
      memoryMaxEnvVar: "BRAINTRUST_PARAMETERS_CACHE_MEMORY_MAX",
      diskCacheDirEnvVar: "BRAINTRUST_PARAMETERS_CACHE_DIR",
      diskMaxEnvVar: "BRAINTRUST_PARAMETERS_CACHE_DISK_MAX",
      getDefaultDiskCacheDir: () => `${isomorph_default.getEnv("HOME") ?? isomorph_default.homedir()}/.braintrust/parameters_cache`
    });
    this.parametersCache = new ParametersCache({
      memoryCache: parametersMemoryCache,
      diskCache: parametersDiskCache
    });
    this.spanCache = new SpanCache({ disabled: loginParams.disableSpanCache });
    this.spanOriginEnvironment = detectSpanOriginEnvironment();
    this._internalSetTraceContextSigningSecret(loginParams.apiKey);
  }
  loginParams;
  id;
  currentExperiment;
  // Note: the value of IsAsyncFlush doesn't really matter here, since we
  // (safely) dynamically cast it whenever retrieving the logger.
  currentLogger;
  currentParent;
  currentSpan;
  // Any time we re-log in, we directly update the apiConn inside the logger.
  // This is preferable to replacing the whole logger, which would create the
  // possibility of multiple loggers floating around, which may not log in a
  // deterministic order.
  _bgLogger;
  _overrideBgLogger = null;
  appUrl = null;
  appPublicUrl = null;
  loginToken = null;
  orgId = null;
  orgName = null;
  apiUrl = null;
  proxyUrl = null;
  loggedIn = false;
  gitMetadataSettings;
  debugLogLevel;
  debugLogLevelConfigured = false;
  fetch = globalThis.fetch;
  _appConn = null;
  _apiConn = null;
  _proxyConn = null;
  promptCache;
  parametersCache;
  spanCache;
  _idGenerator = null;
  _contextManager = null;
  _otelFlushCallback = null;
  spanOriginEnvironment;
  traceContextSigningSecret;
  /** @internal */
  _internalSetTraceContextSigningSecret(secret) {
    const normalizedSecret = secret?.trim();
    if (normalizedSecret) {
      this.traceContextSigningSecret = normalizedSecret;
    }
  }
  /** @internal */
  _internalGetTraceContextSigningSecret() {
    return (this.traceContextSigningSecret ?? this.loginToken ?? isomorph_default.getEnv("BRAINTRUST_API_KEY"))?.trim();
  }
  resetLoginInfo() {
    this.appUrl = null;
    this.appPublicUrl = null;
    this.loginToken = null;
    this.orgId = null;
    this.orgName = null;
    this.apiUrl = null;
    this.proxyUrl = null;
    this.loggedIn = false;
    this.gitMetadataSettings = void 0;
    this._appConn = null;
    this._apiConn = null;
    this._proxyConn = null;
  }
  resetIdGenState() {
    this._idGenerator = null;
  }
  [RESET_CONTEXT_MANAGER_STATE]() {
    this._contextManager = null;
  }
  get idGenerator() {
    if (this._idGenerator === null) {
      this._idGenerator = getIdGenerator();
    }
    return this._idGenerator;
  }
  get contextManager() {
    if (this._contextManager === null) {
      this._contextManager = getContextManager();
    }
    return this._contextManager;
  }
  /**
   * Register an OTEL flush callback. This is called by @braintrust/otel
   * when it initializes a BraintrustSpanProcessor/Exporter.
   */
  registerOtelFlush(callback) {
    this._otelFlushCallback = callback;
  }
  /**
   * Flush OTEL spans if a callback is registered.
   * Called during ensureSpansFlushed to ensure OTEL spans are visible in BTQL.
   */
  async flushOtel() {
    if (this._otelFlushCallback) {
      await this._otelFlushCallback();
    }
  }
  copyLoginInfo(other) {
    this.appUrl = other.appUrl;
    this.appPublicUrl = other.appPublicUrl;
    this.loginToken = other.loginToken;
    this.orgId = other.orgId;
    this.orgName = other.orgName;
    this.apiUrl = other.apiUrl;
    this.proxyUrl = other.proxyUrl;
    this.loggedIn = other.loggedIn;
    this.gitMetadataSettings = other.gitMetadataSettings;
    this.debugLogLevel = other.debugLogLevel;
    this.debugLogLevelConfigured = other.debugLogLevelConfigured;
    this.traceContextSigningSecret = other.traceContextSigningSecret;
    setGlobalDebugLogLevel(
      this.debugLogLevelConfigured ? this.debugLogLevel ?? false : void 0
    );
    this._appConn = other._appConn;
    this._apiConn = other._apiConn;
    this.loginReplaceApiConn(this.apiConn());
    this._proxyConn = other._proxyConn;
  }
  serialize() {
    if (!this.loggedIn) {
      throw new Error(
        "Cannot serialize BraintrustState without being logged in"
      );
    }
    if (!this.appUrl || !this.appPublicUrl || !this.apiUrl || !this.proxyUrl || !this.orgName || !this.loginToken || !this.loggedIn) {
      throw new Error(
        "Cannot serialize BraintrustState without all login attributes"
      );
    }
    return {
      appUrl: this.appUrl,
      appPublicUrl: this.appPublicUrl,
      loginToken: this.loginToken,
      orgId: this.orgId,
      orgName: this.orgName,
      apiUrl: this.apiUrl,
      proxyUrl: this.proxyUrl,
      gitMetadataSettings: this.gitMetadataSettings,
      ...this.debugLogLevel ? { debugLogLevel: this.debugLogLevel } : {},
      ...this.debugLogLevelConfigured && !this.debugLogLevel ? { debugLogLevelDisabled: true } : {}
    };
  }
  static deserialize(serialized, opts) {
    const serializedParsed = loginSchema.safeParse(serialized);
    if (!serializedParsed.success) {
      throw new Error(
        `Cannot deserialize BraintrustState: ${serializedParsed.error.message}`
      );
    }
    const state2 = new _BraintrustState({ ...opts });
    for (const key of Object.keys(loginSchema.shape)) {
      state2[key] = serializedParsed.data[key];
    }
    if (!state2.loginToken) {
      throw new Error(
        "Cannot deserialize BraintrustState without a login token"
      );
    }
    state2.apiConn().set_token(state2.loginToken);
    state2.apiConn().make_long_lived();
    state2.appConn().set_token(state2.loginToken);
    if (state2.proxyUrl) {
      state2.proxyConn().make_long_lived();
      state2.proxyConn().set_token(state2.loginToken);
    }
    state2.loggedIn = true;
    state2.debugLogLevelConfigured = "debugLogLevel" in serializedParsed.data || !!serializedParsed.data.debugLogLevelDisabled;
    setGlobalDebugLogLevel(
      state2.debugLogLevelConfigured ? state2.debugLogLevel ?? false : void 0
    );
    state2.loginReplaceApiConn(state2.apiConn());
    return state2;
  }
  setFetch(fetch2) {
    this.loginParams.fetch = fetch2;
    this.fetch = fetch2;
    this._apiConn?.setFetch(fetch2);
    this._appConn?.setFetch(fetch2);
  }
  setMaskingFunction(maskingFunction) {
    this.bgLogger().setMaskingFunction(maskingFunction);
  }
  setDebugLogLevel(option) {
    if (option === void 0) {
      return;
    }
    this.debugLogLevelConfigured = true;
    this.debugLogLevel = normalizeDebugLogLevelOption(option);
    setGlobalDebugLogLevel(this.debugLogLevel ?? false);
  }
  getDebugLogLevel() {
    return this.debugLogLevel;
  }
  hasDebugLogLevelOverride() {
    return this.debugLogLevelConfigured;
  }
  async login(loginParams) {
    this._internalSetTraceContextSigningSecret(loginParams.apiKey);
    this.setDebugLogLevel(loginParams.debugLogLevel);
    if (this.apiUrl && !loginParams.forceLogin) {
      return;
    }
    const newState = await loginToState({
      ...this.loginParams,
      ...Object.fromEntries(
        Object.entries(loginParams).filter(([k, v]) => !isEmpty2(v))
      )
    });
    this.copyLoginInfo(newState);
  }
  appConn() {
    if (!this._appConn) {
      if (!this.appUrl) {
        throw new Error("Must initialize appUrl before requesting appConn");
      }
      this._appConn = new HTTPConnection(this.appUrl, this.fetch);
    }
    return this._appConn;
  }
  apiConn() {
    if (!this._apiConn) {
      if (!this.apiUrl) {
        throw new Error("Must initialize apiUrl before requesting apiConn");
      }
      this._apiConn = new HTTPConnection(this.apiUrl, this.fetch);
    }
    return this._apiConn;
  }
  proxyConn() {
    if (!this.proxyUrl) {
      return this.apiConn();
    }
    if (!this._proxyConn) {
      if (!this.proxyUrl) {
        throw new Error("Must initialize proxyUrl before requesting proxyConn");
      }
      this._proxyConn = new HTTPConnection(
        normalizeProxyConnUrl(this.proxyUrl),
        this.fetch
      );
    }
    return this._proxyConn;
  }
  bgLogger() {
    if (this._overrideBgLogger) {
      return this._overrideBgLogger;
    }
    return this._bgLogger.get();
  }
  httpLogger() {
    return this._bgLogger.get();
  }
  setOverrideBgLogger(logger) {
    this._overrideBgLogger = logger;
  }
  // Should only be called by the login function.
  loginReplaceApiConn(apiConn) {
    this._bgLogger.get().internalReplaceApiConn(apiConn);
  }
  disable() {
    this._bgLogger.get().disable();
  }
  enforceQueueSizeLimit(enforce) {
    this._bgLogger.get().enforceQueueSizeLimit(enforce);
  }
  // Custom serialization to avoid logging sensitive data
  toJSON() {
    return {
      id: this.id,
      orgId: this.orgId,
      orgName: this.orgName,
      appUrl: this.appUrl,
      appPublicUrl: this.appPublicUrl,
      apiUrl: this.apiUrl,
      proxyUrl: this.proxyUrl,
      loggedIn: this.loggedIn
      // Explicitly exclude loginToken, _apiConn, _appConn, _proxyConn and other sensitive fields
    };
  }
  // Custom inspect for Node.js console.log
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `BraintrustState {
  id: '${this.id}',
  orgId: ${this.orgId ? `'${this.orgId}'` : "null"},
  orgName: ${this.orgName ? `'${this.orgName}'` : "null"},
  appUrl: ${this.appUrl ? `'${this.appUrl}'` : "null"},
  apiUrl: ${this.apiUrl ? `'${this.apiUrl}'` : "null"},
  proxyUrl: ${this.proxyUrl ? `'${this.proxyUrl}'` : "null"},
  loggedIn: ${this.loggedIn},
  loginToken: '[REDACTED]'
}`;
  }
  // Custom toString
  toString() {
    return `BraintrustState(id=${this.id}, org=${this.orgName || "none"}, loggedIn=${this.loggedIn})`;
  }
};
var _globalState;
function _internalSetInitialState() {
  if (_globalState) {
    return;
  }
  const sym = /* @__PURE__ */ Symbol.for("braintrust-state");
  let existing = globalThis[sym];
  if (!existing) {
    const state2 = new BraintrustState({});
    globalThis[sym] = state2;
    existing = state2;
  }
  _globalState = existing;
}
var _internalGetGlobalState = () => _globalState;
setDebugLogStateResolver(() => _internalGetGlobalState());
var FailedHTTPResponse = class extends Error {
  status;
  text;
  data;
  constructor(status, text, data) {
    super(`${status}: ${text} (${data})`);
    this.status = status;
    this.text = text;
    this.data = data;
  }
};
async function checkResponse(resp) {
  if (resp.ok) {
    return resp;
  } else {
    throw new FailedHTTPResponse(
      resp.status,
      resp.statusText,
      await resp.text()
    );
  }
}
var HTTPConnection = class _HTTPConnection {
  base_url;
  token;
  headers;
  fetch;
  constructor(base_url, fetch2) {
    this.base_url = base_url;
    this.token = null;
    this.headers = {};
    this._reset();
    this.fetch = fetch2;
  }
  setFetch(fetch2) {
    this.fetch = fetch2;
  }
  async ping() {
    try {
      const resp = await this.get("ping");
      return resp.status === 200;
    } catch {
      return false;
    }
  }
  make_long_lived() {
    this._reset();
  }
  static sanitize_token(token) {
    return token.trim();
  }
  set_token(token) {
    token = _HTTPConnection.sanitize_token(token);
    this.token = token;
    this._reset();
  }
  // As far as I can tell, you cannot set the retry/backoff factor here
  _reset() {
    this.headers = {};
    if (this.token) {
      this.headers["Authorization"] = `Bearer ${this.token}`;
    }
  }
  async get(path, params = void 0, config) {
    const { headers, ...rest } = config || {};
    const url = new URL(_urljoin(this.base_url, path));
    url.search = new URLSearchParams(
      params ? Object.entries(params).filter(([_, v]) => v !== void 0).flatMap(
        ([k, v]) => v !== void 0 ? typeof v === "string" ? [[k, v]] : v.map((x) => [k, x]) : []
      ) : []
    ).toString();
    const this_fetch = this.fetch;
    const this_headers = this.headers;
    return await checkResponse(
      // Using toString() here makes it work with isomorphic fetch
      await this_fetch(url.toString(), {
        headers: {
          Accept: "application/json",
          ...this_headers,
          ...headers
        },
        keepalive: true,
        ...rest
      })
    );
  }
  async post(path, params, config, retries = 0) {
    const { headers, ...rest } = config || {};
    const this_fetch = this.fetch;
    const this_base_url = this.base_url;
    const this_headers = this.headers;
    const tries = retries + 1;
    for (let i = 0; i < tries; i++) {
      try {
        return await checkResponse(
          await this_fetch(_urljoin(this_base_url, path), {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              ...this_headers,
              ...headers
            },
            body: typeof params === "string" ? params : params ? JSON.stringify(params) : void 0,
            keepalive: true,
            ...rest
          })
        );
      } catch (error) {
        if (config?.signal?.aborted) {
          throw getAbortReason(config.signal);
        }
        if (i === tries - 1 || !isRetryableHTTPError(error)) {
          throw error;
        }
        debugLogger.debug(
          `Retrying API request ${path} after ${formatHTTPError(error)}`
        );
        const sleepTimeMs = HTTP_RETRY_BASE_SLEEP_TIME_S * 1e3 * 2 ** i + Math.random() * HTTP_RETRY_JITTER_MS;
        debugLogger.info(
          `Sleeping for ${sleepTimeMs}ms before retrying API request`
        );
        await waitForRetry(sleepTimeMs, config?.signal);
      }
    }
    throw new Error("Unexpected retry state");
  }
  async get_json(object_type, args = void 0, retries = 0) {
    const tries = retries + 1;
    for (let i = 0; i < tries; i++) {
      try {
        const resp = await this.get(`${object_type}`, args);
        return await resp.json();
      } catch (e) {
        if (i < tries - 1) {
          debugLogger.debug(
            `Retrying API request ${object_type} ${JSON.stringify(args)} ${e.status} ${e.text}`
          );
          const sleepTimeS = HTTP_RETRY_BASE_SLEEP_TIME_S * 2 ** i;
          debugLogger.info(
            `Sleeping for ${sleepTimeS}s before retrying API request`
          );
          await new Promise(
            (resolve) => setTimeout(resolve, sleepTimeS * 1e3)
          );
          continue;
        }
        throw e;
      }
    }
  }
  async post_json(object_type, args = void 0) {
    const resp = await this.post(`${object_type}`, args, {
      headers: { "Content-Type": "application/json" }
    });
    return await resp.json();
  }
  // Custom inspect for Node.js console.log
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `HTTPConnection {
  base_url: '${this.base_url}',
  token: '[REDACTED]'
}`;
  }
  // Custom toString
  toString() {
    return `HTTPConnection(${this.base_url})`;
  }
};
var BaseAttachment = class {
  reference;
};
var Attachment = class extends BaseAttachment {
  /**
   * The object that replaces this `Attachment` at upload time.
   */
  reference;
  uploader;
  _data;
  state;
  // For debug logging only.
  dataDebugString;
  /**
   * Construct an attachment.
   *
   * @param param A parameter object with:
   *
   * `data`: A string representing the path of the file on disk, or a
   * `Blob`/`ArrayBuffer` with the file's contents. The caller is responsible
   * for ensuring the file/blob/buffer is not modified until upload is complete.
   *
   * `filename`: The desired name of the file in Braintrust after uploading.
   * This parameter is for visualization purposes only and has no effect on
   * attachment storage.
   *
   * `contentType`: The MIME type of the file.
   *
   * `state`: (Optional) For internal use.
   */
  constructor({ data, filename, contentType, state: state2 }) {
    super();
    this.reference = {
      type: BRAINTRUST_ATTACHMENT,
      filename,
      content_type: contentType,
      key: newId()
    };
    this.state = state2;
    this.dataDebugString = typeof data === "string" ? data : "<in-memory data>";
    this._data = this.initData(data);
    this.uploader = this.initUploader();
  }
  /**
   * On first access, (1) reads the attachment from disk if needed, (2)
   * authenticates with the data plane to request a signed URL, (3) uploads to
   * object store, and (4) updates the attachment.
   *
   * @returns The attachment status.
   */
  async upload() {
    return await this.uploader.get();
  }
  /**
   * The attachment contents. This is a lazy value that will read the attachment contents from disk or memory on first access.
   */
  async data() {
    return this._data.get();
  }
  /**
   * A human-readable description for logging and debugging.
   *
   * @returns The debug object. The return type is not stable and may change in
   * a future release.
   */
  debugInfo() {
    return {
      inputData: this.dataDebugString,
      reference: this.reference,
      state: this.state
    };
  }
  initUploader() {
    const doUpload = async (conn, orgId) => {
      const requestParams = {
        key: this.reference.key,
        filename: this.reference.filename,
        content_type: this.reference.content_type,
        org_id: orgId
      };
      const [metadataPromiseResult, dataPromiseResult] = await Promise.allSettled([
        conn.post("/attachment", requestParams),
        this._data.get()
      ]);
      if (metadataPromiseResult.status === "rejected") {
        const errorStr = JSON.stringify(metadataPromiseResult.reason);
        throw new Error(
          `Failed to request signed URL from API server: ${errorStr}`
        );
      }
      if (dataPromiseResult.status === "rejected") {
        const errorStr = JSON.stringify(dataPromiseResult.reason);
        throw new Error(`Failed to read file: ${errorStr}`);
      }
      const metadataResponse = metadataPromiseResult.value;
      const data = dataPromiseResult.value;
      let signedUrl;
      let headers;
      try {
        ({ signedUrl, headers } = z8.object({
          signedUrl: z8.string().url(),
          headers: z8.record(z8.string())
        }).parse(await metadataResponse.json()));
      } catch (error) {
        if (error instanceof ZodError) {
          const errorStr = JSON.stringify(error.flatten());
          throw new Error(`Invalid response from API server: ${errorStr}`);
        }
        throw error;
      }
      addAzureBlobHeaders(headers, signedUrl);
      let objectStoreResponse;
      try {
        objectStoreResponse = await checkResponse(
          await fetch(signedUrl, {
            method: "PUT",
            headers,
            body: data
          })
        );
        await objectStoreResponse.body?.cancel();
      } catch (error) {
        if (error instanceof FailedHTTPResponse) {
          throw new Error(
            `Failed to upload attachment to object store: ${error.status} ${error.text} ${error.data}`
          );
        }
        throw error;
      }
      return { signedUrl, metadataResponse, objectStoreResponse };
    };
    const errorWrapper = async () => {
      const status = { upload_status: "done" };
      const state2 = this.state ?? _globalState;
      await state2.login({});
      const conn = state2.apiConn();
      const orgId = state2.orgId ?? "";
      try {
        await doUpload(conn, orgId);
      } catch (error) {
        status.upload_status = "error";
        status.error_message = error instanceof Error ? error.message : JSON.stringify(error);
      }
      const requestParams = {
        key: this.reference.key,
        org_id: orgId,
        status
      };
      const statusResponse = await conn.post(
        "/attachment/status",
        requestParams
      );
      await statusResponse.body?.cancel();
      if (!statusResponse.ok) {
        const errorStr = JSON.stringify(statusResponse);
        throw new Error(`Couldn't log attachment status: ${errorStr}`);
      }
      return status;
    };
    return new LazyValue(errorWrapper);
  }
  initData(data) {
    if (typeof data === "string") {
      this.ensureFileReadable(data);
      const readFile = isomorph_default.readFile;
      if (!readFile) {
        throw new Error(
          `This platform does not support reading the filesystem. Construct the Attachment
with a Blob/ArrayBuffer, or run the program on Node.js.`
        );
      }
      return new LazyValue(async () => new Blob([await readFile(data)]));
    } else {
      return new LazyValue(async () => new Blob([data]));
    }
  }
  ensureFileReadable(data) {
    const statSync = isomorph_default.statSync;
    if (!statSync) {
      throw new Error(
        `This platform does not support reading the filesystem. Construct the Attachment
with a Blob/ArrayBuffer, or run the program on Node.js.`
      );
    }
    try {
      statSync(data);
    } catch (e) {
      debugLogger.warn(`Failed to read file: ${e}`);
    }
  }
};
var attachmentMetadataSchema = z8.object({
  downloadUrl: z8.string(),
  status: AttachmentStatus
});
var ReadonlyAttachment = class {
  /**
   * Attachment metadata.
   */
  reference;
  _data;
  state;
  /**
   * Construct a ReadonlyAttachment.
   *
   * @param reference The `AttachmentReference` that should be read by the
   * `ReadonlyAttachment` object.
   * @param state (Optional) For internal use.
   * @returns The new `ReadonlyAttachment` object.
   */
  constructor(reference, state2) {
    this.reference = reference;
    this.state = state2;
    this._data = this.initDownloader();
  }
  /**
   * The attachment contents. This is a lazy value that will read the attachment
   * contents from the object store on first access.
   */
  async data() {
    return this._data.get();
  }
  /**
   * Returns the attachment contents as a base64-encoded URL that is suitable
   * for use in a prompt.
   *
   * @returns The attachment contents as a base64-encoded URL.
   */
  async asBase64Url() {
    const buf = await (await this.data()).arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    return `data:${this.reference.content_type};base64,${base64}`;
  }
  /**
   * Fetch the attachment metadata, which includes a downloadUrl and a status.
   * This will re-fetch the status each time in case it changes over time.
   */
  async metadata() {
    const state2 = this.state ?? _globalState;
    await state2.login({});
    const params = {
      filename: this.reference.filename,
      content_type: this.reference.content_type,
      org_id: state2.orgId || ""
    };
    if (this.reference.type === "braintrust_attachment") {
      params.key = this.reference.key;
    } else if (this.reference.type === "external_attachment") {
      params.url = this.reference.url;
    }
    const resp = await state2.apiConn().get("/attachment", params);
    if (!resp.ok) {
      const errorStr = JSON.stringify(resp);
      throw new Error(`Invalid response from API server: ${errorStr}`);
    }
    return attachmentMetadataSchema.parse(await resp.json());
  }
  /**
   * Fetch the attachment upload status. This will re-fetch the status each time
   * in case it changes over time.
   */
  async status() {
    return (await this.metadata()).status;
  }
  initDownloader() {
    const download = async () => {
      const { downloadUrl, status } = await this.metadata();
      if (status.upload_status !== "done") {
        throw new Error(
          `Expected attachment status "done", got "${status.upload_status}"`
        );
      }
      const objResponse = await fetch(downloadUrl);
      if (objResponse.status !== 200) {
        const error = await objResponse.text();
        throw new Error(`Couldn't download attachment: ${error}`);
      }
      return await objResponse.blob();
    };
    return new LazyValue(download);
  }
};
function logFeedbackImpl(state2, parentObjectType, parentObjectId, {
  id,
  expected,
  scores,
  metadata: inputMetadata,
  tags,
  comment,
  source: inputSource
}) {
  const source = inputSource ?? "external";
  if (!VALID_SOURCES.includes(source)) {
    throw new Error(`source must be one of ${VALID_SOURCES}`);
  }
  if (isEmpty2(scores) && isEmpty2(expected) && isEmpty2(tags) && isEmpty2(comment)) {
    throw new Error(
      "At least one of scores, expected, tags, or comment must be specified"
    );
  }
  const validatedEvent = validateAndSanitizeExperimentLogPartialArgs({
    scores,
    metadata: inputMetadata,
    expected,
    tags
  });
  const { metadata, ...rawUpdateEvent } = deepCopyEvent(validatedEvent);
  const updateEvent = Object.fromEntries(
    Object.entries(rawUpdateEvent).filter(([_, v]) => !isEmpty2(v))
  );
  const parentIds = async () => new SpanComponentsV3({
    object_type: parentObjectType,
    object_id: await parentObjectId.get()
  }).objectIdFields();
  if (Object.keys(updateEvent).length > 0) {
    const record = new LazyValue(async () => {
      return {
        id,
        ...updateEvent,
        ...await parentIds(),
        [AUDIT_SOURCE_FIELD]: source,
        [AUDIT_METADATA_FIELD]: metadata,
        [IS_MERGE_FIELD]: true
      };
    });
    state2.bgLogger().log([record]);
  }
  if (!isEmpty2(comment)) {
    const record = new LazyValue(async () => {
      return {
        id: uuidv42(),
        created: (/* @__PURE__ */ new Date()).toISOString(),
        origin: {
          // NOTE: We do not know (or care?) what the transaction id of the row that
          // we're commenting on is here, so we omit it.
          id
        },
        comment: {
          text: comment
        },
        ...await parentIds(),
        [AUDIT_SOURCE_FIELD]: source,
        [AUDIT_METADATA_FIELD]: metadata
      };
    });
    state2.bgLogger().log([record]);
  }
}
function updateSpanImpl({
  state: state2,
  parentObjectType,
  parentObjectId,
  id,
  root_span_id,
  span_id,
  event
}) {
  if (isEmpty2(root_span_id) !== isEmpty2(span_id)) {
    throw new Error("both root_span_id and span_id must be set, or neither");
  }
  const hasExplicitSpanIds = root_span_id !== void 0 && span_id !== void 0;
  const updateEvent = deepCopyEvent(
    validateAndSanitizeExperimentLogPartialArgs({
      ...event,
      id,
      ...hasExplicitSpanIds ? { root_span_id, span_id } : {}
    })
  );
  const parentIds = async () => new SpanComponentsV3({
    object_type: parentObjectType,
    object_id: await parentObjectId.get()
  }).objectIdFields();
  const record = new LazyValue(async () => ({
    id,
    ...updateEvent,
    ...await parentIds(),
    [IS_MERGE_FIELD]: true
  }));
  state2.bgLogger().log([record]);
}
function spanComponentsToObjectIdLambda(state2, components) {
  if (components.data.object_id) {
    const ret = components.data.object_id;
    return async () => ret;
  }
  if (!components.data.compute_object_metadata_args) {
    throw new Error(
      "Impossible: must provide either objectId or computeObjectMetadataArgs"
    );
  }
  switch (components.data.object_type) {
    case 1 /* EXPERIMENT */:
      throw new Error(
        "Impossible: computeObjectMetadataArgs not supported for experiments"
      );
    case 3 /* PLAYGROUND_LOGS */:
      throw new Error(
        "Impossible: computeObjectMetadataArgs not supported for prompt sessions"
      );
    case 2 /* PROJECT_LOGS */:
      return async () => (await computeLoggerMetadata(state2, {
        ...components.data.compute_object_metadata_args
      })).project.id;
    default:
      const x = components.data.object_type;
      throw new Error(`Unknown object type: ${x}`);
  }
}
async function spanComponentsToObjectId({
  components,
  state: state2
}) {
  return await spanComponentsToObjectIdLambda(
    state2 ?? _globalState,
    components
  )();
}
var ERR_PERMALINK = "https://braintrust.dev/error-generating-link";
function getErrPermlink(msg) {
  if (msg == "") {
    return ERR_PERMALINK;
  }
  return `${ERR_PERMALINK}?msg=${encodeURIComponent(msg)}`;
}
function _getAppUrl(appUrl) {
  return appUrl || isomorph_default.getEnv("BRAINTRUST_APP_URL") || "https://www.braintrust.dev";
}
function _getOrgName(orgName) {
  return orgName || isomorph_default.getEnv("BRAINTRUST_ORG_NAME") || void 0;
}
function _getLinkBaseUrl(state2, linkArgs) {
  const appUrl = _getAppUrl(state2.appUrl || linkArgs?.app_url);
  const orgName = _getOrgName(state2.orgName || linkArgs?.org_name);
  if (!orgName) {
    return null;
  }
  return `${appUrl}/app/${orgName}`;
}
async function permalink(slug, opts) {
  if (slug === "") {
    return NOOP_SPAN_PERMALINK;
  }
  const state2 = opts?.state ?? _globalState;
  const getOrgName = async () => {
    if (opts?.orgName) {
      return opts.orgName;
    }
    await state2.login({});
    if (!state2.orgName) {
      throw new Error("provide-org-or-login");
    }
    return state2.orgName;
  };
  const getAppUrl = async () => {
    if (opts?.appUrl) {
      return opts.appUrl;
    }
    await state2.login({});
    if (!state2.appUrl) {
      throw new Error("provide-app-url-or-login");
    }
    return state2.appUrl;
  };
  try {
    const components = SpanComponentsV4.fromStr(slug);
    const object_type = spanObjectTypeV3ToString(components.data.object_type);
    const [orgName, appUrl, object_id] = await Promise.all([
      getOrgName(),
      getAppUrl(),
      spanComponentsToObjectId({ components, state: state2 })
    ]);
    const id = components.data.row_id;
    if (!id) {
      throw new Error("Span slug does not refer to an individual row");
    }
    const urlParams = new URLSearchParams({ object_type, object_id, id });
    return `${appUrl}/app/${orgName}/object?${urlParams}`;
  } catch (e) {
    if (e instanceof FailedHTTPResponse) {
      return getErrPermlink(`http-error-${e.status}`);
    }
    return getErrPermlink(e instanceof Error ? e.message : String(e));
  }
}
function startSpanParentArgs(args) {
  let argParentObjectId = void 0;
  let argParentSpanIds = void 0;
  let argPropagatedEvent = void 0;
  let argPropagatedState = void 0;
  const { parentSlug, propagatedState: parentPropagatedState } = normalizeParent(args.parent, args.state);
  if (parentSlug) {
    if (args.parentSpanIds) {
      throw new Error("Cannot specify both parent and parentSpanIds");
    }
    const parentComponents = SpanComponentsV4.fromStr(parentSlug);
    if (args.parentObjectType !== parentComponents.data.object_type) {
      throw new Error(
        `Mismatch between expected span parent object type ${args.parentObjectType} and provided type ${parentComponents.data.object_type}`
      );
    }
    argParentObjectId = args.parentObjectId;
    if (parentComponents.data.row_id && parentSpanIdsUsable(
      parentComponents.data.span_id,
      parentComponents.data.root_span_id
    )) {
      argParentSpanIds = {
        spanId: parentComponents.data.span_id,
        rootSpanId: parentComponents.data.root_span_id
      };
    }
    argPropagatedEvent = args.propagatedEvent ?? (parentComponents.data.propagated_event ?? void 0);
    const propagatedState = args.propagatedState ?? parentPropagatedState;
    if (propagatedState) {
      const { braintrustParent: _ignoredBraintrustParent, ...w3cState } = propagatedState;
      argPropagatedState = w3cState;
    }
  } else {
    argParentObjectId = args.parentObjectId;
    argParentSpanIds = args.parentSpanIds;
    argPropagatedEvent = args.propagatedEvent;
    argPropagatedState = args.propagatedState;
  }
  return {
    parentObjectType: args.parentObjectType,
    parentObjectId: argParentObjectId,
    parentComputeObjectMetadataArgs: args.parentComputeObjectMetadataArgs,
    parentSpanIds: argParentSpanIds,
    propagatedEvent: argPropagatedEvent,
    propagatedState: argPropagatedState
  };
}
var Logger = class {
  state;
  lazyMetadata;
  _asyncFlush;
  computeMetadataArgs;
  _linkArgs;
  lastStartTime;
  lazyId;
  calledStartSpan;
  // For type identification.
  kind = "logger";
  constructor(state2, lazyMetadata, logOptions = {}) {
    this.lazyMetadata = lazyMetadata;
    this._asyncFlush = logOptions.asyncFlush;
    this.computeMetadataArgs = logOptions.computeMetadataArgs;
    this._linkArgs = logOptions.linkArgs;
    this.lastStartTime = getCurrentUnixTimestamp();
    this.lazyId = new LazyValue(async () => await this.id);
    this.calledStartSpan = false;
    this.state = state2;
  }
  get org_id() {
    return (async () => {
      return (await this.lazyMetadata.get()).org_id;
    })();
  }
  get project() {
    return (async () => {
      return (await this.lazyMetadata.get()).project;
    })();
  }
  get id() {
    return (async () => (await this.project).id)();
  }
  get loggingState() {
    return this.state;
  }
  parentObjectType() {
    return 2 /* PROJECT_LOGS */;
  }
  /**
   * Log a single event. The event will be batched and uploaded behind the scenes if `logOptions.asyncFlush` is true.
   *
   * @param event The event to log.
   * @param event.input: (Optional) the arguments that uniquely define a user input (an arbitrary, JSON serializable object).
   * @param event.output: (Optional) the output of your application, including post-processing (an arbitrary, JSON serializable object), that allows you to determine whether the result is correct or not. For example, in an app that generates SQL queries, the `output` should be the _result_ of the SQL query generated by the model, not the query itself, because there may be multiple valid queries that answer a single question.
   * @param event.expected: (Optional) the ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not. Braintrust currently does not compare `output` to `expected` for you, since there are so many different ways to do that correctly. Instead, these values are just used to help you navigate while digging into analyses. However, we may later use these values to re-score outputs or fine-tune your models.
   * @param event.error: (Optional) The error that occurred, if any. If you use tracing to run an experiment, errors are automatically logged when your code throws an exception.
   * @param event.scores: (Optional) a dictionary of numeric values (between 0 and 1) to log. The scores should give you a variety of signals that help you determine how accurate the outputs are compared to what you expect and diagnose failures. For example, a summarization app might have one score that tells you how accurate the summary is, and another that measures the word similarity between the generated and grouth truth summary. The word similarity score could help you determine whether the summarization was covering similar concepts or not. You can use these scores to help you sort, filter, and compare logs.
   * @param event.metadata: (Optional) a dictionary with additional data about the test example, model outputs, or just about anything else that's relevant, that you can use to help find and analyze examples later. For example, you could log the `prompt`, example's `id`, or anything else that would be useful to slice/dice later. The values in `metadata` can be any JSON-serializable type, but its keys must be strings.
   * @param event.metrics: (Optional) a dictionary of metrics to log. The following keys are populated automatically: "start", "end".
   * @param event.id: (Optional) a unique identifier for the event. If you don't provide one, BrainTrust will generate one for you.
   * @param options Additional logging options
   * @param options.allowConcurrentWithSpans in rare cases where you need to log at the top level separately from spans on the logger elsewhere, set this to true.
   * @returns The `id` of the logged event.
   */
  log(event, options) {
    if (this.calledStartSpan && !options?.allowConcurrentWithSpans) {
      throw new Error(
        "Cannot run toplevel `log` method while using spans. To log to the span, call `logger.traced` and then log with `span.log`"
      );
    }
    const span = this.startSpanImpl({ startTime: this.lastStartTime, event });
    this.lastStartTime = span.end();
    const ret = span.id;
    if (this.asyncFlush === true) {
      return ret;
    } else {
      return (async () => {
        await this.flush();
        return ret;
      })();
    }
  }
  /**
   * Create a new toplevel span underneath the logger. The name defaults to "root".
   *
   * See {@link Span.traced} for full details.
   */
  traced(callback, args) {
    const { setCurrent, ...argsRest } = args ?? {};
    const span = this.startSpan(argsRest);
    const ret = runCatchFinally(
      () => {
        if (setCurrent ?? true) {
          return withCurrent(span, callback);
        } else {
          return callback(span);
        }
      },
      (e) => {
        logError(span, e);
        throw e;
      },
      () => span.end()
    );
    if (this.asyncFlush) {
      return ret;
    } else {
      return (async () => {
        const awaitedRet = await ret;
        await this.flush();
        return awaitedRet;
      })();
    }
  }
  /**
   * Lower-level alternative to `traced`. This allows you to start a span yourself, and can be useful in situations
   * where you cannot use callbacks. However, spans started with `startSpan` will not be marked as the "current span",
   * so `currentSpan()` and `traced()` will be no-ops. If you want to mark a span as current, use `traced` instead.
   *
   * See {@link traced} for full details.
   */
  startSpan(args) {
    this.calledStartSpan = true;
    return this.startSpanImpl(args);
  }
  startSpanImpl(args) {
    return new SpanImpl({
      ...args,
      // Sometimes `args` gets passed directly into this function, and it contains an undefined value for `state`.
      // To ensure that we always use this logger's state, we override the `state` argument no matter what.
      state: this.state,
      ...startSpanParentArgs({
        state: this.state,
        parent: args?.parent,
        parentObjectType: this.parentObjectType(),
        parentObjectId: this.lazyId,
        parentComputeObjectMetadataArgs: this.computeMetadataArgs,
        parentSpanIds: args?.parentSpanIds,
        propagatedEvent: args?.propagatedEvent
      }),
      defaultRootType: "task" /* TASK */
    });
  }
  /**
   * Log feedback to an event. Feedback is used to save feedback scores, set an expected value, or add a comment.
   *
   * @param event
   * @param event.id The id of the event to log feedback for. This is the `id` returned by `log` or accessible as the `id` field of a span.
   * @param event.scores (Optional) a dictionary of numeric values (between 0 and 1) to log. These scores will be merged into the existing scores for the event.
   * @param event.expected (Optional) the ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not.
   * @param event.comment (Optional) an optional comment string to log about the event.
   * @param event.metadata (Optional) a dictionary with additional data about the feedback. If you have a `user_id`, you can log it here and access it in the Braintrust UI. Note, this metadata does not correspond to the main event itself, but rather the audit log attached to the event.
   * @param event.source (Optional) the source of the feedback. Must be one of "external" (default), "app", or "api".
   */
  logFeedback(event) {
    logFeedbackImpl(this.state, this.parentObjectType(), this.lazyId, event);
  }
  /**
   * Update a span in the experiment using its id. It is important that you only update a span once the original span has been fully written and flushed,
   * since otherwise updates to the span may conflict with the original span.
   *
   * @param event The event data to update the span with. Must include `id`. See {@link Experiment.log} for a full list of valid fields.
   */
  updateSpan(event) {
    const { id, root_span_id, span_id, ...eventRest } = event;
    if (!id) {
      throw new Error("Span id is required to update a span");
    }
    updateSpanImpl({
      state: this.state,
      parentObjectType: this.parentObjectType(),
      parentObjectId: this.lazyId,
      id,
      root_span_id,
      span_id,
      event: eventRest
    });
  }
  /**
   * Return a serialized representation of the logger that can be used to start subspans in other places.
   *
   * See {@link Span.startSpan} for more details.
   */
  async export() {
    return new (getSpanComponentsClass())({
      object_type: this.parentObjectType(),
      ...this.computeMetadataArgs && !this.lazyId.hasSucceeded ? { compute_object_metadata_args: this.computeMetadataArgs } : { object_id: await this.lazyId.get() }
    }).toStr();
  }
  /*
   * Flush any pending logs to the server.
   */
  async flush() {
    return await this.state.bgLogger().flush();
  }
  get asyncFlush() {
    return this._asyncFlush;
  }
  /**
   * Return the base URL for links (e.g. https://braintrust.dev/app/my-org-name)
   * if we have the info, otherwise return null.
   * Resolution order: state -> linkArgs -> env var
   */
  _getLinkBaseUrl() {
    return _getLinkBaseUrl(this.state, this._linkArgs);
  }
  /**
   * Return this logger's Braintrust parent string (`project_id:<id>` or
   * `project_name:<name>`) for the `braintrust.parent` baggage entry, or
   * undefined when it cannot be determined synchronously.
   */
  _getOtelParent() {
    const id = this.computeMetadataArgs?.project_id || this.lazyId.getSync().value;
    if (id) {
      return `project_id:${id}`;
    }
    const name = this.computeMetadataArgs?.project_name;
    if (name) {
      return `project_name:${name}`;
    }
    return void 0;
  }
};
function castLogger(logger, asyncFlush) {
  if (logger === void 0) return void 0;
  if (asyncFlush !== void 0 && !!asyncFlush !== !!logger.asyncFlush) {
    throw new Error(
      `Asserted asyncFlush setting ${asyncFlush} does not match stored logger's setting ${logger.asyncFlush}`
    );
  }
  return logger;
}
var logs3OverflowUploadSchema = z8.object({
  method: z8.enum(["PUT", "POST"]),
  signedUrl: z8.string().url(),
  headers: z8.record(z8.string()).optional(),
  fields: z8.record(z8.string()).optional(),
  key: z8.string().min(1)
});
function constructLogs3Data(items) {
  return `{"rows": ${constructJsonArray(items.map((i) => i.str))}, "api_version": 2}`;
}
function constructLogs3OverflowRequest(key) {
  return {
    rows: {
      type: LOGS3_OVERFLOW_REFERENCE_TYPE,
      key
    },
    api_version: 2
  };
}
function pickLogs3OverflowObjectIds(row) {
  const objectIds = {};
  for (const key of OBJECT_ID_KEYS) {
    if (key in row) {
      objectIds[key] = row[key];
    }
  }
  return objectIds;
}
async function uploadLogs3OverflowPayload(upload, payload, fetchFn = fetch) {
  if (upload.method === "POST") {
    if (!upload.fields) {
      throw new Error("Missing logs3 overflow upload fields");
    }
    if (typeof FormData === "undefined" || typeof Blob === "undefined") {
      throw new Error("FormData is not available for logs3 overflow upload");
    }
    const form = new FormData();
    for (const [key, value] of Object.entries(upload.fields)) {
      form.append(key, value);
    }
    const contentType = upload.fields["Content-Type"] ?? "application/json";
    form.append("file", new Blob([payload], { type: contentType }));
    const headers2 = {};
    for (const [key, value] of Object.entries(upload.headers ?? {})) {
      if (key.toLowerCase() !== "content-type") {
        headers2[key] = value;
      }
    }
    const response2 = await fetchFn(upload.signedUrl, {
      method: "POST",
      headers: headers2,
      body: form
    });
    if (!response2.ok) {
      const responseText = await response2.text().catch(() => "");
      throw new Error(
        `Failed to upload logs3 overflow payload: ${response2.status} ${responseText}`
      );
    }
    return;
  }
  const headers = { ...upload.headers ?? {} };
  addAzureBlobHeaders(headers, upload.signedUrl);
  const response = await fetchFn(upload.signedUrl, {
    method: "PUT",
    headers,
    body: payload
  });
  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(
      `Failed to upload logs3 overflow payload: ${response.status} ${responseText}`
    );
  }
}
function stringifyWithOverflowMeta(item) {
  const str = JSON.stringify(item);
  const record = item;
  return {
    str,
    overflowMeta: {
      object_ids: pickLogs3OverflowObjectIds(record),
      is_delete: record[OBJECT_DELETE_FIELD] === true,
      input_row: {
        byte_size: utf8ByteLength2(str)
      }
    }
  };
}
function utf8ByteLength2(value) {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(value).length;
  }
  return value.length;
}
function now() {
  return (/* @__PURE__ */ new Date()).getTime();
}
var DEFAULT_FLUSH_BACKPRESSURE_BYTES = 10 * 1024 * 1024;
var BACKGROUND_LOGGER_BASE_SLEEP_TIME_S = 1;
var HTTP_RETRY_BASE_SLEEP_TIME_S = 1;
var HTTP_RETRY_JITTER_MS = 200;
var BTQL_HTTP_RETRIES = 3;
var RETRYABLE_HTTP_STATUS_CODES = /* @__PURE__ */ new Set([500, 502, 503, 504]);
function isRetryableHTTPError(error) {
  return !(error instanceof FailedHTTPResponse) || RETRYABLE_HTTP_STATUS_CODES.has(error.status);
}
function formatHTTPError(error) {
  if (error instanceof FailedHTTPResponse) {
    return `${error.status} ${error.text}`;
  }
  return error instanceof Error ? error.message : String(error);
}
function getAbortReason(signal) {
  return signal.reason ?? new Error("Request aborted");
}
async function waitForRetry(delayMs, signal) {
  if (!signal) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return;
  }
  if (signal.aborted) {
    throw getAbortReason(signal);
  }
  await new Promise((resolve, reject) => {
    const onAbort = () => {
      clearTimeout(timeout);
      signal.removeEventListener("abort", onAbort);
      reject(getAbortReason(signal));
    };
    const timeout = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, delayMs);
    signal.addEventListener("abort", onAbort, { once: true });
    if (signal.aborted) {
      onAbort();
    }
  });
}
var HTTPBackgroundLogger = class _HTTPBackgroundLogger {
  apiConn;
  queue;
  activeFlush = Promise.resolve();
  activeFlushResolved = true;
  activeFlushError = void 0;
  onFlushError;
  maskingFunction = null;
  syncFlush = false;
  maxRequestSizeOverride = null;
  _maxRequestSizePromise = null;
  defaultBatchSize = 100;
  numTries = 3;
  queueDropExceedingMaxsize = DEFAULT_QUEUE_SIZE;
  queueDropLoggingPeriod = 60;
  failedPublishPayloadsDir = void 0;
  allPublishPayloadsDir = void 0;
  _flushBackpressureBytes = DEFAULT_FLUSH_BACKPRESSURE_BYTES;
  _pendingBytes = 0;
  _disabled = false;
  queueDropLoggingState = {
    numDropped: 0,
    lastLoggedTimestamp: 0
  };
  constructor(apiConn, opts) {
    opts = opts ?? {};
    this.apiConn = apiConn;
    const syncFlushEnv = Number(isomorph_default.getEnv("BRAINTRUST_SYNC_FLUSH"));
    if (!isNaN(syncFlushEnv)) {
      this.syncFlush = Boolean(syncFlushEnv);
    }
    const defaultBatchSizeEnv = Number(
      isomorph_default.getEnv("BRAINTRUST_DEFAULT_BATCH_SIZE")
    );
    if (!isNaN(defaultBatchSizeEnv)) {
      this.defaultBatchSize = defaultBatchSizeEnv;
    }
    const maxRequestSizeEnv = Number(isomorph_default.getEnv("BRAINTRUST_MAX_REQUEST_SIZE"));
    if (!isNaN(maxRequestSizeEnv)) {
      this.maxRequestSizeOverride = maxRequestSizeEnv;
    }
    const numTriesEnv = Number(isomorph_default.getEnv("BRAINTRUST_NUM_RETRIES"));
    if (!isNaN(numTriesEnv)) {
      this.numTries = numTriesEnv + 1;
    }
    const queueDropExceedingMaxsizeEnv = Number(
      isomorph_default.getEnv("BRAINTRUST_QUEUE_DROP_EXCEEDING_MAXSIZE")
    );
    if (!isNaN(queueDropExceedingMaxsizeEnv)) {
      this.queueDropExceedingMaxsize = queueDropExceedingMaxsizeEnv;
    }
    this.queue = new Queue(this.queueDropExceedingMaxsize);
    const queueDropLoggingPeriodEnv = Number(
      isomorph_default.getEnv("BRAINTRUST_QUEUE_DROP_LOGGING_PERIOD")
    );
    if (!isNaN(queueDropLoggingPeriodEnv)) {
      this.queueDropLoggingPeriod = queueDropLoggingPeriodEnv;
    }
    if (isomorph_default.getEnv("BRAINTRUST_LOG_FLUSH_CHUNK_SIZE")) {
      debugLogger.warn(
        "BRAINTRUST_LOG_FLUSH_CHUNK_SIZE is deprecated and no longer has any effect. Log flushing now sends all items at once and batches them automatically. This environment variable will be removed in a future major release."
      );
    }
    const flushBackpressureBytesEnv = Number(
      isomorph_default.getEnv("BRAINTRUST_FLUSH_BACKPRESSURE_BYTES")
    );
    if (!isNaN(flushBackpressureBytesEnv) && flushBackpressureBytesEnv > 0) {
      this._flushBackpressureBytes = flushBackpressureBytesEnv;
    }
    const failedPublishPayloadsDirEnv = isomorph_default.getEnv(
      "BRAINTRUST_FAILED_PUBLISH_PAYLOADS_DIR"
    );
    if (failedPublishPayloadsDirEnv) {
      this.failedPublishPayloadsDir = failedPublishPayloadsDirEnv;
    }
    const allPublishPayloadsDirEnv = isomorph_default.getEnv(
      "BRAINTRUST_ALL_PUBLISH_PAYLOADS_DIR"
    );
    if (allPublishPayloadsDirEnv) {
      this.allPublishPayloadsDir = allPublishPayloadsDirEnv;
    }
    if (!opts.noExitFlush) {
      isomorph_default.processOn("beforeExit", async () => {
        await this.flush();
      });
    }
    this.onFlushError = opts.onFlushError;
  }
  setMaskingFunction(maskingFunction) {
    this.maskingFunction = maskingFunction;
  }
  pendingFlushBytes() {
    return this._pendingBytes;
  }
  flushBackpressureBytes() {
    return this._flushBackpressureBytes;
  }
  log(items) {
    if (this._disabled) {
      return;
    }
    const droppedItems = this.queue.push(...items);
    if (!this.syncFlush) {
      this.triggerActiveFlush();
    }
    if (droppedItems.length) {
      this.registerDroppedItemCount(droppedItems.length);
      if (this.allPublishPayloadsDir || this.failedPublishPayloadsDir) {
        this.dumpDroppedEvents(droppedItems);
      }
    }
  }
  getMaxRequestSize() {
    if (!this._maxRequestSizePromise) {
      this._maxRequestSizePromise = (async () => {
        let serverLimit = null;
        try {
          const conn = await this.apiConn.get();
          const versionInfo = await conn.get_json("version");
          serverLimit = z8.object({ logs3_payload_max_bytes: z8.number().nullish() }).parse(versionInfo).logs3_payload_max_bytes ?? null;
        } catch (e) {
          debugLogger.warn(
            "Failed to fetch version info for payload limit:",
            e
          );
        }
        const validServerLimit = serverLimit !== null && serverLimit > 0 ? serverLimit : null;
        const canUseOverflow = validServerLimit !== null;
        let maxRequestSize = DEFAULT_MAX_REQUEST_SIZE;
        if (this.maxRequestSizeOverride !== null) {
          maxRequestSize = validServerLimit !== null ? Math.min(this.maxRequestSizeOverride, validServerLimit) : this.maxRequestSizeOverride;
        } else if (validServerLimit !== null) {
          maxRequestSize = validServerLimit;
        }
        return { maxRequestSize, canUseOverflow };
      })();
    }
    return this._maxRequestSizePromise;
  }
  async flush() {
    if (this.syncFlush) {
      this.triggerActiveFlush();
    }
    await this.activeFlush;
    if (this.activeFlushError) {
      const err = this.activeFlushError;
      this.activeFlushError = void 0;
      if (this.syncFlush) {
        throw err;
      }
    }
  }
  async flushOnce(args) {
    if (this._disabled) {
      this.queue.clear();
      return;
    }
    const batchSize = args?.batchSize ?? this.defaultBatchSize;
    const wrappedItems = this.queue.drain();
    if (wrappedItems.length === 0) {
      return;
    }
    await this.flushWrappedItemsChunk(wrappedItems, batchSize);
    if (this.queue.length() > 0) {
      await this.flushOnce(args);
    }
  }
  async flushWrappedItemsChunk(wrappedItems, batchSize) {
    if (!wrappedItems.length) {
      return;
    }
    const [allItems, attachments] = await this.unwrapLazyValues(wrappedItems);
    if (allItems.length === 0) {
      return;
    }
    let chunkBytes = 0;
    const allItemsWithMeta = allItems.map((item) => {
      const withMeta = stringifyWithOverflowMeta(item);
      chunkBytes += withMeta.str.length;
      return withMeta;
    });
    this._pendingBytes += chunkBytes;
    const maxRequestSizeResult = await this.getMaxRequestSize();
    const batches = batchItems({
      items: allItemsWithMeta,
      batchMaxNumItems: batchSize,
      batchMaxNumBytes: maxRequestSizeResult.maxRequestSize / 2,
      getByteSize: (item) => item.str.length
    });
    const postPromises = batches.map(
      (batch) => (async () => {
        try {
          await this.submitLogsRequest(batch, maxRequestSizeResult);
          return { type: "success" };
        } catch (e) {
          return { type: "error", value: e };
        }
      })()
    );
    const results = await Promise.all(postPromises);
    this._pendingBytes = Math.max(0, this._pendingBytes - chunkBytes);
    const failingResultErrors = results.map((r) => r.type === "success" ? void 0 : r.value).filter((r) => r !== void 0);
    if (failingResultErrors.length) {
      throw new AggregateError(
        failingResultErrors,
        `Encountered the following errors while logging:`
      );
    }
    const attachmentErrors = [];
    for (const attachment of attachments) {
      try {
        const result = await attachment.upload();
        if (result.upload_status === "error") {
          throw new Error(result.error_message);
        }
      } catch (error) {
        attachmentErrors.push(error);
      }
    }
    if (attachmentErrors.length === 1) {
      throw attachmentErrors[0];
    } else if (attachmentErrors.length > 1) {
      throw new AggregateError(
        attachmentErrors,
        `Encountered the following errors while uploading attachments:`
      );
    }
  }
  async unwrapLazyValues(wrappedItems) {
    for (let i = 0; i < this.numTries; ++i) {
      try {
        const items = await Promise.all(wrappedItems.map((x) => x.get()));
        const attachments = [];
        items.forEach((item) => extractAttachments(item, attachments));
        let mergedItems = mergeRowBatch(items);
        if (this.maskingFunction) {
          mergedItems = mergedItems.map((item) => {
            const maskedItem = { ...item };
            for (const field of REDACTION_FIELDS) {
              if (item[field] !== void 0) {
                const maskedValue = applyMaskingToField(
                  this.maskingFunction,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  item[field],
                  field
                );
                if (maskedValue instanceof MaskingError) {
                  delete maskedItem[field];
                  if (maskedItem.error) {
                    maskedItem.error = `${maskedItem.error}; ${maskedValue.errorMsg}`;
                  } else {
                    maskedItem.error = maskedValue.errorMsg;
                  }
                } else {
                  maskedItem[field] = maskedValue;
                }
              }
            }
            return maskedItem;
          });
        }
        return [mergedItems, attachments];
      } catch (e) {
        let errmsg = "Encountered error when constructing records to flush";
        const isRetrying = i + 1 < this.numTries;
        if (isRetrying) {
          errmsg += ". Retrying";
        }
        debugLogger.warn(errmsg);
        if (!isRetrying) {
          debugLogger.warn(
            `Failed to construct log records to flush after ${this.numTries} attempts. Dropping batch`
          );
          throw e;
        } else {
          debugLogger.warn(e);
          const sleepTimeS = BACKGROUND_LOGGER_BASE_SLEEP_TIME_S * 2 ** i;
          debugLogger.info(`Sleeping for ${sleepTimeS}s`);
          await new Promise(
            (resolve) => setTimeout(resolve, sleepTimeS * 1e3)
          );
        }
      }
    }
    throw new Error("Impossible");
  }
  async requestLogs3OverflowUpload(conn, args) {
    let response;
    try {
      response = await conn.post_json("logs3/overflow", {
        content_type: "application/json",
        size_bytes: args.sizeBytes,
        rows: args.rows
      });
    } catch (error) {
      const errorStr = JSON.stringify(error);
      throw new Error(
        `Failed to request logs3 overflow upload URL: ${errorStr}`
      );
    }
    try {
      return logs3OverflowUploadSchema.parse(response);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorStr = JSON.stringify(error.flatten());
        throw new Error(`Invalid response from API server: ${errorStr}`);
      }
      throw error;
    }
  }
  async _uploadLogs3OverflowPayload(conn, upload, payload) {
    await uploadLogs3OverflowPayload(upload, payload, conn.fetch.bind(conn));
  }
  async submitLogsRequest(items, {
    maxRequestSize,
    canUseOverflow
  }) {
    const conn = await this.apiConn.get();
    const dataStr = constructLogs3Data(items);
    const payloadBytes = utf8ByteLength2(dataStr);
    const useOverflow = canUseOverflow && payloadBytes > maxRequestSize;
    if (this.allPublishPayloadsDir) {
      await _HTTPBackgroundLogger.writePayloadToDir({
        payloadDir: this.allPublishPayloadsDir,
        payload: dataStr
      });
    }
    let overflowUpload = null;
    const overflowRows = useOverflow ? items.map((item) => item.overflowMeta) : null;
    for (let i = 0; i < this.numTries; i++) {
      const startTime = now();
      let error = void 0;
      try {
        if (overflowRows) {
          if (!overflowUpload) {
            const currentUpload = await this.requestLogs3OverflowUpload(conn, {
              rows: overflowRows,
              sizeBytes: payloadBytes
            });
            await this._uploadLogs3OverflowPayload(
              conn,
              currentUpload,
              dataStr
            );
            overflowUpload = currentUpload;
          }
          await conn.post_json(
            "logs3",
            constructLogs3OverflowRequest(overflowUpload.key)
          );
        } else {
          await conn.post_json("logs3", dataStr);
        }
      } catch (e) {
        error = e;
      }
      if (error === void 0) {
        return;
      }
      const isRetrying = i + 1 < this.numTries;
      const retryingText = isRetrying ? "" : " Retrying";
      const errorText = (() => {
        if (error instanceof FailedHTTPResponse) {
          return `${error.status} (${error.text}): ${error.data}`;
        } else {
          return `${error}`;
        }
      })();
      const errMsg = `log request failed. Elapsed time: ${(now() - startTime) / 1e3} seconds. Payload size: ${payloadBytes}.${retryingText}
Error: ${errorText}`;
      if (!isRetrying && this.failedPublishPayloadsDir) {
        await _HTTPBackgroundLogger.writePayloadToDir({
          payloadDir: this.failedPublishPayloadsDir,
          payload: dataStr
        });
        this.logFailedPayloadsDir();
      }
      if (!isRetrying) {
        debugLogger.warn(
          `log request failed after ${this.numTries} retries. Dropping batch`
        );
        throw new Error(errMsg);
      } else {
        debugLogger.warn(errMsg);
        if (isRetrying) {
          const sleepTimeS = BACKGROUND_LOGGER_BASE_SLEEP_TIME_S * 2 ** i;
          debugLogger.info(`Sleeping for ${sleepTimeS}s`);
          await new Promise(
            (resolve) => setTimeout(resolve, sleepTimeS * 1e3)
          );
        }
      }
    }
  }
  registerDroppedItemCount(numItems) {
    if (numItems <= 0) {
      return;
    }
    this.queueDropLoggingState.numDropped += numItems;
    const timeNow = getCurrentUnixTimestamp();
    if (timeNow - this.queueDropLoggingState.lastLoggedTimestamp > this.queueDropLoggingPeriod) {
      debugLogger.warn(
        `Dropped ${this.queueDropLoggingState.numDropped} elements due to full queue`
      );
      if (this.failedPublishPayloadsDir) {
        this.logFailedPayloadsDir();
      }
      this.queueDropLoggingState.numDropped = 0;
      this.queueDropLoggingState.lastLoggedTimestamp = timeNow;
    }
  }
  async dumpDroppedEvents(wrappedItems) {
    const publishPayloadsDir = [
      this.allPublishPayloadsDir,
      this.failedPublishPayloadsDir
    ].reduce((acc, x) => x ? acc.concat([x]) : acc, new Array());
    if (!(wrappedItems.length && publishPayloadsDir.length)) {
      return;
    }
    try {
      const [allItems, allAttachments] = await this.unwrapLazyValues(wrappedItems);
      const dataStr = constructLogs3Data(
        allItems.map((x) => stringifyWithOverflowMeta(x))
      );
      const attachmentStr = JSON.stringify(
        allAttachments.map((a) => a.debugInfo())
      );
      const payload = `{"data": ${dataStr}, "attachments": ${attachmentStr}}
`;
      for (const payloadDir of publishPayloadsDir) {
        await _HTTPBackgroundLogger.writePayloadToDir({ payloadDir, payload });
      }
    } catch (e) {
      debugLogger.error(e);
    }
  }
  static async writePayloadToDir({
    payloadDir,
    payload
  }) {
    if (!(isomorph_default.pathJoin && isomorph_default.mkdir && isomorph_default.writeFile)) {
      debugLogger.warn(
        "Cannot dump payloads: filesystem-operations not supported on this platform"
      );
      return;
    }
    const payloadFile = isomorph_default.pathJoin(
      payloadDir,
      `payload_${getCurrentUnixTimestamp()}_${uuidv42().slice(0, 8)}.json`
    );
    try {
      await isomorph_default.mkdir(payloadDir, { recursive: true });
      await isomorph_default.writeFile(payloadFile, payload);
    } catch (e) {
      debugLogger.error(
        `Failed to write failed payload to output file ${payloadFile}:
`,
        e
      );
    }
  }
  triggerActiveFlush() {
    if (this.activeFlushResolved) {
      this.activeFlushResolved = false;
      this.activeFlushError = void 0;
      this.activeFlush = (async () => {
        try {
          await this.flushOnce();
        } catch (err) {
          if (err instanceof AggregateError) {
            for (const e of err.errors) {
              this.onFlushError?.(e);
            }
          } else {
            this.onFlushError?.(err);
          }
          this.activeFlushError = err;
        } finally {
          this.activeFlushResolved = true;
        }
      })();
      waitUntil(this.activeFlush);
    }
  }
  logFailedPayloadsDir() {
    debugLogger.warn(
      `Logging failed payloads to ${this.failedPublishPayloadsDir}`
    );
  }
  // Should only be called by BraintrustState.
  internalReplaceApiConn(apiConn) {
    this.apiConn = new LazyValue(async () => apiConn);
  }
  disable() {
    this._disabled = true;
  }
  enforceQueueSizeLimit(enforce) {
    this.queue.enforceQueueSizeLimit(enforce);
  }
};
function isDatasetSnapshotNameLookup(lookup) {
  return "snapshotName" in lookup;
}
function assertDatasetSnapshotLookup(lookup) {
  const hasSnapshotName = lookup.snapshotName !== void 0;
  const hasXactId = lookup.xactId !== void 0;
  if (hasSnapshotName === hasXactId) {
    throw new Error("Exactly one of snapshotName or xactId must be provided");
  }
}
function getInternalBtqlLimit(internalBtql) {
  const limit = internalBtql?.["limit"];
  return typeof limit === "number" ? limit : void 0;
}
async function getDatasetSnapshots(params) {
  const { state: state2, datasetId } = params;
  return DatasetSnapshot.array().parse(
    await state2.appConn().post_json("api/dataset_snapshot/get", {
      dataset_id: datasetId,
      ..."snapshotName" in params ? { name: params.snapshotName } : {},
      ..."xactId" in params ? { xact_id: params.xactId } : {}
    })
  );
}
async function getDatasetSnapshot(params) {
  assertDatasetSnapshotLookup(params);
  const snapshots = await getDatasetSnapshots(params);
  if (snapshots.length > 1) {
    throw new Error(
      isDatasetSnapshotNameLookup(params) ? `Expected a unique dataset snapshot named "${params.snapshotName}" for ${params.datasetId}` : `Expected a unique dataset snapshot for xact_id "${params.xactId}" in ${params.datasetId}`
    );
  }
  return snapshots[0];
}
async function computeLoggerMetadata(state2, {
  project_name,
  project_id
}) {
  await state2.login({});
  const org_id = state2.orgId;
  if (isEmpty2(project_id)) {
    const response = await state2.appConn().post_json("api/project/register", {
      project_name: project_name || GLOBAL_PROJECT,
      org_id
    });
    return {
      org_id,
      project: {
        id: response.project.id,
        name: response.project.name,
        fullInfo: response.project
      }
    };
  } else if (isEmpty2(project_name)) {
    const response = await state2.appConn().get_json("api/project", {
      id: project_id
    });
    return {
      org_id,
      project: {
        id: project_id,
        name: response.name,
        fullInfo: response.project
      }
    };
  } else {
    return {
      org_id,
      project: { id: project_id, name: project_name, fullInfo: {} }
    };
  }
}
async function loginToState(options = {}) {
  const {
    appUrl = isomorph_default.getEnv("BRAINTRUST_APP_URL") || "https://www.braintrust.dev",
    apiKey: apiKeyArg,
    orgName = isomorph_default.getEnv("BRAINTRUST_ORG_NAME"),
    fetch: fetch2 = globalThis.fetch
  } = options || {};
  const apiKey = apiKeyArg !== void 0 ? apiKeyArg : await isomorph_default.getBraintrustApiKey();
  const appPublicUrl = isomorph_default.getEnv("BRAINTRUST_APP_PUBLIC_URL") || appUrl;
  const state2 = new BraintrustState(options);
  state2.resetLoginInfo();
  state2.appUrl = appUrl;
  state2.appPublicUrl = appPublicUrl;
  let conn = null;
  if (!apiKey) {
    throw new Error(
      "Please specify an api key (e.g. by setting BRAINTRUST_API_KEY)."
    );
  } else if (apiKey === TEST_API_KEY) {
    const testOrgInfo = [
      {
        id: "test-org-id",
        name: "test-org-name",
        api_url: "https://braintrust.dev/fake-api-url"
      }
    ];
    state2.loggedIn = true;
    state2.loginToken = TEST_API_KEY;
    _saveOrgInfo(state2, testOrgInfo, testOrgInfo[0].name);
    return state2;
  } else {
    const resp = await checkResponse(
      await fetch2(_urljoin(state2.appUrl, `/api/apikey/login`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        }
      })
    );
    const info = await resp.json();
    _saveOrgInfo(state2, info.org_info, orgName);
    if (!state2.apiUrl) {
      if (orgName) {
        throw new Error(
          `Unable to log into organization '${orgName}'. Are you sure this credential is scoped to the organization?`
        );
      } else {
        throw new Error(
          "Unable to log into any organization with the provided credential."
        );
      }
    }
    conn = state2.apiConn();
    conn.set_token(apiKey);
    if (!conn) {
      throw new Error("Conn should be set at this point (a bug)");
    }
    conn.make_long_lived();
    state2.appConn().set_token(apiKey);
    if (state2.proxyUrl) {
      state2.proxyConn().set_token(apiKey);
    }
    state2.loginToken = conn.token;
    state2.loggedIn = true;
    state2.loginReplaceApiConn(conn);
  }
  return state2;
}
function currentExperiment(options) {
  const state2 = options?.state ?? _globalState;
  return state2.currentExperiment;
}
function currentLogger(options) {
  const state2 = options?.state ?? _globalState;
  return castLogger(state2.currentLogger, options?.asyncFlush);
}
function currentSpan(options) {
  const state2 = options?.state ?? _globalState;
  return state2.contextManager.getCurrentSpan() ?? NOOP_SPAN;
}
function getSpanParentObjectAndPropagatedState(options) {
  const state2 = options?.state ?? _globalState;
  const parentSpan = currentSpan({ state: state2 });
  if (!Object.is(parentSpan, NOOP_SPAN)) {
    return { parentObject: parentSpan, propagatedState: void 0 };
  }
  const parent = options?.parent ?? state2.currentParent.getStore();
  const { parentSlug, propagatedState } = normalizeParent(parent, state2);
  if (parentSlug) {
    return {
      parentObject: SpanComponentsV4.fromStr(parentSlug),
      propagatedState
    };
  }
  const experiment = currentExperiment();
  if (experiment) {
    return { parentObject: experiment, propagatedState: void 0 };
  }
  const logger = currentLogger(options);
  if (logger) {
    return { parentObject: logger, propagatedState: void 0 };
  }
  return { parentObject: NOOP_SPAN, propagatedState: void 0 };
}
function currentBraintrustParent(state2) {
  const resolvedState = state2 ?? _globalState;
  const experiment = currentExperiment({ state: resolvedState });
  if (experiment) {
    try {
      return experiment._getOtelParent() ?? void 0;
    } catch {
      return void 0;
    }
  }
  const logger = currentLogger({ state: resolvedState });
  if (logger) {
    try {
      return logger._getOtelParent() ?? void 0;
    } catch {
      return void 0;
    }
  }
  return void 0;
}
function braintrustParentToComponents(braintrustParent) {
  if (!braintrustParent) {
    return void 0;
  }
  if (braintrustParent.startsWith("project_id:")) {
    const objectId = braintrustParent.slice("project_id:".length);
    return objectId ? {
      objectType: 2 /* PROJECT_LOGS */,
      objectId,
      computeArgs: void 0
    } : void 0;
  }
  if (braintrustParent.startsWith("project_name:")) {
    const name = braintrustParent.slice("project_name:".length);
    return name ? {
      objectType: 2 /* PROJECT_LOGS */,
      objectId: void 0,
      computeArgs: { project_name: name }
    } : void 0;
  }
  if (braintrustParent.startsWith("experiment_id:")) {
    const objectId = braintrustParent.slice("experiment_id:".length);
    return objectId ? {
      objectType: 1 /* EXPERIMENT */,
      objectId,
      computeArgs: void 0
    } : void 0;
  }
  return void 0;
}
function isMutableHeaderTupleArray(carrier) {
  return Array.isArray(carrier) && carrier.every((item) => Array.isArray(item) && typeof item[0] === "string");
}
function setHeader(carrier, name, value) {
  if (isMutableHeaderTupleArray(carrier)) {
    const lowered2 = name.toLowerCase();
    for (let i = carrier.length - 1; i >= 0; i--) {
      if (carrier[i][0].toLowerCase() === lowered2) {
        carrier.splice(i, 1);
      }
    }
    carrier.push([name, value]);
    return;
  }
  const setter = carrier.set;
  if (typeof setter === "function") {
    const deleter = carrier.delete;
    if (typeof deleter === "function") {
      try {
        deleter.call(carrier, name);
      } catch {
      }
    }
    setter.call(carrier, name, value);
    return;
  }
  const nodeSetter = carrier.setHeader;
  if (typeof nodeSetter === "function") {
    const remover = carrier.removeHeader;
    if (typeof remover === "function") {
      try {
        remover.call(carrier, name);
      } catch {
      }
    }
    nodeSetter.call(carrier, name, value);
    return;
  }
  const headerSetter = carrier.header;
  if (typeof headerSetter === "function") {
    const deleter = carrier.delete;
    if (typeof deleter === "function") {
      try {
        deleter.call(carrier, name);
      } catch {
      }
    }
    const remover = carrier.removeHeader;
    if (typeof remover === "function") {
      try {
        remover.call(carrier, name);
      } catch {
      }
    }
    headerSetter.call(carrier, name, value);
    return;
  }
  const headerBag = carrier;
  const lowered = name.toLowerCase();
  for (const key of Object.keys(headerBag)) {
    if (key !== name && key.toLowerCase() === lowered) {
      delete headerBag[key];
    }
  }
  headerBag[name] = value;
}
function deleteHeader(carrier, name) {
  const lowered = name.toLowerCase();
  if (isMutableHeaderTupleArray(carrier)) {
    for (let i = carrier.length - 1; i >= 0; i--) {
      if (carrier[i][0].toLowerCase() === lowered) {
        carrier.splice(i, 1);
      }
    }
    return;
  }
  const deleter = carrier.delete;
  if (typeof deleter === "function") {
    try {
      deleter.call(carrier, name);
      return;
    } catch {
    }
  }
  const remover = carrier.removeHeader;
  if (typeof remover === "function") {
    try {
      remover.call(carrier, name);
      return;
    } catch {
    }
  }
  const headerBag = carrier;
  for (const key of Object.keys(headerBag)) {
    if (key.toLowerCase() === lowered) {
      delete headerBag[key];
    }
  }
}
function _injectIntoCarrier(carrier, args) {
  const traceFlags = args.propagatedState?.traceFlags;
  const traceparent = traceFlags ? formatTraceparent(args.traceId, args.spanId, traceFlags) : formatTraceparent(args.traceId, args.spanId);
  if (traceparent === void 0) {
    return;
  }
  setHeader(carrier, TRACEPARENT_HEADER, traceparent);
  const tracestate = args.propagatedState?.tracestate;
  if (tracestate) {
    setHeader(carrier, TRACESTATE_HEADER, tracestate);
  }
  const existing = getHeader(carrier, BAGGAGE_HEADER);
  const baggageValue = mergeBaggage(existing, args.braintrustParent);
  if (baggageValue !== void 0) {
    setHeader(carrier, BAGGAGE_HEADER, baggageValue);
  } else if (existing !== void 0) {
    deleteHeader(carrier, BAGGAGE_HEADER);
  }
}
function resolveW3cParent(context, state2) {
  const traceparent = getHeader(context, TRACEPARENT_HEADER);
  const parsed = traceparent ? parseTraceparent(traceparent) : void 0;
  if (parsed === void 0) {
    return { parentSlug: void 0, propagatedState: void 0 };
  }
  const { traceId, spanId, traceFlags } = parsed;
  let braintrustParent = void 0;
  const baggageValue = getHeader(context, BAGGAGE_HEADER);
  if (baggageValue) {
    braintrustParent = parseBaggage(baggageValue)[BRAINTRUST_PARENT_KEY];
  }
  if (!braintrustParent) {
    braintrustParent = currentBraintrustParent(state2);
  }
  if (!braintrustParent) {
    debugLogger.warn(
      "Received traceparent without a braintrust.parent and no active logger/experiment; cannot route the trace. Starting a fresh local span instead."
    );
    return { parentSlug: void 0, propagatedState: void 0 };
  }
  const parsedParent = braintrustParentToComponents(braintrustParent);
  if (parsedParent === void 0) {
    debugLogger.warn(
      `Invalid braintrust.parent: ${JSON.stringify(braintrustParent)}`
    );
    return { parentSlug: void 0, propagatedState: void 0 };
  }
  const { objectType, objectId, computeArgs } = parsedParent;
  const tracestate = getHeader(context, TRACESTATE_HEADER);
  const slug = new SpanComponentsV4({
    object_type: objectType,
    ...computeArgs ? { compute_object_metadata_args: computeArgs } : { object_id: objectId },
    row_id: "bt-propagation",
    // non-empty to enable span_id/root_span_id
    span_id: spanId,
    root_span_id: traceId
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  }).toStr();
  return {
    parentSlug: slug,
    propagatedState: { tracestate, traceFlags, braintrustParent }
  };
}
function normalizeParent(parent, state2) {
  if (parent && typeof parent === "object") {
    return resolveW3cParent(parent, state2);
  }
  return {
    parentSlug: parent ?? void 0,
    propagatedState: void 0
  };
}
function parentSpanIdsUsable(spanId, rootSpanId) {
  return Boolean(spanId) && Boolean(rootSpanId);
}
function logError(span, error) {
  let errorMessage = "<error>";
  let stackTrace = "";
  if (error instanceof Error) {
    errorMessage = error.message;
    stackTrace = error.stack || "";
  } else {
    errorMessage = String(error);
  }
  span.log({ error: `${errorMessage}

${stackTrace}` });
}
function startSpan(args) {
  return startSpanAndIsLogger(args).span;
}
function startSpanAndIsLogger(args) {
  const state2 = args?.state ?? _globalState;
  const { parentObject, propagatedState } = getSpanParentObjectAndPropagatedState({
    asyncFlush: args?.asyncFlush,
    parent: args?.parent,
    state: state2
  });
  if (parentObject instanceof SpanComponentsV3 || parentObject instanceof SpanComponentsV4) {
    const parentSpanIds = parentObject.data.row_id && parentSpanIdsUsable(
      parentObject.data.span_id,
      parentObject.data.root_span_id
    ) ? {
      spanId: parentObject.data.span_id,
      rootSpanId: parentObject.data.root_span_id
    } : void 0;
    const { parent: _ignoredParent, ...spanArgs } = args ?? {};
    const span = new SpanImpl({
      state: state2,
      ...spanArgs,
      parentObjectType: parentObject.data.object_type,
      parentObjectId: new LazyValue(
        spanComponentsToObjectIdLambda(state2, parentObject)
      ),
      parentComputeObjectMetadataArgs: parentObject.data.compute_object_metadata_args ?? void 0,
      parentSpanIds,
      propagatedEvent: args?.propagatedEvent ?? // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      (parentObject.data.propagated_event ?? void 0),
      propagatedState
    });
    return {
      span,
      isSyncFlushLogger: parentObject.data.object_type === 2 /* PROJECT_LOGS */ && // Since there's no parent logger here, we're free to choose the async flush
      // behavior, and therefore propagate along whatever we get from the arguments
      args?.asyncFlush === false
    };
  } else {
    const span = parentObject.startSpan(args);
    return {
      span,
      isSyncFlushLogger: parentObject.kind === "logger" && parentObject.asyncFlush === false
    };
  }
}
function withCurrent(span, callback, state2 = void 0) {
  const currentState = state2 ?? _globalState;
  return currentState.contextManager.runInContext(span, () => callback(span));
}
function _saveOrgInfo(state2, org_info, org_name) {
  if (org_info.length === 0) {
    throw new LoginInvalidOrgError(
      "This user is not part of any organizations."
    );
  }
  for (const org of org_info) {
    if (org_name === void 0 || org.name === org_name) {
      state2.orgId = org.id;
      state2.orgName = org.name;
      state2.apiUrl = isomorph_default.getEnv("BRAINTRUST_API_URL") ?? org.api_url;
      state2.proxyUrl = isomorph_default.getEnv("BRAINTRUST_PROXY_URL") ?? org.proxy_url;
      state2.gitMetadataSettings = org.git_metadata || void 0;
      break;
    }
  }
  if (state2.orgId === void 0) {
    throw new LoginInvalidOrgError(
      `Organization ${org_name} not found. Must be one of ${org_info.map((x) => x.name).join(", ")}`
    );
  }
}
function validateTags(tags) {
  const seen = /* @__PURE__ */ new Set();
  for (const tag of tags) {
    if (typeof tag !== "string") {
      throw new Error("tags must be strings");
    }
    if (seen.has(tag)) {
      throw new Error(`duplicate tag: ${tag}`);
    }
    seen.add(tag);
  }
}
function validateAndSanitizeExperimentLogPartialArgs(event) {
  if (event.scores) {
    if (Array.isArray(event.scores)) {
      throw new Error("scores must be an object, not an array");
    }
    for (const [name, rawScore] of Object.entries(event.scores)) {
      let score = rawScore;
      if (typeof name !== "string") {
        throw new Error("score names must be strings");
      }
      if (score === null || score === void 0) {
        continue;
      }
      if (typeof score === "boolean") {
        score = score ? 1 : 0;
        event.scores[name] = score;
      }
      if (typeof score !== "number") {
        throw new Error("score values must be numbers");
      }
      if (score < 0 || score > 1) {
        throw new Error("score values must be between 0 and 1");
      }
    }
  }
  if (event.metadata) {
    for (const key of Object.keys(event.metadata)) {
      if (typeof key !== "string") {
        throw new Error("metadata keys must be strings");
      }
    }
  }
  if (event.metrics) {
    for (const [key, value] of Object.entries(event.metrics)) {
      if (typeof key !== "string") {
        throw new Error("metric keys must be strings");
      }
      if (value !== void 0 && typeof value !== "number") {
        throw new Error("metric values must be numbers");
      }
    }
  }
  if ("input" in event && event.input && "inputs" in event && event.inputs) {
    throw new Error(
      "Only one of input or inputs (deprecated) can be specified. Prefer input."
    );
  }
  if ("tags" in event && event.tags) {
    validateTags(event.tags);
  }
  if ("inputs" in event) {
    const { inputs, ...rest } = event;
    return { input: inputs, ...rest };
  } else {
    return { ...event };
  }
}
function deepCopyEvent(event) {
  const attachments = [];
  const ATTACHMENT_INDEX_KEY = "_bt_internal_saved_attachment_idx";
  const ATTACHMENT_MARKER_KEY = "_bt_internal_saved_attachment_marker";
  const attachmentMarker = ++deepCopyEventMarkerCounter;
  const serialized = JSON.stringify(event, (_k, v) => {
    if (v instanceof Error) {
      return v.message;
    } else if (v instanceof SpanImpl || v instanceof NoopSpan) {
      return `<span>`;
    } else if (v instanceof Experiment2) {
      return `<experiment>`;
    } else if (v instanceof Dataset2) {
      return `<dataset>`;
    } else if (v instanceof Logger) {
      return `<logger>`;
    } else if (v instanceof BaseAttachment) {
      const idx = attachments.push(v);
      return {
        [ATTACHMENT_INDEX_KEY]: idx - 1,
        [ATTACHMENT_MARKER_KEY]: attachmentMarker
      };
    } else if (v instanceof ReadonlyAttachment) {
      return v.reference;
    }
    return v;
  });
  const x = JSON.parse(serialized, (_k, v) => {
    if (isDeepCopyAttachmentPlaceholder(v, attachmentMarker)) {
      return attachments[v[ATTACHMENT_INDEX_KEY]];
    }
    return v;
  });
  return x;
}
var deepCopyEventMarkerCounter = 0;
function isDeepCopyAttachmentPlaceholder(value, attachmentMarker) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const record = value;
  if (!Object.hasOwn(record, "_bt_internal_saved_attachment_idx") || !Object.hasOwn(record, "_bt_internal_saved_attachment_marker")) {
    return false;
  }
  if (Object.keys(record).length !== 2) {
    return false;
  }
  const attachmentIndex = record._bt_internal_saved_attachment_idx;
  const marker = record._bt_internal_saved_attachment_marker;
  return Number.isInteger(attachmentIndex) && attachmentIndex >= 0 && marker === attachmentMarker;
}
function extractAttachments(event, attachments) {
  for (const [key, value] of Object.entries(event)) {
    if (!value) {
      continue;
    }
    if (value instanceof BaseAttachment) {
      attachments.push(value);
      event[key] = value.reference;
      continue;
    }
    if (value?.type === BRAINTRUST_ATTACHMENT && value.key && !value.uploader) {
      continue;
    }
    if (value?.reference?.type === BRAINTRUST_ATTACHMENT && value?.uploader) {
      const attachment = new Attachment({
        data: value.dataDebugString,
        filename: value.reference.filename,
        contentType: value.reference.content_type
      });
      attachments.push(attachment);
      event[key] = attachment.reference;
      continue;
    }
    if (!(value instanceof Object)) {
      continue;
    }
    extractAttachments(value, attachments);
  }
}
function enrichAttachments(event, state2) {
  for (const [key, value] of Object.entries(event)) {
    const parsedValue = AttachmentReference.safeParse(value);
    if (parsedValue.success) {
      event[key] = new ReadonlyAttachment(parsedValue.data, state2);
      continue;
    }
    if (!(value instanceof Object)) {
      continue;
    }
    enrichAttachments(value, state2);
  }
  return event;
}
function validateAndSanitizeExperimentLogFullArgs(event, hasDataset) {
  if ("input" in event && !isEmpty2(event.input) && "inputs" in event && !isEmpty2(event.inputs) || !("input" in event) && !("inputs" in event)) {
    throw new Error(
      "Exactly one of input or inputs (deprecated) must be specified. Prefer input."
    );
  }
  if (isEmpty2(event.output)) {
    throw new Error("output must be specified");
  }
  if (isEmpty2(event.scores)) {
    throw new Error("scores must be specified");
  }
  if (hasDataset && event.datasetRecordId === void 0) {
    throw new Error("datasetRecordId must be specified when using a dataset");
  } else if (!hasDataset && event.datasetRecordId !== void 0) {
    throw new Error(
      "datasetRecordId cannot be specified when not using a dataset"
    );
  }
  return event;
}
var DEFAULT_FETCH_BATCH_SIZE = 1e3;
var MAX_BTQL_ITERATIONS = 1e4;
var ObjectFetcher = class {
  constructor(objectType, pinnedVersion, mutateRecord, _internal_btql, _internalBrainstoreRealtime = true) {
    this.objectType = objectType;
    this.pinnedVersion = pinnedVersion;
    this.mutateRecord = mutateRecord;
    this._internal_btql = _internal_btql;
    this._internalBrainstoreRealtime = _internalBrainstoreRealtime;
  }
  objectType;
  pinnedVersion;
  mutateRecord;
  _internal_btql;
  _internalBrainstoreRealtime;
  _fetchedData = void 0;
  get id() {
    throw new Error("ObjectFetcher subclasses must have an 'id' attribute");
  }
  async getState() {
    throw new Error("ObjectFetcher subclasses must have a 'getState' method");
  }
  getPinnedVersion() {
    return this.pinnedVersion;
  }
  setPinnedVersion(pinnedVersion) {
    this.pinnedVersion = pinnedVersion;
  }
  getInternalBtql() {
    return this._internal_btql;
  }
  async *fetchRecordsFromApi(batchSize) {
    const state2 = await this.getState();
    const objectId = await this.id;
    const batchLimit = batchSize ?? DEFAULT_FETCH_BATCH_SIZE;
    const internalLimit = getInternalBtqlLimit(this._internal_btql);
    const limit = batchSize !== void 0 ? batchSize : internalLimit ?? batchLimit;
    const internalBtqlWithoutReservedQueryKeys = Object.fromEntries(
      Object.entries(this._internal_btql ?? {}).filter(
        ([key]) => key !== "cursor" && key !== "limit" && key !== "select" && key !== "from"
      )
    );
    let cursor = void 0;
    let iterations = 0;
    while (true) {
      const resp = await state2.apiConn().post(
        `btql`,
        {
          query: {
            select: [
              {
                op: "star"
              }
            ],
            from: {
              op: "function",
              name: {
                op: "ident",
                name: [this.objectType]
              },
              args: [
                {
                  op: "literal",
                  value: objectId
                }
              ]
            },
            cursor,
            limit,
            ...internalBtqlWithoutReservedQueryKeys
          },
          use_columnstore: false,
          brainstore_realtime: this._internalBrainstoreRealtime,
          query_source: `js_sdk_object_fetcher_${this.objectType}`,
          ...this.pinnedVersion !== void 0 ? {
            version: this.pinnedVersion
          } : {}
        },
        { headers: { "Accept-Encoding": "gzip" } },
        BTQL_HTTP_RETRIES
      );
      const respJson = await resp.json();
      const mutate = this.mutateRecord;
      for (const record of respJson.data ?? []) {
        yield mutate ? mutate(record) : record;
      }
      if (!respJson.cursor) {
        break;
      }
      cursor = respJson.cursor;
      iterations++;
      if (iterations > MAX_BTQL_ITERATIONS) {
        throw new Error("Too many BTQL iterations");
      }
    }
  }
  /**
   * Fetch all records from the object.
   *
   * @param options Optional parameters for fetching.
   * @param options.batchSize The number of records to fetch per request. Defaults to 1000.
   * @returns An async generator of records.
   */
  async *fetch(options) {
    if (this._fetchedData !== void 0) {
      for (const record of this._fetchedData) {
        yield record;
      }
      return;
    }
    for await (const record of this.fetchRecordsFromApi(options?.batchSize)) {
      yield record;
    }
  }
  [Symbol.asyncIterator]() {
    return this.fetch();
  }
  async fetchedData(options) {
    if (this._fetchedData === void 0) {
      const data = [];
      for await (const record of this.fetchRecordsFromApi(options?.batchSize)) {
        data.push(record);
      }
      this._fetchedData = data;
    }
    return this._fetchedData || [];
  }
  clearCache() {
    this._fetchedData = void 0;
  }
  async version(options) {
    if (this.pinnedVersion !== void 0) {
      return this.pinnedVersion;
    } else {
      let maxVersion = void 0;
      for await (const record of this.fetch(options)) {
        const xactId = String(record[TRANSACTION_ID_FIELD] ?? "0");
        if (maxVersion === void 0 || xactId > maxVersion) {
          maxVersion = xactId;
        }
      }
      return maxVersion;
    }
  }
};
var Experiment2 = class extends ObjectFetcher {
  lazyMetadata;
  dataset;
  lastStartTime;
  lazyId;
  calledStartSpan;
  state;
  // For type identification.
  kind = "experiment";
  constructor(state2, lazyMetadata, dataset) {
    super("experiment", void 0, (r) => enrichAttachments(r, state2));
    this.lazyMetadata = lazyMetadata;
    this.dataset = dataset;
    this.lastStartTime = getCurrentUnixTimestamp();
    this.lazyId = new LazyValue(async () => await this.id);
    this.calledStartSpan = false;
    this.state = state2;
  }
  get id() {
    return (async () => {
      return (await this.lazyMetadata.get()).experiment.id;
    })();
  }
  get loggingState() {
    return this.state;
  }
  /**
   * Wait for the experiment ID to be resolved. This is useful for ensuring the ID
   * is available synchronously in child spans (for OTEL parent attributes).
   * @internal
   */
  async _waitForId() {
    await this.lazyId.get().catch(() => {
    });
  }
  get name() {
    return (async () => {
      return (await this.lazyMetadata.get()).experiment.name;
    })();
  }
  get project() {
    return (async () => {
      return (await this.lazyMetadata.get()).project;
    })();
  }
  async _getBaseExperimentId() {
    const baseExperimentId = (await this.lazyMetadata.get()).experiment.fullInfo["base_exp_id"];
    return typeof baseExperimentId === "string" && baseExperimentId ? baseExperimentId : void 0;
  }
  parentObjectType() {
    return 1 /* EXPERIMENT */;
  }
  async getState() {
    await this.lazyMetadata.get();
    return this.state;
  }
  /**
   * Log a single event to the experiment. The event will be batched and uploaded behind the scenes.
   *
   * @param event The event to log.
   * @param event.input: The arguments that uniquely define a test case (an arbitrary, JSON serializable object). Later on, Braintrust will use the `input` to know whether two test cases are the same between experiments, so they should not contain experiment-specific state. A simple rule of thumb is that if you run the same experiment twice, the `input` should be identical.
   * @param event.output: The output of your application, including post-processing (an arbitrary, JSON serializable object), that allows you to determine whether the result is correct or not. For example, in an app that generates SQL queries, the `output` should be the _result_ of the SQL query generated by the model, not the query itself, because there may be multiple valid queries that answer a single question.
   * @param event.expected: (Optional) The ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not. Braintrust currently does not compare `output` to `expected` for you, since there are so many different ways to do that correctly. Instead, these values are just used to help you navigate your experiments while digging into analyses. However, we may later use these values to re-score outputs or fine-tune your models.
   * @param event.error: (Optional) The error that occurred, if any. If you use tracing to run an experiment, errors are automatically logged when your code throws an exception.
   * @param event.scores: A dictionary of numeric values (between 0 and 1) to log. The scores should give you a variety of signals that help you determine how accurate the outputs are compared to what you expect and diagnose failures. For example, a summarization app might have one score that tells you how accurate the summary is, and another that measures the word similarity between the generated and grouth truth summary. The word similarity score could help you determine whether the summarization was covering similar concepts or not. You can use these scores to help you sort, filter, and compare experiments.
   * @param event.metadata: (Optional) a dictionary with additional data about the test example, model outputs, or just about anything else that's relevant, that you can use to help find and analyze examples later. For example, you could log the `prompt`, example's `id`, or anything else that would be useful to slice/dice later. The values in `metadata` can be any JSON-serializable type, but its keys must be strings.
   * @param event.metrics: (Optional) a dictionary of metrics to log. The following keys are populated automatically: "start", "end".
   * @param event.id: (Optional) a unique identifier for the event. If you don't provide one, BrainTrust will generate one for you.
   * @param event.dataset_record_id: (Optional) the id of the dataset record that this event is associated with. This field is required if and only if the experiment is associated with a dataset. This field is unused and will be removed in a future version.
   * @param options Additional logging options
   * @param options.allowConcurrentWithSpans in rare cases where you need to log at the top level separately from spans on the experiment elsewhere, set this to true.
   * @returns The `id` of the logged event.
   */
  log(event, options) {
    if (this.calledStartSpan && !options?.allowConcurrentWithSpans) {
      throw new Error(
        "Cannot run toplevel `log` method while using spans. To log to the span, call `experiment.traced` and then log with `span.log`"
      );
    }
    event = validateAndSanitizeExperimentLogFullArgs(event, !!this.dataset);
    const span = this.startSpanImpl({ startTime: this.lastStartTime, event });
    this.lastStartTime = span.end();
    return span.id;
  }
  /**
   * Create a new toplevel span underneath the experiment. The name defaults to "root".
   *
   * See {@link Span.traced} for full details.
   */
  traced(callback, args) {
    const { setCurrent, ...argsRest } = args ?? {};
    const span = this.startSpan(argsRest);
    const ret = runCatchFinally(
      () => {
        if (setCurrent ?? true) {
          return withCurrent(span, callback);
        } else {
          return callback(span);
        }
      },
      (e) => {
        logError(span, e);
        throw e;
      },
      () => span.end()
    );
    return ret;
  }
  /**
   * Lower-level alternative to `traced`. This allows you to start a span yourself, and can be useful in situations
   * where you cannot use callbacks. However, spans started with `startSpan` will not be marked as the "current span",
   * so `currentSpan()` and `traced()` will be no-ops. If you want to mark a span as current, use `traced` instead.
   *
   * See {@link traced} for full details.
   */
  startSpan(args) {
    this.calledStartSpan = true;
    return this.startSpanImpl(args);
  }
  startSpanImpl(args) {
    return new SpanImpl({
      ...args,
      // Sometimes `args` gets passed directly into this function, and it contains an undefined value for `state`.
      // To ensure that we always use this experiment's state, we override the `state` argument no matter what.
      state: this.state,
      ...startSpanParentArgs({
        state: this.state,
        parent: args?.parent,
        parentObjectType: this.parentObjectType(),
        parentObjectId: this.lazyId,
        parentComputeObjectMetadataArgs: void 0,
        parentSpanIds: void 0,
        propagatedEvent: args?.propagatedEvent
      }),
      defaultRootType: "eval" /* EVAL */
    });
  }
  async fetchBaseExperiment() {
    const state2 = await this.getState();
    const conn = state2.appConn();
    try {
      const resp = await conn.post("/api/base_experiment/get_id", {
        id: await this.id
      });
      const base = await resp.json();
      return {
        id: base["base_exp_id"],
        name: base["base_exp_name"]
      };
    } catch (e) {
      if (e instanceof FailedHTTPResponse && e.status === 400) {
        return null;
      } else {
        throw e;
      }
    }
  }
  /**
   * Summarize the experiment, including the scores (compared to the closest reference experiment) and metadata.
   *
   * @param options Options for summarizing the experiment.
   * @param options.summarizeScores Whether to summarize the scores. If False, only the metadata will be returned.
   * @param options.comparisonExperimentId The experiment to compare against. If None, the most recent experiment on the origin's main branch will be used.
   * @returns A summary of the experiment, including the scores (compared to the closest reference experiment) and metadata.
   */
  async summarize(options = {}) {
    const {
      summarizeScores = true,
      comparisonExperimentId: comparisonExperimentIdOpt
    } = options || {};
    let comparisonExperimentId = comparisonExperimentIdOpt;
    const state2 = await this.getState();
    const projectUrl = `${state2.appPublicUrl}/app/${encodeURIComponent(
      state2.orgName
    )}/p/${encodeURIComponent((await this.project).name)}`;
    const experimentUrl = `${projectUrl}/experiments/${encodeURIComponent(
      await this.name
    )}`;
    let scores = void 0;
    let metrics = void 0;
    let comparisonExperimentName = void 0;
    if (summarizeScores) {
      await this.flush();
      if (comparisonExperimentId === void 0) {
        const baseExperiment = await this.fetchBaseExperiment();
        if (baseExperiment !== null) {
          comparisonExperimentId = baseExperiment.id;
          comparisonExperimentName = baseExperiment.name;
        }
      } else {
        try {
          const comparisonExperiment = await state2.apiConn().get_json(`v1/experiment/${comparisonExperimentId}`);
          if (typeof comparisonExperiment["name"] === "string") {
            comparisonExperimentName = comparisonExperiment["name"];
          }
        } catch {
        }
      }
      try {
        const results = await state2.apiConn().get_json(
          "/experiment-comparison2",
          {
            experiment_id: await this.id,
            base_experiment_id: comparisonExperimentId
          },
          3
        );
        scores = results["scores"];
        metrics = results["metrics"];
      } catch (e) {
        debugLogger.forState(state2).warn(
          `Failed to fetch experiment scores and metrics: ${e}

View complete results in Braintrust or run experiment.summarize() again.`
        );
        scores = {};
        metrics = {};
      }
    }
    return {
      projectName: (await this.project).name,
      experimentName: await this.name,
      projectId: (await this.project).id,
      experimentId: await this.id,
      projectUrl,
      experimentUrl,
      comparisonExperimentName,
      scores: scores ?? {},
      metrics: metrics ?? {}
    };
  }
  /**
   * Log feedback to an event in the experiment. Feedback is used to save feedback scores, set an expected value, or add a comment.
   *
   * @param event
   * @param event.id The id of the event to log feedback for. This is the `id` returned by `log` or accessible as the `id` field of a span.
   * @param event.scores (Optional) a dictionary of numeric values (between 0 and 1) to log. These scores will be merged into the existing scores for the event.
   * @param event.expected (Optional) the ground truth value (an arbitrary, JSON serializable object) that you'd compare to `output` to determine if your `output` value is correct or not.
   * @param event.comment (Optional) an optional comment string to log about the event.
   * @param event.metadata (Optional) a dictionary with additional data about the feedback. If you have a `user_id`, you can log it here and access it in the Braintrust UI. Note, this metadata does not correspond to the main event itself, but rather the audit log attached to the event.
   * @param event.source (Optional) the source of the feedback. Must be one of "external" (default), "app", or "api".
   */
  logFeedback(event) {
    logFeedbackImpl(this.state, this.parentObjectType(), this.lazyId, event);
  }
  /**
   * Update a span in the experiment using its id. It is important that you only update a span once the original span has been fully written and flushed,
   * since otherwise updates to the span may conflict with the original span.
   *
   * @param event The event data to update the span with. Must include `id`. See {@link Experiment.log} for a full list of valid fields.
   */
  updateSpan(event) {
    const { id, root_span_id, span_id, ...eventRest } = event;
    if (!id) {
      throw new Error("Span id is required to update a span");
    }
    updateSpanImpl({
      state: this.state,
      parentObjectType: this.parentObjectType(),
      parentObjectId: this.lazyId,
      id,
      root_span_id,
      span_id,
      event: eventRest
    });
  }
  /**
   * Return a serialized representation of the experiment that can be used to start subspans in other places.
   *
   * See {@link Span.startSpan} for more details.
   */
  async export() {
    return new (getSpanComponentsClass())({
      object_type: this.parentObjectType(),
      object_id: await this.id
    }).toStr();
  }
  /**
   * Return this experiment's Braintrust parent string (`experiment_id:<id>`) for
   * the `braintrust.parent` baggage entry, or undefined when it cannot be
   * determined synchronously.
   */
  _getOtelParent() {
    const id = this.lazyId.getSync().value;
    return id ? `experiment_id:${id}` : void 0;
  }
  /**
   * Flush any pending rows to the server.
   */
  async flush() {
    return await this.state.bgLogger().flush();
  }
  /**
   * @deprecated This function is deprecated. You can simply remove it from your code.
   */
  async close() {
    debugLogger.forState(this.state).warn(
      "close is deprecated and will be removed in a future version of braintrust. It is now a no-op and can be removed"
    );
    return this.id;
  }
};
var executionCounter = 0;
function newId() {
  return uuidv42();
}
function _resolveSpanIds(spanId, parentSpanIds, lookupSpanParent, idGenerator, contextManager) {
  const resolvedSpanId = spanId ?? idGenerator.getSpanId();
  if (parentSpanIds) {
    return {
      spanId: resolvedSpanId,
      rootSpanId: parentSpanIds.rootSpanId,
      spanParents: "parentSpanIds" in parentSpanIds ? parentSpanIds.parentSpanIds : [parentSpanIds.spanId]
    };
  }
  if (lookupSpanParent) {
    const parentInfo = contextManager.getParentSpanIds();
    if (parentInfo) {
      return {
        spanId: resolvedSpanId,
        rootSpanId: parentInfo.rootSpanId,
        spanParents: parentInfo.spanParents
      };
    }
  }
  let resolvedRootSpanId;
  if (idGenerator.shareRootSpanId()) {
    resolvedRootSpanId = resolvedSpanId;
  } else {
    resolvedRootSpanId = idGenerator.getTraceId();
  }
  return {
    spanId: resolvedSpanId,
    rootSpanId: resolvedRootSpanId,
    spanParents: void 0
  };
}
var SpanImpl = class _SpanImpl {
  _state;
  isMerge;
  loggedEndTime;
  propagatedEvent;
  // For internal use only.
  parentObjectType;
  parentObjectId;
  parentComputeObjectMetadataArgs;
  _id;
  _spanId;
  _rootSpanId;
  _spanParents;
  // Inbound W3C trace-context state (tracestate + raw traceparent flags) to
  // forward on outbound propagation. Captured at the span that received it (via
  // extractTraceContextFromHeaders) and inherited by all subspans, so that any
  // inject() within the trace re-emits the upstream state unchanged, per the W3C
  // Trace Context spec. Not interpreted.
  _propagatedState;
  kind = "span";
  constructor(args) {
    this._state = args.state;
    this._propagatedState = args.propagatedState;
    const instrumentationName = getSpanInstrumentationName(args) ?? INSTRUMENTATION_NAMES.BRAINTRUST_JS_LOGGER;
    const spanAttributes = args.spanAttributes ?? {};
    const rawEvent = args.event ?? {};
    const type = args.type ?? (args.parentSpanIds ? void 0 : args.defaultRootType);
    this.loggedEndTime = void 0;
    this.parentObjectType = args.parentObjectType;
    this.parentObjectId = args.parentObjectId;
    this.parentComputeObjectMetadataArgs = args.parentComputeObjectMetadataArgs;
    this.propagatedEvent = args.propagatedEvent;
    if (this.propagatedEvent) {
      mergeDicts(rawEvent, this.propagatedEvent);
    }
    const { id: eventId, ...event } = rawEvent;
    const callerLocation = isomorph_default.getCallerLocation();
    const name = (() => {
      if (args.name) return args.name;
      if (!args.parentSpanIds) return "root";
      if (callerLocation) {
        const pathComponents = callerLocation.caller_filename.split("/");
        const filename = pathComponents[pathComponents.length - 1];
        return [callerLocation.caller_functionname].concat(
          filename ? [`${filename}:${callerLocation.caller_lineno}`] : []
        ).join(":");
      }
      return "subspan";
    })();
    const internalData = {
      metrics: {
        start: args.startTime ?? getCurrentUnixTimestamp()
      },
      context: mergeSpanOriginContext(
        { ...callerLocation, ...args[INTERNAL_SPAN_CONTEXT] },
        instrumentationName,
        this._state.spanOriginEnvironment
      ),
      span_attributes: {
        name,
        type,
        ...spanAttributes,
        exec_counter: executionCounter++
      },
      created: (/* @__PURE__ */ new Date()).toISOString()
    };
    this._id = eventId ?? this._state.idGenerator.getSpanId();
    const resolvedIds = _resolveSpanIds(
      args.spanId,
      args.parentSpanIds,
      true,
      // Always lookup span parent from context manager unless explicit parent provided
      this._state.idGenerator,
      this._state.contextManager
    );
    this._spanId = resolvedIds.spanId;
    this._rootSpanId = resolvedIds.rootSpanId;
    this._spanParents = resolvedIds.spanParents;
    this.isMerge = args[INITIAL_SPAN_WRITE_AS_MERGE] === true;
    this.logInternal({ event, internalData });
    this.isMerge = true;
  }
  getParentInfo() {
    return {
      objectType: this.parentObjectType,
      objectId: this.parentObjectId,
      computeObjectMetadataArgs: this.parentComputeObjectMetadataArgs && {
        ...this.parentComputeObjectMetadataArgs
      }
    };
  }
  get id() {
    return this._id;
  }
  get spanId() {
    return this._spanId;
  }
  get rootSpanId() {
    return this._rootSpanId;
  }
  get spanParents() {
    return this._spanParents ?? [];
  }
  setAttributes(args) {
    this.logInternal({ internalData: { span_attributes: args } });
  }
  setSpanParents(parents) {
    this.logInternal({ internalData: { span_parents: parents } });
  }
  log(event) {
    this.logInternal({ event });
  }
  logInternal({
    event,
    internalData
  }) {
    const [serializableInternalData, lazyInternalData] = splitLoggingData({
      event,
      internalData
    });
    const partialRecord = deepCopyEvent({
      id: this.id,
      span_id: this._spanId,
      root_span_id: this._rootSpanId,
      span_parents: this._spanParents,
      ...serializableInternalData,
      [IS_MERGE_FIELD]: this.isMerge
    });
    if (typeof partialRecord.metrics?.end === "number") {
      this.loggedEndTime = partialRecord.metrics.end;
    }
    if (this.parentObjectType === 1 /* EXPERIMENT */) {
      const cachedSpan = {
        input: partialRecord.input,
        output: partialRecord.output,
        expected: partialRecord.expected,
        error: partialRecord.error,
        scores: partialRecord.scores,
        metrics: partialRecord.metrics,
        metadata: partialRecord.metadata,
        tags: partialRecord.tags,
        span_id: this._spanId,
        span_parents: this._spanParents,
        is_root: !this._spanParents || this._spanParents.length === 0,
        span_attributes: partialRecord.span_attributes
      };
      this._state.spanCache.queueWrite(
        this._rootSpanId,
        this._spanId,
        cachedSpan
      );
    }
    const computeRecord = async () => ({
      ...partialRecord,
      ...Object.fromEntries(
        await Promise.all(
          Object.entries(lazyInternalData).map(async ([key, value]) => [
            key,
            await value.get()
          ])
        )
      ),
      ...new SpanComponentsV3({
        object_type: this.parentObjectType,
        object_id: await this.parentObjectId.get()
      }).objectIdFields()
    });
    this._state.bgLogger().log([new LazyValue(computeRecord)]);
  }
  logFeedback(event) {
    logFeedbackImpl(this._state, this.parentObjectType, this.parentObjectId, {
      ...event,
      id: this.id
    });
  }
  traced(callback, args) {
    const { setCurrent, ...argsRest } = args ?? {};
    const span = this.startSpan(argsRest);
    return runCatchFinally(
      () => {
        if (setCurrent ?? true) {
          return withCurrent(span, callback);
        } else {
          return callback(span);
        }
      },
      (e) => {
        logError(span, e);
        throw e;
      },
      () => span.end()
    );
  }
  startSpan(args) {
    const parentSpanIds = args?.parent ? void 0 : { spanId: this._spanId, rootSpanId: this._rootSpanId };
    return new _SpanImpl({
      state: this._state,
      ...args,
      ...startSpanParentArgs({
        state: this._state,
        parent: args?.parent,
        parentObjectType: this.parentObjectType,
        parentObjectId: this.parentObjectId,
        parentComputeObjectMetadataArgs: this.parentComputeObjectMetadataArgs,
        parentSpanIds,
        propagatedEvent: args?.propagatedEvent ?? this.propagatedEvent,
        propagatedState: this._propagatedState
      })
    });
  }
  startSpanWithParents(spanId, spanParents, args) {
    const parentSpanIds = {
      parentSpanIds: spanParents,
      rootSpanId: this._rootSpanId
    };
    return new _SpanImpl({
      state: this._state,
      ...args,
      ...startSpanParentArgs({
        state: this._state,
        parent: args?.parent,
        parentObjectType: this.parentObjectType,
        parentObjectId: this.parentObjectId,
        parentComputeObjectMetadataArgs: this.parentComputeObjectMetadataArgs,
        parentSpanIds,
        propagatedEvent: args?.propagatedEvent ?? this.propagatedEvent,
        propagatedState: this._propagatedState
      }),
      spanId
    });
  }
  end(args) {
    let endTime;
    let internalData = {};
    if (!this.loggedEndTime) {
      endTime = args?.endTime ?? getCurrentUnixTimestamp();
      internalData = { metrics: { end: endTime } };
    } else {
      endTime = this.loggedEndTime;
    }
    this.logInternal({ internalData });
    return endTime;
  }
  async export() {
    this._state.spanCache.disable();
    return new (getSpanComponentsClass())({
      object_type: this.parentObjectType,
      ...this.parentComputeObjectMetadataArgs && !this.parentObjectId.hasSucceeded ? { compute_object_metadata_args: this.parentComputeObjectMetadataArgs } : { object_id: await this.parentObjectId.get() },
      row_id: this.id,
      span_id: this._spanId,
      root_span_id: this._rootSpanId,
      propagated_event: this.propagatedEvent
    }).toStr();
  }
  /**
   * Return this span's Braintrust parent string (`project_id:<id>`,
   * `project_name:<name>`, or `experiment_id:<id>`) for the `braintrust.parent`
   * baggage entry, or undefined when it cannot be determined synchronously.
   */
  _getOtelParent() {
    if (this.parentObjectType === 2 /* PROJECT_LOGS */) {
      const id = this.parentComputeObjectMetadataArgs?.project_id || this.parentObjectId.getSync().value;
      const name = this.parentComputeObjectMetadataArgs?.project_name;
      if (id) {
        return `project_id:${id}`;
      } else if (name) {
        return `project_name:${name}`;
      }
    } else if (this.parentObjectType === 1 /* EXPERIMENT */) {
      const id = this.parentComputeObjectMetadataArgs?.experiment_id || this.parentObjectId.getSync().value;
      if (id) {
        return `experiment_id:${id}`;
      }
    }
    return void 0;
  }
  inject(carrier) {
    const resolvedCarrier = carrier ?? {};
    try {
      _injectIntoCarrier(resolvedCarrier, {
        traceId: this._rootSpanId,
        spanId: this._spanId,
        braintrustParent: this._getOtelParent() ?? this._propagatedState?.braintrustParent,
        propagatedState: this._propagatedState
      });
    } catch (e) {
      debugLogger.warn(`Error injecting trace context: ${e}`);
    }
    return resolvedCarrier;
  }
  async permalink() {
    return await permalink(await this.export(), {
      state: this._state
    });
  }
  link() {
    if (!this.id) {
      return NOOP_SPAN_PERMALINK;
    }
    try {
      let baseUrl = null;
      if (this.parentObjectType === 2 /* PROJECT_LOGS */) {
        const curLogger = this._state.currentLogger;
        if (curLogger) {
          baseUrl = curLogger._getLinkBaseUrl();
        }
      }
      if (!baseUrl) {
        baseUrl = _getLinkBaseUrl(this._state);
        if (!baseUrl) {
          throw new Error("log-in-or-provide-org-name");
        }
      }
      return this._link(baseUrl);
    } catch (e) {
      return getErrPermlink(e instanceof Error ? e.message : String(e));
    }
  }
  _link(baseUrl) {
    const args = this.parentComputeObjectMetadataArgs;
    switch (this.parentObjectType) {
      case 2 /* PROJECT_LOGS */: {
        const projectID = args?.project_id || this.parentObjectId.getSync().value;
        const projectName = args?.project_name;
        if (projectID) {
          return `${baseUrl}/object?object_type=project_logs&object_id=${projectID}&id=${this._id}`;
        } else if (projectName) {
          return `${baseUrl}/p/${projectName}/logs?oid=${this._id}`;
        } else {
          return getErrPermlink("provide-project-name-or-id");
        }
      }
      case 1 /* EXPERIMENT */: {
        const expID = args?.experiment_id || this.parentObjectId?.getSync()?.value;
        if (!expID) {
          return getErrPermlink("provide-experiment-id");
        } else {
          return `${baseUrl}/object?object_type=experiment&object_id=${expID}&id=${this._id}`;
        }
      }
      case 3 /* PLAYGROUND_LOGS */: {
        return NOOP_SPAN_PERMALINK;
      }
      default: {
        const _exhaustive = this.parentObjectType;
        _exhaustive;
        return NOOP_SPAN_PERMALINK;
      }
    }
  }
  async flush() {
    return await this._state.bgLogger().flush();
  }
  close(args) {
    return this.end(args);
  }
  state() {
    return this._state;
  }
  // Custom inspect for Node.js console.log
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return `SpanImpl {
  kind: '${this.kind}',
  id: '${this.id}',
  spanId: '${this.spanId}',
  rootSpanId: '${this.rootSpanId}',
  spanParents: ${JSON.stringify(this.spanParents)}
}`;
  }
  // Custom toString
  toString() {
    return `SpanImpl(id=${this.id}, spanId=${this.spanId})`;
  }
};
function splitLoggingData({
  event,
  internalData
}) {
  const sanitized = validateAndSanitizeExperimentLogPartialArgs(event ?? {});
  const sanitizedAndInternalData = {};
  mergeDicts(sanitizedAndInternalData, internalData || {});
  mergeDicts(sanitizedAndInternalData, sanitized);
  const serializableInternalData = {};
  const lazyInternalData = {};
  for (const [key, value] of Object.entries(sanitizedAndInternalData)) {
    if (value instanceof BraintrustStream) {
      const streamCopy = value.copy();
      lazyInternalData[key] = new LazyValue(async () => {
        return await new Promise((resolve, reject) => {
          streamCopy.toReadableStream().pipeThrough(createFinalValuePassThroughStream(resolve, reject)).pipeTo(devNullWritableStream());
        });
      });
    } else if (value instanceof ReadableStream) {
      lazyInternalData[key] = new LazyValue(async () => {
        return await new Promise((resolve, reject) => {
          value.pipeThrough(createFinalValuePassThroughStream(resolve, reject)).pipeTo(devNullWritableStream());
        });
      });
    } else {
      serializableInternalData[key] = value;
    }
  }
  return [serializableInternalData, lazyInternalData];
}
var Dataset2 = class extends ObjectFetcher {
  constructor(state2, lazyMetadata, pinnedVersion, legacy, _internal_btql, pinState) {
    const isLegacyDataset = legacy ?? DEFAULT_IS_LEGACY_DATASET;
    if (isLegacyDataset) {
      debugLogger.forState(state2).warn(
        `Records will be fetched from this dataset in the legacy format, with the "expected" field renamed to "output". Please update your code to use "expected", and use \`braintrust.initDataset()\` with \`{ useOutput: false }\`, which will become the default in a future version of Braintrust.`
      );
    }
    super(
      "dataset",
      pinnedVersion,
      (r) => (
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        ensureDatasetRecord(
          enrichAttachments(r, this.state),
          isLegacyDataset
        )
      ),
      _internal_btql
    );
    this.state = state2;
    void this.__braintrust_dataset_marker;
    this.lazyMetadata = lazyMetadata;
    this.lazyPinnedVersion = pinState?.lazyPinnedVersion;
    this.pinnedEnvironment = pinState?.pinnedEnvironment;
    this.pinnedSnapshotName = pinState?.pinnedSnapshotName;
  }
  state;
  lazyMetadata;
  __braintrust_dataset_marker = true;
  newRecords = 0;
  lazyPinnedVersion;
  pinnedEnvironment;
  pinnedSnapshotName;
  get id() {
    return (async () => {
      return (await this.lazyMetadata.get()).dataset.id;
    })();
  }
  get name() {
    return (async () => {
      return (await this.lazyMetadata.get()).dataset.name;
    })();
  }
  get project() {
    return (async () => {
      return (await this.lazyMetadata.get()).project;
    })();
  }
  get loggingState() {
    return this.state;
  }
  async toEvalData() {
    await this.getState();
    const metadata = await this.lazyMetadata.get();
    const pinnedVersion = this.getPinnedVersion();
    const internalBtql = this.getInternalBtql();
    return {
      dataset_id: metadata.dataset.id,
      ...this.pinnedEnvironment !== void 0 ? {
        dataset_environment: this.pinnedEnvironment
      } : {},
      ...this.pinnedEnvironment === void 0 && this.pinnedSnapshotName !== void 0 ? {
        dataset_snapshot_name: this.pinnedSnapshotName
      } : {},
      ...this.pinnedEnvironment === void 0 && this.pinnedSnapshotName === void 0 && pinnedVersion !== void 0 ? {
        dataset_version: pinnedVersion
      } : {},
      ...internalBtql !== void 0 ? { _internal_btql: internalBtql } : {}
    };
  }
  async getState() {
    await this.lazyMetadata.get();
    if (this.lazyPinnedVersion !== void 0 && this.getPinnedVersion() === void 0) {
      this.setPinnedVersion(await this.lazyPinnedVersion.get());
    }
    return this.state;
  }
  async version(options) {
    const pinnedVersion = this.getPinnedVersion();
    if (pinnedVersion !== void 0) {
      return pinnedVersion;
    }
    await this.getState();
    return await super.version(options);
  }
  validateEvent({
    metadata,
    expected,
    output,
    tags
  }) {
    if (metadata !== void 0) {
      for (const key of Object.keys(metadata)) {
        if (typeof key !== "string") {
          throw new Error("metadata keys must be strings");
        }
      }
    }
    if (expected !== void 0 && output !== void 0) {
      throw new Error(
        "Only one of expected or output (deprecated) can be specified. Prefer expected."
      );
    }
    if (tags) {
      validateTags(tags);
    }
  }
  createArgs({
    id,
    input,
    expected,
    metadata,
    tags,
    output,
    origin,
    isMerge
  }) {
    return new LazyValue(async () => {
      const dataset_id = await this.id;
      const expectedValue = expected === void 0 ? output : expected;
      const args = {
        id,
        input,
        expected: expectedValue,
        tags,
        dataset_id,
        created: !isMerge ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
        //if we're merging/updating an event we will not add this ts
        metadata,
        origin,
        ...!!isMerge ? {
          [IS_MERGE_FIELD]: true
        } : {}
      };
      return args;
    });
  }
  /**
   * Insert a single record to the dataset. The record will be batched and uploaded behind the scenes. If you pass in an `id`,
   * and a record with that `id` already exists, it will be overwritten (upsert).
   *
   * @param event The event to log.
   * @param event.input The argument that uniquely define an input case (an arbitrary, JSON serializable object).
   * @param event.expected The output of your application, including post-processing (an arbitrary, JSON serializable object).
   * @param event.tags (Optional) a list of strings that you can use to filter and group records later.
   * @param event.metadata (Optional) a dictionary with additional data about the test example, model outputs, or just
   * about anything else that's relevant, that you can use to help find and analyze examples later. For example, you could log the
   * `prompt`, example's `id`, or anything else that would be useful to slice/dice later. The values in `metadata` can be any
   * JSON-serializable type, but its keys must be strings.
   * @param event.origin (Optional) a reference to the source object this dataset record was derived from.
   * @param event.id (Optional) a unique identifier for the event. If you don't provide one, Braintrust will generate one for you.
   * @param event.output: (Deprecated) The output of your application. Use `expected` instead.
   * @returns The `id` of the logged record.
   */
  insert({
    input,
    expected,
    metadata,
    tags,
    id,
    output,
    origin
  }) {
    this.validateEvent({ metadata, expected, output, tags });
    const rowId = id || uuidv42();
    const args = this.createArgs(
      deepCopyEvent({
        id: rowId,
        input,
        expected,
        metadata,
        tags,
        output,
        origin,
        isMerge: false
      })
    );
    this.state.bgLogger().log([args]);
    this.newRecords++;
    return rowId;
  }
  /**
   * Update fields of a single record in the dataset. The updated fields will be batched and uploaded behind the scenes.
   * You must pass in an `id` of the record to update. Only the fields provided will be updated; other fields will remain unchanged.
   *
   * @param event The fields to update in the record.
   * @param event.id The unique identifier of the record to update.
   * @param event.input (Optional) The new input value for the record (an arbitrary, JSON serializable object).
   * @param event.expected (Optional) The new expected output value for the record (an arbitrary, JSON serializable object).
   * @param event.tags (Optional) A list of strings to update the tags of the record.
   * @param event.metadata (Optional) A dictionary to update the metadata of the record. The values in `metadata` can be any
   * JSON-serializable type, but its keys must be strings.
   * @returns The `id` of the updated record.
   */
  update({
    input,
    expected,
    metadata,
    tags,
    id
  }) {
    this.validateEvent({ metadata, expected, tags });
    const args = this.createArgs(
      deepCopyEvent({
        id,
        input,
        expected,
        metadata,
        tags,
        isMerge: true
      })
    );
    this.state.bgLogger().log([args]);
    return id;
  }
  delete(id) {
    const args = new LazyValue(async () => ({
      id,
      dataset_id: await this.id,
      created: (/* @__PURE__ */ new Date()).toISOString(),
      _object_delete: true
    }));
    this.state.bgLogger().log([args]);
    return id;
  }
  async createSnapshot({
    name,
    description,
    update
  }) {
    await this.flush();
    const state2 = await this.getState();
    const datasetId = await this.id;
    const currentVersion = await this.version();
    if (currentVersion === void 0) {
      throw new Error("Cannot create snapshot: dataset has no version");
    }
    const response = await state2.appConn().post_json("api/dataset_snapshot/register", {
      dataset_id: datasetId,
      dataset_snapshot_name: name,
      description,
      xact_id: currentVersion,
      update
    });
    return datasetSnapshotRegisterResponseSchema.parse(response).dataset_snapshot;
  }
  async listSnapshots() {
    const state2 = await this.getState();
    return await getDatasetSnapshots({
      state: state2,
      datasetId: await this.id
    });
  }
  async getSnapshot(lookup) {
    const state2 = await this.getState();
    const datasetId = await this.id;
    return await getDatasetSnapshot({
      state: state2,
      datasetId,
      ...lookup
    });
  }
  async updateSnapshot(snapshotId, {
    name,
    description
  }) {
    const state2 = await this.getState();
    return DatasetSnapshot.parse(
      await state2.appConn().post_json("api/dataset_snapshot/patch_id", {
        id: snapshotId,
        name,
        description
      })
    );
  }
  async deleteSnapshot(snapshotId) {
    const state2 = await this.getState();
    return DatasetSnapshot.parse(
      await state2.appConn().post_json("api/dataset_snapshot/delete_id", {
        id: snapshotId
      })
    );
  }
  async restorePreview({
    version
  }) {
    await this.flush();
    const state2 = await this.getState();
    const datasetId = await this.id;
    return datasetRestorePreviewResultSchema.parse(
      await state2.apiConn().post_json(`v1/dataset/${datasetId}/restore/preview`, {
        version
      })
    );
  }
  async restore({
    version
  }) {
    await this.flush();
    const state2 = await this.getState();
    const datasetId = await this.id;
    return datasetRestoreResultSchema.parse(
      await state2.apiConn().post_json(`v1/dataset/${datasetId}/restore`, {
        version
      })
    );
  }
  /**
   * Summarize the dataset, including high level metrics about its size and other metadata.
   * @param summarizeData Whether to summarize the data. If false, only the metadata will be returned.
   * @returns `DatasetSummary`
   * @returns A summary of the dataset.
   */
  async summarize(options = {}) {
    const { summarizeData = true } = options || {};
    await this.flush();
    const state2 = await this.getState();
    const projectUrl = `${state2.appPublicUrl}/app/${encodeURIComponent(
      state2.orgName
    )}/p/${encodeURIComponent((await this.project).name)}`;
    const datasetUrl = `${projectUrl}/datasets/${encodeURIComponent(
      await this.name
    )}`;
    let dataSummary;
    if (summarizeData) {
      const rawDataSummary = z8.object({
        total_records: z8.number()
      }).parse(
        await state2.apiConn().get_json(
          "dataset-summary",
          {
            dataset_id: await this.id
          },
          3
        )
      );
      dataSummary = {
        newRecords: this.newRecords,
        totalRecords: rawDataSummary.total_records
      };
    }
    return {
      projectName: (await this.project).name,
      datasetName: await this.name,
      projectUrl,
      datasetUrl,
      dataSummary
    };
  }
  /**
   * Flush any pending rows to the server.
   */
  async flush() {
    return await this.state.bgLogger().flush();
  }
  /**
   * @deprecated This function is deprecated. You can simply remove it from your code.
   */
  async close() {
    debugLogger.forState(this.state).warn(
      "close is deprecated and will be removed in a future version of braintrust. It is now a no-op and can be removed"
    );
    return this.id;
  }
  static isDataset(data) {
    return typeof data === "object" && data !== null && "__braintrust_dataset_marker" in data;
  }
};
var TEST_API_KEY = "___TEST_API_KEY__THIS_IS_NOT_REAL___";

// src/wrappers/mastra.ts
var MASTRA_BRAINTRUST_EXPORTER_NAME = "braintrust";
var SPAN_TYPE_MAP = {
  agent_run: "task" /* TASK */,
  model_generation: "llm" /* LLM */,
  model_step: "llm" /* LLM */,
  model_chunk: "llm" /* LLM */,
  tool_call: "tool" /* TOOL */,
  mcp_tool_call: "tool" /* TOOL */,
  workflow_run: "task" /* TASK */,
  workflow_step: "function" /* FUNCTION */,
  workflow_conditional: "function" /* FUNCTION */,
  workflow_conditional_eval: "function" /* FUNCTION */,
  workflow_parallel: "function" /* FUNCTION */,
  workflow_loop: "function" /* FUNCTION */,
  workflow_sleep: "function" /* FUNCTION */,
  workflow_wait_event: "function" /* FUNCTION */,
  memory_operation: "function" /* FUNCTION */,
  workspace_action: "function" /* FUNCTION */,
  rag_ingestion: "task" /* TASK */,
  rag_embedding: "llm" /* LLM */,
  rag_vector_operation: "function" /* FUNCTION */,
  rag_action: "function" /* FUNCTION */,
  graph_action: "function" /* FUNCTION */,
  scorer_run: "score" /* SCORE */,
  scorer_step: "score" /* SCORE */,
  processor_run: "function" /* FUNCTION */,
  generic: "function" /* FUNCTION */
};
function spanTypeFor(mastraType) {
  return SPAN_TYPE_MAP[mastraType] ?? "function" /* FUNCTION */;
}
function epochSeconds(value) {
  if (value === void 0) return void 0;
  const ms = value instanceof Date ? value.getTime() : typeof value === "number" ? value : Date.parse(value);
  return Number.isFinite(ms) ? ms / 1e3 : void 0;
}
function modelMetrics(attributes) {
  if (!isObject(attributes)) return void 0;
  const usage = isObject(attributes.usage) ? attributes.usage : void 0;
  if (!usage) return void 0;
  const out = {};
  if (typeof usage.inputTokens === "number")
    out.prompt_tokens = usage.inputTokens;
  if (typeof usage.outputTokens === "number")
    out.completion_tokens = usage.outputTokens;
  if (typeof usage.inputTokens === "number" && typeof usage.outputTokens === "number") {
    out.tokens = usage.inputTokens + usage.outputTokens;
  }
  const inputDetails = isObject(usage.inputDetails) ? usage.inputDetails : void 0;
  const outputDetails = isObject(usage.outputDetails) ? usage.outputDetails : void 0;
  if (inputDetails && typeof inputDetails.cacheRead === "number") {
    out.prompt_cached_tokens = inputDetails.cacheRead;
  }
  if (inputDetails && typeof inputDetails.cacheWrite === "number") {
    out.prompt_cache_creation_tokens = inputDetails.cacheWrite;
  }
  if (outputDetails && typeof outputDetails.reasoning === "number") {
    out.completion_reasoning_tokens = outputDetails.reasoning;
  }
  return Object.keys(out).length > 0 ? out : void 0;
}
function timeToFirstTokenSeconds(attributes, spanStartSeconds) {
  if (!isObject(attributes)) return void 0;
  if (spanStartSeconds === void 0) return void 0;
  const raw = attributes.completionStartTime;
  const completionStart = raw instanceof Date || typeof raw === "string" || typeof raw === "number" ? epochSeconds(raw) : void 0;
  if (completionStart === void 0) return void 0;
  const ttft = completionStart - spanStartSeconds;
  return Number.isFinite(ttft) && ttft >= 0 ? ttft : void 0;
}
function buildMetadata(exported) {
  const out = {};
  if (exported.entityId !== void 0) out.entity_id = exported.entityId;
  if (exported.entityName !== void 0) out.entity_name = exported.entityName;
  if (exported.entityType !== void 0) out.entity_type = exported.entityType;
  if (exported.metadata && isObject(exported.metadata)) {
    Object.assign(out, exported.metadata);
  }
  if (exported.attributes && isObject(exported.attributes)) {
    for (const [key, value] of Object.entries(exported.attributes)) {
      if (key === "usage") continue;
      if (value !== void 0) out[key] = value;
    }
  }
  if (exported.tags && exported.tags.length > 0) {
    out.tags = exported.tags;
  }
  if (exported.requestContext && isObject(exported.requestContext)) {
    out.request_context = exported.requestContext;
  }
  return out;
}
var BraintrustObservabilityExporter = class {
  name = MASTRA_BRAINTRUST_EXPORTER_NAME;
  spans = /* @__PURE__ */ new Map();
  // Captured at the first SPAN_STARTED event. Mastra's observability bus may
  // dispatch later events outside the user's AsyncLocalStorage context, where
  // `currentSpan()` returns NOOP_SPAN — which would make our `startSpan()`
  // calls go to a no-op logger and silently drop. Anchoring on the parent
  // we observe while still in-context keeps the whole Mastra subtree under
  // the user's traced scenario.
  capturedParent;
  constructor() {
    _internalSetInitialState();
  }
  async exportTracingEvent(event) {
    const exported = event.exportedSpan;
    if (exported.isInternal === true) return;
    try {
      switch (event.type) {
        case "span_started":
          this.onStart(exported);
          break;
        case "span_updated":
          this.onUpdate(exported);
          break;
        case "span_ended":
          this.onEnd(exported);
          break;
      }
    } catch (err) {
      logExporterError(err);
    }
  }
  async flush() {
    const state2 = _internalGetGlobalState();
    if (state2) {
      await state2.bgLogger().flush();
    }
  }
  async shutdown() {
    await this.flush();
    this.spans.clear();
  }
  onStart(exported) {
    if (this.spans.has(exported.id)) return;
    const args = withSpanInstrumentationName(
      {
        name: exported.name,
        spanAttributes: { type: spanTypeFor(exported.type) },
        startTime: epochSeconds(exported.startTime),
        // Use the Mastra span id as the Braintrust row id so that
        // `logFeedback({ id: <mastra span id> })` (and Mastra's score events)
        // attach to the right row. Without this, `SpanImpl` auto-generates a
        // row id (`this._id = eventId ?? idGenerator.getSpanId()`) that no
        // external caller could know.
        event: { id: exported.id }
      },
      INSTRUMENTATION_NAMES.MASTRA
    );
    const parentRecord = exported.parentSpanId ? this.spans.get(exported.parentSpanId) : void 0;
    if (!this.capturedParent) {
      const probe = currentSpan();
      if (probe && probe.spanId) {
        this.capturedParent = probe;
      }
    }
    const span = parentRecord ? parentRecord.span.startSpan(args) : this.capturedParent ? this.capturedParent.startSpan(args) : startSpan(args);
    const record = { span, hasLoggedInput: false };
    this.logPayload(record, exported);
    this.spans.set(exported.id, record);
    if (exported.isEvent === true) {
      span.end({ endTime: args.startTime });
      this.spans.delete(exported.id);
    }
  }
  onUpdate(exported) {
    const record = this.spans.get(exported.id);
    if (!record) return;
    this.logPayload(record, exported);
  }
  onEnd(exported) {
    const record = this.spans.get(exported.id);
    if (!record) return;
    this.logPayload(record, exported);
    if (exported.errorInfo) {
      record.span.log({
        error: exported.errorInfo.message || exported.errorInfo.name || "Unknown Mastra error"
      });
    }
    record.span.end({ endTime: epochSeconds(exported.endTime) });
    this.spans.delete(exported.id);
  }
  logPayload(record, exported) {
    const event = {};
    if (exported.input !== void 0) {
      event.input = exported.input;
      record.hasLoggedInput = true;
    }
    if (exported.output !== void 0) {
      event.output = exported.output;
    }
    const metadata = buildMetadata(exported);
    if (Object.keys(metadata).length > 0) {
      event.metadata = metadata;
    }
    const metrics = modelMetrics(exported.attributes);
    const ttft = timeToFirstTokenSeconds(
      exported.attributes,
      epochSeconds(exported.startTime)
    );
    if (metrics || ttft !== void 0) {
      event.metrics = {
        ...metrics ?? {},
        ...ttft !== void 0 ? { time_to_first_token: ttft } : {}
      };
    }
    if (Object.keys(event).length > 0) {
      record.span.log(event);
    }
  }
};
function logExporterError(err) {
  debugLogger.warn("Mastra exporter failure:", err);
}

// src/instrumentation/core/channel-definitions.ts
function channel(spec) {
  return spec;
}
function defineChannels(pkg, channels, options) {
  const { instrumentationName } = options;
  return Object.fromEntries(
    Object.entries(channels).map(([key, spec]) => {
      const fullChannelName = `orchestrion:${pkg}:${spec.channelName}`;
      if (spec.kind === "async") {
        const asyncSpec = spec;
        const tracingChannel2 = () => isomorph_default.newTracingChannel(
          fullChannelName
        );
        const intercept2 = (interceptor) => {
          const hook = tracingChannel2();
          return typeof hook.intercept === "function" ? hook.intercept(interceptor) : () => {
          };
        };
        return [
          key,
          {
            ...asyncSpec,
            instrumentationName,
            intercept: intercept2,
            invoke: (target, thisArg, args, additional) => {
              const hook = tracingChannel2();
              return typeof hook.invoke === "function" ? hook.invoke(target, thisArg, args, additional) : Reflect.apply(target, thisArg, args);
            },
            tracingChannel: tracingChannel2,
            tracePromise: (fn, context) => tracingChannel2().tracePromise(
              fn,
              // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
              context
            )
          }
        ];
      }
      const syncSpec = spec;
      const tracingChannel = () => isomorph_default.newTracingChannel(
        fullChannelName
      );
      const intercept = (interceptor) => {
        const hook = tracingChannel();
        return typeof hook.intercept === "function" ? hook.intercept(interceptor) : () => {
        };
      };
      return [
        key,
        {
          ...syncSpec,
          instrumentationName,
          intercept,
          invoke: (target, thisArg, args, additional) => {
            const hook = tracingChannel();
            return typeof hook.invoke === "function" ? hook.invoke(target, thisArg, args, additional) : Reflect.apply(target, thisArg, args);
          },
          tracingChannel,
          traceSync: (fn, context) => tracingChannel().traceSync(
            fn,
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            context
          )
        }
      ];
    })
  );
}

// src/instrumentation/plugins/ai-sdk-channels.ts
var aiSDKChannels = defineChannels(
  "ai",
  {
    generateText: channel({
      channelName: "generateText",
      kind: "async"
    }),
    streamText: channel({
      channelName: "streamText",
      kind: "async"
    }),
    streamTextSync: channel({
      channelName: "streamText.sync",
      kind: "sync-stream"
    }),
    generateObject: channel({
      channelName: "generateObject",
      kind: "async"
    }),
    streamObject: channel({
      channelName: "streamObject",
      kind: "async"
    }),
    streamObjectSync: channel({
      channelName: "streamObject.sync",
      kind: "sync-stream"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    }),
    embedMany: channel({
      channelName: "embedMany",
      kind: "async"
    }),
    rerank: channel({
      channelName: "rerank",
      kind: "async"
    }),
    agentGenerate: channel({
      channelName: "Agent.generate",
      kind: "async"
    }),
    agentStream: channel({
      channelName: "Agent.stream",
      kind: "async"
    }),
    agentStreamSync: channel({
      channelName: "Agent.stream.sync",
      kind: "sync-stream"
    }),
    toolLoopAgentGenerate: channel({
      channelName: "ToolLoopAgent.generate",
      kind: "async"
    }),
    toolLoopAgentStream: channel({
      channelName: "ToolLoopAgent.stream",
      kind: "async"
    }),
    workflowAgentStream: channel({
      channelName: "WorkflowAgent.stream",
      kind: "async"
    }),
    v7CreateTelemetryDispatcher: channel({
      channelName: "createTelemetryDispatcher",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.AI_SDK }
);
var harnessAgentChannels = defineChannels(
  "@ai-sdk/harness",
  {
    createSession: channel({
      channelName: "HarnessAgent.createSession",
      kind: "async"
    }),
    generate: channel({
      channelName: "HarnessAgent.generate",
      kind: "async"
    }),
    stream: channel({
      channelName: "HarnessAgent.stream",
      kind: "async"
    }),
    continueGenerate: channel({
      channelName: "HarnessAgent.continueGenerate",
      kind: "async"
    }),
    continueStream: channel({
      channelName: "HarnessAgent.continueStream",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.AI_SDK }
);

// src/auto-instrumentations/configs/ai-sdk.ts
var aiSDKConfigs = [
  // HarnessAgent turn methods are published only from the package's ESM
  // `./agent` entrypoint. The compiled class expression is anonymous, so match
  // the first async method with each public name instead of a class name.
  ...[
    ["createSession", harnessAgentChannels.createSession.channelName],
    ["generate", harnessAgentChannels.generate.channelName],
    ["stream", harnessAgentChannels.stream.channelName],
    ["continueGenerate", harnessAgentChannels.continueGenerate.channelName],
    ["continueStream", harnessAgentChannels.continueStream.channelName]
  ].map(([methodName, channelName]) => ({
    channelName,
    module: {
      name: "@ai-sdk/harness",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "dist/agent/index.js"
    },
    functionQuery: {
      methodName,
      kind: "Async",
      index: 0
    }
  })),
  // generateText - async function
  {
    channelName: aiSDKChannels.generateText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "generateText",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.generateText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "generateText",
      kind: "Async"
    }
  },
  // streamText - async function (v3 only, before the sync refactor in v4)
  {
    channelName: aiSDKChannels.streamText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Async"
    }
  },
  // streamText - sync function returning stream (v4+)
  {
    channelName: aiSDKChannels.streamTextSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Sync"
    }
  },
  {
    channelName: aiSDKChannels.streamText.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.streamTextSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamText",
      kind: "Sync"
    }
  },
  // generateObject - async function
  {
    channelName: aiSDKChannels.generateObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "generateObject",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.generateObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "generateObject",
      kind: "Async"
    }
  },
  // embed - async function
  {
    channelName: aiSDKChannels.embed.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.embed.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "embed",
      kind: "Async"
    }
  },
  // embedMany - async function
  {
    channelName: aiSDKChannels.embedMany.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "embedMany",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.embedMany.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "embedMany",
      kind: "Async"
    }
  },
  // rerank - async function
  {
    channelName: aiSDKChannels.rerank.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.rerank.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "rerank",
      kind: "Async"
    }
  },
  // AI SDK v7 exposes its telemetry lifecycle through a dispatcher created for
  // each operation. We patch that dispatcher in the plugin instead of rewriting
  // the module to call registerTelemetry().
  {
    channelName: aiSDKChannels.v7CreateTelemetryDispatcher.channelName,
    module: {
      name: "ai",
      versionRange: ">=7.0.0-0 <8.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "createTelemetryDispatcher",
      kind: "Sync"
    }
  },
  {
    channelName: aiSDKChannels.v7CreateTelemetryDispatcher.channelName,
    module: {
      name: "ai",
      versionRange: ">=7.0.0-0 <8.0.0",
      filePath: "dist/internal/index.js"
    },
    functionQuery: {
      functionName: "createTelemetryDispatcher",
      kind: "Sync"
    }
  },
  // streamObject - async function (v3 only, before the sync refactor in v4)
  {
    channelName: aiSDKChannels.streamObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Async"
    }
  },
  // streamObject - sync function returning stream (v4+)
  {
    channelName: aiSDKChannels.streamObjectSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Sync"
    }
  },
  {
    channelName: aiSDKChannels.streamObject.channelName,
    module: {
      name: "ai",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Async"
    }
  },
  {
    channelName: aiSDKChannels.streamObjectSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=4.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "streamObject",
      kind: "Sync"
    }
  },
  // Agent.generate - async method (v5 only)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first async `generate` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.agentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.agentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  // Agent.stream - sync method (v5 only)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first sync `stream` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.agentStreamSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Sync",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.agentStreamSync.channelName,
    module: {
      name: "ai",
      versionRange: ">=5.0.0 <6.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Sync",
      index: 0
    }
  },
  // ToolLoopAgent.generate - async method (v6 only, Experimental_Agent is an alias)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first async `generate` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.toolLoopAgentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.toolLoopAgentGenerate.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "generate",
      kind: "Async",
      index: 0
    }
  },
  // ToolLoopAgent.stream - async method (v6 only, Experimental_Agent is an alias)
  // The compiled AI SDK bundle emits this as an anonymous class method, so we
  // target the first async `stream` method in the file instead of a class name.
  {
    channelName: aiSDKChannels.toolLoopAgentStream.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.mjs"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Async",
      index: 0
    }
  },
  {
    channelName: aiSDKChannels.toolLoopAgentStream.channelName,
    module: {
      name: "ai",
      versionRange: ">=6.0.0 <7.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      methodName: "stream",
      kind: "Async",
      index: 0
    }
  }
];

// src/instrumentation/plugins/anthropic-channels.ts
var anthropicChannels = defineChannels(
  "@anthropic-ai/sdk",
  {
    messagesCreate: channel({
      channelName: "messages.create",
      kind: "async"
    }),
    betaMessagesCreate: channel({
      channelName: "beta.messages.create",
      kind: "async"
    }),
    betaMessagesToolRunner: channel({
      channelName: "beta.messages.toolRunner",
      kind: "sync-stream"
    }),
    betaSessionsEventsStream: channel({
      channelName: "beta.sessions.events.stream",
      kind: "async"
    }),
    betaSessionsThreadsEventsStream: channel({
      channelName: "beta.sessions.threads.events.stream",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.ANTHROPIC }
);

// src/auto-instrumentations/configs/anthropic.ts
var anthropicConfigs = [
  // Each logical target is listed for both published module formats:
  // `.mjs` covers ESM imports, while `.js` covers CJS requires. The Bedrock
  // SDK delegates CJS `messages.create` calls through these Anthropic SDK
  // `.js` resource files.
  // Messages API - create in older SDK layouts (supports streaming via stream=true parameter)
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.27.0 <0.39.0",
      filePath: "resources/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.27.0 <0.39.0",
      filePath: "resources/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  // Messages API - create (supports streaming via stream=true parameter)
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/messages/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: anthropicChannels.messagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/messages/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Messages API - create (supports streaming via stream=true parameter)
  {
    channelName: anthropicChannels.betaMessagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: anthropicChannels.betaMessagesCreate.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Messages API - toolRunner (sync helper returning async iterable/thenable)
  {
    channelName: anthropicChannels.betaMessagesToolRunner.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.mjs"
    },
    functionQuery: {
      className: "Messages",
      methodName: "toolRunner",
      kind: "Sync"
    }
  },
  {
    channelName: anthropicChannels.betaMessagesToolRunner.channelName,
    module: {
      name: "@anthropic-ai/sdk",
      versionRange: ">=0.39.0",
      filePath: "resources/beta/messages/messages.js"
    },
    functionQuery: {
      className: "Messages",
      methodName: "toolRunner",
      kind: "Sync"
    }
  },
  // Managed Agents Sessions event streams are discovered automatically, but
  // remain passive until the user calls collectAnthropicSession() on the
  // returned stream.
  ...["mjs", "js"].map(
    (extension) => ({
      channelName: anthropicChannels.betaSessionsEventsStream.channelName,
      module: {
        name: "@anthropic-ai/sdk",
        versionRange: ">=0.86.0",
        filePath: `resources/beta/sessions/events.${extension}`
      },
      functionQuery: {
        className: "Events",
        methodName: "stream",
        kind: "Async"
      }
    })
  ),
  ...["mjs", "js"].map(
    (extension) => ({
      channelName: anthropicChannels.betaSessionsThreadsEventsStream.channelName,
      module: {
        name: "@anthropic-ai/sdk",
        versionRange: ">=0.86.0",
        filePath: `resources/beta/sessions/threads/events.${extension}`
      },
      functionQuery: {
        className: "Events",
        methodName: "stream",
        kind: "Async"
      }
    })
  )
];

// src/instrumentation/plugins/bedrock-runtime-channels.ts
var clientSendChannel = channel({
  channelName: "client.send",
  kind: "async"
});
var bedrockRuntimeChannels = defineChannels(
  "aws-bedrock-runtime",
  {
    clientSend: clientSendChannel
  },
  { instrumentationName: INSTRUMENTATION_NAMES.BEDROCK_RUNTIME }
);
var smithyCoreChannels = defineChannels(
  "@smithy/core",
  {
    clientSend: clientSendChannel
  },
  { instrumentationName: INSTRUMENTATION_NAMES.BEDROCK_RUNTIME }
);
var smithyClientChannels = defineChannels(
  "@smithy/smithy-client",
  {
    clientSend: clientSendChannel
  },
  { instrumentationName: INSTRUMENTATION_NAMES.BEDROCK_RUNTIME }
);

// src/auto-instrumentations/configs/bedrock-runtime.ts
var bedrockRuntimeConfigs = [
  {
    channelName: smithyCoreChannels.clientSend.channelName,
    module: {
      name: "@smithy/core",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist-cjs/submodules/client/index.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: smithyCoreChannels.clientSend.channelName,
    module: {
      name: "@smithy/core",
      versionRange: ">=3.0.0 <4.0.0",
      filePath: "dist-es/submodules/client/smithy-client/client.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: smithyClientChannels.clientSend.channelName,
    module: {
      name: "@smithy/smithy-client",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist-cjs/index.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: smithyClientChannels.clientSend.channelName,
    module: {
      name: "@smithy/smithy-client",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist-es/client.js"
    },
    functionQuery: {
      className: "Client",
      methodName: "send",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/claude-agent-sdk-channels.ts
var claudeAgentSDKChannels = defineChannels(
  "@anthropic-ai/claude-agent-sdk",
  {
    query: channel({
      channelName: "query",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLAUDE_AGENT_SDK }
);

// src/auto-instrumentations/configs/claude-agent-sdk.ts
var claudeAgentSDKConfigs = [
  // query - Main entry point for agent interactions. The SDK returns an async
  // iterable, but the exported query function itself is synchronous.
  {
    channelName: claudeAgentSDKChannels.query.channelName,
    module: {
      name: "@anthropic-ai/claude-agent-sdk",
      versionRange: ">=0.1.0 <0.2.0",
      filePath: "sdk.mjs"
    },
    functionQuery: {
      functionName: "query",
      kind: "Sync"
    }
  },
  {
    channelName: claudeAgentSDKChannels.query.channelName,
    module: {
      name: "@anthropic-ai/claude-agent-sdk",
      versionRange: ">=0.2.0",
      filePath: "sdk.mjs"
    },
    functionQuery: {
      functionName: "query",
      kind: "Sync",
      isExportAlias: true
    }
  }
];

// src/instrumentation/plugins/cloudflare-ai-chat-channels.ts
var cloudflareAIChatChannels = defineChannels(
  "@cloudflare/ai-chat",
  {
    runExclusiveChatTurn: channel({
      channelName: "AIChatAgent._runExclusiveChatTurn",
      kind: "async"
    }),
    onChatResponse: channel({
      channelName: "AIChatAgent.onChatResponse",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLOUDFLARE_AI_CHAT }
);

// src/auto-instrumentations/configs/cloudflare-ai-chat.ts
var cloudflareAIChatVersionRange = ">=0.9.0 <0.10.0";
var cloudflareAIChatConfigs = [
  {
    // AIChatAgent subclasses replace onChatMessage, so there is no stable
    // public implementation for the transformer to target. This runner is
    // the narrowest shared boundary around every chat turn; keep the version
    // range tight because it is an internal method.
    channelName: cloudflareAIChatChannels.runExclusiveChatTurn.channelName,
    module: {
      name: "@cloudflare/ai-chat",
      versionRange: cloudflareAIChatVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "AIChatAgent",
      methodName: "_runExclusiveChatTurn",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cloudflare-agents-channels.ts
var cloudflareAgentsChannels = defineChannels(
  "agents",
  {
    runAgentTool: channel({
      channelName: "Agent.runAgentTool",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLOUDFLARE_AGENTS }
);

// src/auto-instrumentations/configs/cloudflare-agents.ts
var cloudflareAgentsVersionRange = ">=0.17.0 <0.18.0";
var cloudflareAgentsConfigs = [
  {
    channelName: cloudflareAgentsChannels.runAgentTool.channelName,
    module: {
      name: "agents",
      versionRange: cloudflareAgentsVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "Agent",
      methodName: "runAgentTool",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cloudflare-think-channels.ts
var cloudflareThinkChannels = defineChannels(
  "@cloudflare/think",
  {
    runInferenceLoop: channel({
      channelName: "Think.runInferenceLoop",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CLOUDFLARE_THINK }
);

// src/auto-instrumentations/configs/cloudflare-think.ts
var cloudflareThinkVersionRange = ">=0.13.0 <0.14.0";
var cloudflareThinkConfigs = [
  {
    channelName: cloudflareThinkChannels.runInferenceLoop.channelName,
    module: {
      name: "@cloudflare/think",
      versionRange: cloudflareThinkVersionRange,
      filePath: "dist/think.js"
    },
    functionQuery: {
      className: "Think",
      methodName: "_runInferenceLoop",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cohere-channels.ts
var cohereChannels = defineChannels(
  "cohere-ai",
  {
    chat: channel({
      channelName: "chat",
      kind: "async"
    }),
    chatStream: channel({
      channelName: "chatStream",
      kind: "async"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    }),
    rerank: channel({
      channelName: "rerank",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.COHERE }
);

// src/auto-instrumentations/configs/cohere.ts
var cohereConfigs = [
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chat.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chat",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.chatStream.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "chatStream",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.embed.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <8.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.0.0 <7.21.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=7.21.0 <8.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "Client.js"
    },
    functionQuery: {
      className: "CohereClient",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: cohereChannels.rerank.channelName,
    module: {
      name: "cohere-ai",
      versionRange: ">=8.0.0 <9.0.0",
      filePath: "api/resources/v2/client/Client.js"
    },
    functionQuery: {
      className: "V2Client",
      methodName: "rerank",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/cursor-sdk-channels.ts
var cursorSDKChannels = defineChannels(
  "@cursor/sdk",
  {
    create: channel({
      channelName: "Agent.create",
      kind: "async"
    }),
    resume: channel({
      channelName: "Agent.resume",
      kind: "async"
    }),
    prompt: channel({
      channelName: "Agent.prompt",
      kind: "async"
    }),
    send: channel({
      channelName: "agent.send",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.CURSOR_SDK }
);

// src/auto-instrumentations/configs/cursor-sdk.ts
var cursorSDKVersionRange = ">=1.0.7 <2.0.0";
var cursorSDKEntrypoints = ["dist/esm/index.js", "dist/cjs/index.js"];
var cursorSDKConfigs = cursorSDKEntrypoints.flatMap((filePath) => [
  {
    channelName: cursorSDKChannels.create.channelName,
    module: {
      name: "@cursor/sdk",
      versionRange: cursorSDKVersionRange,
      filePath
    },
    functionQuery: {
      className: "Agent",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: cursorSDKChannels.resume.channelName,
    module: {
      name: "@cursor/sdk",
      versionRange: cursorSDKVersionRange,
      filePath
    },
    functionQuery: {
      className: "Agent",
      methodName: "resume",
      kind: "Async"
    }
  },
  {
    channelName: cursorSDKChannels.prompt.channelName,
    module: {
      name: "@cursor/sdk",
      versionRange: cursorSDKVersionRange,
      filePath
    },
    functionQuery: {
      className: "Agent",
      methodName: "prompt",
      kind: "Async"
    }
  }
]);

// src/instrumentation/plugins/flue-channels.ts
var flueChannels = defineChannels(
  "@flue/runtime",
  {
    createContext: channel({
      channelName: "createFlueContext",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.FLUE }
);

// src/auto-instrumentations/configs/flue.ts
var flueVersionRange = ">=0.8.0 <1.0.0";
var flueConfigs = [
  {
    channelName: flueChannels.createContext.channelName,
    module: {
      name: "@flue/runtime",
      versionRange: flueVersionRange,
      filePath: "dist/internal.mjs"
    },
    functionQuery: {
      functionName: "createFlueContext",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/genkit-channels.ts
var genkitChannels = defineChannels(
  "@genkit-ai/ai",
  {
    generate: channel({
      channelName: "generate",
      kind: "async"
    }),
    generateStream: channel({
      channelName: "generateStream",
      kind: "sync-stream"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    }),
    embedMany: channel({
      channelName: "embedMany",
      kind: "async"
    }),
    actionRun: channel({
      channelName: "action.run",
      kind: "async"
    }),
    actionStream: channel({
      channelName: "action.stream",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GENKIT }
);
var genkitCoreChannels = defineChannels(
  "@genkit-ai/core",
  {
    actionSpan: channel({
      channelName: "action.span",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GENKIT }
);

// src/auto-instrumentations/configs/genkit.ts
var genkitVersionRange = ">=1.0.0 <2.0.0";
var genkitConfigs = [
  {
    channelName: genkitChannels.generate.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generate",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.generate.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generate",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.generateStream.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generateStream",
      kind: "Sync"
    }
  },
  {
    channelName: genkitChannels.generateStream.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "generateStream",
      kind: "Sync"
    }
  },
  {
    channelName: genkitChannels.embed.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.embed.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embed",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.embedMany.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embedMany",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.embedMany.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "embedMany",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.actionRun.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.mjs"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "run",
      kind: "Async"
    }
  },
  {
    channelName: genkitChannels.actionRun.channelName,
    module: {
      name: "@genkit-ai/ai",
      versionRange: genkitVersionRange,
      filePath: "lib/genkit-ai.js"
    },
    functionQuery: {
      className: "GenkitAI",
      methodName: "run",
      kind: "Async"
    }
  },
  {
    channelName: genkitCoreChannels.actionSpan.channelName,
    module: {
      name: "@genkit-ai/core",
      versionRange: genkitVersionRange,
      filePath: "lib/tracing/instrumentation.mjs"
    },
    functionQuery: {
      functionName: "runInNewSpan",
      kind: "Async"
    }
  },
  {
    channelName: genkitCoreChannels.actionSpan.channelName,
    module: {
      name: "@genkit-ai/core",
      versionRange: genkitVersionRange,
      filePath: "lib/tracing/instrumentation.js"
    },
    functionQuery: {
      functionName: "runInNewSpan",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/github-copilot-channels.ts
var gitHubCopilotChannels = defineChannels(
  "@github/copilot-sdk",
  {
    createSession: channel({
      channelName: "client.createSession",
      kind: "async"
    }),
    resumeSession: channel({
      channelName: "client.resumeSession",
      kind: "async"
    }),
    sendAndWait: channel({
      channelName: "session.sendAndWait",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GITHUB_COPILOT }
);

// src/auto-instrumentations/configs/github-copilot.ts
var gitHubCopilotConfigs = [
  // ESM: CopilotClient.createSession
  {
    channelName: gitHubCopilotChannels.createSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "createSession",
      kind: "Async"
    }
  },
  // CJS: CopilotClient.createSession
  {
    channelName: gitHubCopilotChannels.createSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/cjs/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "createSession",
      kind: "Async"
    }
  },
  // ESM: CopilotClient.resumeSession
  {
    channelName: gitHubCopilotChannels.resumeSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "resumeSession",
      kind: "Async"
    }
  },
  // CJS: CopilotClient.resumeSession
  {
    channelName: gitHubCopilotChannels.resumeSession.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/cjs/client.js"
    },
    functionQuery: {
      className: "CopilotClient",
      methodName: "resumeSession",
      kind: "Async"
    }
  },
  // ESM: CopilotSession.sendAndWait
  {
    channelName: gitHubCopilotChannels.sendAndWait.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/session.js"
    },
    functionQuery: {
      className: "CopilotSession",
      methodName: "sendAndWait",
      kind: "Async"
    }
  },
  // CJS: CopilotSession.sendAndWait
  {
    channelName: gitHubCopilotChannels.sendAndWait.channelName,
    module: {
      name: "@github/copilot-sdk",
      versionRange: ">=0.3.0",
      filePath: "dist/cjs/session.js"
    },
    functionQuery: {
      className: "CopilotSession",
      methodName: "sendAndWait",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/google-adk-channels.ts
var googleADKChannels = defineChannels(
  "@google/adk",
  {
    runnerRunAsync: channel({
      channelName: "runner.runAsync",
      kind: "sync-stream"
    }),
    agentRunAsync: channel({
      channelName: "agent.runAsync",
      kind: "sync-stream"
    }),
    toolRunAsync: channel({
      channelName: "tool.runAsync",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GOOGLE_ADK }
);

// src/auto-instrumentations/configs/google-adk.ts
var googleADKVersionRange = ">=0.1.0";
var googleADKBundledIndexV06VersionRange = ">=0.6.1 <0.7.0";
var googleADKBundledIndexV1VersionRange = ">=1.0.0 <2.0.0";
var googleADKConfigs = [
  // --- Runner.runAsync --- async generator, kind "Sync" + sync-stream channel
  // Runner.runAsync — ESM individual module file
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKVersionRange,
      filePath: "dist/esm/runner/runner.js"
    },
    functionQuery: {
      className: "Runner",
      methodName: "runAsync",
      kind: "Sync"
    }
  },
  // Runner.runAsync — bundled CJS/ESM indexes
  // The bundled entrypoints minify class names, so target the 12th sync
  // `runAsync` method in file order rather than a class name. This mapping is
  // only validated against the current 0.6.x bundle layout, so keep the range
  // tight until we verify newer bundled outputs.
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 11
    }
  },
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 11
    }
  },
  // The 1.x bundled entrypoints still inline the runtime into index.js, but
  // the minified method order changed. These indices are verified against 1.0.0.
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 12
    }
  },
  {
    channelName: googleADKChannels.runnerRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 12
    }
  },
  // --- BaseAgent.runAsync --- async generator, kind "Sync" + sync-stream channel
  // BaseAgent.runAsync — ESM individual module file
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKVersionRange,
      filePath: "dist/esm/agents/base_agent.js"
    },
    functionQuery: {
      className: "BaseAgent",
      methodName: "runAsync",
      kind: "Sync"
    }
  },
  // BaseAgent.runAsync — bundled CJS/ESM indexes
  // The bundled entrypoints minify class names, so target the first sync
  // `runAsync` method in file order rather than a class name. This mapping is
  // only validated against the current 0.6.x bundle layout, so keep the range
  // tight until we verify newer bundled outputs.
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  // The 1.x bundled entrypoints keep BaseAgent.runAsync as the first bundled
  // async-generator runAsync method in file order.
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  {
    channelName: googleADKChannels.agentRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Sync",
      index: 0
    }
  },
  // --- FunctionTool.runAsync --- regular async, kind "Async"
  // FunctionTool.runAsync — ESM individual module file
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKVersionRange,
      filePath: "dist/esm/tools/function_tool.js"
    },
    functionQuery: {
      className: "FunctionTool",
      methodName: "runAsync",
      kind: "Async"
    }
  },
  // FunctionTool.runAsync — bundled CJS/ESM indexes
  // The bundled entrypoints minify class names, so target the first async
  // `runAsync` method in file order rather than a class name. This mapping is
  // only validated against the current 0.6.x bundle layout, so keep the range
  // tight until we verify newer bundled outputs.
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  },
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV06VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  },
  // The 1.x bundle moves FunctionTool.runAsync behind one helper method.
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/cjs/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  },
  {
    channelName: googleADKChannels.toolRunAsync.channelName,
    module: {
      name: "@google/adk",
      versionRange: googleADKBundledIndexV1VersionRange,
      filePath: "dist/esm/index.js"
    },
    functionQuery: {
      methodName: "runAsync",
      kind: "Async",
      index: 1
    }
  }
];

// src/instrumentation/plugins/google-genai-channels.ts
var googleGenAIChannels = defineChannels(
  "@google/genai",
  {
    generateContent: channel({
      channelName: "models.generateContent",
      kind: "async"
    }),
    generateContentStream: channel({
      channelName: "models.generateContentStream",
      kind: "async"
    }),
    embedContent: channel({
      channelName: "models.embedContent",
      kind: "async"
    }),
    interactionsCreate: channel({
      channelName: "interactions.create",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GOOGLE_GENAI }
);

// src/auto-instrumentations/configs/google-genai.ts
var googleGenAIConfigs = [
  // Models.generateContentInternal - The actual class method (Node.js entry point)
  // Note: generateContent is an arrow function property that calls this internal method
  {
    channelName: googleGenAIChannels.generateContent.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.0.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "generateContentInternal",
      kind: "Async"
    }
  },
  // Models.generateContentStreamInternal - The actual class method (Node.js entry point)
  // Note: generateContentStream is an arrow function property that calls this internal method
  {
    channelName: googleGenAIChannels.generateContentStream.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.0.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "generateContentStreamInternal",
      kind: "Async"
    }
  },
  // Models.embedContent - class method in older SDK versions
  {
    channelName: googleGenAIChannels.embedContent.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.0.0 <1.44.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "embedContent",
      kind: "Async"
    }
  },
  // Models.embedContentInternal - class method in newer SDK versions
  // Note: embedContent is an arrow function property that calls this method
  {
    channelName: googleGenAIChannels.embedContent.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.44.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "Models",
      methodName: "embedContentInternal",
      kind: "Async"
    }
  },
  // BaseInteractions.create - Interactions API entry point
  {
    channelName: googleGenAIChannels.interactionsCreate.channelName,
    module: {
      name: "@google/genai",
      versionRange: ">=1.33.0",
      filePath: "dist/node/index.mjs"
    },
    functionQuery: {
      className: "BaseInteractions",
      methodName: "create",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/groq-channels.ts
var groqChannels = defineChannels(
  "groq-sdk",
  {
    chatCompletionsCreate: channel({
      channelName: "chat.completions.create",
      kind: "async"
    }),
    embeddingsCreate: channel({
      channelName: "embeddings.create",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.GROQ }
);

// src/auto-instrumentations/configs/groq.ts
var groqConfigs = [
  {
    channelName: groqChannels.chatCompletionsCreate.channelName,
    module: {
      name: "groq-sdk",
      versionRange: ">=1.0.0",
      filePath: "resources/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: groqChannels.embeddingsCreate.channelName,
    module: {
      name: "groq-sdk",
      versionRange: ">=1.0.0",
      filePath: "resources/embeddings.mjs"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/huggingface-channels.ts
var huggingFaceChannels = defineChannels(
  "@huggingface/inference",
  {
    chatCompletion: channel({
      channelName: "chatCompletion",
      kind: "async"
    }),
    chatCompletionStream: channel({
      channelName: "chatCompletionStream",
      kind: "sync-stream"
    }),
    textGeneration: channel({
      channelName: "textGeneration",
      kind: "async"
    }),
    textGenerationStream: channel({
      channelName: "textGenerationStream",
      kind: "sync-stream"
    }),
    featureExtraction: channel({
      channelName: "featureExtraction",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.HUGGINGFACE }
);

// src/auto-instrumentations/configs/huggingface.ts
var huggingFaceConfigs = [
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.js"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "dist/index.cjs"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/chatCompletion.js"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletion.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/chatCompletion.js"
    },
    functionQuery: {
      functionName: "chatCompletion",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/chatCompletionStream.js"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.chatCompletionStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/chatCompletionStream.js"
    },
    functionQuery: {
      functionName: "chatCompletionStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/textGeneration.js"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGeneration.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/textGeneration.js"
    },
    functionQuery: {
      functionName: "textGeneration",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/textGenerationStream.js"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.textGenerationStream.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/textGenerationStream.js"
    },
    functionQuery: {
      functionName: "textGenerationStream",
      kind: "Sync"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/esm/tasks/nlp/featureExtraction.js"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  },
  {
    channelName: huggingFaceChannels.featureExtraction.channelName,
    module: {
      name: "@huggingface/inference",
      versionRange: ">=3.0.0 <5.0.0",
      filePath: "dist/commonjs/tasks/nlp/featureExtraction.js"
    },
    functionQuery: {
      functionName: "featureExtraction",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/huggingface-transformers-channels.ts
var huggingFaceTransformersChannels = defineChannels(
  "@huggingface/transformers",
  {
    pipeline: channel({
      channelName: "pipeline",
      kind: "async"
    }),
    pipelineCall: channel({
      channelName: "pipeline.call",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.HUGGINGFACE }
);

// src/auto-instrumentations/configs/huggingface-transformers.ts
var moduleFiles = [
  {
    filePath: "dist/transformers.mjs",
    versionRange: ">=3.0.0 <3.4.0"
  },
  {
    filePath: "dist/transformers.cjs",
    versionRange: ">=3.0.0 <3.4.0"
  },
  {
    filePath: "dist/transformers.js",
    versionRange: ">=3.0.0 <3.4.0"
  },
  {
    filePath: "dist/transformers.node.mjs",
    versionRange: ">=3.4.0 <5.0.0"
  },
  {
    filePath: "dist/transformers.node.cjs",
    versionRange: ">=3.4.0 <5.0.0"
  },
  {
    filePath: "dist/transformers.web.js",
    versionRange: ">=3.4.0 <5.0.0"
  }
];
var pipelineClasses = [
  "TextGenerationPipeline",
  "Text2TextGenerationPipeline",
  "FeatureExtractionPipeline",
  "QuestionAnsweringPipeline"
];
var huggingFaceTransformersConfigs = moduleFiles.flatMap(({ filePath, versionRange: versionRange2 }) => [
  {
    channelName: huggingFaceTransformersChannels.pipeline.channelName,
    module: {
      name: "@huggingface/transformers",
      versionRange: versionRange2,
      filePath
    },
    functionQuery: {
      functionName: "pipeline",
      kind: "Async"
    }
  },
  ...pipelineClasses.map((className) => ({
    channelName: huggingFaceTransformersChannels.pipelineCall.channelName,
    module: {
      name: "@huggingface/transformers",
      versionRange: versionRange2,
      filePath
    },
    functionQuery: {
      className,
      methodName: "_call",
      kind: "Async"
    }
  }))
]);

// src/instrumentation/plugins/langchain-channels.ts
var langChainChannels = defineChannels(
  "@langchain/core",
  {
    configure: channel({
      channelName: "CallbackManager.configure",
      kind: "sync-stream"
    }),
    configureSync: channel({
      channelName: "CallbackManager._configureSync",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.LANGCHAIN }
);

// src/auto-instrumentations/configs/langchain.ts
var langChainCoreVersionRange = ">=0.3.42";
var langChainCallbackManagerFilePath = "dist/callbacks/manager.js";
var langchainConfigs = [
  {
    channelName: langChainChannels.configure.channelName,
    module: {
      name: "@langchain/core",
      versionRange: langChainCoreVersionRange,
      filePath: langChainCallbackManagerFilePath
    },
    functionQuery: {
      className: "CallbackManager",
      methodName: "configure",
      kind: "Sync"
    }
  },
  {
    channelName: langChainChannels.configureSync.channelName,
    module: {
      name: "@langchain/core",
      versionRange: langChainCoreVersionRange,
      filePath: langChainCallbackManagerFilePath
    },
    functionQuery: {
      className: "CallbackManager",
      methodName: "_configureSync",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/langsmith-channels.ts
var langSmithChannels = defineChannels(
  "langsmith",
  {
    createRun: channel({
      channelName: "Client.createRun",
      kind: "async"
    }),
    updateRun: channel({
      channelName: "Client.updateRun",
      kind: "async"
    }),
    batchIngestRuns: channel({
      channelName: "Client.batchIngestRuns",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.LANGSMITH }
);

// src/auto-instrumentations/configs/langsmith.ts
var versionRange = ">=0.3.30 <1.0.0";
var langSmithConfigs = [
  ...["dist/client.js", "dist/client.cjs"].flatMap((filePath) => [
    {
      channelName: langSmithChannels.createRun.channelName,
      module: { name: "langsmith", versionRange, filePath },
      functionQuery: {
        className: "Client",
        methodName: "createRun",
        kind: "Async"
      }
    },
    {
      channelName: langSmithChannels.updateRun.channelName,
      module: { name: "langsmith", versionRange, filePath },
      functionQuery: {
        className: "Client",
        methodName: "updateRun",
        kind: "Async"
      }
    },
    {
      channelName: langSmithChannels.batchIngestRuns.channelName,
      module: { name: "langsmith", versionRange, filePath },
      functionQuery: {
        className: "Client",
        methodName: "batchIngestRuns",
        kind: "Async"
      }
    }
  ])
];

// src/instrumentation/plugins/mistral-channels.ts
var mistralChannels = defineChannels(
  "@mistralai/mistralai",
  {
    chatComplete: channel({
      channelName: "chat.complete",
      kind: "async"
    }),
    chatStream: channel({
      channelName: "chat.stream",
      kind: "async"
    }),
    embeddingsCreate: channel({
      channelName: "embeddings.create",
      kind: "async"
    }),
    classifiersModerate: channel({
      channelName: "classifiers.moderate",
      kind: "async"
    }),
    classifiersModerateChat: channel({
      channelName: "classifiers.moderateChat",
      kind: "async"
    }),
    classifiersClassify: channel({
      channelName: "classifiers.classify",
      kind: "async"
    }),
    classifiersClassifyChat: channel({
      channelName: "classifiers.classifyChat",
      kind: "async"
    }),
    fimComplete: channel({
      channelName: "fim.complete",
      kind: "async"
    }),
    fimStream: channel({
      channelName: "fim.stream",
      kind: "async"
    }),
    agentsComplete: channel({
      channelName: "agents.complete",
      kind: "async"
    }),
    agentsStream: channel({
      channelName: "agents.stream",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.MISTRAL }
);

// src/auto-instrumentations/configs/mistral.ts
var mistralConfigs = [
  {
    channelName: mistralChannels.chatComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.chatComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.chatStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.chatStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.embeddingsCreate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/embeddings.js"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.embeddingsCreate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/embeddings.js"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderate",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerate.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderate",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerateChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderateChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersModerateChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "moderateChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassify.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.10.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classify",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassify.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classify",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassifyChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.10.0 <2.0.0",
      filePath: "sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classifyChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.classifiersClassifyChat.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/classifiers.js"
    },
    functionQuery: {
      className: "Classifiers",
      methodName: "classifyChat",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.fimStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/fim.js"
    },
    functionQuery: {
      className: "Fim",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsComplete.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "complete",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=1.0.0 <2.0.0",
      filePath: "sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "stream",
      kind: "Async"
    }
  },
  {
    channelName: mistralChannels.agentsStream.channelName,
    module: {
      name: "@mistralai/mistralai",
      versionRange: ">=2.0.0 <3.0.0",
      filePath: "esm/sdk/agents.js"
    },
    functionQuery: {
      className: "Agents",
      methodName: "stream",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/ollama-channels.ts
var ollamaChannels = defineChannels(
  "ollama",
  {
    chat: channel({
      channelName: "chat",
      kind: "async"
    }),
    generate: channel({
      channelName: "generate",
      kind: "async"
    }),
    embed: channel({
      channelName: "embed",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OLLAMA }
);

// src/auto-instrumentations/configs/ollama.ts
var methods = [
  ["chat", ollamaChannels.chat.channelName],
  ["generate", ollamaChannels.generate.channelName],
  ["embed", ollamaChannels.embed.channelName]
];
var implementationFiles = ["dist/browser.mjs", "dist/browser.cjs"];
var ollamaConfigs = [
  ...implementationFiles.flatMap(
    (filePath) => methods.map(([methodName, channelName]) => ({
      channelName,
      module: {
        name: "ollama",
        versionRange: ">=0.6.0 <0.7.0",
        filePath
      },
      functionQuery: {
        className: "Ollama",
        methodName,
        kind: "Async"
      }
    }))
  )
];

// src/instrumentation/plugins/openai-agents-channels.ts
var openAIAgentsCoreChannels = defineChannels(
  "@openai/agents-core",
  {
    onTraceStart: channel({
      channelName: "tracing.processor.onTraceStart",
      kind: "async"
    }),
    onTraceEnd: channel({
      channelName: "tracing.processor.onTraceEnd",
      kind: "async"
    }),
    onSpanStart: channel({
      channelName: "tracing.processor.onSpanStart",
      kind: "async"
    }),
    onSpanEnd: channel({
      channelName: "tracing.processor.onSpanEnd",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENAI_AGENTS }
);

// src/auto-instrumentations/configs/openai-agents.ts
var lifecycleMethods = [
  ["onTraceStart", openAIAgentsCoreChannels.onTraceStart.channelName],
  ["onTraceEnd", openAIAgentsCoreChannels.onTraceEnd.channelName],
  ["onSpanStart", openAIAgentsCoreChannels.onSpanStart.channelName],
  ["onSpanEnd", openAIAgentsCoreChannels.onSpanEnd.channelName]
];
var openAIAgentsCoreConfigs = lifecycleMethods.flatMap(
  ([methodName, channelName]) => ["dist/tracing/processor.mjs", "dist/tracing/processor.js"].map(
    (filePath) => ({
      channelName,
      module: {
        name: "@openai/agents-core",
        versionRange: ">=0.0.14",
        filePath
      },
      functionQuery: {
        className: "MultiTracingProcessor",
        methodName,
        kind: "Async"
      }
    })
  )
);

// src/instrumentation/plugins/openai-channels.ts
var openAIChannels = defineChannels(
  "openai",
  {
    chatCompletionsCreate: channel({
      channelName: "chat.completions.create",
      kind: "async"
    }),
    embeddingsCreate: channel({
      channelName: "embeddings.create",
      kind: "async"
    }),
    betaChatCompletionsParse: channel({
      channelName: "beta.chat.completions.parse",
      kind: "async"
    }),
    betaChatCompletionsStream: channel({
      channelName: "beta.chat.completions.stream",
      kind: "sync-stream"
    }),
    moderationsCreate: channel({
      channelName: "moderations.create",
      kind: "async"
    }),
    responsesCreate: channel({
      channelName: "responses.create",
      kind: "async"
    }),
    responsesStream: channel({
      channelName: "responses.stream",
      kind: "sync-stream"
    }),
    responsesParse: channel({
      channelName: "responses.parse",
      kind: "async"
    }),
    responsesCompact: channel({
      channelName: "responses.compact",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENAI }
);

// src/auto-instrumentations/configs/openai.ts
var openaiConfigs = [
  // Chat Completions
  {
    channelName: openAIChannels.chatCompletionsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.chatCompletionsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.chatCompletionsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "create",
      kind: "Async"
    }
  },
  // Embeddings
  {
    channelName: openAIChannels.embeddingsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0",
      filePath: "resources/embeddings.mjs"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Chat Completions Parse
  {
    channelName: openAIChannels.betaChatCompletionsParse.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/beta/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "parse",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.betaChatCompletionsParse.channelName,
    module: {
      name: "openai",
      versionRange: ">=5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "parse",
      kind: "Async"
    }
  },
  // Moderations
  {
    channelName: openAIChannels.moderationsCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0",
      filePath: "resources/moderations.mjs"
    },
    functionQuery: {
      className: "Moderations",
      methodName: "create",
      kind: "Async"
    }
  },
  // Beta Chat Completions Stream
  {
    channelName: openAIChannels.betaChatCompletionsStream.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.0.0 <5.0.0",
      filePath: "resources/beta/chat/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "stream",
      kind: "Sync"
    }
  },
  {
    channelName: openAIChannels.betaChatCompletionsStream.channelName,
    module: {
      name: "openai",
      versionRange: ">=5.0.0",
      filePath: "resources/chat/completions/completions.mjs"
    },
    functionQuery: {
      className: "Completions",
      methodName: "stream",
      kind: "Sync"
    }
  },
  // Responses API (v4.87.0+)
  {
    channelName: openAIChannels.responsesCreate.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.87.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "create",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.responsesStream.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.87.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "stream",
      kind: "Sync"
    }
  },
  {
    channelName: openAIChannels.responsesParse.channelName,
    module: {
      name: "openai",
      versionRange: ">=4.87.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "parse",
      kind: "Async"
    }
  },
  {
    channelName: openAIChannels.responsesCompact.channelName,
    module: {
      name: "openai",
      versionRange: ">=6.10.0",
      filePath: "resources/responses/responses.mjs"
    },
    functionQuery: {
      className: "Responses",
      methodName: "compact",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/openai-codex-channels.ts
var openAICodexChannels = defineChannels(
  "@openai/codex-sdk",
  {
    run: channel({
      channelName: "Thread.run",
      kind: "async"
    }),
    runStreamed: channel({
      channelName: "Thread.runStreamed",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENAI_CODEX }
);

// src/auto-instrumentations/configs/openai-codex.ts
var openAICodexVersionRange = ">=0.128.0 <1.0.0";
var openAICodexConfigs = [
  {
    channelName: openAICodexChannels.run.channelName,
    module: {
      name: "@openai/codex-sdk",
      versionRange: openAICodexVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "Thread",
      methodName: "run",
      kind: "Async"
    }
  },
  {
    channelName: openAICodexChannels.runStreamed.channelName,
    module: {
      name: "@openai/codex-sdk",
      versionRange: openAICodexVersionRange,
      filePath: "dist/index.js"
    },
    functionQuery: {
      className: "Thread",
      methodName: "runStreamed",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/openrouter-channels.ts
var openRouterChannels = defineChannels(
  "@openrouter/sdk",
  {
    chatSend: channel({
      channelName: "chat.send",
      kind: "async"
    }),
    embeddingsGenerate: channel({
      channelName: "embeddings.generate",
      kind: "async"
    }),
    rerankRerank: channel({
      channelName: "rerank.rerank",
      kind: "async"
    }),
    betaResponsesSend: channel({
      channelName: "beta.responses.send",
      kind: "async"
    }),
    callModel: channel({
      channelName: "callModel",
      kind: "sync-stream"
    }),
    callModelTurn: channel({
      channelName: "callModel.turn",
      kind: "async"
    }),
    toolExecute: channel({
      channelName: "tool.execute",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENROUTER }
);

// src/auto-instrumentations/configs/openrouter.ts
var openRouterConfigs = [
  {
    channelName: openRouterChannels.chatSend.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/chat.js"
    },
    functionQuery: {
      className: "Chat",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.embeddingsGenerate.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/embeddings.js"
    },
    functionQuery: {
      className: "Embeddings",
      methodName: "generate",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.rerankRerank.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.12.0 <2.0.0",
      filePath: "esm/sdk/rerank.js"
    },
    functionQuery: {
      className: "Rerank",
      methodName: "rerank",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.betaResponsesSend.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/responses.js"
    },
    functionQuery: {
      className: "Responses",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.betaResponsesSend.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=1.1.2 <2.0.0",
      filePath: "esm/sdk/betaresponses.js"
    },
    functionQuery: {
      className: "BetaResponses",
      methodName: "send",
      kind: "Async"
    }
  },
  {
    channelName: openRouterChannels.callModel.channelName,
    module: {
      name: "@openrouter/sdk",
      versionRange: ">=0.9.11 <2.0.0",
      filePath: "esm/sdk/sdk.js"
    },
    functionQuery: {
      className: "OpenRouter",
      methodName: "callModel",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/openrouter-agent-channels.ts
var openRouterAgentChannels = defineChannels(
  "@openrouter/agent",
  {
    callModel: channel({
      channelName: "callModel",
      kind: "sync-stream"
    }),
    callModelTurn: channel({
      channelName: "callModel.turn",
      kind: "async"
    }),
    toolExecute: channel({
      channelName: "tool.execute",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.OPENROUTER_AGENT }
);

// src/auto-instrumentations/configs/openrouter-agent.ts
var openRouterAgentConfigs = [
  {
    channelName: openRouterAgentChannels.callModel.channelName,
    module: {
      name: "@openrouter/agent",
      versionRange: ">=0.1.2",
      filePath: "esm/inner-loop/call-model.js"
    },
    functionQuery: {
      functionName: "callModel",
      kind: "Sync"
    }
  }
];

// src/instrumentation/plugins/pi-coding-agent-channels.ts
var piCodingAgentChannels = defineChannels(
  "@earendil-works/pi-coding-agent",
  {
    prompt: channel({
      channelName: "AgentSession.prompt",
      kind: "async"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.PI_CODING_AGENT }
);

// src/auto-instrumentations/configs/pi-coding-agent.ts
var piCodingAgentVersionRange = ">=0.79.0 <0.82.0";
var piCodingAgentConfigs = [
  {
    channelName: piCodingAgentChannels.prompt.channelName,
    module: {
      name: "@earendil-works/pi-coding-agent",
      versionRange: piCodingAgentVersionRange,
      filePath: "dist/core/agent-session.js"
    },
    functionQuery: {
      className: "AgentSession",
      methodName: "prompt",
      kind: "Async"
    }
  }
];

// src/instrumentation/plugins/strands-agent-sdk-channels.ts
var strandsAgentSDKChannels = defineChannels(
  "@strands-agents/sdk",
  {
    agentStream: channel({
      channelName: "Agent.stream",
      kind: "sync-stream"
    }),
    graphStream: channel({
      channelName: "Graph.stream",
      kind: "sync-stream"
    }),
    swarmStream: channel({
      channelName: "Swarm.stream",
      kind: "sync-stream"
    })
  },
  { instrumentationName: INSTRUMENTATION_NAMES.STRANDS_AGENT_SDK }
);

// src/auto-instrumentations/configs/strands-agent-sdk.ts
var strandsAgentSDKVersionRange = ">=1.0.0 <2.0.0";
var strandsAgentSDKConfigs = [
  {
    channelName: strandsAgentSDKChannels.agentStream.channelName,
    module: {
      name: "@strands-agents/sdk",
      versionRange: strandsAgentSDKVersionRange,
      filePath: "dist/src/agent/agent.js"
    },
    functionQuery: {
      className: "Agent",
      methodName: "stream",
      kind: "Sync"
    }
  },
  {
    channelName: strandsAgentSDKChannels.graphStream.channelName,
    module: {
      name: "@strands-agents/sdk",
      versionRange: strandsAgentSDKVersionRange,
      filePath: "dist/src/multiagent/graph.js"
    },
    functionQuery: {
      className: "Graph",
      methodName: "stream",
      kind: "Sync"
    }
  },
  {
    channelName: strandsAgentSDKChannels.swarmStream.channelName,
    module: {
      name: "@strands-agents/sdk",
      versionRange: strandsAgentSDKVersionRange,
      filePath: "dist/src/multiagent/swarm.js"
    },
    functionQuery: {
      className: "Swarm",
      methodName: "stream",
      kind: "Sync"
    }
  }
];

// src/auto-instrumentations/configs/all.ts
var defaultInstrumentationConfigGroups = [
  { integrations: ["openai"], configs: openaiConfigs },
  {
    integrations: ["openaiCodexSDK"],
    configs: openAICodexConfigs
  },
  { integrations: ["anthropic"], configs: anthropicConfigs },
  {
    integrations: ["bedrock", "awsBedrock", "awsBedrockRuntime"],
    configs: bedrockRuntimeConfigs
  },
  {
    integrations: ["aisdk", "vercel"],
    configs: aiSDKConfigs
  },
  {
    integrations: ["claudeAgentSDK"],
    configs: claudeAgentSDKConfigs
  },
  {
    integrations: ["cloudflareAIChat"],
    configs: cloudflareAIChatConfigs
  },
  {
    integrations: ["cloudflareAgents"],
    configs: cloudflareAgentsConfigs
  },
  {
    integrations: ["cloudflareThink"],
    configs: cloudflareThinkConfigs
  },
  { integrations: ["cursor", "cursorSDK"], configs: cursorSDKConfigs },
  {
    integrations: ["openAIAgents"],
    configs: openAIAgentsCoreConfigs
  },
  {
    integrations: ["google", "googleGenAI"],
    configs: googleGenAIConfigs
  },
  {
    integrations: ["huggingface"],
    configs: [...huggingFaceConfigs, ...huggingFaceTransformersConfigs]
  },
  {
    integrations: ["langchain", "langgraph"],
    configs: langchainConfigs
  },
  { integrations: ["langsmith"], configs: langSmithConfigs },
  { integrations: ["openrouter"], configs: openRouterConfigs },
  {
    integrations: ["openrouterAgent"],
    configs: openRouterAgentConfigs
  },
  { integrations: ["mistral"], configs: mistralConfigs },
  { integrations: ["ollama"], configs: ollamaConfigs },
  { integrations: ["googleADK"], configs: googleADKConfigs },
  { integrations: ["cohere"], configs: cohereConfigs },
  { integrations: ["groq"], configs: groqConfigs },
  {
    integrations: ["genkit"],
    configs: genkitConfigs
  },
  {
    integrations: ["gitHubCopilot"],
    configs: gitHubCopilotConfigs
  },
  {
    integrations: ["piCodingAgent"],
    configs: piCodingAgentConfigs
  },
  {
    integrations: ["strandsAgentSDK"],
    configs: strandsAgentSDKConfigs
  },
  {
    integrations: ["flue"],
    configs: flueConfigs
  }
  // Note: `@mastra/core` is not listed here because its instrumentation
  // doesn't go through the AST `code-transformer` matcher — Mastra's
  // content-hashed chunks make `filePath`-based matching too brittle.
  // Instead it's handled by the source-replacement entry in
  // `loader/special-case-patches.ts`, which both the runtime loader
  // (`hook.mjs` → `cjs-patch.ts`/`esm-hook.mts`) and the bundler plugin
  // (`bundler/plugin.ts`) call. The `mastra` env-var disable still works.
];
function getDefaultInstrumentationConfigs({
  additionalInstrumentations,
  disabledIntegrationConfig,
  disabledIntegrations
} = {}) {
  const disabledConfig = disabledIntegrationConfig ?? (disabledIntegrations ? readDisabledInstrumentationEnvConfig(
    [...disabledIntegrations].join(",")
  ).integrations : void 0);
  return [
    ...defaultInstrumentationConfigGroups.flatMap(
      ({ configs, integrations }) => isInstrumentationIntegrationDisabled(disabledConfig, ...integrations) ? [] : configs
    ),
    ...additionalInstrumentations ?? []
  ];
}
function getDefaultAutoInstrumentationConfigs() {
  return getDefaultInstrumentationConfigs({
    disabledIntegrationConfig: readDisabledInstrumentationEnvConfig(
      process.env.BRAINTRUST_DISABLE_INSTRUMENTATION
    ).integrations
  });
}

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

// src/auto-instrumentations/hook.mts
var state = globalThis[/* @__PURE__ */ Symbol.for(
  `braintrust.applyAutoInstrumentation.global-hooks.v${GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION}`
)] ??= {};
var alreadyApplied = state.applied;
if (!alreadyApplied) {
  const allConfigs = getDefaultAutoInstrumentationConfigs();
  const disabled = readDisabledInstrumentationEnvConfig(
    process.env.BRAINTRUST_DISABLE_INSTRUMENTATION
  ).integrations;
  if (!isInstrumentationIntegrationDisabled(disabled, "mastra")) {
    installMastraExporterFactory(() => new BraintrustObservabilityExporter());
  }
  register("./loader/esm-hook.mjs", {
    parentURL: import.meta.url,
    data: { instrumentations: allConfigs }
  });
  state.applied = true;
  try {
    const patch = new ModulePatch({ instrumentations: allConfigs });
    patch.patch();
    if (process.env.DEBUG === "@braintrust*" || process.env.DEBUG === "*") {
      console.log(
        "[Braintrust] Auto-instrumentation active (ESM + CJS) for:",
        allConfigs.map((c) => c.channelName).join(", ")
      );
    }
  } catch (err) {
    if (process.env.DEBUG === "@braintrust*" || process.env.DEBUG === "*") {
      console.log(
        "[Braintrust] Auto-instrumentation active (ESM only) for:",
        allConfigs.map((c) => c.channelName).join(", ")
      );
      console.error("[Braintrust] CJS patch failed:", err);
    }
  }
}
