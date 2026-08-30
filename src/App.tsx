import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Layout } from "./components/Layout"
import { ThemeProvider } from "./lib/theme"
import { AboutPage } from "./pages/About"
import { CareersPage } from "./pages/Careers"
import { ContactPage } from "./pages/Contact"
import { DisclaimerPage } from "./pages/Disclaimer"
import { FaqPage } from "./pages/Faq"
import { FounderPage } from "./pages/Founder"
import { GalleryPage } from "./pages/Gallery"
import { HomePage } from "./pages/Home"
import { JournalPage } from "./pages/Journal"
import { LegalPage } from "./pages/Legal"
import { PressPage } from "./pages/Press"
import { PrivacyPage } from "./pages/Privacy"
import { ProcessPage } from "./pages/Process"
import { ProjectsPage } from "./pages/Projects"
import { TeamPage } from "./pages/Team"
import { TermsPage } from "./pages/Terms"
import { VerticalPage } from "./pages/Vertical"
import { WhyAnantapurPage } from "./pages/WhyAnantapur"

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="nara-sudharshan" element={<FounderPage />} />
            <Route path="founder" element={<FounderPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="ongoing" element={<Navigate to="/projects" replace />} />
            <Route path="upcoming" element={<Navigate to="/projects" replace />} />
            <Route path="process" element={<ProcessPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="cities" element={<Navigate to="/why-anantapur" replace />} />
            <Route path="why-anantapur" element={<WhyAnantapurPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="press" element={<PressPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="journal" element={<JournalPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="legal" element={<LegalPage />} />
            <Route path="disclaimer" element={<DisclaimerPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="what-we-do/:slug" element={<VerticalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
