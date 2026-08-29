import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { RouteProgress } from "./experience/RouteProgress"

export function Layout() {
  return (
    <>
      <RouteProgress />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
