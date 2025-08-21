"use client";

import { useState } from "react";
import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";

export default function BeginnersMachineLearning() {
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
      title: "Введение в машинное обучение",
      description: "Основные понятия и принципы машинного обучения",
      duration: "22 мин",
      level: "Начальный"
    },
    {
      id: 2,
      title: "Типы машинного обучения",
      description: "Обучение с учителем, без учителя и обучение с подкреплением",
      duration: "18 мин",
      level: "Начальный"
    },
    {
      id: 3,
      title: "Подготовка данных",
      description: "Очистка, нормализация и предобработка данных для ML",
      duration: "25 мин",
      level: "Средний"
    },
    {
      id: 4,
      title: "Линейная регрессия",
      description: "Первый алгоритм машинного обучения - линейная регрессия",
      duration: "30 мин",
      level: "Средний"
    },
    {
      id: 5,
      title: "Классификация данных",
      description: "Алгоритмы классификации и их применение",
      duration: "28 мин",
      level: "Средний"
    }
  ];

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-4">
          <Link href="/beginners" className="inline-block mb-6 mt-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">
              Машинное обучение
            </h1>
            <p className="text-white/80 text-sm mb-8">
              Практические основы машинного обучения и алгоритмов
            </p>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
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
                    <li>• Код и упражнения</li>
                  </ul>
                </div>
              )}
              
              <div className="mt-4">
                <GlassButton variant="primary" size="sm">
                  Смотреть урок
                </GlassButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}