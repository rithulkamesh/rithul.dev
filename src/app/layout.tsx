import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, Fira_Code } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata, meta, images } from "@/lib/metadata";
import { QuantumPhotonicsBackground } from "@/components/home/quantum-photonics-background";

const font = Inter({ subsets: ["latin-ext"] });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-code",
});

export const metadata = new Metadata(
  "https://rithul.dev",
  meta,
  images,
  "/logo.svg"
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={firaCode.variable}>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <QuantumPhotonicsBackground />
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
