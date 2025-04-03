"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import CheckoutButton from "./checkout-button"
import { motion } from "framer-motion"

const AnimatedSection = motion.div

const tiers = [
  {
    name: "Basic",
    id: "basic",
    priceMonthly: "5%",
    priceYearly: "50%",
    description: "Perfect for new creators starting their journey",
    features: [
      "Access to exclusive posts",
      "Join community discussions",
      "Monthly live Q&A sessions",
      "Early access to content",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    priceMonthly: "10%",
    priceYearly: "100%",
    description: "For dedicated fans who want more interaction",
    features: [
      "All Basic features",
      "Behind-the-scenes content",
      "Private Discord access",
      "Monthly virtual meetups",
      "Exclusive merchandise",
    ],
  },
  {
    name: "Premium",
    id: "premium",
    priceMonthly: "15%",
    priceYearly: "150%",
    description: "The ultimate supporter experience",
    features: [
      "All Pro features",
      "One-on-one mentoring sessions",
      "Custom content requests",
      "Credits in projects",
      "Exclusive workshops",
      "Priority support",
    ],
  },
]

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Choose Your Support Tier</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Select the perfect tier to support your favorite creators
          </p>
          <div className="flex items-center justify-center space-x-2">
            <span className={`text-sm ${!isYearly ? "font-bold" : ""}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "font-bold" : ""}`}>Yearly (Save 17%)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <AnimatedSection
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-4xl font-bold mb-6">
                    {isYearly ? tier.priceYearly : tier.priceMonthly}
                    <span className="text-sm font-normal text-muted-foreground">/{isYearly ? "year" : "month"}</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <CheckoutButton priceId={isYearly ? tier.priceYearly : tier.priceMonthly} />
                </CardFooter>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Need a custom plan? We offer per-creation pricing models too!</p>
          <Button variant="outline">Contact Us for Custom Pricing</Button>
        </div>
      </div>
    </section>
  )
}

