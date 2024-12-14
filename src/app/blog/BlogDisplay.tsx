"use client";

import BlogList from "@/components/blog-list";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { Blog } from "@/lib/blogs";

interface BlogsPageType {
  blogs: Blog[];
}

export default function BlogDisplay({ blogs }: BlogsPageType) {
  return (
    <motion.main className="flex flex-col mx-auto max-w-container px-4 gap-1 py-8">
      <motion.div transition={{ duration: 0.5, delay: 0.2 }}>
        <Header />
      </motion.div>
      <motion.section
        className="py-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Latest Publications
        </motion.h1>
        <BlogList initialBlogs={blogs} />
      </motion.section>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Footer />
      </motion.div>
    </motion.main>
  );
}
