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
    <main className="blog-main blog-main-vibe">
      <header className="blog-site-header">
        <Link className="blog-home-link" href="/">
          Return to Main Page
        </Link>
      </header>

      <section className="blog-header blog-header-vibe">
        <p className="eyebrow blog-kicker">Recent Journal</p>
        <h1>Most recent posts, newest first.</h1>
        <p>A chronological stream with no pinned prioritization.</p>
        <div className="blog-controls blog-controls-vibe">
          <div className="blog-toolbar">
            <div className="blog-toolbar-actions">
              <Link className="mode-chip" href="/blog">
                Featured Mode
              </Link>
              <span className="mode-chip mode-chip-active" aria-current="page">
                Recent Mode
              </span>
            </div>
            <p className="blog-mode-note">Sorted strictly by publication date.</p>
          </div>
        </div>
      </section>

      <section className="blog-list blog-feed-grid">
        {posts.map((post) => (
          <article className="blog-row blog-card" key={post.slug}>
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
