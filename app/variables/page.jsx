"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function VariablesLessonPage() {
  const [practiceCode, setPracticeCode] = useState(`// Try declaring your own variables here
let age = 30;
const name = "Bob";
var isStudent = false;`);

  const exampleCode = `// Examples of variables
let age = 25;
const name = "Alice";
var isStudent = true;

// Update variable
age = 26;
name = "Bob";`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <header className="mb-6">
     
     <Link href="/learn">
   
<span className="font-semibold text-black cursor-pointer hover:underline">


<h1 className="text-md font-bold text-gray-900"> <ChevronLeft className="w-5 h-5 text-gray-700" />Variables in Programming</h1>
</span>
</Link>
   
   <p className="text-gray-700 mt-1">
     Learn what variables are and how to use them, then practice coding in the editor!
   </p>
 </header>

      {/* -------------------- */}
      {/* MAIN CONTENT - TWO COLUMNS */}
      {/* -------------------- */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* -------------------- */}
        {/* PRACTICE SECTION - LEFT */}
        {/* -------------------- */}
        <div className="lg:w-1/2 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Practice</h2>
          <Card className="flex-1 h-[400px] overflow-hidden">
            <CardContent className="p-0 h-full">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={practiceCode}
                onChange={(v) => setPracticeCode(v || "")}
                options={{
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  automaticLayout: true,
                  wordWrap: "on",
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* -------------------- */}
        {/* LESSON SECTION - RIGHT */}
        {/* -------------------- */}
        <div className="lg:w-1/2 flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Lesson</h2>
          {/* Key Concepts */}
          <Card>
            <CardHeader>
              <CardTitle>Key Concepts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
              <ul className="list-disc list-inside">
                <li><b>Variable:</b> A named storage for data.</li>
                <li><b>Declaration:</b> Use <code>let</code>, <code>const</code>, or <code>var</code> in JavaScript.</li>
                <li><b>Assignment:</b> Store a value using <code>=</code>.</li>
                <li><b>Data Types:</b> Variables can store numbers, strings, booleans, objects, arrays, and more.</li>
                <li><b>Scope:</b> Determines where the variable is accessible (global or local).</li>
              </ul>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Editor
                height="200px"
                defaultLanguage="javascript"
                defaultValue={exampleCode}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  lineNumbers: "on",
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
