"use client";

import React, { useState, useEffect } from "react";
import { Zap, Star, Clock, DollarSign, AlertTriangle } from "lucide-react"; // Added AlertTriangle for errors

// --- Type Definitions for Data ---

interface OverviewStat {
  title: string;
  value: string;
  change?: string; // Optional for some stats
  description?: string; // Optional for some stats
  icon: React.ElementType;
  color: string;
}

interface Collection {
  name: string;
  description: string;
  totalSupply: number;
  minted: number;
  price: string;
  image: string;
  rarity: string;
}

interface RecentMint {
  collection: string;
  buyer: string;
  price: string;
  time: string;
}

const Mints: React.FC = () => {
  // --- State for Overview Stats ---
  const [overviewStats, setOverviewStats] = useState<OverviewStat[]>([]);
  const [overviewStatsLoading, setOverviewStatsLoading] =
    useState<boolean>(true);
  const [overviewStatsError, setOverviewStatsError] = useState<string | null>(
    null,
  );

  // --- State for NFT Collections List ---
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionsLoading, setCollectionsLoading] = useState<boolean>(true);
  const [collectionsError, setCollectionsError] = useState<string | null>(null);

  // --- State for Recent Mints Table ---
  const [recentMints, setRecentMints] = useState<RecentMint[]>([]);
  const [recentMintsLoading, setRecentMintsLoading] = useState<boolean>(true);
  const [recentMintsError, setRecentMintsError] = useState<string | null>(null);

  // Helper function for rarity color (remains the same)
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-600 bg-gray-100";
      case "Rare":
        return "text-blue-600 bg-blue-100";
      case "Epic":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // --- Simulate API Call for Overview Stats ---
  useEffect(() => {
    const fetchOverviewStats = async () => {
      setOverviewStatsLoading(true);
      setOverviewStatsError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        if (Math.random() < 0.2) {
          // 20% chance of error
          throw new Error("Failed to load mint overview stats.");
        }

        const data: OverviewStat[] = [
          {
            title: "Total Collections",
            value: "12",
            description: "Active collections",
            icon: Star,
            color: "yellow",
          },
          {
            title: "Total Minted",
            value: "2,288",
            change: "+156 this week",
            icon: Zap,
            color: "blue",
          },
          {
            title: "Mint Revenue",
            value: "142.5 ETH",
            change: "+12.3% this month",
            icon: DollarSign,
            color: "green",
          },
          {
            title: "Avg. Price",
            value: "0.062 ETH",
            description: "Current average",
            icon: Clock,
            color: "purple",
          },
        ];
        setOverviewStats(data);
      } catch (error: any) {
        setOverviewStatsError(error.message);
      } finally {
        setOverviewStatsLoading(false);
      }
    };
    fetchOverviewStats();
  }, []);

  // --- Simulate API Call for NFT Collections ---
  useEffect(() => {
    const fetchCollections = async () => {
      setCollectionsLoading(true);
      setCollectionsError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

        if (Math.random() < 0.15) {
          // 15% chance of error
          throw new Error("Could not load NFT collections.");
        }

        const data: Collection[] = [
          {
            name: "Ethiopian Highlands",
            description:
              "Premium single-origin coffee from Ethiopian highlands",
            totalSupply: 1000,
            minted: 743,
            price: "0.05 ETH",
            image:
              "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=300",
            rarity: "Rare",
          },
          {
            name: "Colombian Supreme",
            description: "Exquisite Colombian coffee with rich aroma",
            totalSupply: 800,
            minted: 456,
            price: "0.08 ETH",
            image:
              "https://images.pexels.com/photos/13238800/pexels-photo-13238800.jpeg?auto=compress&cs=tinysrgb&w=300",
            rarity: "Epic",
          },
          {
            name: "Brazilian Santos",
            description: "Classic Brazilian coffee with smooth finish",
            totalSupply: 1200,
            minted: 1089,
            price: "0.03 ETH",
            image:
              "https://images.pexels.com/photos/6347886/pexels-photo-6347886.jpeg?auto=compress&cs=tinysrgb&w=300",
            rarity: "Common",
          },
        ];
        setCollections(data);
      } catch (error: any) {
        setCollectionsError(error.message);
      } finally {
        setCollectionsLoading(false);
      }
    };
    fetchCollections();
  }, []);

  // --- Simulate API Call for Recent Mints ---
  useEffect(() => {
    const fetchRecentMints = async () => {
      setRecentMintsLoading(true);
      setRecentMintsError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1800)); // Simulate delay

        if (Math.random() < 0.1) {
          // 10% chance of error
          throw new Error("Failed to load recent mint activity.");
        }

        const data: RecentMint[] = [
          {
            collection: "Ethiopian Highlands",
            buyer: "0x1234...5678",
            price: "0.05 ETH",
            time: "2 min ago",
          },
          {
            collection: "Colombian Supreme",
            buyer: "0x9876...5432",
            price: "0.08 ETH",
            time: "5 min ago",
          },
          {
            collection: "Brazilian Santos",
            buyer: "0x1111...2222",
            price: "0.03 ETH",
            time: "8 min ago",
          },
          {
            collection: "Ethiopian Highlands",
            buyer: "0x3333...4444",
            price: "0.05 ETH",
            time: "12 min ago",
          },
        ];
        setRecentMints(data);
      } catch (error: any) {
        setRecentMintsError(error.message);
      } finally {
        setRecentMintsLoading(false);
      }
    };
    fetchRecentMints();
  }, []);

  // --- Common Error Message Component ---
  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col justify-center items-center h-full text-red-500 p-4 col-span-full">
      <AlertTriangle className="h-8 w-8 mb-2" />
      <p className="mt-2 text-center font-medium">{message}</p>
      <p className="text-sm text-gray-500">Please try refreshing the page.</p>
    </div>
  );

  // --- Skeleton Components ---

  const StatCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );

  const CollectionCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200"></div> {/* Image placeholder */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded w-2/3"></div> {/* Name */}
          <div className="h-5 bg-gray-200 rounded-full w-1/4"></div>{" "}
          {/* Rarity */}
        </div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>{" "}
        {/* Description line 1 */}
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>{" "}
        {/* Description line 2 */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
            {/* Minted label */}
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>{" "}
            {/* Minted value */}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="h-2 bg-gray-300 rounded-full w-full"></div>{" "}
            {/* Progress bar */}
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div> {/* Price */}
            <div className="h-10 bg-amber-200 rounded-lg w-24"></div>{" "}
            {/* Button */}
          </div>
        </div>
      </div>
    </div>
  );

  const RecentMintRowSkeleton: React.FC = () => (
    <tr className="border-b border-gray-100 animate-pulse">
      <td className="py-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </td>
      <td className="py-4">
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </td>
      <td className="py-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </td>
      <td className="py-4">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NFT Collections</h1>
          <p className="text-gray-600 mt-2">
            Manage your coffee NFT collections and minting
          </p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Create Collection</span>
        </button>
      </div>

      {/* --- Overview Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStatsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : overviewStatsError ? (
          <ErrorMessage message={overviewStatsError} />
        ) : (
          overviewStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {stat.title}
                </h3>
                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              {stat.change && (
                <p className="text-green-600 text-sm font-medium">
                  {stat.change}
                </p>
              )}
              {stat.description && (
                <p className="text-gray-600 text-sm">{stat.description}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* --- NFT Collections Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {collectionsLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <CollectionCardSkeleton key={index} />
          ))
        ) : collectionsError ? (
          <ErrorMessage message={collectionsError} />
        ) : (
          collections.map((collection, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {collection.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(collection.rarity)}`}
                  >
                    {collection.rarity}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {collection.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Minted</span>
                    <span className="font-medium">
                      {collection.minted}/{collection.totalSupply}
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(collection.minted / collection.totalSupply) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {collection.price}
                    </span>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Mint Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- Recent Mints Section --- */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Mints</h3>
        {recentMintsLoading ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Collection
                  </th>
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Buyer
                  </th>
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 4 }).map((_, index) => (
                  <RecentMintRowSkeleton key={index} />
                ))}
              </tbody>
            </table>
          </div>
        ) : recentMintsError ? (
          <ErrorMessage message={recentMintsError} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Collection
                  </th>
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Buyer
                  </th>
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="text-left py-3 text-gray-600 font-medium">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentMints.map((mint, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 font-medium text-gray-900">
                      {mint.collection}
                    </td>
                    <td className="py-4 text-gray-600 font-mono text-sm">
                      {mint.buyer}
                    </td>
                    <td className="py-4 font-bold text-green-600">
                      {mint.price}
                    </td>
                    <td className="py-4 text-gray-500 text-sm">{mint.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mints;
