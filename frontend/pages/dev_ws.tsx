import React, { useState, useEffect } from "react";

const OPTIONAL_SUBURI: string =
  process.env.NEXT_PUBLIC_API_URL?.toString() ?? "no-valid-url";

const WebSocketComponent = () => {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [hostname, setHostname] = useState<string>("");

  // websocket stuff: remove if not needed
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (hostname !== "") {
      let base_url = "";
      if (/https?:\/\//.test(OPTIONAL_SUBURI)) {
        base_url = OPTIONAL_SUBURI;
      } else {
        base_url = `${hostname}${OPTIONAL_SUBURI}`;
      }

      base_url = `${base_url.replace(/^https?:\/\//, (match) =>
        match === "http://" ? "ws://" : "wss://",
      )}`;
      console.log("base_url", base_url)
      const newSocket = new WebSocket(`${base_url}/ws-test`);
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, [hostname]);

  const sendMessage = () => {
    if (socket && message.trim() !== "") {
      // Send the message to the WebSocket server
      socket.send(message);
      setMessage("");
    }
  };

  if (!socket) {
    return <div>Connecting to WebSocket...</div>;
  }

  return (
    <div className="App">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;
