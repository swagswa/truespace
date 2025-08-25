"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Completed() {
  // Пример завершенных уроков
  const [lessons, setLessons] = useState([
    {
      id: "1",
      title: "Введение в машинное обучение",
      description: "Основные концепции и алгоритмы машинного обучения",
      isExpanded: false,
      liked: true,
      completed: true,
      completedDate: "15 янв 2024",
      rating: 5
    }
  ]);

  const [likedLessons, setLikedLessons] = useState<Set<string>>(new Set(["1"]));
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(["1"]));
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleCompleted = (id: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleExpanded = (id: string) => {
    setExpandedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
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
        <AnimatedContainer delay={0.1} direction="down">
          <div className="mb-6">
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="inline-block mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                </svg>
              </Link>
            </motion.div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <motion.svg 
                  className="w-6 h-6 text-green-500" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Завершенные уроки
                </h1>
              </div>
              <p className="text-white/80 text-sm mb-6">
                Ваши пройденные уроки
              </p>
            </div>
          </div>
        </AnimatedContainer>

        {/* Lessons List */}
        <div className="flex flex-col gap-3">
          {lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <AnimatedContainer key={lesson.id} delay={0.2 + index * 0.1} direction="up">
                <LessonCard
                  lesson={lesson}
                  isLiked={likedLessons.has(lesson.id)}
                  isCompleted={completedLessons.has(lesson.id)}
                  isExpanded={expandedLessons.has(lesson.id)}
                  onToggleLike={() => toggleLike(lesson.id)}
                  onToggleComplete={() => toggleCompleted(lesson.id)}
                  onToggleExpand={() => toggleExpanded(lesson.id)}
                />
              </AnimatedContainer>
            ))
          ) : (
            <AnimatedContainer delay={0.5}>
              <div className="text-center py-12">
                <motion.svg 
                  className="w-16 h-16 text-white/40 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </motion.svg>
                <p className="text-white/60 text-lg mb-2">
                  Нет завершенных уроков
                </p>
                <p className="text-white/40 text-sm">
                  Завершите свой первый урок, чтобы увидеть его здесь
                </p>
              </div>
            </AnimatedContainer>
          )}
        </div>
      </div>
    </div>
  );
}