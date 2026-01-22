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

import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ProblemsTable from "../components/problemstable"
import DashboardLeaderboard from "../components/leaderboard"
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

const TOP_USERS = [
  { username: "CodeMaster", xp: 9820, level: 20 },
  { username: "AlgoQueen", xp: 8745, level: 19 },
  { username: "BugHunter", xp: 7600, level: 18 },
  { username: "JSNinja", xp: 6520, level: 17 },
  { username: "AlgoWizard", xp: 6100, level: 16 },
];



export default function DashboardPage() {
  const [chartType, setChartType] = useState("area")

  return (
    <div className="flex h-full bg-muted/40">
     
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


          <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-green-500 text-white shadow-md">
  {/* Subtle glow */}
  <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-white/20 blur-2xl" />

  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-xs font-medium opacity-90">
      Total XP
    </CardTitle>

    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
      <Trophy className="h-4 w-4 text-white" />
    </div>
  </CardHeader>

  <CardContent className="space-y-2 pt-0">
    {/* Main stat */}
    <div className="text-2xl font-bold leading-none">
      1,280 XP
    </div>

    {/* Sub text */}
    <p className="text-[11px] opacity-80">
      +120 XP today
    </p>

    {/* Progress */}
    <div className="h-1.5 w-full rounded-full bg-white/20">
      <div className="h-full w-[72%] rounded-full bg-white" />
    </div>

    <p className="text-[10px] opacity-70">
      72% to next level
    </p>
  </CardContent>
</Card>

<Card className="shadow-sm">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-xs font-medium text-muted-foreground">
      Current Streak
    </CardTitle>

    {/* Icon badge */}
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
      <Flame className="h-4 w-4 text-orange-500" />
    </div>
  </CardHeader>

  <CardContent className="space-y-2 pt-0">
    {/* Main stat */}
    <div className="text-2xl font-bold leading-none">
      14 Days
    </div>

    {/* Context */}
    <p className="text-[11px] text-muted-foreground">
      Best streak: 21 days
    </p>

    {/* Subtle progress */}
    <div className="h-1.5 w-full rounded-full bg-muted">
      <div className="h-full w-[67%] rounded-full bg-orange-400" />
    </div>

    <p className="text-[10px] text-muted-foreground">
      7 days to next milestone
    </p>
  </CardContent>
</Card>

<Card className="shadow-sm">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-xs font-medium text-muted-foreground">
      Level
    </CardTitle>

    {/* Icon badge */}
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
      <BarChart3 className="h-4 w-4 text-blue-500" />
    </div>
  </CardHeader>

  <CardContent className="space-y-2 pt-0">
    {/* Main stat */}
    <div className="text-2xl font-bold leading-none">
      Level 8
    </div>

    {/* Context */}
    <p className="text-[11px] text-muted-foreground">
      520 XP to Level 9
    </p>

    {/* Progress */}
    <div className="h-1.5 w-full rounded-full bg-muted">
      <div className="h-full w-[62%] rounded-full bg-blue-400" />
    </div>

    <p className="text-[10px] text-muted-foreground">
      Keep going 🚀
    </p>
  </CardContent>
</Card>


<Card className="shadow-sm">
  <CardHeader className="flex flex-row items-center justify-between pb-2">
    <CardTitle className="text-xs font-medium text-muted-foreground">
      Rank
    </CardTitle>

    {/* Icon badge */}
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
      <User className="h-4 w-4 text-purple-500" />
    </div>
  </CardHeader>

  <CardContent className="space-y-2 pt-0">
    {/* Main stat */}
    <div className="text-2xl font-bold leading-none">
      #124
    </div>

    {/* Context */}
    <p className="text-[11px] text-muted-foreground">
      Top 8% globally
    </p>

    {/* Progress to next rank */}
    <div className="h-1.5 w-full rounded-full bg-muted">
      <div className="h-full w-[78%] rounded-full bg-purple-400" />
    </div>

    <p className="text-[10px] text-muted-foreground">
      36 ranks to Top 5%
    </p>
  </CardContent>
</Card>

            {/* 
            <StatCard title="Current Streak" value="14 Days" icon={<Flame />} />
            <StatCard title="Level" value="Level 8" icon={<BarChart3 />} />
            <StatCard title="Rank" value="#124" icon={<User />} /> */}
          </div>

      
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* XP CHART */}
  <Card className="lg:col-span-2">
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>XP Progress</CardTitle>
        <p className="text-xs text-muted-foreground">
          XP gained over the last 7 days
        </p>
      </div>

      {/* Chart toggle */}
      <ToggleGroup
        type="single"
        value={chartType}
        onValueChange={(v) => v && setChartType(v)}
        className="bg-muted rounded-lg p-1"
      >
        <ToggleGroupItem value="area" className="text-xs px-3">
          Area
        </ToggleGroupItem>
        <ToggleGroupItem value="bar" className="text-xs px-3">
          Bar
        </ToggleGroupItem>
      </ToggleGroup>
    </CardHeader>

    <CardContent className="h-[260px] pt-2">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart data={progressData}>
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="xp"
              stroke="#22c55e"
              strokeWidth={3}
              fill="url(#xpGradient)"
            />
          </AreaChart>
        ) : (
          <BarChart data={progressData}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="xp" radius={[6, 6, 0, 0]} fill="#22c55e" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </CardContent>
  </Card>


          {/* AI INSIGHTS */}
          <DashboardLeaderboard/>
</div>


         
        <ProblemsTable/>
        </div>
      </main>
      </SidebarInset>
      </SidebarProvider>
    </div>
  )
}



// function StatCard({ title, value, icon }) {
//   return (
   
//   )
// }


function Insight({ emoji, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-lg">{emoji}</span>
      <div>
        <p className="font-medium leading-tight">{title}</p>
        <p className="text-xs text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
