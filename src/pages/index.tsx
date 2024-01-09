import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Projects from "@/components/projects";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  const age = Math.floor(
    (new Date().getTime() - new Date("2006/05/10").getTime()) /
      (1000 * 60 * 60 * 24 * 365.25),
  );
  return (
    <div
      className={`mx-auto max-w-container px-4 flex flex-col gap-3 py-8 ${inter.className}`}
    >
      <Header />
      <div className="flex flex-col gap-1 mt-4">
        <p>
          Hey There! I&apos;m Rithul, {age} and going to university. I
          specialize in bringing ideas from imagination to reality with a focus
          on practical application.
        </p>
        <p>
          Besides Programming, I enjoy reading philosophy, music, art,
          photography, fiction writing and gaming. I also spend my free time
          learning new spoken and programming languages.
        </p>
      </div>
      <Projects />
      <Footer />
    </div>
  );
};

export default Home;
