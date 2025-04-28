// app/tiers/page.tsx
import prisma from "@/lib/prisma";
import { TiersPageClient } from "./_components/tiers-page-client"; // Import the client-side component

export default async function TiersPage() {
  const tiers = await prisma.tier.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <TiersPageClient tiers={tiers} />;
}
