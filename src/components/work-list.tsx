"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Work } from "@/data/works";
import { SAFE_VARIANTS } from "@/lib/animation";
import { RepoActivity } from "@/components/home/repo-activity";

const Arrow = ({ work }: { work: Work }) => (
  <span className="text-muted-foreground font-normal ml-2 text-sm">
    {work.internal ? "→" : "↗"}
  </span>
);

const WorkLink = ({
  work,
  className,
  children,
}: {
  work: Work;
  className?: string;
  children: React.ReactNode;
}) =>
  work.internal ? (
    <Link href={work.href} className={className}>
      {children}
    </Link>
  ) : (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );

const Story = ({ work }: { work: Work }) => (
  <div className="grid md:grid-cols-2 gap-5 text-sm leading-relaxed">
    {(
      [
        ["Context", work.context],
        ["Decision", work.decision],
        ["Tension", work.tension],
        ["Outcome", work.outcome],
      ] as const
    ).map(([label, text]) => (
      <div key={label}>
        <span className="text-muted-foreground block font-mono text-xs mb-1">
          {label}
        </span>
        <p className="text-muted-foreground">{text}</p>
      </div>
    ))}
  </div>
);

// the one highlighted project, full details
export function WorkFeatured({ work }: { work: Work }) {
  return (
    <motion.div variants={SAFE_VARIANTS} className="space-y-4">
      <WorkLink
        work={work}
        className="text-2xl font-bold text-foreground hover:text-foreground/80 transition-colors"
      >
        {work.name}
        <Arrow work={work} />
      </WorkLink>
      <Story work={work} />
      <RepoActivity repo={work.name} />
    </motion.div>
  );
}

// compact rows, in priority order; `expandable` reveals the full story
export function WorkRows({
  works,
  expandable = false,
}: {
  works: Work[];
  expandable?: boolean;
}) {
  return (
    <div>
      {works.map((work) => (
        <motion.div
          key={work.name}
          variants={SAFE_VARIANTS}
          className="border-b border-border"
        >
          <WorkLink
            work={work}
            className="group flex flex-col md:flex-row md:items-baseline justify-between gap-1 py-3 hover:border-foreground/20 transition-all"
          >
            <h3 className="text-foreground group-hover:text-foreground/80 transition-colors text-lg font-medium">
              {work.name}
              <Arrow work={work} />
            </h3>
            <span className="text-muted-foreground text-sm md:text-right md:max-w-sm">
              {work.summary}
            </span>
          </WorkLink>
          {expandable && (
            <details className="pb-3 group/d">
              <summary className="cursor-pointer text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
                the story
              </summary>
              <div className="pt-3">
                <Story work={work} />
              </div>
            </details>
          )}
        </motion.div>
      ))}
    </div>
  );
}
