"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

const navItems = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 80) { setActive("home"); return; }
      const ids = ["contact", "projects", "skills", "about", "home"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/40 backdrop-blur-xl"
      style={{ boxShadow: "0 0 40px rgba(255,186,56,0.06)" }}>
      <div className="flex justify-between items-center px-12 py-6 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <a href="#home" className="serif italic text-2xl" style={{ color: "var(--primary)" }}>
          {portfolioData.personal.name}
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className="serif text-lg tracking-tight transition-colors"
                style={{ color: isActive ? "var(--primary)" : "#94a3b8",
                         borderBottom: isActive ? "2px solid var(--primary)" : "2px solid transparent",
                         paddingBottom: "4px" }}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Resume CTA */}
        {portfolioData.personal.website && (
          <a
            href={portfolioData.personal.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-2.5 rounded-full font-bold text-sm tracking-wide hover:scale-105 transition-transform active:opacity-80"
            style={{
              background: "linear-gradient(to right, var(--primary), var(--primary-container))",
              color: "var(--on-primary-container)",
            }}
          >
            Resume
          </a>
        )}
      </div>
    </nav>
  );
}
