"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const TierCard = ({ tier }: { tier: any }) => {
  const router = useRouter();
  
  const username = "creatorname"; // 🚨 TODO: Replace with real username from session later

  const handleEdit = () => {
    router.push(`/creator/${username}/dashboard/tiers/edit/${tier.id}`);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this tier?")) {
      const res = await fetch(`/api/tiers/${tier.id}`, { method: "DELETE" });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete tier");
      }
    }
  };

  return (
    <div className="border rounded-xl p-6 shadow-sm space-y-4">
      {tier.imageUrl ? (
        <img
          src={tier.imageUrl}
          alt="Tier Image"
          className="rounded-md object-cover h-40 w-full"
        />
      ) : (
        <div className="h-40 w-full flex items-center justify-center bg-gray-200 text-gray-500 rounded-md">
          No Image
        </div>
      )}

      <div>
        <h2 className="text-xl font-bold">{tier.tierName}</h2>
        <p className="text-muted-foreground">${tier.price} / month</p>
        <p className="mt-2">{tier.description}</p>
        <ul className="list-disc pl-5 mt-2 text-sm">
          {tier.benefits.map((benefit: string, idx: number) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <Button size="sm" onClick={handleEdit}>Edit</Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
};
