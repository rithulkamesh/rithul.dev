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
import { PostLayout } from "@/components/blog/post-layout";
import { components as mdxComponents } from "@/components/blog/mdx-components";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

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
  keepBackground: false, // We handle background in our custom pre component
};

const options: any = {
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
  parseFrontmatter: true,
};

const Post = async ({ params }: Props) => {
  const { slug } = await params;
  const props = getPost({ slug });

  const wordCount = props.content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200) + " min read";

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
        crossOrigin="anonymous"
      />
      <div className="flex flex-col min-h-screen bg-background">
        <div className="mx-auto max-w-container px-6 w-full pt-8 pb-4">
          <Header />
        </div>

        <PostLayout
          title={props.frontMatter.title}
          date={props.frontMatter.date}
          readTime={readingTime}
          wordCount={wordCount}
        >
          <MDXRemote
            source={props.content}
            options={options}
            components={mdxComponents}
          />
        </PostLayout>

        <div className="mx-auto max-w-container px-6 w-full pb-12">
          <Footer />
        </div>
      </div>
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
