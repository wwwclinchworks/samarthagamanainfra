# Samartha Gamana Infra

A static, high-performance marketing site for **SamarthaGamanaInfra** — structured like a classic South-Indian developer house (disclaimer gate, what-we-do verticals, projects, enquire) with a fully 3D construction entrance and light pastel art direction.

Content (addresses, RERA, photography, true project names) is ready to be swapped in `src/data/content.ts` without rebuilding the experience.

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

## Vercel

This is a Vite SPA. Connect the Git repository to Vercel (or use the Publish control). Build command `npm run build`, output `dist`. `vercel.json` already rewrites all routes to `index.html`.

## Cloudflare DNS

Point the domain at Vercel with a CNAME:

| Type  | Name | Target                 |
| ----- | ---- | ---------------------- |
| CNAME | `@` or `www` | `cname.vercel-dns.com` |

In Cloudflare, set SSL/TLS to **Full (strict)** once Vercel has issued a certificate. Do not proxy with “Flexible” SSL.

## Pages

- Disclaimer (first visit)
- 3D construction entrance (once per session; skip available)
- Home, About, What we do (plots, apartments, villas, commercial, farmlands)
- Our projects, Ongoing, Upcoming, Contact
- Quick enquire on every page

Optional: drop a file at `public/construction.mp4` later if you want a filmed overlay; the 3D site sequence is the entrance today.
