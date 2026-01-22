'use client';


import { useState } from 'react';
import { ArrowLeft, Clock, BookOpen, Share2, Heart, CheckCircle, Users, Zap } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';


const sessionsData = [
  {
    id: 1,
    type: 'tutoring',
    title: 'JavaScript Fundamentals Live Session',
    subject: 'JavaScript',
    tutor: 'Alex Chen',
    tutorImage: 'AC',
    time: '3:30 PM - 4:30 PM',
    date: 'Today',
    description: 'Master variables, functions, and ES6 syntax. Perfect for beginners.',
    fullDescription: 'This comprehensive session covers all the fundamentals of JavaScript. You\'ll learn about variables, data types, functions, scope, and ES6+ syntax. We\'ll work through practical examples and build a small project together. Perfect for anyone starting their coding journey.',
    participants: 12,
    maxParticipants: 20,
    live: true,
    period: 'afternoon',
    duration: '1 hour',
    level: 'Beginner',
    tags: ['Variables', 'Functions', 'ES6', 'Syntax'],
    tagColors: ['bg-yellow-50 text-yellow-700 border-yellow-200', 'bg-blue-50 text-blue-700 border-blue-200', 'bg-purple-50 text-purple-700 border-purple-200', 'bg-pink-50 text-pink-700 border-pink-200'],
    requirements: 'Basic computer skills, text editor (VS Code recommended)',
    whatYouLearn: [
      'Understand JavaScript fundamentals',
      'Work with variables and data types',
      'Create and use functions effectively',
      'Master scope and closures',
      'Write clean and readable code'
    ],
  },
  {
    id: 2,
    type: 'group',
    title: 'React Hooks Debugging Group',
    subject: 'React',
    tutor: 'Study Group',
    tutorImage: 'SG',
    time: '4:00 PM - 5:15 PM',
    date: 'Today',
    description: 'Work through useState, useEffect, and custom hooks challenges together.',
    fullDescription: 'Join our collaborative debugging session where we solve real-world React Hooks problems together. We\'ll tackle useState, useEffect, useContext, and custom hooks. Perfect for developers who want to deepen their React knowledge through peer learning.',
    participants: 8,
    maxParticipants: 15,
    live: true,
    period: 'afternoon',
    duration: '1 hour 15 minutes',
    level: 'Intermediate',
    tags: ['React', 'Hooks', 'useState', 'useEffect', 'Custom Hooks'],
    tagColors: ['bg-cyan-50 text-cyan-700 border-cyan-200', 'bg-indigo-50 text-indigo-700 border-indigo-200', 'bg-orange-50 text-orange-700 border-orange-200', 'bg-rose-50 text-rose-700 border-rose-200', 'bg-teal-50 text-teal-700 border-teal-200'],
    requirements: 'Knowledge of React basics, familiar with functional components',
    whatYouLearn: [
      'Master useState and useEffect hooks',
      'Create custom hooks',
      'Handle complex state management',
      'Debug common React issues',
      'Best practices for React development'
    ],
  },
  {
    id: 3,
    type: 'tutoring',
    title: 'Python Data Structures Deep Dive',
    subject: 'Python',
    tutor: 'Sarah Johnson',
    tutorImage: 'SJ',
    time: '6:00 PM - 7:00 PM',
    date: 'Today',
    description: 'Learn lists, dictionaries, and sets with practical coding exercises.',
    fullDescription: 'Explore Python\'s powerful data structures in depth. We\'ll cover lists, tuples, dictionaries, sets, and their operations. You\'ll understand when and how to use each structure for optimal performance. Includes hands-on exercises and real-world applications.',
    participants: 18,
    maxParticipants: 25,
    live: false,
    period: 'evening',
    duration: '1 hour',
    level: 'Intermediate',
    tags: ['Python', 'Lists', 'Dictionaries', 'Sets', 'Data Structures'],
    tagColors: ['bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-blue-50 text-blue-700 border-blue-200', 'bg-amber-50 text-amber-700 border-amber-200', 'bg-violet-50 text-violet-700 border-violet-200', 'bg-lime-50 text-lime-700 border-lime-200'],
    requirements: 'Python basics knowledge, familiarity with loops and conditionals',
    whatYouLearn: [
      'Master Python data structures',
      'Understand time and space complexity',
      'Work with lists, dictionaries, and sets',
      'Optimize your data handling',
      'Apply to real-world problems'
    ],
  },
  {
    id: 4,
    type: 'group',
    title: 'SQL Query Optimization Circle',
    subject: 'SQL',
    tutor: 'Study Group',
    tutorImage: 'SG',
    time: '7:00 PM - 8:30 PM',
    date: 'Today',
    description: 'Solve complex JOIN queries and optimize database performance together.',
    fullDescription: 'A collaborative session focused on advanced SQL queries and optimization techniques. We\'ll work through complex JOINs, subqueries, indexing, and performance tuning. Great for developers looking to write efficient database queries.',
    participants: 10,
    maxParticipants: 12,
    live: false,
    period: 'evening',
    duration: '1 hour 30 minutes',
    level: 'Advanced',
    tags: ['SQL', 'JOINs', 'Optimization', 'Database', 'Performance'],
    tagColors: ['bg-red-50 text-red-700 border-red-200', 'bg-orange-50 text-orange-700 border-orange-200', 'bg-yellow-50 text-yellow-700 border-yellow-200', 'bg-green-50 text-green-700 border-green-200', 'bg-blue-50 text-blue-700 border-blue-200'],
    requirements: 'SQL basics, understanding of relational databases',
    whatYouLearn: [
      'Write complex SQL queries',
      'Optimize query performance',
      'Master JOIN operations',
      'Use indexing effectively',
      'Handle large datasets efficiently'
    ],
  },
  {
    id: 5,
    type: 'tutoring',
    title: 'TypeScript Advanced Patterns',
    subject: 'TypeScript',
    tutor: 'Marcus Liu',
    tutorImage: 'ML',
    time: '9:00 AM - 10:00 AM',
    date: 'Tomorrow',
    description: 'Generics, interfaces, and type guards for production-grade code.',
    fullDescription: 'Dive deep into advanced TypeScript features. We\'ll explore generics, advanced interfaces, type guards, decorators, and utility types. Learn how to write type-safe, scalable code for enterprise applications.',
    participants: 15,
    maxParticipants: 20,
    live: false,
    period: 'morning',
    duration: '1 hour',
    level: 'Advanced',
    tags: ['TypeScript', 'Generics', 'Interfaces', 'Type Guards', 'Advanced'],
    tagColors: ['bg-blue-50 text-blue-700 border-blue-200', 'bg-indigo-50 text-indigo-700 border-indigo-200', 'bg-purple-50 text-purple-700 border-purple-200', 'bg-pink-50 text-pink-700 border-pink-200', 'bg-rose-50 text-rose-700 border-rose-200'],
    requirements: 'JavaScript knowledge, basic TypeScript experience',
    whatYouLearn: [
      'Master generics and advanced types',
      'Write type-safe code',
      'Use decorators and utility types',
      'Implement design patterns in TypeScript',
      'Build enterprise-grade applications'
    ],
  },
  {
    id: 6,
    type: 'tutoring',
    title: 'CSS Grid & Flexbox Mastery',
    subject: 'CSS',
    tutor: 'Emma Wilson',
    tutorImage: 'EW',
    time: '2:00 PM - 3:30 PM',
    date: 'Tomorrow',
    description: 'Build responsive layouts with modern CSS techniques and animations.',
    fullDescription: 'Master modern CSS layout techniques. We\'ll cover Flexbox and CSS Grid in detail, with practical examples of building responsive layouts. Learn animations, transitions, and best practices for modern web design.',
    participants: 6,
    maxParticipants: 10,
    live: false,
    period: 'afternoon',
    duration: '1 hour 30 minutes',
    level: 'Beginner',
    tags: ['CSS', 'Flexbox', 'Grid', 'Responsive', 'Design'],
    tagColors: ['bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', 'bg-cyan-50 text-cyan-700 border-cyan-200', 'bg-lime-50 text-lime-700 border-lime-200', 'bg-sky-50 text-sky-700 border-sky-200', 'bg-amber-50 text-amber-700 border-amber-200'],
    requirements: 'Basic HTML and CSS knowledge',
    whatYouLearn: [
      'Master Flexbox layout',
      'Build with CSS Grid',
      'Create responsive designs',
      'Add animations and transitions',
      'Design modern websites'
    ],
  },
  {
    id: 7,
    type: 'group',
    title: 'Next.js Full-Stack Project Build',
    subject: 'Next.js',
    tutor: 'Study Group',
    tutorImage: 'SG',
    time: '5:00 PM - 6:30 PM',
    date: 'Tomorrow',
    description: 'Build a complete full-stack application with API routes and database.',
    fullDescription: 'Build a complete full-stack application using Next.js. We\'ll create API routes, connect to a database, implement authentication, and deploy. Perfect for developers wanting to build end-to-end projects.',
    participants: 14,
    maxParticipants: 18,
    live: false,
    period: 'afternoon',
    duration: '1 hour 30 minutes',
    level: 'Intermediate',
    tags: ['Next.js', 'Full-Stack', 'API', 'Database', 'Deployment'],
    tagColors: ['bg-slate-50 text-slate-700 border-slate-200', 'bg-zinc-50 text-zinc-700 border-zinc-200', 'bg-stone-50 text-stone-700 border-stone-200', 'bg-emerald-50 text-emerald-700 border-emerald-200', 'bg-teal-50 text-teal-700 border-teal-200'],
    requirements: 'React knowledge, JavaScript experience',
    whatYouLearn: [
      'Build with Next.js',
      'Create API routes',
      'Implement authentication',
      'Connect to databases',
      'Deploy applications'
    ],
  },
  {
    id: 8,
    type: 'group',
    title: 'Git & Version Control Workshop',
    subject: 'Git',
    tutor: 'Study Group',
    tutorImage: 'SG',
    time: '10:00 AM - 11:30 AM',
    date: 'Thursday',
    description: 'Master branching, merging, and collaborative development workflows.',
    fullDescription: 'Learn Git and version control best practices. We\'ll cover branching, merging, rebasing, and collaborative workflows. Essential for any developer working in teams or on open-source projects.',
    participants: 20,
    maxParticipants: 25,
    live: false,
    period: 'morning',
    duration: '1 hour 30 minutes',
    level: 'Beginner',
    tags: ['Git', 'Version Control', 'Branching', 'Collaboration', 'Workflow'],
    tagColors: ['bg-orange-50 text-orange-700 border-orange-200', 'bg-red-50 text-red-700 border-red-200', 'bg-yellow-50 text-yellow-700 border-yellow-200', 'bg-green-50 text-green-700 border-green-200', 'bg-blue-50 text-blue-700 border-blue-200'],
    requirements: 'Basic command line knowledge',
    whatYouLearn: [
      'Understand version control',
      'Master Git commands',
      'Manage branches effectively',
      'Resolve merge conflicts',
      'Collaborate with teams'
    ],
  },
];


export default function SessionDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = parseInt(searchParams.get('id') || '1');
  const [isLiked, setIsLiked] = useState(false);


  const session = sessionsData.find(s => s.id === sessionId);


  if (!session) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Session Not Found</h1>
          <p className="text-gray-600 mb-6">The session you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }


  const seatsAvailable = session.maxParticipants - session.participants;
  const isFull = seatsAvailable === 0;
  const capacityPercent = (session.participants / session.maxParticipants) * 100;


  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              session.live ? 'bg-red-50 text-red-700'
              : session.type === 'tutoring' ? 'bg-emerald-50 text-emerald-700'
              : 'bg-blue-50 text-blue-700'
            }`}>
              {session.live ? '🔴 Live' : session.level}
            </span>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Title & Quick Info */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">{session.title}</h1>
         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Subject</p>
              <p className="text-lg font-bold text-gray-900">{session.subject}</p>
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-lg font-bold text-gray-900">{session.duration}</p>
            </div>
            <div className="bg-amber-50 rounded-xl border border-amber-100 p-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Level</p>
              <p className="text-lg font-bold text-gray-900">{session.level}</p>
            </div>
            <div className="bg-purple-50 rounded-xl border border-purple-100 p-4">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">When</p>
              <p className="text-lg font-bold text-gray-900">{session.date}</p>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{session.fullDescription}</p>
            </div>


            {/* What You'll Learn */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-600" />
                What You'll Learn
              </h2>
              <div className="space-y-3">
                {session.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-700" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>


            {/* Instructor */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-2xl">
                  {session.tutorImage}
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{session.tutor}</p>
                  <p className="text-emerald-700 font-semibold">Expert Instructor</p>
                </div>
              </div>
            </div>


            {/* Requirements & Topics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Prerequisites</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-900 text-sm">
                  {session.requirements}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {session.tags.map((tag, index) => (
                    <span key={index} className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${session.tagColors[index]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-lg">
              {/* Accent bar */}
              <div className={`h-2 ${
                session.live ? 'bg-gradient-to-r from-red-400 to-pink-400'
                : session.type === 'tutoring' ? 'bg-gradient-to-r from-emerald-400 to-green-400'
                : 'bg-gradient-to-r from-blue-400 to-cyan-400'
              }`}></div>


              <div className="p-6 space-y-6">
                {/* Schedule */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Scheduled For</p>
                  <p className="text-lg font-bold text-gray-900">{session.time}</p>
                  <p className="text-sm text-gray-500">{session.date}</p>
                </div>


                {/* Enrollment */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-semibold text-gray-700">Enrollment</p>
                    <p className="text-sm font-bold text-emerald-700">{session.participants}/{session.maxParticipants}</p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all ${
                        capacityPercent > 80 ? 'bg-red-500' :
                        capacityPercent > 50 ? 'bg-amber-500' :
                        'bg-emerald-500'
                      }`}
                      style={{ width: `${capacityPercent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{seatsAvailable} spots left</p>
                </div>


                {/* Buttons */}
                <div className="border-t border-gray-100 pt-6 space-y-3">
                  <button
                    disabled={isFull}
                    className={`w-full px-4 py-3 rounded-lg font-bold transition-all ${
                      isFull
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 transform hover:scale-105'
                    }`}
                  >
                    {isFull ? 'Session Full' : 'Join Session'}
                  </button>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-full px-4 py-3 rounded-lg font-semibold transition-all border-2 flex items-center justify-center gap-2 ${
                      isLiked
                        ? 'bg-red-50 border-red-300 text-red-700'
                        : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    {isLiked ? 'Saved' : 'Save'}
                  </button>
                  <button className="w-full px-4 py-3 rounded-lg font-semibold border-2 border-gray-200 text-gray-700 hover:border-emerald-300 flex items-center justify-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


