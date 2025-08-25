"use client";

import { GlassButton } from "@/components/ui/glass-button";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function GraphicAISelection() {
  return (
    <AnimatedContainer>
      <div className="flex flex-col items-center min-h-screen p-4 pt-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/" className="inline-block mb-6 mt-4">
              <motion.svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                viewBox="0 0 24 24"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </motion.svg>
            </Link>
            <div className="text-center">
              <motion.h1 
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                Графический ИИ
              </motion.h1>
              <motion.p 
                className="text-white/80 text-sm mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                Выберите раздел для изучения
              </motion.p>
            </div>
          </motion.div>

          {/* Selection Options */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/graphic-ai/sprint-september-2025">
                <GlassButton 
                  size="lg" 
                  className="text-white w-full text-center p-6 h-auto transition-all duration-300"
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
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </motion.svg>
                      <h3 className="text-xl font-semibold text-white">
                        Спринт Сентябрь 2025
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      Актуальные уроки текущего спринта по графическому ИИ
                    </p>
                  </div>
                </GlassButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/graphic-ai/archive">
                <GlassButton 
                  size="lg" 
                  className="text-white w-full text-center p-6 h-auto transition-all duration-300"
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
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                      </motion.svg>
                      <h3 className="text-xl font-semibold text-white">
                        Архив уроков
                      </h3>
                    </div>
                    <p className="text-white/70 text-sm text-center">
                      Все предыдущие уроки и материалы по графическому ИИ
                    </p>
                  </div>
                </GlassButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedContainer>
  );
}