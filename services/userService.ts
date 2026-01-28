import { supabase } from "@/lib/superbase";
import { LoginCredentials, User } from "@/types/User";

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

export async function addUserDB(user: User): Promise<User | null> {
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

export async function loginUserDB(
  credentials: LoginCredentials,
): Promise<User | null> {
  const { data, error } = await supabase
    .from("Users")
    .select("*")
    .eq("email", credentials.email)
    .eq("password", credentials.password)
    .single();

  console.log(405, { data, error });

  if (error) {
    throw new Error(error.message);
  }

  return data as User | null;
}

export async function updateUserDB(user: User): Promise<User | null> {
  const { data, error } = await supabase
    .from("Users")
    .update(user)
    .eq("id", user.id)
    .select()
    .maybeSingle();

  console.log(7004, { data, error });

  if (error) {
    throw new Error(error.message);
  }

  return data as User | null;
}
