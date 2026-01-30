import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ItemsManager() {
  const items = [
    { id: "1", name: "Mizzi Burger", price: "R85", stock: true },
    { id: "2", name: "Peri-Peri Chicken", price: "R120", stock: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Menu Items</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userEmail}>{item.price}</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.stockToggle,
                { borderColor: item.stock ? "#FF6347" : "#444" },
              ]}
            >
              <Text style={{ color: item.stock ? "#FF6347" : "#444" }}>
                {item.stock ? "In Stock" : "Out of Stock"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
