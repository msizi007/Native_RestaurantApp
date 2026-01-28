export type OrderStatus = "Pending" | "Delivered";

export interface Order {
  id?: number;
  userId: number;
  cartId: number;
  status: OrderStatus;
  created_at?: string;
}
