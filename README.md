
# OpenClaw Provider Plugin

OpenClaw provider plugin for several QNAIGC models defined in `index.ts`.

## File Structure

```bash
extensions/openclaw-qnaigc-api/
├── package.json              # openclaw.providers metadata
├── openclaw.plugin.json      # Manifest with providerAuthEnvVars
├── index.ts                  # definePluginEntry + registerProvider
└── src/
    └── provider.test.ts      # Tests
```
