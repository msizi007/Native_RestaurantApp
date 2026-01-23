import { supabase } from "@/lib/superbase";
import { CartItem, CartItemPayload } from "@/types/CartItem";

export async function createCartItem(
  payload: CartItemPayload,
): Promise<CartItem | null> {
  const { data, error } = await supabase
    .from("Cart")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as CartItem | null;
}
