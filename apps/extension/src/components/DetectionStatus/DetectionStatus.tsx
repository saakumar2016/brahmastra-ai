import type { PageDetection } from "../../shared/detection/types";
import { PAGE_TYPE_LABELS } from "../../shared/detection/types";
import StatusCard from "../StatusCard";
import styles from "./DetectionStatus.module.css";

interface DetectionStatusProps {
  detection: PageDetection | null;
}

interface StatusItem {
  label: string;
  value: string;
}

const UNAVAILABLE = "Unavailable";

function formatValue(value: string): string {
  return value.trim() === "" ? UNAVAILABLE : value;
}

function buildItems(detection: PageDetection | null): StatusItem[] {
  if (detection === null) {
    return [
      { label: "TradingView", value: UNAVAILABLE },
      { label: "Page", value: UNAVAILABLE },
      { label: "Symbol", value: UNAVAILABLE },
      { label: "Exchange", value: UNAVAILABLE },
      { label: "Timeframe", value: UNAVAILABLE },
      { label: "URL", value: UNAVAILABLE },
    ];
  }

  if (!detection.supported) {
    return [
      { label: "TradingView", value: "Not Detected" },
      { label: "Page", value: detection.reason },
      { label: "Symbol", value: UNAVAILABLE },
      { label: "Exchange", value: UNAVAILABLE },
      { label: "Timeframe", value: UNAVAILABLE },
      { label: "URL", value: UNAVAILABLE },
    ];
  }

  return [
    { label: "TradingView", value: "Detected" },
    { label: "Page", value: PAGE_TYPE_LABELS[detection.pageType] },
    { label: "Symbol", value: formatValue(detection.symbol) },
    { label: "Exchange", value: formatValue(detection.exchange) },
    { label: "Timeframe", value: formatValue(detection.timeframe) },
    { label: "URL", value: formatValue(detection.url) },
  ];
}

function DetectionStatus({ detection }: DetectionStatusProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>TradingView Detection</h2>
      <StatusCard items={buildItems(detection)} />
    </section>
  );
}

export default DetectionStatus;
