import { updateItem } from "@/features/itemSlice";
import { AppDispatch } from "@/store";
import { Item, ItemCategories, ItemCategory } from "@/types/Item";
import { AntDesign } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { Category_Dropdown, Status_Dropdown } from "./DropDown";

interface Props {
  visible: boolean;
  item: Item | null;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export const EditItemModal = (props: Props) => {
  const [formData, setFormData] = useState<Partial<Item>>({});
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [category, setCategory] = useState<ItemCategory>();
  const [status, setStatus] = useState<string>();

  // Sync internal state when the item prop changes
  useEffect(() => {
    if (props.item) {
      setFormData(props.item);
    }
  }, [props.item]);

  function handleEdit() {
    dispatch(updateItem({ ...props.item!, ...formData, category: category! }));
    Alert.alert("Success", "Item updated successfully");
    props.setState(false); // Close modal after saving
  }

  return (
    <Modal visible={props.visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Edit Product</Text>

        <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(t) => setFormData({ ...formData, name: t })}
            placeholderTextColor="#666"
          />

          <Category_Dropdown
            formData={formData}
            state={category}
            setState={setCategory}
          />

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            value={formData.price?.toString()}
            keyboardType="numeric"
            onChangeText={(t) => setFormData({ ...formData, price: Number(t) })}
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            multiline
            numberOfLines={4}
            onChangeText={(t) => setFormData({ ...formData, description: t })}
            placeholderTextColor="#666"
          />

          <Status_Dropdown
            formData={formData}
            value={status}
            onSelect={setStatus}
          />

          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={formData.imageUrl}
            onChangeText={(t) => setFormData({ ...formData, imageUrl: t })}
            placeholderTextColor="#666"
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => props.setState(false)}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleEdit}>
            <Text style={styles.btnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        {/* Category Picker (Bottom Sheet style) */}
        <Modal visible={isPickerVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.bottomSheet}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Select Category</Text>
                <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                  <AntDesign name="close" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                {ItemCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={styles.optionItem}
                    onPress={() => {
                      setFormData({
                        ...formData,
                        category: cat as ItemCategory,
                      });
                      setIsPickerVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{cat}</Text>
                    {formData.category === cat && (
                      <AntDesign
                        name="check-circle"
                        size={20}
                        color="#007AFF"
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121417",
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  form: { flex: 1 },
  label: { color: "#888", marginBottom: 8, fontSize: 14 },
  input: {
    backgroundColor: "#1E2127",
    color: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  dropdownTrigger: {
    backgroundColor: "#1E2127",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textArea: { height: 100, textAlignVertical: "top" },
  footer: { flexDirection: "row", gap: 15, paddingVertical: 20 },
  cancelBtn: {
    flex: 1,
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  // Bottom Sheet Styles
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
