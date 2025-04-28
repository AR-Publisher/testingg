"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateTierPage = () => {
  const router = useRouter();

  const [tierName, setTierName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tierName || !price) {
      alert("Please fill in Tier Name and Price");
      return;
    }

    const formData = new FormData();
    formData.append("tierName", tierName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("benefits", benefits);
    if (image) {
      formData.append("image", image);
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/tiers", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        router.push("../tiers"); // after creation, go back to tiers list
      } else {
        console.error(await res.text());
        alert("Failed to create tier");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Create New Tier</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label>Tier Name</Label>
          <Input
            value={tierName}
            onChange={(e) => setTierName(e.target.value)}
            placeholder="e.g. Gold Membership"
          />
        </div>

        <div className="space-y-2">
          <Label>Price ($ per month)</Label>
          <Input
            type="number"
            min="1"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 5.99"
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of what supporters get"
          />
        </div>

        <div className="space-y-2">
          <Label>Benefits (one per line)</Label>
          <Textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder={"Early access to posts\nExclusive wallpapers\nBehind-the-scenes content"}
          />
        </div>

        <div className="space-y-2">
          <Label>Tier Image (optional)</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Tier"}
        </Button>
      </form>
    </div>
  );
};

export default CreateTierPage;
