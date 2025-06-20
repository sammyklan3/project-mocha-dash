export interface Product {
  _id: number;
  name: string;
  category: string;
  price: string; // Or number if you want to parse it
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
}
