"use client";

import { useState } from "react";
import { Bell, User, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Utility for class merging

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Page title mapping
  const pageTitles: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/dashboard/subscriptions": "Subscriptions",
    "/dashboard/notifications": "Notifications",
    "/dashboard/settings": "Settings",
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Page Title */}
      <h1 className="text-xl font-semibold">{pageTitles[pathname] || "Dashboard"}</h1>

      {/* Right Section: Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications Icon */}
        <Link href="/dashboard/notifications" className="relative">
          <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900 transition" />
          {/* Notification Badge (example - later fetch actual count) */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-md hover:bg-gray-300 transition"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2">
              <Link href="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </Link>
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                <LogOut className="inline w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
