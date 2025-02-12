import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface CreatorPageProps {
  params: {
    username: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Creator Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Creator Avatar"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{params.username}</h1>
                <p className="text-muted-foreground mb-4">Digital Artist & Illustrator</p>
                <Button className="w-full mb-4">Become a Supporter</Button>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-bold">234</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div>
                    <div className="font-bold">15.2K</div>
                    <div className="text-sm text-muted-foreground">Supporters</div>
                  </div>
                  <div>
                    <div className="font-bold">2.1K</div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="posts">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="space-y-4">
              {/* Example Posts */}
              {[1, 2, 3].map((post) => (
                <Card key={post}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Latest Artwork #{post}</h3>
                    <p className="text-muted-foreground mb-4">
                      Here's my latest piece! I spent several hours perfecting the details...
                    </p>
                    <Image
                      src="/placeholder.svg?height=300&width=600"
                      alt={`Post ${post}`}
                      width={600}
                      height={300}
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="about">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About Me</h2>
                  <p className="text-muted-foreground">
                    I'm a digital artist with over 5 years of experience creating unique illustrations and concept art.
                    Through CreatorSpace, I share my creative process, tutorials, and exclusive artwork with my amazing
                    supporters.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="gallery">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Image
                    key={item}
                    src="/placeholder.svg?height=200&width=200"
                    alt={`Gallery item ${item}`}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

