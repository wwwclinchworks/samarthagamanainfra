# Samartha Gamana Infra

Dark cinematic site for **Samartha Gamana Infra** — particle intro, procedural 3D city, then a long scroll from land to landmark.

## Local

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:45217](http://127.0.0.1:45217).

## Deploy (Cloudflare Workers, free)

This is a static Vite SPA on Workers Static Assets (`not_found_handling = single-page-application`). No Vercel.

```bash
npm install
npx wrangler login
npm run deploy
```

That publishes to `https://samartha-gamana-infra.<your-subdomain>.workers.dev` and, if the zone is on the same Cloudflare account, attaches:

- `https://samarthagamanainfra.com`
- `https://www.samarthagamanainfra.com`

Custom domains only work when the domain’s nameservers are already on Cloudflare. Delete any leftover Vercel CNAME/A records on `@` and `www` first, then Wrangler (or Workers → Domains & Routes) attaches the Worker.

To attach a domain from the dashboard instead: **Workers & Pages → samartha-gamana-infra → Settings → Domains & Routes → Add → Custom Domain**.

### CI token

Create an API token with **Account → Cloudflare Workers → Edit** (and **Zone → DNS → Edit** if you attach custom domains from Wrangler). Set `CLOUDFLARE_API_TOKEN` and optionally `CLOUDFLARE_ACCOUNT_ID`.

## Pages

`/` intro + city · `/gallery` 2 BHK / villas / houses · `/about` `/projects` `/ongoing` `/upcoming` `/process` `/team` `/cities` `/careers` `/press` `/faq` `/journal` `/contact`

WhatsApp **+91 78158 72759** · connect@samarthagamana.in
