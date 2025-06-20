"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  AuthContextType,
  AuthProviderProps,
  AuthResponse,
  User,
} from "@/types/auth";

// Create the context with a default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);

  // Load user/token from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("authUser");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to load auth state from local storage:", e);
      setError("Failed to load previous session.");
    } finally {
      setAuthInitialized(true);
    }
  }, []);

  const login = useCallback(
    async (walletAddress: string): Promise<AuthResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const API_ENDPOINT = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`;

        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: walletAddress }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Prefer checking if data has a known error message format
          const errorMessage = data?.error || "Login failed. Please try again.";
          throw new Error(errorMessage);
        }

        // Optional: Validate required fields before proceeding
        if (!data?.token || !data?.user) {
          throw new Error("Invalid response from server. Please try again.");
        }

        setUser(data.user);
        setToken(data.token);
        setIsAuthenticated(true);

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authUser", JSON.stringify(data.user));

        router.push("/");

        return data;
      } catch (error: any) {
        const fallbackMessage = "An unexpected error occurred during login.";
        setError(error?.message || fallbackMessage);
        throw new Error(error?.message || fallbackMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  // Logout function
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setError(null);
    router.push("/auth"); // Redirect to auth page
  }, []);

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    isLoading,
    error,
    authInitialized,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
