import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// GET: Fetch earnings breakdown & payouts
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, membership: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Fetch payouts
    const payouts = await prisma.payout.findMany({
      where: { creatorId: user.id },
      include: { withdrawalMethod: true },
      orderBy: { createdAt: "desc" },
    });

    // Calculate earnings breakdown
    const totalEarnings = payouts.reduce((sum, p) => sum + p.amount, 0);
    const pendingEarnings = payouts
      .filter((p) => p.status === "PENDING")
      .reduce((sum, p) => sum + p.amount, 0);
    const completedEarnings = payouts
      .filter((p) => p.status === "COMPLETED")
      .reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({ payouts, totalEarnings, pendingEarnings, completedEarnings });
  } catch (error) {
    console.error("Payouts Fetch Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Request a payout
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, membership: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { methodId, amount } = await req.json();
    if (!methodId || !amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid payout details" }, { status: 400 });
    }

    // Validate withdrawal method
    const withdrawalMethod = await prisma.withdrawalMethod.findUnique({
      where: { id: methodId, creatorId: user.id },
    });
    if (!withdrawalMethod) {
      return NextResponse.json({ message: "Invalid withdrawal method" }, { status: 400 });
    }

    // Apply revenue sharing based on membership plan
    const revenueShare = user.membership === "ELITE" ? 0.15 : user.membership === "PREMIUM" ? 0.10 : 0.05;
    const finalAmount = amount - amount * revenueShare;

    const newPayout = await prisma.payout.create({
      data: {
        amount: finalAmount,
        creatorId: user.id,
        withdrawalMethodId: methodId,
        status: "PENDING",
      },
    });

    return NextResponse.json(newPayout, { status: 201 });
  } catch (error) {
    console.error("Payout Request Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
