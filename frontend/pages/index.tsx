import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { getURLParameter } from "../utils/webFunctions";
import React from "react";
import Link from "next/link";
import { Button } from "@mui/material";

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
  const router = useRouter();
  const getXidCalled = useRef(false); // Ref to track if getXid was called

  useEffect(() => {
    const prolificPid = getURLParameter("PROLIFIC_PID");
    if (!xid && prolificPid && prolificPid !== "" && !getXidCalled.current) {
      getXidCalled.current = true; // Set to true to prevent further calls
      getXid(prolificPid, setXid);
    }
  }, [xid]);

  return (
    <div className="App">
      <h1>Behavioral experiment</h1>
      <Link href={`/instructions?XID=${xid}`}>
        <Button
          size="large"
          variant="contained"
          style={{
            fontSize: "xx-large",
            background: "#000000",
            textTransform: "none",
            padding: ".3rem 3rem .3rem 3rem",
          }}
        >
          START
        </Button>
      </Link>
    </div>
  );
}
