import Link from "next/link";
import { getLatestPosts } from "../../../lib/blog";
import { formatDisplayDate } from "../../../lib/date";

export const metadata = {
  title: "Latest Posts | Blog | Jacob",
  description: "Most recent blog posts in chronological order"
};

export default function LatestPostsPage() {
  const posts = getLatestPosts();

  return (
    <main className="blog-main">
      <header className="blog-header">
        <p className="eyebrow">Latest</p>
        <h1>Most recent posts, newest first.</h1>
        <p>Mode: Recent. Sorted purely by publish date.</p>
        <div className="blog-controls">
          <div className="blog-toolbar">
            <div className="blog-toolbar-actions">
              <Link className="mode-chip" href="/blog">
                Featured Mode
              </Link>
              <span className="mode-chip mode-chip-active" aria-current="page">
                Recent Mode
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="blog-list">
        {posts.map((post) => (
          <article className="blog-row" key={post.slug}>
            <p className="meta">{formatDisplayDate(post.date)}</p>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p>{post.excerpt || "Read the full post."}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
