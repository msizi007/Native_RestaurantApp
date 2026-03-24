import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    holderName: string;
    accountNumber: string;
    cvv: string;
  };
}

export const EditBankDetails = ({
  isVisible,
  onClose,
  onSave,
  initialData,
}: Props) => {
  const [holderName, setHolderName] = useState(initialData?.holderName || "");
  const [accountNumber, setAccountNumber] = useState(
    initialData?.accountNumber || "",
  );
  const [cvv, setCvv] = useState(initialData?.cvv || "");

  const handleSave = () => {
    onSave({ holderName, accountNumber, cvv });
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.modalTitle}>Edit Account</Text>
                <Pressable onPress={onClose}>
                  <MaterialCommunityIcons name="close" size={24} color="#666" />
                </Pressable>
              </View>

              {/* Input Fields */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Card Holder Name</Text>
                <TextInput
                  style={styles.input}
                  value={holderName}
                  onChangeText={setHolderName}
                  placeholder="e.g. Karim"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Account Number</Text>
                <TextInput
                  style={styles.input}
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  placeholder="0000 0000 0000 0000"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
                <View style={{ width: 20 }} />
                <View style={[styles.inputGroup, { flex: 1.5 }]}>
                  <Text style={styles.label}>Expiry (MM/YY)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="12/26"
                    keyboardType="numeric"
                  />
                </View>
              </View>

              {/* Save Button */}
              <Pressable style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 25,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#333",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  row: {
    flexDirection: "row",
  },
  saveBtn: {
    backgroundColor: "#FF6F3C", // Matching your checkout button
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
