import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function MusiciansPage() {
  return (
    <>
      <Navigation />
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
          alt="Musicians"
          fill
          className="object-cover brightness-75"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">For Musicians</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Connect with your fans like never before. Share exclusive tracks, behind-the-scenes content, and build a thriving music community.
          </p>
          <Button size="lg" asChild>
            <a href="/signup">Start Your Music Journey</a>
          </Button>
        </div>
      </div>

      {/* From Your Mind to Their Ears */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">From Your Mind to Their Ears</h2>
            <p className="text-lg text-muted-foreground">
              Release your songs to an audience that truly supports your work. Provide early access, exclusive singles, and live acoustic versions.
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=2070&auto=format&fit=crop"
            alt="Musician Recording"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>

      {/* Share More Than Music */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src="https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2070&auto=format&fit=crop"
            alt="Behind the Scenes"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Share More Than Music</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Give your fans a deeper connection by sharing behind-the-scenes content, songwriting sessions, and exclusive interviews.
            </p>
          </div>
        </div>
      </div>

      {/* More Ways to Get Paid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">More Ways to Get Paid</h2>
            <p className="text-lg text-muted-foreground">
              Earn through monthly memberships, one-time tips, ticketed livestreams, and even selling exclusive merch directly to your fans.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">🎟️</span>
                <span>Sell virtual concert tickets and VIP passes</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-primary/10 p-2 rounded-full">👕</span>
                <span>Offer exclusive merch to your top fans</span>
              </li>
            </ul>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop"
            alt="Musician performing"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Image
            src="https://images.unsplash.com/photo-1511674487232-0e31d7ab1e1c?q=80&w=2070&auto=format&fit=crop"
            alt="Exclusive Content"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Monetize Your Music</h2>
            <p className="text-lg text-muted-foreground">
              Offer exclusive content such as behind-the-scenes footage, early releases, and live jam sessions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Community Engagement Section */}
      <div className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4">Engage with Your Fans</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Host Q&A sessions, share songwriting inspiration, and connect with your fans through interactive posts and comments.
            </p>
          </div>
          <Image
            src="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?q=80&w=2070&auto=format&fit=crop"
            alt="Engaging with Fans"
            width={600}
            height={400}
            className="rounded-xl shadow-xl"
          />
        </div>
      </div>
      {/* Create Musicians on CreatorSpace */}
      <div className="bg-blue-900 text-white py-20 px-6 mt-16">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-center max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Create Musicians on CreatorSpace</h2>
            <p className="text-lg mb-6">
              Collaborate with other musicians, get discovered by new fans, and grow your music career with the power of community.
            </p>
           <Button size="lg" asChild>
           <Link href="/signup">Lets Get Started</Link>
           </Button>
         </div>
       </div>
      </div>
    </div>
      
    <Footer />
    </>
  );
}