import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Plugin } from "vite"
import { defineConfig } from "vite"
import { routeMeta, SITE_URL, sitemapPaths, siteJsonLd } from "./src/data/public.ts"

function stampSeoPages(): Plugin {
  return {
    name: "stamp-seo-pages",
    closeBundle() {
      const dist = join(process.cwd(), "dist")
      const indexPath = join(dist, "index.html")
      const html = readFileSync(indexPath, "utf8")
      const graph = JSON.stringify(siteJsonLd())
      for (const path of sitemapPaths) {
        const meta = routeMeta[path] ?? {
          title: "Samartha Gamana Infra | Nara Sudharshan, Anantapur",
          description: "Nara Sudharshan is the founder and owner of Samartha Gamana Infra. From Anantapur.",
        }
        const canonicalPath = path === "/founder" ? "/nara-sudharshan" : path
        const url = SITE_URL + (canonicalPath === "/" ? "/" : canonicalPath)
        let out = html
        out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
        out = out.replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${escapeAttr(meta.description)}" />`,
        )
        out = out.replace(
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
        )
        out = out.replace(
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
        )
        out = out.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`)
        out = out.replace(
          /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:url" content="${url}" />`,
        )
        out = out.replace(
          /<script type="application\/ld\+json" id="sgi-jsonld">[\s\S]*?<\/script>/,
          `<script type="application/ld+json" id="sgi-jsonld">${graph}</script>`,
        )
        if (path === "/") {
          writeFileSync(indexPath, out)
          continue
        }
        const file = join(dist, path.slice(1), "index.html")
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, out)
      }
    },
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
}

function escapeAttr(s: string) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;")
}

export default defineConfig({
  plugins: [react(), tailwindcss(), stampSeoPages()],
  server: {
    host: "0.0.0.0",
    port: 45217,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 45217,
    strictPort: true,
  },
})
