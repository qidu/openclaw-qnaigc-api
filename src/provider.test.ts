import { describe, expect, it, vi } from "vitest";

vi.mock("openclaw/plugin-sdk/plugin-entry.js", () => ({
  definePluginEntry: (entry: any) => entry,
}));

vi.mock("openclaw/plugin-sdk/provider-auth.js", () => ({
  createProviderApiKeyAuthMethod: (method: any) => method,
}));

const { default: plugin } = await import("../index.js");

describe("openclaw-qnaigc-api provider", () => {
  it("registers the qnaigc provider", () => {
    const providers: any[] = [];

    plugin.register({
      registerProvider(provider: any) {
        providers.push(provider);
      },
    } as any);

    expect(providers).toHaveLength(1);
    expect(providers[0].id).toBe("openclaw-qnaigc-api");
    expect(providers[0].label).toBe("QNAIGC");
    expect(providers[0].envVars).toEqual(["QNAIGC_API_KEY"]);
    expect(providers[0].resolveDynamicModel({ modelId: "custom-model" }).id).toBe("custom-model");
  });

  it("exposes the qnaigc model catalog", async () => {
    const provider: any = {};
    plugin.register({
      registerProvider(entry: any) {
        Object.assign(provider, entry);
      },
    } as any);

    const result = await provider.catalog.run({
      resolveProviderApiKey: () => ({ apiKey: "test-key" }),
    } as any);

    expect(result?.provider?.baseUrl).toBe("https://anthropic.qnaigc.com");
    expect(result?.provider?.models).toHaveLength(10);
    expect(result?.provider?.models?.[0]?.id).toBe("minimax/minimax-m2.5");
  });

  it("returns null catalog when no key", async () => {
    const provider: any = {};
    plugin.register({
      registerProvider(entry: any) {
        Object.assign(provider, entry);
      },
    } as any);

    const result = await provider.catalog.run({
      resolveProviderApiKey: () => ({ apiKey: undefined }),
    } as any);

    expect(result).toBeNull();
  });
});
