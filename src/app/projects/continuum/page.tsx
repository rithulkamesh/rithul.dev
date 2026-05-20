import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  ProjectHero,
  ProjectSection,
  FeatureGrid,
  CodeSnippet,
  LinksSection,
  ArchitectureDiagram,
  SectionDivider,
  TerminalDemo,
  WhyIBuiltThis,
  GitHubStatsPanel,
} from "@/components/project-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "continuum — Rithul Kamesh",
  description:
    "Unified execution runtime for LLM and ML programs. Run inference, orchestrate pipelines, and compose model calls in a single coherent runtime.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: "continuum run pipeline.ct" },
  { type: "output" as const, text: "loading program..." },
  { type: "output" as const, text: "compiling execution graph..." },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "step 1/3  embed(corpus)" },
  { type: "output" as const, text: "step 2/3  retrieve(query, k=5)" },
  { type: "output" as const, text: "step 3/3  generate(prompt + context)" },
  { type: "output" as const, text: "" },
  { type: "success" as const, text: "pipeline completed in 1.2s" },
];

const FEATURES = [
  {
    title: "Unified Runtime",
    description: "LLM inference and ML ops in one execution environment.",
    iconName: "Terminal",
  },
  {
    title: "Pipeline Composition",
    description: "Chain embedding, retrieval, and generation as typed steps.",
    iconName: "LayoutGrid",
  },
  {
    title: "Native Performance",
    description: "C++ core — no interpreter overhead on the critical path.",
    iconName: "Sparkles",
  },
  {
    title: "Typed Programs",
    description: "Static execution graphs catch shape errors before runtime.",
    iconName: "FileCode",
  },
];

const ARCHITECTURE = [
  { label: "Program (.ct)" },
  { label: "Graph Compiler" },
  { label: "Scheduler" },
  { label: "Kernel Dispatch" },
  { label: "Result" },
];

export default function ContinuumPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="continuum"
          description="Unified execution runtime for LLM and ML programs"
          tagline="One runtime for inference, retrieval, and pipeline orchestration."
          githubUrl="https://github.com/rithulkamesh/continuum"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            LLM pipelines stitch together Python scripts, inference servers, vector
            stores, and orchestration layers — each with its own runtime and process
            boundary. The glue code is fragile and the overhead is real.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Continuum is a C++ runtime that executes LLM and ML programs as compiled
            execution graphs. You describe a pipeline once; the runtime schedules and
            dispatches kernels with no interpreter in the loop.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>embed, retrieve, generate — as first-class operations</li>
            <li>static graph compilation catches errors before execution</li>
            <li>single binary, no orchestration daemons</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Execution model" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <CodeSnippet
          label="Example program"
          language="bash"
          code={`continuum run pipeline.ct --input query.txt`}
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            Every LLM pipeline I built ended up as a mess of subprocess calls and
            HTTP clients. The model was fast; the glue was slow.
          </p>
          <p>
            Continuum compiles the whole pipeline into a single execution graph — one
            runtime, no boundaries.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/continuum" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/continuum" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
