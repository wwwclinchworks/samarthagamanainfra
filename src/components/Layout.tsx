import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { RouteTrack } from "./RouteTrack"
import { ContactDock } from "./ContactDock"
import { useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

export function Layout() {
  const loc = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [loc.pathname])

  return (
    <>
      <RouteTrack />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactDock />
    </>
  )
}
