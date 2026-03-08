"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

interface TerminalSnippetProps {
  label: string;
  code: string;
}

export function TerminalSnippet({ label, code }: TerminalSnippetProps) {
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
      <motion.div variants={SAFE_VARIANTS} className="rounded-lg overflow-hidden border border-border bg-[#1e1e2e] shadow-lg">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-500/80" />
          <span className="text-xs font-mono text-muted-foreground ml-2">terminal</span>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="code-block text-sm text-foreground">{code.trim()}</code>
        </pre>
      </motion.div>
    </motion.section>
  );
}
