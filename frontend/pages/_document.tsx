import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Behavioral experiment</title>
        <meta name="description" content="Behavioral experiment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <script src="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.js"></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/rrweb@latest/dist/rrweb.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/style.css"
      />
      <script src="https://cdn.jsdelivr.net/npm/rrweb-player@latest/dist/index.js"></script>
      <script>var scriptVar = 0</script>
    </Html>
  );
}
