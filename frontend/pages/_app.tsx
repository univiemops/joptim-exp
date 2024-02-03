import "@/styles/globals.css";
import "@/styles/experiment.css";
import "@/styles/instructions.css";
import type { AppProps } from "next/app";
import React from "react";
// import { record } from 'rrweb'; // rrweb stuff, remove if not needed
import { useRouter } from "next/router"

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;


export default function App({ Component, pageProps }: AppProps) {

  // BEGIN rrweb: remove if not needed
  const router = useRouter()
  let events: any = [];
  const XIDRef = React.useRef("");


  React.useEffect(() => {
    const newXID = router.query["XID"]
    if (typeof (newXID) === "string") {
      XIDRef.current = newXID;
    }
  }, [router.query]);


  React.useEffect(() => {
    if (window) {
      const stopFn = window.rrwebRecord({
        emit(event: any) {
          events.push(event);
        },
      });
      return () => {
        if (stopFn !== undefined) {
          stopFn();
        }
      };
    }
  }, []);


  const save = async () => {
    const XID = XIDRef.current
    const body = JSON.stringify({ XID, events });
    if (events.length > 0) {
      try {
        const res = await fetch(`${OPTIONAL_SUBURI}/rrweb/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body
        });

        if (!res.ok) {
          throw new Error("Failed to post events");
        }
      } catch (error) {
        console.error(error);
      }
      events = [];
    }
  }

  // save events every 10 seconds and
  React.useEffect(() => {
    const intervalId = setInterval(save, 10 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // END rrweb: remove if not needed

  return <Component {...pageProps} />;
}
