# Milestone 12 — Production Release

> **Purpose:** Harden, package, and distribute Brahmastra AI as a production-quality Chrome extension.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Production Checklist](../07-deployment/production-checklist.md) · [Release Process](../07-deployment/release-process.md) · [Security](../SECURITY.md)

## Status

⏳ **Not Started**

## Objective

Harden, package, and distribute Brahmastra AI as a production-quality Chrome extension.

## Background

A great engine is only useful if it ships safely. This milestone closes security, reliability, performance, and store-distribution gaps so the extension can ship to real users.

## Deliverables

- Production hardening (per `docs/07-deployment/production-checklist.md`)
- E2E smoke suite
- Release automation (tag, package, submit)
- Store listing, privacy policy, support docs
- Feature flags for safe rollouts

## Out of Scope

- New features

## Dependencies

- All functional milestones (01–11) completed and hardened.

## Folder Changes

`./` (CI, release scripts), `apps/extension/dist` (packaging)

## Architecture Impact

- Introduces release automation and feature flags at the workspace level.
- Finalizes the permission surface and CSP posture for distribution.
- Establishes the release/rollback process used for all future versions.

## Acceptance Criteria

- Production checklist fully green
- Extension verified in a clean Chrome profile
- Versioned release with rollback path
- Permission surface minimal and reviewed

## Testing

- E2E smoke suite across install → detect → context → signal paths.
- Manual: clean-profile install → all features work, missing data shows "Unavailable"; offline, unauthenticated, and broker-disconnected scenarios degrade gracefully.

## Definition of Done

- Production checklist 100% green.
- Tagged, versioned release published with rollback path.
- Store listing, privacy policy, and support docs live.
- Changelog updated.

## Future Improvements

- Social trading (low priority)
- Mobile companion app (low priority)

## Risks

- **Store review rejection** — mitigated by minimal permissions, CSP compliance, and a thorough production checklist.
- **Release regressions** — mitigated by the E2E smoke suite and feature flags.
