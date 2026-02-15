import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"

import dashboardDataRaw from '@/app/dashboard/data.json';

type DashboardItem = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
  firstResponseDays: number;
};

const dashboardData: DashboardItem[] = dashboardDataRaw as DashboardItem[];

import { Badge } from '@/ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/card'

export function SectionCards() {
  // Calculate metrics from dashboardData
  const totalRequests = dashboardData.length;
  const inProgress = dashboardData.filter((d) => d.status === 'In Process').length;
  const completed = dashboardData.filter((d) => d.status === 'Done').length;
  const avgFirstResponse = dashboardData.length
    ? (
        dashboardData.reduce((sum, d) => sum + (Number(d.firstResponseDays) || 0), 0) /
        dashboardData.length
      ).toFixed(1)
    : 'N/A';

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Requests */}
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">Total Requests</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
                {totalRequests}
              </CardTitle>
              <Badge variant="outline" className="text-foreground flex items-center gap-1">
                <IconTrendingUp className="size-4" />
                +12.5%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground flex items-center gap-1">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">All intake requests</div>
        </CardFooter>
      </Card>

      {/* In Progress */}
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">In Progress</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
                {inProgress}
              </CardTitle>
              <Badge variant="outline" className="text-foreground flex items-center gap-1">
                <IconTrendingDown className="size-4" />
                -20%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground flex items-center gap-1">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">Currently being processed</div>
        </CardFooter>
      </Card>

      {/* Completed */}
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">Completed</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
                {completed}
              </CardTitle>
              <Badge variant="outline" className="text-foreground flex items-center gap-1">
                <IconTrendingUp className="size-4" />
                +12.5%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground flex items-center gap-1">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Requests marked as done</div>
        </CardFooter>
      </Card>

      {/* Avg. First Response */}
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">Avg. First Response (days)</CardDescription>
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
                {avgFirstResponse}
              </CardTitle>
              <Badge variant="outline" className="text-foreground flex items-center gap-1">
                <IconTrendingUp className="size-4" />
                +4.5%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="font-medium text-foreground flex items-center gap-1">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Across all requests</div>
        </CardFooter>
      </Card>
    </div>
  );
}
