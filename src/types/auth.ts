import type { ReactNode } from "react";

// Interface for the user object
export interface User {
  wallet_address: string;
  created_at: string;
}

// Interface for the authentication response from a real API
export interface AuthResponse {
  token: string;
  user: User;
}

// Interface for the AuthContext value
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (walletAddress: string) => Promise<AuthResponse>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  authInitialized: boolean;
}

// AuthProvider Component
export interface AuthProviderProps {
  children: ReactNode;
}
