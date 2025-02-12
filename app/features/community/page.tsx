"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid lg:grid-cols-2 gap-16 items-center"
      >
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">Build Real Community</h1>
          <p className="text-xl text-muted-foreground">
            Our AI-driven community management tools help you:
          </p>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">🤖</div>
              <div>
                <h3 className="text-lg font-semibold">Smart Moderation</h3>
                <p className="text-muted-foreground">
                  AI-powered comment filtering that learns your community standards
                </p>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">🎯</div>
              <div>
                <h3 className="text-lg font-semibold">Engagement Predictions</h3>
                <p className="text-muted-foreground">
                  Machine learning models forecast post performance before publishing
                </p>
              </div>
            </li>
          </ul>
          <Button size="lg">Start Building</Button>
        </div>
        <div className="relative aspect-video">
          <Image
            src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop"
            alt="Community"
            fill
            className="rounded-xl shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
}