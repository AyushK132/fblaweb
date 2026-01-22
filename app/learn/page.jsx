"use client";

import { motion } from "framer-motion";
import { Home, Lock } from "lucide-react";
import { Code2, Calendar, BookOpen, Settings, User, FileText } from "lucide-react";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/* QUEST DATA: Chapters & Levels (with xOffset for horizontal positioning) */
/* -------------------------------------------------------------------------- */

const CHAPTERS = [
  {
    id: 1,
    title: "Arrays",
    levels: [
      { id: 1, label: "Array I", status: "active", xOffset: 0 },
      { id: 2, label: "Array II", status: "locked", xOffset: 48 },
      { id: 3, label: "Array III", status: "locked", chest: true, xOffset: 0 },
    ],
  },
  {
    id: 2,
    title: "Stacks",
    levels: [
      { id: 4, label: "Stack I", status: "locked", xOffset: -40 },
      { id: 5, label: "Stack II", status: "locked", chest: true, xOffset: 0 },
      { id: 6, label: "Monotonic Stack", status: "locked", xOffset: 40 },
    ],
  },
  {
    id: 3,
    title: "Queues",
    levels: [
      { id: 7, label: "Queue I", status: "locked", xOffset: 0 },
      { id: 8, label: "Queue II", status: "locked", xOffset: -48 },
      { id: 9, label: "Priority Queue", status: "locked", chest: true, xOffset: 0 },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN QUEST MAP COMPONENT */
/* -------------------------------------------------------------------------- */

export default function QuestMap() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg text-white h-screen">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4 flex-shrink-0">
          <h1 className="text-lg font-semibold text-green-400">
            Data Structures and Algorithms
          </h1>
          <div className="text-sm text-gray-400">0 / 35</div>
        </div>

        {/* Scrollable Map */}
        <div className="flex-1 overflow-y-auto relative px-6 py-6">
          {/* Grid background */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />

          {/* Quest Path */}
          <div className="relative z-10 flex flex-col items-center gap-20">
            {CHAPTERS.map((chapter, cIdx) => (
              <div
                key={chapter.id}
                className="flex flex-col items-center gap-14 relative w-full"
              >
                {/* Chapter Title */}
                <h2 className="text-3xl font-bold text-green-500">{chapter.title}</h2>

                {/* Levels */}
                {chapter.levels.map((node, i) => (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                    style={{ transform: `translateX(${node.xOffset}px)` }}
                  >
                    {/* Path connecting previous node */}
                    {(i !== 0 || cIdx !== 0) && (
                      <svg
                        className="absolute -top-14 left-1/2 -translate-x-1/2"
                        width="60"
                        height="80"
                        viewBox="0 0 60 80"
                      >
                        <path
                          d="M30 0 C 10 20, 50 40, 30 80"
                          stroke="#555"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="4 6"
                        />
                      </svg>
                    )}

                    {/* Node pill */}
                    {node.status === "active" ? (
                      <Link
                        href={`/learn/problem/${node.id}`}
                        className="flex items-center gap-3 px-6 py-3 rounded-full border transition 
                          bg-green-500 border-green-600 text-white shadow-[0_0_0_4px_rgba(0,255,0,0.15)] hover:scale-105 transform"
                      >
                        <div className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center">
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{node.label}</span>
                      </Link>
                    ) : (
                      <div
                        className="flex items-center gap-3 px-6 py-3 rounded-full border 
                          bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 cursor-not-allowed"
                      >
                        <div className="w-6 h-6 rounded-full bg-black/40 flex items-center justify-center">
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{node.label}</span>
                        <Lock className="w-4 h-4 opacity-60" />
                      </div>
                    )}

                    {/* Chest icon */}
                    {node.chest && (
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2 text-3xl">
                        🧰
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ))}

            {/* Mystery nodes */}
            <div className="flex gap-20 mt-10 text-4xl opacity-70 justify-center">
              <span>❓</span>
              <span>❓</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SIDEBAR COMPONENT */
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
    <aside className="w-64 bg-white border-r flex flex-col h-screen flex-shrink-0">
      <div className="px-6 py-5 text-2xl font-bold flex items-center gap-2">
        <Code2 className="text-green-600" /> CodeHub
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
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
