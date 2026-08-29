import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [loc.pathname])

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
        className={open ? "nav__toggle open" : "nav__toggle"}
        type="button"
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={open ? "nav__links open" : "nav__links"}>
        <a className="nav__link" href="/#chapter-parcels">
          Parcels
        </a>
        <a className="nav__link" href="/#chapter-process">
          Process
        </a>
        <NavLink className="nav__link" to="/projects">
          Developments
        </NavLink>
        <NavLink className="nav__link" to="/about">
          About
        </NavLink>
        <NavLink className="nav__cta" to="/contact">
          Contact
        </NavLink>
      </div>
    </nav>
  )
}
