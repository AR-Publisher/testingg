"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Update Profile
  const updateProfile = async () => {
    try {
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Change Password
  const changePassword = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        alert("Password changed successfully!");
        setPassword("");
        setConfirmPassword("");
      } else {
        console.error("Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  // Delete Account
  const deleteAccount = async () => {
    const confirmDelete = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/user/delete", { method: "DELETE" });

      if (response.ok) {
        alert("Account deleted successfully.");
        // Redirect or log out the user
      } else {
        console.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Settings</h2>

      {/* Profile Update */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Update Profile</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button onClick={updateProfile} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
          Update
        </button>
      </div>

      {/* Change Password */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button onClick={changePassword} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Change Password
        </button>
      </div>

      {/* Delete Account */}
      <div>
        <h3 className="text-2xl font-semibold mb-2 text-red-500">Delete Account</h3>
        <button onClick={deleteAccount} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          Delete Account
        </button>
      </div>
    </div>
  );
}
