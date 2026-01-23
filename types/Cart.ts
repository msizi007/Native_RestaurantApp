export type CartStatus = "Pending" | "Completed";

export interface Cart {
  id?: number;
  userId: number;
  status: CartStatus;
  createdAt?: Date;
}

export interface CartPayload {
  userId: number;
  status: CartStatus;
}
