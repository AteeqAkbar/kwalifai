"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/lib/api";

export default function DashboardHeader() {
  const pathname = usePathname();
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState(null);
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  async function loadProfile() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAPI("/api/users/me", { getToken });
      setUser(data || null);
    } catch (err) {
      setError(err?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation =
    user?.userType == "both" || user?.userType == "employer"
      ? [
          { name: "Profile", href: "/dashboard/profile", icon: "👤" },
          { name: "My Jobs", href: "/dashboard/jobs", icon: "💼" },
          { name: "Create Job", href: "/dashboard/jobs/create", icon: "✨" },
        ]
      : [{ name: "Profile", href: "/dashboard/profile", icon: "👤" }];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 group">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div> */}
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.name}
                  {isActive(item.href) && (
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full ml-1" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-5 h-5 flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-gray-600 rounded transform transition-all duration-200 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gray-600 rounded transition-all duration-200 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-gray-600 rounded transform transition-all duration-200 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
            {/* 
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 active:scale-95">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut> */}

            <SignedIn>
              <div className="flex items-center gap-3">
                <Link
                  href="/jobs"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Browse Jobs
                </Link>
                {/* <div className="relative">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox:
                          "w-9 h-9 ring-2 ring-blue-100 hover:ring-blue-200 transition-all duration-200",
                      },
                    }}
                  />
                </div> */}
              </div>
            </SignedIn>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-blue-50 text-blue-700 border border-blue-100"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.name}
                  {isActive(item.href) && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
                  )}
                </Link>
              ))}
              {/* <SignedIn> */}
              <Link
                href="/jobs"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">🔍</span>
                Browse Jobs
              </Link>
              {/* </SignedIn> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
