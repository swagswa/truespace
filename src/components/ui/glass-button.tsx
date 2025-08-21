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
    transition-all duration-300
    transform hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-white/20
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100
  `;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3',
    lg: 'px-6 py-4 text-lg'
  };

  const variantClasses = {
    default: 'hover:bg-white/10',
    hover: 'hover:bg-white/15 hover:border-white/25',
    active: 'bg-white/15 border-white/25',
    primary: 'hover:bg-white/10',
    secondary: 'hover:bg-white/10'
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