"use client";

import { useEffect, useState } from "react";
import { Star, GitBranch, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";

interface GitHubStatsPanelProps {
  repo: string; // e.g. "rithulkamesh/docproc"
}

interface RepoData {
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  name: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export function GitHubStatsPanel({ repo }: GitHubStatsPanelProps) {
  const [data, setData] = useState<RepoData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const slug = repo.replace(/^https?:\/\/github\.com\/?/, "").replace(/\/$/, "");
    fetch(`https://api.github.com/repos/${slug}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Fetch failed");
        return r.json();
      })
      .then(setData)
      .catch(() => setError(true));
  }, [repo]);

  if (error || !data) {
    return (
      <motion.section
        variants={SECTION_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-4"
      >
        <motion.div variants={SAFE_VARIANTS} className="flex items-center gap-2">
          <motion.div
            variants={DECORATIVE_VARIANTS}
            className="w-1 h-3 rounded-full bg-zinc-700/80"
          />
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            Repository
          </h2>
        </motion.div>
        <motion.a
          variants={SAFE_VARIANTS}
          href={repo.startsWith("http") ? repo : `https://github.com/${repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm text-foreground hover:border-primary/30 hover:bg-card/80 transition-colors"
        >
          View on GitHub <ExternalLink className="h-3.5 w-3.5" />
        </motion.a>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="space-y-4"
    >
      <motion.div variants={SAFE_VARIANTS} className="flex items-center gap-2">
        <motion.div
          variants={DECORATIVE_VARIANTS}
          className="w-1 h-3 rounded-full bg-zinc-700/80"
        />
        <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Repository
        </h2>
      </motion.div>
      <motion.div
        variants={SAFE_VARIANTS}
        className="rounded-xl border border-border bg-card/50 p-4 flex flex-wrap items-center gap-4"
      >
        <a
          href={data.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
        >
          {data.name} <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Star className="h-3.5 w-3.5" />
          {data.stargazers_count}
        </span>
        {data.language && (
          <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <GitBranch className="h-3.5 w-3.5" />
            {data.language}
          </span>
        )}
        <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(data.updated_at)}
        </span>
      </motion.div>
    </motion.section>
  );
}
