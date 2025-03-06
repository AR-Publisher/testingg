import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { username: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id || !session.user.username) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, image, video, visibility } = await req.json();

    if (!title || !content || !visibility) {
      return NextResponse.json({ message: "Title, content, and visibility are required" }, { status: 400 });
    }

    // Ensure only the logged-in creator can create posts
    if (session.user.username !== params.username) {
      return NextResponse.json({ message: "You are not authorized to create posts for this creator" }, { status: 403 });
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        image,
        video,
        visibility,
        creator: { connect: { userId: session.user.id } },
        user: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Post creation error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
