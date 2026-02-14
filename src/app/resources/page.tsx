import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/ui/select";
import resources from "./data.json";

const categories = [
  "All",
  ...Array.from(new Set(resources.map((r) => r.category)))
];

export default function Page() {
  const [category, setCategory] = useState("All");
  const filtered = category === "All" ? resources : resources.filter(r => r.category === category);
  return (
    <div className="@container/main flex min-w-0 flex-1 flex-col gap-4 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Resources</h1>
          <p className="text-muted-foreground mt-2">Helpful resources and links.</p>
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6">
        {filtered.map((res) => (
          <Card key={res.id} className="h-full flex flex-col w-full max-w-sm mx-auto dark:bg-zinc-900/50">
            <CardHeader className="flex flex-col items-start space-y-1.5">
              <div>
                <CardTitle className="text-lg mb-1">{res.title}</CardTitle>
                <CardDescription className="mt-1">{res.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">Visit resource</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
