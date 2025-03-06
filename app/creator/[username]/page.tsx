import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface CreatorPageProps {
  params: {
    username: string;
  };
}

export default function CreatorPage({ params }: CreatorPageProps) {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/background.jpg)' }}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Creator Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border border-gray-300 bg-white backdrop-blur-lg bg-opacity-80">
              <CardContent className="p-6 text-center">
                <Image
                  src="/creator-avatar.jpg"
                  alt="Creator Avatar"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md animate-pulse"
                />
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{params.username}</h1>
                <p className="text-gray-500 mb-4">Digital Artist & Illustrator</p>
                <div className="flex justify-center gap-4 mb-4">
                  <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800">Follow</Button>
                  <Link href="/app/tiers">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Subscribe</Button>
                  </Link>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center text-gray-700">
                  <div>
                    <div className="font-bold text-xl">234</div>
                    <div className="text-sm">Posts</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">15.2K</div>
                    <div className="text-sm">Supporters</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">2.1K</div>
                    <div className="text-sm">Likes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="posts">
              <TabsList className="mb-6 flex space-x-3 bg-blue-100 p-3 rounded-lg shadow-md">
                <TabsTrigger value="posts" className="text-blue-600">Posts</TabsTrigger>
                <TabsTrigger value="about" className="text-blue-600">About</TabsTrigger>
                <TabsTrigger value="gallery" className="text-blue-600">Gallery</TabsTrigger>
              </TabsList>
              
              {/* Posts Tab */}
              <TabsContent value="posts" className="space-y-6">
                {[1, 2, 3].map((post) => (
                  <Card key={post} className="shadow-lg border border-gray-300 bg-white backdrop-blur-lg bg-opacity-80">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Latest Artwork #{post}</h3>
                      <p className="text-gray-600 mb-4">
                        Here's my latest piece! I spent several hours perfecting the details...
                      </p>
                      <Image
                        src={`/artwork-${post}.jpg`}
                        alt={`Post ${post}`}
                        width={600}
                        height={300}
                        className="rounded-lg shadow-md"
                      />
                      <div className="flex justify-between mt-4">
                        <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700">Like</Button>
                        <Button className="bg-blue-100 hover:bg-blue-200 text-blue-700">Comment</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              {/* About Tab */}
              <TabsContent value="about">
                <Card className="shadow-lg border border-gray-300 bg-white backdrop-blur-lg bg-opacity-80">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">About Me</h2>
                    <p className="text-gray-600">
                      I'm a digital artist with over 5 years of experience creating unique illustrations and concept art.
                      Through CreatorSpace, I share my creative process, tutorials, and exclusive artwork with my amazing
                      supporters.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Gallery Tab */}
              <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Image
                      key={item}
                      src={`/gallery-${item}.jpg`}
                      alt={`Gallery item ${item}`}
                      width={300}
                      height={300}
                      className="rounded-lg shadow-md border border-gray-300 w-full object-cover"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
