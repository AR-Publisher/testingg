"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "CREATOR",
    membershipPlan: "PRO", // Default plan
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    console.log("Sending data:", formData); // Debugging log

    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    console.log("Response status:", res.status); // Debugging log
    if (res.ok) {
      router.push("/auth/login");
    } else {
      const { message } = await res.json();
      setError(message);
      console.log("Error:", message); // Debugging log
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          
          {/* Role Selection */}
          <select
            name="role"
            value={formData.role}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="SUPPORTER">I'm a Fan</option>
            <option value="CREATOR">I'm a Creator</option>
          </select>

          {/* Membership Plan Selection (Visible Only for Creators) */}
          {formData.role === "CREATOR" && (
            <select
              name="membershipPlan"
              value={formData.membershipPlan}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
            >
              <option value="PRO">Pro (5% Revenue Cut)</option>
              <option value="PREMIUM">Premium (10% Revenue Cut)</option>
              <option value="ELITE">Elite (15% Revenue Cut)</option>
            </select>
          )}

          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
