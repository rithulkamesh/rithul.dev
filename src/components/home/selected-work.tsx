"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

const works = [
  {
    name: "prismo",
    href: "https://github.com/rithulkamesh/prismo",
    context:
      "Simulating and analyzing electromagnetic wave propagation in photonic structures efficiently.",
    tension:
      "Traditional photonics solvers are either slow or hard to scale across platforms and materials.",
    decision:
      "Built a high-performance Python Finite-Difference Time-Domain (FDTD) solver with GPU acceleration and flexible material models.",
    outcome:
      "Accurate, extensible waveguide photonics simulations that run fast on both CPU and GPU, making advanced optical modeling accessible.",
  },
  {
    name: "docproc",
    href: "https://github.com/rithulkamesh/docproc",
    context:
      "Document extraction is often brittle or prohibitively expensive at scale.",
    tension: "Generic OCR lacks structure; specialized models lack speed.",
    decision:
      "Built an opinionated region analyzer in Python focusing on layout topology first.",
    outcome:
      "High-fidelity extraction for complex docs without the ML overhead.",
  },
];

export const SelectedWork = () => {
  return (
    <motion.section
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
        {works.map((work) => (
          <motion.div
            key={work.name}
            variants={SAFE_VARIANTS}
            className="group"
          >
            <div className="flex items-baseline justify-between mb-3">
              <a
                href={work.href}
                className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors"
              >
                {work.name}
                <span className="text-muted-foreground font-normal ml-2 text-sm">
                  ↗
                </span>
              </a>
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
