// app/admin/earnings/_components/EarningsTable.tsx
"use client";

import { Payout } from "@prisma/client";

export default function EarningsTable({ data }: { data: (Payout & { creator: { name: string, email: string } })[] }) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="p-3">Creator</th>
            <th className="p-3">Email</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-white divide-y divide-gray-700">
          {data.map((earning) => (
            <tr key={earning.id}>
              <td className="p-3">{earning.creator.name}</td>
              <td className="p-3">{earning.creator.email}</td>
              <td className="p-3">${earning.amount.toFixed(2)}</td>
              <td className="p-3">{earning.status}</td>
              <td className="p-3">{new Date(earning.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
