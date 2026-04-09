"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const { personal } = portfolioData;

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "2px solid var(--outline-variant)",
    outline: "none",
    padding: "12px 0",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: "1rem",
    transition: "border-color 0.2s",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "var(--primary)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = "var(--outline-variant)";
  };

  return (
    <section id="contact" ref={ref} className="py-40 px-12 overflow-hidden" style={{ backgroundColor: "var(--surface)", backdropFilter: "blur(18px)" }}>
      <div className="max-w-screen-xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-24 items-center">

          {/* Left — CTA + contact info */}
          <div>
            <h2 className="reveal serif mb-8" style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", color: "var(--text)" }}>
              Let&apos;s{" "}
              <span className="italic" style={{ color: "var(--primary)" }}>Collaborate</span>
            </h2>
            <p className="reveal text-xl leading-relaxed mb-12" style={{ color: "var(--text-variant, #d6c4ac)" }}>
              Currently available for freelance work and permanent positions. If you have a project in mind, reach out.
            </p>

            <div className="reveal space-y-8">
              <div className="flex items-center gap-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: "1px solid rgba(255,186,56,0.3)", color: "var(--primary)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <a href={`mailto:${personal.email}`} className="text-lg transition-colors"
                  style={{ color: "var(--text)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}>
                  {personal.email}
                </a>
              </div>
              <div className="flex items-center gap-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ border: "1px solid rgba(255,186,56,0.3)", color: "var(--primary)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <span className="text-lg" style={{ color: "var(--text)" }}>{personal.location}</span>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div
            className="reveal p-12 rounded-xl relative"
            style={{ backgroundColor: "var(--surface-container)" }}
          >
            {/* Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{ backgroundColor: "rgba(255,186,56,0.05)", filter: "blur(3rem)" }} />

            <form
              className="space-y-8 relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${personal.email}?subject=Message from ${form.name}&body=${encodeURIComponent(form.message)}`;
              }}
            >
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  required
                  style={inputStyle}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-widest font-bold" style={{ color: "var(--primary)" }}>Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  required
                  rows={4}
                  style={{ ...inputStyle, resize: "none" }}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={handleFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                  onBlur={handleBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                />
              </div>
              <button
                type="submit"
                className="w-full py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all"
                style={{
                  background: "linear-gradient(to bottom right, var(--primary), var(--primary-container))",
                  color: "var(--on-primary-container)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(255,186,56,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
