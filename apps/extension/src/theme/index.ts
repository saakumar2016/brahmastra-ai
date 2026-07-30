// Theme tokens are defined as CSS custom properties in *.css files.
// This module provides a TypeScript entry point for future typed
// theme utilities (e.g., getThemeValue(), ThemeProvider, etc.).

export type ThemeToken =
  | `--color-${string}`
  | `--space-${string}`
  | `--radius-${string}`
  | `--font-${string}`
  | `--line-height-${string}`
  | `--shadow-${string}`
  | `--transition-${string}`;
