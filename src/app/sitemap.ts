import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getBlogList, parseBlogDate, SITE_URL } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogList();
  const projects = fs
    .readdirSync(path.join(process.cwd(), "src/app/projects"), {
      withFileTypes: true,
    })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/blog`, priority: 0.9 },
    { url: `${SITE_URL}/music`, priority: 0.5 },
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p}`,
      priority: 0.7,
    })),
    ...posts.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: parseBlogDate(b.meta.date),
      priority: 0.8,
    })),
  ];
}
