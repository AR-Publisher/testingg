import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { method, details, testMode } = req.body;
  if (!method || !details) {
    return res.status(400).json({ error: "Missing payout details" });
  }

  try {
    const creator = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, balance: true },
    });

    if (!creator) {
      return res.status(404).json({ error: "Creator not found" });
    }

    if (creator.balance < 10) {
      return res.status(400).json({ error: "Minimum payout amount is $10" });
    }

    let payoutResponse;

    if (testMode) {
      // Simulate a successful test payout (logs only, no real transfer)
      console.log(`Test payout request for ${session.user.email}:`, { method, details });
      payoutResponse = { id: "test_payout_id", status: "PENDING", amount: creator.balance };
    } else {
      // Real payout logic
      if (method === "stripe") {
        payoutResponse = await stripe.payouts.create({
          amount: creator.balance * 100, // Convert to cents
          currency: "usd",
          metadata: { creatorId: creator.id },
        });
      } else {
        return res.status(400).json({ error: "Unsupported payout method" });
      }
    }

    // Save payout request in database
    await prisma.payout.create({
      data: {
        userId: creator.id,
        amount: creator.balance,
        status: "PENDING",
        method,
        details: JSON.stringify(details),
      },
    });

    // Update user balance (assuming immediate deduction)
    await prisma.user.update({
      where: { id: creator.id },
      data: { balance: 0 },
    });

    return res.status(200).json({ message: "Payout request submitted", payout: payoutResponse });
  } catch (error) {
    console.error("Payout request error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
