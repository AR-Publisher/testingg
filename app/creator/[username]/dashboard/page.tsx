"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatorDashboard = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const params = useParams();

  const sessionUsername = session?.user?.name || "";
  const paramUsername = Array.isArray(params?.username) ? params.username[0] : params?.username;
  const username = sessionUsername || (paramUsername ? decodeURIComponent(paramUsername) : "Unknown Creator");
  const profileImage = session?.user?.image || "/default-avatar.png";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
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
    { name: "Promotions", path: `/creator/${username}/dashboard/promotions` },
    { name: "Community", path: `/creator/${username}/dashboard/community` },
    { name: "Notifications", path: `/creator/${username}/dashboard/notifications` },
    { name: "Settings", path: `/creator/${username}/dashboard/settings` },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#222831] via-[#393E46] to-[#00ADB5] animate-gradient-blur"></div>

      {/* Content Wrapper */}
      <div className="relative flex min-h-screen bg-black/70 backdrop-blur-lg">
        {/* Sidebar */}
        <div className={`fixed inset-0 bg-[#222831] text-white shadow-lg w-64 p-4 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:relative md:translate-x-0 md:block`}>
          <button className="absolute top-4 right-4 md:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-6 h-6 text-white" />
          </button>
          <nav className="space-y-2 mt-8">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="block px-4 py-2 rounded-md text-white transition-all hover:bg-[#00ADB5] hover:text-black hover:shadow-lg"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-[#EEEEEE]">Welcome, {username}!</h1>
            <button className="md:hidden bg-[#00ADB5] p-2 rounded-md" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="mt-6 flex items-center gap-4 bg-[#393E46] p-4 rounded-lg shadow-md transition-all hover:shadow-2xl hover:scale-105">
            <img src={profileImage} alt="Profile Picture" className="w-16 h-16 rounded-full border border-gray-300" />
            <div>
              <h2 className="text-xl font-bold text-[#EEEEEE]">{username}</h2>
              <Link href={`/creator/${username}`} className="text-[#00ADB5] hover:underline">
                creatorspace.com/{username}
              </Link>
            </div>
            <Button className="ml-auto bg-[#00ADB5] text-black px-4 py-2 rounded-md transition-transform transform hover:scale-110 hover:bg-[#007F8B]">
              Create
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[{ title: "Total Earnings", value: "$2,540" }, { title: "Total Supporters", value: "128" }, { title: "New Subscribers", value: "12" }].map(
              (stat, index) => (
                <div key={index} className="bg-[#393E46] p-6 rounded-lg shadow-md text-center transition-all hover:shadow-xl hover:scale-105 hover:border-t-4 hover:border-[#00ADB5]">
                  <h2 className="text-xl font-semibold text-[#EEEEEE]">{stat.title}</h2>
                  <p className="text-3xl font-bold mt-2 text-[#00ADB5]">{stat.value}</p>
                </div>
              )
            )}
          </div>

          {/* Recent Posts */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4 text-[#EEEEEE]">Your Recent Posts</h2>
            <div className="bg-[#393E46] p-6 rounded-lg shadow-md text-center transition-all hover:shadow-xl">
              <p className="text-[#EEEEEE]">No posts yet. Start creating content!</p>
            </div>
          </div>

          {/* Create Post Button */}
          <div className="mt-6 text-center">
            <Button className="bg-[#00ADB5] text-black px-6 py-3 rounded-lg text-lg font-semibold transition-transform transform hover:scale-110 hover:bg-[#007F8B]">
              + Create New Post
            </Button>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes gradientBlur {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-blur {
          background-size: 400% 400%;
          animation: gradientBlur 10s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default CreatorDashboard;
