# AI Assistant (Feature)

> **Purpose:** Feature spec for the conversational, chart-grounded AI assistant.
> **Last Updated:** 2026-08-02
> **Related Documents:** [Master Spec](../MASTER_SPEC.md) · [Milestone 11](../milestones/milestone-11-ai-assistant.md) · [Floating Assistant](floating-assistant.md) · [Backend API](../04-api/backend-api.md) · [Security](../SECURITY.md)

## Summary

A conversational **AI assistant grounded in the current chart context** — the trader asks questions about the chart, strategies, and journal, and the AI answers from real data, never from imagination.

## Why

Rule engines are deterministic but not conversational. The AI Assistant adds natural-language understanding while staying honest about data.

## Key Capabilities

- Chat from the Floating Assistant and/or Side Panel.
- Grounds answers in `ChartContext`, market data, strategy results, and journal.
- Follow-up questions ("what about the 4H?", "why did RSI signal fire?").
- Citation of the underlying data/strategy where relevant.
- Explicit "I don't know" when data is missing.

## Design Points

- Lives in `src/core/ai/` (planned).
- LLM provider is swappable; prompts are assembled from typed context payloads.
- Backend AI service is the default accelerator; extension stays offline-capable.

## Non-Goals

- Unverifiable predictions presented as fact.

## Dependencies

- Chart Context (03), Signal Engine (06), Trade Journal (09).

## Milestone

[`milestone-11-ai-assistant.md`](../milestones/milestone-11-ai-assistant.md)
