# Build Process

> **Purpose:** How the extension is built from source to the unpacked extension.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Development Guide](../DEVELOPMENT_GUIDE.md) · [Release Process](release-process.md) · [Production Checklist](production-checklist.md)

## Tooling

- **pnpm** workspace (root) + **Turbo** task runner.
- **Vite 5** + **`@crxjs/vite-plugin`** for the extension build.
- **TypeScript** strict mode; tests excluded from the production build.

## Commands

```bash
# Build the extension (tsc + vite)
pnpm build:extension

# Watch mode during development
pnpm dev:extension

# Quality gates
pnpm lint            # ESLint (turbo)
pnpm typecheck       # tsc (turbo)
pnpm test            # Vitest (turbo)
pnpm format:check    # Prettier
```

## Output

`apps/extension/dist/` contains the unpacked extension:

- `manifest.json`
- service worker (`background`)
- content script
- popup + side panel HTML/JS/CSS
- icons

## Load in Chrome

1. `pnpm build:extension`.
2. Open `chrome://extensions` → enable **Developer mode**.
3. **Load unpacked** → select `apps/extension/dist`.

## Notes

- Type checking runs before the Vite build (`tsc && vite build`).
- Test files (`*.test.ts`) are excluded from the production build via `tsconfig.json`.
- Content scripts match `*.tradingview.com/*` and `kite.zerodha.com/*` per `public/manifest.json`.
