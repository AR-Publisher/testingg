import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const totalCreators = await prisma.user.count({ where: { role: "CREATOR" } });
    const totalSupporters = await prisma.user.count({ where: { role: "SUPPORTER" } });
    const totalEarnings = await prisma.payout.aggregate({
      _sum: { amount: true },
    });
    const pendingWithdrawals = await prisma.withdrawalMethod.count({
      where: { /* Add appropriate conditions for pending withdrawals */ },
    });

    return NextResponse.json({
      totalCreators,
      totalSupporters,
      totalEarnings: totalEarnings._sum.amount || 0,
      pendingWithdrawals,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json({ error: "Failed to load metrics" }, { status: 500 });
  }
}
