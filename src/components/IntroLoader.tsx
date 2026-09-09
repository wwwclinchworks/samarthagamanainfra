import { useEffect, useRef } from "react"
import gsap from "gsap"
import { playCityIntro } from "../lib/cityScene"
import { revealHero } from "../lib/motion"
import "./introLoader.css"

type Particle = {
  x: number
  y: number
  z: number
  tx: number
  ty: number
  tz: number
  r: number
  brass: boolean
  phase: number
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const skipRef = useRef<HTMLButtonElement>(null)
  const doneRef = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let running = true
    let raf = 0
    let skipped = false
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
        scale: 1.02,
        duration: 0.55,
        ease: "power3.out",
        onComplete: notify,
      })
      window.setTimeout(notify, 650)
    }

    const failsafe = window.setTimeout(finish, 4200)
    if (reduce) {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    document.body.classList.add("loading")
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d", { alpha: false })
    if (!canvas || !ctx) {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    const isSmall = window.innerWidth < 820
    const dpr = Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 1.75)
    const W = Math.floor(window.innerWidth * dpr)
    const H = Math.floor(window.innerHeight * dpr)
    canvas.width = W
    canvas.height = H

    const particleCount = isSmall ? 560 : 1050
    const depth = isSmall ? 72 : 105
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: (Math.random() - 0.5) * depth,
        tx: W / 2,
        ty: H / 2,
        tz: 0,
        r: (Math.random() * 1.35 + 0.45) * dpr,
        brass: Math.random() < 0.2,
        phase: Math.random() * Math.PI * 2,
      })
    }

    const sampleSG = () => {
      const offW = 720
      const offH = 420
      const off = document.createElement("canvas")
      off.width = offW
      off.height = offH
      const octx = off.getContext("2d", { willReadFrequently: true })
      if (!octx) return [] as { x: number; y: number }[]

      octx.fillStyle = "#fff"
      octx.textAlign = "center"
      octx.textBaseline = "middle"
      octx.font = '900 285px "Big Shoulders Display", sans-serif'
      octx.fillText("SG", offW / 2, offH / 2 + 4)

      const data = octx.getImageData(0, 0, offW, offH).data
      const points: { x: number; y: number }[] = []
      const step = isSmall ? 6 : 5
      const cx = W / 2
      const cy = H / 2
      const maxWidth = Math.min(W * 0.72, 980 * dpr)
      const scale = maxWidth / offW
      const yScale = Math.min(1.45, H / W)

      for (let y = 0; y < offH; y += step) {
        for (let x = 0; x < offW; x += step) {
          if (data[(y * offW + x) * 4 + 3] > 150) {
            points.push({
              x: cx + (x - offW / 2) * scale,
              y: cy + (y - offH / 2) * scale * yScale,
            })
          }
        }
      }
      return points
    }

    const targets = sampleSG()
    for (let i = 0; i < particles.length; i++) {
      const target = targets[i % Math.max(targets.length, 1)]
      const layer = ((i * 17) % 11) / 10
      particles[i].tx = target?.x ?? W / 2
      particles[i].ty = target?.y ?? H / 2
      particles[i].tz = (layer - 0.5) * depth
      particles[i].z = (Math.random() - 0.5) * depth
    }

    let pointerX = 0
    let pointerY = 0
    const updatePointer = (clientX: number, clientY: number) => {
      pointerX = (clientX / window.innerWidth - 0.5) * 2
      pointerY = (clientY / window.innerHeight - 0.5) * 2
    }
    const onPointer = (event: PointerEvent) => updatePointer(event.clientX, event.clientY)
    const onTouch = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (touch) updatePointer(touch.clientX, touch.clientY)
    }
    window.addEventListener("pointermove", onPointer, { passive: true })
    window.addEventListener("touchmove", onTouch, { passive: true })

    const project = (x: number, y: number, z: number) => {
      const yaw = pointerX * 0.1
      const pitch = pointerY * 0.075
      const cyaw = Math.cos(yaw)
      const syaw = Math.sin(yaw)
      const cp = Math.cos(pitch)
      const sp = Math.sin(pitch)
      const rx = x * cyaw - z * syaw
      const rz = x * syaw + z * cyaw
      const ry = y * cp - rz * sp
      const rz2 = y * sp + rz * cp
      const perspective = 1 + rz2 / 520
      return {
        x: W / 2 + rx * perspective,
        y: H / 2 + ry * perspective,
        scale: Math.max(0.55, perspective),
        depth: rz2,
      }
    }

    const draw = (time: number) => {
      if (!running) return
      const t = time * 0.001
      ctx.fillStyle = "#0B0E13"
      ctx.fillRect(0, 0, W, H)

      const glow = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.46)
      glow.addColorStop(0, "rgba(201,161,118,0.075)")
      glow.addColorStop(0.5, "rgba(201,161,118,0.025)")
      glow.addColorStop(1, "rgba(11,14,19,0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, W, H)

      const projected = particles.map((particle) => {
        particle.x += (particle.tx - particle.x) * 0.055
        particle.y += (particle.ty - particle.y) * 0.055
        particle.z += (particle.tz - particle.z) * 0.045
        const float = Math.sin(t * 1.25 + particle.phase) * 2.2
        return { particle, p: project(particle.x - W / 2, particle.y - H / 2 + float, particle.z) }
      })
      projected.sort((a, b) => a.p.depth - b.p.depth)

      for (const { particle, p } of projected) {
        ctx.globalAlpha = Math.min(0.96, Math.max(0.2, 0.52 + p.depth / 210))
        ctx.fillStyle = particle.brass ? "#C9A176" : "#EDEAE1"
        ctx.beginPath()
        ctx.arc(p.x, p.y, particle.r * p.scale, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const skip = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
      skipped = true
      finish()
    }
    const skipEl = skipRef.current
    skipEl?.addEventListener("click", skip)
    skipEl?.classList.add("show")

    ;(async () => {
      try {
        await Promise.race([document.fonts.ready, wait(450)])
      } catch {
        /* font loading is non-critical */
      }
      await wait(180)
      if (skipped || doneRef.current) return
      await wait(1900)
      if (skipped || doneRef.current) return
      finish()
    })()

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
      window.removeEventListener("pointermove", onPointer)
      window.removeEventListener("touchmove", onTouch)
      skipEl?.removeEventListener("click", skip)
      document.body.classList.remove("loading")
    }
  }, [onDone])

  return (
    <div id="loader" aria-label="Loading Samartha Gamana Infra">
      <canvas id="intro-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="loader__brand">SG</div>
      <div className="loader__meta">
        <span>Samartha Gamana Infra</span>
        <span className="loader__rule" />
        <span>Establishing presence</span>
      </div>
      <div id="loader-caption">Building the experience</div>
      <button id="skip-intro" ref={skipRef} type="button">Skip intro →</button>
    </div>
  )
}
