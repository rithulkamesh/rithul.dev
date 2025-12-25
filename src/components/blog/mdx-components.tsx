"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const components = {
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <FadeIn className="group mt-20 mb-8 first:mt-0">
      <h1
        className={cn(
          "scroll-m-20 text-3xl font-semibold tracking-tight",
          className
        )}
        {...props}
      />
    </FadeIn>
  ),
  h2: ({ className, ...props }: React.ComponentProps<"h2">) => (
    <FadeIn className="group mt-24 mb-6">
      <h2
        className={cn(
          "scroll-m-20 text-2xl font-semibold tracking-tight pb-2 border-b border-zinc-100 dark:border-zinc-800",
          className
        )}
        {...props}
      />
    </FadeIn>
  ),
  h3: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <FadeIn className="group mt-16 mb-4">
      <h3
        className={cn(
          "scroll-m-20 text-xl font-medium tracking-tight",
          className
        )}
        {...props}
      />
    </FadeIn>
  ),
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <FadeIn className="group mt-12 mb-4">
      <h4
        className={cn(
          "scroll-m-20 text-lg font-medium tracking-tight",
          className
        )}
        {...props}
      />
    </FadeIn>
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <FadeIn className="my-6">
      <p
        className={cn("leading-8 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    </FadeIn>
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <FadeIn className="my-6">
      <ul className={cn("ml-6 list-disc [&>li]:mt-2", className)} {...props} />
    </FadeIn>
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <FadeIn className="my-6">
      <ol
        className={cn("ml-6 list-decimal [&>li]:mt-2", className)}
        {...props}
      />
    </FadeIn>
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn(className)} {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <FadeIn className="my-16">
      <hr className="border-zinc-100 dark:border-zinc-800" {...props} />
    </FadeIn>
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <FadeIn className="my-8">
      <blockquote
        className={cn(
          "border-l-2 border-zinc-300 dark:border-zinc-700 pl-6 italic text-muted-foreground",
          className
        )}
        {...props}
      />
    </FadeIn>
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <FadeIn className="my-12">
      <img
        alt={alt}
        className={cn(
          "rounded-md border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900",
          className
        )}
        {...props}
      />
    </FadeIn>
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <Link
      href={props.href as string}
      className={cn(
        "font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-foreground transition-colors",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    // Need to handle pre blocks for code
    return (
      <FadeIn className="my-10">
        <div className="overflow-hidden rounded-lg bg-zinc-900 dark:bg-[#0d1117] border border-zinc-800">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/50 px-4 py-2 text-xs text-zinc-400">
            <div className="h-2 w-2 rounded-full bg-red-500/20" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/20" />
            <div className="h-2 w-2 rounded-full bg-green-500/20" />
          </div>
          <pre className={cn("overflow-x-auto p-4 py-6", className)} {...props}>
            {children}
          </pre>
        </div>
      </FadeIn>
    );
  },
  // Table support if needed
};
