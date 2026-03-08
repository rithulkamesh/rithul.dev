"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

interface WhyIBuiltThisProps {
  children: React.ReactNode;
}

export function WhyIBuiltThis({ children }: WhyIBuiltThisProps) {
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
          Why I Built This
        </h2>
      </motion.div>
      <motion.div
        variants={SAFE_VARIANTS}
        className="rounded-xl border border-border bg-muted/20 p-6 text-muted-foreground leading-relaxed"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
