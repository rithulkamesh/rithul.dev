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
import Header from "@/components/header";

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return readTimeMinutes;
};

interface Props {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: Props) {
  const blog = getPost(params);

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

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
          behavior: "wrap",
        },
      ],
    ],
  },
};

const Post: React.FC<Props> = ({ params }) => {
  const props = getPost(params);
  const readTime = calculateReadTime(props.content);

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
            <p className="text-3xl font-bold mb-0">{props.frontMatter.title}</p>
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
