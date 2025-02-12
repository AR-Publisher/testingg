"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Subscription {
  id: string
  creator: string
  tier: string
  price: string
  status: "active" | "cancelled"
  nextBilling: string
}

const mockSubscriptions: Subscription[] = [
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
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions)

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === id ? { ...sub, status: "cancelled" as const, nextBilling: "N/A" } : sub)),
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Subscriptions</h1>
        <p className="text-muted-foreground">Manage your creator subscriptions</p>
      </div>

      <div className="grid gap-6">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader>
              <CardTitle>{subscription.creator}</CardTitle>
              <CardDescription>
                {subscription.tier} Tier - {subscription.price}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Status:{" "}
                    <span className={subscription.status === "active" ? "text-green-600" : "text-red-600"}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground">Next billing date: {subscription.nextBilling}</p>
                </div>
                <div className="space-x-2">
                  {subscription.status === "active" && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive">Cancel Subscription</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Cancel Subscription</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to cancel your subscription to {subscription.creator}? You'll continue
                            to have access until the end of your current billing period.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => {}}>
                            Keep Subscription
                          </Button>
                          <Button variant="destructive" onClick={() => handleCancelSubscription(subscription.id)}>
                            Yes, Cancel
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button variant="outline">View Benefits</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

