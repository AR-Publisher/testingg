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
  const { text } = await req.json();

  if (!text || text.trim() === "") {
    return NextResponse.json({ error: "Comment cannot be empty" }, { status: 400 });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const newComment = await prisma.comment.create({
      data: {
        text,
        user: { connect: { email: session.user.email } },
        post: { connect: { id: postId } },
      },
      include: { user: true },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
