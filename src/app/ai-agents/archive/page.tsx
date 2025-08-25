"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function AIAgentsArchive() {
  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "История развития AI агентов",
      description: "Обзор эволюции искусственного интеллекта от простых алгоритмов до современных агентов. Ключевые вехи и прорывы в области AI.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 2,
      title: "Классические алгоритмы поиска",
      description: "Изучение фундаментальных алгоритмов поиска в пространстве состояний. A*, поиск в глубину, поиск в ширину и их применение.",
      liked: true,
      completed: true,
      isExpanded: false,
    },
    {
      id: 3,
      title: "Экспертные системы",
      description: "Принципы работы экспертных систем - предшественников современных AI агентов. База знаний, механизм вывода и интерфейс пользователя.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 4,
      title: "Нейронные сети первого поколения",
      description: "Основы персептронов и многослойных нейронных сетей. Алгоритм обратного распространения ошибки и его значение для AI.",
      liked: true,
      completed: false,
      isExpanded: false,
    },
    {
      id: 5,
      title: "Машинное обучение без учителя",
      description: "Кластеризация, снижение размерности и ассоциативные правила. Применение в создании автономных агентов.",
      liked: false,
      completed: true,
      isExpanded: false,
    },
    {
      id: 6,
      title: "Обучение с подкреплением",
      description: "Q-learning, policy gradient и actor-critic методы. Как агенты учатся принимать решения в неопределенной среде.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 7,
      title: "Мультиагентные системы",
      description: "Взаимодействие множества AI агентов. Координация, кооперация и конкуренция в распределенных системах.",
      liked: true,
      completed: false,
      isExpanded: false,
    },
    {
      id: 8,
      title: "Обработка естественного языка",
      description: "От статистических методов до трансформеров. Как AI агенты научились понимать и генерировать человеческую речь.",
      liked: false,
      completed: true,
      isExpanded: false,
    },
    {
      id: 9,
      title: "Компьютерное зрение для агентов",
      description: "Сверточные нейронные сети, детекция объектов и семантическая сегментация. Как агенты 'видят' окружающий мир.",
      liked: false,
      completed: false,
      isExpanded: false,
    },
    {
      id: 10,
      title: "Этические аспекты AI",
      description: "Проблемы справедливости, прозрачности и ответственности в AI системах. Регулирование и стандарты безопасности.",
      liked: true,
      completed: false,
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
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <AnimatedContainer delay={0.1} direction="left">
            <Link href="/ai-agents" className="inline-block mb-4">
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
                whileHover={{ rotate: -5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </motion.svg>
              <h1 className="text-2xl font-bold text-white">
                Архив уроков
              </h1>
            </div>
          </AnimatedContainer>
          <AnimatedContainer delay={0.5} direction="up">
            <p className="text-white/80 text-sm mb-6">
              Все предыдущие уроки и материалы по AI агентам
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                <GlassButton 
                  size="md" 
                  className="text-white w-full text-left p-4 h-auto mb-3"
                  variant="default"
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
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded(lesson.id);
                          }}
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
              </motion.div>
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