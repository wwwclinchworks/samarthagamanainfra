import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav id="site-nav" className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="nav__brand">
        <svg className="nav__mark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M2 8V2h6M22 8V2h-6M2 16v6h6M22 16v6h-6" />
          <path d="M12 9v6M9 12h6" />
        </svg>
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
      <div className={`nav__links${open ? " open" : ""}`} id="nav-links">
        <a className="nav__link" href="/#chapter-parcels" onClick={() => setOpen(false)}>
          Parcels
        </a>
        <NavLink className="nav__link" to="/projects" onClick={() => setOpen(false)}>
          Developments
        </NavLink>
        <NavLink className="nav__link" to="/about" onClick={() => setOpen(false)}>
          Process
        </NavLink>
        <NavLink className="nav__cta" to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
      </div>
    </nav>
  )
}
