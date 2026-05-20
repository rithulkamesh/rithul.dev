"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Work } from "@/data/works";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

export function WorkList({ works }: { works: Work[] }) {
  return (
    <motion.div
      variants={SECTION_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-12"
    >
      <motion.div variants={SAFE_VARIANTS} className="flex items-center gap-2">
        <motion.div
          variants={DECORATIVE_VARIANTS}
          className="w-1 h-3 rounded-full bg-zinc-400/80 dark:bg-zinc-700/80"
        />
        <h1 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Work
        </h1>
      </motion.div>

      <div className="grid gap-10 md:gap-12">
        {works.map((work) => (
          <motion.div key={work.name} variants={SAFE_VARIANTS} className="group">
            <div className="flex items-baseline justify-between mb-3">
              {work.internal ? (
                <Link
                  href={work.href}
                  className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
                >
                  {work.name}
                  <span className="text-muted-foreground font-normal ml-2 text-sm">→</span>
                </Link>
              ) : (
                <a
                  href={work.href}
                  className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
                >
                  {work.name}
                  <span className="text-muted-foreground font-normal ml-2 text-sm">↗</span>
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-5 text-sm leading-relaxed">
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">Context</span>
                  <p className="text-muted-foreground">{work.context}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">Tension</span>
                  <p className="text-muted-foreground">{work.tension}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">Decision</span>
                  <p className="text-muted-foreground">{work.decision}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">Outcome</span>
                  <p className="text-muted-foreground">{work.outcome}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
