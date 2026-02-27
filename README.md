# Oztech — Landing Page

Official landing page for **Oztech** (PT-BR / EN-US).  
Focused on clarity, performance and conversion: what we deliver, how we work and a direct WhatsApp CTA.

## Highlights
- Bilingual (PT-BR default, EN-US) with `next-intl`
- Responsive design (mobile-first) with smooth section navigation
- SEO essentials: `robots.txt`, `sitemap.xml`, Open Graph preview (`og.png`)
- Built for fast deployment on Vercel (free-friendly)

## Tech Stack
- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- next-intl (i18n)
- framer-motion (micro-interactions)

## Getting Started

### 1) Install
```bash
pnpm install
```

### 2) Environment
Create `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=https://oztech.com.br
```

### 3) Run locally
```bash
pnpm next dev
```

Open:
- http://localhost:3000 (PT-BR)
- http://localhost:3000/en-US (EN-US)

### 4) Production build
```bash
pnpm next build
pnpm next start
```

## SEO Routes
- `robots.txt` → `/robots.txt`
- `sitemap.xml` → `/sitemap.xml`
- Open Graph image → `/og.png`

## Deploy (Vercel)
1. Import this repo on Vercel
2. Add env var: `NEXT_PUBLIC_SITE_URL=https://oztech.com.br`
3. Attach your domain and set your preferred canonical (with or without `www`)

## License
© Oztech. All rights reserved.
