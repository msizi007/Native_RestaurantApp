import { supabase } from "@/lib/superbase";
import { CartItem, CartItemPayload } from "@/types/CartItem";

export async function createCartItemDB(
  payload: CartItemPayload,
): Promise<CartItem | null> {
  const { data, error } = await supabase
    .from("CartItem")
    .insert(payload)
    .select()
    .single();

  console.log(305, { data, error });

  if (error) {
    throw new Error(error.message);
  }

  return data as CartItem | null;
}

export async function getCartItemsDB(
  cartId: number,
): Promise<CartItem[] | null> {
  const { data, error } = await supabase
    .from("CartItem")
    .select("*")
    .eq("cartId", cartId);

  if (error) {
    throw new Error(error.message);
  }

  return data as CartItem[] | null;
}

export async function getCartItemByIdDB(
  cartId: number,
  itemId: number,
): Promise<CartItem | null> {
  const { data, error } = await supabase
    .from("CartItem")
    .select("id, quantity")
    .eq("cartId", cartId)
    .eq("itemId", itemId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as CartItem | null;
}

export async function incrementQuantityDB(
  cartId: number,
  itemId: number,
): Promise<CartItem | null> {
  // 1. Get the current quantity first
  console.log("INCREMENTING QUANTITY");
  const existingItem = await getCartItemByIdDB(cartId, itemId);

  console.log("EXISTING ITEM", existingItem);

  if (!existingItem) return null;

  // 2. Perform the update with the incremented value
  const { data, error } = await supabase
    .from("CartItem")
    .update({ quantity: existingItem.quantity + 1 }) // Add 1 to the current value
    .eq("id", existingItem.id)
    .select("*")
    .single();

  console.log(306, { data, error });

  if (error) throw new Error(error.message);

  return data as CartItem | null;
}

export async function decrementQuantityDB(
  cartId: number,
  itemId: number,
): Promise<CartItem | null> {
  // 1. Get the current quantity first
  console.log("INCREMENTING QUANTITY");
  const existingItem = await getCartItemByIdDB(cartId, itemId);

  console.log("EXISTING ITEM", existingItem);

  if (!existingItem) return null;

  // 2. Perform the update with the incremented value
  const { data, error } = await supabase
    .from("CartItem")
    .update({ quantity: existingItem.quantity - 1 }) // Add 1 to the current value
    .eq("id", existingItem.id)
    .select("*")
    .single();

  console.log(306, { data, error });

  if (error) throw new Error(error.message);

  return data as CartItem | null;
}
