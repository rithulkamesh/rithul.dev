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
  title: "llmwiki — Rithul Kamesh",
  description:
    "A blazing fast CLI and TUI for maintaining an LLM-managed personal knowledge base.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: 'wiki add "Transformers use self-attention"' },
  { type: "output" as const, text: "embedding...  done" },
  { type: "output" as const, text: "stored in knowledge base" },
  { type: "output" as const, text: "" },
  { type: "prompt" as const, text: 'wiki ask "how does attention work?"' },
  { type: "output" as const, text: "searching knowledge base..." },
  { type: "output" as const, text: "" },
  { type: "success" as const, text: "Transformers use self-attention to..." },
];

const FEATURES = [
  {
    title: "CLI + TUI",
    description: "Fast terminal interface for adding, searching, and browsing notes.",
    iconName: "Terminal",
  },
  {
    title: "LLM Synthesis",
    description: "Ask questions; the model synthesises answers from your own notes.",
    iconName: "Sparkles",
  },
  {
    title: "Semantic Search",
    description: "Retrieval over embeddings — finds relevant notes by meaning.",
    iconName: "FileCode",
  },
  {
    title: "Local-first",
    description: "Everything stays on your machine. No cloud, no sync service.",
    iconName: "LayoutGrid",
  },
];

const ARCHITECTURE = [
  { label: "Note / Query" },
  { label: "Embed" },
  { label: "Vector Store" },
  { label: "LLM Synthesis" },
  { label: "Answer" },
];

export default function LlmwikiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="llmwiki"
          description="LLM-managed personal knowledge base"
          tagline="Add notes in plain text. Ask questions. Get answers from your own knowledge."
          githubUrl="https://github.com/rithulkamesh/llmwiki"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Note-taking tools optimise for writing, not retrieval. Months later, the
            note you need is buried — and keyword search returns 40 results for a term
            that appears everywhere.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            llmwiki is a Rust CLI and TUI that turns your plain-text notes into a
            queryable knowledge base. You write notes in natural language; the LLM
            synthesises answers by retrieving and combining the relevant ones.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>add notes from the CLI or TUI</li>
            <li>ask questions in plain English</li>
            <li>semantic retrieval over your entire note history</li>
            <li>local-first — nothing leaves your machine</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Query flow" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Example"
          inputTitle="Question"
          inputContent={
            <p className="text-muted-foreground font-mono text-sm">
              wiki ask &quot;what did I learn about attention mechanisms?&quot;
            </p>
          }
          outputTitle="Answer"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
{`Based on your notes:

Transformers use self-attention to weight the relevance of each
token in a sequence relative to every other token. The attention
score is computed as softmax(QKᵀ / √d_k) · V.

Sources: [note #12, note #34]`}
            </pre>
          }
        />

        <SectionDivider />

        <CodeSnippet
          label="Quick start"
          language="bash"
          code={`cargo install llmwiki
wiki add "your note here"
wiki ask "your question"`}
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I write notes constantly but rarely find them when I need them. Keyword
            search breaks down the moment you forget the exact phrase you used.
          </p>
          <p>
            llmwiki lets me ask questions in the way I think, not in the way I typed.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/llmwiki" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/llmwiki" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
