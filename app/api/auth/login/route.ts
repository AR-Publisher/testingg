import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { signJwt } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const token = await signJwt({ id: user.id, email: user.email, role: user.role });

    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
