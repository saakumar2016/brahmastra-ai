import { useEffect, useState } from "react";
import { Button, DetectionStatus, Header, Layout, StatusCard } from "../components";
import type { PageDetection } from "../shared/detection/types";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import type { ExtensionStatus } from "../shared/messaging/types";
import "../styles/index.css";

const bus = new MessageBus();

function App() {
  const [status, setStatus] = useState<ExtensionStatus | null>(null);
  const [detection, setDetection] = useState<PageDetection | null>(null);

  useEffect(() => {
    const loadDetection = async () => {
      const response = await bus.request({ type: MSG.GET_PAGE_DETECTION });
      if (response.type === MSG.PAGE_DETECTION) {
        setDetection(response.payload);
      }
    };
    void loadDetection();
  }, []);

  const handleCheckStatus = async () => {
    const response = await bus.request({ type: MSG.GET_EXTENSION_STATUS });
    if (response.type === MSG.EXTENSION_STATUS) {
      setStatus(response.payload);
    }
  };

  const statusItems = status
    ? [
        { label: "Loaded", value: status.loaded ? "Yes" : "No" },
        { label: "Version", value: status.version },
        {
          label: "Timestamp",
          value: new Date(status.timestamp).toLocaleString(),
        },
      ]
    : [];

  return (
    <Layout>
      <Header title="Brahmastra AI" subtitle="AI Trading Assistant" />
      <Button onClick={handleCheckStatus}>Check Extension Status</Button>
      {status && <StatusCard items={statusItems} />}
      <DetectionStatus detection={detection} />
    </Layout>
  );
}

export default App;
