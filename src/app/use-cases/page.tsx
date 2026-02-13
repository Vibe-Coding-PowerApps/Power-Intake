// ...existing code...
import React, { useState } from "react";
import { DataTable } from "../../components/data-table";

interface UseCase {
  id: number;
  title: string;
  description: string;
  status: "Open" | "Closed" | "In Progress";
  createdAt: string;
}

const mockUseCases: UseCase[] = [
  {
    id: 1,
    title: "Automate Invoice Processing",
    description: "Automate the workflow for invoice approvals.",
    status: "Open",
    createdAt: "2026-02-01",
  },
  {
    id: 2,
    title: "Customer Feedback Analysis",
    description: "Analyze customer feedback using AI.",
    status: "In Progress",
    createdAt: "2026-02-05",
  },
  {
    id: 3,
    title: "Sales Dashboard",
    description: "Create a dashboard for sales tracking.",
    status: "Closed",
    createdAt: "2026-01-20",
  },
  // Add more mock use cases as needed
];

// ...existing code...
export default function Page() {
  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-2 p-6">
      <h1 className="text-2xl font-semibold">Use Cases</h1>
      <div className="mt-4">
        <DataTable data={mockUseCases.map(uc => ({
          id: uc.id,
          header: uc.title,
          type: "Use Case",
          status: uc.status,
          target: "",
          limit: "",
          reviewer: "Assign reviewer"
        }))} />
      </div>
    </div>
  );
}
