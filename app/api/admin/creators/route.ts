import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const creators = await prisma.user.findMany({
      where: { role: "CREATOR" },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        posts: {
          select: { id: true },
        },
        _count: {
          select: {
            subscriptions: true,
          },
        },
        payouts: {
          select: { amount: true },
        },
      },
    });

    const formatted = creators.map((c) => ({
      id: c.id,
      name: c.name || "Unnamed",
      email: c.email || "-",
      joinedAt: c.createdAt,
      totalSubscribers: c._count.subscriptions,
      totalPosts: c.posts.length,
      totalEarnings: c.payouts.reduce((sum, payout) => sum + payout.amount, 0),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching creators:", error);
    return NextResponse.json({ error: "Failed to load creators" }, { status: 500 });
  }
}
