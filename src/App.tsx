import { useEffect, useState } from 'react'
import { getContext } from '@microsoft/power-apps/app'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import {
  SidebarInset,
  SidebarProvider,
} from '@/ui/sidebar'
import Page from './app/dashboard/page'

function App() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/shadcn.jpg",
  })

  useEffect(() => {
    const loadUserContext = async () => {
      try {
        const ctx = await getContext()
        
        // Get user's basic information
        const fullName = ctx.user.fullName || "John Doe"
        const userEmail = ctx.user.userPrincipalName || "john.doe@example.com"
        
        setUserData({
          name: fullName,
          email: userEmail,
          avatar: "/avatars/shadcn.jpg",
        })
      } catch (error) {
        console.error("Error loading user context:", error)
      }
    }

    loadUserContext()
  }, [])

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
          <Page />
        </SidebarInset>
      </SidebarProvider>
    )
  }

export default App
