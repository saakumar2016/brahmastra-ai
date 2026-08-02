# Folder Structure

> **Purpose:** Documents the repository layout and where each kind of code lives.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Architecture](architecture.md) · [Coding Standards](coding-standards.md) · [ADR-002](../08-adr/ADR-002-monorepo.md)

## Repository (now)

```
brahmastra-ai/
├── apps/
│   └── extension/               # Chrome Extension (Manifest V3)
│       └── src/
│           ├── components/      # Reusable React UI components
│           ├── core/            # UI-independent engines
│           │   ├── logger.ts    # Logger interface + ConsoleLogger
│           │   ├── text-utils.ts
│           │   └── context/     # Chart Context Extraction Engine
│           ├── styles/          # Global base styles
│           ├── theme/           # CSS custom-property theme tokens
│           ├── popup/           # Popup React app
│           ├── sidepanel/       # Side Panel React app
│           ├── background/      # Service worker (state owner)
│           ├── content/         # Content script + page watcher + scheduler
│           ├── shared/          # Messaging + detection layer
│           └── types/           # Shared TypeScript types
├── packages/                    # Shared libraries (future)
├── docs/                        # This documentation set
├── (config files)               # Workspace, turbo, eslint, prettier, tsconfig
```

## Repository (target)

As the roadmap progresses, `src/core/` grows into a set of independent, testable engines:

```
apps/extension/src/
├── core/
│   ├── context/                 # Chart Context Engine        (Milestone 03)
│   ├── market-data/             # Market Data Engine          (Milestone 04)
│   ├── strategy/                # Strategy Engine             (Milestone 05)
│   ├── signal/                  # Signal Engine               (Milestone 06)
│   ├── notifications/           # Notifications               (Milestone 08)
│   ├── journal/                 # Trade Journal               (Milestone 09)
│   ├── broker/                  # Broker Integration          (Milestone 10)
│   └── ai/                      # AI Assistant                (Milestone 11)
├── ui/
│   ├── popup/                   # Popup app
│   ├── sidepanel/               # Side Panel app
│   └── floating-assistant/      # Floating Assistant (Milestone 07)
├── background/
├── content/
└── shared/
```

## Conventions

- **`core/` is UI-independent.** It never imports React or DOM-specific UI.
- **`shared/` holds contracts** (types + messaging) usable by every context.
- **Feature code** lives under the engine that owns it; no ad-hoc folders.
- Each engine exports a barrel (`index.ts`).

## Docs Mirror

The `docs/` tree mirrors the module plan:

- `03-features/` documents each future engine (one file per feature).
- `milestones/` documents delivery per engine.
- `04-api/` documents the message/API contracts.
