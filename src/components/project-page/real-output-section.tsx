"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

interface RealOutputSectionProps {
  label: string;
  inputTitle?: string;
  inputContent: React.ReactNode;
  outputTitle?: string;
  outputContent: React.ReactNode;
}

export function RealOutputSection({
  label,
  inputTitle = "Input",
  inputContent,
  outputTitle = "Output",
  outputContent,
}: RealOutputSectionProps) {
  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-6"
    >
      <motion.div variants={SAFE_VARIANTS} className="flex items-center gap-2">
        <motion.div
          variants={DECORATIVE_VARIANTS}
          className="w-1 h-3 rounded-full bg-zinc-700/80 dark:bg-zinc-700/80 bg-zinc-400/80"
        />
        <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </h2>
      </motion.div>
      <motion.div
        variants={SAFE_VARIANTS}
        className="flex flex-col md:flex-row md:items-stretch gap-4"
      >
        <div className="flex-1 rounded-lg border border-border bg-muted/20 p-4 min-w-0">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
            {inputTitle}
          </p>
          <div className="text-sm text-foreground/90">{inputContent}</div>
        </div>
        <div className="flex md:flex-col items-center justify-center text-muted-foreground shrink-0">
          <span className="text-xl">→</span>
        </div>
        <div className="flex-1 rounded-lg border border-border bg-[#1e1e2e] p-4 overflow-x-auto min-w-0">
          <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
            {outputTitle}
          </p>
          <div className="font-[var(--font-code)] text-sm text-[#cdd6f4]">
            {outputContent}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
