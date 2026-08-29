import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function splitWords(el: HTMLElement) {
  const words = el.textContent?.trim().split(/\s+/) ?? []
  el.innerHTML = words
    .map((w) => '<span class="split-word"><span>' + w + "</span></span>")
    .join(" ")
  return el.querySelectorAll<HTMLElement>(".split-word > span")
}

export function initHomeMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduce) return

  document.querySelectorAll<HTMLElement>(".chapter-head h2, .dev-panel__title, .process__title, .cta__headline").forEach((el) => {
    const spans = splitWords(el)
    gsap.fromTo(
      spans,
      { yPercent: 115, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.045,
        scrollTrigger: { trigger: el, start: "top 88%" },
      },
    )
  })

  const originTitle = document.querySelector(".origin__title")
  if (originTitle) {
    gsap.fromTo(
      originTitle,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: originTitle, start: "top 88%" },
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
      scrollTrigger: { trigger: path, start: "top 90%" },
    })
  }

  gsap.utils.toArray<HTMLElement>(".parcel-card").forEach((card, i) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: (i % 3) * 0.06,
        scrollTrigger: { trigger: card, start: "top 92%" },
      },
    )
  })

  gsap.utils.toArray<HTMLElement>(".dev-panel__media").forEach((media, i) => {
    const fromClip = i % 2 === 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)"
    gsap.fromTo(
      media,
      { clipPath: fromClip },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: media, start: "top 80%" },
      },
    )
  })

  gsap.utils.toArray<HTMLElement>(".process__step").forEach((step, i) => {
    gsap.fromTo(
      step,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: { trigger: step, start: "top 92%" },
      },
    )
  })
}

export function revealHero() {
  const tl = gsap.timeline({ delay: 0.15 })
  tl.fromTo("#hero .eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
    .fromTo(".hero__title .line-small", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
    .fromTo(".hero__title .line-big", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power4.out" }, "-=0.35")
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
