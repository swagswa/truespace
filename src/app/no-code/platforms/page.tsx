"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function NoCodePlatforms() {
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
      title: "Введение в Bubble",
      description: "Создание веб-приложений без кода с помощью Bubble",
      duration: "25 мин",
      level: "Начальный"
    },
    {
      id: 2,
      title: "Webflow для дизайнеров",
      description: "Профессиональные веб-сайты с визуальным редактором",
      duration: "30 мин",
      level: "Начальный"
    },
    {
      id: 3,
      title: "Airtable как база данных",
      description: "Создание и управление базами данных без программирования",
      duration: "20 мин",
      level: "Начальный"
    },
    {
      id: 4,
      title: "Zapier для интеграций",
      description: "Автоматизация рабочих процессов между приложениями",
      duration: "22 мин",
      level: "Средний"
    },
    {
      id: 5,
      title: "Notion как CMS",
      description: "Использование Notion для создания контент-систем",
      duration: "18 мин",
      level: "Начальный"
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0.1} direction="up">
            <Link href="/no-code" className="inline-block mb-6 mt-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1, x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </motion.svg>
            </Link>
          </AnimatedContainer>
          <div className="text-center">
            <AnimatedContainer delay={0.2} direction="up">
              <h1 className="text-3xl font-bold text-white mb-4">
                Платформы No-Code
              </h1>
            </AnimatedContainer>
            <AnimatedContainer delay={0.3} direction="up">
              <p className="text-white/80 text-sm mb-8">
                Изучите популярные платформы для создания приложений без кода
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Lessons List */}
        <AnimatedContainer delay={0.4} direction="up">
          <div className="space-y-4">
            {lessons.map((lesson, index) => (
              <motion.div 
                key={lesson.id} 
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
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
                    whileTap={{ scale: 0.95 }}
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
                    whileTap={{ scale: 0.95 }}
                  >
                    ✓
                  </motion.button>
                  <motion.button
                    onClick={() => toggleExpand(lesson.id)}
                    className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
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
                    <li>• Практические примеры</li>
                    <li>• Шаблоны и ресурсы</li>
                  </ul>
                </div>
              )}
              
              <motion.div 
                className="mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GlassButton variant="primary" size="sm">
                  Смотреть урок
                </GlassButton>
              </motion.div>
              </motion.div>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
}