"use client";

import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="py-20 px-8" style={{ backgroundColor: "var(--ink)" }}>
      <div className="max-w-5xl mx-auto">
        {/* CTA */}
        <div className="text-center mb-16">
          <h2
            className="font-display text-4xl md:text-6xl mb-6"
            style={{ color: "var(--paper)" }}
          >
            Let's work
            <span className="italic ml-3" style={{ color: "var(--accent)" }}>
              together
            </span>
          </h2>
          <p className="mb-8 text-sm" style={{ color: "#6a6865" }}>
            Open to interesting opportunities and collaborations
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="inline-block text-sm tracking-widest uppercase px-8 py-4 rounded-sm transition-all duration-300"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "var(--accent)";
              (e.target as HTMLElement).style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = "transparent";
              (e.target as HTMLElement).style.color = "var(--accent)";
            }}
          >
            Get in Touch
          </a>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ backgroundColor: "#2a2825" }} />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg" style={{ color: "var(--paper)" }}>
            {personal.name}
            <span style={{ color: "var(--accent)" }}>.</span>
          </span>

          <div className="flex items-center gap-6">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#6a6865" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6a6865")}
            >
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#6a6865" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6a6865")}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-xs tracking-widest uppercase transition-colors duration-200"
              style={{ color: "#6a6865" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6a6865")}
            >
              Email
            </a>
          </div>

          <span className="font-mono text-xs" style={{ color: "#3a3835" }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
