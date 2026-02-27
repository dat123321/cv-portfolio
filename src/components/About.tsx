"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const { personal, about } = portfolioData;

  return (
    <section id="about" ref={ref} className="py-32 px-8 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left */}
        <div>
          <div className="reveal flex items-center gap-4 mb-8">
            <span
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              01
            </span>
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--muted)" }}
            >
              About
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "var(--subtle)" }} />
          </div>

          <h2
            className="reveal font-display text-4xl md:text-5xl leading-tight mb-8"
            style={{ color: "var(--ink)" }}
          >
            Thoughtful by
            <br />
            <span className="italic" style={{ color: "var(--muted)" }}>
              nature
            </span>
          </h2>

          <p className="reveal text-base leading-loose" style={{ color: "var(--muted)" }}>
            {about.bio}
          </p>
        </div>

        {/* Right */}
        <div className="space-y-8">
          {/* Highlights */}
          <div className="reveal space-y-4">
            {about.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-4"
                style={{ borderBottom: "1px solid var(--subtle)" }}
              >
                <span style={{ color: "var(--accent)" }}>→</span>
                <span className="text-sm" style={{ color: "var(--ink)" }}>
                  {h}
                </span>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="reveal flex gap-4 flex-wrap">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm transition-all duration-200"
              style={{
                border: "1px solid var(--subtle)",
                color: "var(--muted)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = "var(--ink)";
                (e.target as HTMLElement).style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "var(--subtle)";
                (e.target as HTMLElement).style.color = "var(--muted)";
              }}
            >
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm transition-all duration-200"
              style={{
                border: "1px solid var(--subtle)",
                color: "var(--muted)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.borderColor = "var(--ink)";
                (e.target as HTMLElement).style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.borderColor = "var(--subtle)";
                (e.target as HTMLElement).style.color = "var(--muted)";
              }}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
