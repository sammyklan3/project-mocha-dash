"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Package2,
  Coffee,
  Zap,
  AlertTriangle,
} from "lucide-react";
import StatsCard from "@/components/StatCard";
import RecentActivity from "@/components/RecentActivity";
import SalesChart from "@/components/SalesChart";
import useAuth from "@/hooks/useAuth";
import { Stat, Product, BlockchainStat } from "@/types/dashboard";

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  // State for Stats Cards
  const [stats, setStats] = useState<Stat[]>([]);
  const [statsLoading, setStatsLoading] = useState<boolean>(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  // State for Top Products
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [topProductsLoading, setTopProductsLoading] = useState<boolean>(true);
  const [topProductsError, setTopProductsError] = useState<string | null>(null);

  // State for Blockchain Stats
  const [blockchainStats, setBlockchainStats] = useState<BlockchainStat[]>([]);
  const [blockchainStatsLoading, setBlockchainStatsLoading] =
    useState<boolean>(true);
  const [blockchainStatsError, setBlockchainStatsError] = useState<
    string | null
  >(null);

  // State fo monthly sales data
  const [monthlySalesData, setMonthlySalesData] = useState<
    { month: string; sales: number }[]
  >([]);
  const [growthPercentage, setGrowthPercentage] = useState<string>("");
  const [salesLoading, setSalesLoading] = useState<boolean>(true);
  const [salesError, setSalesError] = useState<string | null>(null);

  // Fetch stats data from API
  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      setStatsError(null);
      try {
        const response = await fetch(`${API_ENDPOINT}/stats/overview`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        }); // replace with your API
        if (!response.ok) throw new Error("Failed to fetch dashboard stats.");
        const json = await response.json();

        const formattedStats: Stat[] = [
          {
            title: "Total Revenue",
            value: `$${json.totalRevenue.value.toLocaleString()}`,
            change: `${json.totalRevenue.change >= 0 ? "+" : ""}${json.totalRevenue.change.toFixed(1)}%`,
            icon: DollarSign,
            color: "green",
          },
          {
            title: "NFTs Minted",
            value: json.nftsMinted.value.toLocaleString(),
            change: `${json.nftsMinted.change >= 0 ? "+" : ""}${json.nftsMinted.change.toFixed(1)}%`,
            icon: Zap,
            color: "blue",
          },
          {
            title: "Active Users",
            value: json.activeUsers.value.toLocaleString(),
            change: `${json.activeUsers.change >= 0 ? "+" : ""}${json.activeUsers.change.toFixed(1)}%`,
            icon: Users,
            color: "purple",
          },
          {
            title: "Products Sold",
            value: json.productsSold.value.toLocaleString(),
            change: `${json.productsSold.change >= 0 ? "+" : ""}${json.productsSold.change.toFixed(1)}%`,
            icon: Package2,
            color: "orange",
          },
        ];

        setStats(formattedStats);
      } catch (error: any) {
        setStatsError(error.message || "An unexpected error occurred.");
      } finally {
        setStatsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Fetch monthly sales data
  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        setSalesLoading(true);
        const res = await fetch(`${API_ENDPOINT}/stats/sales`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        if (!res.ok) throw new Error("Failed to fetch monthly sales");
        const data = await res.json();
        setMonthlySalesData(data);
        // Calculate growth from last two months
        if (data.length >= 2) {
          const lastMonth = data[data.length - 1].sales;
          const prevMonth = data[data.length - 2].sales;

          if (prevMonth !== 0) {
            const growth = ((lastMonth - prevMonth) / prevMonth) * 100;
            const formattedGrowth =
              (growth >= 0 ? "+" : "") + growth.toFixed(1) + "%";
            setGrowthPercentage(formattedGrowth);
          } else {
            setGrowthPercentage("N/A");
          }
        } else {
          setGrowthPercentage("N/A");
        }
      } catch (error: any) {
        setSalesError(error.message);
      } finally {
        setSalesLoading(false);
      }
    };
    fetchMonthlySales();
  }, []);

  // Fetch top products
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setTopProductsLoading(true);
        const res = await fetch(`${API_ENDPOINT}/stats/top-products`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setTopProducts(data);
      } catch (error: any) {
        setTopProductsError(error.message);
      } finally {
        setTopProductsLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  // Fetch blockchain stats
  useEffect(() => {
    const fetchBlockchainStats = async () => {
      setBlockchainStatsLoading(true);
      setBlockchainStatsError(null);
      try {
        const res = await fetch(`${API_ENDPOINT}/stats/blockchain`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });
        const data = await res.json();

        const transformed: BlockchainStat[] = [
          {
            label: "Transactions",
            value: data.transactions.toLocaleString(),
            color: "blue",
          },
          {
            label: "Smart Contracts",
            value: data.smartContracts.toString(),
            color: "purple",
          },
        ];

        setBlockchainStats(transformed);
      } catch (error: any) {
        setBlockchainStatsError("Failed to load blockchain stats");
      } finally {
        setBlockchainStatsLoading(false);
      }
    };

    fetchBlockchainStats();
  }, []);

  // --- Loading Skeleton Components ---

  const StatsCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mt-4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );

  const ProductItemSkeleton: React.FC = () => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg animate-pulse">
      <div>
        <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  );

  const BlockchainStatSkeleton: React.FC = () => (
    <div className="flex justify-between items-center animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </div>
  );

  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col justify-center items-center h-full text-red-500 p-4">
      <AlertTriangle className="h-8 w-8 mb-2" />
      <p className="mt-2 text-center font-medium">{message}</p>
      <p className="text-sm text-gray-500">Please try refreshing the page.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="relative w-full px-4 sm:px-6 md:px-0">
        <div className="flex items-start justify-between md:items-center flex-col md:flex-row gap-4 md:gap-0">
          <div className="pt-2 md:pt-0 md:pl-0 pl-10">
            {" "}
            {/* <-- Leaves space for hamburger */}
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Welcome back to ProjectMochaChai
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-lg self-start md:self-center">
            <Coffee className="h-5 w-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Brewing Success</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          // Render 4 skeleton cards for the stats section
          Array.from({ length: 4 }).map((_, index) => (
            <StatsCardSkeleton key={index} />
          ))
        ) : statsError ? (
          <div className="col-span-full">
            <ErrorMessage message={statsError} />
          </div>
        ) : (
          stats.map((stat, index) => <StatsCard key={index} {...stat} />)
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SalesChart
            data={monthlySalesData}
            title="Monthly Sales Performance"
            subtitle="Year-to-date overview"
            growthPercentage={growthPercentage}
          />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Top Products</h3>

          {topProductsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductItemSkeleton key={index} />
              ))}
            </div>
          ) : topProductsError ? (
            <ErrorMessage message={topProductsError} />
          ) : topProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">
                No top products available at the moment.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      {product.sales} sold
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {product.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Blockchain Stats
          </h3>

          {blockchainStatsLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <BlockchainStatSkeleton key={index} />
              ))}
            </div>
          ) : blockchainStatsError ? (
            <ErrorMessage message={blockchainStatsError} />
          ) : blockchainStats.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm">No blockchain stats available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blockchainStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{stat.label}</span>
                  <span className={`font-bold text-${stat.color}-600`}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
