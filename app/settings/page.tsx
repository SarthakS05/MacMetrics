"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import React from 'react';
import { useEffect, useState } from 'react';


// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export default function Settings() {

  const [message, setMessage] = useState([]);
  const [message2, setMessage2] = useState([]);
  const message3 = [1, 3, 5, 7, 9];

  useEffect(() => {
    fetch("http://localhost:8080/api/home").then(
      response => response.json()
    ).then(
      data => {
        setMessage(data);
      }
    )
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/api/test").then(
      response => response.json()
    ).then(
      data => {
        setMessage2(data);
      }
    )
  }, [])

  var selected = ['Test2', 'Test3'];
  var filtered = message2.filter(({
    Key
  }) => selected.includes(Key));

  const [position, setPosition] = useState("first");
  var filteredObj = [{"key": "first", "var": message2}, {"key": "second", "var": filtered}];


  return (
    <div>
      {/* <h1 className="bg-slate-200 py-5  text-center text-2xl font-extrabold tracking-tight">
        Ronis Mac Bar Dashboard
      </h1> */}
      <div className="flex flex-auto flex-row p-5 space-x-2">
        <div className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Settings Screen</CardTitle>
              <CardDescription>This has some info in it</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is some text</p>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Chart Example</CardTitle>
                <CardDescription>This has some info in it</CardDescription>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator/>
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="first">First</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="second">Second</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={filteredObj.find(el => el.key === position)?.var}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="Key"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="Val" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="Val2" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
