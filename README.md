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

### One-time setup (required once) — Cloudflare Workers Builds

1. Open [Cloudflare dashboard → Workers → samartha-gamana-infra → Settings → Builds](https://dash.cloudflare.com/?to=/:account/workers/services/view/samartha-gamana-infra/settings).
2. **Connect** GitHub repo `wwwclinchworks/samarthagamanainfra`.
3. Production branch: `main`
4. Build command: `npm run build`
5. Deploy command: `npx wrangler deploy`
6. Save. Every push to `main` deploys automatically.

### Optional: GitHub Actions instead

Template: `docs/github-actions-deploy.yml` — copy to `.github/workflows/deploy.yml`, then add secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` under GitHub → Settings → Secrets → Actions.

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
