import { useState } from "react";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import { Layout, Header, Button, Card } from "../components";
import "../styles/index.css";

const bus = new MessageBus();

function App() {
  const [pong, setPong] = useState(false);

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
    </Layout>
  );
}

export default App;
