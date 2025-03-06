import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function PodcastersPage() {
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
            alt="Podcasters"
            fill
            className="object-cover brightness-75"
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6 md:px-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6">For Podcasters</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl">
              Build a loyal audience and earn recurring revenue through memberships, exclusive episodes, and community engagement.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Podcast</Link>
            </Button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[{
              title: "Monetize Your Voice",
              text: "Offer ad-free episodes, bonus content, and early access to supporters.",
              image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop"
            }, {
              title: "Analytics Dashboard",
              text: "Track listener demographics, episode performance, and revenue growth.",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
            }, {
              title: "Community Tools",
              text: "Engage with listeners through polls, Q&A sessions, and private Discord channels.",
              image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=2070&auto=format&fit=crop"
            }].map((item, index) => (
              <div key={index} className="space-y-4 text-center md:text-left">
                <h2 className="text-2xl font-bold">{item.title}</h2>
                <p className="text-muted-foreground">{item.text}</p>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="rounded-lg w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Expanded Content Section */}
        <div className="bg-gray-100 py-16 px-6 text-center">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {[{
              title: "Get to Know Your Listeners",
              text: "Hang out in real-time community group chats, stay close through DMs and comments, or even reach out directly over email. Explore fan profiles to get to know the people behind all the love.",
              image: "https://images.unsplash.com/photo-1626379453568-4f7e394b32ef?q=80&w=2070&auto=format&fit=crop"
            }, {
              title: "Cut Through the Noise",
              text: "Connect with your community in a single, intimate space free of gatekeeping algorithms and distracting ads. Everything you post will be sent directly to listeners' feeds and inboxes, every time.",
              image: "https://images.unsplash.com/photo-1581091215367-83b4b6093b6c?q=80&w=2070&auto=format&fit=crop"
            }].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center md:items-start md:text-left">
                <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{item.text}</p>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="rounded-lg w-full max-w-sm sm:max-w-md md:max-w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial & Additional Income Options */}
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">More Ways to Get Paid</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Not only can you earn recurring income on CreatorSpace through paid membership, but you can also sell bonus episodes, archived seasons, and more to all of your fans in your personal online shop.
          </p>
          <Image
            src="https://images.unsplash.com/photo-1521120098171-0400e53e1317?q=80&w=2070&auto=format&fit=crop"
            alt="Revenue Streams"
            width={800}
            height={500}
            className="rounded-lg mx-auto w-full"
          />
          <blockquote className="mt-8 text-xl italic text-muted-foreground max-w-2xl mx-auto">
            "It's been a game changer, having a direct line of communication with our true followers and supporters."
            <footer className="mt-4 font-bold">— Straight Up Sisters</footer>
          </blockquote>
        </div>
      </div>
      <Footer />
    </>
  );
}
