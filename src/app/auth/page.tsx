"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Auth: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const { login, isLoading, error, isAuthenticated, authInitialized } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && isAuthenticated) {
      router.push("/");
    }
  }, [authInitialized, isAuthenticated, router]);

  if (!authInitialized) return null;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setWalletAddress(event.target.value);
    setMessage("");
    setLocalError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setMessage("");

    if (!walletAddress) {
      setLocalError("Please enter a wallet address.");
      return;
    }

    try {
      await login(walletAddress);
    } catch (err: any) {
      setLocalError(
        err?.message ||
          "An unexpected error occurred during login. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-inter">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition duration-500 hover:scale-105 border border-gray-200">
        <div className="text-center mb-8">
          <svg
            className="mx-auto h-12 w-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-4">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mt-2">Please log in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="walletAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              value={walletAddress}
              onChange={handleInputChange}
              placeholder="Enter your wallet address here"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-300 ease-in-out hover:border-blue-400"
              required
            />
          </div>

          {(localError || error) && (
            <p className="text-sm text-red-600 text-center">
              {localError || error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-600 text-center">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Connect Wallet & Login"
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 Crefy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
