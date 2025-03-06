"use client";

import { useState, useEffect } from "react";

interface Subscription {
  id: string;
  creator: {
    user: {
      name: string;
    };
  };
  createdAt: string;
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch active subscriptions
  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const response = await fetch("/api/subscriptions");
        if (response.ok) {
          const data = await response.json();
          setSubscriptions(data);
        } else {
          console.error("Failed to fetch subscriptions");
        }
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscriptions();
  }, []);

  // Cancel Subscription
  const cancelSubscription = async (subscriptionId: string) => {
    const confirmCancel = confirm("Are you sure you want to cancel this subscription?");
    if (!confirmCancel) return;

    try {
      const response = await fetch("/api/subscriptions/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });

      if (response.ok) {
        setSubscriptions(subscriptions.filter((sub) => sub.id !== subscriptionId));
      } else {
        console.error("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Subscriptions</h2>

      {loading ? (
        <p>Loading subscriptions...</p>
      ) : subscriptions.length > 0 ? (
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div>
                <p className="text-lg font-semibold">{sub.creator.user.name}</p>
                <p className="text-sm text-gray-600">Subscribed on: {new Date(sub.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => cancelSubscription(sub.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You have no active subscriptions.</p>
      )}
    </div>
  );
}
