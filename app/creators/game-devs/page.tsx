import CreatorCategoryLayout from "@/components/creator-category-layout"

export default function GameDevsPage() {
  return (
    <CreatorCategoryLayout
      title="Game Developers"
      features={[
        "A safe way to get paid",
        "Selling made simple",
        "Where real community thrives",
        "Other game devs on CreatorSpace",
      ]}
      imageSrc="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"
      otherCreatorsText="Join these amazing game developers on CreatorSpace"
    />
  )
}

