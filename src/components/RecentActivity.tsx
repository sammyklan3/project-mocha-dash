import React, { useState, useEffect } from "react";
import { Clock, DollarSign, Users, Zap, AlertTriangle } from "lucide-react";

// --- Type Definition for Activity ---
interface Activity {
  type: string;
  message: string;
  time: string;
  icon: React.ElementType;
}

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Simulate API Call for Recent Activities ---
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate a random error (e.g., 20% chance of error)
        if (Math.random() < 0.2) {
          throw new Error("Failed to load recent activity.");
        }

        const data: Activity[] = [
          {
            type: "sale",
            message: "Ethiopian Highlands NFT sold",
            time: "2 min ago",
            icon: DollarSign,
          },
          {
            type: "mint",
            message: "New coffee NFT minted",
            time: "5 min ago",
            icon: Zap,
          },
          {
            type: "user",
            message: "New customer registered",
            time: "12 min ago",
            icon: Users,
          },
          {
            type: "sale",
            message: "Colombian Blend purchased",
            time: "18 min ago",
            icon: DollarSign,
          },
          {
            type: "mint",
            message: "Limited edition minted",
            time: "25 min ago",
            icon: Zap,
          },
        ];
        setActivities(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []); // Empty dependency array means this runs once on mount

  // --- Common Error Message Component ---
  const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col justify-center items-center h-full text-red-500 p-4 text-center">
      <AlertTriangle className="h-8 w-8 mb-2" />
      <p className="font-medium">{message}</p>
      <p className="text-sm text-gray-500">Please try refreshing.</p>
    </div>
  );

  // --- Skeleton Component for a Single Activity Item ---
  const ActivitySkeleton: React.FC = () => (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg animate-pulse">
      <div className="p-2 bg-gray-200 rounded-lg h-8 w-8"></div>{" "}
      {/* Icon placeholder */}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>{" "}
        {/* Message line 1 */}
        <div className="h-3 bg-gray-200 rounded w-1/2"></div> {/* Time line */}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Clock className="h-5 w-5 text-gray-600" />
        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
      </div>

      <div className="space-y-4">
        {loading ? (
          // Render multiple skeleton items if loading
          Array.from({ length: 5 }).map((_, index) => (
            <ActivitySkeleton key={index} />
          ))
        ) : error ? (
          // Show error message if an error occurred
          <ErrorMessage message={error} />
        ) : (
          // Render actual activities when data is loaded successfully
          activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Icon className="h-4 w-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
