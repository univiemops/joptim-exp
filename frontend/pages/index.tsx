// import Link from "next/link";
// import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getURLParameter } from "../utils/webFunctions";
import React from "react";

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
  } catch (error) {
    console.error(error);
  }
};

export default function Home() {
  const [xid, setXid] = useState<string>();
  const router = useRouter();
  // runs only once at the beginning set PID from url params, and move
  // to instructions
  useEffect(() => {
    if (xid != undefined) {
      router.push({
        pathname: "/instructions",
        query: { XID: xid },
      });
    } else {
      if (getURLParameter("PROLIFIC_PID") != "") {
        const res = getXid(getURLParameter("PROLIFIC_PID"), setXid);
      }
    }
  }, [xid]);

  return (
    <div className="App">
      <div className="App-header">
        {/*<h1>Behavioral experiment</h1>
          <Link href="/instructions">
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
          </Link>*/}
      </div>
    </div>
  );
}
