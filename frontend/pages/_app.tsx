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
  const rrwebScript = `${basePath}/rrweb/rrweb.min.js`
  const rrwebPlayerScript = `${basePath}/rrweb/player/index.js`
  const status1 = useScript(rrwebScript, {
    removeOnUnmount: false,
  });

  const status2 = useScript(rrwebPlayerScript, {
    removeOnUnmount: false,
  });
  const [socket, setSocket] = React.useState<any>(null);
  const [hostname, setHostname] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.origin);
    }
  }, []);

  let socketConnections = 0;

  React.useEffect(() => {
    if (hostname !== "" && socketConnections === 0) {
      let base_url = "";
      socketConnections++;
      if (/https?:\/\//.test(OPTIONAL_SUBURI)) {
        base_url = OPTIONAL_SUBURI;
      } else {
        base_url = `${hostname}${OPTIONAL_SUBURI}`;
      }

      base_url = `${base_url.replace(/^https?:\/\//, (match) =>
        match === "http://" ? "ws://" : "wss://",
      )}`;
      console.log("base_url", base_url);
      const newSocket = new WebSocket(`${base_url}/rrweb-ws`);
      setSocket(newSocket);

      return () => {
        if (newSocket) {
          newSocket.close();
        }
      };
    }
  }, [hostname]);

  const sendToBackend = (event: any) => {
    if (socket && socket.readyState === 1) {
      const xid = XIDRef.current;
      socket.send(JSON.stringify({ xid, event }));
    }
  };

  React.useEffect(() => {
    console.log("status1:", status1)
    const xid = XIDRef.current;
    console.log("window.rrweb:", window.rrweb)
    if (window && xid !== "") {
      if (window.rrweb) {
        const stopFn = window.rrweb.record({
          inlineStylesheet: true,
          // checkoutEveryNth: 200,
          emit(event: any) {
            if (socket) {
              sendToBackend(event);
            }
          },
        });
        return () => {
          if (stopFn !== undefined) {
            stopFn();
          }
        };
      }
    }
  }, [socket, router.query, status1, status2]);

  // websocket END

  return (
    <>
      <link rel="stylesheet" href={`${basePath}/rrweb/rrweb.min.css`} />
      <link rel="stylesheet" href={`${basePath}/rrweb/player/style.css`} />
      <Component {...pageProps} />
    </>
  );
}
