"use client"


import * as React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/ui/select"
import { useThemeConfig } from "./active-theme"


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
  const { activeTheme, setActiveTheme } = useThemeConfig()
  return (
    <div data-theme={activeTheme}>
      <Select value={activeTheme} onValueChange={setActiveTheme}>
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
    </div>
  )
}
