import { NavLink, Link } from "react-router-dom";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav id="site-nav" className="nav-3d">
      <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
        <span className="nav__mark" aria-hidden />
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
        <NavLink className="nav__link" to="/" end onClick={() => setOpen(false)}>
          Street
        </NavLink>
        <NavLink className="nav__link" to="/projects" onClick={() => setOpen(false)}>
          Projects
        </NavLink>
        <NavLink className="nav__link" to="/ongoing" onClick={() => setOpen(false)}>
          Ongoing
        </NavLink>
        <NavLink className="nav__link" to="/upcoming" onClick={() => setOpen(false)}>
          Upcoming
        </NavLink>
        <NavLink className="nav__link" to="/about" onClick={() => setOpen(false)}>
          About
        </NavLink>
        <NavLink className="nav__cta" to="/contact" onClick={() => setOpen(false)}>
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
