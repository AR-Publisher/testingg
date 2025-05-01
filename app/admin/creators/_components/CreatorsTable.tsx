"use client";

export default function CreatorsTable({ creators }: { creators: any[] }) {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="min-w-full bg-white text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Joined</th>
            <th className="px-4 py-2">Earnings</th>
            <th className="px-4 py-2">Subscribers</th>
            <th className="px-4 py-2">Posts</th>
          </tr>
        </thead>
        <tbody>
          {creators.map((creator) => (
            <tr key={creator.id} className="border-t">
              <td className="px-4 py-2">{creator.name}</td>
              <td className="px-4 py-2">{creator.email}</td>
              <td className="px-4 py-2">
                {new Date(creator.joinedAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">${creator.totalEarnings.toFixed(2)}</td>
              <td className="px-4 py-2">{creator.totalSubscribers}</td>
              <td className="px-4 py-2">{creator.totalPosts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
