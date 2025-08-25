"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function NoCodeSprint() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Введение в No-Code разработку",
      description: "Что такое No-Code и Low-Code платформы. Преимущества и ограничения. Обзор популярных инструментов для создания приложений без программирования.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 2,
      title: "Создание сайтов с Webflow",
      description: "Основы работы с Webflow. Создание адаптивных веб-сайтов с помощью визуального редактора. Настройка анимаций и интерактивных элементов.",
      liked: true,
      completed: true,
      isExpanded: false,
    },
    {
      id: 3,
      title: "Автоматизация с Zapier",
      description: "Создание автоматических рабочих процессов между различными приложениями. Интеграция сервисов и автоматизация повторяющихся задач.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 4,
      title: "Базы данных в Airtable",
      description: "Создание и управление базами данных без SQL. Настройка связей между таблицами, создание форм и автоматизация процессов в Airtable.",
      liked: true,
      completed: false,
      isExpanded: false,
    },
    {
      id: 5,
      title: "Мобильные приложения с Bubble",
      description: "Разработка веб и мобильных приложений на платформе Bubble. Создание пользовательского интерфейса, настройка логики и работа с данными.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 6,
      title: "E-commerce с Shopify",
      description: "Создание интернет-магазина на платформе Shopify. Настройка товаров, оплаты, доставки и интеграция с маркетинговыми инструментами.",
      liked: false,
      completed: true,
      isExpanded: false,
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
            <Link href="/no-code" className="inline-block mb-6 mt-4">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Спринт Сентябрь 2025
                </h1>
              </div>
            </AnimatedContainer>
            <AnimatedContainer delay={0.4} direction="up">
              <p className="text-white/80 text-sm mb-6">
                Актуальные уроки по No-Code разработке
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Lessons List */}
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <AnimatedContainer key={lesson.id} delay={0.8 + index * 0.1} direction="up">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </motion.svg>
                <h3 className="text-white/60 text-lg font-medium mb-2">Нет уроков</h3>
                <p className="text-white/40 text-sm">Уроки появятся здесь, когда вы их добавите</p>
              </div>
            </AnimatedContainer>
          )}
        </motion.div>
      </div>
    </div>
  );
}