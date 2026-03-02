import { NextRequest, NextResponse } from "next/server";
import { signToken, checkCredentials } from "@/lib/auth";

// Set COOKIE_SECURE=true trong .env khi domain dùng HTTPS
// Để trống hoặc false nếu đang dùng HTTP
const isSecure = process.env.COOKIE_SECURE === "true";

// POST /api/auth  → login
export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signToken(username);

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    secure: isSecure,
  });

  return res;
}

// DELETE /api/auth  → logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_token", "", {
    maxAge: 0,
    path: "/",
    httpOnly: true,
  });
  return res;
}