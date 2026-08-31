import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let homeMotionReady = false
const cleanups: Array<() => void> = []

/** Reveal with CSS class — content stays visible even if animation is interrupted. */
function revealOnScroll(selector: string) {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector))
  if (!nodes.length) return

  nodes.forEach((el) => {
    el.classList.add("reveal")
    el.classList.remove("is-in")
  })

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add("is-in")
        io.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  )

  nodes.forEach((el) => {
    // If already on screen (e.g. after scroll reset), show immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) el.classList.add("is-in")
    else io.observe(el)
  })

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
    const target = parseFloat(el.dataset.count || "0")
    const suffix = el.dataset.suffix || ""
    const obj = { val: 0 }
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix
          },
        })
      },
    })
    cleanups.push(() => trigger.kill())
  })

  const path = document.getElementById("stats-path") as unknown as SVGPathElement | null
  if (path) {
    const len = path.getTotalLength()
    path.style.strokeDasharray = String(len)
    path.style.strokeDashoffset = String(len)
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: path, start: "top 90%", once: true },
    })
    cleanups.push(() => tween.kill())
  }

  // Rotating statement lines
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
}

export function magnetic(el: HTMLElement | null, strength = 0.35) {
  if (!el || window.matchMedia("(pointer: coarse)").matches) return
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect()
    const relX = e.clientX - r.left - r.width / 2
    const relY = e.clientY - r.top - r.height / 2
    gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.4, ease: "power2.out" })
  })
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" })
  })
}

export function tiltCard(el: HTMLElement, max = 7) {
  if (window.matchMedia("(pointer: coarse)").matches) return
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, { rotateX: -py * max, rotateY: px * max, transformPerspective: 800, duration: 0.5, ease: "power2.out" })
  })
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" })
  })
}
