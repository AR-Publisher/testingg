import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";


export default function ExpandYourReachPage() {
  return (
    <>
          <Navigation />
    <div className="relative min-h-screen bg-gray-50 py-16 px-6">
      {/* Hero Section with Dark Overlay */}
      <div className="relative h-[500px] bg-black">
        <Image
          src="https://images.unsplash.com/photo-1517245386807-9b77b2e59368?q=80&w=2070&auto=format&fit=crop"
          alt="Expand Your Reach"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-5xl font-bold">Expand Your Reach</h1>
          <p className="text-lg mt-4 max-w-2xl">
            Bring in new fans, unlock growth, and utilize powerful tools to expand your audience on CreatorSpace.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Get Discovered by More Fans</h2>
          <p className="text-lg text-gray-600 mb-6">
            Use CreatorSpace's built-in discovery features to reach new audiences. Get featured, collaborate with others, and grow beyond expectations.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"
          alt="Discovery"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
        <Image
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2070&auto=format&fit=crop"
          alt="Growth"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Unlock New Growth Opportunities</h2>
          <p className="text-lg text-gray-600 mb-6">
            Take advantage of CreatorSpace's analytics and promotional tools to maximize your reach and engagement.
          </p>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Collaborate & Expand</h2>
          <p className="text-lg text-gray-600 mb-6">
            Connect with fellow creators, cross-promote content, and expand your audience organically through strategic partnerships.
          </p>
          <Button size="lg" asChild>
            <a href="/signup">Start Expanding</a>
          </Button>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
          alt="Collaboration"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
    <Footer />
    </>
  );
}
