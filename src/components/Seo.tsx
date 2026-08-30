import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { founder, routeMeta, SITE_URL, siteJsonLd } from "../data/public"

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

export function Seo() {
  const loc = useLocation()
  const path = loc.pathname.replace(/\/$/, "") || "/"

  useEffect(() => {
    const meta = routeMeta[path] ?? {
      title: "Samartha Gamana Infra | Nara Sudharshan, Anantapur",
      description: founder.short,
    }
    document.title = meta.title
    setMeta("description", meta.description)
    setMeta(
      "keywords",
      "Nara Sudharshan, Nara Sudharshan Anantapur, Sudharshan Nara, Samartha Gamana Infra, SGI, Anantapur, Anatapur, Andhra Pradesh, founder, owner, real estate, infrastructure",
    )
    setMeta("author", "Nara Sudharshan")
    setMeta("geo.region", "IN-AP")
    setMeta("geo.placename", "Anantapur")
    setMeta("geo.position", "14.6819;77.6006")
    setMeta("ICBM", "14.6819, 77.6006")
    setMeta("robots", "index,follow,max-image-preview:large")
    setMeta("og:title", meta.title, "property")
    setMeta("og:description", meta.description, "property")
    setMeta("og:url", SITE_URL + (path === "/" ? "/" : path), "property")
    setMeta("og:type", path === "/nara-sudharshan" || path === "/founder" ? "profile" : "website", "property")
    setMeta("og:image", SITE_URL + "/newlogo.png", "property")
    setMeta("og:site_name", "Samartha Gamana Infra", "property")
    setMeta("og:locale", "en_IN", "property")
    setMeta("profile:first_name", "Sudharshan", "property")
    setMeta("profile:last_name", "Nara", "property")
    setMeta("twitter:card", "summary_large_image")
    setMeta("twitter:title", meta.title)
    setMeta("twitter:description", meta.description)
    setMeta("twitter:image", SITE_URL + "/newlogo.png")
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement("link")
      link.setAttribute("rel", "canonical")
      document.head.appendChild(link)
    }
    const canonical = path === "/founder" ? "/nara-sudharshan" : path === "/" ? "/" : path
    link.setAttribute("href", SITE_URL + canonical)

    let ld = document.getElementById("sgi-jsonld")
    if (!ld) {
      ld = document.createElement("script")
      ld.id = "sgi-jsonld"
      ld.setAttribute("type", "application/ld+json")
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(siteJsonLd())
  }, [path])

  return null
}
