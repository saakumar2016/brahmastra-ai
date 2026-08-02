import { useEffect, useState } from "react";
import { Button, Card, DetectionStatus, Header, Layout } from "../components";
import type { PageDetection } from "../shared/detection/types";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import "../styles/index.css";

const bus = new MessageBus();

function App() {
  const [pong, setPong] = useState(false);
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

  const handlePing = async () => {
    await bus.request({ type: MSG.PING });
    setPong(true);
  };

  return (
    <Layout>
      <Header title="Brahmastra AI" subtitle="AI Trading Assistant" />
      <Card>
        <p>Communication Ready</p>
      </Card>
      <Button onClick={handlePing}>Ping Background</Button>
      {pong && (
        <Card>
          <p>PONG</p>
        </Card>
      )}
      <DetectionStatus detection={detection} />
    </Layout>
  );
}

export default App;
