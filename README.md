# Personal Website Project

Next.js portfolio landing page with a markdown-powered blog.

## Stack

- Next.js (App Router)
- React
- Local markdown content (`content/blog`)
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
tags:
  - tag-one
  - tag-two
---
```

3. Write markdown content below the frontmatter
4. Visit `/blog` to see it listed

## Future page ideas

- Project Case Studies
- Creator Toolkit
- Video Essays
- Speaking / Workshops
