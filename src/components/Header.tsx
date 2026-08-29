import { NavLink, Link } from "react-router-dom"
import { useEffect, useState } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav id="site-nav" className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="nav__brand">
        <span className="nav__mark" aria-hidden />
        <span className="nav__word">Samartha Gamana</span>
      </Link>
      <button
        className={`nav__toggle${open ? " open" : ""}`}
        type="button"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`nav__links${open ? " open" : ""}`}>
        <a className="nav__link" href="/#chapter-parcels" onClick={() => setOpen(false)}>
          Parcels
        </a>
        <NavLink className="nav__link" to="/projects" onClick={() => setOpen(false)}>
          Developments
        </NavLink>
        <NavLink className="nav__link" to="/about" onClick={() => setOpen(false)}>
          About
        </NavLink>
        <NavLink className="nav__cta" to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
      </div>
    </nav>
  )
}
