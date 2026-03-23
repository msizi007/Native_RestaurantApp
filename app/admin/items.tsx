import { AddItemModal } from "@/components/AddItemModal";
import { ItemCard } from "@/components/ItemCard";
import { getItems } from "@/features/itemSlice";
import { AppDispatch, RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ItemsManager() {
  const { items } = useSelector((state: RootState) => state.item);
  const dispatch = useDispatch<AppDispatch>();
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getItems());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Items</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={({ item }) => <ItemCard item={item} />}
      />
      {isAddModalVisible && (
        <AddItemModal
          visible={true}
          onClose={() => setIsAddModalVisible(false)}
        />
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
  title: { color: "#FFF", fontSize: 24, fontWeight: "bold" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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

  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  statusText: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  orderTotal: { color: "#FF6347", fontWeight: "bold", fontSize: 16 },
  addBtn: { backgroundColor: "#FF6347", padding: 10, borderRadius: 10 },
  stockToggle: { borderWidth: 1, padding: 8, borderRadius: 8 },
});
