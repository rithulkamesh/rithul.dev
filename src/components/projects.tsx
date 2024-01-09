import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "./ui/card";
import projectData from "@/data/projects.json";

enum Tech {
  rs = "#d6a487",
  ts = "#3178c6",
  go = "#00ADD8",
  py = "#3572A5",
  lua = "#000080",
  cpp = "#f34b7d",
}

enum Language {
  rs = "Rust",
  ts = "TypeScript",
  go = "Go",
  py = "Python",
  lua = "Lua",
  cpp = "C++",
}

interface ProjectCardProps {
  href: string;
  description: string;
  name: string;
  technologies: Array<keyof typeof Tech>;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  description,
  name,
  technologies,
}) => {
  const technologyComponents = technologies.map((tech) => (
    <div key={tech} className="flex gap-1">
      <span
        className={`flex h-2 w-2 translate-y-1 rounded-full`}
        style={{
          backgroundColor: Tech[tech],
        }}
      />
      <p className="text-sm font-medium leading-none">{Language[tech]}</p>
    </div>
  ));

  const group_hover =
    "group-hover:underline decoration-neutral-300 underline-offset-4 transition-colors dark:decoration-neutral-600 focus:(decoration-neutral-400 outline-offset-6 dark:decoration-neutral-500) group-hover:(decoration-neutral-400 dark:decoration-neutral-500) duration-300";

  return (
    <a href={href} target="_blank" className="group">
      <Card>
        <CardHeader>
          <CardTitle className={group_hover}>{name}</CardTitle>
          <CardDescription>{href.split("://")[1]}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className={group_hover}>{description}</p>
          <div className="flex gap-2 text-center text-sm mt-3">
            {technologyComponents}
          </div>
        </CardContent>
      </Card>
    </a>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Projects</h1>
      {projectData.map((project, index) => (
        <ProjectCard
          key={index}
          {...project}
          technologies={project.technologies as Array<keyof typeof Tech>}
        />
      ))}
    </div>
  );
};

export default Projects;
