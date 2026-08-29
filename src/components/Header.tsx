import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { brand, nav } from "../data/content"

export function Header({ onEnquire }: { onEnquire: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-sand/70 bg-cream/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold/50 bg-white/70 font-display text-lg text-sage-deep">
            {brand.short}
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-ink sm:text-xl">
              Samartha Gamana
            </span>
            <span className="block text-[10px] tracking-[0.28em] text-muted uppercase">
              Infra
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-sage-deep" : "text-muted hover:text-ink"}`
              }
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={onEnquire}
            className="rounded-full bg-sage-deep px-4 py-2 text-sm text-cream hover:bg-ink"
          >
            Enquire
          </button>
        </nav>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-sand lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-sand lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-ink hover:bg-white/60"
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onEnquire()
                }}
                className="mt-2 rounded-full bg-sage-deep px-4 py-2 text-cream"
              >
                Enquire now
              </button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
