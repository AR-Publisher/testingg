import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, visibility, fileUrl } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ message: "Title and content are required!" }, { status: 400 });
    }

    // Get the creator's profile ID
    const creator = await prisma.creatorProfile.findUnique({
      where: { userId: session.user.id },
    });

    if (!creator) {
      return NextResponse.json({ message: "Creator profile not found" }, { status: 404 });
    }

    // Create a new post with optional fileUrl (image/video)
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        visibility,
        creatorId: creator.userId, // Store creator's ID
        fileUrl, // Store uploaded media URL
      },
    });

    return NextResponse.json({ message: "Post created successfully!", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
