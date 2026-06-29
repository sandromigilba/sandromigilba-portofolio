import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandro Migilba | Web Developer",
  description:
    "Premium portfolio of Sandro Migilba, a full-stack web developer specializing in building modern web applications, high-converting landing pages, and interactive dashboard UIs using React, TypeScript, and Tailwind CSS.",
  keywords:
    "Web Developer, React Developer, Full Stack Developer, Sandro Migilba, React Portfolio, TypeScript Developer, Tailwind CSS Expert, UI/UX Implementation",
  authors: [{ name: "Sandro Migilba" }],
  creator: "Sandro Migilba",
  openGraph: {
    type: "website",
    url: "https://sandro-porto.dev",
    title: "Sandro Migilba | Web Developer",
    description:
      "Premium portfolio of Sandro Migilba, a full-stack web developer specializing in modern web applications.",
    images: [
      {
        url: "https://sandro-porto.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sandro Migilba Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandro Migilba | Web Developer",
    description:
      "Premium portfolio of Sandro Migilba, a full-stack web developer.",
    images: ["https://sandro-porto.dev/og-image.jpg"],
  },
  icons: {
    icon: "/logo-sandromigilbadev.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
