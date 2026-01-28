import { Stack } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChangePassword() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Security",
          headerShown: true,
          headerTintColor: "#ff6347",
        }}
      />
      <Text style={styles.info}>
        Ensure your password is at least 6 characters long.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Current Password"
        secureTextEntry
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        secureTextEntry
        placeholderTextColor="gray"
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  info: { color: "#666", marginBottom: 20 },
  input: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1.5,
    borderColor: "gray",
    fontWeight: 500,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
});
