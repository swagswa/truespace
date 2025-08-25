"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassButton } from "./glass-button";

interface AnimatedNavButtonProps {
  href: string;
  variant: 'primary' | 'secondary';
  icon: React.ReactNode;
  children: React.ReactNode;
  index: number;
}

const AnimatedNavButton = ({ href, variant, icon, children, index }: AnimatedNavButtonProps) => {
  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.6 + (index * 0.1),
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        type: "spring" as const,
        stiffness: 120,
        damping: 12
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: variant === 'primary' ? 10 : -10,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div
      className="flex-1"
      variants={buttonVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Link href={href}>
        <motion.div variants={hoverVariants}>
          <GlassButton variant={variant} size="md" className="w-full py-4 text-white">
            <div className="flex items-center justify-center gap-2">
              <motion.div variants={iconVariants}>
                {icon}
              </motion.div>
              <motion.span
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.span>
            </div>
          </GlassButton>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default AnimatedNavButton;
export { AnimatedNavButton };