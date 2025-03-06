"use client";

import { useState, useEffect } from "react";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch("/api/notifications");
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        } else {
          console.error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, { method: "POST" });

      if (response.ok) {
        setNotifications(
          notifications.map((notif) =>
            notif.id === notificationId ? { ...notif, isRead: true } : notif
          )
        );
      } else {
        console.error("Failed to mark notification as read");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Notifications</h2>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-lg ${
                notif.isRead ? "bg-gray-100" : "bg-blue-100"
              } flex justify-between items-center`}
            >
              <div>
                <p className="text-lg">{notif.message}</p>
                <p className="text-sm text-gray-600">{new Date(notif.createdAt).toLocaleString()}</p>
              </div>
              {!notif.isRead && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No notifications available.</p>
      )}
    </div>
  );
}
