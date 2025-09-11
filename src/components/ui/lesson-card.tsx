"use client";

import { motion } from "framer-motion";
import { GlassButton } from "./glass-button";

interface Lesson {
  id: string;
  title: string;
  description: string;
  lessonLink?: string;
  isExpanded?: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  isLiked: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  onToggleLike: () => void;
  onToggleComplete: () => void;
  onToggleExpand: () => void;
}

export function LessonCard({
  lesson,
  isLiked,
  isCompleted,
  isExpanded,
  onToggleLike,
  onToggleComplete,
  onToggleExpand
}: LessonCardProps) {
  return (
    <motion.div>
      <GlassButton 
        size="md" 
        className="text-white w-full text-left p-4 h-auto mb-3"
        variant="default"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-white/60 font-medium">
                #{lesson.id}
              </span>
              <h3 className="text-white font-semibold">
                {lesson.title}
              </h3>
            </div>
            {!isExpanded && (
              <p className="text-white/50 text-xs ml-8 max-w-[200px]">
                {lesson.description.substring(0, 50)}...
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <motion.svg 
              className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                isLiked ? 'text-red-500' : 'text-white/40'
              }`}
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike();
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </motion.svg>
            
            <motion.svg 
              className={`w-5 h-5 cursor-pointer transition-colors duration-200 ${
                isCompleted ? 'text-green-500' : 'text-white/40'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete();
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </motion.svg>
            
            <motion.svg 
              className="w-5 h-5 text-white/60 cursor-pointer"
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
              animate={{
                rotate: isExpanded ? 180 : 0
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </motion.svg>
          </div>
        </div>
        
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="overflow-hidden"
        >
          <div className="mt-4">
            <div className="pt-4 border-t border-white/20">
              <p className="text-white/70 mb-4 text-sm">
                {lesson.description}
              </p>

              <div 
                className="w-full py-2 px-3 rounded-lg bg-white text-black transition-colors duration-200 cursor-pointer border border-white/20"
                onClick={(e) => {
                  e.stopPropagation();
                  if (lesson.lessonLink) {
                    window.open(lesson.lessonLink, '_blank');
                  }
                }}
              >
                <div className="flex items-center justify-center gap-2 text-black text-sm font-medium">
                  Смотреть урок
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </GlassButton>
    </motion.div>
  );
}