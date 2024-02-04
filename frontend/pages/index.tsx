import { useRouter } from "next/router";
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import { getURLParameter } from "../utils/webFunctions";
import React from "react";
import { Button } from "@mui/material";
import Head from 'next/head'

const OPTIONAL_SUBURI = process.env.NEXT_PUBLIC_API_URL;

const getXid = async (
  pid: string,
  setXid: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  try {
    const res = await fetch(`${OPTIONAL_SUBURI}/xid/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: pid,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch xid");
    }
    const json = await res.json();
    setXid(json.xid);
    console.log(json.xid, "was set for", pid);
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [xid, setXid] = useState<string | undefined>();
  const [leavePage, setLeavePage] = useState<boolean>(false);
  const router = useRouter();
  const getXidCalled = useRef(false); // Ref to track if getXid was called

  useEffect(() => {
    const prolificPid = getURLParameter("PROLIFIC_PID");
    if (!xid && prolificPid && prolificPid !== "" && !getXidCalled.current) {
      getXidCalled.current = true; // Set to true to prevent further calls
      getXid(prolificPid, setXid);
    }
  }, [xid]);

  useEffect(() => {
    if (leavePage) {
      router.push({
        pathname: "/experiment",
        query: { XID: xid },
      });
    }
  }, [leavePage]);

  useLayoutEffect(() => {
    if (leavePage) {
      // runs only if the user has already interacted with the page,
      // i.e. user has left the welcome page by clicking "continue"
      try {
        document.documentElement.requestFullscreen();
      } catch (error) {
        console.error("Error requesting fullscreen:", error);
      }
    }
  });

  return (
    <div className="App">
      <Head>
        <title>Online experiment</title>
      </Head>
      <h2>Behavioral experiment</h2>
      <Button
        size="large"
        variant="contained"
        style={{
          fontSize: "x-large",
          background: "#000000",
          textTransform: "none",
          padding: ".3rem 3rem .3rem 3rem",
        }}
        onClick={() => setLeavePage(true)}
      >
        START
      </Button>
    </div>
  );
}
