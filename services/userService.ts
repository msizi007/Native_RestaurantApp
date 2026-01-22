import { supabase } from "@/lib/superbase";
import { User } from "@/types/User";

export async function getUsers(): Promise<User | null> {
  let { data, error } = await supabase.from("Users").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as User | null;
}

export async function getUserById(id: string): Promise<User | null> {
  let { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as User | null;
}

export async function addUser(user: User): Promise<User | null> {
  const { data, error } = await supabase
    .from("Users")
    .insert([user])
    .select()
    .single();
  console.log("data", data, "error", error);

  if (error) {
    throw new Error(error.message);
  }

  return data as User | null;
}
