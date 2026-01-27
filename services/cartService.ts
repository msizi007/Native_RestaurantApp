import { supabase } from "@/lib/superbase";
import { Cart } from "@/types/Cart";

export async function getCartByUserIdDB(id: number): Promise<Cart | null> {
  // 1. Query the Cart table specifically for the userId
  // We use .maybeSingle() instead of .single() to avoid throwing an error if the cart is empty
  const { data, error } = await supabase
    .from("Cart")
    .select("*")
    .eq("userId", id)
    .maybeSingle();

  console.log(302, data, error);

  // 2. Handle actual database connection errors
  if (error) {
    console.error("Database error:", error.message);
    throw new Error(error.message);
  }

  // 3. Logic: If no data exists (cart is empty/missing), return null
  if (!data) {
    return null;
  }

  // 4. Return the found cart
  return data as Cart;
}
export async function createCart(userId: number): Promise<Cart | null> {
  const { data, error } = await supabase
    .from("Cart")
    .insert({ userId, status: "Pending" })
    .select()
    .single();

  console.log(310, data, error, userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as Cart | null;
}
