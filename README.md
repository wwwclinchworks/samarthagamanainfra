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

Vite SPA. Framework `vite`, build `npm run build`, output `dist`.

`vercel.json` includes SPA rewrites plus baseline security headers (HSTS, nosniff, frame deny, CSP, permissions policy). Custom Vercel Firewall / WAF rules are configured in the project Firewall tab after the project exists.

Production domain: **samarthagamanainfra.com** (DNS on Cloudflare).

## Cloudflare DNS

Grey-cloud (DNS only) until HTTPS is live. SSL/TLS mode: **Full (strict)** — never Flexible.

| Type  | Name | Content                |
| ----- | ---- | ---------------------- |
| A     | `@`  | `10.0.1.2`            |
| CNAME | `www` | `cname.vercel-dns.com` |

## Pages

- Disclaimer (first visit)
- 3D construction entrance (once per session; skip available)
- Home, About, What we do (plots, apartments, villas, commercial, farmlands)
- Our projects, Ongoing, Upcoming, Contact
- Quick enquire on every page

Optional: drop a file at `public/construction.mp4` later if you want a filmed overlay; the 3D site sequence is the entrance today.
