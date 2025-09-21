"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/glass-button";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { AnimatedNavButton } from "@/components/ui/animated-nav-button";
import { InlineIcon } from "@/components/ui/icon";

type SmallTopic = {
  id: number;
  topicName: string;
  topicDescription: string;
  slug: string;
};

export default function TopicDetailPage() {
  const { slug } = useParams();
  const [smallTopics, setSmallTopics] = useState<SmallTopic[]>([]);
  const [bigTopicName, setBigTopicName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSmallTopics() {
      try {
        const response = await fetch(`https://sawfdawfawfasf.fun/api/bigtopic/${slug}/`);
        if (!response.ok) throw new Error("Failed to fetch small topics");
        const data = await response.json();

        setBigTopicName(data.bigTopicName);
        setSmallTopics(data.smallTopics);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchSmallTopics();
  }, [slug]);

  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0.1} direction="up">
            <Link href="/" className="inline-block mb-6 mt-4">
              <motion.svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1, x: -2 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </motion.svg>
            </Link>
          </AnimatedContainer>

          <div className="text-center">
            <AnimatedContainer delay={0.2} direction="up">
              <h1 className="text-3xl font-bold text-white mb-4">
                Раздел: {bigTopicName || slug}
              </h1>
            </AnimatedContainer>
            <AnimatedContainer delay={0.3} direction="up">
              <p className="text-white/80 text-sm mb-8">
                Выберите подраздел для изучения
              </p>
            </AnimatedContainer>

            {/* Navigation buttons */}
            <AnimatedContainer delay={0.4} direction="up">
              <div className="flex gap-2 justify-center mb-6">
                <AnimatedNavButton
                  href={`/favorites?topic=${slug}`}
                  variant="primary"
                  index={0}
                  icon={<InlineIcon name="heart" className="w-5 h-5 text-red-500" />}
                >
                  Избранное
                </AnimatedNavButton>
                <AnimatedNavButton
                  href={`/completed?topic=${slug}`}
                  variant="secondary"
                  index={1}
                  icon={<InlineIcon name="check" className="w-5 h-5 text-green-500" />}
                >
                  Завершенные
                </AnimatedNavButton>
              </div>
            </AnimatedContainer>
          </div>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-white text-center">Загрузка...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Render SmallTopics */}
        {!loading && !error && smallTopics.length > 0 && (
          <div className="flex flex-col gap-4">
            {smallTopics.map((topic, index) => (
              <AnimatedContainer
                key={topic.id}
                delay={0.4 + index * 0.1}
                direction="up"
              >
                <Link href={`/subtopics/${topic.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassButton
                      size="lg"
                      className="text-white w-full text-center p-6 h-auto"
                      variant="primary"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex items-center gap-3">
                          <motion.svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            whileHover={{ rotate: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </motion.svg>
                          <h3 className="text-xl font-semibold text-white">
                            {topic.topicName}
                          </h3>
                        </div>
                        <p className="text-white/70 text-sm text-center">
                          {topic.topicDescription}
                        </p>
                      </div>
                    </GlassButton>
                  </motion.div>
                </Link>
              </AnimatedContainer>
            ))}
          </div>
        )}

        {!loading && !error && smallTopics.length === 0 && (
          <p className="text-white text-center">Нет подразделов</p>
        )}
      </div>
    </div>
  );
}

