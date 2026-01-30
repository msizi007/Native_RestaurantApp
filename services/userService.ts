import { supabase } from "@/lib/superbase";
import { LoginCredentials, User } from "@/types/User";

export async function getAllUsersDB(): Promise<User[] | null> {
  let { data, error } = await supabase.from("Users").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data as User[] | null;
}

export async function getUsersByIdsDB(ids: number[]): Promise<User[] | null> {
  // 1. Get unique IDs to keep the DB query efficient
  const uniqueIds = Array.from(new Set(ids));

  let { data, error } = await supabase
    .from("Users")
    .select("*")
    .in("id", uniqueIds);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) return null;

  // 2. Create a lookup map for quick access
  const userMap = new Map(data.map((user) => [user.id, user]));

  // 3. Map the original 'ids' array to the actual user data
  // This ensures if ID 1 appears 3 times in the input, it appears 3 times in the output
  const repeatedUsers = ids
    .map((id) => userMap.get(id))
    .filter((user): user is User => !!user); // Remove undefined if an ID wasn't found

  return repeatedUsers;
}

export async function getUserByIdDB(id: number): Promise<User | null> {
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
