import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { RouteProgress } from "./experience/RouteProgress"
import { ContactDock } from "./ContactDock"
import { PersistBrand } from "./experience/PersistBrand"
import { useEffect } from "react"
import Lenis from "lenis"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

export function Layout() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    lenis.on("scroll", ScrollTrigger.update)
    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <RouteProgress />
      <PersistBrand />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactDock />
    </>
  )
}
