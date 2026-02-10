import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

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
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">Total Revenue</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
              $1,250.00
            </CardTitle>
          </div>
          <CardAction>
            <Badge variant="outline" className="text-foreground">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            Trending up this month <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">New Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
              1,234
            </CardTitle>
          </div>
          <CardAction>
            <Badge variant="outline" className="text-foreground">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">Active Accounts</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
              45,678
            </CardTitle>
          </div>
          <CardAction>
            <Badge variant="outline" className="text-foreground">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            Strong user retention <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card dark:bg-zinc-900/50">
        <CardHeader>
          <div className="flex flex-col gap-1.5">
            <CardDescription className="text-foreground">Growth Rate</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums text-foreground @[250px]/card:text-3xl">
              4.5%
            </CardTitle>
          </div>
          <CardAction>
            <Badge variant="outline" className="text-foreground">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-foreground">
            Steady performance increase <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
