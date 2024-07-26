import "@/styles/globals.css";
import "@/styles/experiment.css";
import "@/styles/instructions.css";
import type { AppProps } from "next/app";
import React from "react";
import { useRouter } from "next/router";
import { useScript } from "../utils/useScript";

const OPTIONAL_SUBURI: string =
  process.env.NEXT_PUBLIC_API_URL?.toString() ?? "no-valid-url";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

enum EventType {
  DomContentLoaded,
  Load,
  FullSnapshot,
  IncrementalSnapshot,
  Meta,
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const XIDRef = React.useRef("");

  React.useEffect(() => {
    const newXID = router.query["XID"];
    if (typeof newXID === "string") {
      XIDRef.current = newXID;
    }
  }, [router.query]);

  // // websocket stuff begin (remove if not needed)
  const rrwebScript = `${basePath}/rrweb/rrweb-record.js`;
  const rrwebPlayerScript = `${basePath}/rrweb/player/index.js`;
  const status1 = useScript(rrwebScript, {
    removeOnUnmount: false,
  });
  const status2 = useScript(rrwebPlayerScript, {
    removeOnUnmount: false,
  });

  const [socket, setSocket] = React.useState<any>(null);
  const [hostname, setHostname] = React.useState<string>("");
  const [connectionLost, setConnectionLost] = React.useState<boolean>(false);

  React.useEffect(() => {
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
      match === "http://" ? "ws://" : "wss://"
    )}`;
    const newSocket = new WebSocket(`${base_url}/rrweb-ws`);
    setSocket(newSocket);
    setConnectionLost(false);
    newSocket.addEventListener("close", () => {
      setConnectionLost(true);
      newSocket.close();
      console.log("WebSocket connection closed unexpectedly. Reconnecting...");
      setTimeout(initWebSocket, 500);
    });
  };

  React.useEffect(() => {
    if (hostname !== "") {
      return initWebSocket();
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [hostname]);

  const sendToBackend = (event: any) => {
    if (socket && socket.readyState === 1) {
      const xid = XIDRef.current;
      // console.log(EventType[event.type], "event successfully sent to backend")
      socket.send(JSON.stringify({ xid, event }));
    } else {
      // console.log(EventType[event.type], "event NOT sent to backend")
    }
  };

  React.useEffect(() => {
    const xid = XIDRef.current;

    if (window && xid !== "") {
      if (window.rrwebRecord) {
        let stopFn: () => void;

        const startRecording = () => {
          stopFn = window.rrwebRecord({
            inlineStylesheet: true,
            // checkoutEveryNth: 100,
            emit(event: any, isCheckout: boolean) {
              sendToBackend(event);
            },
          });
        };

        // Check socket.readyState before starting recording
        if (socket.readyState === 1) {
          startRecording();
        } else {
          const handleSocketOpen = () => {
            startRecording();
            socket.removeEventListener("open", handleSocketOpen);
          };
          socket.addEventListener("open", handleSocketOpen);
        }

        return () => {
          // Clean up code
          if (stopFn) {
            stopFn();
          }
        };
      }
    }
  }, [socket, router.query, status1, status2, connectionLost]);
  // websocket END

  return (
    <>
      <link rel="stylesheet" href={`${basePath}/rrweb/rrweb.min.css`} />
      <link rel="stylesheet" href={`${basePath}/rrweb/player/style.css`} />
      <Component {...pageProps} />
    </>
  );
}
