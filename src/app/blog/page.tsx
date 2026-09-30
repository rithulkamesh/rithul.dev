import { getBlogList } from "@/lib/blogs";
import BlogDisplay from "./BlogDisplay";

export const revalidate = 86400;

export const metadata = {
  title: "Blog | Rithul Kamesh",
  description:
    "Writing on AI infrastructure, systems programming in Rust and C++, vector search, LLM tooling, and audio software.",
  alternates: {
    canonical: "https://rithul.dev/blog",
    types: { "application/rss+xml": "https://rithul.dev/feed.xml" },
  },
};

export default async function BlogsPage() {
  const blogs = await getBlogList();

  return <BlogDisplay blogs={blogs} />;
}
