# Samartha Gamana Infra

Official site for **Samartha Gamana Infra Private Limited** (CIN `U43300AP2026PTC124637`) — Housing Board Colony, Anantapur, Andhra Pradesh. Founded by **Nara Sudharshan**.

## Local

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:45217](http://127.0.0.1:45217).

## Deploy flow (GitHub → Cloudflare)

Do **not** deploy from a laptop for production. Push to `main` on GitHub; Cloudflare Workers deploys automatically.

### One-time setup (required once)

1. Open [GitHub → Settings → Secrets and variables → Actions](https://github.com/wwwclinchworks/samarthagamanainfra/settings/secrets/actions).
2. Add repository secrets:
   - `CLOUDFLARE_API_TOKEN` — token with **Workers Scripts Edit** (and **Zone DNS Edit** if custom domains are managed by Wrangler).
   - `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID.
3. Ensure Actions are enabled for the repo.
4. Push to `main` (or run the **Deploy to Cloudflare Workers** workflow manually).

Workflow file: `.github/workflows/deploy.yml` (`npm ci` → `npm run build` → `wrangler deploy`).

**Optional alternative:** Cloudflare dashboard → Workers → `samartha-gamana-infra` → Settings → Builds → Connect GitHub repo `wwwclinchworks/samarthagamanainfra`, build `npm run build`, deploy `npx wrangler deploy`, production branch `main`.

Live:

- https://samarthagamanainfra.com
- https://www.samarthagamanainfra.com

## Company facts (public)

| Field | Value |
| --- | --- |
| Legal name | Samartha Gamana Infra Private Limited |
| Entity | Private Limited Company (**not** an LLP) |
| CIN | U43300AP2026PTC124637 |
| Registered office | No. 28-5-154, 1st Floor, Housing Board Colony, Anantapur, AP 515001 |
| Founder | Nara Sudharshan (Anantapur) |
| WhatsApp | +91 63025 56139 |
| Email | connect@samarthagamana.in |

## Pages

`/` · `/nara-sudharshan` · `/gallery` (Anantapur & A.P. photography) · `/about` · `/projects` · `/contact` and supporting routes.

## Search

`/sitemap.xml` · `/robots.txt` — submit the sitemap in Google Search Console after go-live.
