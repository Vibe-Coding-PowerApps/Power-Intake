"use client"

import * as React from "react"
import { IconMail } from "@tabler/icons-react"
import usePath from '@/hooks/use-path'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ComponentType<any>
  }[]
}) {
  const path = usePath()
  const activeFromPath = (url: string) => url.replace(/\/$/, '') || '/'
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        
        <SidebarMenu>
          {items.map((item) => {
            const isActive = activeFromPath(item.url) === (path || "/")
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={isActive}
                  className={(isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground" : undefined) + " w-full"}
                >
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
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
