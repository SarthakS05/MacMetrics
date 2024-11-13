import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarTrigger,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
  import { Utensils, ChartNoAxesCombined, ChartColumnStacked, Cog } from "lucide-react"
  import Image from 'next/image'
  import logo from '/components/logo.ico'
  import textlogo from '/components/textlogo.png'


  const items = [
    {
        title: "Items",
        url: "/",
        icon: Utensils
    },
    {
        title: "Sales",
        url: "/sales",
        icon: ChartNoAxesCombined
    },
    {
        title: "Compare",
        url: "/compare",
        icon: ChartColumnStacked
    }
  ]

export function AppSidebar() {
    return (
      <Sidebar variant="floating" collapsible="icon">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarTrigger />
                </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
                <SidebarMenuItem key="Logo">
                    <SidebarMenuButton asChild>
                        <a href={"https://ronismacbar.com/"}>
                            <Image
                                src={logo}
                                alt="Ronis Logo"
                            />
                            <span><Image
                                src={textlogo}
                                alt="Ronis Logo"
                                width={64}
                                height={32}
                            /></span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
                <h1>Dashboard</h1>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem key="Settings">
                    <SidebarMenuButton asChild>
                        <a href={"/settings"}>
                            <Cog/>
                            <span>Settings</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    )
  }
