// import Link from "next/link";
// import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getURLParameter } from "../utils/webFunctions";

export default function Home() {
  const router = useRouter();
  // runs only once at the beginning set PID from url params, and move
  // to instructions
  useEffect(() => {
    console.log("PID", getURLParameter("PROLIFIC_PID"));
    router.push({
      pathname: "/instructions",
      query: { PID: getURLParameter("PROLIFIC_PID") },
    });
  }, []);

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
