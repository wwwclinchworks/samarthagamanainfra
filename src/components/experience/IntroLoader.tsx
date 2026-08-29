import { useEffect, useRef } from "react"
import gsap from "gsap"

type Particle = {
  x: number
  y: number
  tx: number
  ty: number
  r: number
  brass: boolean
}

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      onDone()
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isSmall = window.innerWidth < 820
    const dpr = Math.min(window.devicePixelRatio, 2)
    let W = 0
    let H = 0
    let running = true
    let skipped = false
    let finished = false

    const resize = () => {
      W = canvas.width = innerWidth * dpr
      H = canvas.height = innerHeight * dpr
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
    }
    resize()
    window.addEventListener("resize", resize)

    const POOL = isSmall ? 700 : 1600
    const particles: Particle[] = []
    for (let i = 0; i < POOL; i += 1) {
      particles.push({
        x: Math.random() * Math.max(W, 1),
        y: Math.random() * Math.max(H, 1),
        tx: Math.random() * Math.max(W, 1),
        ty: Math.random() * Math.max(H, 1),
        r: Math.random() * 1.5 + 0.6,
        brass: Math.random() < 0.45,
      })
    }

    const sampleText = (text: string, size: number) => {
      const off = document.createElement("canvas")
      off.width = W
      off.height = H
      const octx = off.getContext("2d")
      if (!octx) return [] as Array<{ x: number; y: number }>
      octx.fillStyle = "#fff"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = `800 ${size}px "Big Shoulders Display", sans-serif`
      octx.fillText(text, W / 2, H / 2)
      const step = isSmall ? 7 : 9
      const data = octx.getImageData(0, 0, W, H).data
      const pts: Array<{ x: number; y: number }> = []
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] > 140) pts.push({ x, y })
        }
      }
      for (let j = pts.length - 1; j > 0; j -= 1) {
        const k = (Math.random() * (j + 1)) | 0
        const tmp = pts[j]
        pts[j] = pts[k]
        pts[k] = tmp
      }
      return pts
    }

    const assignTargets = (pts: Array<{ x: number; y: number }>) => {
      for (let i = 0; i < particles.length; i += 1) {
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
      for (const pt of particles) {
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
      requestAnimationFrame(loop)
    }
    loop()

    const finish = () => {
      if (finished) return
      finished = true
      running = false
      const loader = document.getElementById("loader")
      gsap.to(loader, {
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        onComplete: () => {
          onDone()
        },
      })
    }

    const skipBtn = skipRef.current
    const showSkip = window.setTimeout(() => skipBtn?.classList.add("show"), 1100)
    skipBtn?.addEventListener("click", () => {
      skipped = true
      finish()
    })

    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
    const fontSizeFor = (text: string) => {
      const base = Math.min(innerWidth * 0.17, 230)
      return text.length > 7 ? base * 0.82 : base
    }

    void (async () => {
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
      window.clearTimeout(showSkip)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
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
