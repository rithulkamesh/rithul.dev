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
  title: "ferryx — Rithul Kamesh",
  description:
    "ferryx compiles Rust systems into native Python ecosystems via FFI codegen — zero handwritten bindings.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: "ferryx build src/lib.rs" },
  { type: "output" as const, text: "parsing Rust types..." },
  { type: "output" as const, text: "generating FFI layer..." },
  { type: "output" as const, text: "emitting Python stubs..." },
  { type: "output" as const, text: "compiling native extension..." },
  { type: "success" as const, text: "mylib.so + mylib.pyi generated" },
];

const FEATURES = [
  {
    title: "Zero Handwriting",
    description: "Bindings generated from Rust types — no manual FFI code.",
    iconName: "FileCode",
  },
  {
    title: "Python Stubs",
    description: "Type-annotated .pyi files emitted for full IDE completion.",
    iconName: "Sparkles",
  },
  {
    title: "Native Speed",
    description: "Rust performance, Python ergonomics — no marshalling overhead.",
    iconName: "Terminal",
  },
  {
    title: "TypeScript SDK",
    description: "Bindings can also target TypeScript via WASM or Node addons.",
    iconName: "LayoutGrid",
  },
];

const ARCHITECTURE = [
  { label: "Rust Source" },
  { label: "Type Reflection" },
  { label: "FFI Codegen" },
  { label: "Python / TS Stubs" },
  { label: "Native Extension" },
];

export default function FerryxPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="ferryx"
          description="Rust → Python FFI codegen compiler"
          tagline="Write Rust. Get native Python bindings. No glue code."
          githubUrl="https://github.com/rithulkamesh/ferryx"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            Writing Rust extensions for Python means maintaining two separate codebases
            of glue: the C FFI layer and the Python wrapper. Every type change requires
            updates in three places.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it does">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Ferryx reads Rust source, reflects the public type surface, and emits:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm mb-4">
            <li>a C FFI layer</li>
            <li>Python extension module (.so / .pyd)</li>
            <li>type-annotated .pyi stubs for IDE support</li>
            <li>optional TypeScript bindings via WASM</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            Change the Rust signature; run ferryx; bindings update automatically.
          </p>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Compilation pipeline" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <RealOutputSection
          label="Generated binding"
          inputTitle="Rust input"
          inputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
{`pub fn add(a: i32, b: i32) -> i32 {
    a + b
}`}
            </pre>
          }
          outputTitle="Generated Python stub"
          outputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
{`def add(a: int, b: int) -> int: ...`}
            </pre>
          }
        />

        <SectionDivider />

        <CodeSnippet
          label="Build"
          language="bash"
          code={`ferryx build src/lib.rs --target python`}
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I kept rewriting PyO3 wrappers every time the Rust API changed. The
            binding layer was always behind the implementation.
          </p>
          <p>
            Ferryx makes bindings a compiler output, not a maintenance burden.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/ferryx" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/ferryx" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
