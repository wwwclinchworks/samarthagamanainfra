import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { DisclaimerScreen, useDisclaimer } from "./components/DisclaimerGate"
import { Layout } from "./components/Layout"
import { AboutPage } from "./pages/About"
import { ContactPage } from "./pages/Contact"
import { HomePage } from "./pages/Home"
import { OngoingPage } from "./pages/Ongoing"
import { ProjectsPage } from "./pages/Projects"
import { UpcomingPage } from "./pages/Upcoming"
import { VerticalPage } from "./pages/Vertical"

export default function App() {
  const { agreed, agree } = useDisclaimer()

  if (agreed === null) {
    return <div style={{ minHeight: "100svh", background: "#0B0E13" }} />
  }

  if (!agreed) {
    return <DisclaimerScreen onAgree={agree} />
  }

  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}
