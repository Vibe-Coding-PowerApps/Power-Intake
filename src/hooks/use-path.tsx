"use client"

import { useEffect, useState } from "react"

export function normalizePath(p: string) {
  if (!p) return "/"
  return p.replace(/\/$/, "") || "/"
}

export default function usePath() {
  const getPath = () => normalizePath(typeof window !== "undefined" ? window.location.pathname : "/")
  const [path, setPath] = useState<string>(getPath())

  useEffect(() => {
    const onChange = () => setPath(getPath())

    // Listen to native popstate
    window.addEventListener("popstate", onChange)
    // Listen to custom locationchange dispatched after pushState/replaceState
    window.addEventListener("locationchange", onChange as EventListener)

    // Monkey-patch history methods to emit locationchange when called
    const origPush = history.pushState
    const origReplace = history.replaceState

    history.pushState = function (...args: any[]) {
      // @ts-ignore
      const result = origPush.apply(this, args)
      window.dispatchEvent(new Event('locationchange'))
      return result
    }

    history.replaceState = function (...args: any[]) {
      // @ts-ignore
      const result = origReplace.apply(this, args)
      window.dispatchEvent(new Event('locationchange'))
      return result
    }

    return () => {
      window.removeEventListener("popstate", onChange)
      window.removeEventListener("locationchange", onChange as EventListener)
      history.pushState = origPush
      history.replaceState = origReplace
    }
  }, [])

  return path
}
