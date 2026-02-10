"use client"

import * as React from "react"
import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/ui/sidebar'
import usePath from '@/hooks/use-path'

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const path = usePath()
  const activeFromPath = (url: string) => url.replace(/\/$/, '') || '/'
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = activeFromPath(item.url) === (path || "/")
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
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
                    <item.icon />
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
