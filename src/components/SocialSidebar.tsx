"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiLinkedin, FiGithub, FiInstagram, FiYoutube, FiMail } from "react-icons/fi";

export const SocialSidebar: React.FC = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FiLinkedin size={20} />,
      url: "https://www.linkedin.com/in/sandromigilba/",
      color: "hover:text-brand-blue-accent",
    },
    {
      name: "GitHub",
      icon: <FiGithub size={20} />,
      url: "https://github.com/sandromigilba",
      color: "hover:text-brand-blue-accent",
    },
    {
      name: "Instagram",
      icon: <FiInstagram size={20} />,
      url: "https://instagram.com/sandromigilba",
      color: "hover:text-brand-blue-accent",
    },
    {
      name: "YouTube",
      icon: <FiYoutube size={20} />,
      url: "https://youtube.com/@sandromigilba",
      color: "hover:text-brand-blue-accent",
    },
    {
      name: "Email",
      icon: <FiMail size={20} />,
      url: "mailto:sandromigilba10@gmail.com",
      color: "hover:text-brand-blue-accent",
    },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6">
      {/* Upper Line */}
      <div className="w-[1px] h-20 bg-gradient-to-t from-white/20 to-transparent" />

      {/* Social Icons Container */}
      <div className="flex flex-col gap-4 py-3 px-3 bg-white/5 dark:bg-slate-950/30 border border-white/10 dark:border-white/5 rounded-full backdrop-blur-xl shadow-premium">
        {socialLinks.map((link, idx) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative p-3 rounded-full text-white/80 hover:text-white hover:bg-white/10 hover:shadow-md flex items-center justify-center cursor-pointer ${link.color}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.1, duration: 0.3 } }}
            whileHover={{ scale: 1.25, transition: { type: "spring", stiffness: 600, damping: 10 } }}
            whileTap={{ scale: 0.9 }}
            style={{ display: "flex" }}
          >
            {link.icon}
            <span className="absolute left-14 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-left px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-transparent dark:bg-slate-950/60 backdrop-blur-xl border border-white/15 dark:border-white/10 text-white shadow-premium pointer-events-none whitespace-nowrap">
              {link.name}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Lower Line */}
      <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
    </div>
  );
};
