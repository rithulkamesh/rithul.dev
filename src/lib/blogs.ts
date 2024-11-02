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

  return blogs;
}
