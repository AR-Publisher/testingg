import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";


export default function BuildRealCommunityPage() {
  return (
    <>
    <Navigation/>
    <div className="relative min-h-screen bg-gray-50 py-16 px-6">
      {/* Background Section */}
      <div className="relative w-full h-96 bg-cover bg-center mb-12" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-6">
          <h1 className="text-4xl font-bold">Build Real Community</h1>
          <p className="text-lg mt-4 max-w-3xl">
            Every post, every time. More ways to stay close and get to know your fans better.
          </p><br></br>
          <Button size="lg" asChild>
              <Link href="/signup">Lets Get Started</Link>
          </Button>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Stay Connected with Your Fans</h2>
          <p className="text-lg text-gray-600 mb-6">
            Engage in real-time conversations, respond to comments, and create exclusive community events. 
            CreatorSpace helps you maintain a strong bond with your audience through direct interactions.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
          alt="Community Engagement"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
        <Image
          src="https://images.unsplash.com/photo-1591047139829-b26c28a3d9a8?q=80&w=2070&auto=format&fit=crop"
          alt="Exclusive Content"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Exclusive Content for Your Community</h2>
          <p className="text-lg text-gray-600 mb-6">
            Offer members-only posts, live sessions, and behind-the-scenes insights. Give your supporters a reason 
            to stay engaged and invested in your work.
          </p>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Grow and Strengthen Your Community</h2>
          <p className="text-lg text-gray-600 mb-6">
            Build a dedicated space for your fans to connect with you and each other. Strengthen relationships, 
            encourage discussions, and cultivate a thriving community.
          </p>
          <Button size="lg" asChild>
            <a href="/signup">Start Building</a>
          </Button>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1531572750479-bbfd6d57dbd7?q=80&w=2070&auto=format&fit=crop"
          alt="Community Growth"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>
    </div>
    <Footer/>
    </>
  );
}
