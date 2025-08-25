"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";

export default function GraphicAIVideoCreation() {
  const [likedLessons, setLikedLessons] = useState<number[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedLessons(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const toggleComplete = (id: number) => {
    setCompletedLessons(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedLessons(prev => 
      prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
    );
  };

  const lessons = [
    {
      id: 1,
      title: "Runway ML для видео",
      description: "Создание и редактирование видео с помощью Runway ML",
      duration: "32 мин",
      level: "Начальный"
    },
    {
      id: 2,
      title: "Pika Labs: генерация видео из текста",
      description: "Создание коротких видеороликов по текстовым описаниям",
      duration: "28 мин",
      level: "Начальный"
    },
    {
      id: 3,
      title: "Stable Video Diffusion",
      description: "Локальная генерация видео с помощью Stable Video Diffusion",
      duration: "45 мин",
      level: "Средний"
    },
    {
      id: 4,
      title: "Анимация изображений с ИИ",
      description: "Превращение статичных изображений в анимированные видео",
      duration: "35 мин",
      level: "Средний"
    },
    {
      id: 5,
      title: "Deepfake и замена лиц",
      description: "Этичное использование технологий замены лиц в видео",
      duration: "40 мин",
      level: "Продвинутый"
    },
    {
      id: 6,
      title: "Монтаж видео с ИИ-помощниками",
      description: "Автоматизация процесса монтажа с помощью ИИ-инструментов",
      duration: "30 мин",
      level: "Средний"
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-4xl">
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
                <h1 className="text-3xl font-bold text-white mb-4">
                  Создание видео
                </h1>
              </AnimatedContainer>
              <AnimatedContainer delay={0.3}>
                <p className="text-white/80 text-sm mb-8">
                  Генерация и редактирование видео с помощью ИИ-инструментов
                </p>
              </AnimatedContainer>
            </div>
          </div>
        </AnimatedContainer>

        {/* Lessons List */}
        <AnimatedContainer delay={0.4}>
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <AnimatedContainer key={lesson.id} delay={0.5 + index * 0.1}>
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{lesson.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{lesson.description}</p>
                  <div className="flex gap-4 text-xs text-white/60">
                    <span>⏱️ {lesson.duration}</span>
                    <span>📊 {lesson.level}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <motion.button
                    onClick={() => toggleLike(lesson.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      likedLessons.includes(lesson.id)
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-white/10 text-white/60 hover:text-red-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    ❤️
                  </motion.button>
                  <motion.button
                    onClick={() => toggleComplete(lesson.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      completedLessons.includes(lesson.id)
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/10 text-white/60 hover:text-green-400'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    ✓
                  </motion.button>
                  <motion.button
                    onClick={() => toggleExpand(lesson.id)}
                    className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    {expandedLessons.includes(lesson.id) ? '▼' : '▶'}
                  </motion.button>
                </div>
              </div>
              
              {expandedLessons.includes(lesson.id) && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="text-white/80 text-sm mb-3">
                    Дополнительная информация о уроке: {lesson.title.toLowerCase()}
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Пошаговые инструкции</li>
                    <li>• Примеры проектов</li>
                    <li>• Техники и советы</li>
                  </ul>
                </div>
              )}
              
              <div className="mt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassButton variant="primary" size="sm">
                    Смотреть урок
                  </GlassButton>
                </motion.div>
              </div>
                </motion.div>
              </AnimatedContainer>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}