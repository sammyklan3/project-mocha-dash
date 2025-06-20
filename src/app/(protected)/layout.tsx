"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import AppLayoutContent from "@/components/AppLayoutContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authInitialized, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      router.push("/auth");
    }
  }, [authInitialized, isAuthenticated, router]);

  if (!authInitialized) return null;
  if (!isAuthenticated) return null;

  return <AppLayoutContent>{children}</AppLayoutContent>;
}
