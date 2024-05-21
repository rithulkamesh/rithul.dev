import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Home: React.FC = () => {
  return (
    <div
      className={`mx-auto max-w-container px-4 flex flex-col gap-3 py-8 ${inter.className}`}
    >
      <Header />
      <div className="flex flex-col gap-1 mt-4 mb-3">
        <h1 className="font-bold text-3xl">EPD Slides</h1>
        <p>
          Find a PDF Version of my slides for EPD presentation (21/05/24) below.
        </p>

        <div className="flex flex-col gap-3 text-center">
          <iframe src="/EPD_Presentation.pdf" width="100%" height="420vh" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
