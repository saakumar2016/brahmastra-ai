import { useState } from "react";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import type { ExtensionStatus } from "../shared/messaging/types";
import { Layout, Header, Button, StatusCard } from "../components";
import "../styles/index.css";

const bus = new MessageBus();

function App() {
  const [status, setStatus] = useState<ExtensionStatus | null>(null);

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
    </Layout>
  );
}

export default App;
