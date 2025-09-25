"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";
import { InlineIcon } from "@/components/ui/icon";
import { useRouter } from "next/navigation";

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
  completed: boolean;
  belongsTo: string;
};

export default function Favorites() {
  const router = useRouter();
  const [lessonsByCategory, setLessonsByCategory] = useState<Record<string, Lesson[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);
  const [topicParam, setTopicParam] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get topic query param from URL (client-side)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newTopicParam = params.get("topic");
    
    // Если параметр изменился, сбрасываем состояние
    if (topicParam !== null && topicParam !== newTopicParam) {
      setLessonsByCategory({});
      setLoading(true);
      setError(null);
      setExpandedLessons([]);
    }
    
    setTopicParam(newTopicParam);
    setIsInitialized(true);
  }, [topicParam]);

  // Prefetch CSRF token
  useEffect(() => {
    fetch("https://sawfdawfawfasf.fun/api/csrf/", { credentials: "include" }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isInitialized || topicParam === null) return; // wait until topicParam is set

    async function fetchData() {
      try {
        const [favoritesRes, completedRes] = await Promise.all([
          fetch("https://sawfdawfawfasf.fun/api/favorites/", { credentials: "include" }),
        fetch("https://sawfdawfawfasf.fun/api/completed/", { credentials: "include" }),
        ]);

        if (!favoritesRes.ok) throw new Error("Failed to fetch favorite lessons");
        if (!completedRes.ok) throw new Error("Failed to fetch completed lessons");

        const favorites: Omit<Lesson, "completed">[] = await favoritesRes.json();
        const completedLessons: { id: number }[] = await completedRes.json();
        const completedIds = new Set<number>(completedLessons.map((l) => l.id));

        // Filter favorites by topic
        const filteredFavorites = topicParam
          ? favorites.filter((lesson) => lesson.belongsTo === topicParam)
          : favorites;

        // Group by category
        const grouped: Record<string, Lesson[]> = {};
        filteredFavorites.forEach((lesson) => {
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
  }, [topicParam]);

  function toggleExpanded(id: number) {
    setExpandedLessons((prev) =>
      prev.includes(id) ? prev.filter((lessonId) => lessonId !== id) : [...prev, id]
    );
  }

  async function toggleFavorite(id: number) {
    try {
      const csrftoken = getCookie("csrftoken");
      const res = await fetch("https://sawfdawfawfasf.fun/api/favorites/toggle/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
        },
        body: JSON.stringify({ lesson_id: id }),
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

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

  async function toggleComplete(id: number) {
    try {
      const csrftoken = getCookie("csrftoken");
      const res = await fetch("https://sawfdawfawfasf.fun/api/completed/toggle/", {
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

  if (loading) return <p className="text-white text-center">Загрузка избранных уроков...</p>;
  if (error) return <p className="text-red-500 text-center">Ошибка: {error}</p>;

  const filteredCategories = Object.entries(lessonsByCategory).filter(
    ([_, lessons]) => lessons.length > 0
  );

  const allLessons = filteredCategories.flatMap(([_, lessons]) => lessons);

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-sm">
        <AnimatedContainer delay={0.1}>
          <div className="mb-6">
            <button onClick={() => router.back()} className="inline-block mb-4">
              <motion.div
                className="text-white"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <InlineIcon name="arrow-left" className="w-6 h-6" />
              </motion.div>
            </button>
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
            filteredCategories.map(([key, lessons], idx) => (
              <div key={key} className="mb-6">
                <div className="flex flex-col gap-3">
                  {lessons.map((lesson, i) => (
                    <AnimatedContainer key={lesson.id} delay={0.6 + idx * 0.1 + i * 0.05}>
                      <LessonCard
                        lesson={{
                          id: lesson.id.toString(),
                          title: lesson.lessonName,
                          description: lesson.lessonDescription,
                          lessonLink: lesson.lessonLink,
                          isExpanded: expandedLessons.includes(lesson.id),
                        }}
                        lessonNumber={i + 1}
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
              <p className="text-white/60 text-sm">У вас пока нет избранных уроков для этой темы</p>
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

