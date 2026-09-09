import { Link, NavLink, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { BrandLogo } from "./BrandLogo"
import { ThemeToggle } from "./ThemeToggle"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    let raf = 0
    let last = false

    const read = () => {
      raf = 0
      const next = window.scrollY > 60
      if (next !== last) {
        last = next
        setScrolled(next)
      }
    }

    read()
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [loc.pathname, loc.hash])

  return (
    <nav id="site-nav" className={scrolled ? "scrolled" : ""}>
      <Link to="/" className="nav__brand" aria-label="Samartha Gamana Infra home">
        <BrandLogo className="nav__logo" />
      </Link>
      <div className={open ? "nav__links open" : "nav__links"}>
        <Link className="nav__link" to={{ pathname: "/", hash: "#chapter-peb" }}>
          PEB
        </Link>
        <Link className="nav__link" to={{ pathname: "/", hash: "#chapter-parcels" }}>
          Parcels
        </Link>
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-nav-links"
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
