import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CreatorCategoryLayoutProps {
  title: string
  features: string[]
  imageSrc: string
  otherCreatorsText: string
}

export default function CreatorCategoryLayout({
  title,
  features,
  imageSrc,
  otherCreatorsText,
}: CreatorCategoryLayoutProps) {
  return (
    <div className="pt-16">
      <div className="relative h-[500px] overflow-hidden">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold mb-4">{feature}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold mb-8">{otherCreatorsText}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={`https://via.placeholder.com/400x300`}
                  alt="Creator"
                  width={400}
                  height={300}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

