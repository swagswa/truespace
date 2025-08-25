"use client";
import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'active' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const GlassButton = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}: GlassButtonProps) => {
  const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  const baseClasses = `
    glass-button
    transition-all duration-500 ease-out
    transform hover:scale-[1.02] active:scale-[0.98]
    hover:shadow-lg hover:shadow-white/10
    focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100 disabled:hover:shadow-none
    will-change-transform
    backface-visibility-hidden
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  const variantClasses = {
    default: 'hover:bg-white/10 hover:backdrop-blur-xl',
    hover: 'hover:bg-white/15 hover:border-white/30 hover:backdrop-blur-xl',
    active: 'bg-white/15 border-white/30 backdrop-blur-xl',
    primary: 'hover:bg-white/12 hover:backdrop-blur-xl hover:border-white/20',
    secondary: 'hover:bg-white/8 hover:backdrop-blur-xl hover:border-white/15'
  };

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlassButton;
export { GlassButton };