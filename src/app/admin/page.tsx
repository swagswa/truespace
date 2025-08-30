"use client";

import { GlassButton } from "@/components/ui/glass-button";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface Lesson {
  id: number;
  title: string;
  description: string;
  category: string;
  lessonType: string;
  webinarCategory?: string;
  contentUrl: string;
  tags: string[];
  createdAt: string;
}



export default function AdminPanel() {
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    category: "webinars",
    lessonType: "archive",
    webinarCategory: "AI Агенты", // Подкатегория для вебинаров
    contentUrl: "",
    tags: ""
  });

  const [showForm, setShowForm] = useState(true);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setNewLesson({
      title: "",
      description: "",
      category: "webinars",
      lessonType: "", // Пустое значение для вебинаров
      webinarCategory: "AI Агенты", // Подкатегория для вебинаров
      contentUrl: "",
      tags: ""
    });
    setEditingLesson(null);
  };

  const addLesson = async () => {
    if (newLesson.title && newLesson.description) {
      setIsLoading(true);
      try {
        // Здесь будет интеграция с Django backend API
        const lessonData = {
          ...newLesson,
          id: Date.now(), // Временный ID
          createdAt: new Date().toISOString(),
          tags: newLesson.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          // Для вебинаров используем webinarCategory как category в данных урока
          ...(newLesson.category === "webinars" && { webinarCategory: newLesson.webinarCategory })
        };
        
        if (editingLesson) {
          // Обновление существующего урока
          setLessons(lessons.map(lesson => 
            lesson.id === editingLesson.id ? { ...lessonData, id: editingLesson.id } : lesson
          ));
          alert('Урок успешно обновлен!');
        } else {
          // Добавление нового урока
          setLessons([...lessons, lessonData]);
          alert('Урок успешно добавлен!');
        }
        
        resetForm();
        setShowForm(false);
      } catch (error) {
        console.error('Ошибка при сохранении урока:', error);
        alert('Произошла ошибка при сохранении урока');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Пожалуйста, заполните обязательные поля: название и описание');
    }
  };





  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <AnimatedContainer delay={0.1} direction="down">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  ← Назад
                </Link>
              </motion.div>
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-8 h-8 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.svg 
                    className="w-5 h-5 text-gray-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </motion.svg>
                </motion.div>
                <h1 className="text-2xl font-bold text-white">Админ панель</h1>
              </div>
            </div>
          </div>
        </AnimatedContainer>

        {/* Add Lesson Form */}
        {showForm && (
          <AnimatedContainer delay={0.2} direction="up">
            <motion.div 
              className="mb-8 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Добавить новый урок</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Название урока</label>
                <input
                  type="text"
                  value={newLesson.title}
                  onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  placeholder="Введите название урока"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Описание</label>
                <textarea
                  value={newLesson.description}
                  onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 h-24 resize-none"
                  placeholder="Введите описание урока"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Категория</label>
                  <select
                    value={newLesson.category}
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      setNewLesson({
                        ...newLesson, 
                        category: newCategory,
                        lessonType: newCategory === "webinars" ? "" : newLesson.lessonType
                      });
                    }}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400"
                  >
                    <option value="webinars">Вебинары</option>
                    <option value="ai-agents">AI Агенты</option>
                    <option value="beginners">Для начинающих</option>
                    <option value="no-code">No-Code</option>
                    <option value="graphic-ai">Графический AI</option>
                  </select>
                </div>
                {newLesson.category === "webinars" ? (
                  <div>
                    <label className="block text-gray-300 mb-2">Тема вебинара</label>
                    <select
                      value={newLesson.webinarCategory}
                      onChange={(e) => setNewLesson({...newLesson, webinarCategory: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400"
                    >
                      <option value="AI Агенты">AI Агенты</option>
                      <option value="No-Code">No-Code</option>
                      <option value="Графический ИИ">Графический ИИ</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-gray-300 mb-2">Тип урока</label>
                    <select
                      value={newLesson.lessonType}
                      onChange={(e) => setNewLesson({...newLesson, lessonType: e.target.value})}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400"
                    >
                      <option value="archive">Архив</option>
                      <option value="sprint">Спринт</option>
                      <option value="webinar">Вебинар</option>
                    </select>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Ссылка на контент</label>
                <input
                  type="url"
                  value={newLesson.contentUrl}
                  onChange={(e) => setNewLesson({...newLesson, contentUrl: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  placeholder="https://example.com/lesson"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Теги (через запятую)</label>
                <input
                  type="text"
                  value={newLesson.tags}
                  onChange={(e) => setNewLesson({...newLesson, tags: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400"
                  placeholder="javascript, react, frontend"
                />
              </div>
              <div className="flex gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassButton
                    onClick={addLesson}
                    disabled={isLoading}
                    className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600/50 text-white disabled:opacity-50"
                  >
                    {isLoading ? 'Сохранение...' : (editingLesson ? 'Обновить урок' : 'Добавить урок')}
                  </GlassButton>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassButton
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600/50 text-white"
                  >
                    Отменить
                  </GlassButton>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatedContainer>
        )}


      </div>
    </div>
  );
}