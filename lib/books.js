import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { dateSortValue } from "./date";

const booksDirectory = path.join(process.cwd(), "content/books");

function parseDate(dateString) {
  return dateSortValue(dateString);
}

function compareByDateDesc(a, b) {
  return parseDate(b.date) - parseDate(a.date);
}

function normalizeRating(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return Math.max(0, Math.min(5, Math.round(parsed * 2) / 2));
}

export function getAllBookReviewsMeta() {
  if (!fs.existsSync(booksDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(booksDirectory).filter((name) => name.endsWith(".md"));

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(booksDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      author: data.author || "Unknown author",
      date: data.date || "",
      excerpt: data.excerpt || "",
      rating: normalizeRating(data.rating),
      tags: Array.isArray(data.tags) ? data.tags : []
    };
  });
}

export function getLatestBookReviews() {
  return getAllBookReviewsMeta().sort(compareByDateDesc);
}

export async function getBookReviewBySlug(slug) {
  const fullPath = path.join(booksDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    author: data.author || "Unknown author",
    date: data.date || "",
    excerpt: data.excerpt || "",
    rating: normalizeRating(data.rating),
    tags: Array.isArray(data.tags) ? data.tags : [],
    contentHtml: processedContent.toString()
  };
}

export function getAllBookSlugs() {
  return getLatestBookReviews().map((review) => review.slug);
}
