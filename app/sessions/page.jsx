'use client';


import { useState, useMemo } from 'react';
import { Search, Clock, User, Users, ArrowRight, BookOpen } from 'lucide-react';

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"
export default function SessionsPage() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentView, setCurrentView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');

  

  const sessions = [
    {
      id: 1,
      type: 'tutoring',
      title: 'JavaScript Fundamentals Live Session',
      subject: 'JavaScript',
      tutor: 'Alex Chen',
      time: '3:30 PM - 4:30 PM',
      date: 'Today',
      description: 'Master variables, functions, and ES6 syntax. Perfect for beginners.',
      participants: 12,
      maxParticipants: 20,
      live: true,
      period: 'afternoon',
    },
    {
      id: 2,
      type: 'group',
      title: 'React Hooks Debugging Group',
      subject: 'React',
      tutor: 'Study Group',
      time: '4:00 PM - 5:15 PM',
      date: 'Today',
      description: 'Work through useState, useEffect, and custom hooks challenges together.',
      participants: 8,
      maxParticipants: 15,
      live: true,
      period: 'afternoon',
    },
    {
      id: 3,
      type: 'tutoring',
      title: 'Python Data Structures Deep Dive',
      subject: 'Python',
      tutor: 'Sarah Johnson',
      time: '6:00 PM - 7:00 PM',
      date: 'Today',
      description: 'Learn lists, dictionaries, and sets with practical coding exercises.',
      participants: 18,
      maxParticipants: 25,
      live: false,
      period: 'evening',
    },
    {
      id: 4,
      type: 'group',
      title: 'SQL Query Optimization Circle',
      subject: 'SQL',
      tutor: 'Study Group',
      time: '7:00 PM - 8:30 PM',
      date: 'Today',
      description: 'Solve complex JOIN queries and optimize database performance together.',
      participants: 10,
      maxParticipants: 12,
      live: false,
      period: 'evening',
    },
    {
      id: 5,
      type: 'tutoring',
      title: 'TypeScript Advanced Patterns',
      subject: 'TypeScript',
      tutor: 'Marcus Liu',
      time: '9:00 AM - 10:00 AM',
      date: 'Tomorrow',
      description: 'Generics, interfaces, and type guards for production-grade code.',
      participants: 15,
      maxParticipants: 20,
      live: false,
      period: 'morning',
    },
    {
      id: 6,
      type: 'tutoring',
      title: 'CSS Grid & Flexbox Mastery',
      subject: 'CSS',
      tutor: 'Emma Wilson',
      time: '2:00 PM - 3:30 PM',
      date: 'Tomorrow',
      description: 'Build responsive layouts with modern CSS techniques and animations.',
      participants: 6,
      maxParticipants: 10,
      live: false,
      period: 'afternoon',
    },
    {
      id: 7,
      type: 'group',
      title: 'Next.js Full-Stack Project Build',
      subject: 'Next.js',
      tutor: 'Study Group',
      time: '5:00 PM - 6:30 PM',
      date: 'Tomorrow',
      description: 'Build a complete full-stack application with API routes and database.',
      participants: 14,
      maxParticipants: 18,
      live: false,
      period: 'afternoon',
    },
    {
      id: 8,
      type: 'group',
      title: 'Git & Version Control Workshop',
      subject: 'Git',
      tutor: 'Study Group',
      time: '10:00 AM - 11:30 AM',
      date: 'Thursday',
      description: 'Master branching, merging, and collaborative development workflows.',
      participants: 20,
      maxParticipants: 25,
      live: false,
      period: 'morning',
    },
  ];


  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      let typeMatch = true;
      if (currentFilter === 'tutoring') typeMatch = session.type === 'tutoring';
      if (currentFilter === 'group') typeMatch = session.type === 'group';
      if (currentFilter === 'upcoming') typeMatch = session.live;


      const searchMatch =
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.tutor.toLowerCase().includes(searchTerm.toLowerCase());


      const subjectMatch = !subjectFilter || session.subject === subjectFilter;
      const timeMatch = !timeFilter || session.period === timeFilter;


      return typeMatch && searchMatch && subjectMatch && timeMatch;
    });
  }, [currentFilter, searchTerm, subjectFilter, timeFilter]);


  const stats = {
    total: sessions.length,
    tutoring: sessions.filter((s) => s.type === 'tutoring').length,
    group: sessions.filter((s) => s.type === 'group').length,
  };


  const SessionCard = ({ session }) => {
    const seatsAvailable = session.maxParticipants - session.participants;
    const isFull = seatsAvailable === 0;
    const capacityPercent = (session.participants / session.maxParticipants) * 100;


    return (
      <div className="group relative bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-emerald-300">
        {/* Top accent bar */}
        <div className={`h-1.5 ${
          session.live ? 'bg-gradient-to-r from-red-400 to-pink-400'
          : session.type === 'tutoring' ? 'bg-gradient-to-r from-emerald-400 to-green-400'
          : 'bg-gradient-to-r from-blue-400 to-cyan-400'
        }`}></div>


        <div className="p-6 border-b border-emerald-50">
          <div className="flex gap-2 items-center mb-4">
            <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${
              session.live ? 'bg-red-50 text-red-700'
              : session.type === 'tutoring' ? 'bg-emerald-50 text-emerald-700'
              : 'bg-blue-50 text-blue-700'
            }`}>
              {session.live ? '🔴 Live Now' : session.type === 'tutoring' ? '👨‍💻 Tutoring' : '👥 Group'}
            </span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug">{session.title}</h2>
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            <p className="text-sm text-emerald-700 font-semibold">{session.subject}</p>
          </div>
        </div>


        <div className="p-6 flex-1 space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{session.time}</p>
                <p className="text-xs text-gray-500">{session.date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-gray-900">{session.tutor}</p>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{session.participants}/{session.maxParticipants} developers</p>
                <p className="text-xs text-gray-500">{seatsAvailable} spots available</p>
              </div>
            </div>
          </div>


          <p className="text-sm text-gray-600 leading-relaxed pt-2">{session.description}</p>


          {/* Capacity Bar */}
          <div className="pt-4">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-xs font-semibold text-gray-700">Enrollment</span>
              <span className={`text-xs font-bold ${
                capacityPercent > 80 ? 'text-red-600' : capacityPercent > 50 ? 'text-amber-600' : 'text-emerald-600'
              }`}>
                {Math.round(capacityPercent)}% Full
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  capacityPercent > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                  capacityPercent > 50 ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                  'bg-gradient-to-r from-emerald-400 to-green-500'
                }`}
                style={{ width: `${capacityPercent}%` }}
              ></div>
            </div>
          </div>
        </div>


        <div className="border-t border-emerald-50 p-6">
        <Link href="/join" className="w-full">
      <button
        className="w-full px-4 py-3 rounded-xl font-semibold transition-all text-sm flex items-center justify-center gap-2
        bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700
        shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        Join Session
        <ArrowRight className="w-4 h-4" />
      </button>
    </Link>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <SidebarProvider>
      <AppSidebar/>
      <SidebarInset className="bg-muted/40">
      <header className="h-16 border-b bg-background px-6 flex items-center gap-4">
  <SidebarTrigger className="-ml-1" />
  <h2 className="text-lg font-semibold">Sessions</h2>
  
</header>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'Available Sessions', value: stats.total, color: 'emerald' },
            { label: 'Live Tutoring', value: stats.tutoring, color: 'blue' },
            { label: 'Group Study', value: stats.group, color: 'cyan' },
          ].map((stat, i) => (
            <div key={i} className={`bg-white rounded-2xl border border-${stat.color}-100 p-7 text-center group hover:shadow-lg transition-all duration-300`}>
              <div className={`text-4xl font-bold text-${stat.color}-700 mb-2 group-hover:scale-110 transition-transform`}>{stat.value}</div>
              <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>


        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'All Sessions' },
            { value: 'tutoring', label: 'Live Tutoring' },
            { value: 'group', label: 'Group Study' },
            { value: 'upcoming', label: 'Starting Soon' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setCurrentFilter(filter.value)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                currentFilter === filter.value
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:shadow-sm'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>


        {/* Controls */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by language, tutor, or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm font-medium"
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm font-medium"
            >
              <option value="">All Languages</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="TypeScript">TypeScript</option>
              <option value="SQL">SQL</option>
              <option value="CSS">CSS</option>
              <option value="Next.js">Next.js</option>
              <option value="Git">Git</option>
            </select>


            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition-all text-sm font-medium"
            >
              <option value="">All Times</option>
              <option value="morning">Morning (6am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 6pm)</option>
              <option value="evening">Evening (6pm - 12am)</option>
            </select>


            <div className="flex gap-2">
              <button
                onClick={() => setCurrentView('grid')}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  currentView === 'grid'
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setCurrentView('list')}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  currentView === 'list'
                    ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>


        {/* Sessions Container */}
        {filteredSessions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-emerald-100 text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No Sessions Found</h3>
            <p className="text-gray-600 text-sm">Try adjusting your filters to find available coding sessions.</p>
          </div>
        ) : (
          <div className={currentView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
            {filteredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
      </SidebarInset>
      </SidebarProvider>
    </div>
  );
}



