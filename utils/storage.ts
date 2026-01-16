import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUser(): Promise<User | null> {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export async function setUser(user: User) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export async function removeUser() {
  await AsyncStorage.removeItem("user");
}
