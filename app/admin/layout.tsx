// app/admin/layout.tsx
import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Creators", href: "/admin/creators" },
    { name: "Supporters", href: "/admin/supporters" },
    { name: "Earnings", href: "/admin/earnings" },
    { name: "Withdrawals", href: "/admin/withdrawals" },
    { name: "Posts", href: "/admin/posts" },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block hover:text-[#00ADB5]">
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100 text-black">{children}</main>
    </div>
  );
}
