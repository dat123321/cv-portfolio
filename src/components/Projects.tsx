"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={ref} className="py-32 px-8" style={{ backgroundColor: "rgba(232,228,220,0.4)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>04</span>
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>Projects</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "var(--subtle)" }} />
        </div>

        <h2 className="reveal font-display text-4xl md:text-5xl mb-16 leading-tight" style={{ color: "var(--ink)" }}>
          Things I've<br />
          <span className="italic" style={{ color: "var(--muted)" }}>built</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project, i) => (
            <div
              key={i}
              className="reveal group p-8 rounded-sm transition-all duration-300"
              style={{
                backgroundColor: "var(--paper)",
                border: "1px solid var(--subtle)",
                animationDelay: `${i * 100}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--subtle)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-display text-2xl mb-1" style={{ color: "var(--ink)" }}>
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {project.year}
                  </span>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-wider transition-colors duration-200"
                      style={{ color: "var(--accent)" }}
                    >
                      Live ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs tracking-wider transition-colors duration-200"
                      style={{ color: "var(--muted)" }}
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>

              <p className="text-sm leading-loose mb-6" style={{ color: "var(--muted)" }}>
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="font-mono text-xs px-2.5 py-1 rounded-sm"
                    style={{ backgroundColor: "var(--subtle)", color: "var(--muted)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
