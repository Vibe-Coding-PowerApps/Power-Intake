
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/ui/card";
import { Button } from '@/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/ui/select";

const HELP_OPTIONS = [
  {
    id: "viva",
    title: "Viva Engage Community",
    description: "Ask questions, get help, and share knowledge with the community. Fastest way to get answers!",
    link: "https://example.com/viva-engage",
    actionText: "Go to Viva Engage"
  },
  {
    id: "servicenow",
    title: "Log a Support Ticket",
    description: "For technical issues, log a ticket in ServiceNow. Choose the right path for platform or Power Suite app issues.",
    actionText: "Open Support Form"
  }
];

export default function Page() {
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-semibold">Get Help</h1>
        <p className="text-muted-foreground mt-2">Choose the best way to get help. For fastest answers, try our Viva Engage Community. For technical issues, log a support ticket in ServiceNow.</p>
      </header>
      {!showSupportForm ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
          {HELP_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              className="h-full flex flex-col w-full max-w-sm mx-auto rounded-lg border bg-card shadow-sm cursor-pointer hover:shadow-md transition-shadow dark:bg-zinc-900/50"
            >
              <div className="flex flex-col items-start space-y-1.5 p-6 flex-1 w-full">
                <div className="w-full">
                  <h2 className="text-lg font-semibold mb-1">{opt.title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
                </div>
              </div>
              <div className="mt-auto pt-0 pb-4 px-6">
                {opt.id === "viva" ? (
                  <a
                    className="text-primary underline text-sm"
                    href={opt.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {opt.actionText}
                  </a>
                ) : (
                  <button
                    className="text-primary underline text-sm"
                    onClick={() => setShowSupportForm(true)}
                  >
                    {opt.actionText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
          <div className="w-full max-w-md rounded-lg bg-background/80 shadow-lg p-8">
            <h1 className="text-2xl font-semibold mb-1 text-left">Get Help</h1>
            <p className="text-muted-foreground mb-6 text-left">Contact support or open an issue. We’ll get back to you as soon as possible.</p>
            {submitted ? (
              <div className="rounded-md border border-green-300 bg-green-50 p-4 text-green-900 text-center">Thank you! Your request has been submitted.</div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    className="border rounded-md px-3 py-2 text-sm bg-background border-input focus:ring-2 focus:ring-ring focus:outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="issueType" className="text-sm font-medium">Issue Type</label>
                  <Select value={issueType} onValueChange={setIssueType}>
                    <SelectTrigger id="issueType" className="w-full">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    className="border rounded-md px-3 py-2 text-sm bg-background border-input focus:ring-2 focus:ring-ring focus:outline-none min-h-[100px] resize-vertical"
                    placeholder="Describe your issue or question..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="text-primary underline text-sm mt-2"
                  onClick={() => { setShowSupportForm(false); setSubmitted(false); }}
                >
                  ← Back to Help Options
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
