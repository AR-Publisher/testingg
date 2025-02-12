import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "CreatorSpace has transformed how I connect with my audience. The platform's tools make it easy to share my art and build a sustainable income.",
    author: "Sarah Chen",
    role: "Digital Artist",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "Thanks to CreatorSpace, I've built a thriving community around my music. The direct support from fans has allowed me to focus on creating full-time.",
    author: "Marcus Rodriguez",
    role: "Musician",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The platform's flexibility and support have been incredible. I can focus on writing while maintaining a meaningful connection with my readers.",
    author: "Emma Thompson",
    role: "Writer",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-xl text-muted-foreground">
            Hear from creators who are building their dreams on CreatorSpace
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-12">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-primary/20" />
                <p className="mb-6 text-muted-foreground">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

