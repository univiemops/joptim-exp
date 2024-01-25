import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Behavioral experiment</title>
        <meta name="description" content="Behavioral experiment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://webgazer.cs.brown.edu/webgazer.js" type="text/javascript" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <script>
        var scriptVar = 0
      </script>
    </Html>
  );
}
