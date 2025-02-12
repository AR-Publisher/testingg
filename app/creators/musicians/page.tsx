import CreatorCategoryLayout from "@/components/creator-category-layout"

export default function MusiciansPage() {
  return (
    <CreatorCategoryLayout
      title="Musicians"
      features={[
        "From your mind to their ears",
        "Share more than music",
        "More ways to get paid",
        "Create musicians on CreatorSpace",
      ]}
      imageSrc="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"
      otherCreatorsText="Join these amazing musicians on CreatorSpace"
    />
  )
}

