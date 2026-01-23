import { supabase } from "@/lib/superbase";
import { Item } from "@/types/Item";

export async function getItemsDB(): Promise<Item[] | null> {
  let { data, error } = await supabase.from("Item").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as Item[] | null;
}

export async function getItemByIdDB(id: string): Promise<Item | null> {
  let { data, error } = await supabase
    .from("Item")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Item | null;
}

export async function addItemDB(newItem: Item): Promise<Item | null> {
  const { data, error } = await supabase
    .from("Item")
    .insert([newItem])
    .select()
    .single();
  console.log("data", data, "error", error);

  if (error) {
    throw new Error(error.message);
  }

  return data as Item | null;
}

export async function getTrendingItemsDB(): Promise<Item[] | null> {
  // We filter where the column 'is_favourite' is true
  console.log(902, "getTrendingItemsDB");
  const { data, error } = await supabase
    .from("Item")
    .select("*")
    .eq("trending", true);

  console.log(903, "data", data, "error", error);

  if (error) {
    console.error("Error fetching favorites:", error.message);
    throw new Error(error.message);
  }

  return data as Item[] | null;
}
