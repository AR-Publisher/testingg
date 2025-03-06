import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia" as any, // Explicitly cast as `any` to prevent TypeScript errors
});

// Define available membership plans with corresponding Stripe price IDs
const PRICING_PLANS: Record<string, string | undefined> = {
  pro: process.env.STRIPE_PRO_PLAN_ID,
  premium: process.env.STRIPE_PREMIUM_PLAN_ID,
  elite: process.env.STRIPE_ELITE_PLAN_ID,
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { plan } = await req.json();

    if (!["pro", "premium", "elite"].includes(plan)) {
      return NextResponse.json({ message: "Invalid plan selected" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const priceId = PRICING_PLANS[plan];

    if (!priceId) {
      return NextResponse.json({ message: "Price ID not configured" }, { status: 500 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/canceled`,
      customer_email: session.user.email,
      metadata: { userId: user.id, selectedPlan: plan },
    });

    return NextResponse.json({ sessionId: checkoutSession.id, url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json({ message: "Error creating checkout session" }, { status: 500 });
  }
}
