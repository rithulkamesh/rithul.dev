"use client";
import { motion } from "framer-motion";
import { SAFE_VARIANTS, SECTION_VARIANTS } from "@/lib/animation";

export const Hero = () => {
  return (
    <section className="py-8 md:py-16">
      <motion.div
        variants={SECTION_VARIANTS}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={SAFE_VARIANTS}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground"
        >
          I build systems for high-leverage problems.
        </motion.h1>
        <motion.p
          variants={SAFE_VARIANTS}
          className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl"
        >
          Exploring the intersection of systems, tooling, and photonics.
          <br />
          <motion.span
            variants={SAFE_VARIANTS}
            className="text-muted-foreground/80 text-base mt-2 block"
          >
            Not a portfolio. This is a builder&apos;s lab.
          </motion.span>
        </motion.p>
      </motion.div>
    </section>
  );
};
