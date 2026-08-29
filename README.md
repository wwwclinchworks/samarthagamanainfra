# Samartha Gamana Infra

A fully 3D marketing site for **Samartha Gamana Infra**. Every page is a Three.js street or room — scroll the home boulevard, orbit inner pages, enquire on WhatsApp.

## Local

```bash
npm install
npm run dev
```

Opens on [http://127.0.0.1:45217](http://127.0.0.1:45217).

```bash
npm run build
npm run preview
```

## Pages

- `/` — scroll-driven 3D street (houses, verticals, stats, live work, WhatsApp)
- `/projects`, `/ongoing`, `/upcoming`, `/about`, `/contact` — orbiting 3D rooms
- `/what-we-do/:slug` — plots, apartments, villas, commercial, farmlands

Content lives in `src/data/content.ts`. WhatsApp number: `+91 78158 72759`.

## Vercel

Vite SPA. Output `dist`. Production: **samarthagamanainfra.com** (Cloudflare DNS).

| Type  | Name | Content                |
| ----- | ---- | ---------------------- |
| A     | `@`  | `10.0.1.2`            |
| CNAME | `www` | `cname.vercel-dns.com` |
