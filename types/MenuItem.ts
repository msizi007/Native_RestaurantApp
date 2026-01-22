export type ItemCategory =
  | "Burger & Chips"
  | "Beverages"
  | "Vegeterian"
  | "Chicken"
  | "Desserts"
  | "Pizza";

export interface MenuItem {
  id?: number;
  name: string;
  price: string;
  description: string;
  category: ItemCategory;
  imageUrl: string;
  trending?: boolean;
}
