import * as THREE from "three"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export type EstateHandle = {
  playIntro: () => void
  destroy: () => void
}

function makeMat(color: number, extras: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.08, ...extras })
}

function addHouse(
  scene: THREE.Scene,
  x: number,
  z: number,
  scale: number,
  wall: number,
  roof: number,
) {
  const g = new THREE.Group()
  g.position.set(x, 0, z)
  g.scale.setScalar(scale)

  const body = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4.2, 5.2), makeMat(wall))
  body.position.y = 2.1
  body.castShadow = true
  body.receiveShadow = true
  g.add(body)

  const roofGeo = new THREE.ConeGeometry(4.9, 2.4, 4)
  const roofMesh = new THREE.Mesh(roofGeo, makeMat(roof, { roughness: 0.55 }))
  roofMesh.position.y = 5.35
  roofMesh.rotation.y = Math.PI / 4
  roofMesh.castShadow = true
  g.add(roofMesh)

  const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.4, 0.55), makeMat(0xc4a07a))
  chimney.position.set(1.6, 5.7, -0.6)
  chimney.castShadow = true
  g.add(chimney)

  const door = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.1, 0.12), makeMat(0x6b4a32))
  door.position.set(0, 1.05, 2.66)
  g.add(door)

  const winMat = makeMat(0xf3e6c4, { emissive: 0xffc978, emissiveIntensity: 0.55, roughness: 0.2 })
  ;[
    [-1.7, 2.5, 2.62],
    [1.7, 2.5, 2.62],
    [3.22, 2.4, 0.8],
    [3.22, 2.4, -0.8],
  ].forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.15, 0.08), winMat)
    w.position.set(wx, wy, wz)
    g.add(w)
  })

  const porch = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.18, 1.3), makeMat(0xe8d7c0))
  porch.position.set(0, 0.12, 3.2)
  porch.receiveShadow = true
  g.add(porch)

  scene.add(g)
  return g
}

export function mountEstateScene(canvas: HTMLCanvasElement): EstateHandle | null {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isSmall = window.innerWidth < 820

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.75))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.12
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf4ead8)
  scene.fog = new THREE.Fog(0xf4ead8, 28, 90)

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 28, 4)
  camera.lookAt(0, 2, 0)

  scene.add(new THREE.HemisphereLight(0xfff4e6, 0xc5d5b8, 0.95))
  const sun = new THREE.DirectionalLight(0xffe2b8, 1.35)
  sun.position.set(18, 26, 12)
  sun.castShadow = true
  sun.shadow.mapSize.set(1024, 1024)
  sun.shadow.camera.near = 2
  sun.shadow.camera.far = 80
  sun.shadow.camera.left = -24
  sun.shadow.camera.right = 24
  sun.shadow.camera.top = 24
  sun.shadow.camera.bottom = -24
  scene.add(sun)
  const fill = new THREE.PointLight(0xffd7a8, 0.45, 40)
  fill.position.set(-10, 8, 8)
  scene.add(fill)

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(70, 64),
    makeMat(0xdce8d4, { roughness: 1 }),
  )
  ground.rotation.x = -Math.PI / 2
  ground.receiveShadow = true
  scene.add(ground)

  const path = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 28), makeMat(0xe9dcc8, { roughness: 0.95 }))
  path.rotation.x = -Math.PI / 2
  path.position.set(0, 0.03, 10)
  path.receiveShadow = true
  scene.add(path)

  const main = addHouse(scene, 0, 0, 1, 0xf3ece3, 0xc9a176)
  main.scale.set(0.001, 0.001, 0.001)
  addHouse(scene, -14, -8, 0.72, 0xf7efe6, 0xd4b896)
  addHouse(scene, 13, -10, 0.64, 0xeee4d6, 0xb98f4b)

  const treeMat = makeMat(0x7d9a78)
  const trunkMat = makeMat(0x8b6b4a)
  for (let i = 0; i < 10; i += 1) {
    const t = new THREE.Group()
    const ang = (i / 10) * Math.PI * 2
    const r = 16 + (i % 3) * 3
    t.position.set(Math.cos(ang) * r, 0, Math.sin(ang) * r - 4)
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.4, 8), trunkMat)
    trunk.position.y = 0.7
    trunk.castShadow = true
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.15, 12, 10), treeMat)
    canopy.position.y = 2.1
    canopy.castShadow = true
    t.add(trunk, canopy)
    scene.add(t)
  }

  const dustGeo = new THREE.BufferGeometry()
  const n = isSmall ? 80 : 160
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i += 1) {
    pos[i * 3] = (Math.random() - 0.5) * 40
    pos[i * 3 + 1] = Math.random() * 10 + 1
    pos[i * 3 + 2] = (Math.random() - 0.5) * 40
  }
  dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: 0xe0b472, size: 0.08, transparent: true, opacity: 0.45 }),
  )
  scene.add(dust)

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
    dust.rotation.y += clock.getDelta() * 0.04
    renderer.render(scene, camera)
  }
  frame()

  const checkVisible = () => {
    const hero = document.getElementById("hero")
    if (!hero) return
    const r = hero.getBoundingClientRect()
    const visible = r.bottom > -80 && r.top < innerHeight + 80
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
      trigger: "#hero",
      start: "top top",
      endTrigger: "#chapter-origin",
      end: "bottom top",
      scrub: 1.15,
      onUpdate: (self) => {
        const p = self.progress
        const angle = 0.35 + p * Math.PI * 0.7
        const radius = 16 - p * 2
        camera.position.x = Math.sin(angle) * radius
        camera.position.z = Math.cos(angle) * radius + 2
        camera.position.y = 6.2 + p * 3.4
        camera.lookAt(0, 2.4, 0)
      },
    })
  }

  const playIntro = () => {
    gsap.to(main.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: reduceMotion ? 0.4 : 1.35,
      ease: "power3.out",
    })
    const cam = { x: 0, y: 28, z: 4 }
    gsap.to(cam, {
      x: 8.5,
      y: 6.2,
      z: 14,
      duration: reduceMotion ? 0.45 : 1.7,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.position.set(cam.x, cam.y, cam.z)
        camera.lookAt(0, 2.2, 0)
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
