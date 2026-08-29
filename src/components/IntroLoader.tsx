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

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const skip = document.getElementById("skip-intro")
    let skipped = false
    let done = false
    let running = true
    let raf = 0

    const finish = () => {
      if (done) return
      done = true
      running = false
      cancelAnimationFrame(raf)
      document.body.classList.remove("loading")
      const loader = document.getElementById("loader")
      gsap.to(loader, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          onDone()
        },
      })
      revealHero()
      playCityIntro()
    }

    if (reduce) {
      finish()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      finish()
      return
    }
    const ctx = canvas.getContext("2d")
    if (!ctx) {
      finish()
      return
    }

    const isSmall = window.innerWidth < 820
    const dpr = Math.min(window.devicePixelRatio, 2)
    let W = 0
    let H = 0
    const resize = () => {
      W = canvas.width = innerWidth * dpr
      H = canvas.height = innerHeight * dpr
      canvas.style.width = innerWidth + "px"
      canvas.style.height = innerHeight + "px"
    }
    resize()

    const POOL = isSmall ? 700 : 1600
    const particles: Particle[] = []
    for (let i = 0; i < POOL; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        tx: Math.random() * W,
        ty: Math.random() * H,
        r: Math.random() * 1.5 + 0.6,
        brass: Math.random() < 0.45,
      })
    }

    const sampleText = (text: string, size: number) => {
      const off = document.createElement("canvas")
      off.width = W
      off.height = H
      const octx = off.getContext("2d")
      if (!octx) return []
      octx.fillStyle = "#fff"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = "800 " + size + 'px "Big Shoulders Display", sans-serif'
      octx.fillText(text, W / 2, H / 2)
      const step = isSmall ? 7 : 9
      const data = octx.getImageData(0, 0, W, H).data
      const pts: { x: number; y: number }[] = []
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 140) pts.push({ x, y })
        }
      }
      for (let j = pts.length - 1; j > 0; j--) {
        const k = (Math.random() * (j + 1)) | 0
        const tmp = pts[j]
        pts[j] = pts[k]
        pts[k] = tmp
      }
      return pts
    }

    const assignTargets = (pts: { x: number; y: number }[]) => {
      for (let i = 0; i < particles.length; i++) {
        if (pts[i]) {
          particles[i].tx = pts[i].x
          particles[i].ty = pts[i].y
        } else {
          particles[i].tx = W / 2 + (Math.random() - 0.5) * W * 1.5
          particles[i].ty = H / 2 + (Math.random() - 0.5) * H * 1.5
        }
      }
    }

    const mouse = { x: -9999, y: -9999 }
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX * dpr
      mouse.y = e.clientY * dpr
    }
    window.addEventListener("mousemove", onMove)

    const loop = () => {
      if (!running) return
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        const pt = particles[i]
        pt.x += (pt.tx - pt.x) * 0.07
        pt.y += (pt.ty - pt.y) * 0.07
        const dx = pt.x - mouse.x
        const dy = pt.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 130 && dist > 0.01) {
          const f = ((130 - dist) / 130) * 2.4
          pt.x += (dx / dist) * f
          pt.y += (dy / dist) * f
        }
        ctx.globalAlpha = 0.85
        ctx.fillStyle = pt.brass ? "#C9A176" : "#EDEAE1"
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.r * dpr, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(loop)
    }
    loop()

    const fontSizeFor = (text: string) => {
      const base = Math.min(innerWidth * 0.17, 230)
      return text.length > 7 ? base * 0.82 : base
    }

    const showSkip = window.setTimeout(() => skip?.classList.add("show"), 1100)
    const onSkip = () => {
      skipped = true
      finish()
    }
    skip?.addEventListener("click", onSkip)

    ;(async () => {
      try {
        await document.fonts.load('800 220px "Big Shoulders Display"')
      } catch {
        /* ignore */
      }
      await wait(700)
      if (skipped) return
      assignTargets(sampleText("SAMARTHA", fontSizeFor("SAMARTHA")))
      await wait(1250)
      if (skipped) return
      assignTargets(sampleText("GAMANA", fontSizeFor("GAMANA") * 1.05))
      await wait(1250)
      if (skipped) return
      finish()
    })()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.clearTimeout(showSkip)
      skip?.removeEventListener("click", onSkip)
    }
  }, [onDone])

  return (
    <div id="loader">
      <canvas id="intro-canvas" ref={canvasRef} />
      <div id="loader-caption">Calibrating coordinates</div>
      <button id="skip-intro" type="button">
        Skip intro →
      </button>
    </div>
  )
}
