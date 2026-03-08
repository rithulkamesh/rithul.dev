"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

interface CodeSnippetProps {
  label: string;
  code: string;
  language?: string;
}

export function CodeSnippet({ label, code, language = "bash" }: CodeSnippetProps) {
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
      <motion.div variants={SAFE_VARIANTS}>
        <pre className="bg-[#1e1e2e] rounded-lg p-4 overflow-x-auto border border-border code-block">
          <code className="text-sm text-foreground">{code.trim()}</code>
        </pre>
      </motion.div>
    </motion.section>
  );
}
