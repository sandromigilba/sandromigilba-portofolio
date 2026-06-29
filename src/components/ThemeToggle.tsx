"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-3 bg-white/10 dark:bg-slate-950/20 text-slate-800 dark:text-slate-200 border border-white/20 dark:border-white/10 rounded-full shadow-sm hover:shadow-md backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:shadow-brand-blue/10 cursor-pointer focus:outline-none"
      aria-label="Toggle dark mode"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
      </motion.div>
    </motion.button>
  );
};
