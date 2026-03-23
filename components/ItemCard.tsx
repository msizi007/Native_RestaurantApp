import { AppDispatch } from "@/store";
import { Colors } from "@/types/Colors";
import { Item } from "@/types/Item";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { EditItemModal } from "./EditItemModal";

interface Props {
  item: Item;
}

export const ItemCard = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.card}>
      {/* 1st Row: Name and Chevron */}
      <TouchableOpacity
        style={styles.headerRow}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <View>
          <Text style={styles.itemName}>{props.item.name}</Text>
          <Text style={styles.itemPrice}>R {props.item.price}</Text>
        </View>
        <Entypo
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={22}
          color={Colors.tomatoRed || "#FF6347"}
        />
      </TouchableOpacity>

      {/* 2nd Row: Description (Collapsible) */}
      {/* 2nd Row: Description (Collapsible) */}
      {isOpen && (
        <>
          <View style={styles.descriptionRow}>
            {/* Tags Section */}
            <View style={styles.tagContainer}>
              {/* Status Tag */}
              <View
                style={[
                  styles.tag,
                  props.item.status === "Available"
                    ? styles.tagAvailable
                    : styles.tagOutOfStock,
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color:
                        props.item.status == "Available"
                          ? "#4CAF50"
                          : "#F44336",
                    },
                  ]}
                >
                  {props.item.status == "Available"
                    ? "Available"
                    : "Out of Stock"}
                </Text>
              </View>

              {/* Category Tag */}
              <View style={[styles.tag, styles.tagCategory]}>
                <Text style={styles.tagText}>
                  {props.item.category || "General"}
                </Text>
              </View>
            </View>

            <Text style={styles.descriptionText}>
              {props.item.description || "No description provided."}
            </Text>
          </View>

          {/* 3rd Row: Action Buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.btn, styles.editBtn]}
              onPress={() => setIsEditing(true)}
            >
              <MaterialIcons name="edit" size={18} color="#FFF" />
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {isEditing && (
        <EditItemModal
          visible={true}
          item={props.item}
          state={isEditing}
          setState={setIsEditing}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E2127",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#2A2E37",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: { color: "#FFF", fontSize: 17, fontWeight: "bold" },
  itemPrice: { color: "#888", fontSize: 14, marginTop: 2 },
  descriptionRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#2A2E37",
  },
  descriptionText: { color: "#CCC", fontSize: 14, lineHeight: 20 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align buttons to the right
    marginTop: 15,
    gap: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    gap: 5,
  },
  editBtn: { backgroundColor: "#007AFF99" }, // Blue
  deleteBtn: { backgroundColor: "#DC354599" }, // Bootstrap Danger Red
  btnText: { color: "#FFF", fontWeight: "600", fontSize: 13 },
  // ... existing styles
  tagContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "#CCC", // Default for category
  },
  tagAvailable: {
    borderColor: "#4CAF50", // Outlined Green
    backgroundColor: "rgba(76, 175, 80, 0.1)", // Subtle green tint
  },
  tagOutOfStock: {
    borderColor: "#F44336", // Outlined Red
    backgroundColor: "rgba(244, 67, 54, 0.1)", // Subtle red tint
  },
  tagCategory: {
    borderColor: "#555",
    borderStyle: "dashed", // Makes the category tag look distinct
  },
});
