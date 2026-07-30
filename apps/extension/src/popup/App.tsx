import { useState } from "react";
import { MessageBus } from "../shared/messaging/message-bus";
import { MSG } from "../shared/messaging/constants";
import type { ExtensionStatus } from "../shared/messaging/types";

const bus = new MessageBus();

function App() {
  const [status, setStatus] = useState<ExtensionStatus | null>(null);

  const handleCheckStatus = async () => {
    const response = await bus.request({ type: MSG.GET_EXTENSION_STATUS });
    if (response.type === MSG.EXTENSION_STATUS) {
      setStatus(response.payload);
    }
  };

  return (
    <div>
      <h1>Brahmastra AI</h1>
      <button onClick={handleCheckStatus}>Check Extension Status</button>
      {status && (
        <div>
          <p>Loaded: {status.loaded ? "Yes" : "No"}</p>
          <p>Version: {status.version}</p>
          <p>Timestamp: {new Date(status.timestamp).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
