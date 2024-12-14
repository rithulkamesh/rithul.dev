"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Projects from "@/components/projects";
import Link from "@/components/link";

const Home: React.FC = () => {
  const age = Math.floor(
    (new Date().getTime() - new Date("2006/05/10").getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );

  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`mx-auto max-w-container px-4 flex flex-col gap-3 py-8`}
    >
      <Header />
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={controls}
        className="flex flex-col gap-2 mt-4 mb-6"
      >
        <motion.p custom={0} className="mb-2">
          {age} y/o Electronics student specializing in Digital Signal
          Processing, Embedded Systems, AI and Machine Learning. Founder &amp;
          CEO of{" "}
          <Link href="https://pragmahq.com" title="Pragma">
            pragmahq.com
          </Link>
          , and currently developing a startup in signal processing and hardware
          innovation.
        </motion.p>
        <motion.p custom={1}>
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
        </motion.p>
        <motion.p custom={2}>
          An avid gamer and digital art enthusiast, I explore the intersection
          of interactive technologies and creative expression. My passion for
          gaming extends beyond entertainment, viewing it as a complex system of
          design, narrative, and interactive experience that parallels my
          technical and creative interests.
        </motion.p>
      </motion.div>
      <motion.div initial={{ y: 20, opacity: 0 }} animate={controls} custom={3}>
        <Projects />
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default Home;
