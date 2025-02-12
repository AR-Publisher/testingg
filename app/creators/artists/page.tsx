import CreatorCategoryLayout from "@/components/creator-category-layout"

export default function ArtistsPage() {
  return (
    <CreatorCategoryLayout
      title="Artists"
      features={[
        "Earning made easy",
        "Create what inspires you",
        "Build community around your art",
        "Other artists on CreatorSpace",
      ]}
      imageSrc="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2070&auto=format&fit=crop"
      otherCreatorsText="Join these amazing artists on CreatorSpace"
    />
  )
}

