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
        <p className="mb-2">
          {age} y/o Electronics student specializing in Digital Signal
          Processing, Embedded Systems, AI and Machine Learning. Founder &amp;
          CEO of{" "}
          <Link href="https://pragmahq.com" title="Pragma">
            pragmahq.com
          </Link>
          , and currently developing a startup in signal processing and hardware
          innovation.
        </p>
        <p>
          Passionate about technology and music, I blend technical expertise
          with creative pursuits. Experienced in music production, playing piano
          and guitar, with a track record of translating technical skills into
          practical solutions. Find my music at{" "}
          <Link
            href="https://instagram.com/rithul.flac"
            title="instagram-music"
          >
            @rithul.flac
          </Link>
          .
        </p>

        <p>
          An avid gamer and digital art enthusiast, I explore the intersection
          of interactive technologies and creative expression. My passion for
          gaming extends beyond entertainment, viewing it as a complex system of
          design, narrative, and interactive experience that parallels my
          technical and creative interests.
        </p>
      </div>
      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
