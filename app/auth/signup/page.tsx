"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "fan", // Default role
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/auth/login");
    } else {
      const { message } = await res.json();
      setError(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded"
            onChange={handleChange}
          />
          <select
            name="role"
            className="w-full p-3 border rounded"
            onChange={handleChange}
          >
            <option value="fan">I'm a Fan</option>
            <option value="creator">I'm a Creator</option>
          </select>
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded">
            Create Account
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account? <Link href="/auth/login" className="text-blue-600">Log in</Link>
        </p>
      </div>
    </div>
  );
}
