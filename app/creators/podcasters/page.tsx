import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function PodcastersPage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
          alt="Podcasters"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">For Podcasters</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Build a loyal audience and earn recurring revenue through memberships, exclusive episodes, and community engagement.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Start Your Podcast</Link>
          </Button>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Monetize Your Voice</h2>
            <p className="text-muted-foreground">
              Offer ad-free episodes, bonus content, and early access to supporters.
            </p>
            <Image
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop"
              alt="Monetization"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
            <p className="text-muted-foreground">
              Track listener demographics, episode performance, and revenue growth.
            </p>
            <Image
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Analytics"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Community Tools</h2>
            <p className="text-muted-foreground">
              Engage with listeners through polls, Q&A sessions, and private Discord channels.
            </p>
            <Image
              src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop"
              alt="Community"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}