"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
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
    <section id="experience" ref={ref} className="py-32 px-8 max-w-5xl mx-auto">
      <div className="reveal flex items-center gap-4 mb-16">
        <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>03</span>
        <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>Experience</span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--subtle)" }} />
      </div>

      <div className="grid md:grid-cols-5 gap-16">
        <div className="md:col-span-2">
          <h2 className="reveal font-display text-4xl md:text-5xl leading-tight sticky top-24" style={{ color: "var(--ink)" }}>
            Where I've<br />
            <span className="italic" style={{ color: "var(--muted)" }}>worked</span>
          </h2>
        </div>

        <div className="md:col-span-3 space-y-1">
          {portfolioData.experience.map((job, i) => (
            <div
              key={i}
              className="reveal group py-8"
              style={{
                borderBottom: "1px solid var(--subtle)",
                animationDelay: `${i * 100}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3
                    className="font-display text-xl transition-colors duration-200"
                    style={{ color: "var(--ink)" }}
                  >
                    {job.role}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                      {job.company}
                    </span>
                    <span style={{ color: "var(--subtle)" }}>·</span>
                    <span className="text-sm" style={{ color: "var(--muted)" }}>
                      {job.location}
                    </span>
                  </div>
                </div>
                <span
                  className="font-mono text-xs tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  {job.period}
                </span>
              </div>

              <p className="text-sm leading-loose mb-4" style={{ color: "var(--muted)" }}>
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="font-mono text-xs px-2.5 py-1 rounded-sm"
                    style={{
                      backgroundColor: "var(--subtle)",
                      color: "var(--muted)",
                    }}
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
