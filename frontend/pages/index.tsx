// import Link from "next/link";
// import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/instructions");
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
