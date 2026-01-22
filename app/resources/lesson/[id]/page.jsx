"use client";

import { useParams } from "next/navigation";
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

import Image from "next/image";


// --------------------------------------------------------------------------
// MOCK LESSON CONTENT (in-depth with images, code, examples)
// --------------------------------------------------------------------------

const LESSONS = [
  {
    id: 1,
    title: "Introduction to Arrays",
    content: [
      { type: "heading", text: "What is an Array?" },
      {
        type: "paragraph",
        text: "An array is a collection of elements stored in contiguous memory locations. Arrays allow you to store multiple values in a single variable and access them via indices.",
      },
      {
        type: "image",
        src: "/image.png",
        alt: "Array diagram",
        caption: "Illustration of an array with indices from 0 to 4.",
      },
      {
        type: "list",
        items: [
          "Arrays are indexed starting from 0.",
          "They can store integers, strings, or objects.",
          "Accessing elements is fast (O(1) time).",
          "Arrays are static in size in some languages (like C) and dynamic in others (like JavaScript).",
        ],
      },
      { type: "heading", text: "Creating Arrays in JavaScript" },
      {
        type: "paragraph",
        text: "You can create arrays using literal notation or the Array constructor.",
      },
      {
        type: "code",
        language: "javascript",
        code: `// Using array literal
const fruits = ["Apple", "Banana", "Cherry"];

// Using Array constructor
const numbers = new Array(5); // creates [undefined, undefined, undefined, undefined, undefined]`,
      },
      { type: "heading", text: "Accessing Elements" },
      {
        type: "paragraph",
        text: "You can access array elements using their index:",
      },
      {
        type: "code",
        language: "javascript",
        code: `console.log(fruits[0]); // Output: Apple
console.log(fruits[2]); // Output: Cherry`,
      },
      { type: "heading", text: "Modifying Arrays" },
      {
        type: "paragraph",
        text: "Arrays can be modified by assigning new values or using built-in methods:",
      },
      {
        type: "code",
        language: "javascript",
        code: `fruits[1] = "Blueberry";  // replaces "Banana" with "Blueberry"
fruits.push("Dragonfruit");   // adds new element at the end
fruits.pop();                 // removes last element
fruits.unshift("Mango");      // adds element at the start`,
      },
      { type: "heading", text: "Iterating Through Arrays" },
      {
        type: "paragraph",
        text: "You can loop through arrays using different methods:",
      },
      {
        type: "list",
        items: [
          "For loop",
          "forEach method",
          "map method",
          "for...of loop",
        ],
      },
      {
        type: "code",
        language: "javascript",
        code: `// Using for loop
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Using forEach
fruits.forEach(fruit => console.log(fruit));

// Using map
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log(upperFruits);`,
      },
      { type: "heading", text: "Common Array Methods" },
      {
        type: "paragraph",
        text: "JavaScript provides several built-in methods to manipulate arrays:",
      },
      {
        type: "list",
        items: [
          "push(), pop(), shift(), unshift()",
          "slice(), splice()",
          "indexOf(), includes()",
          "map(), filter(), reduce()",
          "sort(), reverse()",
        ],
      },
      { type: "heading", text: "Multidimensional Arrays" },
      {
        type: "paragraph",
        text: "Arrays can have multiple dimensions, useful for matrices or grids.",
      },
      {
        type: "code",
        language: "javascript",
        code: `const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[1][2]); // Output: 6`,
      },
      {
        type: "image",
        src: "/image copy.png",
        alt: "Matrix diagram",
        caption: "Illustration of a 3x3 matrix and how to access elements.",
      },
      { type: "heading", text: "Use Cases of Arrays" },
      {
        type: "paragraph",
        text: "Arrays are foundational for many data structures and algorithms, such as stacks, queues, sorting, searching, and dynamic programming.",
      },
      {
        type: "list",
        items: [
          "Storing lists of data (names, scores, etc.)",
          "Implementing other data structures (Stack, Queue, Heap)",
          "Sorting and searching algorithms",
          "Matrix computations and grid-based problems",
        ],
      },
      { type: "heading", text: "Summary" },
      {
        type: "paragraph",
        text: "Arrays are a core concept in programming. Mastering them allows you to handle data efficiently and forms the basis for more advanced data structures.",
      },
    ],
  },
  {
    id: 2,
    title: "Array Methods and Utilities",
    content: [
      { type: "heading", text: "Array Manipulation Methods" },
      {
        type: "list",
        items: [
          "push(): add element at the end",
          "pop(): remove last element",
          "shift(): remove first element",
          "unshift(): add element at the start",
          "splice(): add/remove elements at specific positions",
          "slice(): extract a section of an array",
          "concat(): merge arrays",
        ],
      },
      { type: "heading", text: "Searching in Arrays" },
      {
        type: "paragraph",
        text: "Use indexOf, includes, find, and findIndex to search arrays effectively.",
      },
      {
        type: "code",
        language: "javascript",
        code: `const numbers = [10, 20, 30, 40];
console.log(numbers.indexOf(20)); // Output: 1
console.log(numbers.includes(50)); // Output: false
const found = numbers.find(n => n > 25);
console.log(found); // Output: 30`,
      },
      { type: "heading", text: "Sorting Arrays" },
      {
        type: "paragraph",
        text: "Use sort() with a compare function for numerical or custom sorting:",
      },
      {
        type: "code",
        language: "javascript",
        code: `const nums = [3, 1, 4, 2];
nums.sort((a, b) => a - b); // [1, 2, 3, 4]

const words = ["banana", "apple", "cherry"];
words.sort(); // ["apple", "banana", "cherry"]`,
      },
      {
        type: "heading",
        text: "Higher-Order Methods",
      },
      {
        type: "list",
        items: [
          "map(): transform elements",
          "filter(): select elements based on condition",
          "reduce(): accumulate values",
        ],
      },
      {
        type: "code",
        language: "javascript",
        code: `const arr = [1,2,3,4];
const doubled = arr.map(x => x*2); // [2,4,6,8]
const evens = arr.filter(x => x%2===0); // [2,4]
const sum = arr.reduce((acc, x) => acc + x, 0); // 10`,
      },
    ],
  },
];

// --------------------------------------------------------------------------
// LESSON PAGE
// --------------------------------------------------------------------------

export default function LessonPage() {
  const params = useParams();
  const { id } = params;

  const lesson = LESSONS.find((l) => l.id === parseInt(id));
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

        <Sidebar/>

      <main className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-700 mb-6">{lesson.title}</h1>

        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          {lesson.content.map((block, idx) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2 key={idx} className="text-2xl font-semibold text-gray-800 mt-6">
                    {block.text}
                  </h2>
                );
              case "paragraph":
                return (
                  <p key={idx} className="text-gray-700 text-base leading-relaxed">
                    {block.text}
                  </p>
                );
              case "list":
                return (
                  <ul key={idx} className="list-disc pl-6 text-gray-700 space-y-1">
                    {block.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                );
              case "code":
                return (
                  <pre
                    key={idx}
                    className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm"
                  >
                    <code>{block.code}</code>
                  </pre>
                );
              case "image":
                return (
                  <div key={idx} className="text-center">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      width={500}
                      height={300}
                      className="mx-auto rounded-lg"
                    />
                    {block.caption && (
                      <p className="text-gray-500 text-sm mt-1">{block.caption}</p>
                    )}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </main>
    </div>
  );
}


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
