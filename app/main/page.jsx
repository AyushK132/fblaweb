"use client";
import Link from "next/link";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Trophy,
  Flame,
  CheckCircle2,
  Clock,
  Search,
  ChevronRight,
  ChevronDown,
  BarChart3,
  Calendar,
  BookOpen,
  Settings,
  User,
  FileText
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* MOCK DATA */
/* -------------------------------------------------------------------------- */

const USER = {
  name: "Ayush",
  level: "Intermediate",
  streak: 14,
  solved: 128,
  total: 450,
};

const DIFFICULTY_COLORS = {
  Easy: "text-green-600 bg-green-100",
  Medium: "text-yellow-600 bg-yellow-100",
  Hard: "text-red-600 bg-red-100",
};

const PROBLEMS = Array.from({ length: 120 }).map((_, i) => ({
  id: i + 1,
  title: `Problem #${i + 1}: Sample Algorithm Challenge`,
  difficulty: i % 3 === 0 ? "Easy" : i % 3 === 1 ? "Medium" : "Hard",
  acceptance: Math.floor(40 + (i % 50)),
  solved: i % 4 === 0,
  tags: ["Array", "Hash Table", i % 2 === 0 ? "DP" : "Greedy"],
}));

const ACTIVITY = Array.from({ length: 30 }).map((_, i) => ({
  day: `Day ${i + 1}`,
  solved: Math.floor(Math.random() * 5),
}));

/* -------------------------------------------------------------------------- */
/* ANIMATIONS */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE */
/* -------------------------------------------------------------------------- */

export default function DashboardPage() {
  const [query, setQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const filteredProblems = useMemo(() => {
    return PROBLEMS.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "All" || p.difficulty === difficultyFilter;
      return matchesQuery && matchesDifficulty;
    });
  }, [query, difficultyFilter]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        <TopBar />

        {/* STATS */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <StatCard icon={<Flame className="text-orange-500" />} label="Daily Streak" value={`${USER.streak} days`} />
          <StatCard icon={<CheckCircle2 className="text-green-600" />} label="Solved" value={USER.solved} />
          <StatCard icon={<Code2 className="text-blue-600" />} label="Total Problems" value={USER.total} />
          <StatCard icon={<Trophy className="text-yellow-500" />} label="Level" value={USER.level} />
        </motion.section>

        {/* OVERVIEW */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <ProgressOverview />
          <RecentActivity />
          <DailyChallenge />
        </motion.section>

        {/* PROBLEMS — FIXED HEIGHT + INTERNAL SCROLL */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border p-6 flex flex-col h-[70vh]"
        >
          <div className="sticky top-0 bg-white z-10 pb-4">
            <ProblemsHeader
              query={query}
              setQuery={setQuery}
              difficulty={difficultyFilter}
              setDifficulty={setDifficultyFilter}
            />
          </div>

          <div className="mt-2 divide-y overflow-y-auto flex-1 pr-2">
            {filteredProblems.map((problem) => (
              <ProblemRow key={problem.id} problem={problem} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR */
/* -------------------------------------------------------------------------- */

function Sidebar() {
  const links = [
     { label: "Dashboard", icon: BookOpen, href: "/main" },
    { label: "Sessions", icon: Calendar, href: "/join" },
    { label: "Learn", icon: BookOpen, href: "/learn" },
    { label: "Resources", icon: FileText, href: "/resources" },
    { label: "Profile", icon: User, href: "/profile" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:flex flex-col">
      <div className="px-6 py-5 text-2xl font-bold flex items-center gap-2">
        <Code2 className="text-green-600" /> CodeHub
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            <link.icon className="w-5 h-5 text-gray-600" />
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}


/* -------------------------------------------------------------------------- */
/* TOP BAR */
/* -------------------------------------------------------------------------- */

function TopBar() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input placeholder="Search problems" className="outline-none text-sm" />
        </div>
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STAT CARD */
/* -------------------------------------------------------------------------- */

function StatCard({ icon, label, value }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gray-100">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}



function ProgressOverview({ percent = 28 }) {
  // For Recharts, the bar always fills proportionally to maxValue
  const data = [
    { name: "Progress", value: percent, fill: "#22c55e" }, // filled portion
  ];

  return (
    <div className="relative w-48 h-48 mx-auto bg-white rounded-2xl shadow-lg flex items-center justify-center">
      {/* Radial Bar Chart */}
      <RadialBarChart
        width={192}
        height={192}
        cx="50%"
        cy="50%"
        innerRadius="70%"
        outerRadius="100%"
        barSize={12}
        data={data}
        startAngle={90}
        endAngle={-270} // counter-clockwise
        // set maxValue to 100 so percent works correctly
        maxAngle={360} 
      >
        {/* Gray background ring */}
        <RadialBar
          background={{ fill: "#e5e7eb" }}
          dataKey="value"
          cornerRadius={6}
          clockWise
          minAngle={0}
        />
      </RadialBarChart>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-gray-800">{percent}%</span>
        <span className="text-sm text-gray-500">Completed</span>
      </div>
    </div>
  );
}


/* -------------------------------------------------------------------------- */
/* ACTIVITY */
/* -------------------------------------------------------------------------- */

function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="font-semibold mb-4">Recent Activity</h2>
      {ACTIVITY.slice(0, 7).map((a, i) => (
        <div key={i} className="flex justify-between text-sm mb-2">
          <span>{a.day}</span>
          <span className="font-medium">{a.solved} solved</span>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* DAILY */
/* -------------------------------------------------------------------------- */

function DailyChallenge() {
  return (
    <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6">
      <h2 className="font-semibold mb-2">Daily Challenge</h2>
      <p className="text-sm mb-4">Maintain your streak.</p>
     <Link href="/learn">
  <button className="bg-white text-green-600 px-4 py-2 rounded-xl flex items-center gap-2">
    Start <ChevronRight className="w-4 h-4" />
  </button>
</Link>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROBLEMS HEADER */
/* -------------------------------------------------------------------------- */

function ProblemsHeader({ query, setQuery, difficulty, setDifficulty }) {
  return (
    <div className="flex justify-between items-center gap-4">
      <h2 className="text-xl font-semibold">Problems</h2>
      <div className="flex gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="bg-gray-100 px-3 py-2 rounded-xl text-sm outline-none"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="bg-gray-100 px-3 py-2 rounded-xl text-sm"
        >
          {["All", "Easy", "Medium", "Hard"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROBLEM ROW */
/* -------------------------------------------------------------------------- */

function ProblemRow({ problem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-4">
      <div onClick={() => setOpen(!open)} className="flex justify-between cursor-pointer">
        <div className="flex gap-3">
          {problem.solved ? (
            <CheckCircle2 className="text-green-600 w-5 h-5" />
          ) : (
            <Clock className="text-gray-400 w-5 h-5" />
          )}
          <div>
            <p className="font-medium">{problem.title}</p>
            <div className="flex gap-2 text-xs text-gray-500 mt-1">
              <span className={`px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[problem.difficulty]}`}>
                {problem.difficulty}
              </span>
              <span>{problem.acceptance}% acceptance</span>
            </div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="pl-8 pt-3"
          >
            <div className="flex gap-2 mb-2">
              {problem.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <button className="text-sm font-semibold text-green-600 hover:underline">
              Solve Problem →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
