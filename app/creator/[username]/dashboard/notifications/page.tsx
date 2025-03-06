"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Trash2 } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/creator/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`/api/creator/notifications`, { id });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await axios.delete(`/api/creator/notifications`, { data: { id } });
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Bell className="w-6 h-6" /> Notifications
      </h1>

      {loading ? (
        <p>Loading notifications...</p>
      ) : notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 flex justify-between items-center ${
                notification.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <CardContent>
                <p>{notification.message}</p>
                <small className="text-gray-500">
                  {new Date(notification.createdAt).toLocaleString()}
                </small>
              </CardContent>
              <div className="flex gap-2">
                {!notification.read && (
                  <Button size="sm" variant="outline" onClick={() => markAsRead(notification.id)}>
                    Mark as Read
                  </Button>
                )}
                <Button size="sm" variant="destructive" onClick={() => deleteNotification(notification.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
