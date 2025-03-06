"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import Loader from "@/components/ui/loader"; // ✅ Correct default import

interface Subscriber {
  id: string;
  username: string;
  email: string;
  joinedAt: string;
}

const AudiencePage = () => {
  const params = useParams();
  const username = params?.username as string;
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axios.get(`/api/creator/${username}/subscribers`);
        setSubscribers(response.data);
      } catch (error) {
        console.error("Error fetching subscribers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, [username]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Subscribers List</h1>

      {loading ? (
        <Loader /> // A simple loader component
      ) : subscribers.length === 0 ? (
        <p className="text-gray-500">No subscribers yet.</p>
      ) : (
        <Table className="w-full border-collapse border border-gray-200">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="border p-2">Username</TableCell>
              <TableCell className="border p-2">Email</TableCell>
              <TableCell className="border p-2">Joined At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id} className="text-center">
                <TableCell className="border p-2">{subscriber.username}</TableCell>
                <TableCell className="border p-2">{subscriber.email}</TableCell>
                <TableCell className="border p-2">
                  {new Date(subscriber.joinedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AudiencePage;
