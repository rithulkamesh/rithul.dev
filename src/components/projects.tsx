"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import projects from "@/data/projects.json";

interface Project {
  name: string;
  description: string;
  href: string;
  technologies: string[];
}

const techConfig: Record<string, { color: string; name: string }> = {
  rs: { color: "#d6a487", name: "Rust" },
  ts: { color: "#3178c6", name: "TypeScript" },
  go: { color: "#00ADD8", name: "Go" },
  py: { color: "#3572A5", name: "Python" },
  lua: { color: "#000080", name: "Lua" },
  cpp: { color: "#f34b7d", name: "C++" },
};

export default function Projects() {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-medium text-zinc-200">Projects</h2>
      <div className="grid gap-4">
        {projects.map((project: Project) => (
          <motion.a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 -mx-4 rounded-lg transition-colors hover:bg-zinc-800/50 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Rest of your component remains the same */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-medium text-zinc-200 font-mono">
                  {project.name}
                </h3>
                <div className="flex gap-1.5">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="relative flex items-center group/tech"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: techConfig[tech].color }}
                      />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-200 opacity-0 group-hover/tech:opacity-100 transition-opacity whitespace-nowrap">
                        {techConfig[tech].name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="mt-1 text-sm text-zinc-400">{project.description}</p>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
