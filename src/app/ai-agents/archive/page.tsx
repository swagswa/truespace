"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function AIAgentsArchive() {
  const [lessons, setLessons] = useState([
    {
      id: "1",
      title: "История развития AI агентов",
      description: "Обзор эволюции искусственного интеллекта от простых алгоритмов до современных агентов. Ключевые вехи и прорывы в области AI.",
      liked: false,
      completed: false,
      isExpanded: false,
    }
  ]);

  const [likedLessons, setLikedLessons] = useState<Set<string>>(new Set());
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleCompleted = (id: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <AnimatedContainer delay={0.1} direction="left">
            <Link href="/ai-agents" className="inline-block mb-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ x: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </motion.svg>
            </Link>
          </AnimatedContainer>
          <div className="text-center">
          <AnimatedContainer delay={0.3} direction="up">
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ rotate: -5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </motion.svg>
              <h1 className="text-2xl font-bold text-white">
                Архив уроков
              </h1>
            </div>
          </AnimatedContainer>
          <AnimatedContainer delay={0.5} direction="up">
            <p className="text-white/80 text-sm mb-6">
              Все предыдущие уроки и материалы по AI агентам
            </p>
          </AnimatedContainer>
          </div>
        </div>

        {/* Lessons List */}
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <AnimatedContainer key={lesson.id} delay={0.9 + index * 0.1} direction="up">
                <LessonCard
                  lesson={lesson}
                  isLiked={likedLessons.has(lesson.id)}
                  isCompleted={completedLessons.has(lesson.id)}
                  isExpanded={expandedLessons.has(lesson.id)}
                  onToggleLike={() => toggleLike(lesson.id)}
                  onToggleComplete={() => toggleCompleted(lesson.id)}
                  onToggleExpand={() => toggleExpanded(lesson.id)}
                />
              </AnimatedContainer>
          ))
        ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <AnimatedContainer delay={1.1} direction="up">
                <motion.svg 
                  className="w-16 h-16 text-white/40 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </motion.svg>
                <h3 className="text-white/60 text-lg font-medium mb-2">Нет уроков</h3>
                <p className="text-white/40 text-sm">Уроки появятся здесь, когда вы их добавите</p>
              </AnimatedContainer>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}