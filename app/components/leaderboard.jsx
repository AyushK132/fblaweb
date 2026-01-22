"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Trophy } from "lucide-react";

// Mock names
const NAMES = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Davis",
  "Diana Roberts",
  "Ethan Brown",
  "Fiona Wilson",
  "George Miller",
  "Hannah Lee",
  "Ian Clark",
  "Julia Adams",
  "Kevin White",
  "Laura Scott",
  "Michael Lewis",
  "Nina Walker",
  "Oliver Hall",
];

// Mock users for demo
const USERS = NAMES.map((name, i) => ({
  name,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  weeklyXP: Math.floor(Math.random() * 1000 + 100),
  monthlyXP: Math.floor(Math.random() * 5000 + 500),
  allTimeXP: Math.floor(Math.random() * 20000 + 1000),
  level: Math.floor(Math.random() * 20) + 1,
}));

export default function DashboardLeaderboard() {
  const [filterLevel, setFilterLevel] = useState("all");

  const filteredUsers = (period) => {
    return USERS.filter((u) =>
      filterLevel === "all" ? true : u.level === Number(filterLevel)
    ).sort((a, b) => b[period] - a[period]);
  };

  return (
    <Card className="h-[400px] flex flex-col bg- text-black">
      <CardHeader className="flex justify-between items-center pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/30">
            <Trophy className="h-4 w-4 text-yellow-400" />
          </div>
          <CardTitle className="text-lg font-medium">Leaderboard</CardTitle>
        </div>

        {/* Level Filter */}
        <Select onValueChange={(v) => setFilterLevel(v)} defaultValue="all">
          <SelectTrigger className="w-32 text-black">
            <SelectValue placeholder="Filter Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {[...Array(20)].map((_, i) => (
              <SelectItem key={i} value={`${i + 1}`}>Level {i + 1}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-4 pb-4 pt-0 overflow-hidden">
        <Tabs defaultValue="weekly" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 mb-3 bg-white/20 rounded-md">
            <TabsTrigger value="weekly" className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-600">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-600">Monthly</TabsTrigger>
            <TabsTrigger value="all-time" className="text-xs data-[state=active]:bg-white data-[state=active]:text-emerald-600">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="flex-1 overflow-y-auto mt-0 space-y-1 pr-2">
            {filteredUsers("weeklyXP").map((user, idx) => (
              <LeaderboardRow key={user.name} user={user} idx={idx} period="weeklyXP" />
            ))}
          </TabsContent>

          <TabsContent value="monthly" className="flex-1 overflow-y-auto mt-0 space-y-1 pr-2">
            {filteredUsers("monthlyXP").map((user, idx) => (
              <LeaderboardRow key={user.name} user={user} idx={idx} period="monthlyXP" />
            ))}
          </TabsContent>

          <TabsContent value="all-time" className="flex-1 overflow-y-auto mt-0 space-y-1 pr-2">
            {filteredUsers("allTimeXP").map((user, idx) => (
              <LeaderboardRow key={user.name} user={user} idx={idx} period="allTimeXP" />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function LeaderboardRow({ user, idx, period }) {
  // Determine background color for top 3
  let bgColor = "bg-white/20 hover:bg-white/30"; // default
  if (idx === 0) bgColor = "bg-yellow-400/50 hover:bg-yellow-400/60"; // Gold
  if (idx === 1) bgColor = "bg-slate-400/50 hover:bg-slate-400/60"; // Silver
  if (idx === 2) bgColor = "bg-amber-700/50 hover:bg-amber-700/60"; // Bronze

  return (
    <div
      className={`flex justify-between items-center px-3 py-2 rounded-md transition cursor-pointer ${bgColor}`}
    >
      <span className="font-bold w-6">{idx + 1}</span>

      {/* User Info with Avatar */}
      <div className="flex items-center gap-2 flex-1">
        <img
          src={user.avatar}
          alt={user.name}
          className={`h-8 w-8 rounded-full object-cover ${idx < 3 ? "border-2 border-white" : ""}`}
        />
        <span className={`font-medium ${idx < 3 ? "text-white" : ""}`}>{user.name}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`${idx < 3 ? "text-white font-semibold" : ""}`}>
          {user[period]} XP
        </span>
        <span className={`${idx < 3 ? "text-white/80" : "text-sm"}`}>Lvl {user.level}</span>
      </div>
    </div>
  );
}

