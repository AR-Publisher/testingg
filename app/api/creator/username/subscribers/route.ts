import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    // Find the creator's userId from their username
    const creatorUser = await prisma.user.findUnique({
      where: { username: params.username },
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
            userId: true, // Primary key of SupporterProfile
            user: { select: { name: true, email: true, username: true } }, // Include user details
          },
        },
      },
    });

    const formattedSubscribers = subscriptions.map((sub) => ({
      id: sub.supporter.userId, // Use supporter.userId instead of id
      name: sub.supporter.user.name,
      email: sub.supporter.user.email,
      username: sub.supporter.user.username,
      joinedAt: new Date(), // Dummy date since `createdAt` isn't available
    }));

    return NextResponse.json(formattedSubscribers);
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
