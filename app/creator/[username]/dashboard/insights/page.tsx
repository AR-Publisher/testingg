"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts"; // ✅ Import Fixed

const InsightsPage = () => {
  const params = useParams();
  const username = params?.username as string;
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/creator/${username}/analytics`);
        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [username]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Insights & Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Total Posts</h2>
            <p className="text-3xl">{analytics?.totalPosts || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Total Likes</h2>
            <p className="text-3xl">{analytics?.totalLikes || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Subscribers</h2>
            <p className="text-3xl">{analytics?.totalSubscribers || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold">Total Earnings</h2>
            <p className="text-3xl text-green-600">${analytics?.totalEarnings || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscriber Growth Chart */}
      <h2 className="text-2xl font-semibold mt-6">Subscriber Growth</h2>
      <LineChart width={500} height={300} data={analytics?.subscriberGrowth || []}>
        <XAxis dataKey="createdAt" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="_count.id" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default InsightsPage;
