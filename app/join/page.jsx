"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Code2, Calendar, BookOpen, Settings, User, Users, Video, Search, FileText } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* MOCK DATA */
/* -------------------------------------------------------------------------- */
const scheduleData = {
  tutoring: [
    { id: 1, subject: "JavaScript Basics", tutor: "Alice Johnson", time: "Jan 21, 2026 - 3:00 PM", duration: "1h", tags: ["JS", "Basics"] },
    { id: 2, subject: "React Fundamentals", tutor: "Bob Smith", time: "Jan 22, 2026 - 5:00 PM", duration: "1.5h", tags: ["React", "Components"] },
    { id: 3, subject: "Node.js Intro", tutor: "Cathy Lee", time: "Jan 23, 2026 - 4:00 PM", duration: "1h", tags: ["Node", "Backend"] },
    { id: 4, subject: "CSS Animations", tutor: "David Kim", time: "Jan 24, 2026 - 6:00 PM", duration: "1h", tags: ["CSS", "Animations"] },
    { id: 5, subject: "HTML Forms", tutor: "Ella Wong", time: "Jan 25, 2026 - 3:30 PM", duration: "1h", tags: ["HTML", "Forms"] },
    { id: 6, subject: "Async JS & Promises", tutor: "Frank Liu", time: "Jan 26, 2026 - 5:00 PM", duration: "1.5h", tags: ["Async", "Promises"] },
    { id: 7, subject: "React Hooks Deep Dive", tutor: "Grace Tan", time: "Jan 27, 2026 - 4:30 PM", duration: "1.5h", tags: ["Hooks", "State"] },
    { id: 8, subject: "API Integration", tutor: "Henry Park", time: "Jan 28, 2026 - 6:00 PM", duration: "1h", tags: ["API", "Fetch"] },
    { id: 9, subject: "JavaScript ES6+", tutor: "Ivy Chen", time: "Jan 29, 2026 - 3:00 PM", duration: "1h", tags: ["JS", "ES6"] },
    { id: 10, subject: "React Router", tutor: "Jack Li", time: "Jan 30, 2026 - 5:00 PM", duration: "1h", tags: ["React", "Router"] },
  ],
  groupStudy: [
    { id: 1, topic: "Data Structures", host: "Study Group A", time: "Jan 21, 2026 - 6:00 PM", duration: "2h", tags: ["Arrays", "LinkedList"] },
    { id: 2, topic: "Algorithms Practice", host: "Study Group B", time: "Jan 23, 2026 - 4:00 PM", duration: "1.5h", tags: ["Sorting", "Search"] },
    { id: 3, topic: "Dynamic Programming", host: "Study Group C", time: "Jan 24, 2026 - 5:30 PM", duration: "2h", tags: ["DP", "Optimization"] },
    { id: 4, topic: "Graph Theory", host: "Study Group D", time: "Jan 25, 2026 - 6:00 PM", duration: "1.5h", tags: ["Graphs", "BFS/DFS"] },
    { id: 5, topic: "Recursion", host: "Study Group E", time: "Jan 26, 2026 - 3:00 PM", duration: "1h", tags: ["Recursion", "Backtracking"] },
    { id: 6, topic: "Sorting Algorithms", host: "Study Group F", time: "Jan 27, 2026 - 4:00 PM", duration: "1.5h", tags: ["MergeSort", "QuickSort"] },
    { id: 7, topic: "Hash Tables", host: "Study Group G", time: "Jan 28, 2026 - 5:00 PM", duration: "1h", tags: ["Hashing", "Maps"] },
    { id: 8, topic: "Stacks & Queues", host: "Study Group H", time: "Jan 29, 2026 - 6:00 PM", duration: "1h", tags: ["Stacks", "Queues"] },
    { id: 9, topic: "Bit Manipulation", host: "Study Group I", time: "Jan 30, 2026 - 4:30 PM", duration: "1h", tags: ["Bits", "Operations"] },
    { id: 10, topic: "Greedy Algorithms", host: "Study Group J", time: "Jan 31, 2026 - 3:00 PM", duration: "1h", tags: ["Greedy", "Optimization"] },
  ],
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE */
/* -------------------------------------------------------------------------- */
export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState("tutoring");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSessions = (sessions) =>
    sessions.filter(
      (s) =>
        s.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tutor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.host?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 text-center mb-6 drop-shadow">
          Join Live Sessions
        </h1>

        {/* Dropdown for tabs */}
        <div className="flex justify-center mb-6">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="tutoring">Tutoring Sessions</option>
            <option value="groupStudy">Group Study</option>
          </select>
        </div>

        {/* Search bar */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center bg-white border rounded-xl px-3 py-2 w-96 shadow-sm">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search sessions or hosts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none w-full text-sm"
            />
          </div>
        </div>

        {/* Sessions container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === "tutoring"
            ? filteredSessions(scheduleData.tutoring)
            : filteredSessions(scheduleData.groupStudy)
          ).map((session) => (
            <div
              key={session.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h2
                  className={`text-2xl font-bold flex items-center gap-2 ${
                    activeTab === "tutoring" ? "text-blue-700" : "text-purple-600"
                  }`}
                >
                  {activeTab === "tutoring" ? <Video className="w-5 h-5 text-blue-500" /> : <Users className="w-5 h-5 text-purple-500" />}
                  {activeTab === "tutoring" ? session.subject : session.topic}
                </h2>
                <span className="text-sm font-medium text-gray-500">{session.duration}</span>
              </div>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">{activeTab === "tutoring" ? "Tutor:" : "Host:"}</span>{" "}
                {activeTab === "tutoring" ? session.tutor : session.host}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Time:</span> {session.time}
              </p>

              {/* Tags with tooltip */}
              <div className="flex flex-wrap gap-2 mb-4">
                {session.tags.map((tag) => (
                  <div key={tag} className="relative group cursor-help">
                    <span className={`text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full`}>
                      {tag[0]}
                    </span>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded-md bg-gray-700 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {tag}
                    </div>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-2 rounded-xl font-semibold transition ${
                  activeTab === "tutoring"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {activeTab === "tutoring" ? "Join Session" : "Join Group"}
              </button>
            </div>
          ))}
        </div>
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
