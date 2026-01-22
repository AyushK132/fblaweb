"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {
  Home,
  BarChart3,
  Flame,
  Trophy,
  Brain,
  User,
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

/* -------------------------------------------------------------------------- */
/* MOCK DATA */
/* -------------------------------------------------------------------------- */

const progressData = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 210 },
  { day: "Wed", xp: 180 },
  { day: "Thu", xp: 260 },
  { day: "Fri", xp: 320 },
  { day: "Sat", xp: 400 },
  { day: "Sun", xp: 460 },
]


export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-muted/40">
     
    <SidebarProvider>
    <AppSidebar/>
    <SidebarInset className="bg-muted/40">
 
     
    
      <main className="flex-1 flex flex-col">
    
        {/* NAVBAR */}
        <header className="h-16 border-b bg-background px-6 flex items-center gap-4">
  <SidebarTrigger className="-ml-1" />
  <h2 className="text-lg font-semibold">Dashboard</h2>
  
</header>


        {/* CONTENT */}
        <div className="p-6 space-y-6 overflow-y-auto">
      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total XP" value="12,480" icon={<Trophy />} />
            <StatCard title="Current Streak" value="14 Days" icon={<Flame />} />
            <StatCard title="Level" value="Level 8" icon={<BarChart3 />} />
            <StatCard title="Rank" value="#124" icon={<User />} />
          </div>

      
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* XP CHART */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>XP Progress</CardTitle>
              </CardHeader>
              <CardContent className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="xp"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* AI INSIGHTS */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Brain className="h-5 w-5" />
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  🚀 You learn fastest on <b>weekends</b>.
                </p>
                <p>
                  🧠 Your streak increases retention by <b>32%</b>.
                </p>
                <p>
                  🎯 Recommendation: Practice <b>Arrays</b> next.
                </p>
              </CardContent>
            </Card>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">460 / 500 XP</p>
                <p className="text-xs text-muted-foreground">
                  Almost there!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Level</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">Level 9</p>
                <p className="text-xs text-muted-foreground">
                  520 XP needed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">🔥 7-Day Streak</p>
                <p className="text-sm">🏆 Top 10%</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </SidebarInset>
      </SidebarProvider>
    </div>
  )
}



function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
