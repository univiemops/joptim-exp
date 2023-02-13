import Head from "next/head";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Behavioral experiment</title>
        <meta name="description" content="Behavioral experiment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
        <h1>Behavioral experiment</h1>
        <ul>
          <li>
            <Link href="/game">Optimization Game</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
