"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";

export default function BeginnersArchive() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "История искусственного интеллекта",
      description: "Обзор развития ИИ от первых концепций до современных достижений. Ключевые вехи и прорывы в области машинного обучения.",
      liked: true,
      completed: true,
      isExpanded: false,
      date: "Август 2025",
    },
    {
      id: 2,
      title: "Основы машинного обучения",
      description: "Введение в концепции машинного обучения: обучение с учителем, без учителя и с подкреплением. Простые примеры и применения.",
      liked: false,
      completed: true,
      isExpanded: false,
      date: "Июль 2025",
    },
    {
      id: 3,
      title: "Нейронные сети для начинающих",
      description: "Понимание структуры и работы нейронных сетей. Персептроны, многослойные сети и основы глубокого обучения.",
      liked: true,
      completed: false,
      isExpanded: false,
      date: "Июнь 2025",
    },
    {
      id: 4,
      title: "Этика ИИ и безопасность",
      description: "Важные вопросы этики в области ИИ. Предвзятость алгоритмов, приватность данных и ответственное использование технологий.",
      liked: false,
      completed: true,
      isExpanded: false,
      date: "Май 2025",
    },
    {
      id: 5,
      title: "Обработка естественного языка",
      description: "Основы NLP: токенизация, анализ тональности, машинный перевод. Как компьютеры понимают человеческий язык.",
      liked: true,
      completed: false,
      isExpanded: false,
      date: "Апрель 2025",
    },
    {
      id: 6,
      title: "Компьютерное зрение",
      description: "Введение в обработку изображений и распознавание объектов. Как ИИ 'видит' и анализирует визуальную информацию.",
      liked: false,
      completed: false,
      isExpanded: false,
      date: "Март 2025",
    },
    {
      id: 7,
      title: "Будущее ИИ",
      description: "Перспективы развития искусственного интеллекта. AGI, квантовые вычисления и влияние на общество.",
      liked: true,
      completed: true,
      isExpanded: false,
      date: "Февраль 2025",
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
          <Link href="/beginners" className="inline-block mb-6 mt-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <h1 className="text-2xl font-bold text-white">
              Архив уроков
            </h1>
          </div>
          <p className="text-white/80 text-sm mb-6">
            Архивные материалы по основам ИИ
          </p>
          </div>
        </div>

        {/* Lessons List */}
        <div className="flex flex-col gap-3">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <div key={lesson.id}>
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
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <h3 className="text-white/60 text-lg font-medium mb-2">Нет архивных уроков</h3>
              <p className="text-white/40 text-sm">Архивные материалы появятся здесь со временем</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}