# Personal Website Project

Next.js portfolio landing page with markdown-powered blog and book review pages.

## Stack

- Next.js (App Router)
- React
- Local markdown content (`content/blog`)
- Local markdown content for books (`content/books`)
- `gray-matter` + `remark` for post parsing/rendering

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Add a blog post

1. Create a new file in `content/blog` ending with `.md`
2. Add frontmatter:

```md
---
title: "Your post title"
date: "2026-02-10"
excerpt: "Short summary"
featured: false
tags:
  - tag-one
  - tag-two
---
```

3. Write markdown content below the frontmatter
4. Set `featured: true` to pin that post toward the top of `/blog`
5. Visit `/blog` to see featured-first ordering
6. Visit `/blog/latest` to see strict newest-first ordering

## Add a book review

1. Create a new file in `content/books` ending with `.md`
2. Add frontmatter:

```md
---
title: "Book title"
author: "Author name"
date: "2026-02-11"
excerpt: "Short review summary"
rating: 4.5
tags:
  - category-one
  - category-two
---
```

3. Write markdown content below the frontmatter
4. Visit `/books` to see the review shelf
5. Visit `/books/<slug>` for the full review page

## Future page ideas

- Project Case Studies
- Creator Toolkit
- Video Essays
- Speaking / Workshops
