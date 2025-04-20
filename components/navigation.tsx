"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const creators = [
  { title: "Podcasters", desc: "Get to know your listeners", href: "/creators/podcasters" },
  { title: "Video Creators", desc: "Turn your viewers into your people", href: "/creators/video-creators" },
  { title: "Musicians", desc: "From your mind to their ears", href: "/creators/musicians" },
  { title: "Artists", desc: "Earning made easy", href: "/creators/artists" },
  { title: "Game Devs", desc: "A safe way to get paid", href: "/creators/game-devs" },
];

const features = [
  { title: "Create on your terms", desc: "Total creative freedom", href: "/features/create" },
  { title: "Build real community", desc: "Engage with your audience", href: "/features/community" },
  { title: "Expand your reach", desc: "Grow beyond limits", href: "/features/expand" },
  { title: "Get business support", desc: "Tools to grow", href: "/features/support" },
  { title: "Earning made easy", desc: "Monetization simplified", href: "/features/earning" },
];

const pricing = [
  { title: "Pro Plan", desc: "Great for beginners", href: "/pricing/pro" },
  { title: "Premium Plan", desc: "More tools, more reach", href: "/pricing/premium" },
  { title: "Elite Plan", desc: "Maximize your earnings", href: "/pricing/elite" },
];

const resources = [
  { title: "Creator Hub", desc: "Tips and guides for creators", href: "/resources/hub" },
  { title: "Newsroom", desc: "Latest updates and stories", href: "/resources/news" },
  { title: "Help Center", desc: "Find answers to common questions", href: "contact" },
  { title: "Partners & Integrations", desc: "Tools to boost your workflow", href: "/resources/partners" },
  { title: "Mobile", desc: "Access Patrovaa on the go", href: "/resources/mobile" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navbar?.classList.add("bg-background/80", "backdrop-blur-sm", "shadow-md");
      } else {
        navbar?.classList.remove("bg-background/80", "backdrop-blur-sm", "shadow-md");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-bold text-2xl">
          Patrovaa
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavigationMenu>
            <NavigationMenuList>
              {[{ label: "For Creators", links: creators },
                { label: "Features", links: features },
                { label: "Pricing", links: pricing },
                { label: "Resources", links: resources }
              ].map((menu) => (
                <NavigationMenuItem key={menu.label}>
                  <NavigationMenuTrigger>{menu.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 w-[300px] md:w-[500px] md:grid-cols-2">
                      {menu.links.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link href={item.href} className="block p-3 rounded-md hover:bg-accent">
                              <div className="text-sm font-medium">{item.title}</div>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="relative hidden lg:flex">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Find a Creator"
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>

          {/* Login & Create on Patrovaa */}
          <div className="flex items-center gap-4">
            <Link href="auth/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="auth/signup">
              <Button className="bg-primary text-white">Create on Patrovaa</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 z-50">
            <div className="fixed top-0 left-0 w-4/5 h-full bg-white p-6 shadow-lg">
              <button className="absolute top-4 right-4" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>

              {/* Mobile Navigation */}
              <nav className="mt-10 space-y-4">
                {[
                  { label: "For Creators", links: creators },
                  { label: "Features", links: features },
                  { label: "Pricing", links: pricing },
                  { label: "Resources", links: resources },
                ].map((menu) => (
                  <div key={menu.label}>
                    <button
                      className="flex justify-between w-full text-lg font-medium"
                      onClick={() =>
                        setOpenDropdown(openDropdown === menu.label ? "" : menu.label)
                      }
                    >
                      {menu.label} <ChevronDown className="h-5 w-5" />
                    </button>
                    {openDropdown === menu.label && (
                      <ul className="ml-4 mt-2 space-y-2">
                        {menu.links.map((item) => (
                          <li key={item.title}>
                            <Link
                              href={item.href}
                              className="block text-sm text-gray-700"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="text-sm font-medium">{item.title}</div>
                              <p className="text-xs text-gray-500">{item.desc}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Login & Create Buttons */}
                <div className="mt-6 flex flex-col gap-4">
                  <Link href="auth/login">
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                  <Link href="auth/signup">
                    <Button className="w-full bg-primary text-white">Create on CreatorSpace</Button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
