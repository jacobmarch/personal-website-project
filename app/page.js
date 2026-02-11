import Link from "next/link";
import RevealOnScroll from "../components/reveal-on-scroll";
import ScrollGeometry from "../components/scroll-geometry";
import { getLatestPosts } from "../lib/blog";
import { getLatestBookReviews } from "../lib/books";
import { formatDisplayDate } from "../lib/date";

export default function HomePage() {
  const latestPosts = getLatestPosts().slice(0, 2);
  const latestBookReviews = getLatestBookReviews().slice(0, 2);
  const year = new Date().getFullYear();

  return (
    <>
      <RevealOnScroll />
      <ScrollGeometry />
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="bg-glow bg-glow-one" aria-hidden="true"></div>
      <div className="bg-glow bg-glow-two" aria-hidden="true"></div>
      <div className="bg-geometry" aria-hidden="true">
        <span className="geo-shape geo-shape-square"></span>
        <span className="geo-shape geo-shape-diamond"></span>
        <span className="geo-shape geo-shape-line"></span>
        <span className="geo-shape geo-shape-ring"></span>
      </div>

      <header className="site-header">
        <a href="#" className="brand">
          JACOB // BUILD + CREATE
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#blog">Blog</a>
          <Link href="/books">Book Reviews</Link>
        </nav>
      </header>

      <main>
        <section className="hero">
          <p className="eyebrow">Developer + Content Creator</p>
          <h1>Designing software experiences with story, rhythm, and intent.</h1>
          <p className="hero-copy">
            This is my digital studio: a launch point for technical builds, content experiments,
            and ideas in progress.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/blog">
              Read the Blog
            </Link>
            <Link className="button button-ghost" href="/blog/latest">
              View Latest Posts
            </Link>
            <Link className="button button-ghost" href="/books">
              Browse Book Reviews
            </Link>
          </div>
        </section>

        <section id="about" className="panel reveal">
          <h2>About</h2>
          <p>
            I blend engineering discipline with creative direction. I build fast, accessible web
            products and craft content that explains, inspires, and invites people into the process.
          </p>
        </section>

        <section id="skills" className="panel reveal">
          <h2>Skill Stack</h2>
          <div className="skill-grid">
            <article className="skill-card">
              <h3>Frontend Engineering</h3>
              <p>React, TypeScript, modern CSS systems, performance, and UX architecture.</p>
            </article>
            <article className="skill-card">
              <h3>Backend + Systems</h3>
              <p>APIs, data modeling, server workflows, and pragmatic reliability practices.</p>
            </article>
            <article className="skill-card">
              <h3>Content Production</h3>
              <p>
                Technical writing, creator-led storytelling, educational videos, and social content.
              </p>
            </article>
            <article className="skill-card">
              <h3>Creative Direction</h3>
              <p>Visual identity, narrative framing, and turning concepts into coherent products.</p>
            </article>
          </div>
        </section>

        <section id="blog" className="panel reveal">
          <div className="section-heading">
            <h2>Latest Posts</h2>
            <p>Powered by local markdown files.</p>
          </div>
          <div className="post-list">
            {latestPosts.length ? (
              latestPosts.map((post) => (
                <article className="post-card" key={post.slug}>
                  <p className="meta">{formatDisplayDate(post.date)}</p>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt || "Open this post to read the full write-up."}</p>
                </article>
              ))
            ) : (
              <article className="post-card">
                <p className="meta">No posts yet</p>
                <h3>Drop markdown files into content/blog</h3>
                <p>The blog index updates automatically from frontmatter.</p>
              </article>
            )}
          </div>
        </section>

        <section id="books" className="panel reveal">
          <div className="section-heading">
            <h2>Book Reviews</h2>
            <p>Academic-library style reading notes from local markdown files.</p>
          </div>
          <div className="post-list">
            {latestBookReviews.length ? (
              latestBookReviews.map((review) => (
                <article className="post-card" key={review.slug}>
                  <p className="meta">{formatDisplayDate(review.date)}</p>
                  <h3>
                    <Link href={`/books/${review.slug}`}>{review.title}</Link>
                  </h3>
                  <p>
                    {review.author ? `by ${review.author} • ` : ""}
                    {review.excerpt || "Open this review to read the full write-up."}
                  </p>
                </article>
              ))
            ) : (
              <article className="post-card">
                <p className="meta">No reviews yet</p>
                <h3>Drop markdown files into content/books</h3>
                <p>The book reviews index updates automatically from frontmatter.</p>
              </article>
            )}
          </div>
          <div className="panel-action-row">
            <Link className="button button-ghost" href="/books">
              Open Full Book Review Shelf
            </Link>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {year} Jacob Marchywka. Built with clean code and creative intent.</p>
      </footer>
    </>
  );
}
