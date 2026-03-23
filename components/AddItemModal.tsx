import { addItem } from "@/features/itemSlice";
import { AppDispatch } from "@/store";
import { ItemCategory } from "@/types/Item";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Category_Dropdown } from "./DropDown";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const AddItemModal = ({ visible, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  // Initial state for a new item
  const initialState = {
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
    category: "" as ItemCategory,
  };

  const [formData, setFormData] = useState(initialState);

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in Name, Price, and Category");
      return;
    }

    dispatch(addItem(formData));
    setFormData(initialState); // Reset form
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Product</Text>
            <TouchableOpacity onPress={onClose}>
              <AntDesign name="close-circle" size={24} color="#444" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Cheese Burger"
              placeholderTextColor="#666"
              onChangeText={(t) => setFormData({ ...formData, name: t })}
            />

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Category_Dropdown
                  formData={formData}
                  state={formData.category}
                  setState={(cat) =>
                    setFormData({ ...formData, category: cat })
                  }
                />
              </View>
            </View>

            <Text style={styles.label}>Price (R)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor="#666"
              onChangeText={(t) =>
                setFormData({ ...formData, price: Number(t) })
              }
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              placeholder="Describe the item..."
              placeholderTextColor="#666"
              onChangeText={(t) => setFormData({ ...formData, description: t })}
            />

            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://images.com/item.png"
              placeholderTextColor="#666"
              onChangeText={(t) => setFormData({ ...formData, imageUrl: t })}
            />
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Create Product</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)", // Darker overlay for better focus
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#121417", // Your signature dark background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: "90%",
    // Adding a subtle top border for depth
    borderTopWidth: 1,
    borderTopColor: "#2A2E37",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#FFFFFF", // Changed from #1A1A1A to White
    fontSize: 22,
    fontWeight: "bold",
  },
  form: { marginBottom: 20 },
  label: {
    color: "#888888",
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#1E2127", // Lighter grey for input contrast
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#2A2E37", // Subtle outline
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    gap: 15,
  },
  footer: {
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
  },
  saveBtn: {
    backgroundColor: "#007AFF", // Solid blue for primary action
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    // Subtle shadow for the button
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
