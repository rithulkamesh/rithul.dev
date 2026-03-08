"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

export interface ArchitectureStep {
  label: string;
  /** If set, render as parallel worker nodes (e.g. Worker 1, 2, 3). */
  subLabels?: string[];
}

interface ArchitectureDiagramProps {
  label: string;
  steps: ArchitectureStep[];
}

function ConnectorLine({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative w-px h-8 flex-shrink-0 mx-auto overflow-hidden bg-border/60 rounded-full">
      <motion.span
        className="absolute left-1/2 top-0 w-1.5 h-1.5 -ml-0.75 rounded-full bg-primary/80 shadow-[0_0_8px_hsl(var(--primary))]"
        animate={{ y: [0, 32] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: delay % 2,
        }}
      />
    </div>
  );
}

function Node({
  label,
  hoverGlow = true,
}: {
  label: string;
  hoverGlow?: boolean;
}) {
  return (
    <motion.div
      className={`
        px-4 py-3 rounded-lg border border-border bg-card/60 font-mono text-sm text-foreground text-center
        transition-all duration-200
        ${hoverGlow ? "hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] hover:bg-card/80" : ""}
      `}
      whileHover={hoverGlow ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.div>
  );
}

function ParallelNodes({
  labels,
  hoverGlow = true,
}: {
  labels: string[];
  hoverGlow?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {labels.map((l, i) => (
        <motion.div
          key={l}
          className={`
            px-3 py-2 rounded-lg border border-border bg-card/60 font-mono text-xs text-foreground
            transition-all duration-200
            ${hoverGlow ? "hover:border-primary/40 hover:shadow-[0_0_16px_hsl(var(--primary)/0.12)]" : ""}
          `}
          animate={{ opacity: [0.9, 1], scale: [1, 1.02] }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          whileHover={hoverGlow ? { scale: 1.05 } : undefined}
        >
          {l}
        </motion.div>
      ))}
    </div>
  );
}

export function ArchitectureDiagram({ label, steps }: ArchitectureDiagramProps) {
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
      <motion.div
        variants={SAFE_VARIANTS}
        className="flex flex-col items-center gap-0 py-6 px-6 rounded-xl bg-muted/15 border border-border"
      >
        {steps.map((step, i) => (
          <span key={i} className="flex flex-col items-center w-full max-w-xs">
            {step.subLabels ? (
              <ParallelNodes labels={step.subLabels} />
            ) : (
              <Node label={step.label} />
            )}
            {i < steps.length - 1 && <ConnectorLine delay={i * 0.5} />}
          </span>
        ))}
      </motion.div>
    </motion.section>
  );
}
