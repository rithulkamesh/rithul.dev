"use client";
import { motion } from "framer-motion";
import {
  SECTION_VARIANTS,
  SAFE_VARIANTS,
  DECORATIVE_VARIANTS,
} from "@/lib/animation";
import Link from "next/link";

interface Post {
  slug: string;
  meta: {
    title: string;
    date: string;
  };
}

export const Thinking = ({ posts }: { posts: Post[] }) => {
  return (
    <motion.section
      variants={SECTION_VARIANTS}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-6"
    >
      <motion.div variants={SAFE_VARIANTS} className="flex items-center gap-2">
        <motion.div
          variants={DECORATIVE_VARIANTS}
          className="w-1 h-3 rounded-full bg-zinc-700/80 dark:bg-zinc-700/80 bg-zinc-400/80"
        />
        <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Thinking
        </h2>
      </motion.div>
      <div className="space-y-0">
        {posts.map((post) => (
          <motion.div key={post.slug} variants={SAFE_VARIANTS}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col md:flex-row md:items-baseline justify-between py-3 border-b border-border hover:border-foreground/20 transition-all"
            >
              <h3 className="text-foreground group-hover:text-foreground/80 transition-colors text-lg">
                {post.meta.title}
              </h3>
              <span className="text-muted-foreground font-mono text-xs md:text-sm pt-1 md:pt-0">
                {post.meta.date}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
