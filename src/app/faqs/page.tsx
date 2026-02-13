"use client"

import * as React from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select"
import { Plus, Minus } from "lucide-react"

const categories = ["All", "General", "Our Service", "Account", "Billing", "Technical"]

const SECTIONS = [
  {
    id: "general",
    title: "General Overview",
    description:
      "A high-level summary of Power Platform enablement requirements submitted by application teams.",
    faqs: [
      {
        id: "g1",
        question: "What is the Power Intake app and what is it used for?",
        answer:
          "The Power Intake app is the central request portal for interacting with the Power Platform team. It allows users to submit requests for enabling connectors, accessing premium features, provisioning environments, and receiving assistance for app or flow development. It also serves as the gateway for logging use cases that require review.",
      },
      {
        id: "g2",
        question: "How can I request to enable a connector, feature, or Power Platform product?",
        answer:
          "Open a new request in the Power Intake app, select the appropriate category and provide required details and justification.",
      },
      {
        id: "g3",
        question: "Where can I find guidance on which connectors and features are approved for use?",
        answer:
          "See the Power Guide in the main navigation for approved connectors and governance guidance.",
      },
          {
            id: "g4",
            question: "How often are Power Intake requests reviewed by the service team?",
            answer:
              "Requests are triaged regularly; review cadence depends on request volume and priority. Critical requests are prioritized and handled as soon as possible.",
          },
          {
            id: "g5",
            question: "What should I do if I miss a notification or update about my request?",
            answer:
              "Check the request thread in the Power Intake app first. If you still need help, contact the Power Platform team via the contact link or reopen the request for an update.",
          },
          {
            id: "g6",
            question: "What is the expected turnaround time or SLA for Power Intake requests?",
            answer:
              "Turnaround times vary by request type — simple requests may be completed within a few business days; complex or governance-reviewed requests may take longer. Check the request details for estimated timelines.",
          },
    ],
  },
  {
    id: "service",
    title: "Our Service",
    description:
      "Our service delivers tailored solutions to meet your unique needs efficiently and effectively.",
    faqs: [
      {
        id: "s1",
        question: "How can I provide feedback on the services I received?",
        answer: "We're working on an answer for this question. Please check back soon.",
      },
      {
        id: "s2",
        question: "Are there any additional fees for your services?",
        answer:
          "Some services may incur additional charges depending on scope and third-party costs. Details are provided on the service request or estimate.",
      },
      {
        id: "s3",
        question: "How can I request a service appointment?",
        answer:
          "Use the Power Intake app to create a new request and select the service appointment category; the team will follow up with scheduling details.",
      },
    ],
  },
  {
    id: "support",
    title: "Support",
    description: "Our support team is here to assist you with any questions or issues you may have.",
    faqs: [
      {
        id: "sup1",
        question: "How can I contact customer support?",
        answer: "Open a support request in the Power Intake app or use the contact link provided in the header to reach the support team.",
      },
      {
        id: "sup2",
        question: "What are your support hours?",
        answer: "Support is available during regular business hours; emergency support details are available in the service agreement.",
      },
      {
        id: "sup3",
        question: "How can I track the progress of my support request?",
        answer: "You can view status updates and comments on your request thread in the Power Intake app.",
      },
      {
        id: "sup4",
        question: "How do I follow up on an existing support case?",
        answer: "Reply to the request thread or add a comment to request additional information or escalation.",
      },
      {
        id: "sup5",
        question: "How do I cancel or modify a support appointment?",
        answer: "Open the request and choose to modify or cancel; if the option isn't available, contact support to assist.",
      },
    ],
  },
]

export default function Page() {
  const [openMap, setOpenMap] = React.useState<Record<string, string | null>>({})

  // No category filtering, show all sections
  const filteredSections = SECTIONS;

  React.useEffect(() => {
    const map: Record<string, string | null> = {}
    for (const s of filteredSections) {
      map[s.id] = s.faqs && s.faqs.length > 0 ? s.faqs[0].id : null
    }
    setOpenMap(map)
  }, [filteredSections])

  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-4 p-6 overflow-auto" style={{ height: '100vh' }}>
      <div>
        <h1 className="text-3xl font-semibold">Frequently asked questions.</h1>
        <p className="text-muted-foreground mt-2">Answers about request process, communications, notifications, and support policies.</p>
      </div>

      <div className="flex w-full justify-center">
        <div className="w-full max-w-4xl flex flex-col gap-6">
          {filteredSections.map((section) => (
            <section key={section.id} className="rounded-lg border border-muted/40 bg-card p-4">
            <div className="mb-3">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{section.description}</p>
            </div>

            <div className="flex flex-col gap-3">
              {section.faqs.map((f) => {
                const isOpen = openMap[section.id] === f.id
                const toggle = (sectionId: string, id: string) =>
                  setOpenMap((prev) => ({
                    ...prev,
                    [sectionId]: prev[sectionId] === id ? null : id,
                  }))

                return (
                  <div
                    key={f.id}
                    className={`group relative flex flex-col gap-2 rounded-lg border px-4 py-3 transition-shadow ${
                      isOpen ? "border-primary/60 bg-primary/5 shadow-md" : "border-transparent bg-background"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <button
                          onClick={() => toggle(section.id, f.id)}
                          aria-expanded={isOpen}
                          className="text-left text-base font-medium text-foreground w-full"
                        >
                          {f.question}
                        </button>
                        {isOpen ? (
                          <div className="mt-2 text-sm text-muted-foreground">{f.answer}</div>
                        ) : null}
                      </div>

                      <button
                        onClick={() => toggle(section.id, f.id)}
                        aria-label={isOpen ? "Collapse" : "Expand"}
                        className={`ml-2 flex-none h-10 w-10 flex items-center justify-center rounded-full border shadow-sm transition-colors ${
                          isOpen ? "bg-primary text-primary-foreground" : "bg-white/50"
                        }`}
                      >
                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
          ))}
        </div>
      </div>
    </div>
  )
}
