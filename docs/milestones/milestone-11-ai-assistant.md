# Milestone 11 — AI Assistant

> **Purpose:** Conversational AI assistant grounded in the chart context and real data.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [AI Assistant feature](../03-features/ai-assistant.md) · [Floating Assistant](milestone-07-floating-assistant.md) · [Security](../SECURITY.md) · [Backend API](../04-api/backend-api.md)

## Status

⏳ **Not Started**

## Objective

Deliver a conversational AI assistant **grounded in the chart context** — answering questions from real data, never from imagination.

## Background

Rule engines are deterministic but not conversational. The AI Assistant adds natural-language interaction while staying honest about data and sources.

## Deliverables

- AI service (swappable LLM provider) in `src/core/ai/`
- Chat UI in the Floating Assistant and/or Side Panel
- Grounded prompts built from `ChartContext`, market data, strategy results, and journal
- Citations / "I don't know" behavior
- Backend AI endpoint as the default accelerator (offline-capable extension)

## Task Checklist

| Task ID | Title                                     | Priority | Size | Deps         | Status |
| ------- | ----------------------------------------- | -------- | ---- | ------------ | ------ |
| M11-T01 | AI service (swappable LLM provider)       | High     | M    | M06, M09     | Ready  |
| M11-T02 | Grounded prompt assembly + filtering      | High     | L    | M11-T01, M04 | Ready  |
| M11-T03 | Chat UI (Floating Assistant / Side Panel) | High     | M    | M11-T01, M07 | Ready  |
| M11-T04 | Citations + "I don't know" behavior       | High     | M    | M11-T02      | Ready  |
| M11-T05 | Backend AI endpoint wiring                | Medium   | M    | M11-T02      | Ready  |

> Status is authoritative in [`../../TASK_QUEUE.md`](../../TASK_QUEUE.md).

## Out of Scope

- Unverifiable predictions presented as fact

## Dependencies

- Milestones 03 (context), 04 (data), 05/06 (strategies/signal), 07 (chat surface), 09 (journal).

## Folder Changes

`src/core/ai/`, `src/ui/floating-assistant/` (chat)

## Architecture Impact

- Introduces a swappable LLM provider abstraction; default path is the backend endpoint.
- Grounding data is assembled from existing typed contracts — no new source of truth.
- Enforces a strict no-secrets rule: broker credentials are never part of AI context (see [SECURITY.md](../SECURITY.md)).

## Acceptance Criteria

- Answers reference real chart data; missing data is explicitly admitted
- Follow-up questions retain chart grounding
- LLM provider is swappable
- Sensitive data (broker credentials) never sent to the AI

## Testing

- Manual: "What's the current regime for BTCUSDT 1H?" → grounded answer with data; ask about a symbol not on the chart → honest "I don't have that context".
- Unit tests for prompt assembly, grounding filtering, and provider-swap behavior (mock provider).

## Definition of Done

- All acceptance criteria met; tests green; build/typecheck/lint/format pass.
- Feature doc, [SECURITY.md](../SECURITY.md), and changelog updated.

## Future Improvements

- Journal-aware coaching
- Strategy explanation ("why did the RSI cross fire?")
- Voice input

## Risks

- **Hallucination** — mitigated by strict grounding, citations, and explicit "I don't have that context" behavior.
- **Data leakage** — mitigated by the no-secrets rule and filtering of sensitive data from AI context.
- **Cost/latency** — mitigated by the backend accelerator and offline-capable extension design.
