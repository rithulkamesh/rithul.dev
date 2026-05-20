import Header from "@/components/header";
import Footer from "@/components/footer";
import { WorkList } from "@/components/work-list";
import { works } from "@/data/works";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work — Rithul Kamesh",
  description: "Projects and things I've built.",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WorkPage() {
  const shuffled = shuffle(works);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-16 pt-8">
        <WorkList works={shuffled} />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
