import { getBlogList, parseBlogDate, SITE_URL } from "@/lib/blogs";

export const revalidate = 86400;

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  const posts = await getBlogList();
  const items = posts
    .map(
      (b) =>
        `<item><title>${esc(b.meta.title)}</title><link>${SITE_URL}/blog/${b.slug}</link><guid>${SITE_URL}/blog/${b.slug}</guid><pubDate>${parseBlogDate(b.meta.date).toUTCString()}</pubDate><description>${esc(b.meta.description)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Rithul Kamesh</title><link>${SITE_URL}/blog</link><description>Writing on AI infrastructure, systems programming, and audio software.</description>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
