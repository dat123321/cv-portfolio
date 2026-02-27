"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutBtn } from "./ui";

const navItems = [
  { href: "/admin",            label: "Dashboard",  icon: "◈" },
  { href: "/admin/about",      label: "About",       icon: "◉" },
  { href: "/admin/skills",     label: "Skills",      icon: "◎" },
  { href: "/admin/experience", label: "Experience",  icon: "◐" },
  { href: "/admin/projects",   label: "Projects",    icon: "◑" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col bg-ink min-h-screen py-8 px-4">
      {/* Logo */}
      <div className="px-3 mb-10">
        <span className="font-mono text-paper text-sm tracking-wider">
          Portfolio
          <span className="text-accent">Admin</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? "bg-white/10 text-paper"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              <span className="text-accent text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 border-t border-white/10 pt-4">
        <div className="text-white/30 text-xs mb-2">admin</div>
        <LogoutBtn />
      </div>
    </aside>
  );
}
