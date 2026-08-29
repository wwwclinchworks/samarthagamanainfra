import { Link } from "react-router-dom"
import { completed, locations } from "../data/content"

export function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Our projects</p>
      <h1 className="font-display mt-2 max-w-3xl text-5xl">
        Crafted for today, with an eye for a prosperous tomorrow
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Every project is a placeholder of the portfolio to come — names you can
        replace, structure you can keep.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {locations.map((city) => (
          <span
            key={city}
            className="rounded-full border border-sand bg-white/70 px-3 py-1.5 text-xs tracking-wide text-sage-deep"
          >
            {city}
          </span>
        ))}
      </div>

      <h2 className="font-display mt-14 text-3xl">Latest ventures</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {completed.map((p, i) => (
          <article
            key={p.name}
            className="overflow-hidden rounded-[1.5rem] bg-white/70 ring-1 ring-sand"
          >
            <div
              className="h-36 bg-gradient-to-br"
              style={{
                backgroundImage: `linear-gradient(135deg, hsl(${28 + i * 18} 40% 82%), hsl(${160 + i * 12} 28% 86%))`,
              }}
            />
            <div className="p-5">
              <p className="text-[11px] tracking-[0.2em] text-gold uppercase">
                {p.type} · {p.status}
              </p>
              <h3 className="font-display mt-1 text-2xl">{p.name}</h3>
              <p className="text-sm text-muted">{p.place}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Link to="/ongoing" className="text-sm text-sage-deep underline">
          Ongoing
        </Link>
        <Link to="/upcoming" className="text-sm text-sage-deep underline">
          Upcoming
        </Link>
      </div>
    </div>
  )
}
