import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { RouteTrack } from "./RouteTrack"
import { ContactDock } from "./ContactDock"
import { Seo } from "./Seo"
import { ScrollToTop } from "./ScrollToTop"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Seo />
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
