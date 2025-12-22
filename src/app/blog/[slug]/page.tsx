import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Footer from "@/components/footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import Header from "@/components/header";
import React from "react";
import "@/styles/pre.css";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Pre = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLPreElement>) => {
  const textInput = React.useRef<HTMLPreElement>(null);

  return (
    <div className={`group relative font-normal`}>
      <pre ref={textInput} {...props}>
        {children}
      </pre>
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = getPost({ slug });

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
  };
}

export function generateStaticParams() {
  const files = fs.readdirSync(path.join("src/blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

const prettyCodeOptions = {
  theme: "catppuccin-mocha",
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      [rehypeKatex, { strict: false }],
      rehypeSlug,
      [rehypePrettyCode, prettyCodeOptions],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            title: "in-page link",
          },
          behavior: "wrap",
        },
      ],
    ],
  },
  components: {
    pre: Pre,
  },
};

const Post = async ({ params }: Props) => {
  const { slug } = await params;
  const props = getPost({ slug });

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        crossOrigin="anonymous"
      />
      <main className="flex flex-col mx-auto max-w-container px-4 gap-3 py-8">
        <Header />
        <article className="py-10 prose w-full prose-sm md:prose-base lg:prose-lg prose-slate dark:!prose-invert mx-auto">
          <div>
            <h1 className="text-3xl font-bold mb-0">
              {props.frontMatter.title}
            </h1>
            <div className="flex items-center space-x-2 text-muted-foreground mb-4 mt-0">
              <span>{props.frontMatter.date}</span>
            </div>
          </div>
          {/*@ts-ignore*/}
          <MDXRemote source={props.content} options={options} />
        </article>
        <Footer />
      </main>
    </>
  );
};

const getPost = ({ slug }: { slug: string }) => {
  const markdownFile = fs.readFileSync(
    path.join("src/blogs", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
};

export default Post;
