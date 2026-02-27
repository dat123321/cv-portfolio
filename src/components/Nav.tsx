"use client";

import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? "rgba(247,245,240,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e8e4dc" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-lg tracking-tight"
          style={{ color: "var(--ink)" }}
        >
          {portfolioData.personal.name.split(" ")[0]}
          <span style={{ color: "var(--accent)" }}>.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm tracking-wide transition-colors duration-200"
                style={{
                  color:
                    active === item.href.slice(1)
                      ? "var(--ink)"
                      : "var(--muted)",
                  fontWeight: active === item.href.slice(1) ? 500 : 300,
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${portfolioData.personal.email}`}
          className="hidden md:block text-sm px-5 py-2 rounded-full transition-all duration-300"
          style={{
            border: "1px solid var(--accent)",
            color: "var(--accent)",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.backgroundColor = "var(--accent)";
            (e.target as HTMLElement).style.color = "var(--paper)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.backgroundColor = "transparent";
            (e.target as HTMLElement).style.color = "var(--accent)";
          }}
        >
          Say Hello
        </a>
      </div>
    </nav>
  );
}
