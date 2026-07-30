# Brahmastra AI

A production-grade Chrome Extension for AI-powered trading.

## Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Language**: TypeScript
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Extension**: React + Vite + Manifest V3

## Getting Started

```bash
pnpm install
```

## Development

```bash
# Build the extension (production)
pnpm build:extension

# Watch mode (auto-rebuild on changes)
pnpm dev:extension
```

The built extension is output to `apps/extension/dist/`.

## Loading into Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select `apps/extension/dist/`
5. The extension should now appear in your toolbar

### Verifying the install

- **Popup**: Click the extension icon in the toolbar to see "Brahmastra AI Chrome Extension Loaded"
- **Side Panel**: Open the side panel via the extension icon or `chrome://extensions` shortcuts
- **Console**: Open DevTools on any page — you should see "Brahmastra content script loaded" on TradingView/Kite pages

## Scripts

| Script                 | Description                          |
| ---------------------- | ------------------------------------ |
| `pnpm lint`            | Run ESLint across all packages       |
| `pnpm format`          | Format code with Prettier            |
| `pnpm format:check`    | Check formatting without writing     |
| `pnpm typecheck`       | Run TypeScript checks                |
| `pnpm build:extension` | Build the Chrome Extension           |
| `pnpm dev:extension`   | Watch mode for extension development |

## Project Structure

```
brahmastra-ai/
├── apps/
│   └── extension/       # Chrome Extension (Manifest V3)
├── packages/            # Shared libraries
├── docs/                # Project documentation
└── (config files)       # Root workspace configuration
```

## License

MIT
