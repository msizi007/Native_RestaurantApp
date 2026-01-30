import { getAllUsers } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Users() {
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const updatedUsers = useRef(false);

  useEffect(() => {
    if (!updatedUsers.current) {
      dispatch(getAllUsers());
      updatedUsers.current = true;
    }
  }, [dispatch, users, updatedUsers]);

  console.log({ users, numUsers: users?.length || 0 });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#121417" },
          headerShadowVisible: false,
          headerTintColor: "#ff6347",
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: true,
          title: "Users",
          headerTitleAlign: "center",
        }}
      />
      <Text style={styles.title}>Manage Users</Text>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search users..."
          placeholderTextColor="#888"
          style={styles.input}
        />
      </View>

      {users && users.length > 0 && updatedUsers.current && (
        <>
          <FlatList
            data={users}
            keyExtractor={(item) => item.id!.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View>
                  <Text style={styles.userName}>
                    {item.firstName} {item.lastName}
                  </Text>
                  <Text style={styles.userEmail}>{item.email}</Text>
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121417",
    padding: 20,
    paddingTop: 60,
  },
  title: { color: "#FFF", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#1E2127",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  input: { color: "#FFF", marginLeft: 10, flex: 1 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E2127",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },
  userName: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  userEmail: { color: "#888", fontSize: 13 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  orderTotal: { color: "#FF6347", fontWeight: "bold", fontSize: 16 },
  addBtn: { backgroundColor: "#FF6347", padding: 10, borderRadius: 10 },
  stockToggle: { borderWidth: 1, padding: 8, borderRadius: 8 },
});
