"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Utensils, ChartNoAxesCombined, ChartColumnStacked, Cog } from "lucide-react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart } from "recharts"
import MonthlySalesData from '@/data/monthSales.json'



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

const pieConfig = {
  test: {
    label: "Test",
    color: "#BDEDE0"
  },
  test1: {
    label: "Test1",
    color: "#BBDBD1"
  },
  test3: {
    label: "Test3",
    color: "#B6B8D6"
  },
  test4: {
    label: "Test4",
    color: "#7E78D2"
  },
  test5: {
    label: "Test5",
    color: "#6F58C9"
  }
} satisfies ChartConfig

const monthSalesConfig = {
  "day": {
    label: "Day"
  },
  "april": {
    label: "April",
    color: "hsl(var(--chart-1))"
  },
  "may": {
    label: "May",
    color: "hsl(var(--chart-2))"
  },
  "june": {
    label: "June",
    color: "#B6B8D6"
  },
  july: {
    label: "July",
    color: "#7E78D2"
  },
  august: {
    label: "August",
    color: "#6F58C9"
  },
  september: {
    label: "September",
    color: "#7A9B76"
  },
  october: {
    label: "October",
    color: "#453750"
  },
} satisfies ChartConfig

export default function Home() {

  const [message, setMessage] = useState([]);
  const [message2, setMessage2] = useState([]);

  const [pieTopping, setPieTopping] = useState([]);
  const [pieCheese, setPieCheese] = useState([]);
  const [pieMeat, setPieMeat] = useState([]);
  const [pieNoodles, setPieNoodles] = useState([]);
  const [pieDrizzles, setPieDrizzles] = useState([]);
  const [pieSides, setPieSides] = useState([]);

  const [tab, setTab] = useState("Toppings");
  const onTabChange = (value: String) => {
    setTab(value);
  }

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

  useEffect(() => {
    fetch("http://localhost:8080/api/toppings_chart").then(
      response => response.json()
    ).then(
      data => {
        setPieTopping(data);
      }
    )
  }, [])

  var selected = ['Test2', 'Test3'];
  var filtered = message2.filter(({
    Key
  }) => selected.includes(Key));

  const [position, setPosition] = useState("key");

  var filterKeys = [ { "key": "April", "var": message2 },
                      { "key": "May", "var": filtered },
                      { "key": "June", "var": filtered },
                      { "key": "July", "var": filtered },
                      { "key": "August", "var": filtered },
                      { "key": "September", "var": filtered },
                      { "key": "October", "var": filtered },
                      { "key": "Total", "var": message2 },
                      { "key": "Average", "var": filtered }
                    ];

var pieKeys = {"Noodles" : pieNoodles,
  "Cheese": pieCheese,
  "Meat": pieMeat ,
  "Toppings": pieTopping ,
  "Drizzles": pieDrizzles ,
  "Sides": pieSides };


  return (
    <div>
      <div className='flex items-center space-x-2 justify-center'>
        <Image className="flex-none min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]"
          src={logo}
          width={32}
          height={32}
          alt="Ronis Logo"
        />
        <Utensils />
        <h1 className="py-5 text-2xl font-extrabold tracking-tight">
          Items
        </h1>
      </div>
      <div className="flex flex-auto flex-row p-5 space-x-2">
        <div className="space-y-2">
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle>Item Popularity</CardTitle>
              <CardDescription>April to October 2024</CardDescription>
              <Tabs defaultValue="Toppings" value={tab} onValueChange={onTabChange}>
                <TabsList>
                  <TabsTrigger value="Noodles">Noodles</TabsTrigger>
                  <TabsTrigger value="Cheese">Cheese</TabsTrigger>
                  <TabsTrigger value="Meat">Meat</TabsTrigger>
                  <TabsTrigger value="Toppings">Toppings</TabsTrigger>
                  <TabsTrigger value="Drizzles">Drizzles</TabsTrigger>
                  <TabsTrigger value="Sides">Sides</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={pieConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieKeys[tab]}
                    dataKey="Val"
                    nameKey="Key"
                    innerRadius={60}
                    strokeWidth={5}
                    activeIndex={0}
                    activeShape={({
                      outerRadius = 0,
                      ...props
                    }: PieSectorDataItem) => (
                      <Sector {...props} outerRadius={outerRadius + 10} />
                    )}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Most Common Bowl</CardTitle>
              <CardDescription>Based on most common build options</CardDescription>
            </CardHeader>

            <CardContent>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-2">
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle>Catering Order Popularity</CardTitle>
                <CardDescription># of Orders Per Period</CardDescription>
              </div>
              <div>
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
                      <DropdownMenuRadioItem value="Average">Average</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart data={filterKeys.find(el => el.key === position)?.var}>
                  <CartesianGrid vertical={true} />
                  <XAxis
                    dataKey="Key"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  {/* <ChartLegend content={<ChartLegendContent />} /> */}
                  <Bar dataKey="Val" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="Val2" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Per Month</CardTitle>
              <CardDescription># of Bowls Ordered April to October 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={monthSalesConfig} className="w-full">
                <AreaChart accessibilityLayer data={MonthlySalesData}>
                  <XAxis dataKey="day"/>
                  <ChartTooltip content={<ChartTooltipContent/>}/>
                  <CartesianGrid vertical={true} horizontal={true}/>
                  <Area dataKey="april" fill="var(--color-april)"></Area>
                  <Area dataKey="may" fill="var(--color-may)"></Area>
                  <Area dataKey="june" fill="var(--color-june)"></Area>
                  <Area dataKey="july" fill="var(--color-july)"></Area>
                  <Area dataKey="august" fill="var(--color-august)"></Area>
                  <Area dataKey="september" fill="var(--color-september)"></Area>
                  <Area dataKey="october" fill="var(--color-october)"></Area>
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



{/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
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
              </ChartContainer> */}

// <div>
//   <DropdownMenu>
//     <DropdownMenuTrigger asChild>
//       <Button variant="outline">Filter</Button>
//     </DropdownMenuTrigger>
//     <DropdownMenuContent className="w-56">
//       <DropdownMenuSeparator />
//       <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
//         <DropdownMenuRadioItem value="first">First</DropdownMenuRadioItem>
//         <DropdownMenuRadioItem value="second">Second</DropdownMenuRadioItem>
//       </DropdownMenuRadioGroup>
//     </DropdownMenuContent>
//   </DropdownMenu>
// </div>