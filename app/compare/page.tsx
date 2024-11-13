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
import Image from 'next/image'
import logo from '/components/logo.ico'
import { Utensils, ChartNoAxesCombined, ChartColumnStacked, Cog } from "lucide-react"


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

export default function Page() {

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
        <div className='flex items-center space-x-2 justify-center'>
            <Image className="flex-none min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px]"
            src={logo}
            width={32}
            height={32}
            alt="Ronis Logo"
            />
            <ChartColumnStacked />
            <h1 className="py-5 text-2xl font-extrabold tracking-tight">
                Compare
            </h1>
        </div>
        <div className="flex flex-row space-x-2">
            <Card>
                <CardHeader>Add a chart</CardHeader>
            </Card>
            <Card>
                <CardHeader>Add a chart</CardHeader>
            </Card>
        </div>
    </div>
  );
}
