"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedCourseCard } from "@/components/ui/animated-course-card";
import { AnimatedNavButton } from "@/components/ui/animated-nav-button";
import { InlineIcon, IconName } from "@/components/ui/icon";

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
      fetch("https://sawfdawfawfasf.fun/api/login_with_id_redirect/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include", // ✅ Important for Django session
        body: `id=${encodeURIComponent(id)}`,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Login failed");
          return res.json();
        })
        .then((data) => {
          console.log("✅ Logged in:", data);
          if (data.success) {
            console.log(`✅ Successfully logged in as ${data.username} (ID: ${data.user_id})`);
            // Можно добавить дополнительную логику после успешного логина
          }
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
        const res = await fetch("https://sawfdawfawfasf.fun/api/bigtopics/");
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

  // Функция для выбора иконки в зависимости от индекса или названия урока
  const getTopicIcon = (topicName: string, index: number) => {
    const iconNames: IconName[] = ['book', 'lightning', 'webinar', 'design-ai', 'no-code'];
    const iconName = iconNames[index % iconNames.length];
    return <InlineIcon name={iconName} className="w-6 h-6" />;
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 pt-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <AnimatedContainer delay={0}>
            <div className="block mb-2">
              <motion.img
                src="/logo.svg"
                alt="TrueSpace Logo"
                className="w-24 h-24 mx-auto filter brightness-0 invert"
              />
            </div>
          </AnimatedContainer>
          <AnimatedContainer delay={0.2} direction="up">
            <h1 className="text-2xl font-bold text-white mb-2">TrueSpace</h1>
          </AnimatedContainer>
          <AnimatedContainer delay={0.4} direction="up">
            <p className="text-white/80 text-sm mb-4">Образовательная платформа</p>
          </AnimatedContainer>

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
                  icon: getTopicIcon(topic.topicName, index),
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

