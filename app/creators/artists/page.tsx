import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";


export default function ArtistsPage() {
  return (
    <>
      <Navigation />
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2070&auto=format&fit=crop"
          alt="Artists on CreatorSpace"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">For Artists</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Turn your passion into a career by sharing and monetizing your art on CreatorSpace.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">Start Creating</Link>
          </Button>
        </div>
      </div>

      {/* Sections */}
      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* Showcase Your Portfolio */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=2070&auto=format&fit=crop"
            alt="Portfolio Showcase"
            width={600}
            height={400}
             className="rounded-xl shadow-xl w-full max-w-full"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Showcase Your Portfolio</h2>
            <p className="text-lg text-muted-foreground">
              Build a stunning portfolio where fans and collectors can admire your work in one place.
            </p>
          </div>
        </div>

        {/* Sell Your Artwork */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Sell Your Artwork</h2>
            <p className="text-lg text-muted-foreground">
              Monetize your creations by selling digital art, prints, and exclusive commissions.
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1587582423114-15aa38f55606?q=80&w=2070&auto=format&fit=crop"
            alt="Sell Your Artwork"
            width={600}
            height={400}
             className="rounded-xl shadow-xl w-full max-w-full"
          />
        </div>

        {/* Engage with Fans */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?q=80&w=2070&auto=format&fit=crop"
            alt="Engage with Fans"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Engage with Fans</h2>
            <p className="text-lg text-muted-foreground">
              Offer exclusive content, live streams, and behind-the-scenes access to connect deeply with your supporters.
            </p>
          </div>
        </div>

        {/* Learn & Grow */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Learn & Grow</h2>
            <p className="text-lg text-muted-foreground">
              Access tutorials, resources, and networking opportunities to improve your skills and career.
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1524230572899-a752b3835846?q=80&w=2070&auto=format&fit=crop"
            alt="Learn & Grow"
            width={600}
            height={400}
             className="rounded-xl shadow-xl w-full max-w-full"
          />
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-blue-900 text-white py-20 px-6 mt-16">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Join Other Artists on CreatorSpace</h2>
            <p className="text-lg mb-6">
              Be part of a thriving artistic community and grow your career with the support of your fans.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Join Now</Link>
            </Button>
          </div>
        </div>
      </div>

    </div>
      <Footer />
     </>
   );
 }