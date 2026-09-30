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
        className="relative isolate overflow-hidden rounded-2xl bg-neutral-950 px-8 py-16 md:px-16 md:py-24 text-center dark:rounded-none dark:bg-transparent dark:px-0"
      >
        {/* Blurred glow field standing in for the "image" */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]"
        >
          <div className="animate-blob-drift absolute left-1/4 top-1/3 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/40 blur-[80px]" />
          <div
            className="animate-blob-drift absolute right-1/4 top-2/3 h-72 w-72 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/40 blur-[90px]"
            style={{ animationDelay: "-8s" }}
          />
        </div>

        <motion.p
          variants={SAFE_VARIANTS}
          className="text-2xl md:text-4xl font-semibold tracking-tight text-white text-balance"
        >
          If something here resonates,{" "}
          <a
            href="mailto:hi@rithul.dev"
            className="border-b border-white/40 hover:border-white transition-colors pb-0.5"
          >
            email me.
          </a>
        </motion.p>
        <motion.p variants={SAFE_VARIANTS} className="mt-3 text-white/60 text-sm">
          hi@rithul.dev
        </motion.p>
      </motion.div>
    </section>
  );
};
