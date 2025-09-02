"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LessonCard } from "@/components/ui/lesson-card";
import { AnimatedContainer } from "@/components/ui/animated-container";

// --- CSRF Helper ---
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
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
};

export default function SubtopicPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [smallTopicName, setSmallTopicName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);

  // 🔐 Prefetch CSRF token on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/csrf/", {
      credentials: "include",
    }).catch(() => {});
  }, []);

  // 📚 Fetch lessons + favorites + completed
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [subtopicRes, favoritesRes, completedRes] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/smalltopic/${slug}/`, { credentials: "include" }),
        fetch("http://127.0.0.1:8000/api/favorites/", { credentials: "include" }),
        fetch("http://127.0.0.1:8000/api/completed/", { credentials: "include" }),
        ]);

        if (!subtopicRes.ok) throw new Error("Failed to fetch lessons");
        if (!favoritesRes.ok) throw new Error("Failed to fetch favorites");
        if (!completedRes.ok) throw new Error("Failed to fetch completed");

        const subtopicData = await subtopicRes.json();
        const favoritesData: { id: number }[] = await favoritesRes.json();
        const completedData: { id: number }[] = await completedRes.json();

        const favoriteIds = new Set(favoritesData.map((l) => l.id));
        const completedIds = new Set(completedData.map((l) => l.id));

        const lessonsWithStatus = (subtopicData.lessons || []).map((lesson: Lesson) => ({
          ...lesson,
          liked: favoriteIds.has(lesson.id),
          completed: completedIds.has(lesson.id),
        }));

        setSmallTopicName(subtopicData.smallTopicName || slug);
        setLessons(lessonsWithStatus);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchData();
  }, [slug]);

  // ❤ Toggle favorite
  const toggleLike = async (lessonId: number) => {
    const csrftoken = getCookie("csrftoken");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/favorites/toggle/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
        },
        body: JSON.stringify({ lesson_id: lessonId }),
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");

      const data: { liked: boolean } = await res.json();

      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, liked: data.liked } : lesson
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Toggle completed
  const toggleCompleted = async (lessonId: number) => {
    const csrftoken = getCookie("csrftoken");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/completed/toggle/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken || "",
        },
        body: JSON.stringify({ lesson_id: lessonId }),
      });

      if (!res.ok) throw new Error("Failed to toggle completed");

      const data: { completed: boolean } = await res.json();

      setLessons((prev) =>
        prev.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, completed: data.completed } : lesson
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const toggleExpanded = (id: number) => {
    setExpandedLessons((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0.1} direction="left">
            <button onClick={() => router.back()} className="inline-block mb-6 mt-4">
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </motion.svg>
            </button>
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
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </motion.svg>
                <h1 className="text-2xl font-bold text-white">
                  Подраздел: {smallTopicName}
                </h1>
              </div>
            </AnimatedContainer>
            <AnimatedContainer delay={0.5} direction="up">
              <p className="text-white/80 text-sm mb-6">
                Уроки по теме &quot;{smallTopicName}&quot;
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-white text-center">Загрузка...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Lessons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {!loading && !error && lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <AnimatedContainer key={lesson.id} delay={0.8 + index * 0.1} direction="up">
                <LessonCard
                  lesson={{
                    id: lesson.id.toString(),
                    title: lesson.lessonName,
                    description: lesson.lessonDescription,
                    isExpanded: expandedLessons.includes(lesson.id),
                  }}
                  isLiked={lesson.liked}
                  isCompleted={lesson.completed}
                  isExpanded={expandedLessons.includes(lesson.id)}
                  onToggleLike={() => toggleLike(lesson.id)}
                  onToggleComplete={() => toggleCompleted(lesson.id)}
                  onToggleExpand={() => toggleExpanded(lesson.id)}
                />
              </AnimatedContainer>
            ))
          ) : (
            !loading && !error && (
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </motion.svg>
                  <h3 className="text-white/60 text-lg font-medium mb-2">Нет уроков</h3>
                  <p className="text-white/40 text-sm">
                    Уроки появятся здесь, когда вы их добавите
                  </p>
                </AnimatedContainer>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  );
}

