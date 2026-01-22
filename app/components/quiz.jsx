"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"; // Make sure this path matches your shadcn setup

const questions = [
    {
      id: 1,
      prompt: "What is the index of the first element in most programming language arrays?",
      options: ["-1", "0", "1", "Depends on language"],
      correctIndex: 1,
    },
    {
      id: 2,
      prompt: "Which method adds an element to the end of an array in JavaScript?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correctIndex: 0,
    },
    {
      id: 3,
      prompt: "Which method removes the first element from an array?",
      options: ["shift()", "pop()", "unshift()", "splice()"],
      correctIndex: 0,
    },
    {
      id: 4,
      prompt: "How do you find the number of elements in an array?",
      options: ["array.count", "array.length", "array.size()", "array.elements"],
      correctIndex: 1,
    },
    {
      id: 5,
      prompt: "Which method creates a new array by applying a function to each element?",
      options: ["map()", "filter()", "forEach()", "reduce()"],
      correctIndex: 0,
    },
    {
      id: 6,
      prompt: "Which method removes the last element from an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correctIndex: 0,
    },
    {
      id: 7,
      prompt: "What does array.includes(value) return if the value exists in the array?",
      options: ["The index of value", "true", "false", "The value itself"],
      correctIndex: 1,
    },
    {
      id: 8,
      prompt: "Which method returns a portion of an array without modifying it?",
      options: ["slice()", "splice()", "concat()", "join()"],
      correctIndex: 0,
    },
    {
      id: 9,
      prompt: "Which method changes the contents of an array by removing or replacing existing elements?",
      options: ["splice()", "slice()", "filter()", "map()"],
      correctIndex: 0,
    },
    {
      id: 10,
      prompt: "What will be the result of ['a','b','c'].indexOf('b')?",
      options: ["0", "1", "2", "-1"],
      correctIndex: 1,
    },
  ];
  

export default function QuizDialog() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = questions.length;

  const handleOptionClick = (index) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === questions[current].correctIndex;
    setIsCorrect(correct);
    if (correct) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setIsCorrect(null);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setIsCorrect(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition">
          Take Quiz
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8">
        <DialogHeader>
          <DialogTitle>Arrays Quiz</DialogTitle>
          <DialogDescription>
            Master array basics one step at a time.
          </DialogDescription>
        </DialogHeader>
        <DialogClose className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 text-lg">
         
        </DialogClose>

        {/* Progress */}
        <div className="w-full h-2 bg-slate-200 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>

        {/* Quiz Content */}
        {finished ? (
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-3xl">
                🎉
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Quiz complete!
            </h2>
            <p className="text-slate-600 mb-4">
              You scored{" "}
              <span className="font-semibold text-emerald-600">
                {score} / {total}
              </span>
              .
            </p>
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-md transition"
            >
              Restart quiz
            </button>
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="mb-4">
              <p className="text-lg font-semibold text-slate-800 mb-2">
                {questions[current]?.prompt}
              </p>
              <p className="text-sm text-slate-500">
                Choose the best answer to continue your streak.
              </p>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-4">
              {questions[current]?.options.map((option, index) => {
                const isSelected = selected === index;
                const correctIndex = questions[current].correctIndex;

                let base =
                  "w-full text-left px-4 py-3 rounded-2xl border flex items-center gap-3 text-sm transition shadow-sm";
                let color =
                  "bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50";

                if (selected !== null) {
                  if (index === correctIndex) {
                    color =
                      "bg-emerald-50 border-emerald-500 text-emerald-800";
                  } else if (isSelected && index !== correctIndex) {
                    color = "bg-red-50 border-red-400 text-red-700";
                  } else {
                    color = "bg-slate-50 border-slate-200 text-slate-500";
                  }
                } else if (isSelected) {
                  color =
                    "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-md";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(index)}
                    className={`${base} ${color}`}
                    disabled={selected !== null}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Feedback + Next */}
            <div className="flex items-center justify-between">
              <div className="h-6 text-sm">
                {isCorrect === true && (
                  <span className="text-emerald-600 font-medium">
                    Correct! Nice work.
                  </span>
                )}
                {isCorrect === false && (
                  <span className="text-red-500 font-medium">
                    Not quite. Check the correct answer highlighted in green.
                  </span>
                )}
              </div>
              <button
                onClick={handleNext}
                disabled={selected === null}
                className={`px-5 py-2.5 rounded-2xl text-sm font-semibold shadow-md transition ${
                  selected === null
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                    : "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30"
                }`}
              >
                {current + 1 === total ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
