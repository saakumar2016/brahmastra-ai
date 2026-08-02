# Production Checklist

> **Purpose:** Hardening checklist enforced before every store submission.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 12](../milestones/milestone-12-production-release.md) · [Security](../SECURITY.md) · [Release Process](release-process.md)

> **Status: Planned.** To be enforced at Milestone 12 (Production Release) and before every store submission.

## Security

- [ ] No secrets/API keys in code or bundled output.
- [ ] Credentials encrypted at rest; scoped OAuth.
- [ ] Permission surface minimal (review `manifest.json`).
- [ ] Content script cannot leak page data outside intended channels.
- [ ] External calls only via the background (no direct content-script fetches).

## Reliability

- [ ] Graceful degradation verified: every feature works without broker/AI/backend.
- [ ] Partial-failure paths tested (one detector failing never drops others).
- [ ] Debounce/racing behavior covered with fake timers.
- [ ] Content script never throws into the host page.

## Performance

- [ ] No repeated DOM scraping (extraction debounced).
- [ ] No duplicate legend queries across detectors.
- [ ] Bundle size reviewed; unused permissions/imports removed.

## Testing

- [ ] All unit tests pass (`pnpm test`).
- [ ] E2E smoke suite green (extension load → detect → extract → render).
- [ ] Manual test checklist executed in a clean Chrome profile.

## Distribution

- [ ] `manifest.json` version bumped and icons present.
- [ ] Unpacked `dist/` zipped and validated.
- [ ] Store listing, privacy policy, and support links in place.
- [ ] Tagged release with rollback build retained.

## UX

- [ ] Unavailable states render instead of blanks.
- [ ] Assistant/overlays never obscure critical chart actions by default.
- [ ] Keyboard accessibility for all custom UI.
