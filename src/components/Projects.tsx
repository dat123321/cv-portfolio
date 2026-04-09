"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

const FILTERS = ["All Works", "Laravel", "Vue.js", "Node.js"];

function matchFilter(tags: string[], filter: string) {
  if (filter === "All Works") return true;
  return tags.some((t) => t.toLowerCase() === filter.toLowerCase());
}

function getPrimaryTag(tags: string[]) {
  const priority = ["Laravel", "Vue.js", "Node.js", "Next.js", "PHP"];
  for (const p of priority) {
    if (tags.some((t) => t.toLowerCase() === p.toLowerCase())) return p;
  }
  return tags[0] ?? "Web";
}

const ACCENT_COLORS: Record<string, string> = {
  Laravel: "#ff4f1f",
  "Vue.js": "#41b883",
  "Node.js": "#68a063",
  "Next.js": "#ffffff",
  PHP: "#7b7fb5",
  Web: "var(--primary)",
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState("All Works");

  // Re-observe reveal elements whenever filter changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.05 }
    );
    // Small delay so new DOM elements are painted before observing
    const timer = setTimeout(() => {
      ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 20);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [activeFilter]);

  const filtered = portfolioData.projects.filter((p) => matchFilter(p.tags, activeFilter));

  return (
    <section id="projects" ref={ref} className="py-32 px-12" style={{ backgroundColor: "var(--surface-container-low)" }}>
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="serif text-5xl mb-4" style={{ color: "var(--text)" }}>Curated Projects</h2>
            <p className="max-w-lg" style={{ color: "var(--text-variant, #d6c4ac)" }}>
              Selected work showcasing my expertise in architectural design and problem-solving.
            </p>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-4 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-6 py-2 text-sm font-medium transition-colors"
                style={{
                  borderBottom: `2px solid ${activeFilter === f ? "var(--primary)" : "transparent"}`,
                  color: activeFilter === f ? "var(--primary)" : "var(--text-variant, #d6c4ac)",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((project, i) => {
            const primary = getPrimaryTag(project.tags);
            const accent = ACCENT_COLORS[primary] ?? "var(--primary)";
            const hasLink = !!(project.link || project.github);
            return (
              <div
                key={project.id || i}
                className="reveal group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className="h-full rounded-2xl overflow-hidden flex flex-col transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ backgroundColor: "var(--surface-container)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {/* Colored top bar + header area */}
                  <div
                    className="px-8 pt-8 pb-6"
                    style={{ borderTop: `3px solid ${accent}` }}
                  >
                    {/* Top row: year badge + link */}
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="text-xs font-mono px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${accent}22`, color: accent }}
                      >
                        {project.year ?? "—"}
                      </span>
                      {hasLink && (
                        <a
                          href={project.link || project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium transition-opacity opacity-50 group-hover:opacity-100"
                          style={{ color: accent }}
                        >
                          View project
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="serif text-2xl mb-3" style={{ color: "var(--text)" }}>
                      {project.name}
                    </h4>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-variant, #d6c4ac)" }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tags footer */}
                  <div
                    className="px-8 py-4 mt-auto flex flex-wrap gap-2"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md font-mono"
                        style={{ backgroundColor: "var(--surface-container-high)", color: "var(--text-variant, #d6c4ac)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
