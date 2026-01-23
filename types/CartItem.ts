export interface CartItem {
  id: number;
  itemId: number;
  cartId: number;
  quantity: number;
  totalPrice: number;
}

export interface CartItemPayload {
  cartId: number;
  itemId: number;
  quantity: number;
  totalPrice: number;
}
