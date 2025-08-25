"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function AIAgentsSelection() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 pt-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-4">
          <AnimatedContainer delay={0} direction="left">
            <Link href="/" className="inline-block mb-6 mt-4">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </motion.svg>
            </Link>
          </AnimatedContainer>
          <div className="text-center">
            <AnimatedContainer delay={0.2} direction="up">
              <h1 className="text-3xl font-bold text-white mb-4">
                AI Агенты
              </h1>
            </AnimatedContainer>
            <AnimatedContainer delay={0.4} direction="up">
              <p className="text-white/80 text-sm mb-8">
                Выберите раздел для изучения
              </p>
            </AnimatedContainer>
          </div>
        </div>

        {/* Selection Options */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <AnimatedContainer delay={0.8} direction="up">
            <Link href="/ai-agents/sprint-september-2025">
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
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </motion.svg>
                      <h3 className="text-xl font-semibold text-white">
                        Спринт Сентябрь 2025
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      Актуальные уроки текущего спринта по AI агентам
                    </p>
                  </div>
                </GlassButton>
              </motion.div>
            </Link>
          </AnimatedContainer>

          <AnimatedContainer delay={1} direction="up">
            <Link href="/ai-agents/archive">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <GlassButton 
                  size="lg" 
                  className="text-white w-full text-center p-6 h-auto"
                  variant="default"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                      <motion.svg 
                        className="w-6 h-6 text-white/60" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24"
                        whileHover={{ rotate: -5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </motion.svg>
                      <h3 className="text-xl font-semibold text-white">
                        Архив уроков
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      Все предыдущие уроки и материалы по AI агентам
                    </p>
                  </div>
                </GlassButton>
              </motion.div>
            </Link>
          </AnimatedContainer>
        </motion.div>
      </div>
    </div>
  );
}