"use client"

import * as React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select"


const THEMES = [
  { label: "Default", value: "default" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Amber", value: "amber" },
  { label: "Rose", value: "rose" },
  { label: "Orange", value: "orange" },
  { label: "Violet", value: "violet" },
]

export function ThemeSelector({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<string>("default")
  React.useEffect(() => {
    const stored = localStorage.getItem("theme")
    if (stored) setTheme(stored)
  }, [])
  React.useEffect(() => {
    localStorage.setItem("theme", theme)
    // Example: add/remove theme class to <body> or <html>
    document.documentElement.classList.remove(
      ...THEMES.map((t) => t.value)
    )
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className={className || "w-56"}>
        <span className="text-muted-foreground mr-2">Select a theme:</span>
        <SelectValue placeholder="Default" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {THEMES.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
