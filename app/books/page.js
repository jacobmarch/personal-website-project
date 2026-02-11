import Link from "next/link";
import { getLatestBookReviews } from "../../lib/books";
import { formatDisplayDate } from "../../lib/date";
import styles from "./books.module.css";

export const metadata = {
  title: "Book Reviews | Jacob",
  description: "A reading log of books with notes, themes, and reflections."
};

function renderRating(rating) {
  if (rating === null) {
    return "Rating: not set";
  }

  return `Rating: ${rating}/5`;
}

export default function BooksPage() {
  const reviews = getLatestBookReviews();

  return (
    <main className={styles.main}>
      <div className={styles.canvas}>
        <header className={styles.siteHeader}>
          <Link className={styles.homeLink} href="/">
            Return to Main Page
          </Link>
        </header>

        <section className={styles.hero}>
          <p className={styles.kicker}>Field Notes Shelf</p>
          <h1>Reading notes from the edge of the desk.</h1>
          <p>
            A simple, searchable record of what I have read and what stayed with me. Add reviews in
            markdown under <code>content/books</code>.
          </p>
        </section>

        <section className={styles.shelfGrid}>
          {reviews.length ? (
            reviews.map((review) => (
              <article className={styles.card} key={review.slug}>
                <div className={styles.cardLabel}>Field Note</div>
                <p className={styles.meta}>{formatDisplayDate(review.date)}</p>
                <h2 className={styles.cardTitle}>
                  <Link href={`/books/${review.slug}`}>{review.title}</Link>
                </h2>
                <p className={styles.author}>by {review.author}</p>
                <p className={styles.rating}>{renderRating(review.rating)}</p>
                <p className={styles.summary}>
                  {review.excerpt || "Open this entry to read the full review."}
                </p>
                {review.tags?.length ? (
                  <p className={styles.tagRow}>
                    {review.tags.map((tag) => (
                      <span className={styles.tag} key={`${review.slug}-${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </p>
                ) : null}
              </article>
            ))
          ) : (
            <article className={styles.card}>
              <div className={styles.cardLabel}>Notebook Empty</div>
              <p className={styles.meta}>No reviews yet</p>
              <h2 className={styles.cardTitle}>Add your first markdown review</h2>
              <p className={styles.summary}>
                Create a new file in content/books and this page will update automatically.
              </p>
            </article>
          )}
        </section>
      </div>
    </main>
  );
}
