"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side environment variable
    const adminKey = process.env.NEXT_PUBLIC_ADMIN_MASTER_KEY;

    if (key === adminKey) {
      // ✅ Set cookie directly
      document.cookie = "admin_auth=true; path=/";
      router.push("/admin/dashboard");
    } else {
      setError("Invalid admin key");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Admin Access</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="password"
          placeholder="Enter Admin Master Key"
          className="w-full p-3 border rounded mb-4"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
