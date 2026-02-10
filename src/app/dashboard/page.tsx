import React, { Suspense } from 'react'
const ChartAreaInteractive = React.lazy(() => import('@/components/chart-area-interactive').then(m => ({ default: m.ChartAreaInteractive })))
const DataTable = React.lazy(() => import('@/components/data-table').then(m => ({ default: m.DataTable })))
import { SectionCards } from '@/components/section-cards'

import data from "./data.json"

export default function Page() {
  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto py-4 md:gap-6 md:py-6">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <Suspense fallback={<div style={{height:250}} className="w-full"><div className="animate-pulse h-full w-full bg-muted rounded-lg" /></div>}>
            <ChartAreaInteractive />
          </Suspense>
        </div>
        <Suspense fallback={<div className="w-full h-40 animate-pulse bg-muted rounded-lg" />}>
          <DataTable data={data} />
        </Suspense>
      </div>
    </div>
  )
}
