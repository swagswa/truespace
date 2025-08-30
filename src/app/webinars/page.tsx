"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LessonCard } from "@/components/ui/lesson-card";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function Webinars() {
  const [lessons] = useState([
    {
      id: "1",
      title: "Создание AI-агента для автоматизации",
      description: "Изучите основы создания ИИ-агентов для автоматизации бизнес-процессов",
      category: "AI Агенты",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "2",
      title: "Интеграция ChatGPT в рабочие процессы",
      description: "Практические методы внедрения ИИ в повседневную работу",
      category: "AI Агенты",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "3",
      title: "Создание приложений без кода",
      description: "Разработка полноценных приложений с помощью No-Code платформ",
      category: "No-Code",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "4",
      title: "Автоматизация с Zapier и Make",
      description: "Настройка автоматических процессов между различными сервисами",
      category: "No-Code",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "5",
      title: "Генерация изображений с Midjourney",
      description: "Создание профессиональных изображений с помощью ИИ",
      category: "Графический ИИ",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "6",
      title: "Дизайн логотипов с помощью ИИ",
      description: "Создание уникальных логотипов и брендинга с использованием ИИ-инструментов",
      category: "Графический ИИ",
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
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0} direction="left">
            <Link href="/" className="inline-block mb-6 mt-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ x: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </motion.svg>
            </Link>
          </AnimatedContainer>
          <div className="text-center">
            <AnimatedContainer delay={0.2} direction="up">
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.svg 
                  className="w-6 h-6 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Вебинары
                </h1>
              </div>
            </AnimatedContainer>
            <AnimatedContainer delay={0.4} direction="up">
              <p className="text-white/80 text-sm mb-6">
                Онлайн-обучение и мастер-классы
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Lessons List */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {lessons.length > 0 ? (
            (() => {
              // Группируем уроки по категориям
              const categories = ['AI Агенты', 'No-Code', 'Графический ИИ'];
              const categoryIcons: { [key: string]: React.ReactElement } = {
                'AI Агенты': (
                  <motion.svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </motion.svg>
                ),
                'No-Code': (
                  <motion.svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </motion.svg>
                ),
                'Графический ИИ': (
                  <motion.svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </motion.svg>
                )
              };
              
              return categories.map((category, categoryIndex) => {
                const categoryLessons = lessons.filter(lesson => lesson.category === category);
                
                if (categoryLessons.length === 0) return null;
                
                return (
                  <div key={category} className="mb-6">
                    <AnimatedContainer delay={0.8 + categoryIndex * 0.2} direction="up">
                      <div className="flex items-center gap-2 mb-4 px-2">
                        {categoryIcons[category]}
                        <h2 className="text-lg font-semibold text-white">{category}</h2>
                        <div className="text-sm text-white/60">({categoryLessons.length})</div>
                      </div>
                    </AnimatedContainer>
                    
                    <div className="flex flex-col gap-3">
                      {categoryLessons.map((lesson, lessonIndex) => (
                        <AnimatedContainer key={lesson.id} delay={1.0 + categoryIndex * 0.2 + lessonIndex * 0.1} direction="up">
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
              });
            })()
          ) : (
            <AnimatedContainer delay={0.8} direction="up">
              <div className="text-center py-12">
                <motion.svg 
                  className="w-16 h-16 text-white/40 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </motion.svg>
                <h3 className="text-white/60 text-lg font-medium mb-2">Нет вебинаров</h3>
                <p className="text-white/40 text-sm">Вебинары появятся здесь, когда вы их добавите</p>
              </div>
            </AnimatedContainer>
          )}
        </motion.div>
      </div>
    </div>
  );
}