import type { PageDetection } from "./types";

export class DetectionStore {
  private latestByTab = new Map<number, PageDetection>();
  private lastDetection: PageDetection | null = null;

  set(tabId: number, detection: PageDetection): void {
    this.latestByTab.set(tabId, detection);
    this.lastDetection = detection;
  }

  get(tabId: number): PageDetection | null {
    return this.latestByTab.get(tabId) ?? null;
  }

  getLatest(): PageDetection | null {
    return this.lastDetection;
  }
}
