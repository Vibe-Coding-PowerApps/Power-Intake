"use client"

import * as React from "react"
import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react"

import { Button } from '@/ui/button'
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
          <SidebarMenuItem className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground h-9 w-[220px] justify-start gap-2 px-3 text-sm font-medium duration-200 ease-linear group-data-[collapsible=icon]:!w-8 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:px-0"
            >
              <IconCirclePlusFilled className="size-4" />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 shrink-0 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
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
