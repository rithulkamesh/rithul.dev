"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SECTION_VARIANTS, SAFE_VARIANTS } from "@/lib/animation";

interface ProjectHeroProps {
  title: string;
  description: string;
  tagline?: string;
  githubUrl: string;
}

export function ProjectHero({
  title,
  description,
  tagline,
  githubUrl,
}: ProjectHeroProps) {
  return (
    <section className="py-8 md:py-16 -mx-6 px-6 md:-mx-12 md:px-12 rounded-xl bg-muted/30 border border-border/50">
      <motion.div
        variants={SECTION_VARIANTS}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.div variants={SAFE_VARIANTS}>
          <Link
            href="/#selected-work"
            className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>
        </motion.div>
        <motion.h1
          variants={SAFE_VARIANTS}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
        >
          {title}
        </motion.h1>
        <motion.p
          variants={SAFE_VARIANTS}
          className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          {description}
        </motion.p>
        {tagline && (
          <motion.p
            variants={SAFE_VARIANTS}
            className="text-muted-foreground/80 text-base"
          >
            {tagline}
          </motion.p>
        )}
        <motion.div variants={SAFE_VARIANTS}>
          <Button variant="outline" size="default" asChild>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              View on GitHub
              <span className="text-muted-foreground">↗</span>
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
