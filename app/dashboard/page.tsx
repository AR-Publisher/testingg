"use client";

import { useState, useEffect } from "react";

interface Subscription {
  id: string;
  creator: {
    user: { name: string };
  };
}

interface Post {
  id: string;
  title: string;
  content: string;
  creator: {
    user: { name: string };
  };
  likes: number;
  comments: { id: string; text: string; user: { name: string } }[];
}

export default function SupporterDashboardPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});

  // Fetch Subscriptions & Posts
  useEffect(() => {
    async function fetchData() {
      try {
        const [subsRes, postsRes] = await Promise.all([
          fetch("/api/subscriptions"),
          fetch("/api/posts"),
        ]);

        if (subsRes.ok) setSubscriptions(await subsRes.json());
        if (postsRes.ok) setPosts(await postsRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Cancel Subscription
  const cancelSubscription = async (subscriptionId: string) => {
    try {
      const res = await fetch("/api/subscriptions/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId }),
      });

      if (res.ok) {
        setSubscriptions((prev) => prev.filter((sub) => sub.id !== subscriptionId));
      } else {
        console.error("Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  // Like Post
  const likePost = async (postId: string) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, { method: "POST" });

      if (res.ok) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Comment on Post
  const commentOnPost = async (postId: string) => {
    if (!newComments[postId]) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newComments[postId] }),
      });

      if (res.ok) {
        const newComment = await res.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
          )
        );
        setNewComments((prev) => ({ ...prev, [postId]: "" }));
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Supporter Dashboard</h2>

      {/* Subscriptions Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">Your Subscriptions</h3>
        {loading ? (
          <p>Loading...</p>
        ) : subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div key={sub.id} className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-lg">
              <p className="text-lg">{sub.creator.user.name}</p>
              <button
                onClick={() => cancelSubscription(sub.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">You have no active subscriptions.</p>
        )}
      </div>

      {/* Posts Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">Latest Posts from Subscribed Creators</h3>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
              <h4 className="text-xl font-bold">{post.title}</h4>
              <p className="text-gray-700">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">By {post.creator.user.name}</p>

              {/* Like Button */}
              <div className="flex items-center mt-2">
                <button
                  onClick={() => likePost(post.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  ❤️ Like ({post.likes})
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-4">
                <h5 className="text-lg font-semibold">Comments</h5>
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-100 p-2 rounded-lg mt-2">
                      <p className="text-sm">
                        <strong>{comment.user.name}:</strong> {comment.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No comments yet.</p>
                )}

                {/* Add Comment Input */}
                <div className="mt-2 flex">
                  <input
                    type="text"
                    value={newComments[post.id] || ""}
                    onChange={(e) => setNewComments((prev) => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Add a comment..."
                    className="border p-2 flex-grow rounded-l-lg"
                  />
                  <button
                    onClick={() => commentOnPost(post.id)}
                    className="bg-green-500 text-white px-4 rounded-r-lg hover:bg-green-700 transition"
                  >
                    💬
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}
