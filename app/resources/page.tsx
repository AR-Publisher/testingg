import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient"></div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Resources</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Tools, guides, and inspiration to help you grow your creative business.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Creator Handbook</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                A comprehensive guide to getting started and growing on CreatorSpace.
              </p>
              <Link href="#" className="text-primary hover:underline">
                Learn More →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Step-by-step video guides on using CreatorSpace features.
              </p>
              <Link href="#" className="text-primary hover:underline">
                Learn More →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Creator Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Connect with other creators, share tips, and get advice.
              </p>
              <Link href="#" className="text-primary hover:underline">
                Learn More →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}