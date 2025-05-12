import React, { useState, useEffect } from "react";

const OPTIONAL_SUBURI: string =
  process.env.NEXT_PUBLIC_API_URL?.toString() ?? "no-valid-url";

const WebSocketComponent = () => {
  const [socket, setSocket] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [hostname, setHostname] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.origin);
    }
  }, []);

  const initWebSocket = () => {
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

    newSocket.addEventListener("close", () => {
      console.log("WebSocket connection closed unexpectedly. Reconnecting...");
      // Reconnect after a delay (e.g., 0.5 seconds)
      setTimeout(initWebSocket, 500);
    });

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  };

  useEffect(() => {
    if (hostname !== "") {
      return initWebSocket();
    }
  }, [hostname]);


  const sendMessage = () => {
    console.log(socket)
    if (socket && message.trim() !== "" && socket.readyState === 1) {
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
