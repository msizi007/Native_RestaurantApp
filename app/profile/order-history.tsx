import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const MOCK_ORDERS = [
  { id: "1", date: "Oct 12, 2025", total: "R 144.99", status: "Delivered" },
  { id: "2", date: "Oct 05, 2025", total: "R 59.99", status: "Cancelled" },
];

export default function OrderHistory() {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <Text style={styles.orderDate}>{item.date}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.orderTotal}>{item.total}</Text>
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
