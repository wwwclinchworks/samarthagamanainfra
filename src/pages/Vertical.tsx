import { lazy, Suspense } from "react"
import { Link, useParams } from "react-router-dom"
import { verticals } from "../data/content"

const AmbientCanvas = lazy(() =>
  import("../components/scene/Scenes").then((m) => ({ default: m.AmbientCanvas })),
)

export function VerticalPage() {
  const { slug } = useParams()
  const item = verticals.find((v) => v.slug === slug)

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl">This offering is not listed</h1>
        <Link to="/" className="mt-4 inline-block text-sage-deep underline">
          Return home
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">{item.kicker}</p>
      <h1 className="font-display mt-2 text-5xl sm:text-6xl">{item.title}</h1>
      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-lg leading-relaxed text-muted">{item.summary}</p>
          <p className="mt-5 text-sm leading-relaxed text-muted">{item.copy}</p>
          <Link
            to="/contact"
            className="mt-8 inline-block rounded-full bg-sage-deep px-6 py-3 text-sm text-cream"
          >
            Speak with the desk
          </Link>
        </div>
        <div className="h-[320px] overflow-hidden rounded-[2rem] border border-white/70 shadow-lg sm:h-[400px]">
          <Suspense fallback={<div className="h-full bg-sand/40" />}>
            <AmbientCanvas />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
