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
import Link from "next/link";

export const metadata: Metadata = {
  title: "sunday — Rithul Kamesh",
  description:
    "Can any model go AGI, given the right harness? A local-first voice and screen agent harness, built as an open, eval-driven experiment.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: "bun run tauri dev" },
  { type: "output" as const, text: "loading speech models..." },
  {
    type: "output" as const,
    text: "connecting to ollama (qwen3:4b-instruct)...",
  },
  { type: "output" as const, text: "opening memory (sqlite, local)..." },
  {
    type: "success" as const,
    text: 'sunday is listening (say "sunday" or hold fn)',
  },
];

const FEATURES = [
  {
    title: "Sees",
    description:
      "Screenshots with local OCR and exact boxes, a vision model for diagrams, and a click-through overlay that points at things.",
    iconName: "Eye",
  },
  {
    title: "Understands",
    description:
      "Teaches any subject with plans, quizzes and spaced review. Imports your notes and cites them.",
    iconName: "Brain",
  },
  {
    title: "Notices",
    description:
      "Wake word, voice activation, your voiceprint, and long-term memory where every fact has provenance.",
    iconName: "Mic",
  },
  {
    title: "Decides",
    description:
      "Every utterance becomes one typed Action, checked against what is permitted. A deterministic router with a seam for a smarter one.",
    iconName: "GitBranch",
  },
  {
    title: "Acts",
    description:
      "Opens apps, pages and files, types, clicks with a preview. All behind approvals and an audit log.",
    iconName: "Terminal",
  },
  {
    title: "Yours",
    description:
      "Local models via Ollama, SQLite on disk, web access off unless you switch it on.",
    iconName: "Heart",
  },
];

const ARCHITECTURE = [
  { label: "Voice / Screen" },
  { label: "Typed Action" },
  { label: "Plan → Act → Verify" },
  { label: "Memory + Skills" },
  { label: "Eval Suite" },
];

export default function SundayPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="sunday"
          description="Can any model go AGI, given the right harness?"
          tagline="A local-first voice and screen agent harness: plan, act, verify, remember, learn. An open experiment, scored by evals."
          githubUrl="https://github.com/rithulkamesh/sunday"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="The question">
          <p className="text-muted-foreground leading-relaxed">
            A lot of what looks like intelligence in an agent comes from the
            loop around the model: planning, verifying, remembering, learning
            from failure. Not only from the weights.
          </p>
          <p className="text-foreground font-medium mt-4">
            If that is true, a small local model with a good harness should keep
            getting more capable, and a bigger model should get further still.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="The bar">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Sunday does not claim AGI. It claims a measurable target:
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Complete open-ended, multi-day goals on your own machine with no
            hand-holding, scoring <span className="font-mono">&ge; 70%</span> on
            a fixed 50-task eval suite, with the pass rate rising week over week
            while the model stays constant.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If the number moves, the harness is doing real work. If it
            doesn&apos;t, that is a result too. Either way it is a number, not a
            vibe.
          </p>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="S.U.N.D.A.Y." features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="The loop" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <ProjectSection label="Where it is today">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Early software. macOS only, and it runs on a 4B local model by
            default. Next on the roadmap:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>
              an eval harness and the 50-task suite. Nothing else counts until
              it exists
            </li>
            <li>a persistent agent loop: plan, act, observe, verify, replan</li>
            <li>
              memory that compounds: successful runs become skills, gated by
              evals
            </li>
            <li>
              any model: Bedrock / Nova, Anthropic, OpenAI-compatible, Gemini,
              llama.cpp
            </li>
            <li>MCP tools, a plugin SDK, and Windows and Linux</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <CodeSnippet
          label="Run it"
          code={`ollama pull qwen3:4b-instruct && ollama pull nomic-embed-text-v2-moe
bun install && bun run tauri dev`}
          language="bash"
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I got tired of arguing about what AGI means and wanted to build
            something that could be wrong in public.
          </p>
          <p>
            So Sunday is an experiment with a scoreboard. Read{" "}
            <Link
              href="/blog/what-does-agi-really-mean"
              className="underline underline-offset-4"
            >
              the story behind it
            </Link>
            , or pick up an issue and help.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/sunday" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/sunday" },
            {
              label: "v1 tracker",
              href: "https://github.com/rithulkamesh/sunday/issues/31",
            },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
