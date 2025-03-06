"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, EyeOff } from "lucide-react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  type: "PUBLIC" | "SUPPORTERS_ONLY" | "PRIVATE";
  createdAt: string;
  fileUrl?: string; // ✅ Add this to store image/video URLs
}

const LibraryPage = () => {
  const params = useParams();
  const username = params?.username as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/creator/${username}/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [username]);

  const handleDelete = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/api/creator/${username}/posts/${postId}`);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleVisibilityToggle = async (postId: string, currentType: string) => {
    const newType = currentType === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    try {
      await axios.patch(`/api/creator/${username}/posts/${postId}`, { type: newType });
      setPosts(posts.map(post => post.id === postId ? { ...post, type: newType } : post));
    } catch (error) {
      console.error("Error updating visibility", error);
    }
  };

  const filteredPosts = filter === "ALL" ? posts : posts.filter(post => post.type === filter);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Library</h1>
      <div className="flex justify-between items-center mb-4">
        <select className="border p-2 rounded-md" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All</option>
          <option value="PUBLIC">Public</option>
          <option value="SUPPORTERS_ONLY">Supporters Only</option>
          <option value="PRIVATE">Private</option>
        </select>
        <Button asChild>
          <Link href={`/creator/${username}/dashboard/create-post`}>+ Create New Post</Link>
        </Button>
      </div>
      {loading ? (
        <p>Loading posts...</p>
      ) : filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Visibility</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Media</th> {/* ✅ Added Media Column */}
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id} className="text-center">
                <td className="border p-2">{post.title}</td>
                <td className="border p-2">{post.type}</td>
                <td className="border p-2">{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="border p-2">
                  {post.fileUrl ? (
                    post.fileUrl.endsWith(".mp4") ? (
                      <video width="100" controls>
                        <source src={post.fileUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={post.fileUrl} alt="Uploaded Media" width="100" className="rounded-lg" />
                    )
                  ) : (
                    "No media"
                  )}
                </td>
                <td className="border p-2 flex justify-center gap-3">
                  <Link href={`/creator/${username}/dashboard/edit-post/${post.id}`}>
                    <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                  </Link>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
                    <Trash className="w-4 h-4 text-red-500" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleVisibilityToggle(post.id, post.type)}>
                    {post.type === "PUBLIC" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LibraryPage;
