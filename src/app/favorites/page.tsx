"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useState } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";


export default function Favorites() {
  // Пример избранных уроков по категориям
  const [lessonsByCategory] = useState({
    "beginners": [
      {
        id: "1",
        title: "Введение в ИИ",
        description: "Основы искусственного интеллекта для начинающих",
        category: "Для начинающих"
      },
      {
        id: "2",
        title: "Первые шаги в ML",
        description: "Знакомство с машинным обучением",
        category: "Для начинающих"
      }
    ],
    "ai-agents": [
      {
        id: "3",
        title: "Создание первого AI агента",
        description: "Пошаговое руководство по созданию вашего первого ИИ помощника",
        category: "AI Агенты"
      },
      {
        id: "4",
        title: "Настройка API ключей",
        description: "Как правильно настроить и использовать API ключи для AI сервисов",
        category: "AI Агенты"
      }
    ],
    "no-code": [
      {
        id: "5",
        title: "Zapier для автоматизации",
        description: "Создание автоматизированных процессов без кода",
        category: "No-Code"
      }
    ],
    "graphic-ai": [
      {
        id: "6",
        title: "Генерация изображений",
        description: "Создание изображений с помощью ИИ",
        category: "Графический ИИ"
      }
    ],
    "webinars": [
      {
        id: "7",
        title: "Мастер-класс по ИИ",
        description: "Практические навыки работы с ИИ",
        category: "Вебинары"
      }
    ]
  });

  // Объединяем все уроки для состояний
  const allLessons = Object.values(lessonsByCategory).flat();

  const [likedLessons, setLikedLessons] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5", "6", "7"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(["2", "4", "6"]));
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
      <div className="w-full max-w-sm">
        {/* Header */}
        <AnimatedContainer delay={0.1}>
          <div className="mb-6">
            <Link href="/" className="inline-block mb-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </motion.svg>
            </Link>
            <div className="text-center">
            <AnimatedContainer delay={0.2}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.svg 
                  className="w-6 h-6 text-red-500" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Избранные уроки
                </h1>
              </div>
            </AnimatedContainer>
            <AnimatedContainer delay={0.3}>
              <p className="text-white/80 text-sm mb-6">
                Ваши сохраненные уроки
              </p>
            </AnimatedContainer>
            </div>
          </div>
        </AnimatedContainer>

        {/* Lessons by Categories */}
        <AnimatedContainer delay={0.4}>
          <div className="flex flex-col gap-6">
            {Object.entries(lessonsByCategory).map(([categoryKey, lessons], categoryIndex) => {
              if (lessons.length === 0) return null;
              
              const categoryNames = {
                "beginners": "Для начинающих",
                "ai-agents": "AI Агенты", 
                "no-code": "No-Code",
                "graphic-ai": "Графический ИИ",
                "webinars": "Вебинары"
              };
              
              return (
                <div key={categoryKey}>
                  {/* Category Header */}
                   <AnimatedContainer delay={0.5 + categoryIndex * 0.1}>
                     <div className="mb-4">
                       <div className="flex items-center gap-3 mb-3">
                          {categoryKey === 'beginners' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                            </svg>
                          )}
                          {categoryKey === 'ai-agents' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                          )}
                          {categoryKey === 'no-code' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          )}
                          {categoryKey === 'graphic-ai' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          )}
                          {categoryKey === 'webinars' && (
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                            </svg>
                          )}
                          <h2 className="text-white text-lg font-semibold">
                            {categoryNames[categoryKey as keyof typeof categoryNames]}
                          </h2>
                        </div>
                       <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                     </div>
                   </AnimatedContainer>
                  
                  {/* Category Lessons */}
                  <div className="flex flex-col gap-3 mb-4">
                    {lessons.map((lesson, lessonIndex) => (
                      <AnimatedContainer key={lesson.id} delay={0.6 + categoryIndex * 0.1 + lessonIndex * 0.05}>
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
                    ))}
                  </div>
                </div>
              );
            })}
            
            {allLessons.length === 0 && (
              <AnimatedContainer delay={0.5}>
                <div className="text-center py-12">
                  <motion.svg 
                    className="w-16 h-16 text-white/40 mx-auto mb-4" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </motion.svg>
                  <p className="text-white/60 text-sm">
                    У вас пока нет избранных уроков
                  </p>
                  <Link href="/">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Перейти к курсам
                      </button>
                    </motion.div>
                  </Link>
                </div>
              </AnimatedContainer>
            )}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}