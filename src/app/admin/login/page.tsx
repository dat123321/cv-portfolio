"use client";

import { useState } from "react";

export default function LoginPage() {
const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4 -m-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="font-mono text-paper text-xl tracking-wider">
            Portfolio<span className="text-accent">Admin</span>
          </span>
          <p className="text-white/30 text-sm mt-2">Sign in to manage your content</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono tracking-widest text-white/40 uppercase mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-paper text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="admin"
              autoFocus
              required
            />
          </div>
          <div>
            <label className="block text-xs font-mono tracking-widest text-white/40 uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-paper text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-accent text-ink text-sm font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <p className="text-center text-white/20 text-xs mt-8 font-mono">
          Set credentials in .env.local
        </p>
      </div>
    </div>
  );
}
