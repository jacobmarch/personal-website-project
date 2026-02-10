import { getPostsFeaturedFirst } from "../../lib/blog";
import BlogTagSearch from "../../components/blog-tag-search";

export const metadata = {
  title: "Blog | Jacob",
  description: "Developer and creator blog posts"
};

export default function BlogPage() {
  const posts = getPostsFeaturedFirst();

  return (
    <main className="blog-main">
      <header className="blog-header">
        <p className="eyebrow">Blog</p>
        <h1>Notes on building, systems, and creative work.</h1>
        <p>Mode: Featured. Pinned posts appear first, then newest posts.</p>
      </header>

      <BlogTagSearch posts={posts} />
    </main>
  );
}
