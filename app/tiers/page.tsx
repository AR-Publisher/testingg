// File: /app/tiers/page.tsx

import React from "react";

export default function MembershipTiers() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900">Membership Tiers</h1>
      <p className="text-center text-gray-600 mt-2">Choose a support level that fits you.</p>
      <div className="mt-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bronze Tier */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold">Bronze Tier</h2>
          <p className="text-gray-600 mt-2">$3/month - Basic perks</p>
          <ul className="text-gray-500 text-sm mt-3 space-y-1">
            <li>✔ Access to exclusive posts</li>
            <li>✔ Community access</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Join Now
          </button>
        </div>

        {/* Silver Tier */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold">Silver Tier</h2>
          <p className="text-gray-600 mt-2">$10/month - Extra perks</p>
          <ul className="text-gray-500 text-sm mt-3 space-y-1">
            <li>✔ Everything in Bronze</li>
            <li>✔ Behind-the-scenes content</li>
            <li>✔ Early access to posts</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
            Join Now
          </button>
        </div>

        {/* Gold Tier */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold">Gold Tier</h2>
          <p className="text-gray-600 mt-2">$25/month - VIP perks</p>
          <ul className="text-gray-500 text-sm mt-3 space-y-1">
            <li>✔ Everything in Silver</li>
            <li>✔ 1-on-1 Q&A sessions</li>
            <li>✔ Exclusive merch discounts</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
