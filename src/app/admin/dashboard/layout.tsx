"use client";

import React from "react";
import { FiGrid, FiLogOut, FiHome, FiFolder, FiLayout, FiUser, FiCode, FiBox, FiMessageSquare } from "react-icons/fi";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <FiGrid size={18} /> },
    { href: "/admin/dashboard/hero", label: "Hero", icon: <FiLayout size={18} /> },
    { href: "/admin/dashboard/about", label: "About", icon: <FiUser size={18} /> },
    { href: "/admin/dashboard/skills", label: "Skills", icon: <FiCode size={18} /> },
    { href: "/admin/dashboard/projects", label: "Projects", icon: <FiFolder size={18} /> },
    { href: "/admin/dashboard/services", label: "Services", icon: <FiBox size={18} /> },
    { href: "/admin/dashboard/contact", label: "Contact", icon: <FiMessageSquare size={18} /> },
  ];

  return (
    <div className="h-screen overflow-hidden bg-black flex flex-col md:flex-row text-white relative">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white/5 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/10 flex flex-col shrink-0 relative z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-sandromigilbadev.jpg"
              alt="Logo"
              width={28}
              height={28}
              className="rounded-full border border-white/20"
            />
            <span className="font-black text-white tracking-tight">CMS Admin</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                pathname === link.href
                  ? "bg-brand-blue/30 text-cyan-300 border border-brand-blue/30 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all border border-transparent"
          >
            <FiHome size={18} />
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-transparent"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="h-16 bg-white/5 backdrop-blur-md border-b border-white/10 flex items-center px-8 shrink-0">
          <h2 className="font-bold text-white tracking-wide">Content Management System</h2>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
