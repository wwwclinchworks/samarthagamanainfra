import { useEffect, useRef } from "react"
import gsap from "gsap"
import { playCityIntro } from "../lib/cityScene"
import { revealHero } from "../lib/motion"

type Particle = { x: number; y: number; tx: number; ty: number; r: number; brass: boolean }

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let skipped = false
    let running = true
    let raf = 0

    let notified = false
    const notify = () => {
      if (notified) return
      notified = true
      onDone()
    }

    const finish = () => {
      if (doneRef.current) return
      doneRef.current = true
      running = false
      cancelAnimationFrame(raf)
      try {
        sessionStorage.setItem("sgi-intro", "1")
      } catch {
        /* ignore */
      }
      document.body.classList.remove("loading")
      const loader = document.getElementById("loader")
      revealHero()
      playCityIntro()
      if (!loader) {
        notify()
        return
      }
      loader.style.pointerEvents = "none"
      gsap.to(loader, {
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: notify,
      })
      window.setTimeout(notify, 520)
    }

    const failsafe = window.setTimeout(finish, 3600)
    if (reduce) {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { alpha: false })
    if (!canvas || !ctx) {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    const isSmall = window.innerWidth < 820
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25)
    const maxW = Math.min(innerWidth, 1100)
    const maxH = Math.min(innerHeight, 720)
    const W = (canvas.width = Math.floor(maxW * dpr))
    const H = (canvas.height = Math.floor(maxH * dpr))
    canvas.style.width = "100%"
    canvas.style.height = "100%"

    const POOL = isSmall ? 180 : 420
    const particles: Particle[] = []
    for (let i = 0; i < POOL; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: Math.random() * W,
        ty: Math.random() * H,
        r: Math.random() * 1.4 + 0.5,
        brass: Math.random() < 0.45,
      })
    }

    const sampleText = (text: string, size: number) => {
      const offW = 640
      const offH = 280
      const off = document.createElement("canvas")
      off.width = offW
      off.height = offH
      const octx = off.getContext("2d", { willReadFrequently: true })
      if (!octx) return []
      octx.fillStyle = "#fff"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = "800 " + size + 'px "Big Shoulders Display", sans-serif'
      octx.fillText(text, offW / 2, offH / 2)
      const step = 8
      let data: Uint8ClampedArray
      try {
        data = octx.getImageData(0, 0, offW, offH).data
      } catch {
        return []
      }
      const pts: { x: number; y: number }[] = []
      const sx = W / offW
      const sy = H / offH
      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          if (data[(y * offW + x) * 4 + 3] > 140) pts.push({ x: x * sx, y: y * sy })
        }
      }
      return pts
    }

    const assignTargets = (pts: { x: number; y: number }[]) => {
      for (let i = 0; i < particles.length; i++) {
        const pt = pts[i % Math.max(pts.length, 1)]
        if (pts.length) {
          particles[i].tx = pt.x
          particles[i].ty = pt.y
        }
      }
    }

    const loop = () => {
      if (!running) return
      ctx.fillStyle = "#0B0E13"
      ctx.fillRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i]
        pt.x += (pt.tx - pt.x) * 0.08
        pt.y += (pt.ty - pt.y) * 0.08
        ctx.globalAlpha = 0.88
        ctx.fillStyle = pt.brass ? "#C9A176" : "#EDEAE1"
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.r * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    const fontSizeFor = (text: string) => {
      const base = text.length > 7 ? 72 : 96
      return base
    }

    const onSkip = (e: Event) => {
      e.preventDefault()
      e.stopPropagation()
      skipped = true
      finish()
    }
    const skipEl = skipRef.current
    skipEl?.addEventListener("click", onSkip)
    skipEl?.classList.add("show")

    ;(async () => {
      try {
        await Promise.race([document.fonts.ready, wait(400)])
      } catch {
        /* ignore */
      }
      await wait(280)
      if (skipped || doneRef.current) return
      assignTargets(sampleText("SAMARTHA", fontSizeFor("SAMARTHA")))
      await wait(900)
      if (skipped || doneRef.current) return
      assignTargets(sampleText("GAMANA", fontSizeFor("GAMANA") * 1.05))
      await wait(900)
      if (skipped || doneRef.current) return
      finish()
    })()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
      skipEl?.removeEventListener("click", onSkip)
      document.body.classList.remove("loading")
    }
  }, [onDone])

  return (
    <div id="loader">
      <canvas id="intro-canvas" ref={canvasRef} />
      <div id="loader-caption">Calibrating coordinates</div>
      <button id="skip-intro" ref={skipRef} type="button">
        Skip intro →
      </button>
    </div>
  )
}
