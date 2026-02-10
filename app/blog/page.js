import Link from "next/link";
import { getPostsFeaturedFirst } from "../../lib/blog";
import BlogTagSearch from "../../components/blog-tag-search";

export const metadata = {
  title: "Blog | Jacob",
  description: "Developer and creator blog posts"
};

export default function BlogPage() {
  const posts = getPostsFeaturedFirst();

  return (
    <main className="blog-main blog-main-vibe">
      <header className="blog-site-header">
        <Link className="blog-home-link" href="/">
          Return to Main Page
        </Link>
      </header>

      <section className="blog-header blog-header-vibe">
        <p className="eyebrow blog-kicker">Featured Journal</p>
        <h1>Notes on building, systems, and creative work.</h1>
        <p>Curated entries with pinned posts surfaced first.</p>
      </section>

      <BlogTagSearch posts={posts} />
    </main>
  );
}
