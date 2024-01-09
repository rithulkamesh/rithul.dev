import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const title = "Rithul Kamesh";
  const description = "Portfolio website of Rithul Kamesh.";
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/logo.svg" />

        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Rithul Kamesh" />
        <meta property="og:url" content="https://rithul.dev" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={"https://rithul.dev/og_image.png"} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rithul.dev" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content={"https://rithul.dev/og_image.png"}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
