"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronLeft, Play, Upload, Terminal, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock problem data
const PROBLEMS = {
  1: {
    title: "Concatenation of Array",
    difficulty: "Easy",
    tags: ["Array", "Simulation"],
    description: `Given an integer array nums of length n, return an array ans of length 2n where:
1. ans[i] == nums[i] for 0 <= i < n
2. ans[i + n] == nums[i] for 0 <= i < n

In other words, ans is the concatenation of two copies of nums.`,
    constraints: [
      "1 <= nums.length <= 1000",
      "1 <= nums[i] <= 1000",
    ],
    examples: [
      { input: "nums = [1,2,1]", output: "[1,2,1,1,2,1]" },
      { input: "nums = [1,3,2,1]", output: "[1,3,2,1,1,3,2,1]" },
    ],
    hints: [
      "Use a loop to copy elements twice.",
      "Consider vector push_back in C++ or array concat in JS.",
    ],
    starterCode: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> getConcatenation(vector<int>& nums) {
        // Write your code here
    }
};`,
  },
};

const LANGUAGES = ["C++", "JavaScript", "Python"];

export default function ProblemPage({ params }) {
  const problem = PROBLEMS[params.id] || PROBLEMS[1];
  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);

  const handleRun = () =>
    setOutput("✅ Code ran successfully! (Mock output)");

  const handleSubmit = () =>
    setOutput("🎉 Submission received! (Mock evaluation)");

  return (
    <div className="h-screen w-full bg-muted/20 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-background/80">
        <div className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
          <ChevronLeft className="w-5 h-5 text-gray-700" />
          <Link href="/learn">
  <span className="font-semibold text-black cursor-pointer hover:underline">
    {problem.title}
  </span>
</Link>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                {language} <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {LANGUAGES.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)}>
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            className="flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-blue-400" />
            Run
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
          >
            <Upload className="w-4 h-4" />
            Submit
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden gap-6 p-6">
        {/* Problem Panel */}
        <div className="w-1/2 flex flex-col gap-4 overflow-y-auto">
          {/* Problem Info */}
          <Card className="bg-background/80 border border-white/10 shadow-md">
            <CardHeader>
              <CardTitle>{problem.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-green-600">{problem.difficulty}</Badge>
                {problem.tags.map((tag) => (
                  <Badge key={tag} className="bg-blue-600">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardDescription className="mt-2 text-black">
                {problem.description}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Constraints */}
          <Card className="bg-muted/50 border border-white/10">
            <CardHeader className="flex items-center gap-2">
              <Info className="w-4 h-4 text-yellow-400" />
              <CardTitle className="text-sm">Constraints</CardTitle>
            </CardHeader>
            <CardContent className="pl-6 space-y-1 text-sm text-black">
              {problem.constraints.map((c, i) => (
                <p key={i}>• {c}</p>
              ))}
            </CardContent>
          </Card>

          {/* Examples */}
          <Card className="bg-muted/50 border border-white/10">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {problem.examples.map((ex, i) => (
                <Card
                  key={i}
                  className="bg-background/70 border border-white/10 p-3"
                >
                  <p className="text-sm text-black font-medium">
                    Example {i + 1}
                  </p>
                  <pre className="text-black mt-1 whitespace-pre-wrap">
Input: {ex.input}
Output: {ex.output}
                  </pre>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Editor Panel */}
        <Card className="flex-1 flex flex-col bg-background/80 border border-white/10 shadow-md">
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
            <CardDescription>Write your solution here</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language.toLowerCase() === "c++" ? "cpp" : language.toLowerCase()}
              value={code}
              onChange={(v) => setCode(v || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Console / Output */}
      {output && (
        <Card className="m-6 bg-background/70 border border-white/10 shadow-md">
          <CardHeader className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <CardTitle className="text-sm">Console Output</CardTitle>
          </CardHeader>
          <CardContent className="font-mono text-sm text-gray-200">
            {output}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
