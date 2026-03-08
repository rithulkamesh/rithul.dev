"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";
import {
  Box,
  FileCode,
  Calculator,
  Image,
  LayoutGrid,
  Sparkles,
  Users,
  Brain,
  GitBranch,
  Wrench,
  Terminal,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Box,
  FileCode,
  Calculator,
  Image,
  LayoutGrid,
  Sparkles,
  Users,
  Brain,
  GitBranch,
  Wrench,
  Terminal,
};

export interface FeatureTile {
  title: string;
  description?: string;
  /** Lucide icon name, e.g. "FileCode", "Calculator". Must be in ICON_MAP. */
  iconName: string;
}

interface FeatureGridProps {
  label: string;
  features: string[] | FeatureTile[];
}

function isFeatureTile(f: string | FeatureTile): f is FeatureTile {
  return typeof f === "object" && "title" in f && "iconName" in f;
}

export function FeatureGrid({ label, features }: FeatureGridProps) {
  const tiles = features.map((f) =>
    isFeatureTile(f)
      ? { ...f, icon: ICON_MAP[f.iconName] ?? Box }
      : { title: f, description: undefined, icon: Box }
  );

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
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {tiles.map((tile, i) => {
          const Icon = "icon" in tile ? tile.icon : Box;
          return (
            <motion.div
              key={i}
              className="group border border-border p-5 bg-card/50 rounded-lg transition-all duration-200 hover:border-primary/30 hover:shadow-[0_0_24px_hsl(var(--primary)/0.08)] hover:bg-card/80"
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-muted border border-border group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-foreground font-medium text-sm">
                    {tile.title}
                  </p>
                  {tile.description && (
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                      {tile.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
