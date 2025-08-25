"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function GraphicAIArchive() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Основы Midjourney",
      description: "Введение в создание изображений с помощью Midjourney. Базовые команды, параметры и техники промптинга.",
      liked: true,
      completed: true,
      isExpanded: false,
      date: "Август 2025",
    },
    {
      id: 2,
      title: "DALL-E 3 и ChatGPT",
      description: "Создание изображений через DALL-E 3 в ChatGPT. Оптимизация промптов и работа с различными стилями.",
      liked: false,
      completed: true,
      isExpanded: false,
      date: "Июль 2025",
    },
    {
      id: 3,
      title: "Stable Diffusion локально",
      description: "Установка и настройка Stable Diffusion на локальном компьютере. Работа с моделями и LoRA.",
      liked: true,
      completed: false,
      isExpanded: false,
      date: "Июнь 2025",
    },
    {
      id: 4,
      title: "Leonardo AI для дизайна",
      description: "Использование Leonardo AI для создания концепт-арта, логотипов и дизайнерских решений.",
      liked: false,
      completed: true,
      isExpanded: false,
      date: "Май 2025",
    },
    {
      id: 5,
      title: "Runway ML и видео",
      description: "Создание и редактирование видео с помощью ИИ в Runway ML. Анимация изображений и генерация видео.",
      liked: true,
      completed: false,
      isExpanded: false,
      date: "Апрель 2025",
    },
    {
      id: 6,
      title: "Adobe Firefly интеграция",
      description: "Работа с Adobe Firefly в Creative Suite. Генеративная заливка и создание текстур.",
      liked: false,
      completed: true,
      isExpanded: false,
      date: "Март 2025",
    },
    {
      id: 7,
      title: "Canva AI инструменты",
      description: "Использование ИИ-функций в Canva для быстрого создания дизайнов и презентаций.",
      liked: true,
      completed: true,
      isExpanded: false,
      date: "Февраль 2025",
    },
    {
      id: 8,
      title: "Photoshop AI и нейрофильтры",
      description: "Работа с нейронными фильтрами в Photoshop. Генеративное расширение и умная ретушь.",
      liked: false,
      completed: false,
      isExpanded: false,
      date: "Январь 2025",
    },
    {
      id: 9,
      title: "Figma AI плагины",
      description: "Обзор и использование ИИ-плагинов в Figma для автоматизации дизайн-процессов.",
      liked: true,
      completed: true,
      isExpanded: false,
      date: "Декабрь 2024",
    },
    {
      id: 10,
      title: "Upscaling и улучшение качества",
      description: "Техники улучшения качества изображений с помощью ИИ. Real-ESRGAN, Waifu2x и другие инструменты.",
      liked: false,
      completed: false,
      isExpanded: false,
      date: "Ноябрь 2024",
    },
  ]);

  const toggleLike = (id: number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, liked: !lesson.liked } : lesson
    ));
  };

  const toggleCompleted = (id: number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, completed: !lesson.completed } : lesson
    ));
  };

  const toggleExpanded = (id: number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, isExpanded: !lesson.isExpanded } : lesson
    ));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0} direction="left">
            <Link href="/graphic-ai" className="inline-block mb-6 mt-4">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Архив уроков
                </h1>
              </div>
            </AnimatedContainer>
            <AnimatedContainer delay={0.4} direction="up">
              <p className="text-white/80 text-sm mb-6">
                Архивные материалы по графическому ИИ
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Lessons List */}
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <AnimatedContainer key={lesson.id} delay={0.8 + index * 0.1} direction="up">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassButton 
                    size="md" 
                    className="text-white w-full text-left p-4 h-auto mb-3"
                    variant="default"
                  onClick={() => toggleExpanded(lesson.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 font-medium">
                          #{lesson.id}
                        </span>
                        <h3 className="text-white font-semibold">
                          {lesson.title}
                        </h3>
                        
                      </div>
                      {!lesson.isExpanded && (
                        <p className="text-white/50 text-xs ml-8 max-w-[200px]">
                          {lesson.description.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div>
                        <svg 
                          className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                            lesson.liked ? 'text-red-500' : 'text-white/40 hover:text-red-400'
                          }`}
                          fill={lesson.liked ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(lesson.id);
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </div>
                      <div>
                        <svg 
                          className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                            lesson.completed ? 'text-green-500' : 'text-white/40 hover:text-green-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompleted(lesson.id);
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <svg 
                          className="w-5 h-5 text-white/60 cursor-pointer hover:text-white"
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {lesson.isExpanded && (
                    <div className="mt-4 overflow-hidden">
                      <div className="pt-4 border-t border-white/20">
                          <p className="text-white/70 mb-4 text-sm">
                            {lesson.description}
                          </p>

                        <div 
                          className="w-full py-2 px-3 rounded-lg bg-white hover:bg-white/90 transition-colors duration-200 cursor-pointer border border-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Здесь можно добавить логику для просмотра урока
                          }}
                        >
                          <div className="flex items-center justify-center gap-2 text-black text-sm font-medium">
                            Смотреть урок
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </GlassButton>
                </motion.div>
              </AnimatedContainer>
            ))
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <AnimatedContainer delay={1} direction="up">
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
                <h3 className="text-white/60 text-lg font-medium mb-2">Нет архивных уроков</h3>
                <p className="text-white/40 text-sm">Архивные материалы появятся здесь со временем</p>
              </AnimatedContainer>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}