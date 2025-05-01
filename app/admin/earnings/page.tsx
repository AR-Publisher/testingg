// app/admin/earnings/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import EarningsTable from "./_components/EarningsTable";

export default async function AdminEarningsPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/auth/admin-login");
  }

  const earnings = await prisma.payout.findMany({
    include: {
      creator: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Earnings</h1>
      <EarningsTable data={earnings} />
    </div>
  );
}
