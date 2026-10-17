import Header from "@/components/header";
import Footer from "@/components/footer";
import { WorkFeatured, WorkRows } from "@/components/work-list";
import { works } from "@/data/works";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Rithul Kamesh",
  description: "Projects and things I've built.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pt-8 pb-4">
        <Header />
      </div>

      <main className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-16 pt-8 flex flex-col gap-10">
        <h1 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Work
        </h1>
        <WorkFeatured work={works[0]} />
        <WorkRows works={works.slice(1)} expandable />
      </main>

      <div className="mx-auto max-w-3xl w-full px-6 md:px-12 pb-12">
        <Footer />
      </div>
    </div>
  );
}
