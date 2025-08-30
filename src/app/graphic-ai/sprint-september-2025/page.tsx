"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useState } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";

export default function GraphicAISprint() {
  const [lessons] = useState([
    {
      id: "1",
      title: "Введение в графический ИИ",
      description: "Основы генеративного искусственного интеллекта для создания изображений. Обзор популярных моделей: DALL-E, Midjourney, Stable Diffusion.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "2",
      title: "Работа с Midjourney",
      description: "Создание качественных изображений с помощью Midjourney. Изучение промптов, параметров и стилей. Техники улучшения результатов.",
      liked: true,
      completed: true,
      isExpanded: false,
    },
    {
      id: "3",
      title: "Stable Diffusion и локальная генерация",
      description: "Установка и настройка Stable Diffusion на локальном компьютере. Работа с различными моделями и LoRA. Создание собственных стилей.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "4",
      title: "Техники промптинга",
      description: "Искусство создания эффективных промптов для генерации изображений. Использование ключевых слов, стилей и модификаторов для достижения желаемого результата.",
      liked: true,
      completed: false,
      isExpanded: false,
    },
    {
      id: "5",
      title: "Обработка и редактирование ИИ-изображений",
      description: "Постобработка сгенерированных изображений. Использование inpainting, outpainting и других техник для улучшения и модификации результатов.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "6",
      title: "Коммерческое использование ИИ-графики",
      description: "Правовые аспекты использования ИИ-генерированных изображений. Создание контента для бизнеса, маркетинга и дизайна с помощью ИИ.",
      liked: false,
      completed: true,
      isExpanded: false,
    },
  ]);

  const [likedLessons, setLikedLessons] = useState<Set<string>>(new Set(["2"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(["2", "6"]));
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
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <AnimatedContainer delay={0.1}>
          <div className="mb-4">
            <Link href="/graphic-ai" className="inline-block mb-6 mt-4">
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
                    className="w-6 h-6 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </motion.svg>
                  <h1 className="text-2xl font-bold text-white">
                    Спринт Сентябрь 2025
                  </h1>
                </div>
              </AnimatedContainer>
              <AnimatedContainer delay={0.3}>
                <p className="text-white/80 text-sm mb-6">
                  Актуальные уроки по графическому ИИ
                </p>
              </AnimatedContainer>
            </div>
          </div>
        </AnimatedContainer>

        {/* Lessons List */}
        <AnimatedContainer delay={0.4}>
          <div className="flex flex-col gap-3">
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <AnimatedContainer key={lesson.id} delay={0.5 + index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                <LessonCard
                  lesson={lesson}
                  isLiked={likedLessons.has(lesson.id)}
                  isCompleted={completedLessons.has(lesson.id)}
                  isExpanded={expandedLessons.has(lesson.id)}
                  onToggleLike={() => toggleLike(lesson.id)}
                  onToggleComplete={() => toggleCompleted(lesson.id)}
                  onToggleExpand={() => toggleExpanded(lesson.id)}
                />
                  </motion.div>
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
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </motion.svg>
                  <h3 className="text-white/60 text-lg font-medium mb-2">Нет уроков</h3>
                  <p className="text-white/40 text-sm">Уроки появятся здесь, когда вы их добавите</p>
                </div>
              </AnimatedContainer>
            )}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}