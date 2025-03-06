"use client";

import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Payment settings
  const [withdrawMethod, setWithdrawMethod] = useState("stripe");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [bankDetails, setBankDetails] = useState({ accountNumber: "", routingNumber: "", bankName: "" });

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const updateProfile = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/creator/${session?.user?.name}/settings`, { name, bio, profileImage });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/creator/${session?.user?.name}/settings/password`, { password });
      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

      <Tabs defaultValue="profile">
        <TabsList className="flex justify-between bg-gray-100 p-2 rounded-lg">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="mt-2" />
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="mt-2" />
            <Input type="text" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="Profile Image URL" className="mt-2" />
            <Button onClick={updateProfile} disabled={loading} className="mt-4 w-full">
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" className="mt-2" />
            <Button onClick={updatePassword} disabled={loading} className="mt-4 w-full">
              Update Password
            </Button>
            <Button variant="destructive" className="mt-4 w-full">
              Delete Account
            </Button>
          </div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Payment Settings</h2>
            <label className="block mt-2">Select Withdrawal Method</label>
            <select
              value={withdrawMethod}
              onChange={(e) => setWithdrawMethod(e.target.value)}
              className="w-full p-2 border rounded-md mt-1"
            >
              <option value="stripe">Stripe</option>
              <option value="paypal">PayPal</option>
              <option value="bank">Bank Transfer</option>
            </select>

            {/* PayPal Email Input */}
            {withdrawMethod === "paypal" && (
              <Input
                type="email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="Enter your PayPal email"
                className="mt-2"
              />
            )}

            {/* Bank Transfer Inputs */}
            {withdrawMethod === "bank" && (
              <div className="mt-2">
                <Input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  placeholder="Account Number"
                  className="mt-2"
                />
                <Input
                  type="text"
                  value={bankDetails.routingNumber}
                  onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                  placeholder="Routing Number"
                  className="mt-2"
                />
                <Input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  placeholder="Bank Name"
                  className="mt-2"
                />
              </div>
            )}

            <Button className="mt-4 w-full">Save Payment Settings</Button>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Notification Preferences</h2>
            <div className="flex items-center justify-between mt-4">
              <label>Email Notifications</label>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between mt-4">
              <label>SMS Notifications</label>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>
            <Button className="mt-4 w-full">Save Preferences</Button>
          </div>
    
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
