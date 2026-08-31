import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let homeMotionReady = false

function fadeUp(
  elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>,
  opts?: { stagger?: number; start?: string },
) {
  const list = Array.isArray(elements) ? elements : Array.from(elements as ArrayLike<HTMLElement>)
  if (!list.length) return

  list.forEach((el) => gsap.set(el, { clearProps: "opacity,transform" }))

  gsap.fromTo(
    list,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: opts?.stagger ?? 0.08,
      scrollTrigger: {
        trigger: list[0],
        start: opts?.start ?? "top 88%",
        once: true,
      },
    },
  )
}

export function initHomeMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduce || homeMotionReady) return
  homeMotionReady = true

  fadeUp(document.querySelectorAll<HTMLElement>(".chapter-head h2"))
  fadeUp(document.querySelectorAll<HTMLElement>(".work-item"), { stagger: 0.1, start: "top 90%" })
  fadeUp(document.querySelectorAll<HTMLElement>(".process__title"))
  fadeUp(document.querySelectorAll<HTMLElement>(".cta__headline"))

  const originTitle = document.querySelector<HTMLElement>(".origin__title")
  if (originTitle) {
    gsap.set(originTitle, { clearProps: "opacity,transform" })
    gsap.fromTo(
      originTitle,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: originTitle, start: "top 88%", once: true },
      },
    )
  }

  document.querySelectorAll<HTMLElement>(".stat__num").forEach((el) => {
    const target = parseFloat(el.dataset.count || "0")
    const suffix = el.dataset.suffix || ""
    const obj = { val: 0 }
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + suffix
          },
        })
      },
    })
  })

  const path = document.getElementById("stats-path") as unknown as SVGPathElement | null
  if (path) {
    const len = path.getTotalLength()
    path.style.strokeDasharray = String(len)
    path.style.strokeDashoffset = String(len)
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: path, start: "top 90%", once: true },
    })
  }

  gsap.utils.toArray<HTMLElement>(".parcel-card").forEach((card, i) => {
    gsap.set(card, { clearProps: "opacity,transform" })
    gsap.fromTo(
      card,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        delay: (i % 3) * 0.05,
        scrollTrigger: { trigger: card, start: "top 94%", once: true },
      },
    )
  })

  gsap.utils.toArray<HTMLElement>(".process__step").forEach((step, i) => {
    gsap.set(step, { clearProps: "opacity,transform" })
    gsap.fromTo(
      step,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: step, start: "top 92%", once: true },
      },
    )
  })

  ScrollTrigger.refresh()
}

export function resetHomeMotion() {
  homeMotionReady = false
}

export function revealHero() {
  const tl = gsap.timeline({ delay: 0.15 })
  tl.fromTo("#hero .eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
    .fromTo(".hero__title .line-equal", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: "power4.out", stagger: 0.08 }, "-=0.4")
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
