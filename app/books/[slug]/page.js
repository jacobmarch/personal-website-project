import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBookSlugs, getBookReviewBySlug } from "../../../lib/books";
import { formatDisplayDate } from "../../../lib/date";
import styles from "../books.module.css";

export async function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const review = await getBookReviewBySlug(slug);

  if (!review) {
    return {
      title: "Review Not Found"
    };
  }

  return {
    title: `${review.title} | Book Review | Jacob`,
    description: review.excerpt || `Book review for ${review.title}`
  };
}

function renderRating(rating) {
  if (rating === null) {
    return "Rating: not set";
  }

  return `Rating: ${rating}/5`;
}

export default async function BookReviewPage({ params }) {
  const { slug } = await params;
  const review = await getBookReviewBySlug(slug);

  if (!review) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <div className={styles.canvas}>
        <header className={styles.siteHeader}>
          <Link className={styles.homeLink} href="/">
            Return to Main Page
          </Link>
        </header>

        <article className={styles.review}>
          <p className={styles.meta}>{formatDisplayDate(review.date)}</p>
          <h1 className={styles.reviewTitle}>{review.title}</h1>
          <p className={styles.author}>by {review.author}</p>
          <p className={styles.rating}>{renderRating(review.rating)}</p>
          {review.tags?.length ? <p className={styles.tagLine}>{review.tags.join(" • ")}</p> : null}

          <div
            className={styles.reviewContent}
            dangerouslySetInnerHTML={{ __html: review.contentHtml }}
          ></div>

          <Link className={styles.homeLink} href="/books">
            Back to Reviews
          </Link>
        </article>
      </div>
    </main>
  );
}
