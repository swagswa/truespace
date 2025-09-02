"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/glass-button";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { InlineIcon } from "@/components/ui/icon";

export default function NotFound() {
  const router = useRouter();

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
            <InlineIcon name="alert-circle" className="w-16 h-16 mx-auto text-white/60" />
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
                    <motion.div
                      whileHover={{ x: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <InlineIcon name="home" className="w-5 h-5" />
                    </motion.div>
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
                onClick={() => router.back()}
                size="lg" 
                className="text-white w-full p-4 h-auto"
                variant="default"
              >
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    whileHover={{ x: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <InlineIcon name="arrow-left" className="w-5 h-5" />
                  </motion.div>
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