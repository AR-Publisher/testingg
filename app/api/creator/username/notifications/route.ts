import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/lib/prisma";

// ✅ PATCH: Mark notification as read
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { notificationId } = await req.json();

    if (!notificationId) {
      return NextResponse.json({ error: "Notification ID is required" }, { status: 400 });
    }

    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }, // ✅ Ensure this field is properly defined in schema.prisma
    });

    return NextResponse.json({ success: true, data: updatedNotification });
  } catch (error) {
    console.error("Error updating notification:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
