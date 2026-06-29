"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { SectionTitle } from "../components/SectionTitle";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiNginx,
  SiLinux,
} from "react-icons/si";

interface SkillItem {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "React", level: 95, icon: <SiReact className="text-[#61DAFB]" size={24} /> },
      { name: "TypeScript", level: 90, icon: <SiTypescript className="text-[#3178C6]" size={24} /> },
      { name: "Next.js", level: 88, icon: <SiNextdotjs className="text-slate-900 dark:text-white" size={24} /> },
      { name: "Tailwind CSS", level: 95, icon: <SiTailwindcss className="text-[#06B6D4]" size={24} /> },
    ],
  },
  {
    title: "Backend Development",
    skills: [
      { name: "Node.js", level: 85, icon: <SiNodedotjs className="text-[#339933]" size={24} /> },
      { name: "Express", level: 82, icon: <SiExpress className="text-slate-700 dark:text-slate-300" size={24} /> },
      { name: "Laravel", level: 75, icon: <SiLaravel className="text-[#FF2D20]" size={24} /> },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", level: 85, icon: <SiPostgresql className="text-[#4169E1]" size={24} /> },
      { name: "MySQL", level: 80, icon: <SiMysql className="text-[#4479A1]" size={24} /> },
      { name: "MongoDB", level: 78, icon: <SiMongodb className="text-[#47A248]" size={24} /> },
    ],
  },
  {
    title: "DevOps & Infrastructure",
    skills: [
      { name: "Docker", level: 80, icon: <SiDocker className="text-[#2496ED]" size={24} /> },
      { name: "Linux VPS", level: 82, icon: <SiLinux className="text-[#FCC624]" size={24} /> },
      { name: "Nginx", level: 78, icon: <SiNginx className="text-[#009639]" size={24} /> },
    ],
  },
];

interface SkillsProps {
  title?: string;
  subtitle?: string;
}

export const Skills: React.FC<SkillsProps> = ({
  title = "Tech Stack",
  subtitle = "Expertise"
}) => {
  return (
    <section id="tech-stack" className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transitionEnd: { filter: "none" },
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: catIdx * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-3 text-left pl-1">
                {category.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {category.skills.map((skill) => (
                  <Card key={skill.name} className="p-4 flex items-center gap-3" hoverable={true}>
                    <div className="p-2.5 bg-white/10 dark:bg-slate-950/10 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-[12px] flex items-center justify-center">
                      {skill.icon}
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {skill.name}
                    </span>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
