import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { createProviderApiKeyAuthMethod } from "openclaw/plugin-sdk/provider-auth";

export const QNAIGC_BASE_URL = "https://anthropic.qnaigc.com";

export const QNAIGC_MODELS = [
  { id: "minimax/minimax-m2.5", name: "MiniMax M2.5 (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 204800, maxTokens: 128000 },
  { id: "minimax/minimax-m2.1", name: "MiniMax M2.1 (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 204800, maxTokens: 128000 },
  { id: "minimax/minimax-m2.7", name: "MiniMax M2.7 (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 204800, maxTokens: 128000 },
  { id: "minimax/minimax-m2.5-highspeed", name: "MiniMax M2.5 HighSpeed (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 204800, maxTokens: 128000 },
  { id: "deepseek/deepseek-v3.2-251201", name: "DeepSeek V3.2 251201 (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 128000, maxTokens: 32000 },
  { id: "deepseek-r1-0528", name: "DeepSeek R1 0528 (QNAIGC)", reasoning: true, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 128000, maxTokens: 32000 },
  { id: "moonshotai/kimi-k2.5", name: "Moonshot AI Kimi K2.5 (QNAIGC)", reasoning: true, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 256000 },
  { id: "xiaomi/mimo-v2-flash", name: "Xiaomi Mimo-V2-Flash (QNAIGC)", reasoning: true, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 256000 },
  { id: "doubao-seed-1.6", name: "Doubao Seed 1.6 (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 32000 },
  { id: "doubao-seed-2.0-mini", name: "Doubao Seed 2.0 Mini (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 32000 },
  { id: "doubao-seed-2.0-pro", name: "Doubao Seed 2.0 Pro (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 128000 },
  { id: "qwen3.5-397b-a17b", name: "Qwen3.5 397B A17B (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 64000 },
  { id: "z-ai/glm-5", name: "Z-AI GLM-5 (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 128000, maxTokens: 32000 },
  { id: "stepfun/step-3.5-flash", name: "StepFun Step 3.5 Flash (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 32000 },
  { id: "meituan/longcat-flash-lite", name: "Meituan LongCat Flash Lite (QNAIGC)", reasoning: false, input: ["text"], cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, contextWindow: 256000, maxTokens: 320000 },
];

export default definePluginEntry({
  id: "openclaw-qnaigc-api",
  name: "QNAIGC API",
  description: "QNAIGC models using an Anthropic-compatible endpoint",
  register(api) {
    api.registerProvider({
      id: "openclaw-qnaigc-api",
      label: "QNAIGC",
      docsPath: "/providers/openclaw-qnaigc-api",
      envVars: ["QNAIGC_API_KEY"],
      auth: [
        createProviderApiKeyAuthMethod({
          providerId: "openclaw-qnaigc-api",
          methodId: "api-key",
          label: "QNAIGC API key",
          hint: "API key from QNAIGC",
          optionKey: "qnaigcApiKey",
          flagName: "--qnaigc-api-key",
          envVar: "QNAIGC_API_KEY",
          promptMessage: "Enter your QNAIGC API key",
          defaultModel: "deepseek/deepseek-v3.2-251201",
        }),
      ],
      catalog: {
        order: "simple",
        run: async (ctx) => {
          const { apiKey } = ctx.resolveProviderApiKey("openclaw-qnaigc-api");
          if (!apiKey) return null;

          return {
            provider: {
              baseUrl: QNAIGC_BASE_URL,
              apiKey,
              api: "anthropic-messages",
              models: QNAIGC_MODELS.map((model) => ({
                ...model,
                api: "anthropic-messages",
                provider: "openclaw-qnaigc-api",
                baseUrl: QNAIGC_BASE_URL,
              })),
            },
          };
        },
      },
      resolveDynamicModel: (ctx) => ({
        id: ctx.modelId,
        name: ctx.modelId,
        provider: "openclaw-qnaigc-api",
        api: "anthropic-messages",
        baseUrl: QNAIGC_BASE_URL,
        reasoning: false,
        input: ["text"],
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        contextWindow: 128000,
        maxTokens: 32000,
      }),
    });
  },
});
