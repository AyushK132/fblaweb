'use client';


import { motion } from 'framer-motion';
import { Lock, Zap, Code2, Calendar, BookOpen, Settings, User, FileText, CheckCircle2, Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/app-sidebar';

const getChaptersForLanguage = (language) => {
  const paths = {
    javascript: [
      {
        id: 1,
        title: 'Fundamentals',
        desc: 'Learn the basics',
        levels: [
          { id: 1, label: 'Variables', status: 'active', xOffset: 0, xp: 100, problems: 8 },
          { id: 2, label: 'Operators', status: 'locked', xOffset: 120, xp: 120, problems: 10 },
          { id: 3, label: 'Conditionals', status: 'locked', chest: true, xOffset: -120, xp: 130, problems: 12 },
        ],
      },
      {
        id: 2,
        title: 'Control Flow',
        desc: 'Master flow control',
        levels: [
          { id: 4, label: 'Loops', status: 'locked', xOffset: -80, xp: 140, problems: 14 },
          { id: 5, label: 'Functions', status: 'locked', chest: true, xOffset: 0, xp: 160, problems: 16 },
          { id: 6, label: 'Scope', status: 'locked', xOffset: 80, xp: 150, problems: 15 },
        ],
      },
      {
        id: 3,
        title: 'Data Structures',
        desc: 'Work with data',
        levels: [
          { id: 7, label: 'Arrays', status: 'locked', xOffset: 0, xp: 170, problems: 18 },
          { id: 8, label: 'Objects', status: 'locked', xOffset: -120, xp: 180, problems: 20 },
          { id: 9, label: 'Advanced', status: 'locked', chest: true, xOffset: 120, xp: 190, problems: 22 },
        ],
      },
    ],
    python: [
      {
        id: 1,
        title: 'Basics',
        desc: 'Python fundamentals',
        levels: [
          { id: 1, label: 'Syntax', status: 'active', xOffset: 0, xp: 100, problems: 8 },
          { id: 2, label: 'Variables', status: 'locked', xOffset: 120, xp: 120, problems: 10 },
          { id: 3, label: 'Data Types', status: 'locked', chest: true, xOffset: -120, xp: 130, problems: 12 },
        ],
      },
      {
        id: 2,
        title: 'Control',
        desc: 'Control structures',
        levels: [
          { id: 4, label: 'Conditionals', status: 'locked', xOffset: -80, xp: 140, problems: 14 },
          { id: 5, label: 'Loops', status: 'locked', chest: true, xOffset: 0, xp: 160, problems: 16 },
          { id: 6, label: 'Iterators', status: 'locked', xOffset: 80, xp: 150, problems: 15 },
        ],
      },
      {
        id: 3,
        title: 'OOP',
        desc: 'Object-oriented programming',
        levels: [
          { id: 7, label: 'Classes', status: 'locked', xOffset: 0, xp: 170, problems: 18 },
          { id: 8, label: 'Methods', status: 'locked', xOffset: -120, xp: 180, problems: 20 },
          { id: 9, label: 'Inheritance', status: 'locked', chest: true, xOffset: 120, xp: 190, problems: 22 },
        ],
      },
    ],
    react: [
      {
        id: 1,
        title: 'Basics',
        desc: 'React fundamentals',
        levels: [
          { id: 1, label: 'Components', status: 'active', xOffset: 0, xp: 120, problems: 10 },
          { id: 2, label: 'JSX', status: 'locked', xOffset: 120, xp: 130, problems: 12 },
          { id: 3, label: 'Props', status: 'locked', chest: true, xOffset: -120, xp: 140, problems: 14 },
        ],
      },
      {
        id: 2,
        title: 'Hooks',
        desc: 'React hooks mastery',
        levels: [
          { id: 4, label: 'useState', status: 'locked', xOffset: -80, xp: 150, problems: 14 },
          { id: 5, label: 'useEffect', status: 'locked', chest: true, xOffset: 0, xp: 160, problems: 16 },
          { id: 6, label: 'Custom', status: 'locked', xOffset: 80, xp: 170, problems: 18 },
        ],
      },
    ],
    typescript: [
      {
        id: 1,
        title: 'Types',
        desc: 'Type system mastery',
        levels: [
          { id: 1, label: 'Basics', status: 'active', xOffset: 0, xp: 110, problems: 9 },
          { id: 2, label: 'Interfaces', status: 'locked', xOffset: 120, xp: 140, problems: 12 },
          { id: 3, label: 'Generics', status: 'locked', chest: true, xOffset: -120, xp: 170, problems: 15 },
        ],
      },
    ],
  };


  return paths[language] || paths.javascript;
};


export default function LearningRoadmap() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [completedLevels, setCompletedLevels] = useState([1]);
  const [hoveredChapter, setHoveredChapter] = useState(null);


  const chapters = getChaptersForLanguage(selectedLanguage);
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '📘' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'typescript', name: 'TypeScript', icon: '📗' },
  ];


  const totalXP = chapters.reduce((sum, chapter) => {
    return sum + chapter.levels.reduce((levelSum, level) => {
      if (completedLevels.includes(level.id)) {
        return levelSum + level.xp;
      }
      return levelSum;
    }, 0);
  }, 0);


  const totalLevels = chapters.reduce((sum, chapter) => sum + chapter.levels.length, 0);


  const toggleComplete = (levelId) => {
    setCompletedLevels(prev =>
      prev.includes(levelId) ? prev.filter(id => id !== levelId) : [...prev, levelId]
    );
  };


  const isLevelUnlocked = (levelId) => {
    if (levelId === 1) return true;
    return completedLevels.length > 0;
  };


  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <SidebarProvider>
    <AppSidebar/>
    <SidebarInset className="bg-muted/40">


      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="border-b border-gray-200 px-12 py-10 flex-shrink-0 bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Learning Path</h1>
              <p className="text-gray-500 text-sm mt-2">Master {languages.find(l => l.id === selectedLanguage)?.name}</p>
            </div>
            <div className="flex items-center gap-12">
              <motion.div
                className="text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="w-7 h-7 text-gray-700" />
                  {totalXP}
                </div>
                <p className="text-xs text-gray-500 mt-2 font-medium">XP Earned</p>
              </motion.div>
              <div className="w-px h-12 bg-gray-200"></div>
              <motion.div
                className="text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold text-gray-900">{completedLevels.length}/{totalLevels}</div>
                <p className="text-xs text-gray-500 mt-2 font-medium">Completed</p>
              </motion.div>
            </div>
          </div>


          {/* Language Selector */}
          <div className="flex gap-2">
            {languages.map(lang => (
              <motion.button
                key={lang.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedLanguage(lang.id);
                  setCompletedLevels([1]);
                }}
                className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all border ${
                  selectedLanguage === lang.id
                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {lang.icon} {lang.name}
              </motion.button>
            ))}
          </div>
        </div>


        {/* Scrollable Roadmap */}
        <div className="flex-1 overflow-y-auto relative px-20 py-16">
          {/* Animated vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-x-1/2"></div>


          {/* Chapters */}
          <div className="relative space-y-48 max-w-6xl mx-auto">
            {chapters.map((chapter, cIdx) => {
              const isLeftSide = cIdx % 2 === 0;
              const isHovered = hoveredChapter === chapter.id;


              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  className="relative"
                  onMouseEnter={() => setHoveredChapter(chapter.id)}
                  onMouseLeave={() => setHoveredChapter(null)}
                >
                  {/* Chapter Node */}
                  <div className={`flex items-center gap-20 ${isLeftSide ? 'flex-row' : 'flex-row-reverse'}`}>
                    {/* Content side */}
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, x: isLeftSide ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -4 }}
                        className={`p-8 rounded-2xl border border-gray-200 transition-all ${
                          isHovered ? 'shadow-xl bg-gray-50' : 'shadow-sm bg-white'
                        }`}
                      >
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-gray-900 mb-1">{chapter.title}</h2>
                          <p className="text-sm text-gray-500">{chapter.desc}</p>
                        </div>


                        {/* Levels in this chapter */}
                        <div className="space-y-3">
                          {chapter.levels.map((level, idx) => {
                            const isCompleted = completedLevels.includes(level.id);
                            const isUnlocked = isLevelUnlocked(level.id);


                            return (
                              <motion.div
                                key={level.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-3 group"
                              >
                                <motion.div
                                  animate={isCompleted ? { scale: [1, 1.3, 1] } : {}}
                                  transition={{ duration: 0.4 }}
                                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                                    isCompleted
                                      ? 'bg-gray-900'
                                      : isUnlocked
                                      ? 'bg-gray-400'
                                      : 'bg-gray-300'
                                  }`}
                                ></motion.div>
                                <span
                                  className={`text-sm font-medium transition-colors ${
                                    isCompleted
                                      ? 'text-gray-900 font-semibold'
                                      : isUnlocked
                                      ? 'text-gray-700'
                                      : 'text-gray-500'
                                  }`}
                                >
                                  {level.label}
                                </span>
                                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                                  {level.problems} problems
                                </span>
                                {level.chest && <span className="text-lg ml-auto">🧰</span>}
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </div>


                    {/* Center circle connector */}
                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        animate={isHovered ? { scale: 1.3 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4 rounded-full bg-gray-900 shadow-lg"
                      ></motion.div>
                    </div>


                    {/* Levels side - interactive cards */}
                    <div className="flex-1">
                      <div className="flex flex-col gap-4">
                        {chapter.levels.map((level, i) => {
                          const isCompleted = completedLevels.includes(level.id);
                          const isUnlocked = isLevelUnlocked(level.id);


                          return (
                            <Link 
                              key={level.id}
                              href={isUnlocked ? `/${level.label.toLowerCase()}` : '#'}
                              onClick={(e) => {
                                if (!isUnlocked) {
                                  e.preventDefault();
                                }
                              }}
                            >
                              <motion.button
                                initial={{ opacity: 0, x: isLeftSide ? 20 : -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => isUnlocked && toggleComplete(level.id)}
                                disabled={!isUnlocked}
                                style={{ transform: `translateX(${level.xOffset}px)` }}
                                whileHover={isUnlocked && !isCompleted ? { scale: 1.02, y: -2 } : {}}
                                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                                className={`relative px-6 py-4 rounded-xl border transition-all font-medium text-sm group w-full ${
                                  isCompleted
                                    ? 'bg-gray-900 border-gray-900 text-white shadow-lg hover:shadow-xl'
                                    : isUnlocked
                                    ? 'bg-white border-gray-200 text-gray-900 shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer'
                                    : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    {isCompleted ? (
                                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.3 }}>
                                        <CheckCircle2 className="w-5 h-5" />
                                      </motion.div>
                                    ) : isUnlocked ? (
                                      <Play className="w-5 h-5 fill-current opacity-70 group-hover:opacity-100" />
                                    ) : (
                                      <Lock className="w-5 h-5" />
                                    )}
                                    <span>{level.label}</span>
                                  </div>
                                  <motion.span
                                    animate={isCompleted ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                    className={`text-xs px-2.5 py-1 rounded font-semibold transition-all ${
                                      isCompleted
                                        ? 'bg-white/20 text-white'
                                        : isUnlocked
                                        ? 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}
                                  >
                                    {level.xp} XP
                                  </motion.span>
                                </div>
                                {level.chest && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.1 + 0.2 }}
                                    className="absolute -top-2 -right-2 text-xl"
                                  >
                                    🧰
                                  </motion.div>
                                )}
                              </motion.button>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}


            {/* Completion message */}
            {completedLevels.length === totalLevels && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl mb-6"
                >
                  🏆
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Roadmap Complete!</h3>
                <p className="text-gray-600">
                  Congratulations on mastering {languages.find(l => l.id === selectedLanguage)?.name}!
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      </SidebarInset>
      </SidebarProvider>
    </div>
  );
}