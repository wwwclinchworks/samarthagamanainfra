import { lazy, Suspense } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { ThemeProvider } from "./lib/theme"
import { HomePage } from "./pages/Home"

const FounderPage = lazy(() => import("./pages/Founder").then((m) => ({ default: m.FounderPage })))
const AboutPage = lazy(() => import("./pages/About").then((m) => ({ default: m.AboutPage })))
const GalleryPage = lazy(() => import("./pages/Gallery").then((m) => ({ default: m.GalleryPage })))
const ProjectsPage = lazy(() => import("./pages/Projects").then((m) => ({ default: m.ProjectsPage })))
const OngoingPage = lazy(() => import("./pages/Ongoing").then((m) => ({ default: m.OngoingPage })))
const UpcomingPage = lazy(() => import("./pages/Upcoming").then((m) => ({ default: m.UpcomingPage })))
const ProcessPage = lazy(() => import("./pages/Process").then((m) => ({ default: m.ProcessPage })))
const TeamPage = lazy(() => import("./pages/Team").then((m) => ({ default: m.TeamPage })))
const CitiesPage = lazy(() => import("./pages/Cities").then((m) => ({ default: m.CitiesPage })))
const CareersPage = lazy(() => import("./pages/Careers").then((m) => ({ default: m.CareersPage })))
const PressPage = lazy(() => import("./pages/Press").then((m) => ({ default: m.PressPage })))
const FaqPage = lazy(() => import("./pages/Faq").then((m) => ({ default: m.FaqPage })))
const JournalPage = lazy(() => import("./pages/Journal").then((m) => ({ default: m.JournalPage })))
const ContactPage = lazy(() => import("./pages/Contact").then((m) => ({ default: m.ContactPage })))
const VerticalPage = lazy(() => import("./pages/Vertical").then((m) => ({ default: m.VerticalPage })))

function RouteFallback() {
  return (
    <div
      aria-live="polite"
      style={{
        minHeight: "50vh",
        display: "grid",
        placeItems: "center",
        background: "var(--basalt)",
        color: "var(--ink-dim)",
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: "0.72rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
      }}
    >
      Loading page
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="nara-sudharshan" element={<FounderPage />} />
              <Route path="founder" element={<FounderPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="ongoing" element={<OngoingPage />} />
              <Route path="upcoming" element={<UpcomingPage />} />
              <Route path="process" element={<ProcessPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="cities" element={<CitiesPage />} />
              <Route path="careers" element={<CareersPage />} />
              <Route path="press" element={<PressPage />} />
              <Route path="faq" element={<FaqPage />} />
              <Route path="journal" element={<JournalPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="what-we-do/:slug" element={<VerticalPage />} />
              <Route path="why-anantapur" element={<Navigate to="/cities" replace />} />
              <Route path="legal" element={<Navigate to="/about" replace />} />
              <Route path="disclaimer" element={<Navigate to="/about" replace />} />
              <Route path="privacy" element={<Navigate to="/contact" replace />} />
              <Route path="terms" element={<Navigate to="/contact" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}
