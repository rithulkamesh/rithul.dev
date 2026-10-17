"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { works } from "@/data/works";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";
import { WorkFeatured, WorkRows } from "@/components/work-list";

export const SelectedWork = () => {
  return (
    <motion.section
      id="selected-work"
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
          Selected Work
        </h2>
      </motion.div>

      <WorkFeatured work={works[0]} />
      <WorkRows works={works.slice(1, 5)} />

      <motion.div variants={SAFE_VARIANTS}>
        <Link
          href="/work"
          className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          and much more… →
        </Link>
      </motion.div>
    </motion.section>
  );
};
