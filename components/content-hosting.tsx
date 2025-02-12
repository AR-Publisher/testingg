"use client"

import { FileText, Lock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const AnimatedSection = motion.div

export default function ContentHosting() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Host Your Exclusive Content</h2>
          <p className="text-xl text-muted-foreground">Share your creations securely with your supporters</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <AnimatedSection
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Exclusive Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Share text, images, and videos exclusively with your paying supporters.
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
                <Lock className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Secure File Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload and share large files securely with specific tiers or all supporters.
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
                <Users className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Private Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Foster engagement with a private community space for discussions and interactions.
                </p>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

