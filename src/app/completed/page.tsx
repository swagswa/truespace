"use client";

import { LessonCard } from "@/components/ui/lesson-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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
  belongsTo: string;
  liked: boolean;
  completed: boolean;
};

export default function Completed() {
  const router = useRouter();
  const [lessonsByTopic, setLessonsByTopic] = useState<Record<string, Lesson[]>>({});
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topicParam, setTopicParam] = useState<string | null>(null);

  // Prefetch CSRF cookie so POSTs work
  useEffect(() => {
    fetch("https://sawfdawfawfasf.fun/api/csrf/", { credentials: "include" }).catch(() => {});
  }, []);

  // Read ?topic= from URL client-side
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setTopicParam(params.get("topic"));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [completedRes, favoritesRes] = await Promise.all([
          fetch("https://sawfdawfawfasf.fun/api/completed/", { credentials: "include" }),
      fetch("https://sawfdawfawfasf.fun/api/favorites/", { credentials: "include" }),
        ]);

        if (!completedRes.ok) throw new Error("Failed to fetch completed lessons");
        if (!favoritesRes.ok) throw new Error("Failed to fetch favorite lessons");

        const completed: Omit<Lesson, "liked">[] = await completedRes.json();
        const favorites: { id: number }[] = await favoritesRes.json();
        const favoriteIds = new Set(favorites.map((f) => f.id));

        const grouped: Record<string, Lesson[]> = {};
        completed.forEach((lesson) => {
          const topicKey = lesson.belongsTo || "other";
          grouped[topicKey] ||= [];
          grouped[topicKey].push({
            ...lesson,
            liked: favoriteIds.has(lesson.id),
            completed: true,
          });
        });

        // Filter by topicParam if provided
        setLessonsByTopic(topicParam ? { [topicParam]: grouped[topicParam] || [] } : grouped);
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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

      setLessonsByTopic((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          updated[key] = updated[key].filter((lesson) =>
            lesson.id === id ? data.completed : true
          );
          if (updated[key].length === 0) delete updated[key];
        }
        return updated;
      });
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Не удалось изменить статус завершения");
    }
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

      const data: { favorited: boolean } = await res.json();

      setLessonsByTopic((prev) => {
        const updated = { ...prev };
        for (const key in updated) {
          updated[key] = updated[key].map((lesson) =>
            lesson.id === id ? { ...lesson, liked: data.favorited } : lesson
          );
        }
        return updated;
      });
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Не удалось изменить избранное");
    }
  }

  const topicTitles: Record<string, string> = {
    beginners: "Для начинающих",
    "ai-agents": "AI Агенты",
    "no-code": "No-Code",
    "graphic-ai": "Графический ИИ",
    webinars: "Вебинары",
    other: "Другие",
  };

  if (loading) return <p className="text-white text-center">Загрузка завершенных уроков...</p>;
  if (error) return <p className="text-red-500 text-center">Ошибка: {error}</p>;

  const allLessons = Object.values(lessonsByTopic).flat();

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-sm">
        <AnimatedContainer delay={0.1}>
          <div className="mb-6">
            <button onClick={() => router.back()} className="inline-block mb-4">
              <motion.svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </motion.svg>
            </button>

            <div className="text-center">
              <AnimatedContainer delay={0.2}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <motion.svg
                    className="w-6 h-6 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="M20.285 6.709a1 1 0 00-1.414-1.418L9 15.172l-3.871-3.87a1 1 0 10-1.414 1.415l4.578 4.578a1 1 0 001.414 0l10.578-10.586z" />
                  </motion.svg>
                  <h1 className="text-2xl font-bold text-white">Завершенные уроки</h1>
                </div>
              </AnimatedContainer>
              <AnimatedContainer delay={0.3}>
                <p className="text-white/80 text-sm mb-6">
                  {topicParam
                    ? `Фильтр по теме: ${topicTitles[topicParam] || topicParam}`
                    : "Все уроки, которые вы завершили"}
                </p>
              </AnimatedContainer>
            </div>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.4}>
          {allLessons.length > 0 ? (
            Object.entries(lessonsByTopic).map(([key, lessons], idx) => (
              <div key={key} className="mb-6">
                <AnimatedContainer delay={0.5 + idx * 0.1}>
                  <h2 className="text-white text-lg font-semibold mb-2">
                    {topicTitles[key] || key}
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
                          lessonLink: lesson.lessonLink,
                          isExpanded: expandedLessons.includes(lesson.id),
                        }}
                        lessonNumber={i + 1}
                        isLiked={lesson.liked}
                        isCompleted={true}
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
              <p className="text-white/60 text-sm">У вас пока нет завершенных уроков</p>
              <Link href="/">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

