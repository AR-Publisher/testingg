// app/admin/supporters/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";

export default async function AdminSupportersPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/auth/admin-login");
  }

  const supporters = await prisma.user.findMany({
    where: { role: "SUPPORTER" },
    include: {
      supporterProfile: true,
      subscriptions: true,
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Supporters</h1>
      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Interests</th>
              <th className="px-4 py-3">Subscribed To</th>
              <th className="px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 text-white">
            {supporters.map((s) => (
              <tr key={s.id} className="border-t border-gray-700">
                <td className="px-4 py-3">{s.name}</td>
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3">{s.supporterProfile?.interests || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {s.subscriptions.map((sub) => (
                      <Badge key={sub.id} className="text-xs">
                        {sub.creatorId.slice(0, 6)}...
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {supporters.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-6">
                  No supporters found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
