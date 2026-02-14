import { useEffect, useState } from 'react'
import usePath from '@/hooks/use-path'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import HomePage from './app/home/page'
import LandingPage from './app/landing-page/page'
import DashboardPage from './app/dashboard/page'
import UseCasesPage from './app/use-cases/page'
import ServicesPage from './app/services/page'
import TeamPage from './app/team/page'
import PowerGuidePage from './app/power-guide/page'
import PowerInsightsPage from './app/power-insights/page'
import PowerServePage from './app/power-serve/page'
import FaqsPage from './app/faqs/page'
import ResourcesPage from './app/resources/page'
import GetHelpPage from './app/get-help/page'

function App() {
  console.log('[App.tsx] App component rendering');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/avatars/shadcn.jpg',
  })

  useEffect(() => {
    // Avoid loading Power Apps runtime during local development to prevent
    // external network calls (the runtime attempts to contact environment APIs).
    if (typeof window !== 'undefined') {
      const host = window.location.hostname
      if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
        console.info('Skipping Power Apps context load in local development')
      } else {
        // In non-local environments, you can load additional context here.
      }
    }
  }, [])

  const routes: Record<string, React.ComponentType<any>> = {
    '/': LandingPage,
    '/dashboard': DashboardPage,
    '/services': ServicesPage,
    '/home': HomePage,
    '/use-cases': UseCasesPage,
    '/team': TeamPage,
    '/power-guide': PowerGuidePage,
    '/power-insights': PowerInsightsPage,
    '/power-serve': PowerServePage,
    '/faqs': FaqsPage,
    '/resources': ResourcesPage,
    '/get-help': GetHelpPage,
  }
  const currentPath = usePath()
  // debug: show current path in the browser console
  if (typeof window !== 'undefined') console.debug('[App] currentPath=', currentPath)
  const PageComponent = routes[currentPath] ?? DashboardPage

  // Render a full-bleed public landing page at root without the admin shell
  if (currentPath === '/') {
    return <LandingPage />
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" userData={userData} />
      <SidebarInset>
        <SiteHeader />
        <PageComponent />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
