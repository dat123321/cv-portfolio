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
    <section id="experience" ref={ref} className="py-32 px-12" style={{ backgroundColor: "var(--surface)", backdropFilter: "blur(18px)" }}>
      <div className="max-w-screen-xl mx-auto">
        <h2 className="reveal serif text-4xl mb-20 text-center" style={{ color: "var(--text)" }}>
          Professional Journey
        </h2>

        {/* Timeline */}
        <div className="relative space-y-12"
          style={{
            "--tw-before-bg": "var(--outline-variant)",
          } as React.CSSProperties}
        >
          {/* Center line */}
          <div
            className="hidden md:block absolute top-0 bottom-0 w-0.5 left-1/2 -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(81,69,50,0.4), transparent)",
            }}
          />

          {portfolioData.experience.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={job.id || i}
                className="reveal relative flex items-center justify-between md:justify-normal group"
                style={{
                  flexDirection: isLeft ? "row" : "row-reverse",
                  animationDelay: `${i * 120}ms`,
                }}
              >
                {/* Dot */}
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full z-10 flex-shrink-0
                    absolute left-0 md:left-1/2 md:-translate-x-1/2"
                  style={{
                    border: `1px solid ${i === 0 ? "var(--primary)" : "var(--outline-variant)"}`,
                    backgroundColor: "var(--surface)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: i === 0 ? "var(--primary)" : "var(--outline-variant)",
                      animation: i === 0 ? "bounceY 1.4s ease-in-out infinite" : undefined,
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="w-[calc(100%-4rem)] md:w-[45%] p-8 rounded-xl ml-14 md:ml-0"
                  style={{ backgroundColor: "var(--surface-container)" }}
                >
                  <span
                    className="text-sm font-bold tracking-widest block mb-2"
                    style={{ color: i === 0 ? "var(--primary)" : "rgba(255,186,56,0.6)" }}
                  >
                    {job.period.toUpperCase()}
                  </span>
                  <h4 className="serif text-xl mb-1" style={{ color: "var(--text)" }}>
                    {job.role}
                  </h4>
                  <p className="text-sm italic mb-4" style={{ color: "var(--secondary)" }}>
                    {job.company}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-variant, #d6c4ac)" }}>
                    {job.description}
                  </p>
                  {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="font-mono text-xs px-2.5 py-1 rounded"
                          style={{
                            backgroundColor: "rgba(255,186,56,0.1)",
                            color: "var(--primary)",
                            border: "1px solid rgba(255,186,56,0.2)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
