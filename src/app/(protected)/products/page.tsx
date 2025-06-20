"use client";

import React, { useState, useEffect } from "react";
import { Package, Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import DeleteModal from "@/components/DeleteModal";
import Link from "next/link";

interface RawProduct {
  _id: number;
  name: string;
  type: string;
  price: number;
  image: string;
}

interface MappedProduct {
  _id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  image: string;
}

const Products: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_ENDPOINT}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(
            `Error fetching products: ${response.status} ${response.statusText}`,
          );
        }
        const rawData = await response.json();
        // Transform API response to fit Product interface
        const mappedProducts: Product[] = rawData.map((item: any) => {
          const stock = Math.floor(Math.random() * 201); // Simulate stock (0–200)
          const status =
            stock === 0
              ? "Out of Stock"
              : stock <= 50
                ? "Low Stock"
                : "In Stock";

          return {
            _id: (item as RawProduct)._id,
            name: (item as RawProduct).name,
            category: (item as RawProduct).type
              .replace("_", " ")
              .replace(/\b\w/g, (l: string) => l.toUpperCase()), // Format type as category
            price: `$${(typeof (item as RawProduct).price === "number" ? (item as RawProduct).price : 0).toFixed(2)}`,
            stock,
            status,
            image: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${(item as RawProduct).image}`,
          } as MappedProduct;
        });

        setProducts(mappedProducts);
      } catch (err) {
        setError(
          err instanceof Error
            ? `Failed to fetch products: ${err.message}`
            : "An unknown error occurred.",
        );
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (productId: number) => {
    try {
      const res = await fetch(`${API_ENDPOINT}/products/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete product.");
      }

      // Optional: remove it from local state if you're storing the product list
      setProducts((prev) =>
        prev.filter((product) => product._id !== productId),
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting the product.");
    }
  };

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "text-green-600 bg-green-100";
      case "Low Stock":
        return "text-yellow-600 bg-yellow-100";
      case "Out of Stock":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Skeleton Loader Component
  const SkeletonRow: React.FC = () => (
    <tr className="border-b border-gray-100 animate-pulse">
      <td className="py-4 px-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg bg-gray-300"></div>
          <div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-300 rounded w-24"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </td>
      <td className="py-4 px-6">
        <div className="h-6 bg-gray-300 rounded-full w-24"></div>
      </td>
      <td className="py-4 px-6">
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );

  // Skeleton Loader for cards
  const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
      </div>
      <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  );

  // Derive summary data from fetched products
  const totalProducts = products.length;
  const inStock = products.filter((p) => p.status === "In Stock").length;
  const lowStock = products.filter((p) => p.status === "Low Stock").length;
  const outOfStock = products.filter((p) => p.status === "Out of Stock").length;

  return (
    <div className="space-y-8 p-0 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">
            Manage your coffee product inventory
          </p>
        </div>
        <button
          onClick={() => router.push("/products/add")}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Total Products
                </h3>
                <Package className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {totalProducts}
              </p>
              <p className="text-gray-600 text-sm">Active products</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  In Stock
                </h3>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">
                {inStock}
              </p>
              <p className="text-gray-600 text-sm">Available items</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Low Stock
                </h3>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-yellow-600 mb-2">
                {lowStock}
              </p>
              <p className="text-gray-600 text-sm">Need restock</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Out of Stock
                </h3>
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-3xl font-bold text-red-600 mb-2">
                {outOfStock}
              </p>
              <p className="text-gray-600 text-sm">Unavailable</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Product Inventory
            </h3>
            <div className="flex gap-4 mb-4">
              <select
                className="p-2 border rounded"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Coffee Bag">Coffee Bag</option>
                <option value="Coffee Cup">Coffee Cup</option>
                <option value="Free Coffee">Free Coffee</option>
              </select>

              <select
                className="p-2 border rounded"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[768px] w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Product
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Category
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Stock
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Show 5 skeleton rows while loading
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : error ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 px-6 text-center text-red-600"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <AlertCircle className="h-12 w-12 mb-4" />
                      <p className="text-lg font-semibold">{error}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Please try reloading the page or contact support.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 px-6 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                products
                  .filter((product) => {
                    const categoryMatch =
                      categoryFilter === "All" ||
                      product.category === categoryFilter;
                    const statusMatch =
                      statusFilter === "All" || product.status === statusFilter;
                    return categoryMatch && statusMatch;
                  })
                  .map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover shadow-sm"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              ID: {product._id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {product.category}
                      </td>
                      <td className="py-4 px-6 font-bold text-gray-900">
                        {product.price}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {product.stock} units
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            product.status,
                          )}`}
                        >
                          {product.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Link href={`/products/edit/${product._id}`}>
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                              title="Edit Product"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                          </Link>
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                          <DeleteModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onConfirm={() => handleDelete(product._id)}
                            productName={product.name}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
