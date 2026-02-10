"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatDisplayDate } from "../lib/date";

function normalizeTags(tags) {
  return Array.isArray(tags) ? tags : [];
}

export default function BlogTagSearch({ posts }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const sortedTags = useMemo(() => {
    const counts = new Map();

    posts.forEach((post) => {
      normalizeTags(post.tags).forEach((tag) => {
        const normalizedTag = String(tag).trim();
        if (!normalizedTag) return;
        counts.set(normalizedTag, (counts.get(normalizedTag) || 0) + 1);
      });
    });

    return [...counts.entries()]
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      })
      .map(([tag]) => tag);
  }, [posts]);

  const suggestedTags = useMemo(() => {
    if (!normalizedQuery) {
      return sortedTags.slice(0, 3);
    }

    return sortedTags
      .filter((tag) => tag.toLowerCase().includes(normalizedQuery))
      .slice(0, 8);
  }, [normalizedQuery, sortedTags]);

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) {
      return posts;
    }

    const terms = normalizedQuery
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean);

    return posts.filter((post) => {
      const tags = normalizeTags(post.tags).map((tag) => String(tag).toLowerCase());
      if (!tags.length) {
        return false;
      }

      if (!terms.length) {
        return tags.some((tag) => tag.includes(normalizedQuery));
      }

      return terms.some((term) => tags.some((tag) => tag.includes(term)));
    });
  }, [normalizedQuery, posts]);

  return (
    <>
      <div className="blog-controls blog-controls-vibe">
        <div className="blog-toolbar">
          <div className="blog-toolbar-actions">
            <span className="mode-chip mode-chip-active" aria-current="page">
              Featured Mode
            </span>
            <Link className="mode-chip" href="/blog/latest">
              Recent Mode
            </Link>
          </div>
          <p className="blog-mode-note">Pinned posts first, then newest entries.</p>
        </div>

        <div className="blog-search-wrap">
          <input
            id="tag-search"
            className="blog-search-input"
            type="search"
            placeholder="Search by tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search posts by tag"
          />
          {suggestedTags.length ? (
            <div className="tag-suggestions">
              {suggestedTags.map((tag) => (
                <button
                  type="button"
                  className="tag-suggestion"
                  key={`suggestion-${tag}`}
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <p className="blog-results-note">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>

      <section className="blog-list blog-feed-grid">
        {filteredPosts.length ? (
          filteredPosts.map((post) => (
            <article className="blog-row blog-card" key={post.slug}>
              <p className="meta">
                {post.featured ? "Pinned • " : ""}
                {formatDisplayDate(post.date)}
              </p>
              <h2>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p>{post.excerpt || "Read the full post."}</p>
              {post.tags?.length ? (
                <p className="tag-row">
                  {post.tags.map((tag) => (
                    <span className="tag-pill" key={`${post.slug}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </p>
              ) : null}
            </article>
          ))
        ) : (
          <article className="blog-row">
            <p className="meta">No matches</p>
            <h2>No posts found for this tag search</h2>
            <p>Try a different tag keyword or clear the search.</p>
          </article>
        )}
      </section>
    </>
  );
}
