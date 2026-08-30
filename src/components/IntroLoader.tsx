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
    const isMobile = window.matchMedia("(max-width: 820px)").matches
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
        duration: 0.4,
        ease: "power2.out",
        onComplete: notify,
      })
      window.setTimeout(notify, 480)
    }

    // Faster failsafe on phones so the intro cannot stick
    const failsafe = window.setTimeout(finish, isMobile ? 2400 : 3600)
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

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.1 : 1.25)
    const cssW = window.innerWidth
    const cssH = window.innerHeight
    const W = (canvas.width = Math.floor(cssW * dpr))
    const H = (canvas.height = Math.floor(cssH * dpr))
    canvas.style.width = `${cssW}px`
    canvas.style.height = `${cssH}px`

    const POOL = isMobile ? 110 : 420
    const particles: Particle[] = []
    for (let i = 0; i < POOL; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: Math.random() * W,
        ty: Math.random() * H,
        r: Math.random() * (isMobile ? 1.1 : 1.4) + 0.45,
        brass: Math.random() < 0.45,
      })
    }

    const sampleText = (text: string, size: number) => {
      const offW = isMobile ? 420 : 640
      const offH = isMobile ? 200 : 280
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
      const step = isMobile ? 10 : 8
      let data: Uint8ClampedArray
      try {
        data = octx.getImageData(0, 0, offW, offH).data
      } catch {
        return []
      }
      const pts: { x: number; y: number }[] = []
      const sx = W / offW
      const sy = H / offH
      // Keep particle text in the vertical middle so it clears caption/skip chrome
      const yOffset = isMobile ? H * 0.02 : 0
      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          if (data[(y * offW + x) * 4 + 3] > 140) pts.push({ x: x * sx, y: y * sy + yOffset })
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
      if (isMobile) return text.length > 7 ? 48 : 58
      return text.length > 7 ? 72 : 96
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
        await Promise.race([document.fonts.ready, wait(300)])
      } catch {
        /* ignore */
      }
      await wait(isMobile ? 160 : 280)
      if (skipped || doneRef.current) return
      assignTargets(sampleText("SAMARTHA", fontSizeFor("SAMARTHA")))
      await wait(isMobile ? 700 : 900)
      if (skipped || doneRef.current) return
      assignTargets(sampleText("GAMANA", fontSizeFor("GAMANA") * 1.05))
      await wait(isMobile ? 700 : 900)
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
    <div id="loader" role="dialog" aria-label="Site introduction">
      <canvas id="intro-canvas" ref={canvasRef} aria-hidden />
      <div className="loader__chrome">
        <p id="loader-caption">Samartha Gamana Infra</p>
        <button id="skip-intro" ref={skipRef} type="button">
          Skip intro →
        </button>
      </div>
    </div>
  )
}
