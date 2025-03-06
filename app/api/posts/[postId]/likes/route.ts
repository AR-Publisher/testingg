import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ Correct import
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function POST(req: NextRequest, { params }: { params: { postId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = params;

  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user already liked the post
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId: user.id,
      },
    });

    if (existingLike) {
      return NextResponse.json({ error: "Already liked this post" }, { status: 400 });
    }

    // Create a new like record
    await prisma.like.create({
      data: {
        userId: user.id,
        postId,
      },
    });

    // Count total likes for the post
    const likesCount = await prisma.like.count({
      where: { postId },
    });

    return NextResponse.json({ message: "Post liked", likes: likesCount });
  } catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
