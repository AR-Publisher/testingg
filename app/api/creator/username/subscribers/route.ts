import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params?: { username?: string } }) {
  try {
    // Debugging: Check if params exist
    if (!params || !params.username) {
      console.warn("Missing username parameter.");
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    const { username } = params;

    // Find the creator's userId from their username
    const creatorUser = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!creatorUser) {
      return NextResponse.json({ message: "Creator not found" }, { status: 404 });
    }

    // Find all subscribers for this creator
    const subscriptions = await prisma.subscription.findMany({
      where: { creatorId: creatorUser.id },
      include: {
        supporter: {
          select: {
            userId: true,
            user: { select: { name: true, email: true, username: true } },
          },
        },
      },
    });

    const formattedSubscribers = subscriptions.map((sub) => ({
      id: sub.supporter?.userId ?? null,
      name: sub.supporter?.user?.name ?? "Unknown",
      email: sub.supporter?.user?.email ?? "No email",
      username: sub.supporter?.user?.username ?? "No username",
      joinedAt: new Date(), // Placeholder since createdAt isn't available
    }));

    return NextResponse.json(formattedSubscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
