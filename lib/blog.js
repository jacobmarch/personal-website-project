import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { dateSortValue } from "./date";

const postsDirectory = path.join(process.cwd(), "content/blog");

function parseDate(dateString) {
  return dateSortValue(dateString);
}

function compareByDateDesc(a, b) {
  return parseDate(b.date) - parseDate(a.date);
}

function compareFeaturedThenDate(a, b) {
  if (a.featured === b.featured) {
    return compareByDateDesc(a, b);
  }

  return a.featured ? -1 : 1;
}

export function getAllPostsMeta() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith(".md"));

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt: data.excerpt || "",
        featured: Boolean(data.featured),
        tags: Array.isArray(data.tags) ? data.tags : []
      };
    });
}

export function getPostsFeaturedFirst() {
  return getAllPostsMeta().sort(compareFeaturedThenDate);
}

export function getLatestPosts() {
  return getAllPostsMeta().sort(compareByDateDesc);
}

export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: data.excerpt || "",
    featured: Boolean(data.featured),
    tags: Array.isArray(data.tags) ? data.tags : [],
    contentHtml: processedContent.toString()
  };
}

export function getAllPostSlugs() {
  return getLatestPosts().map((post) => post.slug);
}
