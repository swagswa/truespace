"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useState } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";


export default function Favorites() {
  // Пример избранных уроков
  const [lessons] = useState([
    {
      id: "1",
      title: "Создание первого AI агента",
      description: "Пошаговое руководство по созданию вашего первого ИИ помощника"
    },
    {
      id: "2",
      title: "Настройка API ключей",
      description: "Как правильно настроить и использовать API ключи для AI сервисов"
    },
    {
      id: "3",
      title: "Обучение модели",
      description: "Основы машинного обучения и тренировки AI моделей"
    }
  ]);

  const [likedLessons, setLikedLessons] = useState<Set<string>>(new Set(["1", "2", "3"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(["2"]));
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
          <motion.div 
            className="mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="inline-block mb-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
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
          </motion.div>
        </AnimatedContainer>

        {/* Lessons List */}
        <AnimatedContainer delay={0.4}>
          <div className="flex flex-col gap-3">
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <AnimatedContainer key={lesson.id} delay={0.5 + index * 0.1}>
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
                  <Link href="/lessons">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Перейти к урокам
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