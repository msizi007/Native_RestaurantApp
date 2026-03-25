import { getOrdersByUserId } from "@/features/orderSlice";
import { AppDispatch, RootState } from "@/store";
import { Order } from "@/types/Order";
import { User } from "@/types/User";
import { getLocalUser } from "@/utils/storage";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const MOCK_ORDERS = [
  { id: "1", date: "Oct 12, 2025", total: "R 144.99", status: "Delivered" },
  { id: "2", date: "Oct 05, 2025", total: "R 59.99", status: "Cancelled" },
];

export default function OrderHistory() {
  const [user, setUser] = useState<User | null>(null);
  const { current } = useSelector((state: RootState) => state.user);
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const [sortedOrders, setSortedOrders] = useState<Order[] | null>(null);

  // --- Data Loading ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await getLocalUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    if (!current) loadData();
    else setUser(current);
  }, []);

  useEffect(() => {
    if (user) dispatch(getOrdersByUserId(user!.id!));
  }, [user]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const priority = {
        Pending: 1,
        Delivered: 2,
      };

      const arrangedByStatus = [...orders].sort((a, b) => {
        // 1. Get priorities (default to 99 for unknown statuses)
        const priorityA = priority[a.status] || 99;
        const priorityB = priority[b.status] || 99;

        // 2. Primary Sort: By Status Priority
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }

        // 3. Secondary Sort (The Fix):
        // If status is the same, sort by ID (newest first) to keep the list stable
        return b.id! - a.id!;
      });

      setSortedOrders(arrangedByStatus);
    }
  }, [orders]);

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedOrders}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.orderDate}>
                {item.created_at?.toString()}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.orderTotal}>
                R {item.totalPrice.toFixed(2)}
              </Text>
              <Text
                style={[
                  styles.status,
                  { color: item.status === "Delivered" ? "green" : "red" },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA", padding: 15 },
  orderCard: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    elevation: 2,
  },
  orderId: { fontWeight: "bold", fontSize: 16 },
  orderDate: { color: "#999", marginTop: 4 },
  orderTotal: { fontWeight: "bold", fontSize: 16 },
  status: { fontSize: 12, fontWeight: "600", marginTop: 4 },
});
