"use client";
import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Projects from "@/components/projects";
import Link from "@/components/link";

const Home: React.FC = () => {
  const age = Math.floor(
    (new Date().getTime() - new Date("2006/05/10").getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );
  return (
    <div className={`mx-auto max-w-container px-4 flex flex-col gap-3 py-8`}>
      <Header />
      <div className="flex flex-col gap-2 mt-4 mb-6">
        <p>
          Hey There! I&apos;m Rithul, {age} and going to university. I am a
          tech-enthusiast who has a research interest in AI/ML and Digital
          Signal Processing.
        </p>
        <p>
          I&apos;m a big fan of gaming and I&apos;m currently playing
          &quot;Black Myth: Wukong&quot;. I play the piano and the guitar and I
          produce music in my free time.
        </p>
        <p>
          I&apos;m an avid lifter with frequent workout videos on my{" "}
          <Link href="https://instagram.com/rithulkamesh" target="_blank">
            instagram
          </Link>
          .
        </p>
      </div>
      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
