import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Fetch user notifications
export async function GET(req: Request) {
  try {
    const user = await getUserFromSession(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const notifications = await prisma.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

// POST: Mark notification as read
export async function POST(req: Request) {
    try {
      const { notificationId } = await req.json();
      if (!notificationId) {
        return NextResponse.json({ error: "Notification ID required" }, { status: 400 });
      }
  
      await prisma.notification.update({
        where: { id: notificationId },
        data: { read: true }, // Change from isRead to read
      });
  
      return NextResponse.json({ message: "Notification marked as read" });
    } catch (error) {
      return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
    }
  }
  

// Utility function for user session
async function getUserFromSession(req: Request) {
  return { id: "user123" };
}
