import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const resources = [
  {
    title: "Creator Handbook",
    description: "A comprehensive guide to getting started and growing on CreatorSpace.",
    link: "#",
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides on using CreatorSpace features.",
    link: "#",
  },
  {
    title: "Creator Community",
    description: "Connect with other creators, share tips, and get advice.",
    link: "#",
  },
  {
    title: "Blog",
    description: "Latest news, tips, and success stories from the CreatorSpace community.",
    link: "#",
  },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Resources</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {resources.map((resource) => (
          <Card key={resource.title}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{resource.description}</p>
              <Link href={resource.link} className="text-primary hover:underline">
                Learn More
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

