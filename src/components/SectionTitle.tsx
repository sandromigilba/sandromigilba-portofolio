"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  icon?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = true,
  icon,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 lg:mb-16 flex flex-col gap-3 ${
        centered ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {subtitle && (
        <span className="text-sm font-bold uppercase tracking-widest text-brand-blue-accent">
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3 ${centered ? "justify-center" : "justify-start"}`}>
        {icon && <span className="text-brand-blue-accent">{icon}</span>}
        {title}
      </h2>
      <div className="h-1.5 w-16 bg-brand-blue-accent rounded-full" />
    </motion.div>
  );
};
