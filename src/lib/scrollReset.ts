import { ScrollTrigger } from "gsap/ScrollTrigger"

/** Disable browser restoring scroll position on back/forward and SPA navigations. */
export function disableBrowserScrollRestoration() {
  if (typeof window === "undefined") return
  if ("scrollRestoration" in history) history.scrollRestoration = "manual"
}

/** Kill GSAP scroll state without touching unrelated global tweens. */
export function clearGsapScrollState() {
  ScrollTrigger.clearScrollMemory()
}

export function scrollWindowToTop() {
  if (typeof window === "undefined") return
  window.scrollTo({ top: 0, left: 0, behavior: "auto" })
}

/** Scroll to an in-page anchor, offset for the fixed nav. */
export function scrollToAnchor(hash: string) {
  const id = hash.replace(/^#/, "")
  if (!id) {
    scrollWindowToTop()
    return true
  }

  const el = document.getElementById(id)
  if (!el) return false

  const nav = document.getElementById("site-nav")
  const offset = nav ? nav.getBoundingClientRect().height + 16 : 16
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset)
  window.scrollTo({ top, left: 0, behavior: "auto" })
  return true
}

/** Retry the minimum number of frames needed for a lazily loaded route or anchor. */
export function enforceScrollToTop() {
  scrollWindowToTop()
}

export function enforceScrollToAnchor(hash: string) {
  let attempts = 0
  let raf = 0

  const attempt = () => {
    if (scrollToAnchor(hash)) return
    attempts += 1
    if (attempts < 24) raf = requestAnimationFrame(attempt)
    else scrollWindowToTop()
  }

  attempt()
  return () => cancelAnimationFrame(raf)
}
