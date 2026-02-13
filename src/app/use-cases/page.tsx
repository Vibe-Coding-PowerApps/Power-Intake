// ...existing code...
import React, { useState } from "react";
import { DataTable } from "../../components/data-table";

import dashboardData from "../dashboard/data.json";

interface UseCase {
  id: number;
  title: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

const useCases: UseCase[] = dashboardData.map((item: any) => ({
  id: item.id,
  title: item.header,
  type: item.type,
  status: item.status,
  target: item.target,
  limit: item.limit,
  reviewer: item.reviewer,
}));

// ...existing code...
export default function Page() {
  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-2 p-6">
      <h1 className="text-2xl font-semibold">Use Cases</h1>
      <div className="mt-4">
        <DataTable data={dashboardData} />
      </div>
    </div>
  );
}
