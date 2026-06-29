"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center top-4 px-4">
      <div className="w-full transition-all duration-150 max-w-5xl bg-transparent dark:bg-slate-950/45 backdrop-blur-xl border-2 border-white/15 dark:border-white/10 shadow-premium py-3 px-6 rounded-full flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer select-none"
        >
          <Image
            src="/logo-sandromigilbadev.jpg"
            alt="Sandro Migilba Logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover select-none pointer-events-none"
          />
          <span className="hidden sm:inline text-shadow-sm">sandro migilba hadi</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-semibold text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent transition-colors cursor-pointer text-shadow-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="h-5 w-[1px] bg-white/20 dark:bg-white/10" />
          <ThemeToggle />
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-white/10 dark:hover:bg-slate-950/20 border border-transparent hover:border-white/20 dark:hover:border-white/10 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-40 md:hidden"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="w-full max-w-md mt-2 bg-white/30 dark:bg-slate-950/30 border border-white/20 dark:border-white/10 shadow-xl z-50 p-6 flex flex-col gap-4 md:hidden rounded-[24px] backdrop-blur-xl"
            >
              <ul className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block py-2 text-base font-semibold text-slate-200 dark:text-slate-200 hover:text-brand-blue-accent cursor-pointer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
