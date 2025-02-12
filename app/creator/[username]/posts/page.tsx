
"use client";

import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PostCreation() {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handlePublish = () => {
    console.log("Publishing post:", content);
    // Handle post submission logic here (API call, etc.)
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-900">Create a Post</h1>
      <p className="text-center text-gray-600 mt-2">Share exclusive content with your supporters.</p>
      <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <Card>
          <CardContent>
            <EditorContent editor={editor} className="border p-2 rounded-md min-h-[200px]" />
          </CardContent>
        </Card>
        <Button className="mt-4 w-full bg-green-500 text-white rounded-md hover:bg-green-600" onClick={handlePublish}>
          Publish
        </Button>
        
        {/* Like Button */}
        <div className="mt-4 flex items-center gap-2">
          <Button onClick={() => setLikes(likes + 1)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            👍 {likes}
          </Button>
        </div>

        {/* Comment Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Comments</h2>
          <div className="flex gap-2 mt-2">
            <input
              type="text"
              className="flex-1 border p-2 rounded-md"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment} className="bg-gray-800 text-white px-4 py-2 rounded-md">
              Comment
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            {comments.map((comment, index) => (
              <div key={index} className="border p-2 rounded-md bg-gray-50">
                {comment}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
