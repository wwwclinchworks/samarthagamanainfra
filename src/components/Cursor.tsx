import { useEffect } from "react"

export function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    document.body.classList.add("has-cursor")
    const dot = document.getElementById("cursor-dot")
    const ring = document.getElementById("cursor-ring")
    if (!dot || !ring) return
    let mx = innerWidth / 2
    let my = innerHeight / 2
    let rx = mx
    let ry = my
    let raf = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)"
    }
    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      ring.style.transform = "translate(" + rx + "px," + ry + "px) translate(-50%,-50%)"
      raf = requestAnimationFrame(loop)
    }
    loop()
    const over = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,.parcel-card,.dev-panel")) ring.classList.add("hover")
    }
    const out = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button,.parcel-card,.dev-panel")) ring.classList.remove("hover")
    }
    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove("has-cursor")
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  )
}
