"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import useAuth from "@/hooks/useAuth";

interface Product {
  name: string;
  type: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  features: string[];
  max_claims: number;
}

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; // Added for image display

// Skeleton component for a text input field
const SkeletonInput = () => (
  <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-full"></div>
);

// Skeleton component for a textarea
const SkeletonTextarea = () => (
  <div className="h-24 bg-gray-200 rounded-lg animate-pulse w-full"></div>
);

// Skeleton component for an image placeholder
const SkeletonImage = () => (
  <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
);

const EditProductPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_ENDPOINT}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
        // Optionally, set product to a default empty state or show an error message
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, token]); // Added token to dependency array

  const handleChange = (field: keyof Product, value: any) => {
    setProduct((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_ENDPOINT}/products/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push("/products");
    } catch (err) {
      console.error("Error updating:", err);
      alert("Failed to save product. Please try again."); // User feedback for save error
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="p-8 max-w-4xl w-full bg-white shadow-xl rounded-xl border">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="text-amber-600 hover:underline flex items-center transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Edit Product
          </h1>
        </div>

        {loading ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <SkeletonInput />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Type
                </label>
                <SkeletonInput />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <SkeletonInput />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (if discounted)
                </label>
                <SkeletonInput />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Claims
                </label>
                <SkeletonInput />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image
                </label>
                <div className="flex items-center gap-2">
                  <SkeletonInput />
                  <SkeletonImage />
                </div>
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Description
              </label>
              <SkeletonTextarea />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Features
              </h3>
              <SkeletonInput />
              <SkeletonInput />
              <SkeletonInput />
            </div>
            <div className="mt-8 flex justify-end">
              <div className="h-12 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
          </>
        ) : !product ? (
          <div className="p-8 text-center text-red-500">
            Product not found. Please try again.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500"
                  value={product.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g., Espresso Blend"
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Type
                </label>
                <select
                  id="type"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500"
                  value={product.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  <option value="">Select Type</option>
                  <option value="coffee_bag">Coffee Bag</option>
                  <option value="coffee_cup">Coffee Cup</option>
                  <option value="free_coffee">Free Coffee</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500"
                  value={product.price}
                  onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value))
                  }
                  placeholder="e.g., 15.99"
                />
              </div>
              <div>
                <label
                  htmlFor="originalPrice"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Original Price (if discounted)
                </label>
                <input
                  id="originalPrice"
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500"
                  value={product.originalPrice}
                  onChange={(e) =>
                    handleChange("originalPrice", parseFloat(e.target.value))
                  }
                  placeholder="e.g., 20.00"
                />
              </div>
              <div>
                <label
                  htmlFor="maxClaims"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Maximum Claims
                </label>
                <input
                  id="maxClaims"
                  type="number"
                  className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500"
                  value={product.max_claims}
                  onChange={(e) =>
                    handleChange("max_claims", parseInt(e.target.value))
                  }
                  placeholder="e.g., 100"
                />
              </div>
              <div>
                <label
                  htmlFor="imageUpload"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product Image
                </label>
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                  }
                  signatureEndpoint="/api/sign-cloudinary-params"
                  onSuccess={(result, { widget }) => {
                    if (result.event === "success") {
                      const publicId = (result.info as any).public_id;
                      handleChange("image", publicId); // Store the public_id
                      setImageUploading(false);
                      widget.close(); // Close the widget
                    }
                  }}
                  onUploadAdded={() => setImageUploading(true)}
                  onError={(error) => {
                    console.error("Cloudinary upload error:", error);
                    setImageUploading(false);
                    alert("Image upload failed. Please try again.");
                  }}
                  options={{
                    folder: "nextjs-coffee-shop-products", // Optional: Organize uploads into a specific folder
                    cropping: true, // Optional: Allow users to crop images
                    sources: ["local", "url", "camera"], // Optional: Specify upload sources
                  }}
                >
                  {({ open }) => {
                    function handleOnClick(
                      e: React.MouseEvent<HTMLButtonElement>,
                    ) {
                      e.preventDefault(); // Prevent form submission
                      open();
                    }
                    return (
                      <button
                        className="px-4 py-2 rounded-full bg-orange-600 text-white font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleOnClick}
                        disabled={imageUploading}
                      >
                        {imageUploading ? "Uploading..." : "Upload Image"}
                      </button>
                    );
                  }}
                </CldUploadWidget>
                {product.image && (
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    Current Image:
                    <CldImage
                      src={product.image} // Pass the Cloudinary public_id
                      alt="Product"
                      width={40}
                      height={40}
                      className="ml-2 object-cover rounded-md"
                    />
                    <button
                      onClick={() => handleChange("image", "")} // Clear the image
                      className="ml-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      title="Remove Image"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {imageUploading && (
                  <p className="text-sm text-amber-600 mt-1">
                    Uploading image...
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Description
              </label>
              <textarea
                id="description"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500 min-h-[100px]"
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="A brief description of the product..."
              />
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Features
              </h3>
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-3">
                  <input
                    className="p-3 border border-gray-300 rounded-lg w-full focus:ring-amber-500 focus:border-amber-500"
                    value={feature}
                    onChange={(e) => {
                      const features = [...product.features];
                      features[idx] = e.target.value;
                      handleChange("features", features);
                    }}
                    placeholder={`Feature ${idx + 1}`}
                  />
                  <button
                    onClick={() => {
                      const features = product.features.filter(
                        (_, i) => i !== idx,
                      );
                      handleChange("features", features);
                    }}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    title="Remove Feature"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                className="text-sm text-amber-600 mt-2 hover:underline flex items-center transition-colors duration-200"
                onClick={() =>
                  handleChange("features", [...product.features, ""])
                }
              >
                + Add Feature
              </button>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || imageUploading}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg shadow-md font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
