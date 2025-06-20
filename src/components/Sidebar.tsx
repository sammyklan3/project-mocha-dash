// components/Sidebar.tsx
"use client"; // This component uses client-side hooks like useRouter and usePathname

import React from "react";
import Link from "next/link"; // Import Link for client-side navigation
import { usePathname } from "next/navigation"; // Import usePathname to get the current route

import {
  LayoutDashboard,
  BarChart3,
  Coins,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Coffee,
  LogOut,
  X,
} from "lucide-react";

interface SidebarProps {
  // activePage: string; // No longer strictly needed if using usePathname for active state
  // setActivePage: (page: string) => void; // No longer needed, Link components handle navigation
  onLogout: () => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  // activePage, // Remove from destructuring
  // setActivePage, // Remove from destructuring
  onLogout,
  isOpen,
  toggleSidebar,
}) => {
  const pathname = usePathname(); // Get the current path for active state

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/" }, // Link to root for dashboard
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    { id: "mints", label: "NFT Mints", icon: Coins, href: "/mints" },
    { id: "products", label: "Products", icon: Package, href: "/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, href: "/orders" },
    { id: "customers", label: "Customers", icon: Users, href: "/customers" },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-amber-900 to-amber-800 text-white shadow-2xl z-50 transition-transform duration-300 transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={toggleSidebar}>
          <X className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Header */}
      <div className="p-6 border-b border-amber-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-600 rounded-lg">
            <Coffee className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Project Mocha</h1>
            <p className="text-amber-200 text-sm">Web3 Coffee Platform</p>
          </div>
        </div>
      </div>

      {/* Scrollable nav area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <nav className="mt-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              (item.id === "dashboard" && pathname === "/") ||
              (item.id !== "dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={`w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 ${
                  isActive
                    ? "bg-amber-700 border-r-4 border-amber-400 text-white"
                    : "text-amber-100 hover:bg-amber-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => {
              onLogout();
              if (window.innerWidth < 768) toggleSidebar();
            }}
            className="w-full flex items-center space-x-3 px-6 py-4 text-left transition-all duration-200 text-amber-100 hover:bg-amber-800 hover:text-white mt-4"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Fixed Footer */}
      <div className="p-6 border-t border-amber-700">
        <div className="bg-amber-800 rounded-lg p-4 border border-amber-700">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-amber-200">Scroll Network</span>
          </div>
          <p className="text-xs text-amber-300">Connected to Web3</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
