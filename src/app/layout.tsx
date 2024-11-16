import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LogLib from "@loglib/tracker/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = Inter({ subsets: ["latin-ext"] });

export const metadata: Metadata = {
  title: "Rithul Kamesh",
  description: "Portfolio website of Rithul Kamesh.",
  metadataBase: new URL("https://rithul.dev"),
  openGraph: {
    type: "website",
    siteName: "Rithul Kamesh",
    url: "https://rithul.dev",
    title: "Rithul Kamesh",
    description: "Portfolio website of Rithul Kamesh.",
    images: [
      {
        url: "https://rithul.dev/og_image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rithul Kamesh",
    description: "Portfolio website of Rithul Kamesh.",
    images: ["https://rithul.dev/og_image.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <LogLib
          config={{
            id: "rithul",
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
