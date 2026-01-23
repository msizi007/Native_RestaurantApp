import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack } from "expo-router";

export default function EditProfile() {
  const [name, setName] = useState("My Profile");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    Alert.alert("Success", "Profile updated successfully");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: "Edit Profile", headerTintColor: "#E4002B" }}
      />

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="012 345 6789"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, color: "#666", marginBottom: 8, fontWeight: "600" },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    paddingVertical: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#E4002B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});
