"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useEffect } from "react";

const creators = [
  {
    title: "Podcasters",
    description: "Get to know your listeners",
    href: "/creators/podcasters",
    items: [
      "Get to know your listeners",
      "Cut through the noise",
      "More ways to get paid",
      "Other podcasters on CreatorSpace",
    ],
  },
  {
    title: "Video Creators",
    description: "Turn your viewers into your people",
    href: "/creators/video-creators",
    items: [
      "Turn your viewers into your people",
      "Reach every fan, every time",
      "More ways to get paid",
      "Other video creators on CreatorSpace",
    ],
  },
  {
    title: "Musicians",
    description: "From your mind to their ears",
    href: "/creators/musicians",
    items: [
      "From your mind to their ears",
      "Share more than music",
      "More ways to get paid",
      "Create musicians on CreatorSpace",
    ],
  },
  {
    title: "Artists",
    description: "Earning made easy",
    href: "/creators/artists",
    items: [
      "Earning made easy",
      "Create what inspires you",
      "Build community around your art",
      "Other artists on CreatorSpace",
    ],
  },
  {
    title: "Game Devs",
    description: "A safe way to get paid",
    href: "/creators/game-devs",
    items: [
      "A safe way to get paid",
      "Selling made simple",
      "Where real community thrives",
      "Other game devs on CreatorSpace",
    ],
  },
];

const features = [
  {
    title: "Create on your terms",
    href: "/features/create",
    items: ["Getting started on CreatorSpace", "Make it your own", "Reach every fan, every time", "Showcase your work"],
  },
  {
    title: "Build real community",
    href: "/features/community",
    items: ["Every post, every time", "More ways to stay close", "Get to know your fans"],
  },
  {
    title: "Expand your reach",
    href: "/features/expand",
    items: ["Bring in new fans", "Unlock growth", "App integrations"],
  },
  {
    title: "Get business support",
    href: "/features/support",
    items: ["Help when you need it", "Policies to protect you", "Payments powered by CreatorSpace"],
  },
  {
    title: "Earning made easy",
    href: "/features/earning",
    items: ["Run a membership", "Sell digital products"],
  },
];

const resources = [
  {
    title: "Creator Hub",
    href: "/resources/hub",
    items: ["Resources to get started", "Grow your membership", "Connect with creators"],
  },
  {
    title: "Newsroom",
    href: "/resources/news",
    items: ["CreatorSpace HQ", "Read latest policy updates", "Explore product updates"],
  },
  {
    title: "Help Center",
    href: "/resources/help",
    items: ["Getting started", "CreatorSpace payments", "Member management", "Content & engagement"],
  },
  {
    title: "Partners & integrations",
    href: "/resources/partners",
    items: ["Featured integrations", "Full app directory"],
  },
  {
    title: "Mobile",
    href: "/resources/mobile",
    items: ["Download the app"],
  },
];

export default function Navigation() {
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
      <div className="container flex h-16 items-center justify-between bg-transparent">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="font-bold text-2xl">
            CreatorSpace
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>For Creators</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {creators.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {features.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <ul className="mt-2 space-y-1">
                              {item.items.map((subItem) => (
                                <li key={subItem} className="text-sm text-muted-foreground">
                                  {subItem}
                                </li>
                              ))}
                            </ul>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px]">
                    <div className="mb-3 text-lg font-medium">Starting a CreatorSpace is free</div>
                    <ul className="grid gap-3 md:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pricing/corepricing"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Powerful core features</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Everything you need to start earning
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/pricing/propricing"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Pro features</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Advanced tools for growing creators
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {resources.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <ul className="mt-2 space-y-1">
                              {item.items.map((subItem) => (
                                <li key={subItem} className="text-sm text-muted-foreground">
                                  {subItem}
                                </li>
                              ))}
                            </ul>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Find a Creator" className="w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Button variant="outline" asChild>
            <Link href="auth/login">Log in</Link>
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90" asChild>
            <Link href="auth/signup">Create on CreatorSpace</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}