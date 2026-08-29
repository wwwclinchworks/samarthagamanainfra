import { ongoing, locations } from "../data/content"

export function OngoingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Ongoing</p>
      <h1 className="font-display mt-2 text-5xl">Here is what we have in progress</h1>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Sites where the crane is still turning. Specs, galleries and rera numbers
        will be attached project by project.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {locations.map((city) => (
          <span
            key={city}
            className="rounded-full border border-sand bg-white/70 px-3 py-1.5 text-xs text-sage-deep"
          >
            {city}
          </span>
        ))}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {ongoing.map((p, i) => (
          <article
            key={p.name}
            className="grid overflow-hidden rounded-[1.5rem] bg-white/70 ring-1 ring-sand sm:grid-cols-[140px_1fr]"
          >
            <div
              className="min-h-28"
              style={{
                background: `linear-gradient(160deg, hsl(${90 + i * 20} 30% 78%), #f6f1ea)`,
              }}
            />
            <div className="p-5">
              <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{p.type}</p>
              <h2 className="font-display text-2xl">{p.name}</h2>
              <p className="text-sm text-sage-deep">{p.place}</p>
              <p className="mt-2 text-sm text-muted">{p.note}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
