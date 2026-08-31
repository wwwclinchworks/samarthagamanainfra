import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type SceneHandle = {
  camera: THREE.PerspectiveCamera
  updateBuildings: (t: number) => void
  roadMeshes: THREE.Mesh[]
  trunkMesh: THREE.InstancedMesh
  canopyMesh: THREE.InstancedMesh
  dispose: () => void
}

type BuildingLot = {
  x: number
  z: number
  height: number
  w: number
  d: number
  style: number
  startT: number
}

type TrafficCar = {
  axis: "x" | "z"
  lane: number
  speed: number
  offset: number
  length: number
  meshGroup: number
}

function easeOutBack(t: number) {
  const c1 = 1.4
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function makeFacadeTexture(seed: number, litRatio: number) {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 256
  const ctx = canvas.getContext("2d")
  if (!ctx) return new THREE.CanvasTexture(canvas)

  const rng = (n: number) => {
    const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453
    return x - Math.floor(x)
  }

  ctx.fillStyle = "#141a24"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const cols = 6
  const rows = 14
  const padX = 10
  const padY = 12
  const winW = (canvas.width - padX * 2 - (cols - 1) * 6) / cols
  const winH = (canvas.height - padY * 2 - (rows - 1) * 8) / rows

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = padX + col * (winW + 6)
      const y = padY + row * (winH + 8)
      const lit = rng(row * cols + col) < litRatio
      if (lit) {
        const warm = rng(row + col) > 0.35
        ctx.fillStyle = warm ? "#e8c98a" : "#8eb4d4"
        ctx.shadowColor = warm ? "#c9a176" : "#6c93b8"
        ctx.shadowBlur = 6
      } else {
        ctx.fillStyle = "#1e2838"
        ctx.shadowBlur = 0
      }
      ctx.fillRect(x, y, winW, winH)
      ctx.shadowBlur = 0
      ctx.strokeStyle = "#0a0e14"
      ctx.lineWidth = 1
      ctx.strokeRect(x + 0.5, y + 0.5, winW - 1, winH - 1)
    }
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  return tex
}

function createBuildingMaterials() {
  const styles = [
    { body: 0x1a2230, metal: 0.35, lit: 0.42 },
    { body: 0x232c3a, metal: 0.28, lit: 0.36 },
    { body: 0x2a3548, metal: 0.22, lit: 0.48 },
  ]

  return styles.map((s, i) => {
    const map = makeFacadeTexture(i + 1, s.lit)
    const emissiveMap = makeFacadeTexture(i + 10, s.lit * 0.65)
    return new THREE.MeshStandardMaterial({
      color: s.body,
      map,
      emissive: new THREE.Color(0xc9a176),
      emissiveMap,
      emissiveIntensity: 0.55,
      roughness: 0.42,
      metalness: s.metal,
    })
  })
}

function planCityLots(gridBlocks: number, isSmall: boolean): BuildingLot[] {
  const lots: BuildingLot[] = []
  const blockSpan = isSmall ? 7.2 : 8.4
  const road = 2.8
  const cell = blockSpan + road
  const half = Math.floor(gridBlocks / 2)

  for (let bx = -half; bx <= half; bx++) {
    for (let bz = -half; bz <= half; bz++) {
      const cx = bx * cell
      const cz = bz * cell
      const dist = Math.hypot(cx, cz)
      const centerBoost = 1 - Math.min(dist / (cell * (half + 0.5)), 1)

      const count = dist < cell * 0.6 ? 3 : dist < cell * 1.4 ? 2 : 1
      for (let n = 0; n < count; n++) {
        const angle = (n / count) * Math.PI * 2 + (bx + bz) * 0.4
        const radius = blockSpan * (0.18 + n * 0.14)
        const x = cx + Math.cos(angle) * radius
        const z = cz + Math.sin(angle) * radius

        const w = 1.6 + Math.random() * 1.8
        const d = 1.6 + Math.random() * 1.8
        const base = 2.5 + Math.random() * 3
        const tower = centerBoost * (6 + Math.random() * 14)
        const landmark = centerBoost > 0.72 && Math.random() < 0.12 ? 5 + Math.random() * 8 : 0
        const height = base + tower + landmark

        lots.push({
          x,
          z,
          height,
          w,
          d,
          style: Math.floor(Math.random() * 3),
          startT: 0.08 + Math.random() * 0.45 + dist * 0.004,
        })
      }
    }
  }

  return lots
}

export function mountCityScene(canvas: HTMLCanvasElement): SceneHandle | null {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isSmall = window.innerWidth < 820

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.3 : 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0b0e13, 0.014)

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(0, 95, 6)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(0x6a7a90, 0.45))
  scene.add(new THREE.HemisphereLight(0x9eb8d8, 0x141820, 0.35))

  const sun = new THREE.DirectionalLight(0xffe4bd, 0.85)
  sun.position.set(40, 70, 24)
  scene.add(sun)

  const rim = new THREE.PointLight(0xc9a176, 0.55, 220)
  rim.position.set(-36, 24, -28)
  scene.add(rim)

  const cityGlow = new THREE.PointLight(0x6c93b8, 0.35, 180)
  cityGlow.position.set(12, 8, 8)
  scene.add(cityGlow)

  const grid = new THREE.GridHelper(220, 44, 0x4a6080, 0x161c28)
  const gridMats = Array.isArray(grid.material) ? grid.material : [grid.material]
  gridMats.forEach((m) => {
    m.transparent = true
    m.opacity = 0.28
  })
  scene.add(grid)

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 240),
    new THREE.MeshStandardMaterial({ color: 0x0c1018, roughness: 1, metalness: 0 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.02
  scene.add(ground)

  const buildingGeo = new THREE.BoxGeometry(1, 1, 1)
  buildingGeo.translate(0, 0.5, 0)

  const buildingLots = planCityLots(isSmall ? 5 : 7, isSmall)
  const materials = createBuildingMaterials()
  const perStyle = [0, 1, 2].map((style) => buildingLots.filter((b) => b.style === style))

  const dummy = new THREE.Object3D()
  const buildingGroups = perStyle.map((data, style) => {
    const mesh = new THREE.InstancedMesh(buildingGeo, materials[style], Math.max(data.length, 1))
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    mesh.count = data.length
    scene.add(mesh)
    return { mesh, data }
  })

  const updateBuildings = (globalT: number) => {
    buildingGroups.forEach((g) => {
      g.data.forEach((b, i) => {
        const t = Math.min(Math.max((globalT - b.startT) / (1 - b.startT), 0), 1)
        dummy.position.set(b.x, 0, b.z)
        dummy.scale.set(b.w, Math.max(easeOutBack(t) * b.height, 0.001), b.d)
        dummy.updateMatrix()
        g.mesh.setMatrixAt(i, dummy.matrix)
      })
      g.mesh.instanceMatrix.needsUpdate = true
    })
  }
  updateBuildings(0)

  const roadMeshes: THREE.Mesh[] = []
  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x1a1f28,
    roughness: 0.92,
    metalness: 0.05,
  })
  const markingMat = new THREE.MeshBasicMaterial({ color: 0xc9a176, transparent: true, opacity: 0.55 })

  const makeRoad = (w: number, d: number, x: number, z: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), roadMat)
    m.position.set(x, 0.04, z)
    m.scale.set(0.001, 1, 1)
    scene.add(m)
    roadMeshes.push(m)

    const stripeCount = Math.floor(Math.max(w, d) / 5)
    for (let i = 0; i < stripeCount; i++) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(w > d ? 2.2 : 0.14, w > d ? 0.14 : 2.2),
        markingMat,
      )
      stripe.rotation.x = -Math.PI / 2
      const along = -Math.max(w, d) / 2 + (i + 0.5) * (Math.max(w, d) / stripeCount)
      if (w > d) stripe.position.set(x, 0.09, z + along)
      else stripe.position.set(x + along, 0.09, z)
      stripe.scale.set(0, 1, 1)
      scene.add(stripe)
      roadMeshes.push(stripe as THREE.Mesh)
    }
  }

  makeRoad(220, 3.2, 0, 0)
  makeRoad(3.2, 220, 0, 0)
  makeRoad(160, 2.4, 0, 28)
  makeRoad(160, 2.4, 0, -28)
  makeRoad(160, 2.4, 28, 0)
  makeRoad(160, 2.4, -28, 0)

  const carColors = [0xd94f4f, 0xe8e4dc, 0xc9a176, 0x4a6a8a, 0x2a3344]
  const carCount = isSmall ? 14 : 28
  const trafficCars: TrafficCar[] = []
  const carsPerGroup = Math.ceil(carCount / carColors.length)
  const carMeshes = carColors.map((color) => {
    const mesh = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color, roughness: 0.35, metalness: 0.55 }),
      carsPerGroup,
    )
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(mesh)
    return { mesh, slot: 0 }
  })

  const spawnCar = (axis: "x" | "z", lane: number, speed: number) => {
    const group = carMeshes.find((g) => g.slot < g.mesh.count)
    if (!group) return
    const meshGroup = carMeshes.indexOf(group)
    trafficCars.push({
      axis,
      lane,
      speed: speed * (reduce ? 0 : 1),
      offset: Math.random() * 220 - 110,
      length: 1.1 + Math.random() * 0.7,
      meshGroup,
    })
    group.slot++
  }

  for (let i = 0; i < carCount; i++) {
    const axis = i % 2 === 0 ? "x" : "z"
    const lane = (i % 4 < 2 ? 1 : -1) * (1.1 + (i % 2) * 0.55)
    const speed = (8 + Math.random() * 10) * (i % 2 === 0 ? 1 : -1)
    spawnCar(axis, lane, speed)
  }

  const headlightMat = new THREE.MeshBasicMaterial({ color: 0xffe8c0 })
  const taillightMat = new THREE.MeshBasicMaterial({ color: 0xff4444 })
  const headlightMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.08, 6, 6), headlightMat, carCount * 2)
  const taillightMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.07, 6, 6), taillightMat, carCount * 2)
  headlightMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  taillightMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  scene.add(headlightMesh, taillightMesh)

  const updateTraffic = (time: number) => {
    const carDummy = new THREE.Object3D()
    const lightDummy = new THREE.Object3D()
    carMeshes.forEach((g) => {
      g.slot = 0
    })

    let headIdx = 0
    let tailIdx = 0

    trafficCars.forEach((car) => {
      const group = carMeshes[car.meshGroup]
      const idx = group.slot++
      const pos = car.offset + time * car.speed
      const wrapped = ((pos + 110) % 220) - 110

      carDummy.position.set(car.axis === "x" ? wrapped : car.lane, 0.42, car.axis === "z" ? wrapped : car.lane)
      carDummy.scale.set(car.length, 0.42, 0.55)
      if (car.speed < 0) carDummy.rotation.y = Math.PI
      else carDummy.rotation.y = 0
      carDummy.updateMatrix()
      group.mesh.setMatrixAt(idx, carDummy.matrix)

      const frontX = car.axis === "x" ? wrapped + (car.speed > 0 ? car.length * 0.5 : -car.length * 0.5) : car.lane
      const frontZ = car.axis === "z" ? wrapped + (car.speed > 0 ? car.length * 0.5 : -car.length * 0.5) : car.lane
      const rearX = car.axis === "x" ? wrapped - (car.speed > 0 ? car.length * 0.5 : -car.length * 0.5) : car.lane
      const rearZ = car.axis === "z" ? wrapped - (car.speed > 0 ? car.length * 0.5 : -car.length * 0.5) : car.lane

      lightDummy.position.set(frontX, 0.44, frontZ)
      lightDummy.updateMatrix()
      headlightMesh.setMatrixAt(headIdx++, lightDummy.matrix)

      lightDummy.position.set(rearX, 0.44, rearZ)
      lightDummy.updateMatrix()
      taillightMesh.setMatrixAt(tailIdx++, lightDummy.matrix)
    })

    carMeshes.forEach((g) => {
      g.mesh.count = g.slot
      g.mesh.instanceMatrix.needsUpdate = true
    })
    headlightMesh.count = headIdx
    taillightMesh.count = tailIdx
    headlightMesh.instanceMatrix.needsUpdate = true
    taillightMesh.instanceMatrix.needsUpdate = true
  }

  const lampCount = isSmall ? 12 : 20
  const lampMesh = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.06, 0.08, 3.2, 6),
    new THREE.MeshStandardMaterial({ color: 0x2a3038, metalness: 0.6, roughness: 0.4 }),
    lampCount,
  )
  const lampGlowMesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(0.22, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.85 }),
    lampCount,
  )
  for (let i = 0; i < lampCount; i++) {
    const side = i % 2 === 0 ? 1 : -1
    const along = -90 + (i / lampCount) * 180
    const d1 = new THREE.Object3D()
    d1.position.set(along, 1.6, side * 3.6)
    d1.updateMatrix()
    lampMesh.setMatrixAt(i, d1.matrix)
    const d2 = new THREE.Object3D()
    d2.position.set(along, 3.3, side * 3.6)
    d2.updateMatrix()
    lampGlowMesh.setMatrixAt(i, d2.matrix)
  }
  lampMesh.scale.set(0, 0, 0)
  lampGlowMesh.scale.set(0, 0, 0)
  scene.add(lampMesh, lampGlowMesh)

  const treeCount = isSmall ? 16 : 28
  const trunkMesh = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.1, 0.12, 1, 6),
    new THREE.MeshStandardMaterial({ color: 0x3a2f22 }),
    treeCount,
  )
  const canopyMesh = new THREE.InstancedMesh(
    new THREE.ConeGeometry(0.7, 1.6, 6),
    new THREE.MeshStandardMaterial({ color: 0x5c7a5e }),
    treeCount,
  )
  for (let t = 0; t < treeCount; t++) {
    const side = Math.random() < 0.5 ? 1 : -1
    const tx = (Math.random() - 0.5) * 170
    const tz = side * (30 + Math.random() * 5)
    const d1 = new THREE.Object3D()
    d1.position.set(tx, 0.5, tz)
    d1.updateMatrix()
    trunkMesh.setMatrixAt(t, d1.matrix)
    const d2 = new THREE.Object3D()
    d2.position.set(tx, 1.5, tz)
    d2.updateMatrix()
    canopyMesh.setMatrixAt(t, d2.matrix)
  }
  trunkMesh.scale.set(0, 0, 0)
  canopyMesh.scale.set(0, 0, 0)
  scene.add(trunkMesh, canopyMesh)

  const particleCount = isSmall ? 160 : 320
  const particleGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  for (let p = 0; p < particleCount; p++) {
    positions[p * 3] = (Math.random() - 0.5) * 140
    positions[p * 3 + 1] = Math.random() * 30 + 2
    positions[p * 3 + 2] = (Math.random() - 0.5) * 140
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0xe0b472, size: 0.16, transparent: true, opacity: 0.45 }),
  )
  scene.add(particles)

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener("resize", onResize)

  let active = true
  let raf = 0
  const clock = new THREE.Clock()
  const frame = () => {
    if (!active) return
    raf = requestAnimationFrame(frame)
    const elapsed = clock.getElapsedTime()
    particles.rotation.y += clock.getDelta() * 0.008
    if (!reduce) updateTraffic(elapsed)
    renderer.render(scene, camera)
  }
  frame()

  const wrapper = document.getElementById("hero")
  const originEl = document.getElementById("chapter-origin")
  const checkVisible = () => {
    if (!wrapper || !originEl) return
    const r1 = wrapper.getBoundingClientRect()
    const r2 = originEl.getBoundingClientRect()
    const visible =
      (r1.bottom > 0 && r1.top < window.innerHeight) || (r2.bottom > 0 && r2.top < window.innerHeight)
    if (visible && !active) {
      active = true
      clock.start()
      frame()
    }
    if (!visible && active) active = false
  }
  window.addEventListener("scroll", checkVisible, { passive: true })

  const dispose = () => {
    active = false
    cancelAnimationFrame(raf)
    window.removeEventListener("resize", onResize)
    window.removeEventListener("scroll", checkVisible)
    materials.forEach((m) => {
      m.map?.dispose()
      m.emissiveMap?.dispose()
      m.dispose()
    })
    renderer.dispose()
  }

  const playIntro = () => {
    const camState = { x: 0, y: 95, z: 6 }
    const cityState = { p: 0 }
    gsap.to(cityState, {
      p: 1,
      duration: reduce ? 0.6 : 2.6,
      ease: "power2.out",
      onUpdate: () => updateBuildings(cityState.p),
    })
    gsap.to(
      roadMeshes.map((m) => m.scale),
      { x: 1, duration: 1.2, delay: reduce ? 0 : 1.5, ease: "power3.out", stagger: 0.06 },
    )
    gsap.to([trunkMesh.scale, canopyMesh.scale, lampMesh.scale, lampGlowMesh.scale], {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.9,
      delay: reduce ? 0 : 1.9,
      ease: "back.out(2)",
    })
    gsap.to(camState, {
      y: 15,
      z: 34,
      x: 2,
      duration: reduce ? 0.6 : 2.8,
      ease: "power3.inOut",
      delay: 0.1,
      onUpdate: () => {
        camera.position.set(camState.x, camState.y, camState.z)
        camera.lookAt(0, 2, 0)
      },
      onComplete: () => {
        ScrollTrigger.create({
          trigger: "#chapter-origin",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress
            const angle = p * Math.PI * 0.55
            const radius = 34 + p * 8
            camera.position.x = Math.sin(angle) * radius
            camera.position.z = Math.cos(angle) * radius
            camera.position.y = 15 + p * 9
            camera.lookAt(0, 2, 0)
          },
        })
      },
    })
  }

  ;(window as unknown as { __sgiPlayCity?: () => void }).__sgiPlayCity = playIntro

  return { camera, updateBuildings, roadMeshes, trunkMesh, canopyMesh, dispose }
}

export function playCityIntro() {
  let n = 0
  const run = () => {
    const fn = (window as unknown as { __sgiPlayCity?: () => void }).__sgiPlayCity
    if (fn) {
      fn()
      return
    }
    n += 1
    if (n < 40) window.setTimeout(run, 50)
  }
  run()
}
