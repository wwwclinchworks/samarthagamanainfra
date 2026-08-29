import { useEffect } from "react"

export function RouteTrack() {
  useEffect(() => {
    const marker = document.getElementById("route-marker")
    if (!marker) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? window.scrollY / max : 0
        marker.style.top = Math.min(Math.max(p, 0), 1) * 100 + "%"
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div id="route-track" aria-hidden="true">
      <span className="route-label route-label--top">Departure</span>
      <div id="route-marker" />
      <span className="route-label route-label--bottom">Arrival</span>
    </div>
  )
}
