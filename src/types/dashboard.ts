import { LucideIcon } from "lucide-react";

// Helper type for the stat cards
export interface Stat {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: "green" | "blue" | "purple" | "orange";
}

// Helper type for products
export interface Product {
  name: string;
  sales: number;
  revenue: string;
}

// Helper type for blockchain stats
export interface BlockchainStat {
  label: string;
  value: string;
  color: string;
}
