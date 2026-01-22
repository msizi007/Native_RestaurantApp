import { supabase } from "@/lib/superbase";
import { MenuItem } from "@/types/MenuItem";

export async function getItems(): Promise<MenuItem[] | null> {
  let { data, error } = await supabase.from("MenuItem").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as MenuItem[] | null;
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  let { data, error } = await supabase
    .from("MenuItem")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MenuItem | null;
}

export async function addMenuItem(newItem: MenuItem): Promise<MenuItem | null> {
  const { data, error } = await supabase
    .from("MenuItem")
    .insert([newItem])
    .select()
    .single();
  console.log("data", data, "error", error);

  if (error) {
    throw new Error(error.message);
  }

  return data as MenuItem | null;
}

export async function getTrendingItemsDB(): Promise<MenuItem[] | null> {
  // We filter where the column 'is_favourite' is true
  console.log(902, "getTrendingItemsDB");
  const { data, error } = await supabase
    .from("MenuItem")
    .select("*")
    .eq("trending", true);

  console.log(903, "data", data, "error", error);

  if (error) {
    console.error("Error fetching favorites:", error.message);
    throw new Error(error.message);
  }

  return data as MenuItem[] | null;
}
