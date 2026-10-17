"use client";
import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/lib/format-date";

interface Commit {
  sha: string;
  message: string;
  url: string;
  date: string;
}

export const RepoActivity = ({ repo }: { repo: string }) => {
  const [commits, setCommits] = useState<Commit[] | null>(null);

  useEffect(() => {
    fetch(
      `https://api.github.com/repos/rithulkamesh/${repo}/commits?per_page=3`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
      },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) =>
        setCommits(
          data.map((c: any) => ({
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split("\n")[0],
            url: c.html_url,
            date: c.commit.author.date,
          })),
        ),
      )
      .catch(() => setCommits([]));
  }, [repo]);

  if (!commits || commits.length === 0) return null;

  return (
    <div className="mt-4 space-y-2 border-l-2 border-emerald-500/20 pl-3">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground/70">
          Live from the repo
        </span>
      </div>
      {commits.map((c) => (
        <a
          key={c.sha}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-baseline gap-2 text-xs md:text-sm"
        >
          <span className="text-muted-foreground/80 group-hover:text-foreground transition-colors truncate">
            {c.message}
          </span>
          <span className="text-muted-foreground/40 font-mono whitespace-nowrap">
            {formatRelativeDate(c.date)}
          </span>
        </a>
      ))}
    </div>
  );
};
