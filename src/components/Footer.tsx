"use client";

import React from "react";
import { FiMail, FiLinkedin, FiGithub, FiImage, FiShield } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import Image from "next/image";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { wallpaper, setWallpaper } = useTheme();

  const toggleBackground = () => {
    setWallpaper(
      wallpaper === "wallpaper1"
        ? "wallpaper2"
        : wallpaper === "wallpaper2"
        ? "wallpaper3"
        : wallpaper === "wallpaper3"
        ? "wallpaper4"
        : "wallpaper1"
    );
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-white/10 dark:bg-slate-950/20 backdrop-blur-xl border-t border-white/20 dark:border-white/10 py-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

        {/* Left: Logo & Copyright */}
        <div className="flex flex-col md:items-start items-center gap-2">
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer"
          >
            <Image
              src="/logo-sandromigilbadev.jpg"
              alt="Sandro Migilba Logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-cover select-none pointer-events-none"
            />
            <span className="text-shadow-sm">sandro migilba hadi</span>
          </a>
          <p className="text-xs text-slate-200 dark:text-slate-200 font-medium text-shadow-sm">
            © {currentYear} Sandro Migilba. All rights reserved.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
          {[
            { label: "Home", href: "#home" },
            { label: "About", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "Contact", href: "#contact" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-semibold text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent transition-colors text-shadow-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Social Icons & Background Switcher */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleBackground}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-950/20 dark:hover:bg-slate-950/30 border border-white/20 dark:border-white/10 text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-105 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-blue/10 text-xs font-bold cursor-pointer text-shadow-sm"
            aria-label="Change Wallpaper"
          >
            <FiImage size={14} />
            <span>{wallpaper === "wallpaper1" ? "1" : wallpaper === "wallpaper2" ? "2" : wallpaper === "wallpaper3" ? "3" : "4"}</span>
          </button>

          <div className="h-5 w-[1px] bg-white/20 dark:bg-white/10" />

          <a
            href="mailto:sandromigilba10@gmail.com"
            className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-950/20 dark:hover:bg-slate-950/30 border border-white/20 dark:border-white/10 text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer"
            aria-label="Email"
          >
            <FiMail size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/sandromigilba/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-950/20 dark:hover:bg-slate-950/30 border border-white/20 dark:border-white/10 text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href="https://github.com/sandromigilba"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-950/20 dark:hover:bg-slate-950/30 border border-white/20 dark:border-white/10 text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer"
            aria-label="GitHub"
          >
            <FiGithub size={18} />
          </a>
          
          <div className="h-5 w-[1px] bg-white/20 dark:bg-white/10 mx-1" />

          <a
            href="/admin/login"
            className="inline-flex items-center justify-center p-2.5 rounded-full bg-white/10 hover:bg-white/20 dark:bg-slate-950/20 dark:hover:bg-slate-950/30 border border-white/20 dark:border-white/10 text-slate-200/50 dark:text-slate-200/50 hover:text-brand-blue-accent transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-110 hover:-translate-y-1 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer"
            aria-label="Admin Login"
          >
            <FiShield size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
};
