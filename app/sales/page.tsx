"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart } from "recharts"
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
import Image from 'next/image'
import logo from '/components/logo.ico'
import { Utensils, ChartNoAxesCombined, ChartColumnStacked, Cog } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function Sales() {

  const [message, setMessage] = useState([]);
  const [message2, setMessage2] = useState([]);

  const [tab, setTab] = useState("Total");
  const onTabChange = (value: String) => {
    setTab(value);
  }

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

  const [position, setPosition] = useState("Total");

  var sales = { "April" : 137745.14,
                "May" : 66213.56, 
                "June" : 30628.97, 
                "July" : 35298.26, 
                "August" : 53145.03, 
                "September" : 60295.82, 
                "October": 53162.30,
                "Total" : 436489.08,
                "Average" : 62355.58
  };

  var salesGraph = [ {"Key" : "April", "Value" : 137745.14},
    {"Key" : "May", "Value" : 66213.56}, 
    {"Key" : "June", "Value" : 30628.97}, 
    {"Key" : "July", "Value" : 35298.26}, 
    {"Key" : "August", "Value" : 53145.03}, 
    {"Key" : "September", "Value" : 60295.82}, 
    {"Key" : "October", "Value": 53162.30}
  ];

var filterKeys = { "April": filtered ,
  "May": filtered,
  "June": filtered,
  "July": filtered,
  "August": filtered,
  "September": filtered,
  "October": filtered,
  "Total": salesGraph
};




  return (
    <div>
      <div className='flex items-center space-x-2 justify-center'>
        <Image className="flex-none min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]"
          src={logo}
          width={32}
          height={32}
          alt="Ronis Logo"
        />
        <ChartNoAxesCombined />
        <h1 className="py-5 text-2xl font-extrabold tracking-tight">
          Sales
        </h1>
      </div>
      <div className="flex flex-auto flex-row p-5 space-x-2">
        <div className="space-y-2">
          <Card>
            <CardHeader className="items-center space-y-10">
              <Tabs defaultValue="Toppings" value={tab} onValueChange={onTabChange}>
                <TabsList>
                  <TabsTrigger value="Total">Total</TabsTrigger>
                  <TabsTrigger value="April">April</TabsTrigger>
                  <TabsTrigger value="May">May</TabsTrigger>
                  <TabsTrigger value="June">June</TabsTrigger>
                  <TabsTrigger value="July">July</TabsTrigger>
                  <TabsTrigger value="August">August</TabsTrigger>
                  <TabsTrigger value="September">September</TabsTrigger>
                  <TabsTrigger value="October">October</TabsTrigger>
                  <TabsTrigger value="Average">Average</TabsTrigger>
                </TabsList>
              </Tabs>
              <CardTitle><h1 className="text-4xl">${sales[tab]}</h1></CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>{tab} sales</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div> 
                <CardTitle>Sales</CardTitle>
                <CardDescription>For period: {position}</CardDescription>
              </div>
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="April">April</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="May">May</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="June">June</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="July">July</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="August">August</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="September">September</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="October">October</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Total">Total</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <LineChart data={filterKeys[position]}>
                  <ChartTooltip content={<ChartTooltipContent/>}/>
                  <CartesianGrid vertical={true} />
                  <XAxis dataKey="Key" tickMargin={10} tickFormatter={(value) => value.slice(0, 3)}/>
                  <Line dataKey="Value" fill="var(--color-desktop)" radius={4} />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
        <div className="flex-col space-y-2">
          <Card>
            <CardHeader className="items-center space-y-10">
              <CardTitle><h1 className="text-4xl">${sales[tab]}</h1></CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>Average Bowl Cost</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Meat Add-on Sales</CardTitle>
            </CardHeader>
            <ChartContainer config={chartConfig} className="p-5">
              <BarChart data={salesGraph}>
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="Key"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Val" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="Val2" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sides Add-on Sales</CardTitle>
            </CardHeader>
            <ChartContainer config={chartConfig} className="p-5">
              <BarChart data={salesGraph}>
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="Key"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="Val" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="Val2" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}


