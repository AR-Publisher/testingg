import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import AdminDashboardClient from "./_components/AdminDashboardClient"; // 👈 import client

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/auth/admin-login");
  }

  const [totalCreators, totalSupporters, earningsAgg, pendingWithdrawals] = await Promise.all([
    prisma.user.count({ where: { role: "CREATOR" } }),
    prisma.user.count({ where: { role: "SUPPORTER" } }),
    prisma.payout.aggregate({ _sum: { amount: true } }),
    prisma.payout.count({ where: { status: "PENDING" } }),
  ]);

  const totalEarnings = earningsAgg._sum.amount || 0;

  return (
    <AdminDashboardClient
      totalCreators={totalCreators}
      totalSupporters={totalSupporters}
      totalEarnings={totalEarnings}
      pendingWithdrawals={pendingWithdrawals}
    />
  );
}
