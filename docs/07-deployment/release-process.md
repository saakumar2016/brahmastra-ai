# Release Process (Planned)

> **Purpose:** Defines the intended release cadence and versioning rules.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Build Process](build-process.md) · [Production Checklist](production-checklist.md) · [Change Log](../CHANGELOG.md)

> **Status: Planned** until the production milestone; the steps below define the intended release cadence.

## Versioning

- Semantic versioning (`major.minor.patch`).
- Version lives in `apps/extension/public/manifest.json` and the extension `package.json`.

## Flow

1. **Branch** — feature work on short-lived branches; merge to `main` via PR.
2. **Gate** — PR must pass: lint, typecheck, tests, prettier, build.
3. **Bump** — decide `major`/`minor`/`patch` from changes (breaking → major).
4. **Build** — `pnpm build:extension`.
5. **Smoke** — load unpacked `dist/` in a clean Chrome profile; run the manual test checklist.
6. **Tag** — create a git tag `vX.Y.Z`.
7. **Package** — zip `dist/` for store submission (Chrome Web Store).
8. **Publish** — submit to the store; monitor review.

## Rollback

- Store versions can be unlisted; keep the previous tagged build for hot-rollback.
- Feature flags (planned) allow disabling risky capabilities without a release.

## Environments

| Environment  | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| `dev`        | Unpacked extension from source (watch mode).                |
| `staging`    | Loaded unpacked build from CI (fixtures + mocked backends). |
| `production` | Chrome Web Store build.                                     |
