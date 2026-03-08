"use client";

import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

interface LinksSectionProps {
  label: string;
  links: ProjectLink[];
}

export function LinksSection({ label, links }: LinksSectionProps) {
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
      <motion.ul variants={SAFE_VARIANTS} className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target={link.external !== false ? "_blank" : undefined}
              rel={link.external !== false ? "noopener noreferrer" : undefined}
              className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
            >
              {link.label}
              {link.external !== false && (
                <span className="text-muted-foreground ml-1">↗</span>
              )}
            </a>
          </li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
