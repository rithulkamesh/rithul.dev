import React from "react";
import Header from "@/components/header"; // Keeping Header for navigation if consistent
import Footer from "@/components/footer"; // Keeping Footer
import { Hero } from "@/components/home/hero";
import { ActiveContext } from "@/components/home/active-context";
import { GuidedExperiments } from "@/components/home/guided-experiments";
import { CurrentFocus } from "@/components/home/current-focus";
import { SelectedWork } from "@/components/home/selected-work";
import { Thinking } from "@/components/home/thinking";
import { HumanSignal } from "@/components/home/human-signal";
import { Contact } from "@/components/home/contact";
import { getBlogList } from "@/lib/blogs";

export default async function Home() {
  const allBlogs = await getBlogList();
  const recentBlogs = allBlogs.slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-6 md:px-12 flex flex-col gap-12 py-6">
      {/* 
        Header is likely a client component, might handle it differently if needed, 
        but usually it's fine in server components if it handles its own "use client"
      */}
      <Header />

      <div className="flex flex-col gap-16 md:gap-20">
        <Hero />
        <ActiveContext />
        {/* <GuidedExperiments /> */}
        {/* <CurrentFocus /> */}
        <SelectedWork />
        <Thinking posts={recentBlogs} />
        {/* <HumanSignal /> */}
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
