import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import path from "path";
import React from "react";
import Header from "@/components/header";

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  return readTimeMinutes;
};

export function generateStaticParams() {
  const files = fs.readdirSync(path.join("src/blogs"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

interface Blog {
  meta: {
    title: string;
    author: string;
    date: string;
    image: string;
    description?: string;
  };
  slug: string;
  readTime: number;
}

const Blogs: React.FC = () => {
  const blogDir = "src/blogs";

  const files = fs.readdirSync(path.join(blogDir));

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

  return (
    <main className="flex flex-col mx-auto max-w-container px-4 gap-1 py-8">
      <Header />

      <section className="py-10">
        <h2 className="text-2xl font-bold mb-6">Latest Publications</h2>

        <div className="py-2 space-y-4">
          {blogs.map((blog: Blog) => (
            <Link
              href={"/blog/" + blog.slug}
              passHref
              key={blog.slug}
              className="block"
            >
              <Card
                className="border-none pl-0 hover:bg-accent/50 transition-colors duration-200
                           dark:hover:bg-accent/30 cursor-pointer"
              >
                <CardContent className="my-auto flex justify-between py-2 my-2 pl-0 rounded-none">
                  <div className="flex flex-col justify-center text-left">
                    <CardTitle
                      className="text-lg font-bold text-2xl mb-1
                                          group-hover:text-primary
                                          dark:group-hover:text-primary-foreground"
                    >
                      {blog.meta.title}
                    </CardTitle>

                    <CardDescription className="text-muted-foreground flex items-center space-x-2">
                      <span>{blog.meta.author}</span>
                      <span className="text-xs">•</span>
                      <span>{blog.meta.date}</span>
                      <span className="text-xs">•</span>
                      <span>{blog.readTime} min</span>
                    </CardDescription>
                  </div>
                </CardContent>
                <hr />
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Blogs;
