import { ScrollTrigger } from "gsap/ScrollTrigger"

/** Disable browser restoring scroll position on back/forward and SPA navigations. */
export function disableBrowserScrollRestoration() {
  if (typeof window === "undefined") return
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }
}

/** Kill GSAP scroll memory and all active ScrollTriggers. */
export function clearGsapScrollState() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  ScrollTrigger.clearScrollMemory()
}

/** Force the document scroll position to the top immediately. */
export function scrollWindowToTop() {
  if (typeof window === "undefined") return
  clearGsapScrollState()
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
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
  const offset = nav ? nav.getBoundingClientRect().height + 16 : 0
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo(0, Math.max(0, top))
  document.documentElement.scrollTop = Math.max(0, top)
  document.body.scrollTop = Math.max(0, top)
  return true
}

/** Repeat scroll-to-top for a few frames — catches late layout / browser restore. */
export function enforceScrollToTop() {
  scrollWindowToTop()
  requestAnimationFrame(scrollWindowToTop)
  window.setTimeout(scrollWindowToTop, 0)
  window.setTimeout(scrollWindowToTop, 50)
  window.setTimeout(scrollWindowToTop, 120)
}

/** Retry anchor scroll until the target section exists in the DOM. */
export function enforceScrollToAnchor(hash: string) {
  let tries = 0
  const attempt = () => {
    if (scrollToAnchor(hash)) return
    tries += 1
    if (tries < 40) requestAnimationFrame(attempt)
    else scrollWindowToTop()
  }
  attempt()
}
