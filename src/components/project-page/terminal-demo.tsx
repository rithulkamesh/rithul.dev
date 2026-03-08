"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

export interface TerminalLine {
  type: "prompt" | "output" | "success";
  text: string;
}

interface TerminalDemoProps {
  label?: string;
  lines: TerminalLine[];
  /** Delay before starting (ms). */
  startDelay?: number;
  /** Delay between lines (ms). */
  lineDelay?: number;
  /** Show section label above terminal. */
  showLabel?: boolean;
}

const promptChar = "$ ";
const outputPrefix = "> ";
const successPrefix = "✓ ";

function linePrefix(type: TerminalLine["type"]) {
  switch (type) {
    case "prompt":
      return promptChar;
    case "output":
      return outputPrefix;
    case "success":
      return successPrefix;
    default:
      return "";
  }
}

function lineColor(type: TerminalLine["type"]) {
  switch (type) {
    case "prompt":
      return "text-[#a6e3a1]"; // green
    case "output":
      return "text-[#cdd6f4]"; // text
    case "success":
      return "text-[#a6e3a1]"; // green
    default:
      return "text-foreground";
  }
}

export function TerminalDemo({
  label = "Demo",
  lines,
  startDelay = 400,
  lineDelay = 380,
  showLabel = true,
}: TerminalDemoProps) {
  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-4"
    >
      {showLabel && (
        <motion.div variants={SAFE_VARIANTS} className="flex items-center gap-2">
          <motion.div
            variants={DECORATIVE_VARIANTS}
            className="w-1 h-3 rounded-full bg-zinc-700/80 dark:bg-zinc-700/80 bg-zinc-400/80"
          />
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            {label}
          </h2>
        </motion.div>
      )}
      <motion.div
        variants={SAFE_VARIANTS}
        className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e] shadow-xl font-[var(--font-code)] min-w-0"
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-[#313244] border-b border-[#45475a]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f38ba8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f9e2af]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a6e3a1]" />
          <span className="text-xs font-mono text-[#6c7086] ml-2">
            terminal
          </span>
        </div>
        <div className="p-4 min-h-[10rem]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.2,
                delay: startDelay / 1000 + i * (lineDelay / 1000),
              }}
              className={`text-sm ${lineColor(line.type)} flex items-baseline gap-1 font-[var(--font-code)]`}
            >
              <span className="select-none shrink-0">{linePrefix(line.type)}</span>
              <span>{line.text}</span>
            </motion.div>
          ))}
          <motion.span
            className="inline-block w-2 h-4 ml-0.5 bg-[#a6e3a1] align-middle font-[var(--font-code)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: (startDelay + lines.length * lineDelay) / 1000,
              times: [0, 0.1, 0.5, 0.6],
            }}
            aria-hidden
          />
        </div>
      </motion.div>
    </motion.section>
  );
}
