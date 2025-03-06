import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

// Allowed membership plans
const ALLOWED_PLANS = ["Pro", "Premium", "Elite"];

// UPDATE CREATOR PROFILE & MEMBERSHIP PLAN
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user ID from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { name, bio, profileImage, membership } = await req.json();

    // Validate the membership plan
    if (membership && !ALLOWED_PLANS.includes(membership)) {
      return NextResponse.json({ message: "Invalid membership plan" }, { status: 400 });
    }

    // Ensure creatorProfile exists and update membership
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name,
        membership, // Store the selected membership plan
        creatorProfile: {
          upsert: {
            create: { bio, image: profileImage },
            update: { bio, image: profileImage },
          },
        },
      },
      include: { creatorProfile: true },
    });

    return NextResponse.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    const err = error as Error;
    console.error("Profile Update Error:", err.message);
    return NextResponse.json({ message: "Failed to update profile", error: err.message }, { status: 500 });
  }
}

// CHANGE PASSWORD
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user ID and password from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, password: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ message: "Password change is not allowed for OAuth users" }, { status: 400 });
    }

    const { currentPassword, newPassword } = await req.json();

    // Validate the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Incorrect current password" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    const err = error as Error;
    console.error("Password Change Error:", err.message);
    return NextResponse.json({ message: "Failed to update password", error: err.message }, { status: 500 });
  }
}
