"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Toast ── */
type ToastType = "success" | "error";
type ToastState = { message: string; type: ToastType } | null;

export function useToast() {
  const [toast, setToast] = useState<ToastState>(null);
  const show = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };
  return { toast, show };
}

export function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null;
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg text-sm font-medium shadow-lg transition-all ${
        toast.type === "success"
          ? "bg-ink text-paper"
          : "bg-danger text-white"
      }`}
    >
      {toast.type === "success" ? "✓ " : "✕ "}
      {toast.message}
    </div>
  );
}

/* ── Card ── */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-subtle rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

/* ── Section Header ── */
export function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-ink">{title}</h1>
      {description && <p className="text-muted text-sm mt-1">{description}</p>}
    </div>
  );
}

/* ── Input ── */
export function Input({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs font-mono tracking-wider text-muted uppercase mb-1.5 block">
        {label}
      </span>
      <input
        className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper text-ink text-sm focus:outline-none focus:border-accent transition-colors"
        {...props}
      />
    </label>
  );
}

/* ── Textarea ── */
export function Textarea({
  label,
  ...props
}: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      <span className="text-xs font-mono tracking-wider text-muted uppercase mb-1.5 block">
        {label}
      </span>
      <textarea
        className="w-full px-3 py-2 rounded-lg border border-subtle bg-paper text-ink text-sm focus:outline-none focus:border-accent transition-colors resize-none"
        rows={4}
        {...props}
      />
    </label>
  );
}

/* ── Button ── */
type BtnVariant = "primary" | "secondary" | "danger" | "ghost";
export function Btn({
  variant = "primary",
  loading,
  children,
  ...props
}: {
  variant?: BtnVariant;
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<BtnVariant, string> = {
    primary: "bg-ink text-paper hover:bg-ink/80",
    secondary: "bg-subtle text-ink hover:bg-subtle/70",
    danger: "bg-danger text-white hover:bg-danger/80",
    ghost: "text-muted hover:text-ink hover:bg-subtle",
  };
  return (
    <button className={`${base} ${styles[variant]}`} disabled={loading} {...props}>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      )}
      {children}
    </button>
  );
}

/* ── Tag input ── */
export function TagInput({
  label,
  tags,
  onChange,
}: {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) onChange([...tags, val]);
    setInput("");
  };

  const remove = (tag: string) => onChange(tags.filter((t) => t !== tag));

  return (
    <div>
      <span className="text-xs font-mono tracking-wider text-muted uppercase mb-1.5 block">
        {label}
      </span>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-subtle text-ink text-xs px-2.5 py-1 rounded-full"
          >
            {tag}
            <button
              type="button"
              onClick={() => remove(tag)}
              className="text-muted hover:text-danger ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Type and press Enter"
          className="flex-1 px-3 py-2 rounded-lg border border-subtle bg-paper text-ink text-sm focus:outline-none focus:border-accent transition-colors"
        />
        <Btn type="button" variant="secondary" onClick={add}>
          Add
        </Btn>
      </div>
    </div>
  );
}

/* ── Confirm Delete ── */
export function ConfirmDelete({
  onConfirm,
  label = "Delete",
}: {
  onConfirm: () => void;
  label?: string;
}) {
  const [confirming, setConfirming] = useState(false);
  if (confirming)
    return (
      <span className="inline-flex items-center gap-2">
        <span className="text-xs text-danger">Sure?</span>
        <Btn variant="danger" onClick={onConfirm}>
          Yes, delete
        </Btn>
        <Btn variant="ghost" onClick={() => setConfirming(false)}>
          Cancel
        </Btn>
      </span>
    );
  return (
    <Btn variant="ghost" onClick={() => setConfirming(true)}>
      {label}
    </Btn>
  );
}

/* ── Logout button ── */
export function LogoutBtn() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
  };
  return (
    <button
      onClick={logout}
      className="text-xs text-muted hover:text-danger transition-colors"
    >
      Sign out
    </button>
  );
}
