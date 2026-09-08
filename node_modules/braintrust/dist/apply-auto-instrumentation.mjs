import {
  GLOBAL_INSTRUMENTATION_HOOKS_KEY,
  GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION,
  GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND,
  GLOBAL_INSTRUMENTATION_HOOK_BRAND,
  aiSDKChannels,
  anthropicChannels,
  classifyMastraTarget,
  claudeAgentSDKChannels,
  cloudflareAIChatChannels,
  cloudflareAgentsChannels,
  cloudflareThinkChannels,
  cohereChannels,
  cursorSDKChannels,
  flueChannels,
  genkitChannels,
  genkitCoreChannels,
  gitHubCopilotChannels,
  googleADKChannels,
  googleGenAIChannels,
  groqChannels,
  harnessAgentChannels,
  huggingFaceChannels,
  huggingFaceTransformersChannels,
  isInstrumentationIntegrationDisabled,
  langChainChannels,
  langSmithChannels,
  mistralChannels,
  ollamaChannels,
  openAIAgentsCoreChannels,
  openAIChannels,
  openAICodexChannels,
  openRouterAgentChannels,
  openRouterChannels,
  patchMastraSource,
  piCodingAgentChannels,
  readDisabledInstrumentationEnvConfig,
  smithyClientChannels,
  smithyCoreChannels,
  strandsAgentSDKChannels
} from "./chunk-CZM5JIQL.mjs";

// src/node/apply-auto-instrumentation-entry.ts
import { register } from "node:module";
import { pathToFileURL } from "node:url";

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

// src/auto-instrumentations/orchestrion-js/matcher.ts
import semifies from "semifies";

// src/auto-instrumentations/orchestrion-js/transformer.ts
import esquery2 from "esquery";
import { generate } from "astring";
import { parse as parse2 } from "meriyah";
import { SourceMapGenerator } from "source-map";

// src/auto-instrumentations/orchestrion-js/transforms.ts
import esquery from "esquery";
import { parse } from "meriyah";
var CHANNEL_REGEX = /[^\w]/g;
var SHARED_HOOK_LOOKUP = "tr_ch_bt$get_hook";
function formatChannelVariable(channelName) {
  return `tr_ch_bt$${channelName.replace(CHANNEL_REGEX, "_")}`;
}
function formatChannelGetter(channelName) {
  return `tr_ch_bt$get_${channelName.replace(CHANNEL_REGEX, "_")}`;
}
var transforms = {
  tracingHookDeclaration(state2, node) {
    const {
      channelName,
      module: { name }
    } = state2;
    const channelVariable = formatChannelVariable(channelName);
    const channelGetter = formatChannelGetter(channelName);
    const hasSharedHookLookup = node.body.some(
      (child) => child.declarations?.[0]?.id?.name === SHARED_HOOK_LOOKUP
    );
    if (node.body.some(
      (child) => child.declarations?.[0]?.id?.name === channelGetter
    )) {
      return;
    }
    const sharedHookLookup = hasSharedHookLookup ? "" : `
      const ${SHARED_HOOK_LOOKUP} = (__bt$hookName) => {
        try {
          const __bt$hooks = globalThis[${JSON.stringify(
      GLOBAL_INSTRUMENTATION_HOOKS_KEY
    )}];
          if (
            !(__bt$hooks instanceof Map) ||
            __bt$hooks[Symbol.for(${JSON.stringify(
      GLOBAL_INSTRUMENTATION_HOOKS_REGISTRY_BRAND
    )})] !== ${GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION}
          ) return undefined;
          const __bt$hook = Map.prototype.get.call(
            __bt$hooks,
            __bt$hookName
          );
          if (
            (__bt$hook === null ||
              (typeof __bt$hook !== "object" &&
                typeof __bt$hook !== "function")) ||
            __bt$hook[Symbol.for(${JSON.stringify(
      GLOBAL_INSTRUMENTATION_HOOK_BRAND
    )})] !== ${GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION} ||
            typeof __bt$hook.traceInvocation !== "function"
          ) return undefined;
          return __bt$hook;
        } catch {
          return undefined;
        }
      };
    `;
    const code = `
      ${sharedHookLookup}
      let ${channelVariable};
      const ${channelGetter} = () =>
        ${channelVariable} ??= ${SHARED_HOOK_LOOKUP}(
          ${JSON.stringify(`orchestrion:${name}:${channelName}`)}
        );
    `;
    const sharedHookLookupIndex = node.body.findIndex(
      (child) => child.declarations?.[0]?.id?.name === SHARED_HOOK_LOOKUP
    );
    const index = sharedHookLookupIndex === -1 ? node.body.findIndex(
      (child) => child.directive === "use strict"
    ) : sharedHookLookupIndex;
    node.body.splice(index + 1, 0, ...parse(code).body);
  },
  traceCallback: traceAny,
  tracePromise: traceAny,
  traceSync: traceAny
};
function traceAny(state2, node, _parent, ancestry) {
  const program = ancestry[ancestry.length - 1];
  if (node.type === "ClassDeclaration" || node.type === "ClassExpression") {
    traceInstanceMethod(state2, node, program);
  } else {
    traceFunction(state2, node, program);
  }
}
function traceFunction(state2, node, program) {
  transforms.tracingHookDeclaration(state2, program, null, []);
  const { functionQuery } = state2;
  const methodName = "methodName" in functionQuery ? functionQuery.methodName : void 0;
  const privateMethodName = "privateMethodName" in functionQuery ? functionQuery.privateMethodName : void 0;
  const functionName = "functionName" in functionQuery ? functionQuery.functionName : void 0;
  const isConstructor = methodName === "constructor" || !methodName && !privateMethodName && !functionName;
  const type = isConstructor ? "ArrowFunctionExpression" : "FunctionExpression";
  node.body = wrap(state2, {
    type,
    params: node.params,
    body: node.body,
    async: node.async,
    expression: false,
    generator: node.generator
  });
  node.generator = false;
  node.async = false;
  wrapSuper(node);
}
function traceInstanceMethod(state2, node, program) {
  const { functionQuery, operator } = state2;
  const { methodName } = functionQuery;
  if (!methodName) {
    return;
  }
  const classBody = node.body;
  if (classBody.body.some(({ key }) => key?.name === methodName)) {
    return;
  }
  let ctor = classBody.body.find(({ kind }) => kind === "constructor");
  transforms.tracingHookDeclaration(state2, program, null, []);
  if (!ctor) {
    ctor = parse(
      node.superClass ? "class A extends Object { constructor (...args) { super(...args) } }" : "class A { constructor () {} }"
    ).body[0].body.body[0];
    classBody.body.unshift(ctor);
  }
  const ctorBody = parse(`
    const __bt$${methodName} = this["${methodName}"]
    this["${methodName}"] = function () {}
  `).body;
  const fn = ctorBody[1].expression.right;
  fn.async = operator === "tracePromise";
  fn.body = wrap(state2, {
    type: "Identifier",
    name: `__bt$${methodName}`
  });
  wrapSuper(fn);
  ctor.value.body.body.push(...ctorBody);
}
function wrap(state2, node) {
  const wrapper = wrapInvocation(state2);
  const block = wrapper.body[0].body;
  const common = parse(
    node.type === "ArrowFunctionExpression" ? `
    const __bt$target = (...__bt$args) => {
      const __bt$wrapped = () => {};
      return __bt$wrapped(...__bt$args);
    };
  ` : `
    const __bt$target = function (...__bt$args) {
      const __bt$wrapped = () => {};
      return __bt$wrapped.apply(this, __bt$args);
    };
  `
  ).body;
  block.body.unshift(...common);
  esquery.query(block, "[id.name=__bt$wrapped]")[0].init = node;
  return block;
}
function wrapSuper(node) {
  const members = /* @__PURE__ */ new Set();
  esquery.traverse(
    node.body,
    esquery.parse("[object.type=Super]"),
    (node2, parent) => {
      const { name } = node2.property;
      let child;
      if (parent.callee) {
        const { expression } = parse(`__bt$super['${name}'].call(this)`).body[0];
        parent.callee = child = expression.callee;
        parent.arguments.unshift(...expression.arguments);
      } else {
        parent.expression = child = parse(`__bt$super['${name}']`).body[0];
      }
      child.computed = parent.callee.computed;
      child.optional = parent.callee.optional;
      members.add(name);
    }
  );
  for (const name of members) {
    const member = parse(`
      class Wrapper {
        wrapper () {
          __bt$super['${name}'] = super['${name}']
        }
      }
    `).body[0].body.body[0].value.body.body[0];
    node.body.body.unshift(member);
  }
  if (members.size > 0) {
    node.body.body.unshift(parse("const __bt$super = {}").body[0]);
  }
}
function wrapInvocation(state2) {
  const { channelName, moduleVersion, operator, functionQuery } = state2;
  const channelGetter = formatChannelGetter(channelName);
  const callbackIndex = functionQuery.callbackIndex ?? -1;
  return parse(`
    function wrapper () {
      const __bt$hook = ${channelGetter}();
      if (!__bt$hook) return __bt$target.apply(this, arguments);
      return __bt$hook.traceInvocation(
        ${JSON.stringify(operator)},
        __bt$target,
        this,
        arguments,
        { moduleVersion: ${JSON.stringify(moduleVersion)} },
        ${callbackIndex}
      );
    }
  `);
}

// src/auto-instrumentations/orchestrion-js/transformer.ts
var Transformer = class {
  moduleName;
  version;
  filePath;
  configs = [];
  constructor(moduleName, version, filePath, configs) {
    this.moduleName = moduleName;
    this.version = version;
    this.filePath = filePath;
    this.configs = configs;
  }
  /**
   * Instruments `code` by injecting global tracing hooks around the
   * target functions defined by this transformer's configs.
   */
  transform(code, moduleType) {
    if (Buffer.isBuffer(code)) {
      code = code.toString();
    }
    if (!code) {
      return { code };
    }
    let ast;
    let aliases = {};
    let injectionCount = 0;
    for (const config of this.configs) {
      const { astQuery, functionQuery } = config;
      if (!ast) {
        const options = {
          loc: true,
          ranges: true,
          raw: true,
          module: moduleType === "esm"
        };
        try {
          ast = parse2(code, options);
        } catch {
          ast = parse2(code, { ...options, module: !options.module });
        }
        if (moduleType === "esm") {
          aliases = this.collectExportAliases(ast);
        }
      }
      const resolvedFunctionQuery = this.resolveExportAlias(
        functionQuery,
        aliases
      );
      const query = astQuery || this.fromFunctionQuery(resolvedFunctionQuery);
      const state2 = {
        ...config,
        moduleVersion: this.version,
        functionQuery: resolvedFunctionQuery,
        operator: this.getOperator(resolvedFunctionQuery.kind)
      };
      esquery2.traverse(ast, esquery2.parse(query), (...args) => {
        injectionCount++;
        this.visit(state2, ...args);
      });
    }
    if (injectionCount === 0 && this.configs.length > 0) {
      const names = this.configs.map(({ astQuery, functionQuery }) => {
        const resolvedQuery = this.resolveExportAlias(functionQuery, aliases);
        const queryName = (q) => q.methodName || q.privateMethodName || q.functionName || q.propertyName || astQuery || "unknown";
        const originalName = queryName(functionQuery);
        const originalAlias = functionQuery.className || functionQuery.functionName;
        const resolvedAlias = resolvedQuery.className || resolvedQuery.functionName;
        if (originalAlias && originalAlias !== resolvedAlias) {
          return `${originalAlias} (local name: ${resolvedAlias})`;
        }
        return originalName;
      });
      throw new Error(
        `Failed to find injection points for: ${JSON.stringify(names)}`
      );
    }
    if (ast) {
      const file = `${this.moduleName}/${this.filePath}`;
      const sourceMap = new SourceMapGenerator({ file });
      const transformedCode = generate(ast, { sourceMap });
      const map = sourceMap.toString();
      return { code: transformedCode, map };
    }
    return { code };
  }
  free() {
  }
  visit(state2, ...args) {
    const transform = transforms[state2.operator];
    const { index = 0 } = state2.functionQuery;
    const [node] = args;
    const type = node.init?.type || node.type;
    if (type !== "ClassDeclaration" && type !== "ClassExpression") {
      if (node.type === "VariableDeclarator") {
        return;
      }
      state2.functionIndex = state2.functionIndex === void 0 ? 0 : state2.functionIndex + 1;
      if (index !== null && index !== state2.functionIndex) {
        return;
      }
    }
    transform(state2, ...args);
  }
  getOperator(kind) {
    switch (kind) {
      case "Async":
        return "tracePromise";
      case "Callback":
        return "traceCallback";
      case "Sync":
        return "traceSync";
    }
  }
  collectExportAliases(ast) {
    const aliases = {};
    for (const node of ast.body) {
      if (node.type === "ExportNamedDeclaration" && !node.source) {
        for (const spec of node.specifiers) {
          if (spec.exported && spec.local) {
            const exportedName = spec.exported.name ?? spec.exported.value;
            const localName = spec.local.name ?? spec.local.value;
            if (exportedName && localName) {
              aliases[exportedName] = localName;
            }
          }
        }
      }
    }
    return aliases;
  }
  resolveExportAlias(functionQuery, aliases) {
    if (!("isExportAlias" in functionQuery) || !functionQuery.isExportAlias) {
      return functionQuery;
    }
    if ("className" in functionQuery && aliases[functionQuery.className]) {
      return {
        ...functionQuery,
        className: aliases[functionQuery.className]
      };
    }
    if ("functionName" in functionQuery && aliases[functionQuery.functionName]) {
      return {
        ...functionQuery,
        functionName: aliases[functionQuery.functionName]
      };
    }
    return functionQuery;
  }
  functionQueryLabel(functionQuery) {
    if ("methodName" in functionQuery) {
      return functionQuery.methodName;
    }
    if ("privateMethodName" in functionQuery) {
      return functionQuery.privateMethodName;
    }
    if ("functionName" in functionQuery) {
      return functionQuery.functionName;
    }
    if ("propertyName" in functionQuery) {
      return functionQuery.propertyName;
    }
    return "unknown";
  }
  fromFunctionQuery(functionQuery) {
    const queries = [];
    if ("className" in functionQuery) {
      const { className } = functionQuery;
      const methodName = this.functionQueryLabel(functionQuery);
      const keyType = "privateMethodName" in functionQuery ? "PrivateIdentifier" : "Identifier";
      queries.push(
        `[id.name="${className}"]`,
        `[id.name="${className}"] > ClassExpression`,
        `[id.name="${className}"] > ClassBody > [key.name="${methodName}"][key.type=${keyType}] > [async]`,
        `[id.name="${className}"] > ClassExpression > ClassBody > [key.name="${methodName}"][key.type=${keyType}] > [async]`
      );
    } else if ("methodName" in functionQuery) {
      const { methodName } = functionQuery;
      queries.push(
        `ClassBody > [key.name="${methodName}"][key.type=Identifier] > [async]`,
        `Property[key.name="${methodName}"][key.type=Identifier] > [async]`
      );
    }
    if ("functionName" in functionQuery) {
      const { functionName } = functionQuery;
      queries.push(`FunctionDeclaration[id.name="${functionName}"][async]`);
    }
    if ("objectName" in functionQuery) {
      const { objectName, propertyName } = functionQuery;
      const objectSelector = objectName === "this" ? "left.object.type=ThisExpression" : `left.object.name="${objectName}"`;
      queries.push(
        `AssignmentExpression[${objectSelector}][left.property.name="${propertyName}"] > [async]`
      );
    }
    return queries.join(", ");
  }
};

// src/auto-instrumentations/orchestrion-js/matcher.ts
var InstrumentationMatcher = class {
  configs = [];
  transformers = {};
  constructor(configs) {
    this.configs = configs;
  }
  /**
   * Returns a Transformer for the given module/file/version, or undefined if no
   * registered config matches.
   */
  getTransformer(moduleName, version, filePath) {
    filePath = filePath.replace(/\\/g, "/");
    const id = `${moduleName}/${filePath}@${version}`;
    if (this.transformers[id]) {
      return this.transformers[id];
    }
    const configs = this.configs.filter(
      ({ module: mod }) => mod.name === moduleName && mod.filePath === filePath && semifies(version, mod.versionRange)
    );
    if (configs.length === 0) {
      return void 0;
    }
    this.transformers[id] = new Transformer(
      moduleName,
      version,
      filePath,
      configs
    );
    return this.transformers[id];
  }
  free() {
    this.transformers = {};
  }
};

// src/auto-instrumentations/orchestrion-js/index.ts
function create(configs) {
  return new InstrumentationMatcher(configs);
}

// src/auto-instrumentations/loader/cjs-patch.ts
import * as NodeModule from "node:module";
import { sep } from "node:path";
import moduleDetailsFromPath from "module-details-from-path";

// src/auto-instrumentations/loader/get-package-version.ts
import { readFileSync, realpathSync } from "node:fs";
import { join } from "node:path";
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

// src/auto-instrumentations/loader/openai-api-promise-patch.ts
var OPENAI_API_PROMISE_PATCH = `
;(function __btPatchAPIPromise() {
  if (typeof APIPromise === "undefined" || APIPromise.prototype.__btParsePatched) return;
  APIPromise.prototype.__btParsePatched = true;
  var _origThen = APIPromise.prototype.then;
  APIPromise.prototype.then = function __btThen(onfulfilled, onrejected) {
    if (!this.__btParseWrapped && Object.prototype.hasOwnProperty.call(this, "parseResponse")) {
      this.__btParseWrapped = true;
      var _origParse = this.parseResponse;
      var _cached;
      this.parseResponse = function() {
        if (!_cached) _cached = _origParse.apply(this, arguments);
        return _cached;
      };
    }
    return _origThen.call(this, onfulfilled, onrejected);
  };
})();
`;

// src/auto-instrumentations/loader/special-case-patches.ts
function applySpecialCasePatch(input) {
  if (input.packageName === "openai" && input.modulePath.includes("api-promise")) {
    return input.source + OPENAI_API_PROMISE_PATCH;
  }
  if (input.browser) {
    return null;
  }
  const mastraTarget = classifyMastraTarget(
    input.packageName,
    input.modulePath
  );
  if (mastraTarget) {
    return patchMastraSource(input.source, mastraTarget, input.format);
  }
  return null;
}

// src/auto-instrumentations/loader/cjs-patch.ts
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

// src/node/apply-auto-instrumentation-entry.ts
var stateKey = /* @__PURE__ */ Symbol.for(
  `braintrust.applyAutoInstrumentation.global-hooks.v${GLOBAL_INSTRUMENTATION_HOOKS_PROTOCOL_VERSION}`
);
var existingState = Object.getOwnPropertyDescriptor(
  globalThis,
  stateKey
)?.value;
var state = isApplyAutoInstrumentationState(
  existingState
) ? existingState : {};
if (state !== existingState) {
  Object.defineProperty(globalThis, stateKey, {
    configurable: false,
    enumerable: false,
    value: state,
    writable: false
  });
}
if (!state.applied) {
  const allConfigs = getDefaultAutoInstrumentationConfigs();
  const currentModuleUrl = getCurrentModuleUrl();
  register("./auto-instrumentations/loader/esm-hook.mjs", {
    parentURL: currentModuleUrl,
    data: { instrumentations: allConfigs }
  });
  state.applied = true;
  try {
    const patch = new ModulePatch({ instrumentations: allConfigs });
    patch.patch();
  } catch {
  }
}
function isApplyAutoInstrumentationState(value) {
  return typeof value === "object" && value !== null;
}
function getCurrentModuleUrl() {
  if (typeof __filename !== "undefined") {
    return pathToFileURL(__filename).href;
  }
  const stack = new Error().stack ?? "";
  const match = stack.match(/\((file:\/\/[^)]+)\)/) ?? stack.match(/\s(file:\/\/\S+)/);
  if (match) {
    return match[1].replace(/:\d+:\d+$/, "");
  }
  return pathToFileURL(process.argv[1] ?? process.cwd()).href;
}
