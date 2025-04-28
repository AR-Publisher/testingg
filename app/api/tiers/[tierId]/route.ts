import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT = update a tier
export async function PUT(req: NextRequest, { params }: { params: { tierId: string } }) {
  try {
    const { tierName, price, description, benefits } = await req.json();

    if (!tierName || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedTier = await prisma.tier.update({
      where: { id: params.tierId },
      data: {
        tierName,
        price,
        description,
        benefits,
      },
    });

    return NextResponse.json(updatedTier, { status: 200 });
  } catch (error) {
    console.error("Error updating tier:", error);
    return NextResponse.json({ error: "Failed to update tier" }, { status: 500 });
  }
}

// DELETE = delete a tier
export async function DELETE(req: NextRequest, { params }: { params: { tierId: string } }) {
  try {
    await prisma.tier.delete({
      where: { id: params.tierId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting tier:", error);
    return NextResponse.json({ error: "Failed to delete tier" }, { status: 500 });
  }
}
