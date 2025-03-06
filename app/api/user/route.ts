import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // For hashing passwords

// POST: Update Profile
export async function POST(req: Request) {
  try {
    const user = await getUserFromSession(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, email } = await req.json();

    await prisma.user.update({
      where: { id: user.id },
      data: { name, email },
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}

// POST: Change Password
export async function PATCH(req: Request) {
  try {
    const user = await getUserFromSession(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { password } = await req.json();
    if (!password) return NextResponse.json({ error: "Password required" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}

// DELETE: Delete Account
export async function DELETE(req: Request) {
  try {
    const user = await getUserFromSession(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.user.delete({ where: { id: user.id } });

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
  }
}

// Utility function for user session
async function getUserFromSession(req: Request) {
  return { id: "user123" };
}
