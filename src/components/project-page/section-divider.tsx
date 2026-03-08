"use client";

type DividerVariant = "default" | "glow" | "grid";

interface SectionDividerProps {
  variant?: DividerVariant;
}

export function SectionDivider({ variant = "default" }: SectionDividerProps) {
  if (variant === "glow") {
    return (
      <div className="w-full my-4 py-2" aria-hidden>
        <div
          className="h-px w-full opacity-80"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--border)), hsl(var(--primary) / 0.35), hsl(var(--border)), transparent)",
            boxShadow: "0 0 12px hsl(var(--primary) / 0.15)",
          }}
        />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div
        className="w-full my-4 h-12 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className="h-px w-full my-2 opacity-60"
      style={{
        background:
          "linear-gradient(90deg, transparent, hsl(var(--border)), hsl(var(--muted-foreground) / 0.3), hsl(var(--border)), transparent)",
      }}
      aria-hidden
    />
  );
}
