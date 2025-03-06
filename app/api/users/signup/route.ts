import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prismadb"; // ✅ Correct import

export async function POST(req: Request) {
  try {
    const { username, name, email, password, role, plan } = await req.json();

    if (!username || !name || !email || !password || !role) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        name,
        role,
        plan, // ✅ Now this works because 'plan' exists in the schema
      },
    });

    return NextResponse.json({ message: "User registered successfully.", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
