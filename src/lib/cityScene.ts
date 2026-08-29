import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type CityHandle = {
  playIntro: () => void
  destroy: () => void
}

export function mountCityScene(canvas: HTMLCanvasElement): CityHandle | null {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isSmall = window.innerWidth < 820

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.3 : 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0b0e13, 0.016)

  const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 500)
  camera.position.set(0, 95, 6)
  camera.lookAt(0, 0, 0)

  scene.add(new THREE.AmbientLight(0x8899aa, 0.55))
  const sun = new THREE.DirectionalLight(0xffe4bd, 0.55)
  sun.position.set(30, 60, 20)
  scene.add(sun)
  const rim = new THREE.PointLight(0xb98f4b, 0.35, 200)
  rim.position.set(-30, 20, -20)
  scene.add(rim)

  const grid = new THREE.GridHelper(220, 44, 0x6c93b8, 0x1c222c)
  const gridMat = grid.material as THREE.Material & { opacity: number; transparent: boolean }
  gridMat.opacity = 0.35
  gridMat.transparent = true
  scene.add(grid)

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(240, 240),
    new THREE.MeshStandardMaterial({ color: 0x0d1119, roughness: 1, metalness: 0 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.position.y = -0.02
  scene.add(ground)

  const buildingColors = [0x1b212b, 0x232a36, 0x2c3444, 0x3a4356]
  const buildingGeo = new THREE.BoxGeometry(1, 1, 1)
  buildingGeo.translate(0, 0.5, 0)
  const gridSize = isSmall ? 9 : 12
  const spacing = 5.4
  const raw: Array<{ x: number; z: number; dist: number }> = []
  for (let ix = 0; ix < gridSize; ix += 1) {
    for (let iz = 0; iz < gridSize; iz += 1) {
      if (ix === Math.floor(gridSize / 2) || iz === Math.floor(gridSize / 2)) continue
      if (Math.random() < 0.22) continue
      const x = (ix - (gridSize - 1) / 2) * spacing + (Math.random() - 0.5) * 1.4
      const z = (iz - (gridSize - 1) / 2) * spacing + (Math.random() - 0.5) * 1.4
      raw.push({ x, z, dist: Math.hypot(x, z) })
    }
  }

  type B = {
    x: number
    z: number
    height: number
    w: number
    d: number
    groupIdx: number
    startT: number
  }
  const buildingData: B[] = raw.map((p, i) => {
    const centerFactor = 1 - Math.min(p.dist / 40, 1)
    const height = 2 + Math.random() * 4 + centerFactor * 11 + (Math.random() < 0.1 ? 6 : 0)
    return {
      x: p.x,
      z: p.z,
      height,
      w: 1.5 + Math.random() * 1.3,
      d: 1.5 + Math.random() * 1.3,
      groupIdx: i % buildingColors.length,
      startT: Math.random() * 0.55,
    }
  })
  const perGroup: B[][] = buildingColors.map(() => [])
  buildingData.forEach((b) => {
    perGroup[b.groupIdx].push(b)
  })
  const buildingGroups = buildingColors.map((color, gi) => {
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.25 })
    const mesh = new THREE.InstancedMesh(buildingGeo, mat, perGroup[gi].length)
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    scene.add(mesh)
    return { mesh, data: perGroup[gi] }
  })

  const dummy = new THREE.Object3D()
  const easeOutBack = (t: number) => {
    const c1 = 1.4
    const c3 = c1 + 1
    return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
  }
  const updateBuildings = (globalT: number) => {
    buildingGroups.forEach((g) => {
      g.data.forEach((b, i) => {
        let t = (globalT - b.startT) / (1 - b.startT)
        t = Math.min(Math.max(t, 0), 1)
        const eased = easeOutBack(t)
        dummy.position.set(b.x, 0, b.z)
        dummy.scale.set(b.w, Math.max(eased * b.height, 0.001), b.d)
        dummy.updateMatrix()
        g.mesh.setMatrixAt(i, dummy.matrix)
      })
      g.mesh.instanceMatrix.needsUpdate = true
    })
  }
  updateBuildings(0)

  const roadMeshes: THREE.Mesh[] = []
  const makeRoad = (w: number, d: number, x: number, z: number) => {
    const geo = new THREE.BoxGeometry(w, 0.06, d)
    const mat = new THREE.MeshBasicMaterial({ color: 0xb98f4b, transparent: true, opacity: 0.5 })
    const m = new THREE.Mesh(geo, mat)
    m.position.set(x, 0.03, z)
    m.scale.set(0.001, 1, 1)
    scene.add(m)
    roadMeshes.push(m)
  }
  makeRoad(220, 2.4, 0, 0)
  makeRoad(2.4, 220, 0, 0)
  makeRoad(160, 1.6, 0, 26)
  makeRoad(160, 1.6, 0, -26)

  const treeCount = isSmall ? 18 : 32
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
  for (let t = 0; t < treeCount; t += 1) {
    const side = Math.random() < 0.5 ? 1 : -1
    const tx = (Math.random() - 0.5) * 180
    const tz = side * (28 + Math.random() * 4)
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

  const particleCount = isSmall ? 200 : 420
  const particleGeo = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  for (let p = 0; p < particleCount; p += 1) {
    positions[p * 3] = (Math.random() - 0.5) * 140
    positions[p * 3 + 1] = Math.random() * 30 + 2
    positions[p * 3 + 2] = (Math.random() - 0.5) * 140
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({ color: 0xe0b472, size: 0.18, transparent: true, opacity: 0.5 }),
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
    const dt = clock.getDelta()
    particles.rotation.y += dt * 0.01
    renderer.render(scene, camera)
  }
  frame()

  const checkVisible = () => {
    const hero = document.getElementById("hero")
    const origin = document.getElementById("chapter-origin")
    if (!hero || !origin) return
    const r1 = hero.getBoundingClientRect()
    const r2 = origin.getBoundingClientRect()
    const visible =
      (r1.bottom > 0 && r1.top < innerHeight) || (r2.bottom > 0 && r2.top < innerHeight)
    if (visible && !active) {
      active = true
      frame()
    }
    if (!visible && active) active = false
  }
  window.addEventListener("scroll", checkVisible, { passive: true })

  let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | undefined

  const initScrollCamera = () => {
    scrollTrigger = ScrollTrigger.create({
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
  }

  const playIntro = () => {
    const camState = { x: 0, y: 95, z: 6 }
    const cityState = { p: 0 }
    gsap.to(cityState, {
      p: 1,
      duration: reduceMotion ? 0.6 : 2.6,
      ease: "power2.out",
      onUpdate: () => updateBuildings(cityState.p),
    })
    gsap.to(
      roadMeshes.map((m) => m.scale),
      { x: 1, duration: 1.2, delay: reduceMotion ? 0 : 1.5, ease: "power3.out", stagger: 0.12 },
    )
    gsap.to([trunkMesh.scale, canopyMesh.scale], {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.9,
      delay: reduceMotion ? 0 : 1.9,
      ease: "back.out(2)",
    })
    gsap.to(camState, {
      y: 15,
      z: 34,
      x: 2,
      duration: reduceMotion ? 0.6 : 2.8,
      ease: "power3.inOut",
      delay: 0.1,
      onUpdate: () => {
        camera.position.set(camState.x, camState.y, camState.z)
        camera.lookAt(0, 2, 0)
      },
      onComplete: initScrollCamera,
    })
  }

  return {
    playIntro,
    destroy: () => {
      active = false
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", checkVisible)
      scrollTrigger?.kill()
      renderer.dispose()
    },
  }
}
