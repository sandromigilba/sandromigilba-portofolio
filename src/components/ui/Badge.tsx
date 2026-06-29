import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

const getTagColors = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes("react") || t.includes("next")) {
    return "bg-blue-500/10 text-blue-200 border-blue-500/25 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/30";
  }
  if (t.includes("typescript") || t.includes("js") || t.includes("javascript")) {
    return "bg-indigo-500/10 text-indigo-200 border-indigo-500/25 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-900/30";
  }
  if (t.includes("tailwind") || t.includes("css") || t.includes("style")) {
    return "bg-cyan-500/10 text-cyan-200 border-cyan-500/25 dark:bg-cyan-950/30 dark:text-cyan-300 dark:border-cyan-900/30";
  }
  if (
    t.includes("node") ||
    t.includes("api") ||
    t.includes("express") ||
    t.includes("postgres") ||
    t.includes("mysql") ||
    t.includes("mongo")
  ) {
    return "bg-emerald-500/10 text-emerald-200 border-emerald-500/25 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/30";
  }
  if (t.includes("motion") || t.includes("animation") || t.includes("framer")) {
    return "bg-pink-500/10 text-pink-200 border-pink-500/25 dark:bg-pink-950/30 dark:text-pink-300 dark:border-pink-900/30";
  }
  return "bg-violet-500/10 text-violet-200 border-violet-500/25 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-900/30";
};

export const Badge: React.FC<BadgeProps> = ({ children }) => {
  const baseStyles =
    "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 backdrop-blur-md border";

  const textContent = typeof children === "string" ? children : "";
  const dynamicColors = textContent
    ? getTagColors(textContent)
    : "bg-transparent text-white border-white/15 dark:border-white/10";

  return <span className={`${baseStyles} ${dynamicColors}`}>{children}</span>;
};
