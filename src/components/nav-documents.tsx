"use client"

import { type Icon } from "@tabler/icons-react"
import usePath from '@/hooks/use-path'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon?: Icon
  }[]
}) {
  const path = usePath()
  const activeFromPath = (url: string) => url.replace(/\/$/, '') || '/'
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Power Suite</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = activeFromPath(item.url) === (path || "/")
            return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton tooltip={item.name} asChild isActive={isActive} className={(isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground" : undefined) + " w-full"}>
                {item.url && item.url.startsWith && item.url.startsWith("http") ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </a>
                ) : (
                  <a
                    href={item.url}
                    className="flex w-full items-center gap-2"
                    data-active={isActive}
                    onClick={(e) => {
                      e.preventDefault()
                      if (window.location.pathname !== item.url) {
                        window.history.pushState({}, "", item.url)
                        window.dispatchEvent(new Event('locationchange'))
                      }
                    }}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </a>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            )})}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
