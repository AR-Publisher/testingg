import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function CreateOnYourTermsPage() {
  return (
    <>
        <Navigation />
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
          alt="Create on Your Terms"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute z-10 px-6">
          <h1 className="text-5xl font-bold">Create on Your Terms</h1>
          <p className="text-xl mt-4 max-w-2xl mx-auto">
            Take control of your creative journey. Set your own rules, engage with fans, and grow at your pace.
          </p>
          <Button size="lg" className="mt-6" asChild>
            <Link href="/signup">Start Creating</Link>
          </Button>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="container mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">
        {/* Feature 1 */}
        <div>
          <h2 className="text-3xl font-bold">Getting started on CreatorSpace</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Launch your page in minutes and begin sharing your work with an audience that truly values your creativity.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2070&auto=format&fit=crop"
          alt="Getting Started"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      
        {/* Feature 2 */}
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
          alt="Make It Your Own"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold">Make It Your Own</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Customize your space, set your pricing, and decide how you engage with your fans and supporters.
          </p>
        </div>
      
        {/* Feature 3 */}
        <div>
          <h2 className="text-3xl font-bold">Reach Every Fan, Every Time</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No algorithms, no gatekeepers. Your content is delivered directly to your subscribers.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
          alt="Reach Your Fans"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      
        {/* Feature 4 */}
        <Image
          src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop"
          alt="Showcase Your Work"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold">Showcase Your Work</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Share your creations in high quality, and give your audience a premium viewing experience.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
   );
}
    