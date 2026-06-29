"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const BackgroundBackdrop: React.FC = () => {
  const { wallpaper } = useTheme();
  const [prevWallpaper, setPrevWallpaper] = useState(wallpaper);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPrevWallpaper(wallpaper);
    }, 700);
    return () => clearTimeout(timer);
  }, [wallpaper]);

  const wallpapers = ["wallpaper1", "wallpaper2", "wallpaper3", "wallpaper4", "wallpaper5"] as const;

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
      {wallpapers.map((wp) => (
        <div
          key={wp}
          style={{
            backgroundImage: `url(/background/${wp}.webp)`,
            zIndex: wallpaper === wp ? 2 : prevWallpaper === wp ? 1 : 0,
          }}
          className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-700 ease-in-out ${
            wallpaper === wp
              ? "opacity-100"
              : prevWallpaper === wp
              ? "opacity-100"
              : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};
