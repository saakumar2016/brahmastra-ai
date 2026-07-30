import { useState } from "react";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";

const bus = new MessageBus();

function App() {
  const [pong, setPong] = useState(false);

  const handlePing = async () => {
    await bus.request({ type: MSG.PING });
    setPong(true);
  };

  return (
    <div>
      <h1>Brahmastra AI</h1>
      <p>Communication Ready</p>
      <button onClick={handlePing}>Ping Background</button>
      {pong && <p>PONG</p>}
    </div>
  );
}

export default App;
