export type ItemCategory =
  | "Burger & Chips"
  | "Beverages"
  | "Vegeterian"
  | "Chicken"
  | "Desserts"
  | "Pizza";

export const ItemCategories = [
  "Burger & Chips",
  "Beverages",
  "Vegeterian",
  "Chicken",
  "Desserts",
  "Pizza",
];

export type ItemStatus = "Available" | "Out of Stock";

export const statusOptions = ["Available", "Out of Stock"];

export interface Item {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: ItemCategory;
  imageUrl: string;
  trending?: boolean;
  status?: string;
}
