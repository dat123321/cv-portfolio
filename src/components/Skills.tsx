"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Skills() {
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
    <section id="skills" ref={ref} className="py-32 px-8" style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>02</span>
          <span className="text-xs tracking-widest uppercase" style={{ color: "#4a4845" }}>Skills</span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#2a2825" }} />
        </div>

        <h2 className="reveal font-display text-4xl md:text-5xl mb-16 leading-tight" style={{ color: "var(--paper)" }}>
          Tools of the<br />
          <span className="italic" style={{ color: "var(--accent)" }}>craft</span>
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {portfolioData.skills.map((group, i) => (
            <div key={i} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
              <h3
                className="font-mono text-xs tracking-widest uppercase mb-6 pb-3"
                style={{
                  color: "var(--accent)",
                  borderBottom: "1px solid #2a2825",
                }}
              >
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.items.map((skill, j) => (
                  <li
                    key={j}
                    className="text-sm flex items-center gap-2"
                    style={{ color: "#b0ada8" }}
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)", opacity: 0.5 }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
