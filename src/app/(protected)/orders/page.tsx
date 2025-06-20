import React from "react";
import { ShoppingCart, Clock, CheckCircle, XCircle, Truck } from "lucide-react";

const Orders: React.FC = () => {
  const orders = [
    {
      id: "#ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      products: ["Ethiopian Highlands Premium", "Colombian Supreme Blend"],
      total: "$53.98",
      status: "Delivered",
      date: "2024-01-15",
      wallet: "0x1234...5678",
    },
    {
      id: "#ORD-002",
      customer: "Jane Smith",
      email: "jane@example.com",
      products: ["Brazilian Santos Classic"],
      total: "$22.99",
      status: "Processing",
      date: "2024-01-14",
      wallet: "0x9876...5432",
    },
    {
      id: "#ORD-003",
      customer: "Mike Johnson",
      email: "mike@example.com",
      products: ["Kenyan AA Premium", "Ethiopian Highlands Premium"],
      total: "$57.98",
      status: "Shipped",
      date: "2024-01-13",
      wallet: "0x1111...2222",
    },
    {
      id: "#ORD-004",
      customer: "Sarah Wilson",
      email: "sarah@example.com",
      products: ["Colombian Supreme Blend"],
      total: "$28.99",
      status: "Cancelled",
      date: "2024-01-12",
      wallet: "0x3333...4444",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-4 w-4" />;
      case "Shipped":
        return <Truck className="h-4 w-4" />;
      case "Delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "Cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "text-yellow-600 bg-yellow-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">Manage and track customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Orders
            </h3>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-2">1,247</p>
          <p className="text-green-600 text-sm font-medium">+15 today</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-yellow-600 mb-2">23</p>
          <p className="text-gray-600 text-sm">Awaiting fulfillment</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Shipped</h3>
            <Truck className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600 mb-2">45</p>
          <p className="text-gray-600 text-sm">In transit</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600 mb-2">1,179</p>
          <p className="text-gray-600 text-sm">Completed orders</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>All Status</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Order ID
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Products
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Total
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Wallet
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-medium text-blue-600">
                    {order.id}
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      {order.products.map((product, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {product}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-900">
                    {order.total}
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{order.date}</td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">
                    {order.wallet}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
