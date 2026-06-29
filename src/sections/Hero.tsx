"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { Button } from "../components/ui/Button";
import Image from "next/image";

interface HeroProps {
  title?: string;
  description?: string;
  title_font_size?: string;
}

export const Hero: React.FC<HeroProps> = ({ 
  title = 'Crafting Premium <br /> <span class="text-brand-blue-accent/80">Web Experiences</span>', 
  description = `Hi, I'm <strong class="text-slate-900 dark:text-white font-semibold">Sandro Migilba</strong>. A Full Stack Web Developer. I build modern, high-converting interfaces and robust applications using React, TypeScript, Tailwind CSS, and Framer Motion. Focused on pixel-perfection, speed, and premium design.`,
  title_font_size
}) => {
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-transparent pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-12 relative z-10">

        {/* Left Side: Developer Cartoon Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 lg:col-span-6 flex justify-center items-center relative order-1 lg:order-1"
        >
          {/* Rotating Dotted Border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border-4 border-dotted border-white/25 dark:border-white/15 w-[272px] h-[272px] sm:w-[336px] sm:h-[336px] md:w-[400px] md:h-[400px]"
          />
          {/* Outer Rotating Dotted Border */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute rounded-full border-4 border-dotted border-white/15 dark:border-white/10 w-[288px] h-[288px] sm:w-[352px] sm:h-[352px] md:w-[416px] md:h-[416px]"
          />
          {/* Main Illustration Container */}
          <div className="relative rounded-full p-4 bg-transparent dark:bg-slate-950/50 border border-white/15 dark:border-white/10 shadow-premium w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-hidden flex items-center justify-center z-10">
            <Image
              src="/hero_developer.webp"
              alt="Sandro Migilba - Web Developer"
              fill
              className="object-cover rounded-full"
              priority
            />
          </div>
        </motion.div>

        {/* Right Side: Copy & CTA */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="col-span-1 lg:col-span-6 flex flex-col items-start text-left order-2 lg:order-2"
        >
          <h1 
            className={`font-black text-slate-900/75 dark:text-white/70 leading-[1.1] tracking-tight mb-6 ${!title_font_size ? 'text-4xl sm:text-5xl lg:text-6xl' : ''}`}
            style={title_font_size ? { fontSize: title_font_size } : {}}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <p 
            className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed mb-8 max-w-xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="primary"
              onClick={scrollToContact}
              icon={<FiArrowRight size={18} />}
              iconPosition="right"
              className="w-full sm:w-auto text-center py-4"
            >
              Hire Me
            </Button>
            <Button
              variant="secondary"
              icon={<FiDownload size={18} />}
              onClick={() => window.open("#", "_blank")}
              className="w-full sm:w-auto text-center py-4"
            >
              Download CV
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
