"use client";
import React from "react";
import { motion } from "framer-motion";
import projectData from "@/data/projects.json";

interface Project {
  name: string;
  description: string;
  href: string;
  technologies: string[];
}

const techColors: { [key: string]: string } = {
  rs: "#d6a487",
  ts: "#3178c6",
  go: "#00ADD8",
  py: "#3572A5",
  lua: "#000080",
  cpp: "#f34b7d",
};

const techNames: { [key: string]: string } = {
  rs: "Rust",
  ts: "TypeScript",
  go: "Go",
  py: "Python",
  lua: "Lua",
  cpp: "C++",
};

const ProjectItem: React.FC<Project> = ({
  name,
  description,
  href,
  technologies,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-4"
  >
    <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold font-mono"
      >
        {name}
      </a>
      <span className="ml-2">
        {technologies.map((tech) => (
          <motion.span
            key={tech}
            className="inline-block w-3 h-3 rounded-full ml-1 relative group"
            style={{ backgroundColor: techColors[tech] }}
            whileHover={{ scale: 1.2 }}
          >
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-1 py-0.5 whitespace-nowrap">
              {techNames[tech]}
            </span>
          </motion.span>
        ))}
      </span>
    </div>
    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
      {description}
    </p>
  </motion.div>
);

const Projects: React.FC = () => (
  <div>
    <h2 className="text-lg mb-4">Projects</h2>
    {projectData.map((project: Project) => (
      <ProjectItem key={project.name} {...project} />
    ))}
  </div>
);

export default Projects;
