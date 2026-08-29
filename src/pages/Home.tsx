import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  about,
  brand,
  locations,
  stats,
  testimonials,
  verticals,
} from "../data/content"

const AmbientCanvas = lazy(() =>
  import("../components/scene/Scenes").then((m) => ({ default: m.AmbientCanvas })),
)

function useCount(target: number, run: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    const start = performance.now()
    let id = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1400)
      setN(Math.round(target * t))
      if (t < 1) id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [run, target])
  return n
}

function Stat({
  value,
  suffix,
  label,
  run,
}: {
  value: number
  suffix: string
  label: string
  run: boolean
}) {
  const n = useCount(value, run)
  return (
    <div className="text-center">
      <p className="font-display text-5xl text-sage-deep">
        {n}
        <span className="text-3xl text-gold">{suffix}</span>
      </p>
      <p className="mt-1 text-sm tracking-wide text-muted">{label}</p>
    </div>
  )
}

export function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-xs tracking-[0.32em] text-gold uppercase">
              {brand.since}
            </p>
            <h1 className="font-display mt-3 text-5xl leading-[1.05] text-ink sm:text-7xl">
              Real estate, built as a quiet classic.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
              {about.intro} We create plans to achieve your ambitions, then execute
              with cost discipline and quality that satisfies.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="rounded-full bg-sage-deep px-6 py-3 text-sm text-cream hover:bg-ink"
              >
                Our projects
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-sand bg-white/70 px-6 py-3 text-sm text-ink hover:border-gold"
              >
                The house
              </Link>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[340px] overflow-hidden rounded-[2rem] border border-white/70 shadow-xl sm:h-[420px]"
          >
            <Suspense fallback={<div className="h-full bg-sand/50" />}>
              <AmbientCanvas />
            </Suspense>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">What we do</p>
        <h2 className="font-display mt-2 max-w-2xl text-4xl sm:text-5xl">
          Plans, then execution — plots to farmlands.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <Link
              key={v.slug}
              to={`/what-we-do/${v.slug}`}
              className={`group relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br ${v.tone} p-6 shadow-sm ring-1 ring-white/60 transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <p className="text-[11px] tracking-[0.22em] text-sage-deep uppercase">
                0{i + 1} · {v.kicker}
              </p>
              <h3 className="font-display mt-3 text-3xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{v.summary}</p>
              <span className="mt-5 inline-block text-sm text-sage-deep group-hover:underline">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 rounded-[2rem] bg-white/50 p-8 ring-1 ring-sand md:grid-cols-2 md:p-12">
          <div>
            <p className="text-xs tracking-[0.28em] text-gold uppercase">
              About {brand.short}
            </p>
            <h2 className="font-display mt-2 text-4xl">A house named for the journey</h2>
            <blockquote className="font-display mt-6 text-2xl leading-snug text-sage-deep italic">
              “{about.quote}”
            </blockquote>
            <p className="mt-4 text-sm leading-relaxed text-muted">{about.body}</p>
            <Link
              to="/about"
              className="mt-6 inline-block text-sm text-sage-deep underline-offset-4 hover:underline"
            >
              Read the full story
            </Link>
          </div>
          <div
            ref={statsRef}
            className="grid content-center gap-8 rounded-[1.5rem] bg-gradient-to-br from-sky/70 to-blush/50 p-8"
          >
            {stats.map((s) => (
              <Stat
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
                run={inView}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">
          Our clients believe in us
        </p>
        <h2 className="font-display mt-2 text-4xl">Here is what a few of them say</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="rounded-[1.5rem] bg-white/70 p-6 shadow-sm ring-1 ring-sand"
            >
              <p className="text-sm leading-relaxed text-muted">“{t.quote}”</p>
              <p className="mt-5 font-medium text-ink">{t.name}</p>
              <p className="text-xs tracking-wide text-gold">{t.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <p className="text-xs tracking-[0.28em] text-gold uppercase">
          Choose your preferred location
        </p>
        <h2 className="font-display mt-2 text-4xl">Cities we are mapping</h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          We create plans to achieve your ambitions and then efficiently execute —
          managing costs and delivering quality work that satisfies you.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {locations.map((city) => (
            <span
              key={city}
              className="rounded-full border border-sand bg-white/70 px-4 py-2 text-sm tracking-wide text-sage-deep"
            >
              {city}
            </span>
          ))}
        </div>
      </section>
    </>
  )
}
