"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ------------------- MOCK PROBLEMS -------------------
const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      tags: ["Array", "HashMap"],
      solved: false,
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Easy",
      tags: ["Linked List"],
      solved: true,
    },
    {
      id: 3,
      title: "Valid Parentheses",
      difficulty: "Easy",
      tags: ["Stack", "String"],
      solved: false,
    },
    {
      id: 4,
      title: "Merge Intervals",
      difficulty: "Medium",
      tags: ["Array", "Sorting"],
      solved: false,
    },
    {
      id: 5,
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      tags: ["String", "Sliding Window"],
      solved: true,
    },
    {
      id: 6,
      title: "Add Two Numbers",
      difficulty: "Medium",
      tags: ["Linked List", "Math"],
      solved: false,
    },
    {
      id: 7,
      title: "Container With Most Water",
      difficulty: "Medium",
      tags: ["Array", "Two Pointers"],
      solved: false,
    },
    {
      id: 8,
      title: "Minimum Path Sum",
      difficulty: "Medium",
      tags: ["Dynamic Programming", "Array"],
      solved: false,
    },
    {
      id: 9,
      title: "Word Search",
      difficulty: "Medium",
      tags: ["Backtracking", "Matrix"],
      solved: false,
    },
    {
      id: 10,
      title: "Climbing Stairs",
      difficulty: "Easy",
      tags: ["Dynamic Programming"],
      solved: true,
    },
    {
      id: 11,
      title: "Course Schedule",
      difficulty: "Medium",
      tags: ["Graph", "Topological Sort"],
      solved: false,
    },
    {
      id: 12,
      title: "Coin Change",
      difficulty: "Hard",
      tags: ["Dynamic Programming"],
      solved: false,
    },
    {
      id: 13,
      title: "Maximum Subarray",
      difficulty: "Easy",
      tags: ["Array", "Dynamic Programming"],
      solved: true,
    },
    {
      id: 14,
      title: "Number of Islands",
      difficulty: "Medium",
      tags: ["DFS", "BFS", "Matrix"],
      solved: false,
    },
    {
      id: 15,
      title: "Generate Parentheses",
      difficulty: "Medium",
      tags: ["Backtracking", "String"],
      solved: false,
    },
    {
      id: 16,
      title: "Trapping Rain Water",
      difficulty: "Hard",
      tags: ["Array", "Two Pointers"],
      solved: false,
    },
    {
      id: 17,
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium",
      tags: ["Array", "Binary Search"],
      solved: false,
    },
    {
      id: 18,
      title: "Longest Palindromic Substring",
      difficulty: "Medium",
      tags: ["String"],
      solved: false,
    },
    {
      id: 19,
      title: "LRU Cache",
      difficulty: "Hard",
      tags: ["Design"],
      solved: false,
    },
    {
      id: 20,
      title: "Median of Two Sorted Arrays",
      difficulty: "Hard",
      tags: ["Array"],
      solved: false,
    },
  ];
  

const allTags = ["Array", "Math", "String", "HashMap"];

const difficultyColors = {
  Easy: "bg-green-300 text-white",
  Medium: "bg-yellow-300 text-white",
  Hard: "bg-red-300 text-white",
};

// ------------------- COMPONENT -------------------
export default function ProblemsTable() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // Filtered + sorted problems
  const filteredProblems = useMemo(() => {
    let filtered = problems;

    // Search by title
    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by difficulty
    if (difficultyFilter !== "all") {
      filtered = filtered.filter((p) => p.difficulty === difficultyFilter);
    }

    // Filter by tag
    if (tagFilter !== "all") {
      filtered = filtered.filter((p) => p.tags.includes(tagFilter));
    }

    // Sort by ID
    filtered.sort((a, b) => (sortOrder === "asc" ? a.id - b.id : b.id - a.id));

    return filtered;
  }, [search, difficultyFilter, tagFilter, sortOrder]);

  return (
    <Card className="bg-background border border-white/10 shadow-md">
      {/* ------------------- HEADER ------------------- */}
      <CardHeader>
        <CardTitle>Saved Problems</CardTitle>
      </CardHeader>

      {/* ------------------- CONTROLS ------------------- */}
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          {/* Search */}
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 max-w-sm"
          />

          {/* Difficulty filter */}
          <Select onValueChange={setDifficultyFilter} defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          {/* Tag filter */}
          <Select onValueChange={setTagFilter} defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {allTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort order */}
          <Select onValueChange={setSortOrder} defaultValue="asc">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by ID" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">ID Ascending</SelectItem>
              <SelectItem value="desc">ID Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ------------------- TABLE ------------------- */}
        <div className="overflow-x-auto max-h-[400px] border-t border-white/10">
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-white/20">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Difficulty</th>
                  <th className="py-2 px-4">Type of Problem</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((p) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-2 px-4">{p.id}</td>
                    <td className="py-2 px-4">
                      <Link href={`/learn/problem/${p.id}`}>
                        <span className="text-blue-400 hover:underline cursor-pointer">
                          {p.title}
                        </span>
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      <Badge className={difficultyColors[p.difficulty]}>
                        {p.difficulty}
                      </Badge>
                    </td>
                    <td className="py-2 px-4 space-x-1">
                      {p.tags.map((tag) => (
                        <Badge key={tag} className="bg-green-600 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </td>
                    <td className="py-2 px-4">
                      {p.solved ? (
                        <Badge className="bg-green-500 text-white">Solved</Badge>
                      ) : (
                        <Badge className="bg-gray-200 text-black">Unsolved</Badge>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <Link href={`/learn/problem/${p.id}`}>
                        <Button size="sm" variant="outline">
                          Solve
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredProblems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-4">
                      No problems found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
