"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const { personal, about } = portfolioData;

  return (
    <section id="about" ref={ref} className="py-32 px-12" style={{ backgroundColor: "var(--surface)", backdropFilter: "blur(18px)" }}>
      <div className="max-w-3xl mx-auto flex flex-col">

        <h2 className="reveal serif text-4xl mb-8 flex items-center gap-4" style={{ color: "var(--text)" }}>
          About Me
          <span className="h-px w-20 inline-block" style={{ backgroundColor: "rgba(255,186,56,0.3)" }} />
        </h2>

        <p className="reveal text-lg leading-relaxed mb-10" style={{ color: "var(--text-variant, #d6c4ac)" }}>
          {about.bio}
        </p>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 mb-12">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Email</span>
            <span style={{ color: "var(--text)" }}>{personal.email}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Location</span>
            <span style={{ color: "var(--text)" }}>{personal.location}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Availability</span>
            <span style={{ color: "var(--text)" }}>{personal.available ? "Open to opportunities" : "Not available"}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Experience</span>
            <span style={{ color: "var(--text)" }}>3+ Years</span>
          </div>
        </div>

        <div className="reveal flex gap-6">
            <a
              href="/Ta-Tan-Dat-Full-Stack-Developer.pdf"
              download="Ta-Tan-Dat-Full-Stack-Developer.pdf"
              className="px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all"
              style={{
                background: "linear-gradient(to bottom right, var(--primary), var(--primary-container))",
                color: "var(--on-primary-container)",
                boxShadow: "0 0 0 rgba(255,186,56,0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(255,186,56,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(255,186,56,0)";
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download CV
            </a>
          </div>
      </div>
    </section>
  );
}
