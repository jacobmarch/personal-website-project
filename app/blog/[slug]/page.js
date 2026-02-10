import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "../../../lib/blog";
import { formatDisplayDate } from "../../../lib/date";

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

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-main">
      <article className="post-wrapper">
        <p className="meta">{formatDisplayDate(post.date)}</p>
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
