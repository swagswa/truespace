"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/glass-button";
import { AnimatedContainer } from "@/components/ui/animated-container";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md text-center">
        {/* 404 Number */}
        <AnimatedContainer delay={0} scale={true}>
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
          >
            <h1 className="text-8xl font-bold text-white mb-4 tracking-wider">
              404
            </h1>
          </motion.div>
        </AnimatedContainer>

        {/* Error Icon */}
        <AnimatedContainer delay={0.2} direction="up">
          <motion.div 
            className="mb-6"
            whileHover={{ 
              scale: 1.1, 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <svg 
              className="w-16 h-16 mx-auto text-white/60" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </motion.div>
        </AnimatedContainer>

        {/* Error Message */}
        <AnimatedContainer delay={0.4} direction="up">
          <h2 className="text-2xl font-bold text-white mb-4">
            Страница не найдена
          </h2>
        </AnimatedContainer>

        <AnimatedContainer delay={0.6} direction="up">
          <p className="text-white/80 text-base mb-8 leading-relaxed">
            К сожалению, запрашиваемая страница не существует или была перемещена.
            Возможно, вы перешли по устаревшей ссылке.
          </p>
        </AnimatedContainer>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <AnimatedContainer delay={0.8} direction="up">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className="block">
                <GlassButton 
                  size="lg" 
                  className="text-white w-full p-4 h-auto"
                  variant="primary"
                >
                  <div className="flex items-center justify-center gap-3">
                    <motion.svg 
                      className="w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </motion.svg>
                    <span className="font-semibold">Вернуться на главную</span>
                  </div>
                </GlassButton>
              </Link>
            </motion.div>
          </AnimatedContainer>

          <AnimatedContainer delay={1.0} direction="up">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <GlassButton 
                onClick={() => window.history.back()}
                size="lg" 
                className="text-white w-full p-4 h-auto"
                variant="default"
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </motion.svg>
                  <span className="font-semibold">Назад</span>
                </div>
              </GlassButton>
            </motion.div>
          </AnimatedContainer>
        </div>

        {/* Decorative Elements */}
        <AnimatedContainer delay={1.2} direction="up">
          <motion.div 
            className="mt-12 flex justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-white/30 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2
                }}
              />
            ))}
          </motion.div>
        </AnimatedContainer>
      </div>
    </div>
  );
}