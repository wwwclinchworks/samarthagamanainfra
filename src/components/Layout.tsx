import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ContactDock } from "./ContactDock"
import { Seo } from "./Seo"
import { ScrollToTop } from "./ScrollToTop"

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Seo />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ContactDock />
    </>
  )
}
