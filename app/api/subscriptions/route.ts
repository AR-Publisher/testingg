import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming Prisma is set up

// GET: Fetch all subscriptions for the logged-in user
export async function GET(req: Request) {
  try {
    // Assuming user authentication is set up with NextAuth.js
    const user = await getUserFromSession(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      include: { creator: true }, // Include creator details
    });

    return NextResponse.json(subscriptions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}

// DELETE: Cancel a subscription
export async function DELETE(req: Request) {
  try {
    const { subscriptionId } = await req.json();
    if (!subscriptionId) return NextResponse.json({ error: "Subscription ID is required" }, { status: 400 });

    await prisma.subscription.delete({ where: { id: subscriptionId } });

    return NextResponse.json({ message: "Subscription canceled successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
  }
}

// Utility function to get user from session (You need to implement this)
async function getUserFromSession(req: Request) {
  // Use NextAuth session or JWT decoding here
  return { id: "user123" }; // Mock user for now
}
