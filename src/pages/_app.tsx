import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { AppProps } from "next/app";
import LogLib from "@loglib/tracker/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LogLib
        config={{
          id: "rithul",
        }}
      />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
