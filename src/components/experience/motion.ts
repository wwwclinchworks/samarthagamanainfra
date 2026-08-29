import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function splitWords(el: Element) {
  const words = el.textContent?.trim().split(/\s+/) ?? []
  el.innerHTML = words
    .map((w) => `<span class="split-word"><span>${w}</span></span>`)
    .join(" ")
  return el.querySelectorAll<HTMLElement>(".split-word > span")
}

function magnetic(el: HTMLElement, strength = 0.35) {
  if (window.matchMedia("(pointer: coarse)").matches) return
  const move = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4,
      ease: "power2.out",
    })
  }
  const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" })
  el.addEventListener("mousemove", move)
  el.addEventListener("mouseleave", leave)
}

function tiltCard(el: HTMLElement, max = 7) {
  if (window.matchMedia("(pointer: coarse)").matches) return
  const move = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, {
      rotateX: -py * max,
      rotateY: px * max,
      transformPerspective: 800,
      duration: 0.5,
      ease: "power2.out",
    })
  }
  const leave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" })
  el.addEventListener("mousemove", move)
  el.addEventListener("mouseleave", leave)
}

export function revealHero() {
  const tl = gsap.timeline({ delay: 0.15 })
  tl.fromTo("#hero .eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
    .fromTo(
      ".hero__title .name-primary",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
      "-=0.4",
    )
    .fromTo(
      ".hero__title .name-secondary",
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      "-=0.55",
    )
    .fromTo(".hero__sub", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
    .fromTo(".hero__scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
}

export function initPageMotion() {
  document.querySelectorAll(".chapter-head h2, .dev-panel__title, .process__title, .cta__headline").forEach((el) => {
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

  const cta = document.getElementById("cta-btn")
  const top = document.getElementById("back-to-top")
  if (cta) magnetic(cta, 0.3)
  if (top) magnetic(top, 0.4)
  document.querySelectorAll<HTMLElement>(".parcel-card").forEach((el) => tiltCard(el, 6))

  document.querySelectorAll<HTMLElement>(".stat__num").forEach((el) => {
    const target = Number(el.dataset.count)
    const suffix = el.dataset.suffix ?? ""
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
            el.textContent = `${Math.floor(obj.val)}${suffix}`
          },
        })
      },
    })
  })

  const path = document.getElementById("stats-path") as unknown as SVGPathElement | null
  if (path) {
    const len = path.getTotalLength()
    path.style.strokeDasharray = `${len}`
    path.style.strokeDashoffset = `${len}`
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
