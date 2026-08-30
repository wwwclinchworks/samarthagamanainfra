import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { ThemeProvider } from "./lib/theme"
import { AboutPage } from "./pages/About"
import { CareersPage } from "./pages/Careers"
import { CitiesPage } from "./pages/Cities"
import { ContactPage } from "./pages/Contact"
import { FaqPage } from "./pages/Faq"
import { GalleryPage } from "./pages/Gallery"
import { HomePage } from "./pages/Home"
import { JournalPage } from "./pages/Journal"
import { OngoingPage } from "./pages/Ongoing"
import { PressPage } from "./pages/Press"
import { ProcessPage } from "./pages/Process"
import { ProjectsPage } from "./pages/Projects"
import { TeamPage } from "./pages/Team"
import { UpcomingPage } from "./pages/Upcoming"
import { VerticalPage } from "./pages/Vertical"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
