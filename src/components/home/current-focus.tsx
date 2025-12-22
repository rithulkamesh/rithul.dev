"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

const experiments = [
  {
    question: "Can we quantify 'taste' in code?",
    tag: "AI / Systems",
  },
  {
    question: "Latency as a creative constraint in game engines.",
    tag: "Engine Dev",
  },
  {
    question: "Minimalist state management for high-frequency apps.",
    tag: "Web / Performance",
  },
];

export const CurrentFocus = () => {
  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-6 relative"
    >
      {/* Decorative accent line - purely decorative, can fade from 0 */}
      <motion.div
        variants={DECORATIVE_VARIANTS}
        className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-border via-border to-transparent origin-top"
      />

      <div className="pl-6">
        <motion.div
          variants={SAFE_VARIANTS}
          className="flex items-center gap-3 mb-2"
        >
          {/* Decorative dot */}
          <motion.div
            variants={DECORATIVE_VARIANTS}
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
          />
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            Current Experiments
          </h2>
        </motion.div>

        <motion.p
          variants={SAFE_VARIANTS}
          className="text-muted-foreground text-xs max-w-md"
        >
          Raw notes, unfinished prototypes, and late-night explorations.
        </motion.p>
      </div>

      <div className="space-y-3 pl-6">
        {experiments.map((item, index) => (
          <motion.div
            key={index}
            variants={SAFE_VARIANTS}
            className="group py-2 border-b border-border hover:border-foreground/20 transition-colors"
          >
            <p className="text-lg text-foreground group-hover:text-foreground/80 transition-colors font-medium">
              {item.question}
            </p>
            <span className="text-xs text-muted-foreground font-mono mt-1 block uppercase tracking-wide">
              {item.tag}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
