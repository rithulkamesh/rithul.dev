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
  title: "surgext-mcp — Rithul Kamesh",
  description:
    "MCP server that indexes the Surge XT synthesizer documentation so AI models can search parameters and assist with sound design.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: 'search_docs("wavetable oscillator")' },
  { type: "output" as const, text: "searching docs..." },
  { type: "output" as const, text: "" },
  { type: "output" as const, text: "Oscillators > Wavetable" },
  { type: "output" as const, text: "  Morph — interpolates between wavetable frames" },
  { type: "output" as const, text: "  Skew — asymmetrically shapes the playback" },
  { type: "success" as const, text: "3 sections matched" },
];

const FEATURES = [
  {
    title: "Full-text Search",
    description: "search_docs() finds relevant sections by keyword or concept.",
    iconName: "FileCode",
  },
  {
    title: "Section Fetch",
    description: "get_section() retrieves the full content of any heading path.",
    iconName: "LayoutGrid",
  },
  {
    title: "Parameter Lookup",
    description: "get_parameter_info() returns exact knob and control documentation.",
    iconName: "Terminal",
  },
  {
    title: "Structure Explorer",
    description: "list_sections() exposes the full documentation hierarchy.",
    iconName: "Sparkles",
  },
];

const ARCHITECTURE = [
  { label: "Surge XT Docs" },
  { label: "Ingest + Chunk" },
  { label: "MCP Server" },
  { label: "AI Model" },
  { label: "Sound Design" },
];

export default function SurgextMcpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="surgext-mcp"
          description="Surge XT synthesizer docs as an MCP server"
          tagline="Let AI models search parameters and assist with sound design."
          githubUrl="https://github.com/rithulkamesh/surgext-mcp"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Surge XT has hundreds of parameters across oscillators, filters, FX, and
            modulation. When asking an AI to help recreate a patch, the model has no
            reliable access to what each knob actually does.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            surgext-mcp is a Model Context Protocol server that downloads, chunks, and
            indexes the official Surge XT documentation. It exposes four tools:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li><span className="font-mono text-foreground/80">search_docs</span> — full-text search across all docs</li>
            <li><span className="font-mono text-foreground/80">get_section</span> — fetch content by heading path</li>
            <li><span className="font-mono text-foreground/80">get_parameter_info</span> — look up a specific knob or control</li>
            <li><span className="font-mono text-foreground/80">list_sections</span> — explore the document structure</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Tools" features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Architecture" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Example tool call"
          inputTitle="Query"
          inputContent={
            <p className="text-muted-foreground font-mono text-sm">
              get_parameter_info(&quot;filter cutoff&quot;)
            </p>
          }
          outputTitle="Response"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
{`Filter > Cutoff

Sets the cutoff frequency of the filter. Range: 13.75 Hz – 25.1 kHz.
Modulation target. Right-click to assign LFO, envelope, or MIDI CC.

Related: Resonance, Filter Type, Filter 2`}
            </pre>
          }
        />

        <SectionDivider />

        <CodeSnippet
          label="Claude Desktop config"
          language="json"
          code={`{
  "mcpServers": {
    "surgext-mcp": {
      "command": "node",
      "args": ["/path/to/surgext-mcp/dist/index.js"]
    }
  }
}`}
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I use Surge XT constantly but can never remember what the more obscure
            parameters do. Asking an AI for help meant the model was guessing from
            training data.
          </p>
          <p>
            surgext-mcp gives the model authoritative documentation so it can
            actually help recreate patches accurately.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/surgext-mcp" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/surgext-mcp" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
