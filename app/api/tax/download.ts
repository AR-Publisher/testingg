import { NextRequest, NextResponse } from "next/server";
import { generateEarningsPDF } from "@/lib/pdfGenerator";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Fetch earnings from DB
    const earningsData = await prisma.earnings.findUnique({
      where: { userId },
      include: { transactions: true },
    });

    if (!earningsData) {
      return NextResponse.json({ error: "Earnings data not found" }, { status: 404 });
    }

    // Generate PDF
    const filePath = await generateEarningsPDF(userId, earningsData);

    return NextResponse.json({ url: `/public/${filePath}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
