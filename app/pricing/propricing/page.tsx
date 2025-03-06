"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

const AnimatedSection = motion.div;

const tiers = [
  {
    name: "Starter",
    id: "starter",
    priceMonthly: "10",
    priceYearly: "100",
    description: "For creators just starting out",
    features: [
      "All Core features",
      "Advanced analytics",
      "Custom branding",
    ],
  },
  {
    name: "Growth",
    id: "growth",
    priceMonthly: "30",
    priceYearly: "300",
    description: "For growing creators scaling up",
    features: [
      "All Starter features",
      "Priority support",
      "Email marketing tools",
    ],
  },
  {
    name: "Elite",
    id: "elite",
    priceMonthly: "60",
    priceYearly: "600",
    description: "For top-tier professionals & businesses",
    features: [
      "All Growth features",
      "Dedicated account manager",
      "API access & integrations",
    ],
  },
];

export default function ProPricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
        <Navigation />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[450px] flex items-center justify-center text-center bg-black bg-opacity-50">
        <Image
          src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?q=80&w=2070&auto=format&fit=crop"
          alt="Pro Pricing Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-60"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-white px-6">
          <h1 className="text-5xl font-bold">Pro Features for Advanced Creators</h1>
          <p className="text-lg mt-4">Scale your content with powerful tools & dedicated support.</p>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pro Pricing Plans</h2>
          <p className="text-lg text-gray-600 mb-6">
            Unlock powerful tools to enhance your creator journey.
          </p>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className={`text-sm ${!isYearly ? "font-bold" : ""}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm ${isYearly ? "font-bold" : ""}`}>Yearly (Save 17%)</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <AnimatedSection
                key={tier.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="w-[280px] mx-auto flex flex-col shadow-md border border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-3xl font-bold mb-4">
                      ${isYearly ? tier.priceYearly : tier.priceMonthly}
                      <span className="text-sm font-normal text-gray-500">/{isYearly ? "year" : "month"}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Subscribe</Button>
                  </CardFooter>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Why Upgrade to Pro?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Pro users get access to premium tools and priority support.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-sm text-gray-600">Understand your audience with in-depth insights.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
              <p className="text-sm text-gray-600">Get help from our team with 24/7 premium support.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Exclusive Integrations</h3>
              <p className="text-sm text-gray-600">Unlock API access and powerful third-party tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Take Your Growth to the Next Level</h2>
          <p className="text-lg text-gray-300 mb-6">
            Upgrade to Pro today and unlock the best tools for creators.
          </p>
          <Button size="lg" className="bg-primary">Upgrade to Pro</Button>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}
