"use client"

import { Separator } from '@/ui/separator'
import { SidebarTrigger } from '@/ui/sidebar'
import { ThemeToggle } from '@/components/theme-toggle'
import usePath from '@/hooks/use-path'

import { ThemeSelector } from '@/components/theme-selector'
import '../styles/header.css'

export function SiteHeader() {
  const path = usePath()

  // Hide the global header on the root landing page so the landing page
  // can render its own full-bleed transparent header/layout.
  if (path === '/') return null

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[var(--header-height)]">
      <div className="flex w-full items-center gap-1 px-4 py-2 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <button
          className="text-base font-medium text-foreground px-0 bg-transparent border-none cursor-pointer hover:underline"
          onClick={e => {
            e.preventDefault();
            if (window.location.pathname !== "/") {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new Event('locationchange'));
            }
          }}
        >
          Power Intake
        </button>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSelector className="mr-2" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
