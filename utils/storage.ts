import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLocalUser(): Promise<User | null> {
  const user = await AsyncStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export async function setLocalUser(user: User) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export async function removeLocalUser() {
  await AsyncStorage.removeItem("user");
}
