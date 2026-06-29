"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type Wallpaper = "wallpaper1" | "wallpaper2" | "wallpaper3" | "wallpaper4";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  wallpaper: Wallpaper;
  setWallpaper: (wp: Wallpaper) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [wallpaper, setWallpaperState] = useState<Wallpaper>("wallpaper1");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read from localStorage after mount (client-only)
    const savedTheme = (localStorage.getItem("theme") as Theme | null) || "light";
    const savedWallpaper =
      (localStorage.getItem("bg-type") as Wallpaper | null) || "wallpaper1";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme);
    setWallpaperState(savedWallpaper);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.backgroundColor = "#0F172A";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#F8FAFC";
    }
    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("bg-type", wallpaper);
  }, [wallpaper, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setWallpaper = (wp: Wallpaper) => {
    setWallpaperState(wp);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, wallpaper, setWallpaper }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
