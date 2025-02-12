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
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Creator Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 text-center">
              <Image
                src="/creator-avatar.jpg"
                alt="Creator Avatar"
                width={200}
                height={200}
                className="rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-sm"
              />
              <h1 className="text-2xl font-bold mb-2">{params.username}</h1>
              <p className="text-gray-600 mb-4">Digital Artist & Illustrator</p>
              <Link href="/app/tiers">
                <Button className="w-full mb-4 bg-blue-600 hover:bg-blue-700">Become a Supporter</Button>
              </Link>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-bold text-lg">234</div>
                  <div className="text-sm text-gray-500">Posts</div>
                </div>
                <div>
                  <div className="font-bold text-lg">15.2K</div>
                  <div className="text-sm text-gray-500">Supporters</div>
                </div>
                <div>
                  <div className="font-bold text-lg">2.1K</div>
                  <div className="text-sm text-gray-500">Likes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="posts">
            <TabsList className="mb-4 flex space-x-2 bg-gray-200 p-2 rounded-lg">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            
            {/* Posts Tab */}
            <TabsContent value="posts" className="space-y-4">
              {[1, 2, 3].map((post) => (
                <Card key={post} className="shadow-md border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">Latest Artwork #{post}</h3>
                    <p className="text-gray-600 mb-4">
                      Here's my latest piece! I spent several hours perfecting the details...
                    </p>
                    <Image
                      src={`/artwork-${post}.jpg`}
                      alt={`Post ${post}`}
                      width={600}
                      height={300}
                      className="rounded-lg shadow-sm"
                    />
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            {/* About Tab */}
            <TabsContent value="about">
              <Card className="shadow-md border border-gray-200">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About Me</h2>
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
                    width={200}
                    height={200}
                    className="rounded-lg shadow-md border border-gray-200"
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
