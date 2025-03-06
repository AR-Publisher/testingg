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
    name: "Basic",
    id: "basic",
    priceMonthly: "5",
    priceYearly: "50",
    description: "For beginners starting their journey",
    features: [
      "Access to exclusive posts",
      "Join community discussions",
      "Early access to content",
    ],
  },
  {
    name: "Pro",
    id: "pro",
    priceMonthly: "15",
    priceYearly: "150",
    description: "For serious creators growing their audience",
    features: [
      "All Basic features",
      "Behind-the-scenes content",
      "Private Discord access",
    ],
  },
  {
    name: "Premium",
    id: "premium",
    priceMonthly: "25",
    priceYearly: "250",
    description: "For top supporters & businesses",
    features: [
      "All Pro features",
      "One-on-one mentoring",
      "Custom content requests",
    ],
  },
];

export default function CorePricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
     <>
        <Navigation />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[450px] flex items-center justify-center text-center bg-black bg-opacity-50">
        <Image
          src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?q=80&w=2070&auto=format&fit=crop"
          alt="Pricing Hero"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-60"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-white px-6">
          <h1 className="text-5xl font-bold">Affordable Pricing for Everyone</h1>
          <p className="text-lg mt-4">Choose a plan that fits your needs and start growing today.</p>
        </div>
      </div>

      {/* Pricing Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Core Pricing Plans</h2>
          <p className="text-lg text-gray-600 mb-6">
            Pick a plan that works for you and enjoy exclusive content & community access.
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
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Core Features?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our core plans offer everything you need to get started with confidence.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Flexible Plans</h3>
              <p className="text-sm text-gray-600">Choose a plan that suits your budget and upgrade anytime.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-600">Enjoy peace of mind with our reliable payment processing.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Community Access</h3>
              <p className="text-sm text-gray-600">Connect with creators and grow together in our community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Join today and take your creative journey to the next level.
          </p>
          <Button size="lg" className="bg-primary">Get Started Now</Button>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}
