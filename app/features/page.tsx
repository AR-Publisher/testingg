import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-500/10 to-yellow-500/10 animate-gradient"></div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Features</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Everything you need to build, grow, and monetize your creative business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Create on Your Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
                alt="Create on Your Terms"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="mb-4">
                Build your creative business your way. Whether you’re a podcaster, musician, or artist, we’ve got you
                covered.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Build Real Community</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Build Real Community"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="mb-4">
                Connect with your audience on a deeper level. Share exclusive content, engage with your supporters, and
                grow together.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Earning Made Easy</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2071&auto=format&fit=crop"
                alt="Earning Made Easy"
                width={500}
                height={300}
                className="rounded-lg mb-4"
              />
              <p className="mb-4">
                Monetize your passion with ease. Set up memberships, sell digital products, and earn recurring revenue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}