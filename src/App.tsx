import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { DisclaimerScreen, useDisclaimer } from "./components/DisclaimerGate"
import { useEntrance } from "./hooks/useEntrance"
import { Layout } from "./components/Layout"
import { AboutPage } from "./pages/About"
import { ContactPage } from "./pages/Contact"
import { HomePage } from "./pages/Home"
import { OngoingPage } from "./pages/Ongoing"
import { ProjectsPage } from "./pages/Projects"
import { UpcomingPage } from "./pages/Upcoming"
import { VerticalPage } from "./pages/Vertical"

const Entrance = lazy(() =>
  import("./components/Entrance").then((m) => ({ default: m.Entrance })),
)

export default function App() {
  const { agreed, agree } = useDisclaimer()
  const { show, finish, ready } = useEntrance()

  if (agreed === null || !ready) {
    return <div className="min-h-svh bg-cream" />
  }

  if (!agreed) {
    return (
      <>
        <DisclaimerScreen onAgree={agree} />
        <div className="grain" aria-hidden />
      </>
    )
  }

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="grid min-h-svh place-items-center bg-cream font-display text-3xl text-sage-deep">Raising the structure…</div>}>
        {show ? (
          <Entrance onDone={finish} />
        ) : (
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="ongoing" element={<OngoingPage />} />
              <Route path="upcoming" element={<UpcomingPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="what-we-do/:slug" element={<VerticalPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        )}
      </Suspense>
      <div className="grain" aria-hidden />
    </BrowserRouter>
  )
}
