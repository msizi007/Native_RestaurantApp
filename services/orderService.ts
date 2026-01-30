import { supabase } from "@/lib/superbase";
import { Order, OrderStatus } from "@/types/Order";

export async function getAllOrdersDB(): Promise<Order[] | null> {
  const { data, error } = await supabase.from("Order").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data as Order[] | null;
}

export async function getOrdersByUserIdDB(
  userId: number,
): Promise<Order[] | null> {
  const { data, error } = await supabase
    .from("Order")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as Order[] | null;
}

export async function getOrderByIdDB(id: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from("Order")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Order | null;
}

export async function updateOrderStatusDB(id: number, status: OrderStatus) {
  const { data, error } = await supabase
    .from("Order")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Order | null;
}

export async function createOrderDB(order: Order): Promise<Order | null> {
  const { data, error } = await supabase
    .from("Order")
    .insert([order])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Order | null;
}

export async function deleteOrderDB(id: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from("Order")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Order | null;
}

export const approveOrderDB = async (id: number): Promise<Order | null> => {
  const { data, error } = await supabase
    .from("Order")
    .update({ status: "Delivered" })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Order | null;
};
