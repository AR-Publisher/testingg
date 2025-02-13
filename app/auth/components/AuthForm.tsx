"use client";

import { useState } from "react";

interface AuthFormProps {
  type: "login" | "signup";
  onSubmit: (formData: { email: string; password: string }) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
      <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded">
        {type === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}
