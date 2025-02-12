import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function CreatorsPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-500/10 to-blue-500/10 animate-gradient"></div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">For Creators</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Join millions of creators who are monetizing their passion and building meaningful connections with their
          supporters.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Podcasters</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
                alt="Podcasters"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="mb-4">
                Turn your podcast into a thriving business. Connect with your listeners and earn through memberships,
                exclusive content, and more.
              </p>
              <Link href="/creators/podcasters" className="text-primary hover:underline">
                Learn More →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Video Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
                alt="Video Creators"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="mb-4">
                Turn your viewers into your people. Reach every fan, every time, and earn through memberships and
                exclusive content.
              </p>
              <Link href="/creators/video-creators" className="text-primary hover:underline">
                Learn More →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Musicians</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
                alt="Musicians"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="mb-4">
                Share more than music. Build a loyal fanbase and earn through memberships, exclusive tracks, and more.
              </p>
              <Link href="/creators/musicians" className="text-primary hover:underline">
                Learn More →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}