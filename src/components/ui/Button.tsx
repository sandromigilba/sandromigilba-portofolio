"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "left",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-blue/30 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-blue-600/30 text-white border border-blue-400/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:bg-blue-500/40 hover:border-blue-300/60 hover:shadow-[0_8px_40px_rgba(37,99,235,0.4)] transition-all",
    secondary:
      "bg-white/15 text-slate-800 border border-white/30 backdrop-blur-xl hover:bg-white/25 dark:bg-slate-950/20 dark:text-slate-200 dark:border-white/10 dark:hover:bg-slate-950/30",
    outline:
      "bg-transparent text-slate-800 border border-white/20 backdrop-blur-xl hover:bg-white/15 dark:text-slate-200 dark:border-white/10 dark:hover:bg-slate-950/15",
    ghost:
      "bg-transparent text-slate-600 hover:bg-white/10 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-950/15 dark:hover:text-slate-200",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 550, damping: 20 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2 inline-flex items-center justify-center">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-2 inline-flex items-center justify-center">{icon}</span>
      )}
    </motion.button>
  );
};
