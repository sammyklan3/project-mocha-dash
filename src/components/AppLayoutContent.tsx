"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import useAuth from "@/hooks/useAuth"; // Assuming this is correct path to your useAuth hook

interface AppLayoutContentProps {
  children: React.ReactNode;
}

const AppLayoutContent: React.FC<AppLayoutContentProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth(); // Now useAuth is called within AuthProvider's scope!

  useEffect(() => {
    // If not authenticated and not currently on the authentication page, redirect to auth.
    if (!isAuthenticated && pathname !== "/auth") {
      router.push("/auth");
    }
  }, [isAuthenticated, pathname, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth"); // Redirect to auth page after logout
  };

  // Determine the active page for the sidebar highlighting
  const activePage = pathname === "/" ? "dashboard" : pathname.split("/")[1];

  // If the current path is the authentication page, don't render the sidebar/main layout
  if (pathname === "/auth") {
    // This part should technically not be reached if the redirect above works,
    // but it's a good fallback to prevent rendering the sidebar on the auth page.
    return <>{children}</>;
  }

  // Render the full app layout (with sidebar) for authenticated routes
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 relative">
      {/* Sidebar Component */}
      <Sidebar
        // activePage is now inferred from pathname within Sidebar itself using usePathname
        // No need to pass setActivePage as Link components handle navigation directly
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Hamburger menu for mobile view */}
      <button
        className="absolute top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6 text-amber-800" />
      </button>

      {/* Main content area where individual page components will be rendered */}
      <main className="flex-1 md:ml-60 p-4 md:p-8 w-full">{children}</main>
    </div>
  );
};

export default AppLayoutContent;
