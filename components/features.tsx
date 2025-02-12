"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, FileText, MessageSquare, BarChart, Share2, Package, Shield } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import type React from "react" // Added import for React

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      {children}
    </motion.div>
  )
}

const features = [
  {
    title: "Membership & Subscriptions",
    description: "Multiple tiers, custom pricing, monthly/per-creation models.",
    icon: Users,
  },
  {
    title: "Payment Processing",
    description: "Secure payments, multiple methods, automated billing.",
    icon: CreditCard,
  },
  {
    title: "Content Hosting",
    description: "Exclusive posts, file uploads, private community.",
    icon: FileText,
  },
  {
    title: "Engagement Tools",
    description: "Direct messaging, polls, Q&A, livestream integration.",
    icon: MessageSquare,
  },
  {
    title: "Analytics & Growth",
    description: "Revenue dashboard, patron insights, tier tracking.",
    icon: BarChart,
  },
  {
    title: "Integrations",
    description: "Discord, YouTube, Zapier, API access.",
    icon: Share2,
  },
  {
    title: "Merch & Rewards",
    description: "CreatorSpace Merch, automated fulfillment.",
    icon: Package,
  },
  {
    title: "Business & Security",
    description: "Payouts, tax compliance, fraud protection.",
    icon: Shield,
  },
]

export default function Features() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Powerful Features for Creators</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to build and grow your creative business
            </p>
          </motion.div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

