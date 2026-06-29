"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { SectionTitle } from "../components/SectionTitle";
import Image from "next/image";
import { FiAward, FiCheckCircle, FiUsers, FiCpu, FiUser } from "react-icons/fi";

interface StatItem {
  id: string;
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface AboutProps {
  title?: string;
  description_p1?: string;
  description_p2?: string;
  stats_years?: string;
  stats_projects?: string;
  stats_clients?: string;
  stats_awards?: string;
  show_stats_years?: string;
  show_stats_projects?: string;
  show_stats_clients?: string;
  show_stats_awards?: string;
  stats_years_label?: string;
  stats_projects_label?: string;
  stats_clients_label?: string;
  stats_awards_label?: string;
}

export const About: React.FC<AboutProps> = ({
  title = "About Me",
  description_p1 = "I am a passionate Full-Stack developer who enjoys crafting clean, premium, and functional user interfaces. I bridge the gap between creative visual designs and high-performance system logic. By using modern web architectures like React, Next.js, TypeScript, and microservices, I create products that look great and scale infinitely.",
  description_p2 = "Whether it's building a conversion-optimized SaaS landing page, a complex responsive business dashboard, or custom API integrations, I follow clean-code principles, optimize for Core Web Vitals, and pay extreme attention to detail.",
  stats_years = "5+ Years",
  stats_projects = "60+ Projects",
  stats_clients = "35+ Clients",
  stats_awards = "20+ Techs",
  show_stats_years = "true",
  show_stats_projects = "true",
  show_stats_clients = "true",
  show_stats_awards = "true",
  stats_years_label = "Professional Experience",
  stats_projects_label = "Successfully Delivered",
  stats_clients_label = "Worldwide Satisfaction",
  stats_awards_label = "Modern Technologies"
}) => {
  const dynamicStats = [
    {
      id: "experience",
      icon: <FiAward className="text-brand-blue dark:text-brand-blue-accent" size={28} />,
      value: stats_years,
      label: stats_years_label,
      show: show_stats_years !== "false",
    },
    {
      id: "projects",
      icon: <FiCheckCircle className="text-brand-blue dark:text-brand-blue-accent" size={28} />,
      value: stats_projects,
      label: stats_projects_label,
      show: show_stats_projects !== "false",
    },
    {
      id: "clients",
      icon: <FiUsers className="text-brand-blue dark:text-brand-blue-accent" size={28} />,
      value: stats_clients,
      label: stats_clients_label,
      show: show_stats_clients !== "false",
    },
    {
      id: "techs",
      icon: <FiCpu className="text-brand-blue dark:text-brand-blue-accent" size={28} />,
      value: stats_awards,
      label: stats_awards_label,
      show: show_stats_awards !== "false",
    },
  ];

  const visibleStats = dynamicStats.filter(stat => stat.show);
  return (
    <section id="about" className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title={title} subtitle="Biography" icon={<FiUser />} />

        {/* Main large card wrapping bio and avatar */}
        <Card hoverable={false} className="w-full mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="hidden lg:flex col-span-1 lg:col-span-4 justify-center items-center relative"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border-4 border-dotted border-white/25 dark:border-white/15 w-[272px] h-[272px] sm:w-[336px] sm:h-[336px]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full border-4 border-dotted border-white/15 dark:border-white/10 w-[288px] h-[288px] sm:w-[352px] sm:h-[352px]"
              />
              <div className="relative rounded-full p-4 bg-transparent dark:bg-slate-950/50 border border-white/15 dark:border-white/10 shadow-premium w-64 h-64 sm:w-80 sm:h-80 overflow-hidden flex items-center justify-center z-10">
                <Image
                  src="/about_avatar.webp"
                  alt="Sandro Migilba Avatar"
                  fill
                  className="object-cover rounded-full"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right: Biography content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-1 lg:col-span-8 text-left"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Full-Stack Web Developer based in Indonesia &amp; remote.
              </h3>

              <p className="text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                {description_p1}
              </p>

              <p className="text-slate-800 dark:text-slate-200 leading-relaxed mb-6">
                {description_p2}
              </p>

              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 block font-medium">Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Sandro Migilba Hadi</span>
                </div>
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 block font-medium">Email</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">sandromigilba10@gmail.com</span>
                </div>
                <div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 block font-medium">Location</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Bogor, Indonesia</span>
                </div>
                <div>
                  <span className="text-sm text-slate-400 dark:text-slate-500 block">Job Status</span>
                  <span className="font-semibold text-blue-300 font-bold">Open to Offers</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Grid statistics cards */}
        {visibleStats.length > 0 && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${
            visibleStats.length === 1 ? "lg:grid-cols-1" :
            visibleStats.length === 2 ? "lg:grid-cols-2" :
            visibleStats.length === 3 ? "lg:grid-cols-3" :
            "lg:grid-cols-4"
          } gap-6`}>
            {visibleStats.map((stat, idx) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transitionEnd: { filter: "none" },
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
              >
                <Card className="flex flex-col items-center text-center p-8 h-full justify-center">
                  <div className="p-4 bg-blue-50/20 dark:bg-blue-950/10 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[20px] mb-4">
                    {stat.icon}
                  </div>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </h4>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
