"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function BeginnersBasics() {
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
      title: "Что такое искусственный интеллект?",
      description: "Введение в основные концепции ИИ и его применение в современном мире",
      duration: "15 мин",
      level: "Начальный"
    },
    {
      id: 2,
      title: "История развития ИИ",
      description: "От первых идей до современных достижений в области искусственного интеллекта",
      duration: "20 мин",
      level: "Начальный"
    },
    {
      id: 3,
      title: "Типы искусственного интеллекта",
      description: "Узкий ИИ, общий ИИ и суперинтеллект - различия и особенности",
      duration: "18 мин",
      level: "Начальный"
    },
    {
      id: 4,
      title: "Нейронные сети: основы",
      description: "Принципы работы искусственных нейронных сетей",
      duration: "25 мин",
      level: "Средний"
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0} direction="left">
            <Link href="/beginners" className="inline-block mb-6 mt-4">
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
              <h1 className="text-3xl font-bold text-white mb-4">
                Основы ИИ
              </h1>
            </AnimatedContainer>
            <AnimatedContainer delay={0.4} direction="up">
              <p className="text-white/80 text-sm mb-8">
                Фундаментальные знания об искусственном интеллекте
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Lessons List */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {lessons.map((lesson, index) => (
            <AnimatedContainer key={lesson.id} delay={0.8 + index * 0.1} direction="up">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
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
                  <button
                    onClick={() => toggleLike(lesson.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      likedLessons.includes(lesson.id)
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-white/10 text-white/60 hover:text-red-400'
                    }`}
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => toggleComplete(lesson.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      completedLessons.includes(lesson.id)
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/10 text-white/60 hover:text-green-400'
                    }`}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => toggleExpand(lesson.id)}
                    className="p-2 rounded-lg bg-white/10 text-white/60 hover:text-white transition-colors"
                  >
                    {expandedLessons.includes(lesson.id) ? '▼' : '▶'}
                  </button>
                </div>
              </div>
              
              {expandedLessons.includes(lesson.id) && (
                <div className="mt-4 p-4 bg-white/5 rounded-lg">
                  <p className="text-white/80 text-sm mb-3">
                    Дополнительная информация о уроке: {lesson.title.toLowerCase()}
                  </p>
                  <ul className="text-white/70 text-sm space-y-1">
                    <li>• Теоретическая часть</li>
                    <li>• Практические примеры</li>
                    <li>• Тестирование знаний</li>
                  </ul>
                </div>
              )}
              
                <div className="mt-4">
                  <GlassButton variant="primary" size="sm">
                    Смотреть урок
                  </GlassButton>
                </div>
              </motion.div>
            </AnimatedContainer>
          ))}
        </motion.div>
      </div>
    </div>
  );
}