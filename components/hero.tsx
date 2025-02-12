"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import BackgroundCarousel from "./background-carousel";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 to-background pt-20">
      {/* Background Carousel */}
      <div className="absolute inset-0 -z-10">
        <BackgroundCarousel />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter">
              Turn your creativity into a thriving business
            </h1>
            <p className="text-xl text-muted-foreground">
              Join millions of creators who are monetizing their passion and building meaningful connections with their
              supporters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Start Creating Today</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/creators">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}