import { getBlogList } from "@/lib/blogs";
import BlogList from "@/components/blog-list";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function BlogsPage() {
  const blogs = await getBlogList();

  return (
    <main className="flex flex-col mx-auto max-w-container px-4 gap-1 py-8">
      <Header />
      <section className="py-10">
        <h1 className="text-2xl font-bold mb-6">Latest Publications</h1>
        <BlogList initialBlogs={blogs} />
      </section>
      <Footer />
    </main>
  );
}
