"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Youtube, MessageCircle, Zap, Code } from "lucide-react"
import { motion } from "framer-motion"

const AnimatedSection = motion.div

const integrations = [
  {
    name: "Discord",
    description: "Connect your Discord server for exclusive patron channels.",
    icon: MessageCircle,
    action: "Connect Discord",
  },
  {
    name: "YouTube",
    description: "Sync your YouTube content and offer early access to patrons.",
    icon: Youtube,
    action: "Connect YouTube",
  },
  {
    name: "Zapier",
    description: "Automate workflows with thousands of apps.",
    icon: Zap,
    action: "Setup Zapier",
  },
  {
    name: "API Access",
    description: "Build custom integrations with our robust API.",
    icon: Code,
    action: "View API Docs",
  },
]

export default function Integrations() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Powerful Integrations</h2>
          <p className="text-xl text-muted-foreground">
            Connect your favorite tools and expand your creator capabilities
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration, index) => (
            <AnimatedSection
              key={integration.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <integration.icon className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>{integration.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{integration.description}</p>
                  <Button variant="outline" className="w-full">
                    {integration.action}
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

