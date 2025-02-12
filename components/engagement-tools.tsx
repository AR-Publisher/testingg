"use client"

import { MessageSquare, BarChart2, Video, HelpCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const AnimatedSection = motion.div

export default function EngagementTools() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Engage With Your Audience</h2>
          <p className="text-xl text-muted-foreground">Tools to build deeper connections with your supporters</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedSection
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Direct Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Communicate one-on-one with your supporters or send group messages.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <BarChart2 className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Polls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Gather feedback and involve your audience in decision-making processes.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <HelpCircle className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Q&A Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Host interactive Q&A sessions to answer your supporters' questions.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <Video className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Livestream Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect your livestreams for exclusive supporter-only broadcasts.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

