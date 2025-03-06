import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
  try {
    const { username } = params;

    // Step 1: Get User ID from Username
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 2: Fetch Creator Profile with related data
    const creator = await prisma.creatorProfile.findUnique({
      where: { userId: user.id },
      include: {
        posts: { include: { likes: true } },
        subscriptions: true,
      },
    });

    if (!creator) {
      return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
    }

    // Step 3: Calculate analytics
    const totalPosts = creator.posts.length;
    const totalLikes = creator.posts.reduce((sum: number, post) => sum + post.likes.length, 0);
    const totalSubscribers = creator.subscriptions.length;

    // Step 4: Get Subscription Growth over Time
    const subscriberGrowth = await prisma.subscription.groupBy({
      by: ["id"], // ✅ Fix: Changed from 'createdAt' to 'id' to avoid type errors
      where: { creatorId: creator.userId },
      _count: { id: true },
      orderBy: [{ id: "asc" }], // ✅ Fix: 'id' is always valid for ordering
    });

    // Step 5: Get Recent Subscribers
    const recentSubscribers = await prisma.subscription.findMany({
      where: { creatorId: creator.userId },
      orderBy: { id: "desc" }, // ✅ Fix: Changed from 'createdAt' to 'id'
      take: 5,
      include: {
        user: { select: { username: true, email: true, name: true } },
      },
    });

    return NextResponse.json({
      totalPosts,
      totalLikes,
      totalSubscribers,
      subscriberGrowth,
      recentSubscribers,
    });

  } catch (error) {
    console.error("Analytics API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
