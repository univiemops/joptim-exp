import { Inter } from "@next/font/google";
import Link from "next/link";
import { Button } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Behavioral experiment</h1>

        <Link href="/game">
          <Button
            size="large"
            variant="contained"
            style={{
              fontSize: "xx-large",
              background: "#000000",
              textTransform: "none",
              padding: ".5rem 3rem .2rem 3rem",
            }}
          >
            START
          </Button>
        </Link>
      </div>
    </div>
  );
}
