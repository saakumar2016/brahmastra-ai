# Security

> **Purpose:** Security principles and requirements for the Brahmastra AI extension.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](MASTER_SPEC.md) · [Architecture](01-architecture/architecture.md) · [Extension API](04-api/extension-api.md) · [Broker API](04-api/broker-api.md) · [Production Checklist](07-deployment/production-checklist.md)

## Extension Permissions

- Keep the permission surface **minimal** (least privilege). Current manifest: `storage`.
- Add permissions only when a feature genuinely needs them (e.g. `notifications`, `alarms`, `identity` for broker OAuth).
- Review `public/manifest.json` on every release; remove unused permissions.
- Content scripts run only on declared hosts (`*.tradingview.com/*`, `kite.zerodha.com/*`) and never fetch external resources directly.

## Token Storage

- Broker/AI tokens are stored **encrypted at rest**; never plaintext in `chrome.storage`.
- Tokens never appear in logs, errors, or debug output.
- Session tokens (short-lived) live in `chrome.storage.session`; durable secrets use `chrome.storage.local` with encryption or the OS keychain via the background.
- Tokens are scoped to the minimum capability (e.g. read + trade for broker; never blanket).

## Secrets Handling

- No API keys, passwords, or tokens in source code, config, or bundled output.
- Use environment/manifest build-time injection for public values only; keep real secrets out of the repo entirely.
- Sanitize errors before logging to prevent secret leakage.

## Authentication

- Broker and backend authentication uses **OAuth** where supported (via `chrome.identity`), never password capture.
- Refresh tokens rotate; sessions expire and re-authenticate.
- All external calls originate from the **background service worker**, not the content script.

## Message Validation

- Every runtime message is validated against its typed contract (`MSG` + payload types) before handling.
- Handlers verify `sender` origin/context; ignore malformed or unexpected messages.
- Never trust content-script-supplied state as authoritative — the background re-validates.

## Content Security Policy

- MV3 enforces an extension-wide CSP; no remote code or remote scripts.
- All scripts are bundled by Vite; no inline script injection.
- No `eval`; no `innerHTML` with untrusted data.

## XSS Prevention

- Render all TradingView/user-derived text via React escaping; never `dangerouslySetInnerHTML` with untrusted content.
- Sanitize anything surfaced from broker/backend responses before rendering.
- Escape URLs opened from notifications or watchlist entries.

## Dependency Updates

- Track dependency health (e.g. `pnpm outdated`, security advisories).
- Update patched versions promptly; review `audit` output before releases.
- Reproducible installs via the committed lockfile.

## Secure Coding Guidelines

- Strict TypeScript; no `any`; validate all external input at module boundaries.
- No business logic in content script that can leak page data outside intended channels.
- Order placement always requires **explicit user confirmation**; dry-run mode for testing.
- Use the `Logger` abstraction — never log sensitive values.
- Follow [`01-architecture/coding-standards.md`](01-architecture/coding-standards.md) and the [production checklist](07-deployment/production-checklist.md).
