"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";

export default function Webinars() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Основы веб-разработки",
      description: "Введение в HTML, CSS и JavaScript. Изучите основы создания современных веб-сайтов и интерактивных пользовательских интерфейсов.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 2,
      title: "React и современный фронтенд",
      description: "Глубокое погружение в React, хуки, состояние компонентов и создание масштабируемых приложений с современными инструментами.",
      liked: true,
      completed: true,
      isExpanded: false,
    },
    {
      id: 3,
      title: "Backend разработка с Node.js",
      description: "Создание серверных приложений с Node.js, Express, работа с базами данных и API. Полный стек веб-разработки.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 4,
      title: "Дизайн и UX/UI принципы",
      description: "Основы пользовательского опыта, принципы дизайна интерфейсов, работа с Figma и создание привлекательных дизайнов.",
      liked: true,
      completed: false,
      isExpanded: false,
    },
    {
      id: 5,
      title: "Мобильная разработка",
      description: "Создание мобильных приложений с React Native, адаптивный дизайн и оптимизация для различных устройств.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 6,
      title: "DevOps и развертывание",
      description: "Автоматизация развертывания, работа с облачными сервисами, CI/CD пайплайны и мониторинг приложений.",
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
          <Link href="/" className="inline-block mb-6 mt-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <h1 className="text-2xl font-bold text-white">
              Вебинары
            </h1>
          </div>
          <p className="text-white/80 text-sm mb-6">
            Онлайн-обучение и мастер-классы
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
                          className="w-full py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 cursor-pointer border border-white/20"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Здесь можно добавить логику для просмотра вебинара
                          }}
                        >
                          <div className="flex items-center justify-center gap-2 text-white text-sm">
                            Смотреть вебинар
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <h3 className="text-white/60 text-lg font-medium mb-2">Нет вебинаров</h3>
              <p className="text-white/40 text-sm">Вебинары появятся здесь, когда вы их добавите</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}