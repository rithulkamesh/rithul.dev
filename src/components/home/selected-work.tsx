"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

const works = [
  {
    name: "docproc",
    href: "https://github.com/rithulkamesh/docproc",
    context:
      "Document extraction is often brittle, lossy with images, or prohibitively expensive at scale.",
    tension:
      "Generic OCR ignores structure; most \"AI study tools\" quietly fail on diagrams, equations, and screenshot-heavy slides.",
    decision:
      "Built an opinionated document intelligence CLI that uses vision LLMs and config-driven RAG to turn arbitrary slides, papers, and textbooks into clean, full-context markdown.",
    outcome:
      "Static PDFs become queryable, refinable knowledge—ready for RAG, notes, flashcards, and assessment pipelines.",
  },
  {
    name: "Photonical",
    href: "#",
    context:
      "Working on a proprietary photonics platform that bridges simulation and design workflows.",
    tension:
      "Most photonics tools are either opaque GUIs or low-level solvers that are hard to integrate into modern research and product stacks.",
    decision:
      "Designing Photonical as a focused, proprietary environment that pairs high-fidelity simulation with opinionated, ergonomic workflows.",
    outcome:
      "In active development—aimed at making advanced photonics exploration feel closer to modern software engineering.",
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
