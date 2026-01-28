export type OrderStatus = "Pending" | "Delivered";

export interface Order {
  id?: string;
  userId: string;
  cartId: string;
  status: OrderStatus;
}
