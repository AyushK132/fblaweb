"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { ChevronLeft, Play, Upload } from "lucide-react";

// Mock problem data
const PROBLEMS = {
  1: {
    title: "Concatenation of Array",
    description: `Given an integer array nums of length n, you want to create an array ans of length 2n where ans[i] == nums[i]
and ans[i + n] == nums[i] for 0 <= i < n. Specifically, ans is the concatenation of two nums arrays.`,
    examples: [
      { input: "nums = [1,2,1]", output: "[1,2,1,1,2,1]" },
      { input: "nums = [1,3,2,1]", output: "[1,3,2,1,1,3,2,1]" },
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
  2: {
    title: "Sum of Even Numbers",
    description: "Given an array of integers, return the sum of all even numbers.",
    examples: [
      { input: "[1,2,3,4]", output: "6" },
      { input: "[10,15,20]", output: "30" },
    ],
    starterCode: `function sumEvenNumbers(arr) {
  // Write your code here
}`,
  },
};

export default function ProblemPage({ params }) {
  const problemId = params.id;
  const problem = PROBLEMS[problemId] || PROBLEMS[1];

  const [code, setCode] = useState(problem.starterCode);
  const [output, setOutput] = useState("");

  const handleRun = () => {
    // Mock run
    setOutput("✅ Code ran successfully! (This is a mock run output)");
  };

  const handleSubmit = () => {
    // Mock submit
    setOutput("🎉 Submission received! (Mock evaluation)");
  };

  return (
    <div className="h-screen w-full bg-[#1e1e1e] text-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-red-400 font-medium">{problem.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRun}
            className="flex items-center gap-1 bg-[#2a2a2a] px-3 py-1 rounded text-sm hover:bg-[#3a3a3a] transition"
          >
            <Play className="w-4 h-4" /> Run
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700 transition"
          >
            <Upload className="w-4 h-4" /> Submit
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 border-r border-[#2a2a2a] overflow-y-auto p-6 space-y-4">
          <h1 className="text-xl font-semibold">{problem.title}</h1>
          <p className="text-sm text-gray-300">{problem.description}</p>

          {problem.examples.map((ex, idx) => (
            <div key={idx} className="text-sm text-gray-400">
              <p className="font-semibold text-gray-200">Example {idx + 1}:</p>
              <pre className="bg-[#111] p-3 rounded mt-1">
                Input: {ex.input}
                <br />
                Output: {ex.output}
              </pre>
            </div>
          ))}
        </div>

        {/* Right Panel - Monaco Editor */}
        <div className="w-1/2 bg-[#1e1e1e]">
          <Editor
            height="100%"
            defaultLanguage={problem.starterCode.includes("#include") ? "cpp" : "javascript"}
            theme="vs-dark"
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
        </div>
      </div>

      {/* Output Console */}
      {output && (
        <div className="bg-[#111] text-gray-100 font-mono text-sm p-4 border-t border-[#2a2a2a]">
          {output}
        </div>
      )}
    </div>
  );
}
