import React, { useState } from "react";
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
    { label: "Title", name: "title", required: true },
    { label: "Service type", name: "serviceType", required: true, type: "select", options: serviceTypes.map(s => s.label) },
    { label: "Products", name: "products", required: true },
    { label: "Features (optional)", name: "features" },
    { label: "Connector", name: "connector" },
    { label: "Description and requirements", name: "description", required: true, multiline: true },
  ],
  applicationDetails: [
    { label: "Are you processing personal data?", name: "processingPersonalData", required: true, type: "select", options: ["Yes", "No"] },
    { label: "Are you processing/storing client data?", name: "processingClientData", required: true, type: "select", options: ["Yes", "No"] },
    { label: "AIR ID", name: "airId" },
    { label: "Current data sources", name: "currentDataSources", required: true },
    { label: "New or existing application?", name: "newOrExistingApp", required: true, type: "select", options: ["New", "Existing"] },
    { label: "Expected user location", name: "expectedUserLocation", required: true, type: "select", options: ["Global", "Regional", "Other"] },
  ],
  contactDetails: [
    { label: "Primary contact", name: "primaryContact", required: true },
    { label: "Secondary contact", name: "secondaryContact", required: true },
    { label: "Manager/sponsor", name: "managerSponsor" },
    { label: "Dedicated customer", name: "dedicatedCustomer", required: true, type: "select", options: ["Dedicated Customer", "Not a Dedicated Customer"] },
    { label: "Responsible entity", name: "responsibleEntity", required: true, type: "select", options: ["Technology", "Business", "Other"] },
    { label: "Business unit", name: "businessUnit", type: "select", options: ["---", "Unit 1", "Unit 2"] },
    { label: "How did you hear about us?", name: "referralSource", required: true },
  ],
};

export default function Page() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("requestDetails");
  const [service, setService] = useState<string>(serviceTypes[0]?.value || "");
  const [form, setForm] = useState<Record<string, string | undefined>>({});

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
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-2 p-6">
      {!showForm ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Use Cases</h1>
            <Button className="w-auto min-w-[160px]" onClick={() => setShowForm(true)}>
              New Intake Request
            </Button>
          </div>
          <div className="mt-4">
            <DataTable data={dashboardData} />
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
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {tabFields.requestDetails.map((field) => (
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
                      ) : (
                        <div key={field.name} className="flex flex-col gap-2 max-w-md">
                          <Label htmlFor={field.name} className="text-sm font-medium">{field.label}</Label>
                          <Input
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={handleCancel}>Cancel</Button>
                    {activeTab === "requestDetails" && (
                      <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={() => setActiveTab("applicationDetails")}>Next</Button>
                    )}
                    {activeTab === "applicationDetails" && (
                      <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={() => setActiveTab("contactDetails")}>Next</Button>
                    )}
                    {activeTab === "contactDetails" && (
                      <Button type="submit" className="w-auto min-w-[120px]">Submit</Button>
                    )}
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="applicationDetails">
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    {tabFields.applicationDetails.map((field) => (
                      field.type === "file" ? (
                        <div key={field.name} className="flex flex-col gap-2 col-span-2">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <input type="file" id={field.name} />
                        </div>
                      ) : field.type === "date" ? (
                        <div key={field.name} className="flex flex-col gap-2">
                          <Label htmlFor={field.name}>{field.label}</Label>
                          <Input
                            id={field.name}
                            type="date"
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                          />
                        </div>
                      ) : (
                        <div key={field.name} className="flex flex-col gap-2 max-w-md">
                          <Label htmlFor={field.name} className="text-sm font-medium">{field.label}</Label>
                          <Input
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={handleCancel}>Cancel</Button>
                    {activeTab === "requestDetails" && (
                      <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={() => setActiveTab("applicationDetails")}>Next</Button>
                    )}
                    {activeTab === "applicationDetails" && (
                      <Button type="button" variant="outline" className="w-auto min-w-[120px]" onClick={() => setActiveTab("contactDetails")}>Next</Button>
                    )}
                    {activeTab === "contactDetails" && (
                      <Button type="submit" className="w-auto min-w-[120px]">Submit</Button>
                    )}
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="contactDetails">
                <form className="space-y-6 text-left" onSubmit={handleSubmit}>
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
                      ) : (
                        <div key={field.name} className="flex flex-col gap-2 max-w-md">
                          <Label htmlFor={field.name} className="text-sm font-medium">{field.label}</Label>
                          <Input
                            id={field.name}
                            required={field.required}
                            value={form[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            className="text-sm"
                          />
                        </div>
                      )
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end">
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
