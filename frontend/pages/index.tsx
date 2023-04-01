import Link from "next/link";
import { Button } from "@mui/material";

export default function Home() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Behavioral experiment</h1>

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
        </Link>
      </div>
    </div>
  );
}
