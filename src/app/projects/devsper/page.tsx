import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  ProjectHero,
  ProjectSection,
  FeatureGrid,
  LinksSection,
  ArchitectureDiagram,
  SectionDivider,
  TerminalDemo,
  RealOutputSection,
  WhyIBuiltThis,
} from "@/components/project-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "devsper runtime — Rithul Kamesh",
  description:
    "Distributed multi-agent runtime. Describe it once. Devsper provisions the agents, builds the interface, and runs the workflow endlessly.",
};

const DEVSPER_TERMINAL_LINES = [
  { type: "prompt" as const, text: 'devsper run "review all open PRs and comment"' },
  { type: "output" as const, text: "provisioning agents..." },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "reading repository" },
  { type: "output" as const, text: "analyzing 14 files across 3 commits" },
  { type: "output" as const, text: "generating summary" },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "$ gh pr comment 410 --body \"LGTM. Coverage improved.\"" },
  { type: "output" as const, text: "$ jira transition DEV-92 --to Done" },
  { type: "output" as const, text: "" },
  { type: "success" as const, text: "workflow running continuously" },
];

const DEVSPER_FEATURES = [
  {
    title: "Engineering",
    description: "PR reviews, diff summaries, approval routing — automated end-to-end.",
    iconName: "FileCode",
  },
  {
    title: "Finance",
    description: "Report generation, anomaly detection, warehouse sync on schedule.",
    iconName: "Calculator",
  },
  {
    title: "Legal",
    description: "Contract scanning, risk flagging, clause routing — without the manual read.",
    iconName: "FileCode",
  },
  {
    title: "Integrations",
    description: "GitHub, Slack, Postgres, Stripe, Notion, Vercel, Jira — natively.",
    iconName: "LayoutGrid",
  },
  {
    title: "Continuous Execution",
    description: "Workflows run 24/7. No cron jobs. No manual triggers.",
    iconName: "Sparkles",
  },
  {
    title: "Plain English",
    description: "Describe the task in plain English. Devsper handles provisioning.",
    iconName: "Terminal",
  },
];

const DEVSPER_ARCHITECTURE = [
  { label: "Describe" },
  { label: "Provision" },
  { label: "Execute" },
  { label: "Integrate" },
  { label: "Run Forever" },
];

const DEVSPER_EXAMPLE_OUTPUT = `## PR #410 — Automated Review

**Analysis**
Analyzed 14 files across 3 commits in 2.4s.

**Changes**
• Refactored context injection layer.
• Added fallback for LLM timeouts.
• Coverage improved by 2.1%.

**Actions**
$ gh pr comment 410 --body "LGTM. Coverage improved."
$ jira transition "DEV-92" --to "Done"`;

export default function DevsperPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="devsper runtime"
          description="Distributed multi-agent runtime"
          tagline="Describe it once. Devsper provisions the agents, builds the interface, and runs the workflow endlessly."
          githubUrl="https://github.com/devsper-com/runtime"
        />

        <TerminalDemo label="Demo" lines={DEVSPER_TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Every team has work that repeats. PR reviews. Report pulls. Contract scans.
            Each one is low-complexity but high-frequency — and together they consume
            hours that should go toward things that actually require thought.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Devsper is a distributed multi-agent runtime. You describe the task once in plain English.
            Devsper:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
            <li>provisions the agents</li>
            <li>builds the interface</li>
            <li>connects your tools</li>
            <li>runs the workflow continuously</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Use cases" features={DEVSPER_FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Execution lifecycle" steps={DEVSPER_ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Example result"
          inputTitle="Task"
          inputContent={
            <p className="text-muted-foreground">
              <code className="text-foreground/90 bg-muted px-1 rounded">
                review all open PRs and comment
              </code>
            </p>
          }
          outputTitle="Automated execution"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
              {DEVSPER_EXAMPLE_OUTPUT}
            </pre>
          }
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I kept watching engineers spend an hour a day on work a machine could do in seconds.
            Not because they lacked tools — but because every tool required a human in the loop.
          </p>
          <p>
            Devsper removes the loop. You describe what needs to happen. The runtime orchestrates
            agents across your entire stack, continuously.
          </p>
        </WhyIBuiltThis>

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "devsper.com", href: "https://devsper.com" },
            { label: "GitHub", href: "https://github.com/devsper-com/runtime" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
