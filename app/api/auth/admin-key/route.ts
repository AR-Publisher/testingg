import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { key } = await req.json();

  if (key === process.env.ADMIN_KEY) {
    const response = NextResponse.json({ success: true });

    // Set a cookie to mark admin login
    response.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  }

  return NextResponse.json({ message: "Invalid admin key" }, { status: 401 });
}
