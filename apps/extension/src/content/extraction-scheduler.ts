export const CONTEXT_EXTRACTION_DEBOUNCE_MS = 500;

export class ExtractionScheduler {
  private timeoutId: number | undefined;

  constructor(
    private readonly run: () => void,
    private readonly delay: number = CONTEXT_EXTRACTION_DEBOUNCE_MS,
  ) {}

  scheduleImmediate(): void {
    this.cancel();
    this.run();
  }

  schedule(): void {
    if (this.timeoutId !== undefined) {
      return;
    }
    this.timeoutId = window.setTimeout(() => {
      this.timeoutId = undefined;
      this.run();
    }, this.delay);
  }

  cancel(): void {
    if (this.timeoutId !== undefined) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }
}
