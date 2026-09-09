import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let homeMotionReady = false
const cleanups: Array<() => void> = []
const homeTriggers: ScrollTrigger[] = []
const homeTweens: gsap.core.Animation[] = []

function revealOnScroll(selector: string) {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
  if (!nodes.length) return

  nodes.forEach((el) => {
    el.classList.add("reveal")
    el.classList.remove("is-in")
  })

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("is-in")
        io.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )

  for (const el of nodes) {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add("is-in")
    else io.observe(el)
  }

  cleanups.push(() => io.disconnect())
}

export function initHomeMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (homeMotionReady) return
  homeMotionReady = true

  if (reduce) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"))
    return
  }

  revealOnScroll(".chapter-head")
  revealOnScroll(".parcel-card")
  revealOnScroll(".work-item")
  revealOnScroll(".process__step")
  revealOnScroll(".origin__title")
  revealOnScroll(".cta__headline")
  revealOnScroll(".statement-band")
  revealOnScroll(".peb-spotlight__copy")

  document.querySelectorAll<HTMLElement>(".stat__num").forEach((el) => {
    const target = Number(el.dataset.count || 0)
    const suffix = el.dataset.suffix || ""
    const obj = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const tween = gsap.to(obj, {
          val: target,
          duration: 1.35,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.floor(obj.val)}${suffix}`
          },
        })
        homeTweens.push(tween)
      },
    })
    homeTriggers.push(trigger)
  })

  const path = document.getElementById("stats-path") as SVGPathElement | null
  if (path) {
    const len = path.getTotalLength()
    path.style.strokeDasharray = String(len)
    path.style.strokeDashoffset = String(len)
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.35,
      ease: "power2.out",
      scrollTrigger: { trigger: path, start: "top 90%", once: true },
    })
    homeTweens.push(tween)
  }

  document.querySelectorAll<HTMLElement>("[data-rotate-lines]").forEach((root) => {
    const lines = Array.from(root.querySelectorAll<HTMLElement>(".rotate-line"))
    if (lines.length < 2) return
    let i = 0
    lines.forEach((line, idx) => line.classList.toggle("is-active", idx === 0))
    const timer = window.setInterval(() => {
      lines[i].classList.remove("is-active")
      i = (i + 1) % lines.length
      lines[i].classList.add("is-active")
    }, 2800)
    cleanups.push(() => window.clearInterval(timer))
  })

  ScrollTrigger.refresh()
}

export function resetHomeMotion() {
  homeMotionReady = false
  while (cleanups.length) cleanups.pop()?.()
  while (homeTriggers.length) homeTriggers.pop()?.kill()
  while (homeTweens.length) homeTweens.pop()?.kill()
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.remove("reveal", "is-in")
    ;(el as HTMLElement).style.opacity = ""
    ;(el as HTMLElement).style.transform = ""
  })
}

export function revealHero() {
  const tl = gsap.timeline({ delay: 0.15 })
  tl.fromTo("#hero .eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
    .fromTo(
      ".hero__title .line-equal",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", stagger: 0.08 },
      "-=0.4",
    )
    .fromTo(".hero__sub", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
    .fromTo(".hero__scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
  return () => tl.kill()
}

export function magnetic(el: HTMLElement | null, strength = 0.35) {
  if (!el || window.matchMedia("(pointer: coarse)").matches) return () => {}

  const quickX = gsap.quickTo(el, "x", { duration: 0.38, ease: "power2.out" })
  const quickY = gsap.quickTo(el, "y", { duration: 0.38, ease: "power2.out" })

  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    quickX((e.clientX - r.left - r.width / 2) * strength)
    quickY((e.clientY - r.top - r.height / 2) * strength)
  }
  const onLeave = () => {
    quickX(0)
    quickY(0)
  }

  el.addEventListener("mousemove", onMove)
  el.addEventListener("mouseleave", onLeave)

  return () => {
    el.removeEventListener("mousemove", onMove)
    el.removeEventListener("mouseleave", onLeave)
    gsap.killTweensOf(el)
    gsap.set(el, { x: 0, y: 0 })
  }
}

export function tiltCard(el: HTMLElement, max = 7) {
  if (window.matchMedia("(pointer: coarse)").matches) return () => {}

  const quickRX = gsap.quickTo(el, "rotateX", { duration: 0.32, ease: "power2.out" })
  const quickRY = gsap.quickTo(el, "rotateY", { duration: 0.32, ease: "power2.out" })

  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    quickRX(-((e.clientY - r.top) / r.height - 0.5) * max)
    quickRY(((e.clientX - r.left) / r.width - 0.5) * max)
    gsap.set(el, { transformPerspective: 800 })
  }
  const onLeave = () => {
    quickRX(0)
    quickRY(0)
  }

  el.addEventListener("mousemove", onMove)
  el.addEventListener("mouseleave", onLeave)

  return () => {
    el.removeEventListener("mousemove", onMove)
    el.removeEventListener("mouseleave", onLeave)
    gsap.killTweensOf(el)
    gsap.set(el, { rotateX: 0, rotateY: 0 })
  }
}
