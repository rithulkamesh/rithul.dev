import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Blog {
  meta: {
    title: string;
    author: string;
    date: string;
    image?: string;
    description?: string;
    tags?: string[];
  };
  slug: string;
  readTime: number;
}

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return readTimeMinutes;
};

export const SITE_URL = "https://rithul.dev";

// "20th April 2026" -> Date
export const parseBlogDate = (dateStr: string) =>
  new Date(dateStr.replace(/(\d)(st|nd|rd|th)/, "$1"));

export async function getBlogList(): Promise<Blog[]> {
  const blogDir = path.join(process.cwd(), "src/blogs");
  const files = fs.readdirSync(blogDir);

  const blogs = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data: frontMatter, content } = matter(fileContent);
    const readTime = calculateReadTime(content);

    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
      readTime,
    } as Blog;
  });

  // future-dated posts are scheduled: hidden until their date (pages revalidate daily)
  const now = Date.now();
  return blogs
    .filter((b) => parseBlogDate(b.meta.date).getTime() <= now)
    .sort(
      (a, b) =>
        parseBlogDate(b.meta.date).getTime() -
        parseBlogDate(a.meta.date).getTime(),
    );
}
