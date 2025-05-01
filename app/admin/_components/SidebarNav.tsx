"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Creators", href: "/admin/creators" },
  { name: "Supporters", href: "/admin/supporters" },
  { name: "Earnings", href: "/admin/earnings" },
  { name: "Withdrawals", href: "/admin/withdrawals" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-black border-r border-gray-700 p-4 space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Admin Panel</h2>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded hover:bg-gray-800 ${
              pathname.startsWith(item.href) ? "bg-gray-800 font-semibold" : "text-gray-300"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
