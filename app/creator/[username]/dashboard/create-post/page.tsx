"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    const fileType = file.type;
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileType }),
    });

    const { url, fileName } = await res.json();
    if (!url) {
      console.error("Failed to get upload URL");
      setUploading(false);
      return;
    }

    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": fileType },
      body: file,
    });

    setFileUrl(`https://your-bucket.s3.amazonaws.com/${fileName}`);
    setUploading(false);
  };

  const handleSubmit = async () => {
    const content = editor?.getHTML();
    
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    const res = await fetch("/api/creator/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        visibility,
        fileUrl,
      }),
    });

    if (res.ok) {
      router.push(`/creator/dashboard/library`);
    } else {
      alert("Failed to create post!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Create Post</h1>
      <input
        type="text"
        className="w-full border p-2 mt-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select className="w-full border p-2 mt-2" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
        <option value="PUBLIC">Public</option>
        <option value="SUPPORTERS_ONLY">Supporters Only</option>
        <option value="PRIVATE">Only Me</option>
      </select>

      <EditorContent editor={editor} className="border p-2 mt-4 min-h-[200px]" />

      <input type="file" className="mt-4" onChange={handleFileChange} />

      <Button onClick={handleFileUpload} disabled={!file || uploading} className="mt-4">
        {uploading ? "Uploading..." : "Upload Media"}
      </Button>

      {fileUrl && <p className="text-green-500 mt-2">File uploaded successfully!</p>}

      <Button onClick={handleSubmit} className="mt-4 w-full bg-green-500 text-white">
        Publish Post
      </Button>
    </div>
  );
};

export default CreatePost;
