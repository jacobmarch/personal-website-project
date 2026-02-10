import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/blog");

function parseDate(dateString) {
  const date = new Date(dateString);
  return Number.isNaN(date.getTime()) ? 0 : date.getTime();
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
        tags: Array.isArray(data.tags) ? data.tags : []
      };
    })
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
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
    tags: Array.isArray(data.tags) ? data.tags : [],
    contentHtml: processedContent.toString()
  };
}

export function getAllPostSlugs() {
  return getAllPostsMeta().map((post) => post.slug);
}
