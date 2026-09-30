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
  title: "bruno — Rithul Kamesh",
  description:
    "A calm, minimal macOS desktop companion — a floating orb with local voice, multi-provider LLM, and screen-aware nudging.",
};

const TERMINAL_LINES = [
  { type: "prompt" as const, text: "cargo run -p bruno-app" },
  { type: "output" as const, text: "loading orb shaders..." },
  { type: "output" as const, text: "initializing whisper STT..." },
  { type: "output" as const, text: "connecting to Azure LLM..." },
  { type: "output" as const, text: "starting screen daemon..." },
  { type: "success" as const, text: "bruno is listening (⌘⇧B to toggle)" },
];

const FEATURES = [
  {
    title: "Local Voice",
    description:
      "Whisper STT + Apple/Piper TTS, all on-device. No audio leaves your Mac.",
    iconName: "Mic",
  },
  {
    title: "Multi-Provider LLM",
    description:
      "Azure, OpenAI, Claude, Ollama, LM Studio — streaming chat with vision.",
    iconName: "Sparkles",
  },
  {
    title: "Screen-Aware Nudging",
    description:
      "On-device vision detects when you drift off-task. Shame-free, adaptive.",
    iconName: "Eye",
  },
  {
    title: "Agent + Memory",
    description:
      "Tool-using agent with web browsing and Veclite-backed RAG memory.",
    iconName: "Brain",
  },
  {
    title: "Neurodivergence-Aware",
    description:
      "ADHD/autistic profiles, hyperfocus protection, quiet hours, snooze.",
    iconName: "Heart",
  },
  {
    title: "GPU Orb",
    description: "winit/wgpu floating orb with mood-reactive shaders.",
    iconName: "Circle",
  },
];

const ARCHITECTURE = [
  { label: "Screen Capture" },
  { label: "Vision Classification" },
  { label: "Nudge Policy" },
  { label: "Voice / LLM Agent" },
  { label: "Floating Orb" },
];

export default function BrunoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="relative mx-auto max-w-3xl w-full px-6 md:px-12 flex flex-col gap-10 md:gap-14 pb-16">
        <ProjectHero
          title="bruno"
          description="Calm, minimal macOS desktop companion"
          tagline="A floating orb with local voice, multi-provider LLM, and screen-aware nudging."
          githubUrl="https://github.com/rithulkamesh/bruno"
        />

        <TerminalDemo label="Demo" lines={TERMINAL_LINES} showLabel />

        <SectionDivider variant="glow" />

        <ProjectSection label="Problem">
          <p className="text-muted-foreground leading-relaxed">
            ADHD attention doesn't follow timers — it fluctuates. Productivity
            tools that ping on a schedule create alarm fatigue and break focus.
            Most AI assistants are either voice-only chatbots or rigid
            schedulers.
          </p>
          <p className="text-foreground font-medium mt-4">
            Neither understands what's on your screen or whether you're actually
            focused.
          </p>
        </ProjectSection>

        <SectionDivider variant="grid" />

        <ProjectSection label="What it is">
          <p className="text-muted-foreground leading-relaxed mb-4">
            bruno is a macOS desktop companion — a floating orb rendered on the
            GPU that:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm mb-6">
            <li>
              captures your screen and classifies what you're doing (on-device
              vision)
            </li>
            <li>nudges you when you drift — with shame-free, adaptive voice</li>
            <li>talks to you via local STT/TTS (whisper + Apple/Piper)</li>
            <li>
              responds through a tool-using agent with web browsing and RAG
              memory
            </li>
            <li>respects hyperfocus, quiet hours, and snooze windows</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">
            All behavioral data stays on your Mac. No audio, no screenshots,
            nothing leaves the device.
          </p>
        </ProjectSection>

        <SectionDivider />

        <FeatureGrid label="Features" features={FEATURES} />

        <SectionDivider variant="glow" />

        <ArchitectureDiagram label="Architecture" steps={ARCHITECTURE} />

        <SectionDivider variant="grid" />

        <ProjectSection label="Workspace">
          <p className="text-muted-foreground leading-relaxed mb-4">
            bruno is a Rust workspace with six crates:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>
              <span className="font-mono text-foreground/80">bruno-app</span> —
              desktop app: GPU orb, HUD, global hotkey, event wiring
            </li>
            <li>
              <span className="font-mono text-foreground/80">bruno-ai</span> —
              multi-provider LLM layer (streaming chat + vision)
            </li>
            <li>
              <span className="font-mono text-foreground/80">bruno-voice</span>{" "}
              — STT (whisper.cpp, Apple fallback) + TTS (Apple, optional Piper)
            </li>
            <li>
              <span className="font-mono text-foreground/80">bruno-daemon</span>{" "}
              — screen capture + relevance classification
            </li>
            <li>
              <span className="font-mono text-foreground/80">bruno-orb</span> —
              orb renderer (shaders, moods)
            </li>
            <li>
              <span className="font-mono text-foreground/80">bruno-core</span> —
              shared event bus, intents, startup gating
            </li>
          </ul>
        </ProjectSection>

        <SectionDivider />

        <RealOutputSection
          label="Config"
          inputTitle="~/.config/bruno/config.toml"
          inputContent={
            <pre className="whitespace-pre-wrap font-mono text-xs">
              {`[ai]
provider = "azure"

[ai.azure]
endpoint = "https://<resource>.cognitiveservices.azure.com"
api_key = "..."
deployment = "gpt-5-mini"

[stt]
backend = "auto"       # whisper, Apple fallback

[tts]
backend = "apple"       # apple | piper

[neuro]
profile = "adhd"
nudge_cooldown_secs = 600
quiet_hours = "22:00-08:00"`}
            </pre>
          }
          outputTitle="Nudge policy behaviour"
          outputContent={
            <ul className="text-muted-foreground space-y-1 text-sm list-disc list-inside">
              <li>cooldown between nudges: 10 minutes</li>
              <li>max nudges per hour: 4</li>
              <li>snooze window: 30 minutes</li>
              <li>hyperfocus protection: on</li>
              <li>quiet hours: 10pm – 8am</li>
              <li>tone: gentle, shame-free</li>
            </ul>
          }
        />

        <SectionDivider variant="glow" />

        <CodeSnippet
          label="Build"
          code="cargo build --workspace && cargo run -p bruno-app"
          language="bash"
        />

        <SectionDivider variant="glow" />

        <WhyIBuiltThis>
          <p className="mb-4">
            I wanted a desktop companion that actually understands what I'm
            doing — not just a chatbot that waits for me to type, and not a
            rigid Pomodoro timer that interrupts flow.
          </p>
          <p>
            bruno watches my screen, notices when I drift, and nudges me gently.
            It talks, remembers, and adapts — all locally.
          </p>
        </WhyIBuiltThis>

        <SectionDivider variant="grid" />

        <GitHubStatsPanel repo="rithulkamesh/bruno" />

        <SectionDivider />

        <LinksSection
          label="Links"
          links={[
            { label: "GitHub", href: "https://github.com/rithulkamesh/bruno" },
          ]}
        />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
