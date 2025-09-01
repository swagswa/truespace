"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedCourseCard } from "@/components/ui/animated-course-card";
import { AnimatedNavButton } from "@/components/ui/animated-nav-button";

type Topic = {
  id: number;
  topicName: string;
  topicDescription: string;
  slug: string;
};

function PageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Login with ID if provided
  useEffect(() => {
    if (id) {
      fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ Important for Django session
        body: JSON.stringify({ id }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Login failed");
          return res.json();
        })
        .then((data) => {
          console.log("✅ Logged in:", data);
        })
        .catch((err) => {
          console.error("❌ Login error:", err.message);
        });
    }
  }, [id]);

  // ✅ Fetch topics
  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/bigtopics/");
        if (!res.ok) throw new Error("Failed to fetch topics");

        const data = await res.json();
        setTopics(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Ошибка загрузки тем");
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  const defaultIcon = (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <AnimatedContainer delay={0}>
            <Link href="/admin" className="block mb-2 cursor-pointer">
              <motion.img
                src="/logo.svg"
                alt="TrueSpace Logo"
                className="w-24 h-24 mx-auto filter brightness-0 invert"
                whileHover={{ scale: 1.1, rotate: 12 }}
              />
            </Link>
          </AnimatedContainer>
          <AnimatedContainer delay={0.2} direction="up">
            <h1 className="text-2xl font-bold text-white mb-2">TrueSpace</h1>
          </AnimatedContainer>
          <AnimatedContainer delay={0.4} direction="up">
            <p className="text-white/80 text-sm mb-4">Образовательная платформа</p>
          </AnimatedContainer>

          {/* Navigation buttons */}
          <div className="flex gap-2 mb-6">
            <AnimatedNavButton
              href="/favorites"
              variant="primary"
              index={0}
              icon={
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              }
            >
              Избранное
            </AnimatedNavButton>
            <AnimatedNavButton
              href="/completed"
              variant="secondary"
              index={1}
              icon={
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              }
            >
              Завершенные
            </AnimatedNavButton>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-white text-center">Загрузка...</p>}
        {error && <p className="text-red-500 text-center">Ошибка: {error}</p>}

        {/* Topics List */}
        {!loading && !error && (
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {topics.map((topic, index) => (
              <AnimatedCourseCard
                key={topic.id}
                course={{
                  icon: defaultIcon,
                  title: topic.topicName,
                  description: topic.topicDescription,
                  href: `/topics/${topic.slug}`,
                }}
                index={index + 2}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center"><div className="text-white text-xl">Loading...</div></div>}>
      <PageContent />
    </Suspense>
  );
}

