import type { PageDetection } from "./types";

export interface PageDetector {
  matches(url: URL): boolean;
  detect(doc: Document, url: URL): PageDetection;
}
