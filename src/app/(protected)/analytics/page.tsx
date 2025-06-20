"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Eye,
  MousePointer,
  AlertTriangle, // For error messages
} from "lucide-react";

// --- Type Definitions for Data ---

interface KeyMetric {
  title: string;
  value: string;
  change?: string; // Optional for Global Reach
  description?: string; // Optional for Global Reach
  icon: React.ElementType;
  color: string;
}

interface TrafficSource {
  source: string;
  percentage: number;
  visits: number;
}

interface AgeGroup {
  age: string;
  percentage: number;
}

interface DeviceType {
  label: string;
  percentage: number;
}

interface UserDemographicsData {
  ageGroups: AgeGroup[];
  deviceTypes: DeviceType[];
}

interface PerformanceMetric {
  value: string;
  label: string;
  color: string;
}

const Analytics: React.FC = () => {
  // --- State for Key Metrics ---
  const [keyMetrics, setKeyMetrics] = useState<KeyMetric[]>([]);
  const [keyMetricsLoading, setKeyMetricsLoading] = useState<boolean>(true);
  const [keyMetricsError, setKeyMetricsError] = useState<string | null>(null);

  // --- State for Traffic Sources ---
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [trafficSourcesLoading, setTrafficSourcesLoading] =
    useState<boolean>(true);
  const [trafficSourcesError, setTrafficSourcesError] = useState<string | null>(
    null,
  );

  // --- State for User Demographics ---
  const [userDemographics, setUserDemographics] =
    useState<UserDemographicsData | null>(null);
  const [userDemographicsLoading, setUserDemographicsLoading] =
    useState<boolean>(true);
  const [userDemographicsError, setUserDemographicsError] = useState<
    string | null
  >(null);

  // --- State for Performance Metrics ---
  const [performanceMetrics, setPerformanceMetrics] = useState<
    PerformanceMetric[]
  >([]);
  const [performanceMetricsLoading, setPerformanceMetricsLoading] =
    useState<boolean>(true);
  const [performanceMetricsError, setPerformanceMetricsError] = useState<
    string | null
  >(null);

  // --- Simulate API Call for Key Metrics ---
  useEffect(() => {
    const fetchKeyMetrics = async () => {
      setKeyMetricsLoading(true);
      setKeyMetricsError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate delay

        if (Math.random() < 0.2) {
          // 20% chance of error
          throw new Error("Failed to load key metrics. Please try again.");
        }

        const data: KeyMetric[] = [
          {
            title: "Page Views",
            value: "45,892",
            change: "+18.2% from last month",
            icon: Eye,
            color: "blue",
          },
          {
            title: "Conversion Rate",
            value: "3.4%",
            change: "+0.8% from last month",
            icon: MousePointer,
            color: "purple",
          },
          {
            title: "Global Reach",
            value: "34",
            description: "Countries served",
            icon: Globe,
            color: "green",
          },
        ];
        setKeyMetrics(data);
      } catch (error: any) {
        setKeyMetricsError(error.message);
      } finally {
        setKeyMetricsLoading(false);
      }
    };
    fetchKeyMetrics();
  }, []);

  // --- Simulate API Call for Traffic Sources ---
  useEffect(() => {
    const fetchTrafficSources = async () => {
      setTrafficSourcesLoading(true);
      setTrafficSourcesError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay

        if (Math.random() < 0.15) {
          // 15% chance of error
          throw new Error("Traffic source data could not be fetched.");
        }

        const data: TrafficSource[] = [
          { source: "Organic Search", percentage: 45, visits: 12456 },
          { source: "Direct", percentage: 28, visits: 7834 },
          { source: "Social Media", percentage: 15, visits: 4123 },
          { source: "Email", percentage: 8, visits: 2234 },
          { source: "Referral", percentage: 4, visits: 1123 },
        ];
        setTrafficSources(data);
      } catch (error: any) {
        setTrafficSourcesError(error.message);
      } finally {
        setTrafficSourcesLoading(false);
      }
    };
    fetchTrafficSources();
  }, []);

  // --- Simulate API Call for User Demographics ---
  useEffect(() => {
    const fetchUserDemographics = async () => {
      setUserDemographicsLoading(true);
      setUserDemographicsError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1800)); // Simulate delay

        if (Math.random() < 0.1) {
          // 10% chance of error
          throw new Error("Demographics data is unavailable.");
        }

        const data: UserDemographicsData = {
          ageGroups: [
            { age: "18-24", percentage: 22 },
            { age: "25-34", percentage: 35 },
            { age: "35-44", percentage: 28 },
            { age: "45+", percentage: 15 },
          ],
          deviceTypes: [
            { label: "Desktop", percentage: 62 },
            { label: "Mobile", percentage: 31 },
            { label: "Tablet", percentage: 7 },
          ],
        };
        setUserDemographics(data);
      } catch (error: any) {
        setUserDemographicsError(error.message);
      } finally {
        setUserDemographicsLoading(false);
      }
    };
    fetchUserDemographics();
  }, []);

  // --- Simulate API Call for Performance Metrics ---
  useEffect(() => {
    const fetchPerformanceMetrics = async () => {
      setPerformanceMetricsLoading(true);
      setPerformanceMetricsError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

        if (Math.random() < 0.05) {
          // 5% chance of error
          throw new Error("Performance data could not be retrieved.");
        }

        const data: PerformanceMetric[] = [
          { value: "2.4s", label: "Avg Load Time", color: "blue" },
          { value: "98.5%", label: "Uptime", color: "green" },
          { value: "4.2/5", label: "User Rating", color: "purple" },
          { value: "156", label: "API Calls/min", color: "orange" },
        ];
        setPerformanceMetrics(data);
      } catch (error: any) {
        setPerformanceMetricsError(error.message);
      } finally {
        setPerformanceMetricsLoading(false);
      }
    };
    fetchPerformanceMetrics();
  }, []);

  // --- Common Error Message Component ---
  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col justify-center items-center h-full text-red-500 p-4">
      <AlertTriangle className="h-8 w-8 mb-2" />
      <p className="mt-2 text-center font-medium">{message}</p>
      <p className="text-sm text-gray-500">Please try refreshing the page.</p>
    </div>
  );

  // --- Skeleton Components for Analytics ---

  const MetricCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );

  const TrafficSourceSkeleton: React.FC = () => (
    <div className="space-y-2 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-2/5"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="h-2 bg-gray-300 rounded-full w-full"></div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
    </div>
  );

  const AgeGroupSkeleton: React.FC = () => (
    <div className="flex justify-between items-center animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="flex items-center space-x-2">
        <div className="w-20 bg-gray-200 rounded-full h-2">
          <div className="h-2 bg-gray-300 rounded-full w-full"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-8"></div>
      </div>
    </div>
  );

  const DeviceTypeSkeleton: React.FC = () => (
    <div className="text-center animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  );

  const PerformanceMetricSkeleton: React.FC = () => (
    <div className="text-center animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">
          Detailed insights into your Web3 coffee business
        </p>
      </div>

      {/* --- Key Metrics Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {keyMetricsLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <MetricCardSkeleton key={index} />
          ))
        ) : keyMetricsError ? (
          <div className="col-span-full">
            <ErrorMessage message={keyMetricsError} />
          </div>
        ) : (
          keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {metric.title}
                </h3>
                <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </p>
              {metric.change && (
                <p className="text-green-600 text-sm font-medium">
                  {metric.change}
                </p>
              )}
              {metric.description && (
                <p className="text-gray-600 text-sm font-medium">
                  {metric.description}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Traffic Sources Section --- */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Traffic Sources
          </h3>
          {trafficSourcesLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <TrafficSourceSkeleton key={index} />
              ))}
            </div>
          ) : trafficSourcesError ? (
            <ErrorMessage message={trafficSourcesError} />
          ) : (
            <div className="space-y-4">
              {trafficSources.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      {item.source}
                    </span>
                    <span className="text-gray-900 font-bold">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {item.visits.toLocaleString()} visits
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- User Demographics Section --- */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            User Demographics
          </h3>
          {userDemographicsLoading ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 animate-pulse bg-gray-200 h-5 w-1/3 rounded"></h4>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <AgeGroupSkeleton key={index} />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 animate-pulse bg-gray-200 h-5 w-1/3 rounded"></h4>
                <div className="grid grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <DeviceTypeSkeleton key={index} />
                  ))}
                </div>
              </div>
            </div>
          ) : userDemographicsError ? (
            <ErrorMessage message={userDemographicsError} />
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Age Groups</h4>
                <div className="space-y-3">
                  {userDemographics?.ageGroups.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{item.age}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.percentage * 2.5}%` }}
                          ></div>
                        </div>
                        <span className="text-gray-900 font-medium w-8">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Device Types
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {userDemographics?.deviceTypes.map((item, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl font-bold text-gray-900">
                        {item.percentage}%
                      </p>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Performance Metrics Section --- */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Performance Metrics
        </h3>
        {performanceMetricsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <PerformanceMetricSkeleton key={index} />
            ))}
          </div>
        ) : performanceMetricsError ? (
          <ErrorMessage message={performanceMetricsError} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <p
                  className={`text-3xl font-bold text-${metric.color}-600 mb-2`}
                >
                  {metric.value}
                </p>
                <p className="text-gray-600">{metric.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
