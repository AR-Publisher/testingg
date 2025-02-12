import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function CreatorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">For Creators</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Build Your Community</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Connect with your audience and build a loyal following. Our platform provides the tools you need to engage
              with your supporters and grow your community.
            </p>
            <Image src="/images/community.jpg" alt="Community" width={500} height={300} className="rounded-lg" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monetize Your Passion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Turn your creativity into a sustainable income. With our flexible monetization options, you can earn money
              doing what you love.
            </p>
            <Image src="/images/monetization.jpg" alt="Monetization" width={500} height={300} className="rounded-lg" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

