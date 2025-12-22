"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

const courses = [
  {
    title: "The Art of Latency",
    status: "Draft",
    description: "Understanding system responsiveness beyond simple metrics.",
  },
  {
    title: "DSP for Software Engineers",
    status: "Planned",
    description:
      "Bridging the gap between continuous signals and discrete code.",
  },
];

export const GuidedExperiments = () => {
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
          Guided Experiments
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => (
          <motion.div
            key={course.title}
            variants={SAFE_VARIANTS}
            className="border border-border p-5 bg-card/50 hover:border-foreground/20 transition-colors group cursor-default"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-foreground font-medium group-hover:text-foreground/80 transition-colors">
                {course.title}
              </h3>
              <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground border border-border px-1.5 py-0.5 rounded">
                {course.status}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {course.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
