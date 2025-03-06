"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SupporterDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Fetch user data from API or session (replace with actual logic)
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me"); // Adjust this API route as needed
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center">Welcome, {user?.name || "Supporter"}!</h1>
        <p className="text-center text-gray-600 mt-2">Explore and support your favorite creators.</p>

        <div className="mt-6 space-y-4">
          <button className="w-full bg-blue-600 text-white py-3 rounded-md">
            Browse Creators
          </button>
          <button className="w-full bg-green-600 text-white py-3 rounded-md">
            View Subscriptions
          </button>
        </div>
      </div>
    </div>
  );
}
