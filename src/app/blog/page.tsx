import { getBlogList } from "@/lib/blogs";
import BlogDisplay from "./BlogDisplay";

export default async function BlogsPage() {
  const blogs = await getBlogList();

  return <BlogDisplay blogs={blogs} />;
}
