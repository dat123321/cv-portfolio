import { NextRequest, NextResponse } from "next/server";
import { readPortfolio, writePortfolio } from "@/lib/portfolio";
import { isAuthenticated } from "@/lib/auth";

// GET /api/portfolio  → public, used by frontend
export async function GET() {
  const data = readPortfolio();
  return NextResponse.json(data);
}

// PUT /api/portfolio  → protected, used by admin
export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // Merge with existing data so partial updates work
  const current = readPortfolio();
  const updated = { ...current, ...body };

  writePortfolio(updated);
  return NextResponse.json({ ok: true });
}
