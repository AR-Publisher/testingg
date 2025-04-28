"use client";

import { useState } from "react";
import { TierCard } from "./tier-card";
import { CreateTierModal } from "./create-tier-modal";
import { Button } from "@/components/ui/button";
import { Tier } from "@prisma/client";
import { useRouter } from "next/navigation"; // Added

interface TiersPageClientProps {
  tiers: Tier[];
}

export const TiersPageClient = ({ tiers }: TiersPageClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Added

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.refresh(); // ✅ Refresh page after closing modal
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Tiers</h1>
        <Button onClick={() => setIsModalOpen(true)}>Create Tier</Button>
      </div>

      {tiers.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No tiers created yet. Start by creating your first tier!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
      )}

      <CreateTierModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};
