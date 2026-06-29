"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../components/ui/Card";
import { SectionTitle } from "../components/SectionTitle";
import { FiCode, FiSmartphone, FiActivity, FiLayers, FiRadio } from "react-icons/fi";

interface Service {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}

const servicesList: Service[] = [
  {
    id: "service-1",
    icon: <FiCode className="text-blue-600 dark:text-blue-400" size={30} />,
    iconBg: "bg-blue-100/60 dark:bg-blue-900/30",
    title: "Web Development",
    description:
      "Building responsive, modern, and super-fast web applications using React, Next.js, and TypeScript. Optimized for high speed, reliability, and security.",
  },
  {
    id: "service-2",
    icon: <FiSmartphone className="text-indigo-600 dark:text-indigo-400" size={30} />,
    iconBg: "bg-indigo-100/60 dark:bg-indigo-900/30",
    title: "Landing Page Development",
    description:
      "Crafting highly optimized, premium marketing landing pages with rich micro-animations, designed to capture leads and convert visitors into active customers.",
  },
  {
    id: "service-3",
    icon: <FiActivity className="text-emerald-600 dark:text-emerald-400" size={30} />,
    iconBg: "bg-emerald-100/60 dark:bg-emerald-900/30",
    title: "Dashboard Development",
    description:
      "Creating full-featured data dashboards, command palettes, grid layouts, and advanced analytical panels with sub-second filtering and keyboard navigations.",
  },
  {
    id: "service-4",
    icon: <FiRadio className="text-orange-600 dark:text-orange-400" size={30} />,
    iconBg: "bg-orange-100/60 dark:bg-orange-900/30",
    title: "API Integration",
    description:
      "Integrating secure RESTful, GraphQL, and webhook APIs. Mapping database pipelines (PostgreSQL, MySQL, MongoDB) with external SaaS products.",
  },
  {
    id: "service-5",
    icon: <FiLayers className="text-rose-600 dark:text-rose-400" size={30} />,
    iconBg: "bg-rose-100/60 dark:bg-rose-900/30",
    title: "UI Implementation",
    description:
      "Translating static Figma or web prototypes into pixel-perfect, clean, structured Tailwind CSS code matching original brand guidelines.",
  },
];

interface ServicesProps {
  title?: string;
  subtitle?: string;
}

export const Services: React.FC<ServicesProps> = ({
  title = "Services I Offer",
  subtitle = "Solutions"
}) => {
  return (
    <section id="services" className="py-24 bg-transparent transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionTitle title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transitionEnd: { filter: "none" },
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="flex"
            >
              <Card
                className="w-full flex flex-col items-start text-left p-8 hover:shadow-blue-500/10"
                hoverable={true}
              >
                {/* Icon Panel */}
                <div className={`p-4 rounded-[20px] mb-6 flex items-center justify-center ${service.iconBg}`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
