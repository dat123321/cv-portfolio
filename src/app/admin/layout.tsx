// Root admin layout — NO sidebar here.
// Login page uses this directly (clean, no chrome).
// Dashboard pages use (dashboard)/layout.tsx which adds the Sidebar.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
