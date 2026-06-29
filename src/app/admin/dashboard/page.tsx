"use client";

import React, { useEffect, useState } from "react";
import { FiGrid, FiLayout, FiFolder, FiActivity } from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, loaded: false });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setStats({ projects: data.length || 0, loaded: true });
        }
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 relative overflow-hidden shadow-premium">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-blue/30 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white mb-2">Welcome Back, Admin 👋</h1>
          <p className="text-slate-300 text-lg">
            Manage your portfolio content, update your projects, and customize your sections from this dashboard.
          </p>
        </div>
      </div>

      {/* Quick Stats / Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/dashboard/projects" className="group">
          <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiFolder size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Projects</h3>
              <p className="text-slate-400 mt-1">
                {stats.loaded ? `${stats.projects} total projects` : "Loading..."}
              </p>
            </div>
          </div>
        </Link>

        <Link href="/admin/dashboard/hero" className="group">
          <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiLayout size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Hero Section</h3>
              <p className="text-slate-400 mt-1">Update your main introduction</p>
            </div>
          </div>
        </Link>

        <Link href="/admin/dashboard/about" className="group">
          <div className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FiActivity size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">About & Stats</h3>
              <p className="text-slate-400 mt-1">Manage biography and milestones</p>
            </div>
          </div>
        </Link>
      </div>
      
      {/* Instructions */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FiGrid className="text-brand-blue" /> How to use the CMS
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-300">
          <li>Select a section from the left sidebar to edit specific text content on your portfolio.</li>
          <li>Go to <strong>Projects</strong> to add, edit, or remove your portfolio items and images.</li>
          <li>All changes are saved directly to the database and will reflect instantly on the live site.</li>
          <li>Images uploaded to projects are automatically compressed to ensure fast loading times.</li>
        </ul>
      </div>
    </div>
  );
}
