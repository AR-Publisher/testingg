import prisma  from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditTierForm from "./EditTierForm";

interface EditTierPageProps {
  params: {
    tierId: string;
  };
}

export default async function EditTierPage({ params }: EditTierPageProps) {
  const tier = await prisma.tier.findUnique({
    where: { id: params.tierId },
  });

  if (!tier) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit Tier</h1>
      <EditTierForm tier={tier} />
    </div>
  );
}
