export type ItemCategory =
  | "Burger & Chips"
  | "Beverages"
  | "Vegeterian"
  | "Chicken"
  | "Desserts"
  | "Pizza";

export interface Item {
  id?: number;
  name: string;
  price: number;
  description: string;
  category: ItemCategory;
  imageUrl: string;
  trending?: boolean;
}
