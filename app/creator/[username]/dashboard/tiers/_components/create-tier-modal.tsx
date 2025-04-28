"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ Toast library

interface CreateTierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTierModal = ({ isOpen, onClose }: CreateTierModalProps) => {
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
      toast.error("Please fill in Tier Name and Price");
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
        toast.success("Tier created successfully! 🎉");

        // Reset the form fields
        setTierName("");
        setPrice("");
        setDescription("");
        setBenefits("");
        setImage(null);

        onClose();
        router.refresh();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to create tier");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Tier</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label>Tier Name</Label>
            <Input
              value={tierName}
              onChange={(e) => setTierName(e.target.value)}
              placeholder="e.g. Gold Membership"
              required
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
              required
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
              accept="image/jpeg,image/png,image/jpg"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Tier"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
