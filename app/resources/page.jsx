"use client";
import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Video,
  FileText,
  Download,
  Calendar,
  Settings,
  User,
  Code2,
  Tag as TagIcon,
} from "lucide-react";

// Shadcn Select imports
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AIChatbot from "../components/AIChatbot";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import QuizDialog from "../components/quiz";

// --------------------------------------------------------------------------
// TAG COLORS
// --------------------------------------------------------------------------

const TAG_COLORS = {
  All: "bg-gray-200 text-gray-800",
  Beginner: "bg-green-200 text-green-800",
  Intermediate: "bg-yellow-200 text-yellow-800",
  Advanced: "bg-red-200 text-red-800",
  Arrays: "bg-purple-200 text-purple-800",
  Stacks: "bg-blue-200 text-blue-800",
  Queues: "bg-indigo-200 text-indigo-800",
  Sorting: "bg-pink-200 text-pink-800",
  Recursion: "bg-teal-200 text-teal-800",
  Trees: "bg-orange-200 text-orange-800",
  Graphs: "bg-cyan-200 text-cyan-800",
};

// --------------------------------------------------------------------------
// MOCK RESOURCES DATA
// --------------------------------------------------------------------------

const RESOURCES = {
  Lessons: [
    { id: 1, title: "Introduction to Arrays", description: "Learn what arrays are and how to use them.", tags: ["Beginner", "Arrays"] },
    { id: 2, title: "Array Methods", description: "Explore useful methods to manipulate arrays.", tags: ["Intermediate", "Arrays"] },
    { id: 3, title: "Stacks & Queues Intro", description: "Understand stacks and queues and their use cases.", tags: ["Beginner", "Stacks", "Queues"] },
    { id: 4, title: "Sorting Algorithms Basics", description: "Learn bubble, selection, and insertion sort.", tags: ["Intermediate", "Sorting"] },
    { id: 5, title: "Recursion Fundamentals", description: "Discover how recursion works in programming.", tags: ["Intermediate", "Recursion"] },
    { id: 6, title: "Linked Lists", description: "Understand linked lists and basic operations.", tags: ["Intermediate", "Stacks"] },
    { id: 7, title: "Trees Introduction", description: "Learn about binary trees and their structure.", tags: ["Intermediate", "Trees"] },
    { id: 8, title: "Graphs Basics", description: "Explore graph structures and traversal methods.", tags: ["Advanced", "Graphs"] },
    { id: 9, title: "Advanced Arrays", description: "Work with multidimensional arrays efficiently.", tags: ["Advanced", "Arrays"] },
    { id: 10, title: "Sorting Advanced", description: "Learn advanced sorting like QuickSort and MergeSort.", tags: ["Advanced", "Sorting"] },
  ],
  Videos: [
  {
    id: 1,
    title: "Arrays Explained",
    description: "A clear visual explanation of arrays for beginners.",
    url: "https://www.youtube.com/watch?v=9dr2mHYYoug",
    thumbnail: "https://i.ytimg.com/vi/00m3YhLT6fA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDIi763f8y2guOw9pN6FqmeT8G9sA",
    tags: ["Arrays", "Beginner"],
  },
  {
    id: 2,
    title: "Stacks & Queues ",
    description: "Animations for stacks and queues to understand.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/0zx4EpFYrvc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAlFcSKF3zgxgRiygZjd6d_Mgc3Ng",
    tags: ["Stacks", "Queues", "Intermediate"],
  },
  {
    id: 3,
    title: "Sorting Algorithms ",
    description: "Watch bubble, selection, and insertion sort in action.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnW6bdmnU7mmhXlklx0kcc_WrRD_RyXBRgTQ&s",
    tags: ["Sorting", "Intermediate"],
  },
  {
    id: 4,
    title: "Recursion Step-by-Step",
    description: "Learn recursion with detailed animations and examples.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/ohLAtWDoUzw/maxresdefault.jpg",
    tags: ["Recursion", "Intermediate"],
  },
  {
    id: 5,
    title: "Binary Tree Traversals",
    description: "Visualize inorder, preorder, and postorder tree traversals.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/b_NjndniOqY/sddefault.jpg",
    tags: ["Trees", "Intermediate"],
  },
  {
    id: 6,
    title: "Graph BFS & DFS",
    description: "Learn BFS and DFS algorithms with visual examples.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/5WnfXh0YQcQ/maxresdefault.jpg",
    tags: ["Graphs", "Advanced"],
  },
  {
    id: 7,
    title: "QuickSort Explained",
    description: "Understand the QuickSort algorithm visually",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/-2VqW516BcI/maxresdefault.jpg",
    tags: ["Sorting", "Advanced"],
  },
  {
    id: 8,
    title: "Queue Operations",
    description: "Learn enqueue, dequeue, and queue implementations.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/sDO9bPaBg6A/maxresdefault.jpg",
    tags: ["Queues", "Intermediate"],
  },
  {
    id: 9,
    title: "Recursion Patterns",
    description: "Common recursion patterns and tricks for solving problems.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/-z_pFf8YWIo/sddefault.jpg",
    tags: ["Recursion", "Advanced"],
  },
  {
    id: 10,
    title: "Graph Algorithms ",
    description: "Learn shortest path, Dijkstra, and advanced graph traversals.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "https://i.ytimg.com/vi/tWVWeAqZ0WU/maxresdefault.jpg",
    tags: ["Graphs", "Advanced"],
  },
]
,
  Quizzes: [
    { id: 1, title: "Arrays Quiz",thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg", description: "Test your understanding of arrays.", link: "#", tags: ["Arrays", "Beginner"] },
    { id: 2, title: "Stacks Quiz", description: "Check your knowledge on stacks.", link: "#", tags: ["Stacks", "Intermediate"] },
    { id: 3, title: "Queues Quiz", description: "Test your understanding of queues.", link: "#", tags: ["Queues", "Intermediate"] },
    { id: 4, title: "Sorting Quiz", description: "Practice complex sorting algorithms.", link: "#", tags: ["Sorting", "Intermediate"] },
    { id: 5, title: "Recursion Quiz", description: "Challenge yourself with recursion.", link: "#", tags: ["Recursion", "Intermediate"] },
    { id: 6, title: "Trees Quiz", description: "Test advanced binary tree concepts.", link: "#", tags: ["Trees", "Intermediate"] },
    { id: 7, title: "Graphs Quiz", description: "Check your advanced graph knowledge.", link: "#", tags: ["Graphs", "Advanced"] },
    { id: 8, title: "Advanced Arrays Quiz", description: "Advanced arrays exercises.", link: "#", tags: ["Arrays", "Advanced"] },
    { id: 9, title: "Sorting Advanced Quiz", description: "Advanced sorting practice.", link: "#", tags: ["Sorting", "Advanced"] },
    { id: 10, title: "Recursion Advanced Quiz", description: "Advanced recursion problems.", link: "#", tags: ["Recursion", "Advanced"] },
  ],
  Downloads: [
    { id: 1, title: "Arrays Cheat Sheet", description: "Quick reference for arrays.", file: "/downloads/arrays-cheatsheet.pdf", tags: ["Arrays", "Beginner"] },
    { id: 2, title: "Stacks Guide", description: "Step-by-step stacks guide.", file: "/downloads/stacks-guide.pdf", tags: ["Stacks", "Intermediate"] },
    { id: 3, title: "Queues Guide", description: "Reference for queue operations.", file: "/downloads/queues-guide.pdf", tags: ["Queues", "Intermediate"] },
    { id: 4, title: "Sorting Summary", description: "Summary of common sorting algorithms.", file: "/downloads/sorting-summary.pdf", tags: ["Sorting", "Intermediate"] },
    { id: 5, title: "Recursion Tips", description: "Tips to master recursion.", file: "/downloads/recursion-tips.pdf", tags: ["Recursion", "Intermediate"] },
    { id: 6, title: "Binary Trees Notes", description: "Notes on binary trees.", file: "/downloads/trees-notes.pdf", tags: ["Trees", "Intermediate"] },
    { id: 7, title: "Graph Theory Notes", description: "Reference for graph theory.", file: "/downloads/graph-theory.pdf", tags: ["Graphs", "Advanced"] },
    { id: 8, title: "Advanced Arrays Notes", description: "Advanced arrays reference.", file: "/downloads/advanced-arrays.pdf", tags: ["Arrays", "Advanced"] },
    { id: 9, title: "Sorting Advanced Notes", description: "Advanced sorting reference.", file: "/downloads/sorting-advanced.pdf", tags: ["Sorting", "Advanced"] },
    { id: 10, title: "Recursion Advanced Notes", description: "Advanced recursion reference.", file: "/downloads/recursion-advanced.pdf", tags: ["Recursion", "Advanced"] },
  ],
};


// --------------------------------------------------------------------------
// RESOURCES PAGE
// --------------------------------------------------------------------------

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Lessons");
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("All");

  // available tags for the selected section
  const allTags = ["All", ...new Set(RESOURCES[selectedCategory].flatMap(item => item.tags))];

  // filter logic
  const filteredItems = RESOURCES[selectedCategory].filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesTag = tagFilter === "All" || item.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="flex h-screen overflow bg-gray-50">
      
        <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className="bg-muted/40">
      <main className="flex-1 flex flex-col">
    
    {/* NAVBAR */}
    <header className="h-16 border-b bg-background px-6 flex items-center gap-4">
<SidebarTrigger className="-ml-1" />
<h2 className="text-lg font-semibold">Resources</h2>

</header>
        <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6 mb-6">
          {/* Category Select */}
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              setTagFilter("All");
              setSearch("");
            }}
          >
            <SelectTrigger className="border bg-white rounded-lg px-3 py-2">
              <SelectValue placeholder="Select Section" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-xl">
              {Object.keys(RESOURCES).map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Bar */}
          <input
            type="text"
            placeholder={`Search ${selectedCategory}...`}
            className="border rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Tag Filter using Shadcn Select */}
          <Select value={tagFilter} onValueChange={(value) => setTagFilter(value)}>
            <SelectTrigger className="border bg-white rounded-lg px-3 py-2">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-xl">
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>
                  <span className={`px-2 py-1 rounded-full text-xs ${TAG_COLORS[tag] || "bg-gray-200 text-gray-800"}`}>
                    {tag}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {filteredItems.map(item => (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 p-6 flex flex-col border border-gray-200"
    >
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-4">
        {selectedCategory === "Quizzes" && (
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <BookOpen className="w-5 h-5" />
          </div>
        )}
        {selectedCategory === "Downloads" && (
          <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
            <Download className="w-5 h-5" />
          </div>
        )}
        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        {item.description || "Detailed description of this resource goes here."}
      </p>
      {selectedCategory === "Videos" && (
  <div className="relative mb-4">
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="rounded-xl w-full h-40 object-cover mb-3 hover:brightness-90 transition"
      />
    </a>
  </div>
)}


      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.map(tag => (
          <span
            key={tag}
            className={`px-2 py-1 rounded-full text-xs ${
              TAG_COLORS[tag] || "bg-gray-200 text-gray-800"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Metadata */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        {selectedCategory === "Quizzes" && <span>5 min • 10 Questions</span>}
        {selectedCategory === "Downloads" && <span>PDF • 2 MB</span>}
      </div>

{/* Action button */}
{selectedCategory === "Lessons" && (
  <Link
    href={`/resources/lesson/${item.id}`}
    className="mt-auto block px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center font-medium"
  >
    View Lesson
  </Link>
)}
{selectedCategory === "Quizzes" && (
  <QuizDialog/>
)}
{selectedCategory === "Downloads" && (
  <a
    href={item.file}
    download
    className="mt-auto inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition text-center font-medium"
  >
    Download
  </a>
)}

    </div>
  ))}

  {filteredItems.length === 0 && (
    <p className="text-gray-500 col-span-full text-center mt-6">
      No resources found.
    </p>
  )}
</div>
</div>
      </main>
      </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

// --------------------------------------------------------------------------
// Sidebar
// --------------------------------------------------------------------------

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
        {links.map(link => (
          <a key={link.label} href={link.href} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition">
            <link.icon className="w-5 h-5 text-gray-600" />
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
