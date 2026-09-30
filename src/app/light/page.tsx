import Header from "@/components/header";
import Footer from "@/components/footer";
import { InterferenceCanvas } from "@/components/light/interference-canvas";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "light — Rithul Kamesh",
  description:
    "A live wave interference toy. Drag the sources, watch the interference pattern shift in real time.",
};

export default function LightPage() {
  return (
    <main className="relative mx-auto max-w-3xl px-6 md:px-12 flex flex-col gap-12 py-6">
      <Header />

      <div className="flex flex-col gap-6 py-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            light
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-xl">
            Two point sources, each emitting circular waves. Where crests meet,
            they add; where a crest meets a trough, they cancel. Drag the dots
            and watch the interference fringes redraw live — the same physics
            behind diffraction gratings and the photonics work in the lab.
          </p>
        </div>

        <InterferenceCanvas />
      </div>

      <Footer />
    </main>
  );
}
