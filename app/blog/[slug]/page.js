import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "../../../lib/blog";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found"
    };
  }

  return {
    title: `${post.title} | Blog | Jacob`,
    description: post.excerpt || "Blog post"
  };
}

function formatDate(dateString) {
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return "Draft";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(parsed);
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-main">
      <article className="post-wrapper">
        <p className="meta">{formatDate(post.date)}</p>
        <h1>{post.title}</h1>
        {post.tags?.length ? <p className="tags">{post.tags.join(" • ")}</p> : null}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        ></div>

        <Link className="button button-ghost" href="/blog">
          Back to Blog
        </Link>
      </article>
    </main>
  );
}
