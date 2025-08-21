"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";

export default function Completed() {
  // Пример завершенных уроков
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Введение в машинное обучение",
      description: "Основные концепции и алгоритмы машинного обучения",
      isExpanded: false,
      liked: true,
      completed: true,
      completedDate: "15 янв 2024",
      rating: 5
    },
    {
      id: 2,
      title: "Создание простого ИИ-помощника",
      description: "Пошаговое создание базового ИИ-агента",
      isExpanded: false,
      liked: false,
      completed: true,
      completedDate: "12 янв 2024",
      rating: 4
    },
    {
      id: 3,
      title: "Автоматизация с No-Code",
      description: "Создание автоматизированных процессов без кода",
      isExpanded: false,
      liked: true,
      completed: true,
      completedDate: "10 янв 2024",
      rating: 5
    }
  ]);

  const toggleLike = (id: number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, liked: !lesson.liked } : lesson
    ));
  };

  const toggleExpanded = (id: number) => {
    setLessons(lessons.map(lesson => 
      lesson.id === id ? { ...lesson, isExpanded: !lesson.isExpanded } : lesson
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-3 h-3 ${
          i < rating ? 'text-yellow-400' : 'text-white/20'
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-6">
          <Link href="/" className="inline-block mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            <h1 className="text-2xl font-bold text-white">
              Завершенные уроки
            </h1>
          </div>
          <p className="text-white/80 text-sm mb-6">
            Ваши пройденные уроки
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
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
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
                          className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer border border-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Здесь можно добавить логику для просмотра урока
                          }}
                        >
                          <div className="flex items-center justify-center gap-2 text-white text-sm">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <p className="text-white/60 text-sm">
                У вас пока нет завершенных уроков
              </p>
              <Link href="/">
                <GlassButton size="sm" className="mt-4">
                  Начать обучение
                </GlassButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}