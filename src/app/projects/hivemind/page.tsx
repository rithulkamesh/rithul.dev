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
  GitHubStatsPanel,
  HivemindPulses,
} from "@/components/project-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "hivemind — Rithul Kamesh",
  description:
    "Distributed AI worker system. Run autonomous AI workflows from the terminal.",
};

const HIVEMIND_TERMINAL_LINES = [
  { type: "prompt" as const, text: 'hivemind run "analyze diffusion model papers"' },
  { type: "output" as const, text: "spawn worker[1]" },
  { type: "output" as const, text: "spawn worker[2]" },
  { type: "output" as const, text: "spawn worker[3]" },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "worker[1] gathering sources" },
  { type: "output" as const, text: "worker[2] summarizing architecture" },
  { type: "output" as const, text: "worker[3] extracting math" },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "aggregating results..." },
  { type: "output" as const, text: "" },
  { type: "success" as const, text: "synthesis complete" },
];

const HIVEMIND_FEATURES = [
  {
    title: "Distributed Workers",
    description: "Multiple agents run in parallel.",
    iconName: "Users",
  },
  {
    title: "Shared Memory",
    description: "Agents read and write shared state.",
    iconName: "Brain",
  },
  {
    title: "Task Pipelines",
    description: "Decompose and orchestrate workflows.",
    iconName: "GitBranch",
  },
  {
    title: "Tool Usage",
    description: "Agents call tools and APIs.",
    iconName: "Wrench",
  },
  {
    title: "CLI Control",
    description: "Run from the terminal.",
    iconName: "Terminal",
  },
];

const HIVEMIND_ARCHITECTURE = [
  { label: "User Task" },
  { label: "Orchestrator" },
  { label: "Worker Agents", subLabels: ["worker[1]", "worker[2]", "worker[3]"] },
  { label: "Shared Memory" },
  { label: "Final Output" },
];

const HIVEMIND_EXAMPLE_OUTPUT = `## Diffusion model papers — synthesis

**Architecture (worker[2])**  
Common pattern: noise schedule → UNet backbone → conditioning embedding.  
DDPM vs DDIM: discrete vs continuous steps.

**Math (worker[3])**  
Key equations: forward process q(x_t|x_0), reverse process p_θ(x_{t-1}|x_t).  
Score matching objective.

**Sources (worker[1])**  
Ho et al. (DDPM), Song et al. (DDIM), Rombach (LDM).`;

export default function HivemindPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <HivemindPulses />

        <ProjectHero
          title="hivemind"
          description="Distributed AI worker system"
          tagline="Run autonomous AI workflows from the terminal."
          githubUrl="https://github.com/rithulkamesh/hivemind"
        />

        <TerminalDemo
          label="Demo"
          lines={HIVEMIND_TERMINAL_LINES}
          showLabel={true}
        />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Single-agent systems hit limits quickly. Complex tasks need multiple
            agents, shared memory, and orchestration.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            hivemind is a distributed AI worker system where:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 text-sm">
            <li>tasks are decomposed</li>
            <li>agents collaborate</li>
            <li>memory is shared</li>
            <li>results converge</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={HIVEMIND_FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram
          label="Architecture"
          steps={HIVEMIND_ARCHITECTURE}
        />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Example result"
          inputTitle="Task"
          inputContent={
            <p className="text-muted-foreground">
              <code className="text-foreground/90 bg-muted px-1 rounded">
                analyze diffusion model papers
              </code>
            </p>
          }
          outputTitle="Synthesis (agents)"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
              {HIVEMIND_EXAMPLE_OUTPUT}
            </pre>
          }
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I wanted multi-agent systems that behave like distributed computation
            instead of simple chat loops.
          </p>
          <p>
            hivemind lets agents collaborate, spawn work, and converge on
            results.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/hivemind" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/hivemind" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
