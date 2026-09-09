import { useEffect, useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { revealHero } from "../lib/motion"
import "./introLoader.css"

type Point = {
  x: number
  y: number
  z: number
  tx: number
  ty: number
  tz: number
  vx: number
  vy: number
  vz: number
  seed: number
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function cssColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
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

      if (!loader) {
        notify()
        return
      }

      loader.style.pointerEvents = "none"
      gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
        onComplete: notify,
      })
      window.setTimeout(notify, 620)
    }

    const failsafe = window.setTimeout(finish, 5200)

    if (reduce) {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    document.body.classList.add("loading")

    const canvas = canvasRef.current
    if (!canvas) {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      finish()
      return () => window.clearTimeout(failsafe)
    }

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 800)
    camera.position.z = 360

    const small = window.innerWidth < 820
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.35 : 1.75)
    const count = small ? 900 : 2400
    const points: Point[] = []
    const positions = new Float32Array(count * 3)

    const resize = () => {
      const width = Math.max(1, window.innerWidth)
      const height = Math.max(1, window.innerHeight)
      renderer.setPixelRatio(dpr)
      renderer.setSize(width, height, false)
      const worldH = 1000
      const worldW = worldH * (width / height)
      camera.left = -worldW / 2
      camera.right = worldW / 2
      camera.top = worldH / 2
      camera.bottom = -worldH / 2
      camera.updateProjectionMatrix()
    }
    resize()

    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const w = Math.random()
      const theta = u * Math.PI * 2
      const phi = Math.acos(2 * v - 1)
      const radius = 130 + Math.pow(w, 0.45) * 240
      const x = Math.sin(phi) * Math.cos(theta) * radius
      const y = Math.cos(phi) * radius * 0.62
      const z = Math.sin(phi) * Math.sin(theta) * radius * 0.78

      points.push({
        x,
        y,
        z,
        tx: x,
        ty: y,
        tz: z,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        vz: (Math.random() - 0.5) * 0.45,
        seed: Math.random() * Math.PI * 2,
      })
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

    const white = cssColor("--ink", "#EDEAE1")
    const brass = cssColor("--brass-bright", "#E0B472")
    const colors = new Float32Array(count * 3)
    const whiteColor = new THREE.Color(white)
    const brassColor = new THREE.Color(brass)

    for (let i = 0; i < count; i++) {
      const color = i % 9 === 0 ? brassColor : whiteColor
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: small ? 2.6 : 3.1,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const cloud = new THREE.Points(geometry, material)
    scene.add(cloud)

    const sampleGlyph = async () => {
      try {
        await Promise.race([document.fonts.ready, wait(700)])
      } catch {
        /* font availability is non-critical */
      }

      const off = document.createElement("canvas")
      off.width = 900
      off.height = 500
      const ctx = off.getContext("2d", { willReadFrequently: true })
      if (!ctx) return [] as Array<[number, number]>

      ctx.clearRect(0, 0, off.width, off.height)
      ctx.fillStyle = "#fff"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.font = '900 330px "Big Shoulders Display", sans-serif'
      ctx.fillText("SG", off.width / 2, off.height / 2 + 6)

      let data: Uint8ClampedArray
      try {
        data = ctx.getImageData(0, 0, off.width, off.height).data
      } catch {
        return [] as Array<[number, number]>
      }

      const result: Array<[number, number]> = []
      const step = small ? 8 : 6
      const scale = Math.min((window.innerWidth / window.innerHeight) * 300, 690)
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 150) {
            const nx = ((x - off.width / 2) / off.width) * scale
            const ny = ((off.height / 2 - y) / off.height) * 520
            result.push([nx, ny])
          }
        }
      }
      return result
    }

    const pointer = { x: 0, y: 0, active: false }
    const updatePointer = (clientX: number, clientY: number) => {
      pointer.x = clientX / window.innerWidth - 0.5
      pointer.y = clientY / window.innerHeight - 0.5
      pointer.active = true
    }
    const onPointerMove = (event: PointerEvent) => updatePointer(event.clientX, event.clientY)
    const onPointerLeave = () => {
      pointer.active = false
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("pointerleave", onPointerLeave, { passive: true })
    window.addEventListener("resize", resize, { passive: true })

    const glyphPromise = sampleGlyph()
    const start = performance.now()

    const glyphCache = { current: [] as Array<[number, number]> }
    void glyphPromise.then((glyph) => {
      if (running) glyphCache.current = glyph
    })

    const draw = (time: number) => {
      if (!running) return

      const elapsed = time - start
      const morph = Math.min(1, Math.max(0, (elapsed - 1150) / 1350))
      const morphEase = 1 - Math.pow(1 - morph, 4)
      const drift = 1 - morphEase
      const targetGlyph = glyphCache.current
      const elapsedSeconds = time * 0.001

      cloud.rotation.y += 0.0008 + drift * 0.0017
      cloud.rotation.x = Math.sin(elapsedSeconds * 0.25) * 0.045 * drift

      for (let i = 0; i < count; i++) {
        const p = points[i]

        const noiseX = Math.sin(elapsedSeconds * 0.75 + p.seed) * (2.2 * drift)
        const noiseY = Math.cos(elapsedSeconds * 0.9 + p.seed * 1.7) * (1.8 * drift)
        const noiseZ = Math.sin(elapsedSeconds * 0.6 + p.seed * 0.8) * (1.5 * drift)

        if (targetGlyph.length) {
          const target = targetGlyph[i % targetGlyph.length]
          p.tx = target[0]
          p.ty = target[1]
          p.tz = ((i % 17) - 8) * (small ? 2.2 : 3.4)
        }

        const px = p.tx * morphEase + p.x * drift
        const py = p.ty * morphEase + p.y * drift
        const pz = p.tz * morphEase + p.z * drift

        let repelX = 0
        let repelY = 0
        if (pointer.active) {
          const dx = px / 900 - pointer.x
          const dy = py / 520 + pointer.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 0.42) {
            const force = Math.pow((0.42 - distance) / 0.42, 2) * (small ? 42 : 58)
            repelX = dx / Math.max(distance, 0.001) * force
            repelY = dy / Math.max(distance, 0.001) * force
          }
        }

        p.x += (px + repelX - p.x) * (morph > 0.65 ? 0.075 : 0.045)
        p.y += (py + repelY - p.y) * (morph > 0.65 ? 0.075 : 0.045)
        p.z += (pz + noiseZ - p.z) * 0.04

        positions[i * 3] = p.x + noiseX
        positions[i * 3 + 1] = p.y + noiseY
        positions[i * 3 + 2] = p.z
      }

      geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
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

    const timeline = window.setTimeout(() => {
      if (skipped || doneRef.current) return
      finish()
    }, 3300)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
      window.clearTimeout(timeline)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerleave", onPointerLeave)
      window.removeEventListener("resize", resize)
      skipEl?.removeEventListener("click", skip)
      document.body.classList.remove("loading")
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [onDone])

  return (
    <div id="loader" role="dialog" aria-label="Loading Samartha Gamana Infra">
      <canvas id="intro-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="loader__meta">
        <span>Samartha Gamana Infra</span>
        <span className="loader__rule" />
        <span>Establishing presence</span>
      </div>
      <div id="loader-caption">Building the experience</div>
      <button id="skip-intro" ref={skipRef} type="button">
        Skip intro →
      </button>
    </div>
  )
}
