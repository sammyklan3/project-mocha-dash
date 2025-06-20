import React from "react";
import { Users, UserPlus, Star, MapPin } from "lucide-react";

const Customers: React.FC = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      wallet: "0x1234...5678",
      orders: 12,
      totalSpent: "$342.89",
      lastOrder: "2024-01-15",
      rating: 5,
      location: "New York, US",
      joinDate: "2023-08-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      wallet: "0x9876...5432",
      orders: 8,
      totalSpent: "$189.45",
      lastOrder: "2024-01-14",
      rating: 4,
      location: "London, UK",
      joinDate: "2023-09-22",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      wallet: "0x1111...2222",
      orders: 15,
      totalSpent: "$456.78",
      lastOrder: "2024-01-13",
      rating: 5,
      location: "Toronto, CA",
      joinDate: "2023-07-10",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      wallet: "0x3333...4444",
      orders: 6,
      totalSpent: "$123.67",
      lastOrder: "2024-01-12",
      rating: 4,
      location: "Sydney, AU",
      joinDate: "2023-10-05",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-2">
            Manage your customer relationships
          </p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2">
          <UserPlus className="h-5 w-5" />
          <span>Add Customer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Customers
            </h3>
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">3,891</p>
          <p className="text-green-600 text-sm font-medium">+127 this month</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Active Users
            </h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">2,456</p>
          <p className="text-gray-600 text-sm">Last 30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Avg. Rating</h3>
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600 mb-2">4.7</p>
          <p className="text-gray-600 text-sm">Customer satisfaction</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Repeat Rate</h3>
            <MapPin className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600 mb-2">68%</p>
          <p className="text-gray-600 text-sm">Return customers</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Customer Directory
            </h3>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search customers..."
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-64"
              />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Customers</option>
                <option>VIP Customers</option>
                <option>New Customers</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Wallet
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Orders
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Total Spent
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Rating
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Location
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Last Order
                </th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">
                        {customer.name}
                      </p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                      <p className="text-xs text-gray-400">
                        Joined {customer.joinDate}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                    {customer.wallet}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{customer.orders}</td>
                  <td className="py-4 px-6 font-bold text-green-600">
                    {customer.totalSpent}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      {renderStars(customer.rating)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({customer.rating})
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {customer.location}
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {customer.lastOrder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Customer Segments
          </h3>
          <div className="space-y-4">
            {[
              { segment: "VIP Customers", count: 234, percentage: 6 },
              { segment: "Regular Customers", count: 1456, percentage: 37 },
              { segment: "New Customers", count: 892, percentage: 23 },
              { segment: "Inactive Customers", count: 1309, percentage: 34 },
            ].map((segment, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    {segment.segment}
                  </span>
                  <span className="text-gray-900 font-bold">
                    {segment.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-amber-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Geographic Distribution
          </h3>
          <div className="space-y-4">
            {[
              { country: "United States", customers: 1456, percentage: 37 },
              { country: "United Kingdom", customers: 743, percentage: 19 },
              { country: "Canada", customers: 468, percentage: 12 },
              { country: "Australia", customers: 389, percentage: 10 },
              { country: "Others", customers: 835, percentage: 22 },
            ].map((location, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">
                    {location.country}
                  </p>
                  <p className="text-sm text-gray-500">
                    {location.customers} customers
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {location.percentage}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
