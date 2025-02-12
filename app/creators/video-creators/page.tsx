import CreatorCategoryLayout from "@/components/creator-category-layout"

export default function VideoCreatorsPage() {
  return (
    <CreatorCategoryLayout
      title="Video Creators"
      features={[
        "Turn your viewers into your people",
        "Reach every fan every time",
        "More ways to get paid",
        "Other video creators on CreatorSpace",
      ]}
      imageSrc="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop"
      otherCreatorsText="Join these amazing video creators on CreatorSpace"
    />
  )
}

