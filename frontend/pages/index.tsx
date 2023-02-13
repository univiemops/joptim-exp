import Head from "next/head";
import { Inter } from "@next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJS boilerplate app</title>
        <meta name="description" content="NextJS boilerplate app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="app">
        <h1>Next.js + TS + FastAPI + Postgres Template</h1>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes">Notes</Link>
          </li>
          <li>
            <Link href="/game">Game</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
