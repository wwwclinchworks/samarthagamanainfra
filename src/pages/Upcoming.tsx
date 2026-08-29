import { upcoming, locations } from "../data/content"

export function UpcomingPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs tracking-[0.28em] text-gold uppercase">Upcoming</p>
      <h1 className="font-display mt-2 max-w-3xl text-5xl">
        With a vision to build a better tomorrow
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Iconic landmarks still on the drawing table. Join the waitlist through
        enquire — launches will be announced as approvals land.
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
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {upcoming.map((p) => (
          <article
            key={p.name}
            className="rounded-[1.5rem] border border-dashed border-gold/60 bg-white/50 p-6"
          >
            <p className="text-[11px] tracking-[0.2em] text-gold uppercase">{p.type}</p>
            <h2 className="font-display mt-1 text-3xl">{p.name}</h2>
            <p className="text-sm text-sage-deep">{p.place}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{p.note}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
