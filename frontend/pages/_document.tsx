import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Behavioral experiment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <script src="/joptim/rrweb/rrweb.min.js"></script>
      <link rel="stylesheet" href="/joptim/rrweb/rrweb.min.css" />
      <link rel="stylesheet" href="/joptim/rrweb/player/style.css" />
      <script src="/joptim/rrweb/player/index.js"></script>
      <script>var scriptVar = 0</script>
    </Html>
  );
}
