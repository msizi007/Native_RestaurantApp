export interface OrderItem {
  itemId?: string;
  userId?: string;
  quantity: number;
  priceEach: number;
}

export interface Order {
  id?: string;
  userId: string;
  totalPrice: number;
  status: "pending" | "completed" | "cancelled";
  items: OrderItem[]; // The list of food items ordered
  created_at?: string;
}
