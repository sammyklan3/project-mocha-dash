"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import useAuth from "@/hooks/useAuth";

const AddProduct: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();
  const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;
  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const [name, setName] = useState("");
  const [type, setType] = useState("coffee_bag");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [maxClaims, setMaxClaims] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => setFeatures([...features, ""]);
  const removeFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  // Callback for successful Cloudinary upload
  const handleImageUploadSuccess = (result: any) => {
    if (result.event === "success" && result.info?.public_id) {
      setImage(result.info.public_id);
      console.log("Uploaded image public ID:", result.info.public_id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !name ||
      !type ||
      !description ||
      price === null ||
      price === undefined ||
      originalPrice === null ||
      originalPrice === undefined ||
      !image // Ensure an image has been uploaded
    ) {
      setError(
        "Please fill in all required fields, including uploading an image.",
      );
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting product data:", {
        name,
        type,
        description,
        price,
        originalPrice,
        image,
        features,
        maxClaims,
      });
      const res = await fetch(`${API_ENDPOINT}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          type,
          description,
          price,
          originalPrice,
          image, // Send the Cloudinary public ID
          features: features.filter((f) => f.trim() !== ""),
          max_claims: maxClaims === null ? null : maxClaims,
        }),
      });

      if (!res.ok) throw new Error(`Failed to create product`);
      console.log("Product creation response:", res);
      const data = await res.json();
      console.log("Product created successfully:", data);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
              required
            >
              <option value="coffee_bag">Coffee Bag</option>
              <option value="coffee_cup">Coffee Cup</option>
              <option value="free_coffee">Free Coffee</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Claims (Optional)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              value={maxClaims ?? ""}
              onChange={(e) =>
                setMaxClaims(
                  e.target.value === "" ? null : Number(e.target.value),
                )
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          {/* Cloudinary Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params" // Your API route for signing
              onSuccess={handleImageUploadSuccess}
              options={{
                sources: ["local", "url", "camera", "google_drive"], // Allow various upload sources
                multiple: false, // Only allow single image upload
                folder: "nextjs-coffee-shop-products", // Optional: specify a folder in your Cloudinary account
              }}
            >
              {({ open }) => {
                return (
                  <button
                    type="button" // Important: use type="button" to prevent form submission
                    onClick={() => open()}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 focus:ring-amber-500 focus:border-amber-500 flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{image ? "Change Image" : "Upload Image"}</span>
                  </button>
                );
              }}
            </CldUploadWidget>

            {/* Image Preview */}
            {image && CLOUDINARY_CLOUD_NAME && (
              <div className="mt-4 border border-gray-200 p-2 rounded-lg flex flex-col items-center">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Image Preview:
                </p>
                <CldImage
                  width="200"
                  height="200"
                  src={image} // Use the public ID from state
                  alt="Product Image Preview"
                  crop="fill"
                  gravity="auto"
                  className="rounded-md object-cover"
                />
              </div>
            )}
            {!image && (
              <p className="mt-2 text-xs text-gray-500">
                No image uploaded yet.
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          {features.map((feature, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-amber-500 focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-1 text-sm text-amber-600 hover:text-amber-800 flex items-center space-x-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 shadow-md"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
