export function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
