import {
  INSTRUMENTATION_NAMES,
  aiSDKConfigs,
  anthropicConfigs,
  bedrockRuntimeConfigs,
  channel,
  claudeAgentSDKConfigs,
  cloudflareAIChatConfigs,
  cloudflareAgentsConfigs,
  cloudflareThinkConfigs,
  cohereConfigs,
  cursorSDKConfigs,
  defineChannels,
  genkitConfigs,
  gitHubCopilotConfigs,
  googleADKConfigs,
  googleGenAIConfigs,
  groqConfigs,
  huggingFaceConfigs,
  langSmithConfigs,
  langchainConfigs,
  mistralConfigs,
  ollamaConfigs,
  openAIAgentsCoreConfigs,
  openAICodexConfigs,
  openRouterAgentConfigs,
  openRouterConfigs,
  openaiConfigs,
  piCodingAgentConfigs
} from "./chunk-ZNHTSSGI.mjs";
import {
  applySpecialCasePatch,
  create
} from "./chunk-I55G56ZL.mjs";
import {
  getPackageName
} from "./chunk-P5YLNB2A.mjs";

// src/auto-instrumentations/bundler/plugin.ts
import { createUnplugin } from "unplugin";
import { extname, isAbsolute, join, sep } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import moduleDetailsFromPath from "module-details-from-path";

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
var huggingFaceTransformersConfigs = moduleFiles.flatMap(({ filePath, versionRange }) => [
  {
    channelName: huggingFaceTransformersChannels.pipeline.channelName,
    module: {
      name: "@huggingface/transformers",
      versionRange,
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
      versionRange,
      filePath
    },
    functionQuery: {
      className,
      methodName: "_call",
      kind: "Async"
    }
  }))
]);

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

// src/auto-instrumentations/bundler/plugin.ts
function getModuleVersion(basedir) {
  try {
    const packageJsonPath = join(basedir, "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    if (packageJson.version) {
      return packageJson.version;
    }
  } catch (error) {
  }
  return void 0;
}
var unplugin = createUnplugin((options = {}) => {
  const browser = options.browser ?? options.useDiagnosticChannelCompatShim ?? false;
  const allInstrumentations = getDefaultInstrumentationConfigs({
    additionalInstrumentations: options.instrumentations
  });
  const instrumentationMatcher = create(allInstrumentations);
  return {
    name: "code-transformer",
    enforce: "pre",
    transformInclude(id) {
      const pathWithoutQuery = id.split("?", 1)[0];
      if (!pathWithoutQuery) {
        return false;
      }
      if (pathWithoutQuery.startsWith("file:")) {
        try {
          return isAbsolute(fileURLToPath(pathWithoutQuery));
        } catch {
          return false;
        }
      }
      return isAbsolute(pathWithoutQuery);
    },
    transform(code, id) {
      if (!id) {
        return null;
      }
      const cleanId = id.replace(/[?#].*$/, "");
      const filePath = cleanId.startsWith("file:") ? fileURLToPath(cleanId) : cleanId;
      const ext = extname(filePath);
      let isModule = ext === ".mjs" || ext === ".ts" || ext === ".tsx";
      if (ext === ".js") {
        isModule = code.includes("export ") || code.includes("import ");
      }
      const normalizedForPlatform = filePath.split("/").join(sep);
      const moduleDetails = moduleDetailsFromPath(normalizedForPlatform);
      if (!moduleDetails) {
        return null;
      }
      const moduleName = getPackageName(moduleDetails.basedir) ?? moduleDetails.name;
      const normalizedModulePath = moduleDetails.path.replace(/\\/g, "/");
      const moduleVersion = getModuleVersion(moduleDetails.basedir);
      const patched = applySpecialCasePatch({
        packageName: moduleName,
        modulePath: normalizedModulePath,
        source: code,
        format: isModule ? "esm" : "cjs",
        browser
      });
      if (patched !== null) {
        return { code: patched, map: null };
      }
      if (!moduleVersion) {
        console.warn(
          `No 'package.json' version found for module ${moduleName} at ${moduleDetails.basedir}. Skipping transformation.`
        );
        return null;
      }
      const transformer = instrumentationMatcher.getTransformer(
        moduleName,
        moduleVersion,
        normalizedModulePath
      );
      if (!transformer) {
        return null;
      }
      try {
        const moduleType = isModule ? "esm" : "cjs";
        const result = transformer.transform(code, moduleType);
        return {
          code: result.code,
          map: result.map
        };
      } catch (error) {
        console.warn(`Code transformation failed for ${id}: ${error}`);
        return null;
      }
    }
  };
});

export {
  unplugin
};
