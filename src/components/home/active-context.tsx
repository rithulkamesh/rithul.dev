"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

const contexts = [
  {
    entity: "H2LooP // Hydron",
    role: "AI Developer Advocate Intern",
    description:
      "Building technical demos and developer content for Hydron's AI-powered embedded development platform.",
    href: "https://hydron.sh",
    status: "Building",
  },
  {
    entity: "Photonics & Quantum Lab",
    role: "Research Assistant",
    description: "Investigating neural networks for quantum experimentation.",
    href: "https://pes.edu",
    status: "Researching",
  },
  {
    entity: "PES University",
    role: "Student",
    description:
      "Deepening roots in electronics & communication via a Bachelor's degree.",
    href: "https://pes.edu",
    status: "Learning",
  },
];

const pastContexts = [
  {
    entity: "PES University",
    role: "Teaching Assistant",
    description:
      "Non-Linear Optics and Quantum Technology, co-delivering lectures and building study guides and question banks for 100+ students.",
    period: "Jan 2026 – May 2026",
  },
];

export const ActiveContext = () => {
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
          Active Context
        </h2>
      </motion.div>
      <div className="flex flex-col gap-3">
        {contexts.map((item) => (
          <motion.a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            key={`${item.entity}-${item.role}`}
            variants={SAFE_VARIANTS}
            className="group block"
          >
            {/* Grid Layout: Entity | / | Role | / | Description */}
            <div className="grid grid-cols-1 md:grid-cols-[13rem_1.5rem_9rem_1.5rem_1fr] items-baseline md:gap-0 gap-1">
              {/* Entity */}
              <h3 className="text-foreground font-medium text-base group-hover:text-foreground/80 transition-colors">
                {item.entity}
              </h3>

              {/* Separator 1 */}
              <span className="hidden md:flex justify-center text-muted-foreground/30 font-light select-none">
                /
              </span>

              {/* Role */}
              <span className="text-muted-foreground text-sm md:text-base group-hover:text-muted-foreground/80 transition-colors">
                {item.role}
              </span>

              {/* Separator 2 */}
              <span className="hidden md:flex justify-center text-muted-foreground/30 font-light select-none">
                /
              </span>

              {/* Description */}
              <span className="text-muted-foreground/80 text-sm md:text-base group-hover:text-muted-foreground transition-colors">
                {item.description}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div variants={SAFE_VARIANTS} className="flex flex-col gap-3 mt-2">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground/50">
          Past Context
        </h3>
        <div className="flex flex-col gap-2">
          {pastContexts.map((item) => (
            <div
              key={`${item.entity}-${item.role}`}
              className="grid grid-cols-1 md:grid-cols-[13rem_1.5rem_9rem_1.5rem_1fr] items-baseline md:gap-0 gap-1 opacity-50"
            >
              <h4 className="text-foreground font-medium text-sm">
                {item.entity}
              </h4>
              <span className="hidden md:flex justify-center text-muted-foreground/30 font-light select-none">
                /
              </span>
              <span className="text-muted-foreground text-xs md:text-sm">
                {item.role}
              </span>
              <span className="hidden md:flex justify-center text-muted-foreground/30 font-light select-none">
                /
              </span>
              <span className="text-muted-foreground/80 text-xs md:text-sm">
                {item.description}{" "}
                <span className="whitespace-nowrap">({item.period})</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={SAFE_VARIANTS} className="flex flex-col gap-6 mt-6">
        <p className="text-muted-foreground text-sm italic border-l-2 border-border pl-3 py-1">
          Most of what lives here is evolving, experimental, or being refined in
          public.
        </p>

        {/* Philosophical Signal: Parkinson's Law */}
        <div className="opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-xs font-mono tracking-wider text-muted-foreground uppercase">
            Parkinson’s Law: Work expands to the time alloted to it.
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
};
