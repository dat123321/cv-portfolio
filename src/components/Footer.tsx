"use client";

import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="py-12 px-12 border-t" style={{ backgroundColor: "rgba(5,6,10,0.88)", backdropFilter: "blur(18px)", borderColor: "rgba(120,90,20,0.1)" }}>
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto">
        <div className="text-xs uppercase tracking-widest mb-6 md:mb-0" style={{ color: "#64748b" }}>
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </div>
        <div className="flex gap-10">
          {personal.linkedin && (
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest transition-colors underline underline-offset-8"
              style={{ color: "#64748b", textDecorationColor: "rgba(120,90,20,0.3)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
            >
              LinkedIn
            </a>
          )}
          {personal.github && (
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest transition-colors underline underline-offset-8"
              style={{ color: "#64748b", textDecorationColor: "rgba(120,90,20,0.3)" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
            >
              GitHub
            </a>
          )}
          <a
            href={`mailto:${personal.email}`}
            className="text-xs uppercase tracking-widest transition-colors underline underline-offset-8"
            style={{ color: "#64748b", textDecorationColor: "rgba(120,90,20,0.3)" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--primary)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#64748b")}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
