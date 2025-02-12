import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function VideoCreatorsPage() {
  return (
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

      {/* AI-Generated Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why Video Creators Thrive Here</h2>
            <p className="text-lg text-muted-foreground">
              Leverage our AI-powered analytics to understand viewer behavior and optimize content strategy. 
              Our platform automatically suggests optimal posting times based on your audience's activity patterns.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">🎥</span>
                <span>Smart content recommendations using machine learning</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">📈</span>
                <span>Predictive revenue forecasting based on engagement metrics</span>
              </li>
            </ul>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=2070&auto=format&fit=crop"
            alt="Analytics"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}