"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditTierForm({ tier }: { tier: any }) {
  const router = useRouter();
  const [tierName, setTierName] = useState(tier.tierName);
  const [price, setPrice] = useState(tier.price.toString());
  const [description, setDescription] = useState(tier.description || "");
  const [benefits, setBenefits] = useState((tier.benefits || []).join("\n"));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch(`/api/tiers/${tier.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierName,
          price: parseFloat(price),
          description,
          benefits: benefits
            .split("\n")
            .map((b: string) => b.trim())
            .filter((b: string) => b),
        }),
      });

      if (res.ok) {
        toast.success("Tier updated successfully!");
        router.push("/creator/creatorname/dashboard"); // 🛠️ TODO: dynamic username later
        router.refresh();
      } else {
        toast.error("Failed to update tier");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={tierName}
        onChange={(e) => setTierName(e.target.value)}
        placeholder="Tier Name"
        required
      />
      <Input
        type="number"
        min="1"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <Textarea
        value={benefits}
        onChange={(e) => setBenefits(e.target.value)}
        placeholder={"Benefits (one per line)"}
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Updating..." : "Update Tier"}
      </Button>
    </form>
  );
}
