import { Outlet, useLocation } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ContactDock } from "./ContactDock"
import { Seo } from "./Seo"
import { ScrollToTop } from "./ScrollToTop"

export function Layout() {
  const { pathname } = useLocation()

  return (
    <>
      <ScrollToTop />
      <Seo />
      <Header />
      <main>
        <Outlet key={pathname} />
      </main>
      <Footer />
      <ContactDock />
    </>
  )
}
