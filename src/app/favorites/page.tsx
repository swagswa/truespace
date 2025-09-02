"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";
import { InlineIcon } from "@/components/ui/icon";

// Helper to read cookies (for CSRF token)
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

type Lesson = {
  id: number;
  lessonName: string;
  lessonDescription: string;
  lessonLink: string;
  slug: string;
  liked: boolean;
  completed: boolean; // <-- important
};

export default function Favorites() {
  const [lessonsByCategory, setLessonsByCategory] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);

  // Prefetch CSRF cookie so POSTs work
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/csrf/", { credentials: "include" }).catch(() => {});
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // Load favorites and completed in parallel
        const [favRes, compRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/favorites/", { credentials: "include" }),
        fetch("http://127.0.0.1:8000/api/completed/", { credentials: "include" }),
        ]);

        if (!favRes.ok) throw new Error("Failed to fetch favorite lessons");
        if (!compRes.ok) throw new Error("Failed to fetch completed lessons");

        const favorites: Omit<Lesson, "completed">[] = await favRes.json();
        const completedLessons: { id: number }[] = await compRes.json();

        const completedIds = new Set<number>(completedLessons.map((l) => l.id));

        // Group favorites and mark completed by ID
        const grouped: Record<string, Lesson[]> = {};
        favorites.forEach((lesson) => {
          const categoryKey = lesson.slug?.split("-")[0] || "other";
          grouped[categoryKey] ||= [];
          grouped[categoryKey].push({
            ...lesson,
            liked: true,
            completed: completedIds.has(lesson.id),
          });
        });

        setLessonsByCategory(grouped);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function toggleExpanded(id: number) {
    setExpandedLessons(prev => 
      prev.includes(id) 
        ? prev.filter(lessonId => lessonId !== id)
        : [...prev, id]
    );
  }

  async function toggleFavorite(id: number) {
    try {
      const csrftoken = getCookie("csrftoken");

      const res = await fetch("http://127.0.0.1:8000/api/favorites/toggle/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
        },
        body: JSON.stringify({ lesson_id: id }),
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

      // Remove the lesson from UI immediately
      setLessonsByCategory((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          updated[key] = updated[key].filter((lesson) => lesson.id !== id);
          if (updated[key].length === 0) delete updated[key];
        }
        return updated;
      });
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Не удалось изменить избранное");
    }
  }

  // NEW: Toggle completion for a favorite (keeps it in the list, just flips the check)
  async function toggleComplete(id: number) {
    try {
      const csrftoken = getCookie("csrftoken");

      const res = await fetch("http://127.0.0.1:8000/api/completed/toggle/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
        },
        body: JSON.stringify({ lesson_id: id }),
      });

      if (!res.ok) throw new Error("Failed to toggle completion");

      const data: { completed: boolean } = await res.json();

      // Update just the completed flag in place
      setLessonsByCategory((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          updated[key] = updated[key].map((lesson) =>
            lesson.id === id ? { ...lesson, completed: data.completed } : lesson
          );
        }
        return updated;
      });
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Не удалось изменить статус завершения");
    }
  }

  const categoryTitles: Record<string, string> = {
    beginners: "Для начинающих",
    "ai-agents": "AI Агенты",
    "no-code": "No-Code",
    "graphic-ai": "Графический ИИ",
    webinars: "Вебинары",
    other: "Другие",
  };

  if (loading) {
    return <p className="text-white text-center">Загрузка избранных уроков...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Ошибка: {error}</p>;
  }

  const allLessons = Object.values(lessonsByCategory).flat();

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-sm">
        <AnimatedContainer delay={0.1}>
          <div className="mb-6">
            <Link href="/" className="inline-block mb-4">
              <motion.div
                className="text-white"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <InlineIcon name="arrow-left" className="w-6 h-6" />
              </motion.div>
            </Link>
            <div className="text-center">
              <AnimatedContainer delay={0.2}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.div
                    className="text-red-500"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <InlineIcon name="heart" className="w-6 h-6" />
                  </motion.div>
                  <h1 className="text-2xl font-bold text-white">Избранные уроки</h1>
                </div>
              </AnimatedContainer>
              <AnimatedContainer delay={0.3}>
                <p className="text-white/80 text-sm mb-6">Ваши сохраненные уроки</p>
              </AnimatedContainer>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.4}>
          {allLessons.length > 0 ? (
            Object.entries(lessonsByCategory).map(([key, lessons], idx) => (
              <div key={key} className="mb-6">
                <AnimatedContainer delay={0.5 + idx * 0.1}>
                  <h2 className="text-white text-lg font-semibold mb-2">
                    {categoryTitles[key] || key}
                  </h2>
                </AnimatedContainer>

                <div className="flex flex-col gap-3">
                  {lessons.map((lesson, i) => (
                    <AnimatedContainer key={lesson.id} delay={0.6 + idx * 0.1 + i * 0.05}>
                      <LessonCard
                        lesson={{
                          id: lesson.id.toString(),
                          title: lesson.lessonName,
                          description: lesson.lessonDescription,
                          isExpanded: expandedLessons.includes(lesson.id),
                        }}
                        isLiked={true}
                        isCompleted={lesson.completed}
                        isExpanded={expandedLessons.includes(lesson.id)}
                        onToggleLike={() => toggleFavorite(lesson.id)}
                        onToggleComplete={() => toggleComplete(lesson.id)}
                        onToggleExpand={() => toggleExpanded(lesson.id)}
                      />
                    </AnimatedContainer>
                  ))}
                </div>
              </div>
            ))
          ) : (
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 006.364 0L12 3.636l1.318 1.318a4.5 4.5 0 006.364-6.364L12 14l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </motion.svg>
              <p className="text-white/60 text-sm">У вас пока нет избранных уроков</p>
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Перейти к курсам
                  </button>
                </motion.div>
              </Link>
            </div>
          )}
        </AnimatedContainer>
      </div>
    </div>
  );
}

