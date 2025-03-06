import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function VideoCreatorsPage() {
  return (
    <>
    <Navigation />
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
          alt="Video Creators"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">For Video Creators</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Transform your channel into a sustainable business with memberships, exclusive content, and direct fan support.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Start Creating</Link>
          </Button>
        </div>
      </div>

      {/* AI-Driven Growth Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Grow Smarter with AI Insights</h2>
            <p className="text-lg text-muted-foreground">
              Unlock AI-powered recommendations to increase engagement and maximize earnings.
              Understand viewer preferences and optimize your video strategy effortlessly.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">🤖</span>
                <span>AI-driven content suggestions tailored to your audience</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">💰</span>
                <span>Revenue forecasting based on engagement trends</span>
              </li>
            </ul>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=2070&auto=format&fit=crop"
            alt="AI Insights"
            width={600}
            height={400}
            className="rounded-xl shadow-xl w-full"
          />
        </div>
      </div>

      {/* Interactive Community Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="https://images.unsplash.com/photo-1601584113042-422ea1376a0e?q=80&w=2070&auto=format&fit=crop"
            alt="Community Engagement"
            width={600}
            height={400}
            className="rounded-xl shadow-xl w-full"
          />
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-3xl font-bold">Engage Like Never Before</h2>
            <p className="text-lg text-muted-foreground">
              Connect with your audience through live Q&A, fan polls, and exclusive behind-the-scenes content.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">🎙</span>
                <span>Host live streams and exclusive premieres</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">💬</span>
                <span>Foster discussions with premium community tools</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </>
 );
}