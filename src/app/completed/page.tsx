"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Completed() {
  // Пример завершенных уроков
  const [lessonsByCategory] = useState({
    beginners: [
      {
        id: "1",
        title: "Основы программирования",
        description: "Изучите основные концепции программирования",
        duration: "45 мин",
        level: "Начинающий",
        category: "Beginners",
        isExpanded: false,
        liked: true,
        completed: true,
        completedDate: "15 янв 2024",
        rating: 5,
        videoUrl: "https://example.com/video1",
        materials: [
          { name: "Презентация", url: "https://example.com/slides1" },
          { name: "Код примеров", url: "https://example.com/code1" }
        ]
      }
    ],
    "ai-agents": [
      {
        id: "2",
        title: "Создание AI агентов",
        description: "Практическое руководство по созданию AI агентов",
        duration: "60 мин",
        level: "Средний",
        category: "AI Agents",
        isExpanded: false,
        liked: false,
        completed: true,
        completedDate: "12 янв 2024",
        rating: 4,
        videoUrl: "https://example.com/video2",
        materials: [
          { name: "Jupyter Notebook", url: "https://example.com/notebook1" }
        ]
      }
    ],
    "no-code": [
      {
        id: "3",
        title: "No-Code разработка",
        description: "Создание приложений без программирования",
        duration: "30 мин",
        level: "Начинающий",
        category: "No-Code",
        isExpanded: false,
        liked: true,
        completed: true,
        completedDate: "10 янв 2024",
        rating: 5,
        videoUrl: "https://example.com/video3",
        materials: [
          { name: "Шаблоны", url: "https://example.com/templates1" }
        ]
      }
    ],
    "graphic-ai": [
      {
        id: "4",
        title: "Генерация изображений с ИИ",
        description: "Создание изображений с помощью нейросетей",
        duration: "50 мин",
        level: "Средний",
        category: "Graphic AI",
        isExpanded: false,
        liked: false,
        completed: true,
        completedDate: "8 янв 2024",
        rating: 4,
        videoUrl: "https://example.com/video4",
        materials: [
          { name: "Промпты", url: "https://example.com/prompts1" }
        ]
      }
    ],
    webinars: [
      {
        id: "5",
        title: "Вебинар: Будущее ИИ",
        description: "Обсуждение трендов и перспектив искусственного интеллекта",
        duration: "90 мин",
        level: "Для всех",
        category: "Webinars",
        isExpanded: false,
        liked: true,
        completed: true,
        completedDate: "5 янв 2024",
        rating: 5,
        videoUrl: "https://example.com/video5",
        materials: [
          { name: "Запись вебинара", url: "https://example.com/recording1" }
        ]
      }
    ]
  });



  const [likedLessons, setLikedLessons] = useState<Set<string>>(new Set(["1", "3", "5"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(["1", "2", "3", "4", "5"]));
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
        <AnimatedContainer delay={0.1} direction="down">
          <div className="mb-6">
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </Link>
            </motion.div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.svg 
                  className="w-6 h-6 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Завершенные уроки
                </h1>
              </div>
              <p className="text-white/80 text-sm mb-6">
                Ваши пройденные уроки
              </p>
            </div>
          </div>
        </AnimatedContainer>

        {/* Lessons List */}
        <div className="flex flex-col gap-6">
          {Object.keys(lessonsByCategory).some(categoryKey => 
            lessonsByCategory[categoryKey as keyof typeof lessonsByCategory].some(lesson => 
              completedLessons.has(lesson.id)
            )
          ) ? (
            Object.entries(lessonsByCategory).map(([categoryKey, categoryLessons], categoryIndex) => {
              const completedCategoryLessons = categoryLessons.filter(lesson => completedLessons.has(lesson.id));
              
              if (completedCategoryLessons.length === 0) return null;
              
              const categoryNames = {
                beginners: "Для начинающих",
                "ai-agents": "AI Агенты",
                "no-code": "No-Code",
                "graphic-ai": "Графический ИИ",
                webinars: "Вебинары"
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
                  <div className="flex flex-col gap-3 mb-6">
                    {completedCategoryLessons.map((lesson, index) => (
                      <AnimatedContainer key={lesson.id} delay={0.6 + categoryIndex * 0.1 + index * 0.05} direction="up">
                        <LessonCard
                          lesson={lesson}
                          isExpanded={expandedLessons.has(lesson.id)}
                          isLiked={likedLessons.has(lesson.id)}
                          isCompleted={completedLessons.has(lesson.id)}
                          onToggleExpand={() => toggleExpanded(lesson.id)}
                          onToggleLike={() => toggleLike(lesson.id)}
                          onToggleComplete={() => toggleCompleted(lesson.id)}
                        />
                      </AnimatedContainer>
                    ))}
                  </div>
                </div>
              );
            })
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </motion.svg>
                <p className="text-white/60 text-lg mb-2">
                  Нет завершенных уроков
                </p>
                <p className="text-white/40 text-sm">
                  Завершите свой первый урок, чтобы увидеть его здесь
                </p>
              </div>
            </AnimatedContainer>
          )}
        </div>
      </div>
    </div>
  );
}