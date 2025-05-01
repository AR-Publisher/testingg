"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  totalCreators: number;
  totalSupporters: number;
  totalEarnings: number;
  pendingWithdrawals: number;
}

export default function AdminDashboardClient({
  totalCreators,
  totalSupporters,
  totalEarnings,
  pendingWithdrawals,
}: Props) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the cookie manually (client-side)
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/auth/admin-login");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Creators" value={totalCreators} />
        <StatCard label="Total Supporters" value={totalSupporters} />
        <StatCard label="Total Earnings" value={`$${totalEarnings.toFixed(2)}`} />
        <StatCard label="Pending Withdrawals" value={pendingWithdrawals} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-white shadow p-4 rounded-lg text-center">
      <p className="text-gray-600">{label}</p>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}
