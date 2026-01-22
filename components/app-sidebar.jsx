"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Folder,
  User,
  Settings,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", url: "/main", icon: LayoutDashboard },
  { title: "Sessions", url: "/sessions", icon: Calendar },
  { title: "Learn", url: "/learn", icon: BookOpen },
  { title: "Resources", url: "/resources", icon: Folder },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar(props) {
  const pathname = usePathname()

  // ✅ Plain JS: remove ": string"
  const isActivePage = (url) => pathname?.startsWith(url)

  return (
    <Sidebar {...props}>
      {/* HEADER */}
      <SidebarHeader className="border-b px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white font-bold text-lg">
            C
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Codify
          </span>
        </div>
      </SidebarHeader>

      {/* NAV */}
      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const isActive = isActivePage(item.url)

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        h-12 px-4 text-base font-medium transition-colors rounded-lg
                        flex items-center gap-4
                        ${
                          isActive
                            ? "bg-green-100 text-green-800"
                            : "hover:bg-green-50 text-gray-700"
                        }
                      `}
                    >
                      <a href={item.url} className="flex items-center gap-4">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* PROFILE SKELETON */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-1">
            <div className="h-3 w-24 rounded bg-muted animate-pulse" />
            <div className="h-3 w-16 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </div>

      <SidebarRail />
    </Sidebar>
  )
}
