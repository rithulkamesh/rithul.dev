"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { works } from "@/data/works";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";
import { ContinuumActivity } from "./continuum-activity";

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const SelectedWork = () => {
  const [teaser, setTeaser] = useState<typeof works>([]);
  useEffect(() => {
    const continuum = works.find((w) => w.name === "continuum");
    const rest = works.filter((w) => w.name !== "continuum");
    setTeaser(continuum ? [continuum, pickOne(rest)] : [pickOne(rest)]);
  }, []);

  return (
    <motion.section
      id="selected-work"
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-8"
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

      <div className="grid gap-10 md:gap-12">
        {teaser.map((work) => (
          <motion.div
            key={work.name}
            variants={SAFE_VARIANTS}
            className="group"
          >
            <div className="flex items-baseline justify-between mb-3">
              {work.internal ? (
                <Link
                  href={work.href}
                  className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
                >
                  {work.name}
                  <span className="text-muted-foreground font-normal ml-2 text-sm">
                    →
                  </span>
                </Link>
              ) : (
                <a
                  href={work.href}
                  className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
                >
                  {work.name}
                  <span className="text-muted-foreground font-normal ml-2 text-sm">
                    ↗
                  </span>
                </a>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-5 text-sm leading-relaxed">
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">
                    Context
                  </span>
                  <p className="text-muted-foreground">{work.context}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">
                    Tension
                  </span>
                  <p className="text-muted-foreground">{work.tension}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">
                    Decision
                  </span>
                  <p className="text-muted-foreground">{work.decision}</p>
                </div>
                <div>
                  <span className="text-muted-foreground block font-mono text-xs mb-1">
                    Outcome
                  </span>
                  <p className="text-muted-foreground">{work.outcome}</p>
                </div>
              </div>
            </div>
            {work.name === "continuum" && <ContinuumActivity />}
          </motion.div>
        ))}
      </div>

      <motion.div variants={SAFE_VARIANTS}>
        <Link
          href="/work"
          className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          see all work →
        </Link>
      </motion.div>
    </motion.section>
  );
};
