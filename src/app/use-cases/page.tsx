import React, { useState, useEffect } from "react";
import { DataTable } from "../../components/data-table";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/tabs";
import dashboardData from "../dashboard/data.json";
import { SERVICES } from "../services/page";

const serviceTypes = SERVICES.map((s) => ({ value: s.id, label: s.title }));

interface Field {
  label: string;
  name: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  options?: string[];
}

const tabFields: Record<string, Field[]> = {
  requestDetails: [
    { label: "What is the title of your request?", name: "title", required: true },
    { label: "What type of service do you need?", name: "serviceType", required: true, type: "select", options: ["---", ...serviceTypes.map(s => s.label)] },
    { label: "Which products are involved?", name: "products", required: true, type: "select", options: ["---", "AI Builder", "Copilot Studio", "Power Apps", "Power Automate", "Power BI", "Power Pages"] },
    { label: "What features are required (if any)?", name: "features" },
    { label: "What connector will you use?", name: "connector" },
    { label: "Can you describe your requirements?", name: "description", required: true, multiline: true },
  ],
  applicationDetails: [
    { label: "Are you processing personal data?", name: "processingPersonalData", required: true, type: "select", options: ["---", "Yes", "No"] },
    { label: "Are you processing or storing client data?", name: "processingClientData", required: true, type: "select", options: ["---", "Yes", "No"] },
    { label: "What is your AIR ID?", name: "airId" },
    { label: "What are your current data sources?", name: "currentDataSources", required: true },
    { label: "Is this a new or existing application?", name: "newOrExistingApp", required: true, type: "select", options: ["---", "New", "Existing"] },
    { label: "Where are your expected users located?", name: "expectedUserLocation", required: true, type: "select", options: ["---", "Global", "Regional", "Other"] },
  ],
  contactDetails: [
    { label: "Please enter the display name of the primary contact for this request.", name: "primaryContact", required: true },
    { label: "Please enter the display name of the secondary contact for this request.", name: "secondaryContact", required: true },
    { label: "Please enter the display name of the manager or sponsor responsible for this request.", name: "managerSponsor" },
    { label: "Is this for a dedicated customer?", name: "dedicatedCustomer", required: true, type: "select", options: ["---", "Dedicated Customer", "Not a Dedicated Customer"] },
    { label: "Which entity is responsible?", name: "responsibleEntity", required: true, type: "select", options: ["---", "Technology", "Business", "Other"] },
    { label: "What is the business unit?", name: "businessUnit", type: "select", options: ["---", "Unit 1", "Unit 2"] },
    { label: "How did you hear about us?", name: "referralSource", required: true },
  ],
};

export default function Page() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("requestDetails");
  const [service, setService] = useState<string>(serviceTypes[0]?.value || "");
  const [form, setForm] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get("service");
      if (serviceParam) {
        // Case-insensitive, trimmed match
        const found = serviceTypes.find((s) => s.label.trim().toLowerCase() === serviceParam.trim().toLowerCase());
        if (found) {
          setService(found.label);
          setForm((prev) => ({ ...prev, serviceType: found.label }));
          setShowForm(true);
        }
      }
    }
  }, []);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value: string) => {
    setService(value);
    setForm({});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted!\n" + JSON.stringify({ service, ...form }, null, 2));
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-2">
      {!showForm ? (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-6">
            <h1 className="text-2xl font-semibold">Use Cases</h1>
            <Button className="w-auto min-w-[160px]" onClick={() => setShowForm(true)}>
              New Intake Request
            </Button>
          </div>
          <div className="mt-4 pb-6">
            <DataTable data={dashboardData} meta={{ setShowForm }} />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6 p-6">
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-semibold mb-2 leading-tight">New Intake Request</h1>
            <div className="text-muted-foreground text-sm leading-tight">
              Please provide details about your use case. Fill out all required fields and describe your solution, business value, and any relevant architecture or data requirements.
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-8 text-left">
            <TabsList className="mb-4">
              <TabsTrigger value="requestDetails">Request Details</TabsTrigger>
              <TabsTrigger value="applicationDetails">Application Details</TabsTrigger>
              <TabsTrigger value="contactDetails">Contact Details</TabsTrigger>
            </TabsList>
            <div className="min-h-[400px]">
              <TabsContent value="requestDetails">
                <form className="flex flex-col min-h-[600px] space-y-6 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {tabFields.requestDetails.filter(f => f.name !== "description").map((field) => (
                      <div key={field.name} className="flex items-start gap-x-2">
                        <Label htmlFor={field.name} className="text-sm font-medium w-48 break-words">{field.label}</Label>
                        {field.type === "select"
                          ? field.name === "serviceType"
                            ? (
                                <Select
                                  value={service}
                                  onValueChange={(value) => {
                                    setService(value);
                                    handleChange(field.name, value);
                                  }}
                                >
                                  <SelectTrigger id={field.name} className="w-80">
                                    <SelectValue placeholder={field.label} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map((option) => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )
                            : (
                                <Select
                                  value={form[field.name] || field.options?.[0] || ""}
                                  onValueChange={(value) => handleChange(field.name, value)}
                                >
                                  <SelectTrigger id={field.name} className="w-80">
                                    <SelectValue placeholder={field.label} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {field.options?.map((option) => (
                                      <SelectItem key={option} value={option}>{option}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )
                          : (
                          <Input
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm w-80"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Description field full width */}
                  <div className="mt-6 flex items-start gap-x-2">
                    <Label htmlFor="description" className="text-sm font-medium w-48 break-words pt-1">Can you describe your requirements?</Label>
                    <textarea
                      id="description"
                      required={tabFields.requestDetails.find(f => f.name === "description")?.required}
                      value={form["description"] || ""}
                      onChange={(e) => handleChange("description", e.target.value)}
                      className="min-h-[120px] border rounded px-2 py-1 text-sm w-[600px] max-w-full"
                    />
                  </div>
                  <div className="mt-auto flex gap-4 justify-end bg-background pt-4 pb-4 px-6 border-t z-10">
                    <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={handleCancel}>Cancel</Button>
                    {activeTab === "requestDetails" && (
                      <Button type="button" variant="default" className="w-auto min-w-[120px]" onClick={() => setActiveTab("applicationDetails")}>Next</Button>
                    )}
                    {activeTab === "applicationDetails" && (
                      <Button type="button" variant="default" className="w-auto min-w-[120px]" onClick={() => setActiveTab("contactDetails")}>Next</Button>
                    )}
                    {activeTab === "contactDetails" && (
                      <Button type="submit" className="w-auto min-w-[120px]">Submit</Button>
                    )}
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="applicationDetails">
                <form className="flex flex-col min-h-[600px] space-y-6 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {tabFields.applicationDetails.map((field) => (
                      <div key={field.name} className="flex items-start gap-x-2">
                        <Label htmlFor={field.name} className="text-sm font-medium w-48 break-words">{field.label}</Label>
                        {field.type === "file" ? (
                          <input type="file" id={field.name} className="w-80" />
                        ) : field.type === "date" ? (
                          <Input
                            id={field.name}
                            type="date"
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm w-80"
                          />
                        ) : field.type === "select" ? (
                          <Select
                            value={form[field.name] || field.options?.[0] || ""}
                            onValueChange={(value) => handleChange(field.name, value)}
                          >
                            <SelectTrigger id={field.name} className="w-80">
                              <SelectValue placeholder={field.label} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm w-80"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto flex gap-4 justify-end bg-background pt-4 pb-4 px-6 border-t z-10">
                    <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={handleCancel}>Cancel</Button>
                    {activeTab === "requestDetails" && (
                      <Button type="button" variant="default" className="w-auto min-w-[120px]" onClick={() => setActiveTab("applicationDetails")}>Next</Button>
                    )}
                    {activeTab === "applicationDetails" && (
                      <Button type="button" variant="default" className="w-auto min-w-[120px]" onClick={() => setActiveTab("contactDetails")}>Next</Button>
                    )}
                    {activeTab === "contactDetails" && (
                      <Button type="submit" className="w-auto min-w-[120px]">Submit</Button>
                    )}
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="contactDetails">
                <form className="flex flex-col min-h-[600px] space-y-6 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {tabFields.contactDetails.map((field) => (
                      field.multiline ? (
                        <div key={field.name} className="flex flex-col gap-2 max-w-2xl md:col-span-2 md:max-w-2xl">
                          <Label htmlFor={field.name} className="text-sm font-medium">{field.label}</Label>
                          <textarea
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="w-full h-24 border rounded px-2 py-1 text-sm"
                          />
                        </div>
                      ) : field.type === "select" ? (
                        <div key={field.name} className="flex items-start gap-x-2">
                          <Label htmlFor={field.name} className="text-sm font-medium w-48 break-words">{field.label}</Label>
                          <Select
                            value={form[field.name] || field.options?.[0] || ""}
                            onValueChange={(value) => handleChange(field.name, value)}
                          >
                            <SelectTrigger id={field.name} className="w-80">
                              <SelectValue placeholder={field.label} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : (
                        <div key={field.name} className="flex items-start gap-x-2">
                          <Label htmlFor={field.name} className="text-sm font-medium w-48 break-words">{field.label}</Label>
                          <Input
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm w-80"
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="mt-auto flex gap-4 justify-end bg-background pt-4 pb-4 px-6 border-t z-10">
                    <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={handleCancel}>Cancel</Button>
                    <Button type="submit" className="w-auto min-w-[120px]">Submit</Button>
                  </div>
                </form>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </div>
  );
}
