"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Subscription {
  id: string;
  creator: string;
  tier: string;
  price: string;
  status: "active" | "cancelled";
  nextBilling: string;
}

const fetchSubscriptions = async (): Promise<Subscription[]> => {
  // Placeholder for API call
  return [
    {
      id: "1",
      creator: "Sarah Chen",
      tier: "Pro",
      price: "$15/month",
      status: "active",
      nextBilling: "2024-03-01",
    },
    {
      id: "2",
      creator: "Marcus Rodriguez",
      tier: "Premium",
      price: "$25/month",
      status: "active",
      nextBilling: "2024-03-05",
    },
    {
      id: "3",
      creator: "Emma Thompson",
      tier: "Basic",
      price: "$5/month",
      status: "cancelled",
      nextBilling: "N/A",
    },
  ];
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions().then((data) => {
      setSubscriptions(data);
      setLoading(false);
    });
  }, []);

  const handleCancelSubscription = (id: string) => {
    setSubscriptions((subs) =>
      subs.map((sub) =>
        sub.id === id ? { ...sub, status: "cancelled" as const, nextBilling: "N/A" } : sub
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">My Subscriptions</h1>
        <p className="text-muted-foreground">Manage your creator subscriptions</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading subscriptions...</p>
      ) : (
        <div className="grid gap-6 max-w-3xl mx-auto">
          {subscriptions.map((subscription) => (
            <Card key={subscription.id} className="p-4">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{subscription.creator}</CardTitle>
                <CardDescription>
                  {subscription.tier} Tier - {subscription.price}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Status: <span className={subscription.status === "active" ? "text-green-600" : "text-red-600"}>{subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}</span>
                    </p>
                    <p className="text-sm text-gray-600">Next billing date: {subscription.nextBilling}</p>
                  </div>
                  <div className="space-x-2 flex">
                    {subscription.status === "active" && (
                      <>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive">Cancel</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Cancel Subscription</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to cancel your subscription to {subscription.creator}?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">Keep Subscription</Button>
                              <Button variant="destructive" onClick={() => handleCancelSubscription(subscription.id)}>
                                Confirm Cancel
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline">Change Tier</Button>
                      </>
                    )}
                    <Button variant="outline">View Benefits</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}