"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

const artifacts = [
  { label: "Eurorack Patches", type: "Audio" },
  { label: "Graph Paper Sketches", type: "Image" },
  { label: "DSP Algorithms", type: "Code" },
];

export const HumanSignal = () => {
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
          Signal
        </h2>
      </motion.div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {artifacts.map((item) => (
          <motion.div
            key={item.label}
            variants={SAFE_VARIANTS}
            className="aspect-square bg-card border border-border flex flex-col items-center justify-center p-4 text-center group hover:bg-accent hover:border-border transition-all cursor-default"
          >
            <span className="text-muted-foreground text-xs font-mono mb-2 uppercase tracking-widest opacity-50">
              {item.type}
            </span>
            <span className="text-foreground group-hover:text-foreground/80 transition-colors font-medium">
              {item.label}
            </span>
          </motion.div>
        ))}
        <motion.div
          variants={SAFE_VARIANTS}
          className="aspect-square flex items-center justify-center p-4 text-center"
        >
          <span className="text-muted-foreground italic text-sm">
            More in the lab...
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
};
