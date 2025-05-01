// app/admin/creators/page.tsx
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import CreatorsTable from "./_components/CreatorsTable";

export default async function AdminCreatorsPage() {
  const cookieStore = cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    redirect("/auth/admin-login");
  }

  const host = headers().get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/admin/creators`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch creators");
  }

  const creators = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Creators</h1>
      <CreatorsTable creators={creators} />
    </div>
  );
}
