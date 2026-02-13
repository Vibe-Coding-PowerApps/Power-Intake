import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/ui/select";

const ISSUE_TYPES = [
  { label: "General Question", value: "question" },
  { label: "Technical Issue", value: "technical" },
  { label: "Feature Request", value: "feature" },
  { label: "Bug Report", value: "bug" },
  { label: "Other", value: "other" },
];

export default function Page() {
  const [issueType, setIssueType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
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
                    {ISSUE_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
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
          </form>
        )}
      </div>
    </div>
  );
}
