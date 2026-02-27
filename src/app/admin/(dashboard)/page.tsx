import Link from "next/link";
import { readPortfolio } from "@/lib/portfolio";
import { Card } from "@/components/admin/ui";

export default function AdminDashboard() {
  const data = readPortfolio();
  const stats = [
    { label: "Skills",     value: data.skills.reduce((a, g) => a + g.items.length, 0), href: "/admin/skills",     color: "text-blue-500" },
    { label: "Jobs",       value: data.experience.length,                               href: "/admin/experience", color: "text-emerald-500" },
    { label: "Projects",   value: data.projects.length,                                 href: "/admin/projects",   color: "text-purple-500" },
  ];

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-ink">Welcome back 👋</h1>
        <p className="text-muted text-sm mt-1">Manage your portfolio content below.</p>
      </div>

      <Card className="mb-8 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-subtle flex items-center justify-center text-2xl overflow-hidden shrink-0">
          {data.personal.avatar
            ? <img src={data.personal.avatar} alt="avatar" className="w-full h-full object-cover" />
            : "👤"}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink">{data.personal.name}</p>
          <p className="text-sm text-muted truncate">{data.personal.title}</p>
          <p className="text-xs text-muted">{data.personal.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${data.personal.available ? "bg-emerald-50 text-emerald-600" : "bg-subtle text-muted"}`}>
            {data.personal.available ? "● Available" : "○ Not available"}
          </span>
          <Link href="/admin/about" className="text-xs text-muted hover:text-accent transition-colors px-3 py-1.5 rounded-lg border border-subtle">Edit</Link>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:border-accent/40 transition-colors cursor-pointer">
              <p className={`text-3xl font-semibold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div>
        <p className="text-xs font-mono tracking-widest uppercase text-muted mb-4">Sections</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { href: "/admin/about",      label: "About & Personal",  desc: "Name, bio, avatar, links" },
            { href: "/admin/skills",     label: "Skills",            desc: `${data.skills.length} categories` },
            { href: "/admin/experience", label: "Experience",        desc: `${data.experience.length} jobs` },
            { href: "/admin/projects",   label: "Projects",          desc: `${data.projects.length} items` },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:border-accent/40 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ink text-sm group-hover:text-accent transition-colors">{item.label}</p>
                    <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-muted group-hover:text-accent transition-colors">→</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted/60 font-mono mt-10">Changes save instantly to <code>src/data/portfolio.json</code></p>
    </div>
  );
}
