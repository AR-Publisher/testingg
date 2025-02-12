import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Pricing from "@/components/pricing"
import ContentHosting from "@/components/content-hosting"
import EngagementTools from "@/components/engagement-tools"
import Integrations from "@/components/integrations"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      <ContentHosting />
      <EngagementTools />
      <Integrations />
      <Testimonials />
      <Footer />
    </>
  )
}

