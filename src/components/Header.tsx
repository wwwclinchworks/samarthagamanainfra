import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { BrandLogo } from "./BrandLogo"
import { ThemeToggle } from "./ThemeToggle"

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
      <Link to="/" className="nav__brand" aria-label="Samartha Gamana Infra home">
        <BrandLogo className="nav__logo" />
      </Link>
      <div className={open ? "nav__links open" : "nav__links"}>
        <a className="nav__link" href="/#chapter-peb">
          PEB
        </a>
        <a className="nav__link" href="/#chapter-parcels">
          Parcels
        </a>
        <NavLink className="nav__link" to="/gallery">
          Gallery
        </NavLink>
        <NavLink className="nav__link" to="/projects">
          Developments
        </NavLink>
        <NavLink className="nav__link" to="/about">
          About
        </NavLink>
        <NavLink className="nav__link" to="/nara-sudharshan">
          Founder
        </NavLink>
        <NavLink className="nav__cta" to="/contact">
          Contact
        </NavLink>
      </div>
      <div className="nav__end">
        <ThemeToggle />
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
      </div>
    </nav>
  )
}
