import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const articles = [
  {
    title: "New AI Content Tools Launch",
    date: "March 15, 2024",
    excerpt: "Discover our latest AI-powered editing suite that helps creators optimize video length and engagement metrics.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Creator Economy Report 2024",
    date: "March 10, 2024",
    excerpt: "Annual analysis reveals 42% growth in AI-assisted content creation across our platform.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">Newsroom</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
              <p className="text-muted-foreground">{article.date}</p>
            </CardHeader>
            <CardContent>
              <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                className="rounded-lg mb-4"
              />
              <p>{article.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}