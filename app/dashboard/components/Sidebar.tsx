"use client";

import { useState } from "react";
import { Home, Bell, CreditCard, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Utility for class merging

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Navigation links
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Subscriptions", href: "/dashboard/subscriptions", icon: CreditCard },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-3 absolute top-4 left-4 z-50 bg-gray-800 text-white rounded-full"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={cn(
          "bg-gray-900 text-white h-screen w-64 p-5 fixed md:relative transition-all duration-300",
          isOpen ? "left-0" : "-left-64",
          "md:left-0"
        )}
      >
        <h2 className="text-xl font-bold mb-6">Supporter Dashboard</h2>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          {navItems.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md transition-colors",
                pathname === href ? "bg-gray-700" : "hover:bg-gray-800"
              )}
            >
              <Icon size={20} />
              {name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
