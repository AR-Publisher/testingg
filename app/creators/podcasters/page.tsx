import CreatorCategoryLayout from "@/components/creator-category-layout"

export default function PodcastersPage() {
  return (
    <CreatorCategoryLayout
      title="Podcasters"
      features={[
        "Get to know your listeners",
        "Cut through the noise",
        "More ways to get paid",
        "Other podcasters on CreatorSpace",
      ]}
      imageSrc="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
      otherCreatorsText="Join these amazing podcasters on CreatorSpace"
    />
  )
}

