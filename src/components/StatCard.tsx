import React from "react";
import type { ComponentType, SVGProps } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: "green" | "blue" | "purple" | "orange";
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
}) => {
  const colorClasses = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  const changeColor = change.startsWith("+")
    ? "text-green-600"
    : "text-red-600";

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm font-medium mt-2 ${changeColor}`}>{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
