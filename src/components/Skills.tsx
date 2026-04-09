"use client";

import { useEffect, useRef } from "react";

const skillCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Backend & Core",
    items: [
      { name: "PHP & Laravel",       pct: 95 },
      { name: "Node.js / Express",   pct: 80 },
      { name: "RESTful APIs",        pct: 90 },
      { name: "MySQL / PostgreSQL",  pct: 85 },
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
      </svg>
    ),
    title: "Frontend Design",
    items: [
      { name: "Vue.js / Nuxt",       pct: 85 },
      { name: "Tailwind CSS",        pct: 95 },
      { name: "React / Next.js",     pct: 75 },
      { name: "Blade Templating",    pct: 90 },
    ],
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
    ),
    title: "Ops & Tooling",
    items: [
      { name: "Docker & DevOps",     pct: 75 },
      { name: "Git / CI-CD",         pct: 90 },
      { name: "PM2 / Deployment",    pct: 85 },
      { name: "Payment Gateways",    pct: 88 },
    ],
  },
];

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
    <section id="skills" ref={ref} className="py-32 px-12" style={{ backgroundColor: "var(--surface-container-low)", backdropFilter: "blur(18px)" }}>
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="reveal serif text-5xl mb-6" style={{ color: "var(--text)" }}>Technical Arsenal</h2>
          <p className="reveal max-w-xl mx-auto" style={{ color: "var(--text-variant, #d6c4ac)" }}>
            Mastering the tools of modern creation to deliver excellence across the full stack.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCards.map((card, i) => (
            <div
              key={i}
              className="reveal group p-10 rounded-xl transition-all"
              style={{
                backgroundColor: "var(--surface-container)",
                animationDelay: `${i * 100}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-container-high)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface-container)";
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center mb-8 transition-colors"
                style={{ backgroundColor: "rgba(255,186,56,0.1)" }}
                // onMouseEnter={(e) => {
                //   const parent = (e.currentTarget as HTMLElement).closest(".group");
                //   if (parent) {
                //     (e.currentTarget as HTMLElement).style.backgroundColor = "var(--primary)";
                //   }
                // }}
              >
                <span style={{ color: "var(--primary)" }}>{card.icon}</span>
              </div>

              <h3
                className="serif text-2xl mb-6 transition-colors"
                style={{ color: "var(--text)" }}
              >
                {card.title}
              </h3>

              <ul className="space-y-4">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-center justify-between"
                    style={{ color: "var(--text-variant, #d6c4ac)" }}>
                    <span>{item.name}</span>
                    <span className="font-mono text-sm" style={{ color: "var(--primary)" }}>{item.pct}%</span>
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
