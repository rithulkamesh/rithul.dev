"use client";
import { motion } from "framer-motion";
import { SAFE_VARIANTS, SECTION_VARIANTS } from "@/lib/animation";

export const Contact = () => {
  return (
    <section className="py-12 md:py-20">
      <motion.div
        variants={SECTION_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        <motion.p
          variants={SAFE_VARIANTS}
          className="text-xl md:text-2xl text-foreground"
        >
          If something here resonates,
          <a
            href="mailto:hi@rithul.dev"
            className="text-foreground border-b border-muted-foreground hover:border-foreground transition-colors ml-2 pb-0.5"
          >
            email me.
          </a>
        </motion.p>
        <motion.p
          variants={SAFE_VARIANTS}
          className="text-muted-foreground text-sm"
        >
          hi@rithul.dev
        </motion.p>
      </motion.div>
    </section>
  );
};
