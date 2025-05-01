import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default async function AdminWithdrawalsPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/auth/admin-login");
  }

  const withdrawals = await prisma.withdrawalMethod.findMany({
    include: {
      payouts: {
        include: {
          creator: true,
        },
      },
      creator: true,
    },
  });

  const rows = withdrawals.flatMap((method) =>
    method.payouts.map((payout) => ({
      id: payout.id,
      creator: method.creator?.userId || "N/A",
      method: method.type,
      details: method.details,
      amount: payout.amount,
      status: payout.status,
      createdAt: payout.createdAt,
    }))
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Withdrawals</h1>
      {rows.length === 0 ? (
        <p className="text-muted-foreground">No withdrawals found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-2">Creator ID</th>
                <th className="px-4 py-2">Method</th>
                <th className="px-4 py-2">Details</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b">
                  <td className="px-4 py-2">{row.creator}</td>
                  <td className="px-4 py-2">{row.method}</td>
                  <td className="px-4 py-2">{row.details}</td>
                  <td className="px-4 py-2">${row.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <Badge
                      variant={
                        row.status === "COMPLETED"
                          ? "default"
                          : row.status === "PENDING"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2">
                    {format(new Date(row.createdAt), "dd MMM yyyy")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
