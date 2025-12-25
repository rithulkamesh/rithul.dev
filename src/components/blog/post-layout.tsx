"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PostLayoutProps {
  title: string;
  date: string;
  readTime: string;
  wordCount?: number;
  children: React.ReactNode;
}

export function PostLayout({
  title,
  date,
  readTime,
  wordCount,
  children,
}: PostLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-zinc-200 selection:text-zinc-900 dark:selection:bg-zinc-800 dark:selection:text-zinc-100">
      <main className="mx-auto max-w-2xl px-6 py-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <Link
            href="/blog"
            className="group flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to context
          </Link>
        </motion.div>

        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl mb-8 leading-[1.1]">
              {title}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 border-l-2 border-zinc-100 dark:border-zinc-800 pl-4 py-1 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">{date}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              <span>{readTime}</span>
              {wordCount && (
                <>
                  <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <span>{wordCount} words</span>
                </>
              )}
            </div>
            {/* Placeholder for future tags or theme if passed */}
          </motion.div>
        </header>

        <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none">
          {/* 
              We don't wrap children in motion.div universally because 
              we want individual sections to animate. 
              The children passed here are likely custom components.
           */}
          {children}
        </div>
      </main>
    </div>
  );
}
