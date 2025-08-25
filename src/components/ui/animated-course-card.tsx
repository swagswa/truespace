"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassButton } from "./glass-button";

interface Course {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface AnimatedCourseCardProps {
  course: Course;
  index: number;
}

const AnimatedCourseCard = ({ course, index }: AnimatedCourseCardProps) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const cardTransition = {
    duration: 0.6,
    delay: index * 0.1,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
    type: "spring" as const,
    stiffness: 100,
    damping: 15
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  const CourseCard = (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      transition={cardTransition}
      whileHover="hover"
      whileTap="tap"
      className="w-full"
    >
      <motion.div variants={hoverVariants}>
        <GlassButton 
          size="lg" 
          className="text-white w-full text-left p-4 h-auto transition-all duration-500"
          variant="default"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-white"
              variants={iconVariants}
            >
              {course.icon}
            </motion.div>
            <div className="flex-1">
              <motion.div 
                className="font-semibold text-base mb-1"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {course.title}
              </motion.div>
              <motion.div 
                className="text-white/70 text-sm"
                initial={{ opacity: 0.7 }}
                whileHover={{ opacity: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {course.description}
              </motion.div>
            </div>
          </div>
        </GlassButton>
      </motion.div>
    </motion.div>
  );

  return course.href ? (
    <Link href={course.href} className="block">
      {CourseCard}
    </Link>
  ) : (
    CourseCard
  );
};

export default AnimatedCourseCard;
export { AnimatedCourseCard };