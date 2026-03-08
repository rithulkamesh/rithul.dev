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
  DocprocDrift,
} from "@/components/project-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "docproc — Rithul Kamesh",
  description:
    "Document → Markdown extraction engine for LLM pipelines. Turn messy PDFs into structured, model-ready text.",
};

const DOCPROC_TERMINAL_LINES = [
  { type: "prompt" as const, text: "docproc research_paper.pdf" },
  { type: "output" as const, text: "parsing layout..." },
  { type: "output" as const, text: "extracting figures..." },
  { type: "output" as const, text: "detecting equations..." },
  { type: "output" as const, text: "rebuilding hierarchy..." },
  { type: "output" as const, text: "exporting markdown..." },
  { type: "success" as const, text: "paper.md generated" },
];

const DOCPROC_FEATURES = [
  {
    title: "Clean Markdown",
    description: "Structured output ready for pipelines.",
    iconName: "FileCode",
  },
  {
    title: "Equation Preservation",
    description: "LaTeX and math kept intact.",
    iconName: "Calculator",
  },
  {
    title: "Image Extraction",
    description: "Figures and embedded images exported.",
    iconName: "Image",
  },
  {
    title: "Layout Reconstruction",
    description: "Headings and hierarchy restored.",
    iconName: "LayoutGrid",
  },
  {
    title: "LLM Ready Output",
    description: "Model-friendly markdown format.",
    iconName: "Sparkles",
  },
];

const DOCPROC_ARCHITECTURE = [
  { label: "PDF/DOCX" },
  { label: "Layout Parser" },
  { label: "Equation + Figure Extractor" },
  { label: "Structure Rebuilder" },
  { label: "Clean Markdown" },
];

export default function DocprocPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <DocprocDrift />

        <ProjectHero
          title="docproc"
          description="Document → Markdown extraction engine for LLM pipelines"
          tagline="Turn messy PDFs into structured, model-ready text."
          githubUrl="https://github.com/rithulkamesh/docproc"
        />

        <TerminalDemo
          label="Demo"
          lines={DOCPROC_TERMINAL_LINES}
          showLabel={true}
        />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Modern LLM workflows depend on ingesting documents, but PDFs destroy
            structure. Tables collapse, equations disappear, and images vanish.
          </p>
          <p className="text-foreground font-medium mt-4">
            docproc rebuilds that structure.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it does">
          <p className="text-muted-foreground leading-relaxed mb-4">
            docproc converts:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm mb-6">
            <li>PDF</li>
            <li>DOCX</li>
            <li>PPTX</li>
            <li>XLSX</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mb-2">
            into clean Markdown while preserving:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>headings</li>
            <li>layout hierarchy</li>
            <li>equations</li>
            <li>figures</li>
            <li>embedded images</li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={DOCPROC_FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram
          label="Architecture"
          steps={DOCPROC_ARCHITECTURE}
        />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Real output"
          inputTitle="Input (PDF snippet)"
          inputContent={
            <p className="text-muted-foreground">
              A typical methods section with inline equation: “The diffusion
              equation is given by ∂u/∂t = α ∇²u.”
            </p>
          }
          outputTitle="Output (Markdown)"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
{`## Methods

The diffusion equation is given by:

$$ ∂u/∂t = α ∇²u $$`}
            </pre>
          }
        />

        <SectionDivider />

        <CodeSnippet
          label="Example usage"
          code="docproc research_paper.pdf > paper.md"
          language="bash"
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I kept losing structure when ingesting PDFs into LLM pipelines. Most
            tools flatten documents into text.
          </p>
          <p>
            docproc rebuilds the document as structured markdown.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/docproc" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/docproc" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
