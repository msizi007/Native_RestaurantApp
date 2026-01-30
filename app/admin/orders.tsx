import { getUsersByIds } from "@/features/userSlice";
import { AppDispatch, RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function OrdersManager() {
  const { orders } = useSelector((state: RootState) => state.order);
  const { users } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orders && orders.length > 0) {
      const ids = orders.map((order) => order.userId);
      dispatch(getUsersByIds(ids));
    }
  }, [orders]);

  console.log("ORDERS ADMIN PAGE", { orders, users });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#121417" },
          headerShadowVisible: false,
          headerTintColor: "#ff6347",
          headerTitleStyle: { fontWeight: "bold" },
          headerShown: true,
          title: "Orders",
          headerTitleAlign: "center",
        }}
      />
      <Text style={styles.title}>Live Orders</Text>
      {orders &&
        orders.length > 0 &&
        users &&
        users.length == orders.length && (
          <>
            <FlatList
              data={orders}
              keyExtractor={(item, index) =>
                item.id?.toString() || Math.random().toString()
              }
              renderItem={({ item, index }) => (
                <View style={styles.card}>
                  <View>
                    <Text style={styles.userName}>Order #{item.id}</Text>
                    <Text style={styles.userEmail}>
                      {`${users[index].firstName} ${users[index].lastName}`} -{" "}
                      {item.created_at
                        ? new Date(item.created_at).toLocaleTimeString(
                            "en-ZA",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : "N/A"}
                    </Text>
                  </View>
                  <Text
                    style={styles.orderTotal}
                  >{`R ${item.totalPrice}`}</Text>
                  <TouchableOpacity style={styles.editBtn}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#FFF" />
                  </TouchableOpacity>
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
  editBtn: { backgroundColor: "#FF6347", padding: 10, borderRadius: 10 },
});
