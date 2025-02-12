import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500/10 to-orange-500/10 animate-gradient"></div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Pricing</h1>
        <p className="text-xl text-muted-foreground mb-12 text-center">
          Choose the plan that’s right for you. Start for free, upgrade anytime.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">$0/month</p>
              <ul className="space-y-2 mb-6">
                <li>Basic features</li>
                <li>Up to 100 supporters</li>
                <li>Community access</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">$10/month</p>
              <ul className="space-y-2 mb-6">
                <li>Advanced features</li>
                <li>Unlimited supporters</li>
                <li>Exclusive content</li>
              </ul>
              <Button className="w-full">Upgrade to Pro</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-4">Custom</p>
              <ul className="space-y-2 mb-6">
                <li>Dedicated support</li>
                <li>Custom integrations</li>
                <li>Priority access</li>
              </ul>
              <Button className="w-full">Contact Us</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}