"use client";

import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { personal } = portfolioData;

  return (
    <section className="flex flex-col justify-center px-8 pt-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full">

        {/* LEFT — text content */}
        <div>
          {/* Status badge */}
          <div className="animate-fade-up delay-100 mb-8">
            {personal.available && (
              <span
                className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-4 py-2 rounded-full"
                style={{
                  backgroundColor: "rgba(200,169,110,0.12)",
                  color: "var(--accent)",
                  border: "1px solid rgba(200,169,110,0.25)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for work
              </span>
            )}
          </div>

          {/* Name */}
          <h1
            className="animate-fade-up delay-200 font-display leading-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "var(--ink)" }}
          >
            {personal.name.split(" ").map((word, i) => (
              <span
                key={i}
                style={{ color: "var(--ink)" }}
              >
                {word} {" "}
              </span>
            ))}
          </h1>

          {/* Divider */}
          <div
            className="animate-fade-up delay-300 mb-6"
            style={{ width: "60px", height: "1px", backgroundColor: "var(--accent)" }}
          />

          {/* Tagline */}
          <p
            className="animate-fade-up delay-400 text-lg leading-relaxed mb-8"
            style={{ color: "var(--muted)" }}
          >
            {personal.tagline}
          </p>

          {/* Role + Location */}
          <div className="animate-fade-up delay-500 flex flex-wrap items-center gap-4 mb-12">
            <span
              className="font-mono text-sm tracking-wider px-4 py-2 rounded-sm"
              style={{ backgroundColor: "var(--subtle)", color: "var(--ink)" }}
            >
              {personal.title}
            </span>
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              ↗ {personal.location}
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="animate-fade-in delay-800 flex items-center gap-3">
            <div
              className="w-px h-12"
              style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
            />
            <span className="text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
              Scroll
            </span>
          </div>
        </div>

        {/* RIGHT — decorative cards */}
        <div className="animate-fade-in delay-400 flex flex-col gap-4">

          {/* Two small cards — stack on mobile, side-by-side on sm+ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-2xl p-5"
              style={{ border: "1px solid var(--subtle)", backgroundColor: "var(--paper)" }}
            >
              <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>Stack</p>
              <div className="flex flex-col gap-1.5">
                {["PHP", "Laravel", "Node.js"].map((s) => (
                  <span key={s} className="text-xs font-mono px-2 py-1 rounded-sm" style={{ backgroundColor: "var(--subtle)", color: "var(--ink)" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="rounded-2xl p-5 flex flex-col justify-center min-h-[120px]"
              style={{ backgroundColor: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.2)" }}
            >
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>Open to</p>
              <p className="font-display text-3xl leading-tight mt-2" style={{ color: "var(--ink)" }}>
                New <span className="italic">roles</span>
              </p>
            </div>
          </div>

          {/* Social links */}
          <div
            className="rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-3"
            style={{ border: "1px solid var(--subtle)" }}
          >
            <span className="text-xs tracking-widest uppercase font-mono" style={{ color: "var(--muted)" }}>Find me on</span>
            <div className="flex gap-4">
              {personal.github && (
                <a href={personal.github} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors duration-200 hover:text-accent"
                  style={{ color: "var(--ink)" }}>
                  GitHub ↗
                </a>
              )}
              {personal.linkedin && (
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors duration-200 hover:text-accent"
                  style={{ color: "var(--ink)" }}>
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}