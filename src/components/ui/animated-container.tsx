"use client";
import React from "react";
import { motion } from "framer-motion";

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: boolean;
}

const AnimatedContainer = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  scale = false
}: AnimatedContainerProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 50, opacity: 0 };
      case 'down':
        return { y: -50, opacity: 0 };
      case 'left':
        return { x: -50, opacity: 0 };
      case 'right':
        return { x: 50, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  const getFinalPosition = () => {
    return { x: 0, y: 0, opacity: 1 };
  };

  return (
    <motion.div
      className={className}
      initial={{
        ...getInitialPosition(),
        ...(scale && { scale: 0.8 })
      }}
      animate={{
        ...getFinalPosition(),
        ...(scale && { scale: 1 })
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Apple-like easing
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
export { AnimatedContainer };