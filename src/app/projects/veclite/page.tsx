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
  RealOutputSection,
  WhyIBuiltThis,
  GitHubStatsPanel,
} from "@/components/project-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "veclite — Rithul Kamesh",
  description:
    "SQLite for vectors. Embedded AI memory engine in Rust — no server, no infra, just a file.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: "veclite insert --text 'hello world'" },
  { type: "output" as const, text: "embedding...  done" },
  { type: "output" as const, text: "stored  id=1" },
  { type: "output" as const, text: "" },
  { type: "prompt" as const, text: "veclite search --query 'greetings'" },
  { type: "output" as const, text: "id=1  score=0.97  'hello world'" },
  { type: "success" as const, text: "1 result in 0.4ms" },
];

const FEATURES = [
  {
    title: "Embedded",
    description: "No server. No daemon. Runs inside your process.",
    iconName: "Terminal",
  },
  {
    title: "File-based",
    description: "Single file storage — deploy, copy, and backup trivially.",
    iconName: "FileCode",
  },
  {
    title: "HNSW Index",
    description: "Fast approximate nearest-neighbour search via HNSW.",
    iconName: "Sparkles",
  },
  {
    title: "Rust Core",
    description: "Memory-safe, zero-overhead, no GC pauses.",
    iconName: "LayoutGrid",
  },
];

const ARCHITECTURE = [
  { label: "Insert / Query" },
  { label: "Embedding Layer" },
  { label: "HNSW Index" },
  { label: "File Storage" },
  { label: "Result" },
];

export default function VeclitePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="veclite"
          description="SQLite for vectors — embedded AI memory engine"
          tagline="No server. No infra. Just a file and a Rust library."
          githubUrl="https://github.com/rithulkamesh/veclite"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Adding semantic search to a small project means spinning up Pinecone,
            Weaviate, or a Postgres extension. That&apos;s a server, a connection pool,
            and infra for something that should be as simple as opening a file.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Veclite is an embedded vector database written in Rust. It lives inside
            your process and persists to a single file — same mental model as SQLite,
            but for vector search.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>insert text or raw embeddings</li>
            <li>approximate nearest-neighbour search via HNSW</li>
            <li>single file, zero dependencies at runtime</li>
            <li>Rust library or CLI</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Architecture" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Query example"
          inputTitle="Input"
          inputContent={
            <p className="text-muted-foreground font-mono text-sm">
              veclite search --query &quot;machine learning optimizer&quot; --k 3
            </p>
          }
          outputTitle="Output"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
{`id=12  score=0.94  "Adam optimizer and learning rate scheduling"
id=7   score=0.91  "SGD momentum and weight decay"
id=23  score=0.88  "gradient clipping strategies"`}
            </pre>
          }
        />

        <SectionDivider variant="glow" />

        <CodeSnippet
          label="Add to your Rust project"
          language="bash"
          code={`cargo add veclite`}
        />

        <SectionDivider />

        <WhyIBuiltThis>
          <p className="mb-4">
            I wanted semantic search in a local tool without standing up a vector
            database. Every option was either too heavy or too opinionated.
          </p>
          <p>
            Veclite is the SQLite of vector stores — embed it, forget the infra.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/veclite" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/veclite" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
