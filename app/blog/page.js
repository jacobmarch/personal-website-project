import Link from "next/link";
import { getAllPostsMeta } from "../../lib/blog";

export const metadata = {
  title: "Blog | Jacob",
  description: "Developer and creator blog posts"
};

function formatDate(dateString) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return "Draft";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <main className="blog-main">
      <header className="blog-header">
        <p className="eyebrow">Blog</p>
        <h1>Notes on building, systems, and creative work.</h1>
        <p>
          New entries are generated from markdown files in
          <code> content/blog</code>.
        </p>
        <Link className="button button-ghost" href="/">
          Back Home
        </Link>
      </header>

      <section className="blog-list">
        {posts.map((post) => (
          <article className="blog-row" key={post.slug}>
            <p className="meta">{formatDate(post.date)}</p>
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
