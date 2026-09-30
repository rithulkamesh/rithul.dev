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
import { notFound } from "next/navigation";
import { SITE_URL, parseBlogDate } from "@/lib/blogs";
import { PostLayout } from "@/components/blog/post-layout";
import { components as mdxComponents } from "@/components/blog/mdx-components";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 86400;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { frontMatter: fm } = getPost({ slug });
  const url = `${SITE_URL}/blog/${slug}`;
  const image = fm.image
    ? `${SITE_URL}${fm.image}`
    : `${SITE_URL}/og_image.png`;
  const published = parseBlogDate(fm.date).toISOString();

  return {
    title: fm.title,
    description: fm.description,
    keywords: fm.tags,
    authors: [{ name: fm.author, url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: fm.title,
      description: fm.description,
      siteName: "Rithul Kamesh",
      publishedTime: published,
      modifiedTime: published,
      authors: [fm.author],
      tags: fm.tags,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: [image],
    },
  };
}

export function generateStaticParams() {
  return fs
    .readdirSync(path.join("src/blogs"))
    .map((filename) => filename.replace(".mdx", ""))
    .filter((slug) => isPublished(getPost({ slug }).frontMatter.date))
    .map((slug) => ({ slug }));
}

const isPublished = (date: string) =>
  parseBlogDate(date).getTime() <= Date.now();

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
  if (!isPublished(props.frontMatter.date)) notFound();

  const fm = props.frontMatter;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: fm.title,
        description: fm.description,
        datePublished: parseBlogDate(fm.date).toISOString(),
        dateModified: parseBlogDate(fm.date).toISOString(),
        author: { "@type": "Person", name: fm.author, url: SITE_URL },
        publisher: { "@type": "Person", name: fm.author, url: SITE_URL },
        image: `${SITE_URL}${fm.image ?? "/og_image.png"}`,
        keywords: fm.tags?.join(", "),
        mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: fm.title,
            item: `${SITE_URL}/blog/${slug}`,
          },
        ],
      },
    ],
  };

  const wordCount = props.content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200) + " min read";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    "utf-8",
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
};

export default Post;
