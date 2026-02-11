"use client"

import * as React from "react"
import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconListDetails,
  IconTools,
  IconUsers,
  IconLink,
  IconTemplate,
  IconBook,
  IconAlertCircle,
  IconHelp,
} from "@tabler/icons-react"
import { LayoutDashboard } from "lucide-react"

import { NavMedia } from '@/components/nav-media'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

const data = {
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IconTemplate,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
      {
        title: "Services",
        url: "/services",
        icon: IconTools,
      },
    {
      title: "Use Cases",
      url: "/use-cases",
      icon: IconListDetails,
    },
    {
      title: "Team",
      url: "/team",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconBook,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "FAQs",
      url: "/faqs",
      icon: IconFileDescription,
    },
    {
      title: "Resources",
      url: "/resources",
      icon: IconFileAi,
    },
    {
      title: "Get Help",
      url: "/get-help",
      icon: IconHelp,
    },
  ],
  documents: [
    { name: "Power Guide", url: "https://example.com/power-guide", icon: IconLink },
    { name: "Power Project", url: "https://example.com/power-project", icon: IconLink },
    { name: "Power Serve", url: "https://example.com/power-serve", icon: IconLink },
  ],
}

export function AppSidebar({ userData, ...props }: React.ComponentProps<typeof Sidebar> & {
  userData?: {
    name: string
    email: string
    avatar: string
  }
}) {
  const user = userData || data.user
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconTemplate className="!size-5" />
                <span className="text-base font-semibold">Template</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavMedia items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
