"use client";

import { GlassButton } from "@/components/ui/glass-button";
import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function SprintSeptember2025() {
  const [lessons, setLessons] = useState([
    {
      id: "1",
      title: "Введение в AI агентов",
      description: "Основы создания и настройки AI агентов для автоматизации задач. Изучите принципы работы, архитектуру и возможности современных AI систем.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "2",
      title: "Настройка окружения для разработки",
      description: "Пошаговое руководство по установке и настройке всех необходимых инструментов для разработки AI агентов. Включает Python, библиотеки и IDE.",
      liked: true,
      completed: true,
      isExpanded: false,
    },
    {
      id: "3",
      title: "Создание первого AI агента",
      description: "Практическое создание простого AI агента с нуля. Изучите основные компоненты, структуру кода и принципы взаимодействия с API.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "4",
      title: "Обучение и тонкая настройка модели",
      description: "Методы обучения AI агентов на собственных данных. Техники fine-tuning, оптимизация параметров и улучшение производительности.",
      liked: true,
      completed: false,
      isExpanded: false,
    },
    {
      id: "5",
      title: "Интеграция с внешними сервисами",
      description: "Подключение AI агентов к различным API и сервисам. Работа с базами данных, веб-сервисами и облачными платформами.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: "6",
      title: "Мониторинг и отладка AI агентов",
      description: "Инструменты и методы для отслеживания работы AI агентов. Логирование, метрики производительности и диагностика ошибок.",
      liked: false,
      completed: true,
      isExpanded: false,
    },
  ]);

  const [likedLessons, setLikedLessons] = useState<string[]>(["2", "4"]);
  const [completedLessons, setCompletedLessons] = useState<string[]>(["2", "6"]);
  const [expandedLessons, setExpandedLessons] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedLessons(prev => 
      prev.includes(id) ? prev.filter(lessonId => lessonId !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id: string) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(lessonId => lessonId !== id) : [...prev, id]
    );
  };

  const toggleExpanded = (id: string) => {
    setExpandedLessons(prev => 
      prev.includes(id) ? prev.filter(lessonId => lessonId !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0.1} direction="left">
            <Link href="/ai-agents" className="inline-block mb-6 mt-4">
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
          <AnimatedContainer delay={0.5} direction="up">
            <p className="text-white/80 text-sm mb-6">
              Актуальные уроки по AI агентам
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
                  isLiked={likedLessons.includes(lesson.id)}
                  isCompleted={completedLessons.includes(lesson.id)}
                  isExpanded={expandedLessons.includes(lesson.id)}
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