import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: ({ theme }: { theme: any }) => ({
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "hsl(var(--foreground))",
            '[class~="lead"]': {
              color: "hsl(var(--foreground))",
            },
            a: {
              color: "hsl(var(--primary))",
              textDecoration: "underline",
              textDecorationThickness: "1px",
              textUnderlineOffset: "4px",
              "&:hover": {
                color: "hsl(var(--primary))",
                textDecorationThickness: "2px",
              },
            },
            strong: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
            },
            "ol > li::marker": {
              color: "hsl(var(--foreground))", // Consistent marker color
            },
            "ul > li::marker": {
              color: "hsl(var(--muted-foreground))",
            },
            hr: {
              borderColor: "hsl(var(--border))",
              marginTop: "2em",
              marginBottom: "2em",
              opacity: "0.5",
            },
            blockquote: {
              borderLeftColor: "hsl(var(--border))",
              color: "hsl(var(--muted-foreground))",
              fontStyle: "italic",
            },
            h1: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-sans)",
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: "1em",
              lineHeight: "1.2",
            },
            h2: {
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-sans)",
              fontWeight: "600",
              marginTop: "2em",
              marginBottom: "0.8em",
              lineHeight: "1.3",
              paddingBottom: "0.5em",
              borderBottom: "1px solid hsl(var(--border))",
            },
            h3: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginTop: "1.5em",
              marginBottom: "0.6em",
              lineHeight: "1.4",
            },
            h4: {
              color: "hsl(var(--foreground))",
              fontWeight: "600",
              marginTop: "1.2em",
              marginBottom: "0.5em",
            },
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: "hsl(var(--muted))",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            // Editorial Lead - targeted via first-of-type
            "p:first-of-type": {
              fontSize: "1.15em",
              lineHeight: "1.7",
              color: "hsl(var(--muted-foreground))",
              marginBottom: "1.5em",
            },
            // General Body Rhythm
            p: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
              lineHeight: "1.75",
            },
            li: {
              marginTop: "0.5em",
              marginBottom: "0.5em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
