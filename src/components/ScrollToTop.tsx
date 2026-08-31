import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"
import { ScrollTrigger } from "gsap/ScrollTrigger"

function scrollWindowToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, "")
  if (!id) {
    scrollWindowToTop()
    return
  }
  const el = document.getElementById(id)
  if (!el) {
    scrollWindowToTop()
    return
  }
  const nav = document.getElementById("site-nav")
  const offset = nav ? nav.getBoundingClientRect().height + 12 : 0
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "instant" })
}

/** Keep every route change at the top (or at the in-page anchor when using #hash). */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
  }, [])

  useLayoutEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

    if (hash) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToHash(hash))
      })
      return
    }

    scrollWindowToTop()
    requestAnimationFrame(() => {
      scrollWindowToTop()
      ScrollTrigger.refresh()
    })
  }, [pathname, hash])

  return null
}
