import { NextRequest, NextResponse } from "next/server";
import { generate1099K } from "@/lib/pdfGenerator";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const taxData = await prisma.taxForm.findUnique({ where: { userId } });

    if (!taxData) {
      return NextResponse.json({ error: "Tax form not found" }, { status: 404 });
    }

    const filePath = await generate1099K(userId, taxData);

    return NextResponse.json({ url: `/public/${filePath}` }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate 1099-K" }, { status: 500 });
  }
}
