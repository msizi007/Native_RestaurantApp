import { Item, ItemCategories, ItemCategory, statusOptions } from "@/types/Item";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryProps {
  // Using Partial<Item> as requested
  formData: Partial<Item>;
  // Adding the state and setter props used in your component
  state: ItemCategory | undefined;
  setState: (category: ItemCategory) => void;
}

export const Category_Dropdown = (props: CategoryProps) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  return (
    <>
      <Text style={styles.label}>Category</Text>
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setIsPickerVisible(true)}
      >
        <Text style={{ color: props.state ? "#FFF" : "#666" }}>
          {props.state ? props.state : "Select a category"}
        </Text>
        <Entypo name="chevron-down" size={18} color="#888" />
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                <AntDesign name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {ItemCategories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={styles.optionItem}
                  onPress={() => {
                    props.setState(cat as ItemCategory);
                    setIsPickerVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{cat}</Text>
                  {props.state === cat && (
                    <AntDesign name="check-circle" size={20} color="#007AFF" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
};

interface Props {
  formData: Partial<Item>;
  // Assuming 'status' in your DB is a boolean: true = Available, false = Out of Stock
  value: string | undefined;
  onSelect: (status: string) => void;
}

export const Status_Dropdown = ({ value, onSelect }: Props) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  // Define the two statuses

  const currentLabel = value == "Available" ? "Available" : "Out of Stock";

  return (
    <>
      <Text style={styles.label}>Availability Status</Text>
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={() => setIsPickerVisible(true)}
      >
        <Text style={{ color: value !== undefined ? "#FFF" : "#666" }}>
          {value ? value : "Select a status"}
        </Text>
        <Entypo name="chevron-down" size={18} color="#888" />
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Set Inventory Status</Text>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                <AntDesign name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>

            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.optionItem}
                onPress={() => {
                  onSelect(option);
                  setIsPickerVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: option === "Available" ? "#4CAF50" : "#F44336" },
                  ]}
                >
                  {option}
                </Text>
                {value === option && (
                  <AntDesign name="check-circle" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  label: { color: "#888", marginBottom: 8, fontSize: 14 },
  dropdownTrigger: {
    backgroundColor: "#1E2127",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#1E2127",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "60%",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sheetTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#2A2E37",
  },
  optionText: { color: "#EEE", fontSize: 16 },
});
