# CV Portfolio — Next.js

A minimalist, elegant CV portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **Minimalist design** with warm paper tones and gold accents
- **Smooth scroll animations** — sections reveal as you scroll
- **Sticky navigation** with active section tracking
- **Fully responsive** — mobile, tablet, desktop
- **Easy to customize** — all content in one data file

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles + animations
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main page
├── components/
│   ├── Nav.tsx          # Sticky navigation
│   ├── Hero.tsx         # Hero / landing section
│   ├── About.tsx        # About me section
│   ├── Skills.tsx       # Skills grid (dark bg)
│   ├── Experience.tsx   # Work experience
│   ├── Projects.tsx     # Project cards
│   └── Footer.tsx       # Footer with CTA
└── data/
    └── portfolio.ts     # ← All your content here!
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✏️ Customizing Your Content

Edit **`src/data/portfolio.ts`** to update:

- **Personal info** — name, title, email, social links
- **About** — bio text and highlights
- **Skills** — categories and items
- **Experience** — jobs with description and tags
- **Projects** — with live/GitHub links

## 🎨 Design System

| Token         | Value       | Usage              |
|---------------|-------------|--------------------|
| `--ink`       | `#0f0f0f`   | Text, headings     |
| `--paper`     | `#f7f5f0`   | Background         |
| `--accent`    | `#c8a96e`   | Gold highlights    |
| `--muted`     | `#8a8680`   | Secondary text     |
| `--subtle`    | `#e8e4dc`   | Borders, tags      |

Fonts: **Playfair Display** (headings) + **DM Sans** (body) + **DM Mono** (code/labels)

## 📦 Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Google Fonts — Playfair Display, DM Sans, DM Mono
