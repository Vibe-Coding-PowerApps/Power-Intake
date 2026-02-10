import { useEffect, useState } from 'react'
// Dynamically import Power Apps context to avoid runtime errors at module load
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/ui/sidebar'
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
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/shadcn.jpg",
  })

  useEffect(() => {
    const loadUserContext = async () => {
      try {
        const mod = await import('@microsoft/power-apps/app')
        const ctx = await (mod.getContext?.() as any)

        // Get user's basic information
        const fullName = ctx?.user?.fullName || "John Doe"
        const userEmail = ctx?.user?.userPrincipalName || "john.doe@example.com"

        setUserData({
          name: fullName,
          email: userEmail,
          avatar: "/avatars/shadcn.jpg",
        })
      } catch (error) {
        console.info("Power Apps context unavailable (running locally):", error)
      }
    }

    loadUserContext()
  }, [])

  const path = typeof window !== 'undefined' ? (window.location.pathname.replace(/\/$/, '') || '/dashboard') : '/dashboard'
  // keep routes mapping, but listen to popstate in useEffect for reactivity
  const routes: Record<string, React.ComponentType<any>> = {
    '/': DashboardPage,
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
  const [currentPath, setCurrentPath] = useState<string>(path)

  useEffect(() => {
    const onPop = () => setCurrentPath((window.location.pathname || '/').replace(/\/$/, '') || '/dashboard')
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const PageComponent = routes[currentPath] ?? DashboardPage

  return (
    <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
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
