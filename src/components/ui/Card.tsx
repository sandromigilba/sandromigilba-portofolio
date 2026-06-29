"use client";

import React, { useState } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  hoverable?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = true,
  glow = false,
  className = "",
  ...props
}) => {
  const [hovered, setHovered] = useState(false);

  const baseStyles =
    "bg-white/5 dark:bg-slate-950/30 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[30px] p-6 lg:p-8 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-premium transform-gpu";

  const hoverStyles = hoverable
    ? "shadow-premium-hover border-blue-200 dark:border-blue-500/30"
    : "";

  const glowStyles = glow
    ? "shadow-blue-glow border-blue-200 dark:border-blue-900/50"
    : "";

  if (hoverable) {
    return (
      <div
        className="flex h-full w-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className={`${baseStyles} ${hovered ? hoverStyles : ""} ${glowStyles} ${className} w-full`}
          {...props}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`${baseStyles} ${glowStyles} ${className}`}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  );
};
