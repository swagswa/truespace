"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { useState } from "react";

export default function AdminPanel() {
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    category: "webinars"
  });

  const [showForm, setShowForm] = useState(true);

  const addLesson = () => {
    if (newLesson.title && newLesson.description) {
      // Здесь можно добавить логику сохранения урока
      console.log('Новый урок:', newLesson);
      setNewLesson({ title: "", description: "", category: "webinars" });
      setShowForm(false);
      alert('Урок успешно добавлен!');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              ← Назад
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 border border-gray-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">Админ панель</h1>
            </div>
          </div>

        </div>

        {/* Add Lesson Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl">
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
              <div>
                <label className="block text-gray-300 mb-2">Категория</label>
                <select
                  value={newLesson.category}
                  onChange={(e) => setNewLesson({...newLesson, category: e.target.value})}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-gray-400"
                >
                  <option value="webinars">Вебинары</option>
                  <option value="ai-agents">AI Агенты</option>
                  <option value="beginners">Для начинающих</option>
                  <option value="no-code">No-Code</option>
                  <option value="graphic-ai">Графический AI</option>
                </select>
              </div>
              <div className="flex gap-3">
                <GlassButton
                  onClick={addLesson}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600/50 text-white"
                >
                  Добавить урок
                </GlassButton>
                <GlassButton
                  onClick={() => setShowForm(false)}
                  className="bg-gray-800/50 hover:bg-gray-700/50 border-gray-600/50 text-white"
                >
                  Отменить
                </GlassButton>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  );
}