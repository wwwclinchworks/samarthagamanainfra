import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { EnquireDrawer, EnquireForm } from "./Enquire"

export function Layout() {
  const [enquire, setEnquire] = useState(false)

  return (
    <div className="pastel-grid min-h-svh">
      <Header onEnquire={() => setEnquire(true)} />
      <main>
        <Outlet />
      </main>
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="glass rounded-[2rem] p-8 md:p-12">
          <p className="text-xs tracking-[0.28em] text-gold uppercase">
            Quick enquire now
          </p>
          <h2 className="font-display mt-2 text-4xl">Tell us what you are looking for</h2>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Name, email, phone, location and a short note. The desk will be wired
            when you are ready — this form already behaves like the finished lounge.
          </p>
          <div className="mt-8">
            <EnquireForm />
          </div>
        </div>
      </section>
      <Footer />
      <EnquireDrawer open={enquire} onClose={() => setEnquire(false)} />
    </div>
  )
}
