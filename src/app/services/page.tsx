import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/ui/card"
import { Button } from "@/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select"

export const SERVICES = [
  {
    id: "acquisition",
    title: "Acquisition",
    subtitle: "Migration",
    description: "Migrate apps or flows to our tenant with guided intake.",
    cta: "Start request",
    estimate: "~3–5 min form",
  },
  {
    id: "connector",
    title: "Connector, Feature, Product",
    subtitle: "Enablement",
    description: "Request new connectors, features, or Power Platform products.",
    cta: "Request access",
    estimate: "~3–5 min form",
  },
  {
    id: "custom-connector",
    title: "Custom Connector",
    subtitle: "Advanced",
    description: "Bring your own API and let us review & enable it securely.",
    cta: "Submit details",
    estimate: "~3–5 min form",
  },
  {
    id: "dev-support",
    title: "Development Support",
    subtitle: "Co-build",
    description: "Get architecture and build guidance from the team.",
    cta: "Ask for help",
    estimate: "~3–5 min form",
  },
  {
    id: "environment-access",
    title: "Environment Access",
    subtitle: "Governance",
    description: "Request access to non-default environments for your solution.",
    cta: "Request access",
    estimate: "~3–5 min form",
  },
  {
    id: "http-allow-list",
    title: "HTTP Allow-List",
    subtitle: "Security",
    description: "Add domains to the allow-list for authenticated HTTP calls.",
    cta: "Submit request",
    estimate: "~3–5 min form",
  },
  {
    id: "premium-licensing",
    title: "Premium Licensing",
    subtitle: "Licensing",
    description: "Request licenses beyond the standard catalog for your apps.",
    cta: "View options",
    estimate: "~3–5 min form",
  },
  {
    id: "solution-design-review",
    title: "Solution Design Review",
    subtitle: "Architecture",
    description: "Validate feasibility, scalability, and guardrail alignment.",
    cta: "Book review",
    estimate: "~3–5 min form",
  },
]

export default function Page() {
  const [category, setCategory] = React.useState("")

  const filtered = React.useMemo(() => {
    return SERVICES.filter((s) => {
      if (category && category !== "all" && s.id !== category) return false
      return true
    })
  }, [category])

  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-6 p-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Our Services</h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover the right intake for your scenario — from solution design reviews to premium licensing.
        </p>
        <div className="flex items-center gap-3">
          <Button>Log a request</Button>
          <Button variant="outline">View requests</Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="text-lg font-medium text-muted-foreground">Choose the intake that best matches what you need to do.</div>
        </div>

        <div className="flex gap-3">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48">
              <span className="text-muted-foreground mr-2">Category</span>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {SERVICES.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((s) => (
          <Card key={s.id} className="group flex flex-col h-full">
            <CardHeader>
              <div className="space-y-1.5">
                  <CardTitle>{s.title}</CardTitle>
                  <CardDescription>{s.subtitle}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </CardContent>
            <CardFooter>
              <div className="flex flex-1 flex-col">
                <div className="text-xs text-muted-foreground">{s.estimate}</div>
              </div>
              <CardAction>
                <Button variant="ghost">{s.cta}</Button>
              </CardAction>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  )
}
