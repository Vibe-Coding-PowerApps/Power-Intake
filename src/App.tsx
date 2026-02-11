import { useEffect, useState } from 'react'
import usePath from '@/hooks/use-path'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarInset, SidebarProvider } from '@/ui/sidebar'
import HomePage from './app/home/page'
import DashboardPage from './app/dashboard/page'
import UseCasesPage from './app/use-cases/page'
import TeamPage from './app/team/page'
import PowerGuidePage from './app/power-guide/page'
import PowerProjectPage from './app/power-project/page'
import PowerServePage from './app/power-serve/page'
import FaqsPage from './app/faqs/page'
import ResourcesPage from './app/resources/page'
import GetHelpPage from './app/get-help/page'

function App() {
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
    '/': HomePage,
    '/dashboard': DashboardPage,
    '/home': HomePage,
    '/use-cases': UseCasesPage,
    '/team': TeamPage,
    '/power-guide': PowerGuidePage,
    '/power-project': PowerProjectPage,
    '/power-serve': PowerServePage,
    '/faqs': FaqsPage,
    '/resources': ResourcesPage,
    '/get-help': GetHelpPage,
  }
  const currentPath = usePath()
  const PageComponent = routes[currentPath] ?? DashboardPage

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': 'calc(var(--spacing) * 72)',
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" userData={userData} />
      <SidebarInset>
        <SiteHeader />
        <PageComponent />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default App
