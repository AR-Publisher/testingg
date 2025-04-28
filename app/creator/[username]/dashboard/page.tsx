"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Menu, X, Upload, Pencil, PlusCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatorDashboard = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>(""); // ✅ State for uploaded cover
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const sessionUsername = session?.user?.name || "";
  const paramUsername = Array.isArray(params?.username) ? params.username[0] : params?.username;
  const username = sessionUsername || (paramUsername ? decodeURIComponent(paramUsername) : "Unknown Creator");
  const profileImage = session?.user?.image || "/default-avatar.png";

  // ✅ Load saved cover image from localStorage when page loads
  useEffect(() => {
    const savedCover = localStorage.getItem("coverImageUrl");
    if (savedCover) {
      setCoverImageUrl(savedCover);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    { name: "My Page", path: `/creator/${username}/dashboard` },
    { name: "Library", path: `/creator/${username}/dashboard/library` },
    { name: "Audience", path: `/creator/${username}/dashboard/audience` },
    { name: "Insights", path: `/creator/${username}/dashboard/insights` },
    { name: "Payouts", path: `/creator/${username}/dashboard/payouts` },
    { name: "Tiers", path: `/creator/${username}/dashboard/tiers` },
    { name: "Promotions", path: `/creator/${username}/dashboard/promotions` },
    { name: "Community", path: `/creator/${username}/dashboard/community` },
    { name: "Notifications", path: `/creator/${username}/dashboard/notifications` },
    { name: "Settings", path: `/creator/${username}/dashboard/settings` },
  ];

  const handleCoverUploadClick = () => {
    coverInputRef.current?.click();
  };

  // ✅ Upload Cover, save in localStorage
  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("coverImage", file);

      try {
        const res = await fetch("/api/cover-upload", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          console.log("Cover uploaded:", data.fileUrl);
          setCoverImageUrl(data.fileUrl);
          localStorage.setItem("coverImageUrl", data.fileUrl); // ✅ Save in browser
        } else {
          console.error("Failed to upload cover image");
        }
      } catch (error) {
        console.error("Error uploading cover image:", error);
      }
    }
  };

  const handleEditProfile = () => {
    router.push(`/creator/${username}/dashboard/settings`);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="bg-[#1e1e1e] px-6 py-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="text-white" />
          </Button>
          <h1 className="text-xl font-semibold">Creator Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href={`/creator/${username}/dashboard/create-post`}>
            <Button className="bg-[#00ADB5] text-black font-semibold px-4 py-2 hover:bg-[#009CA3]">
              + Create New Post
            </Button>
          </Link>
          <Button
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2" /> Logout
          </Button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:relative z-40 top-0 left-0 h-full w-64 bg-[#1e1e1e] border-r border-gray-700 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out lg:translate-x-0`}
        >
          <div className="flex justify-end p-4 lg:hidden">
            <Button variant="ghost" onClick={() => setSidebarOpen(false)}>
              <X />
            </Button>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="px-4 py-2 rounded hover:bg-[#00ADB5] hover:text-black transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Banner + Profile */}
          <div
            className="relative h-56 rounded-xl mb-6"
            style={{
              backgroundImage: coverImageUrl
                ? `url(${coverImageUrl})`
                : "linear-gradient(to right, #f97316, #facc15)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={coverInputRef}
              onChange={handleCoverChange}
            />
            <Button
              className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70"
              onClick={handleCoverUploadClick}
            >
              <Upload className="mr-2" /> Set Cover
            </Button>
            <div className="absolute bottom-[-40px] left-8 flex items-center gap-4">
              <img
                src={profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-[#1e1e1e]"
              />
              <div>
                <h2 className="text-2xl font-bold text-white">{username}</h2>
                <Link
                  href={`mailto:${session?.user?.email}`}
                  className="text-sm text-white/80 hover:underline"
                >
                  {session?.user?.email || "username@example.com"}
                </Link>
              </div>
            </div>
          </div>

          {/* Edit Profile */}
          <div className="mt-14 mb-6 text-right">
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
              onClick={handleEditProfile}
            >
              <Pencil className="mr-2" /> Edit Profile
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[{ title: "Total Earnings", value: "$2,540" }, { title: "Total Supporters", value: "128" }, { title: "New Subscribers", value: "12" }].map(
              (stat, index) => (
                <div
                  key={index}
                  className="bg-[#1e1e1e] p-6 rounded-lg shadow hover:shadow-xl hover:border-t-4 hover:border-[#00ADB5] transition"
                >
                  <h3 className="text-lg font-medium text-white/80">{stat.title}</h3>
                  <p className="text-3xl font-bold text-[#00ADB5] mt-2">{stat.value}</p>
                </div>
              )
            )}
          </div>

          {/* Recent Posts */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Your Recent Posts</h2>
            <div className="bg-[#1e1e1e] p-6 rounded-lg text-center text-white/80">
              No posts yet. Start creating content!
            </div>
          </div>

          {/* Create Post Shortcut */}
          <div className="mt-6 text-center">
            <Link href={`/creator/${username}/dashboard/create-post`}>
              <Button className="bg-[#00ADB5] text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#007F8B]">
                <PlusCircle className="mr-2" /> Create Your First Post
              </Button>
            </Link>
          </div>

          {/* Render children */}
          <div className="mt-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CreatorDashboard;
