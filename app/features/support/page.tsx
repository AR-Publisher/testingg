import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function GetBusinessSupportPage() {
  return (
     <>
              <Navigation />
    <div className="relative min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] flex items-center justify-center text-center bg-black bg-opacity-50">
        <Image
          src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=2070&auto=format&fit=crop"
          alt="Business Support"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-50"
        />
        <div className="relative z-10 max-w-3xl mx-auto text-white px-6">
          <h1 className="text-5xl font-bold">Get Business Support</h1>
          <p className="text-lg mt-4">
            Help when you need it. Policies to protect you. Payments powered by CreatorSpace.
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Reliable Payment Processing</h2>
          <p className="text-lg text-gray-600 mb-6">
            CreatorSpace ensures secure and timely payments so you can focus on what you do best. Receive payments from fans worldwide with ease.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1614028673043-b62d61001430?q=80&w=2070&auto=format&fit=crop"
          alt="Secure Payments"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <Image
          src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=2070&auto=format&fit=crop"
          alt="Legal and Policy Support"
          width={600}
          height={400}
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">Policies That Protect You</h2>
          <p className="text-lg text-gray-600 mb-6">
            Our policies are designed to safeguard your content, protect your rights, and ensure that you have full control over your work and revenue.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">24/7 Support for Creators</h2>
          <p className="text-lg text-gray-600 mb-6">
            Whether you need assistance with payments, policies, or technical issues, our dedicated support team is available to help you at any time.
          </p>
          <Button size="lg" asChild>
            <a href="/contact">Get Support</a>
          </Button>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1601924582971-3cc64b9f2e62?q=80&w=2070&auto=format&fit=crop"
          alt="Customer Support"
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
