"use client";

import React, { useState } from "react";

const creators = [
  { id: 1, name: "Sarah Chen", category: "Art", tier: "$5/month", image: "/creator1.jpg" },
  { id: 2, name: "Marcus Rodriguez", category: "Music", tier: "$10/month", image: "/creator2.jpg" },
  { id: 3, name: "Emma Thompson", category: "Writing", tier: "$8/month", image: "/creator3.jpg" },
  { id: 4, name: "David Kim", category: "Photography", tier: "$7/month", image: "/creator4.jpg" },
];

export default function ExploreCreators() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCreators = creators.filter((creator) =>
    (filter === "All" || creator.category === filter) &&
    creator.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900">Explore Creators</h1>
      <p className="text-center text-gray-600 mt-2">Discover and support amazing creators.</p>

      <div className="max-w-4xl mx-auto mt-6 flex space-x-4">
        <input
          type="text"
          placeholder="Search creators..."
          className="w-full border p-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Art</option>
          <option>Music</option>
          <option>Writing</option>
          <option>Photography</option>
        </select>
      </div>

      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <div key={creator.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={creator.image} alt={creator.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{creator.name}</h2>
            <p className="text-gray-600">{creator.category}</p>
            <p className="text-gray-700 font-bold mt-1">{creator.tier}</p>
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
